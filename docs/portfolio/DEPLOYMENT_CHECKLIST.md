# Production Deployment Checklist & Operations Guide

**Portfolio Owner:** Md. Rakib Islam  
**Repository:** `https://github.com/CodesWithRakib/CodesWithRakib`  
**Production Domain:** `https://codeswithrakib.vercel.app`  
**Framework:** Next.js 16.4.2 App Router (Turbopack) on React 19  
**Deployment Platform:** Vercel (Zero-Config Next.js Hosting)

---

## 1. Environment Variables Configuration

Configure these environment variables in the Vercel Project Settings under **Settings > Environment Variables**:

| Variable Name | Required? | Scope | Purpose | Safe Example Value |
|---|---|---|---|---|
| `RESEND_API_KEY` | **Optional** | Server Only | API key from [Resend](https://resend.com) to forward contact submissions to email. If omitted, the form gracefully falls back to an honest maintenance message with direct `mailto:` link. | `re_123456789_abcdef` |
| `CONTACT_TO_EMAIL` | **Optional** | Server Only | Recipient email address where contact submissions are forwarded. Defaults to `codeswithrakib@gmail.com` if omitted. | `codeswithrakib@gmail.com` |
| `CONTACT_FROM_EMAIL`| **Optional** | Server Only | Verified sender email in Resend account. Defaults to `onboarding@resend.dev` for testing. | `contact@codeswithrakib.com` or `onboarding@resend.dev` |
| `CONTACT_SIMULATION`| **Optional** | Server Only | Set to `"true"` to simulate successful API submissions in staging without dispatching live emails. | `"false"` |

> [!IMPORTANT]
> **Zero Client Exposure:** None of the above variables use the `NEXT_PUBLIC_` prefix. They are strictly inaccessible from client bundles, browser dev tools, and network inspect windows.

---

## 2. Build & Deployment Commands Supported by the Repository

| Command | Script in `package.json` | Execution Context | Description |
|---|---|---|---|
| **Build Command** | `pnpm run build` | Vercel Build Step | Runs `next build` with Turbopack, prerenders 8 static routes, and compiles the `/api/contact` route handler. |
| **Install Command** | `pnpm install` | Vercel Install Step | Installs dependencies matching strict `pnpm-lock.yaml` (v9.0). |
| **Start Command** | `pnpm run start` | Self-Hosted / Node Server | Runs `next start -p 5001` (or `$PORT` assigned by host). |
| **Test Suite** | `pnpm test` | CI / Pre-Deployment | Runs native `node:test` suite (14 automated tests in ~320ms). |
| **Typecheck** | `pnpm run typecheck` | CI / Pre-Deployment | Runs `tsc --noEmit` under strict TypeScript 5.8 settings. |
| **Lint** | `pnpm run lint` | CI / Pre-Deployment | Runs ESLint 9 across the entire codebase. |

---

## 3. Hosting Configuration Requirements

### Vercel Deployment Settings
- **Framework Preset:** Next.js
- **Root Directory:** `./`
- **Node.js Version:** `20.x` or `22.x` (verified compatible up to `26.x`)
- **Package Manager:** `pnpm` (automatically detected from `pnpm-lock.yaml`)
- **Output Directory:** `.next` (default)

---

## 4. Domain & HTTPS Verification Steps

1. **Verify Custom Domain in Vercel:**
   - Navigate to Vercel Project Settings > **Domains**.
   - Confirm `codeswithrakib.vercel.app` is assigned as the primary production domain.
2. **Verify SSL/TLS Certificate:**
   - Confirm automatic Let's Encrypt / Vercel SSL certificate is active.
   - Verify HTTP requests redirect automatically to `https://`.
3. **Verify HSTS & Security Headers:**
   - Confirm `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` header is returned on production responses.
   - Confirm `X-Frame-Options: DENY` and `X-Content-Type-Options: nosniff` are active.

---

## 5. Post-Deployment Smoke Tests

Execute these verification checks immediately after deployment:

1. **Homepage Loading:** Visit `https://codeswithrakib.vercel.app/`
   - Hero terminal snapshot (`Rakib.profile.ts`) displays.
   - Case Studies tabs switch smoothly between OgroniEdu, Dhruto, and Gramer Bazar.
   - File path copy buttons copy to clipboard and flash `"Copied!"`.
2. **Resume Route:** Visit `https://codeswithrakib.vercel.app/resume`
   - Renders honest pending status with direct email and LinkedIn CTAs.
   - "Return to Portfolio" button links back to `/`.
3. **Custom 404 Route:** Visit `https://codeswithrakib.vercel.app/any-invalid-slug`
   - Custom 404 page renders cleanly with "Return to Homepage" button.
4. **Mobile Navigation Menu:**
   - On mobile screen, toggle menu opens drawer.
   - Drawer links navigate to target anchors (`/#projects`, `/#experience`, etc.) and close drawer.
   - Pressing `Escape` closes the drawer.
5. **Theme Toggle:**
   - Toggles smoothly between Light and Dark mode.
6. **Zero Console Errors:**
   - Inspect browser devtools console; confirm zero uncaught JavaScript exceptions or CSP violations.

---

## 6. SEO Verification Steps

1. **Verify Sitemap:** Visit `https://codeswithrakib.vercel.app/sitemap.xml`
   - Confirm valid XML containing `<loc>https://codeswithrakib.vercel.app</loc>` and `<loc>https://codeswithrakib.vercel.app/resume</loc>`.
2. **Verify Robots:** Visit `https://codeswithrakib.vercel.app/robots.txt`
   - Confirm `User-Agent: *`, `Allow: /`, `Disallow: /api/`, and `Sitemap: https://codeswithrakib.vercel.app/sitemap.xml`.
3. **Verify Social Card:** Visit `https://codeswithrakib.vercel.app/opengraph-image`
   - Confirm high-resolution 1200x630 PNG is returned with HTTP 200.
4. **Verify Social Sharing Preview:**
   - Test on [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) or [Twitter Card Validator](https://cards-dev.twitter.com/validator).
   - Confirm title, description, and preview image populate accurately.

---

## 7. Contact Form Verification Steps

1. **Validation Check:**
   - Submit empty form; confirm 4 client-side Zod validation errors appear with matching `aria-invalid` and `role="alert"`.
2. **Submission Check:**
   - If `RESEND_API_KEY` is configured: Submit valid message and verify receipt in recipient inbox (`codeswithrakib@gmail.com`).
   - If `RESEND_API_KEY` is omitted: Submit valid message; confirm UI displays transparent maintenance message advising the user to email directly at `codeswithrakib@gmail.com`.
3. **Rate Limiting Check:**
   - Attempt two rapid submissions within 30 seconds; confirm rate limiter responds with HTTP 429 and wait countdown.

---

## 8. Rollback & Recovery Considerations

- **Instant Rollback on Vercel:** In the Vercel Dashboard under **Deployments**, any previous deployment can be instantaneously redeployed with one click if a regression is observed.
- **Git Branch Protection:** The `main` branch contains verified commits. All PRs or hotfixes should run `pnpm test && pnpm run typecheck && pnpm run build` prior to merging.

---

## 9. Known Limitations

1. **`braces` Transitive Dev Dependency:** Upstream advisory in `@next/eslint-plugin-next`. Non-impacting for production deployment as it is build-time only.
2. **Physical PDF Resume File:** `public/resume.pdf` is not committed. The `/resume` route handles this transparently by displaying a direct email request flow and links to verifiable GitHub monorepos. To publish a downloadable PDF at any time, simply drop `resume.pdf` into `public/` and redeploy.

---

## 10. Manual Actions Required from Portfolio Owner

1. **Push Changes to GitHub:**
   ```powershell
   git push origin main
   ```
2. **Import to Vercel (if not already connected):**
   - Go to [vercel.com/new](https://vercel.com/new) and select the `CodesWithRakib` repository.
   - Vercel automatically detects Next.js.
3. **Add Optional Environment Variables (in Vercel Settings):**
   - Add `RESEND_API_KEY` if live contact form forwarding is desired.
4. **Verify Production URL:**
   - Confirm `https://codeswithrakib.vercel.app` is live and reachable.
