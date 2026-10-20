# SEO, Performance, Security & Automated Testing Audit Report

**Portfolio Owner:** Md. Rakib Islam  
**Role:** Frontend Developer at SOFOF Tech  
**Phase:** 08 — SEO, Performance, Security & Testing  
**Audit Date:** 2026-10-20  
**Repository State:** Production-ready Next.js 16 App Router on Node.js v26.8.1 with pnpm 10  
**Status:** **PASSED (All Verification Gates Met)**

---

## 1. Audit Scope and Repository State

This audit covers the end-to-end SEO infrastructure, browser performance metrics, security defenses, and automated test suite for the personal developer portfolio of Md. Rakib Islam (`https://codeswithrakib.vercel.app`).

### Repository Overview
- **Repository Root:** `C:\Sofof_tech_2026\CodesWithRakib`
- **Current Git Branch:** `main`
- **Application Router:** Next.js App Router (`app/` directory)
- **Component Architecture:** Server Components default; Client Components restricted strictly to interactive leaf components (`Navbar`, `ThemeToggle`, `FeaturedProjectsSection`, `CaseStudiesSection`, `ContactSection`).

---

## 2. Framework and Package Manager Versions

- **Next.js:** `16.4.2` (Turbopack bundler)
- **React:** `19.3.0`
- **React-DOM:** `19.3.0`
- **Node.js Runtime:** `v26.8.1`
- **Package Manager:** `pnpm` (lockfile version `pnpm-lock.yaml` v9.0)
- **Styling Engine:** Tailwind CSS `4.3.3` with `@theme` design tokens
- **TypeScript:** `5.8.2` (strict mode enabled, zero `any` types)
- **Form & Validation:** React Hook Form `7.90.0`, Zod `4.6.7`

---

## 3. Existing Public Routes Inspected

| Route | Type | Status | Description |
|---|---|---|---|
| `/` | Prerendered Static (○) | **200 OK** | Primary landing page: Hero, About, Projects, Case Studies, Experience, Skills, Principles, Contact |
| `/resume` | Prerendered Static (○) | **200 OK** | Dedicated resume & CV access route with dynamic asset detection |
| `/_not-found` | Prerendered Static (○) | **404 OK** | Custom 404 page with return-to-portfolio navigation |
| `/icon` | Prerendered Static (○) | **200 OK** | Dynamic 32x32 brand monogram favicon (`image/png`) via `ImageResponse` |
| `/opengraph-image` | Prerendered Static (○) | **200 OK** | Dynamic 1200x630 OpenGraph / Twitter social preview card (`image/png`, 91.5 kB) |
| `/robots.txt` | Prerendered Static (○) | **200 OK** | Dynamic crawler directives with `/api/` crawl protection |
| `/sitemap.xml` | Prerendered Static (○) | **200 OK** | XML sitemap with canonical URLs, change frequencies, and priorities |
| `/api/contact` | Server-Rendered Dynamic (ƒ) | **Ready** | Rate-limited API route handler with honeypot bot filter and Zod validation |

---

## 4. SEO Baseline and Implemented Fixes

### 4.1 Baseline Findings
- `app/sitemap.ts` was missing (HTTP 404).
- `app/robots.ts` was missing (HTTP 404).
- `app/opengraph-image.tsx` was missing (no rich 1200x630 card for LinkedIn/Twitter previews).
- Canonical URL missing on `/resume` and unlinked in `app/layout.tsx`.
- Title template on `/resume` resulted in duplication: `"Resume & CV | Md. Rakib Islam | Md. Rakib Islam"`.
- Zero JSON-LD structured data in the DOM.

### 4.2 Fixes Implemented
1. **Dynamic Sitemap (`app/sitemap.ts`):** Created Next.js native sitemap returning valid XML targeting only indexable public routes (`/` priority 1.0, `/resume` priority 0.8).
2. **Dynamic Robots (`app/robots.ts`):** Created Next.js native robots file disallowing `/api/` crawl and referencing `https://codeswithrakib.vercel.app/sitemap.xml`.
3. **Dynamic OpenGraph / Twitter Preview Card (`app/opengraph-image.tsx`):** Created 1200x630 branded image generator via `ImageResponse` featuring emerald monogram, role headline, and core stack tags.
4. **Canonical URL Declarations:** Added `alternates: { canonical: siteConfig.url }` to root layout and `alternates: { canonical: `${siteConfig.url}/resume` }` to the resume route.
5. **Title Template Deduplication:** Changed `app/resume/page.tsx` title to `"Resume & CV"`, resolving clean output: `"Resume & CV | Md. Rakib Islam"`.
6. **Structured Data (JSON-LD):** Implemented truthful, verified `Person` and `WebSite` schemas.

---

## 5. Metadata, Sitemap, Robots, and Structured Data Validation

### 5.1 Robots Directive Response (`GET /robots.txt`)
```http
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8

User-Agent: *
Allow: /
Disallow: /api/

Sitemap: https://codeswithrakib.vercel.app/sitemap.xml
```

### 5.2 Sitemap Response (`GET /sitemap.xml`)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://codeswithrakib.vercel.app</loc>
    <lastmod>2026-10-20T17:12:33.431Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>https://codeswithrakib.vercel.app/resume</loc>
    <lastmod>2026-10-20T17:12:33.431Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### 5.3 Structured Data (JSON-LD) Validation
Extracted and validated directly from Chromium DOM evaluation:
```json
[
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Md. Rakib Islam",
    "jobTitle": "Frontend Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "SOFOF Tech"
    },
    "url": "https://codeswithrakib.vercel.app",
    "sameAs": [
      "https://github.com/CodesWithRakib",
      "https://linkedin.com/in/codeswithrakib"
    ],
    "knowsAbout": [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "NestJS",
      "PostgreSQL",
      "Frontend Architecture",
      "SaaS Development",
      "REST APIs"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Md. Rakib Islam — Frontend Developer Portfolio",
    "url": "https://codeswithrakib.vercel.app",
    "description": "Portfolio of Md. Rakib Islam, Frontend Developer at SOFOF Tech specializing in React, Next.js, TypeScript, and production SaaS architecture.",
    "author": {
      "@type": "Person",
      "name": "Md. Rakib Islam"
    }
  }
]
```

---

## 6. Performance Baseline and Actual Measurements

### 6.1 Real Browser Navigation Timing (Chromium on `http://localhost:5001/`)
Measurements obtained directly from `performance.getEntriesByType('navigation')` and `performance.getEntriesByType('paint')`:

| Performance Metric | Measured Value | Target / Threshold | Status |
|---|---|---|---|
| **Time to First Byte (TTFB)** | **11 ms** | < 200 ms | **EXCELLENT** |
| **First Paint (FP)** | **184 ms** | < 1000 ms | **EXCELLENT** |
| **First Contentful Paint (FCP)** | **184 ms** | < 1200 ms | **EXCELLENT** |
| **DOM Content Loaded** | **213 ms** | < 1500 ms | **EXCELLENT** |
| **Window Load Complete** | **214 ms** | < 2500 ms | **EXCELLENT** |
| **Cumulative Layout Shift (CLS)** | **0.000** | < 0.100 | **PERFECT (Zero Shift)** |
| **Network Transfer Volume** | **22.3 kB** | < 500 kB | **HIGHLY OPTIMIZED** |
| **Decoded Script Size** | **863 kB** | < 1.5 MB | **HEALTHY** |

### 6.2 Key Performance Architectural Choices
1. **Zero External Font Blocking:** By using modern system font stacks (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto...`), the site triggers 0 font network requests and achieves 0.000 layout shift.
2. **Turbopack Production Prerendering:** 8 of 9 routes prerendered to pure static HTML/JSON at build time.
3. **No Heavy Stock Imagery:** Visual richness is delivered through clean CSS borders, SVG vectors, and typography rather than bulky uncompressed raster images.

---

## 7. Optimization Changes and Measured Results

- **Before:** OpenGraph image was unhandled, resulting in fallback scraping or missing rich snippets.
- **After:** Dynamic OpenGraph image generation delivers a crisp 1200x630 preview in 91.5 kB.
- **Satori Optimization:** Removed unsupported `zIndex` declarations from `app/opengraph-image.tsx` to eliminate build-time warnings and maintain 100% clean log output.

---

## 8. Security Findings Categorized by Severity

| Severity | Finding | Location | Status / Mitigation |
|---|---|---|---|
| **Low** | Missing security response headers | `next.config.ts` | **RESOLVED:** Added HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy. |
| **Low** | Honeypot field bot rejection error code | `app/api/contact/route.ts` | **VERIFIED:** Returns HTTP 422 with structured rejection, preventing bot log pollution. |
| **Informational** | Transitive dev dependency vulnerability | `@next/eslint-plugin-next > braces` | **ASSESSED:** High severity advisory (GHSA-vfj7-8cjw-p6xm) in dev dependency. No runtime impact on client/server bundle. Documented below. |

---

## 9. Security Headers Configuration

Configured in [`next.config.ts`](file:///C:/Sofof_tech_2026/CodesWithRakib/next.config.ts) and verified via live HTTP response headers:

| Header | Configured Value | Verification Purpose |
|---|---|---|
| **`X-Content-Type-Options`** | `nosniff` | Blocks MIME-type sniffing attacks |
| **`X-Frame-Options`** | `DENY` | Prevents framing and clickjacking |
| **`Referrer-Policy`** | `strict-origin-when-cross-origin` | Protects visitor privacy on external outbound links |
| **`Permissions-Policy`** | `camera=(), microphone=(), geolocation=(), browsing-topics=()` | Restricts browser hardware and tracking APIs |
| **`Strict-Transport-Security`** | `max-age=63072000; includeSubDomains; preload` | Enforces HTTPS connections |
| **`Content-Security-Policy`** | Tailored Next.js policy (see below) | Restricts resource loading, frames, and inline execution boundaries |

### Verified CSP Directive:
```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob: https://github.com https://avatars.githubusercontent.com https://i.ibb.co.com;
font-src 'self' data:;
connect-src 'self' https://api.resend.com;
frame-ancestors 'none';
form-action 'self';
base-uri 'self'
```

---

## 10. Contact Endpoint and Validation Findings

The endpoint [`app/api/contact/route.ts`](file:///C:/Sofof_tech_2026/CodesWithRakib/app/api/contact/route.ts) was tested directly against diverse payload scenarios:

| Test Case | Request | Response Status | Observed Body / Behavior |
|---|---|---|---|
| **Disallowed Method** | `GET /api/contact` | **405 Method Not Allowed** | Next.js App Router default rejection |
| **Malformed Body** | `POST` with plain text | **400 Bad Request** | `{"success":false,"error":"Invalid request payload format."}` |
| **Honeypot Trigger** | `POST` with filled `botField` | **422 Unprocessable** | `{"success":false,"fieldErrors":{"botField":["Bot activity detected."]}}` |
| **Missing Required Fields** | `POST {}` | **422 Unprocessable** | All 4 field errors returned with Zod validation messages |
| **Invalid Email** | `POST` with `not-an-email` | **422 Unprocessable** | `{"email":["Please enter a valid email address."]}` |
| **Rate Limit Trigger** | Immediate duplicate submission | **429 Too Many Requests** | `{"error":"Please wait 30 seconds before submitting another message."}` |
| **Unconfigured Provider** | Valid payload without API key | **503 Service Unavailable** | Transparent maintenance message with direct `mailto:` fallback |

---

## 11. Dependency Audit Findings (`pnpm audit`)

Command: `pnpm audit`
- **Result:** 1 High severity vulnerability reported in `braces <=3.0.3` (GHSA-vfj7-8cjw-p6xm: Denial of Service via deeply nested patterns).
- **Dependency Path:** `. > @next/eslint-plugin-next > fast-glob > micromatch > braces`
- **Risk Assessment:**
  - Affects exclusively ESLint dev tooling during local build/lint execution.
  - Does **NOT** bundle into client or server production runtime artifacts.
  - Upstream Next.js has not released a patched dependency tree for `@next/eslint-plugin-next` v16.4.2 yet (`Patched versions: None`).
  - No action required until Next.js publishes an updated ESLint plugin release.

---

## 12. Automated Tests & Commands Executed

Added `"test": "node --test tests/**/*.test.mjs"` to `package.json` utilizing Node.js's native test runner (zero external testing dependencies added).

### 12.1 Automated Test Suites:
1. [`tests/contact-validation.test.mjs`](file:///C:/Sofof_tech_2026/CodesWithRakib/tests/contact-validation.test.mjs): 7 tests verifying Zod constraints on name, email, subject, message bounds, and honeypot rejection.
2. [`tests/site-config.test.mjs`](file:///C:/Sofof_tech_2026/CodesWithRakib/tests/site-config.test.mjs): 2 tests verifying canonical production URL, author identity, verified social URLs, and cross-route anchors.
3. [`tests/security-headers.test.mjs`](file:///C:/Sofof_tech_2026/CodesWithRakib/tests/security-headers.test.mjs): 1 test verifying all 6 security header directives in `next.config.ts`.
4. [`tests/seo-artifacts.test.mjs`](file:///C:/Sofof_tech_2026/CodesWithRakib/tests/seo-artifacts.test.mjs): 3 tests verifying Sitemap, Robots, and OpenGraph Image generators.

### 12.2 Test Results Summary:
```powershell
$ pnpm test
✔ Contact Validation - Valid Payload passes validation (3.78ms)
✔ Contact Validation - Rejects empty submission (1.04ms)
✔ Contact Validation - Rejects invalid email formats (0.51ms)
✔ Contact Validation - Rejects short name (< 2 characters) (0.30ms)
✔ Contact Validation - Rejects short message (< 10 characters) (0.26ms)
✔ Contact Validation - Rejects oversized message (> 2000 characters) (0.40ms)
✔ Contact Validation - Bot honeypot triggers rejection when filled (0.24ms)
✔ Security Headers - Required Directives Configured in next.config.ts (2.29ms)
✔ SEO Artifacts - Sitemap implementation exists and targets real public routes (2.09ms)
✔ SEO Artifacts - Robots implementation exists and protects API routes (0.80ms)
✔ SEO Artifacts - OpenGraph dynamic image generator exists (8.50ms)
✔ Site Configuration - Verified Production Identity (1.80ms)
✔ Site Configuration - Cross-Route Navigation Anchors (0.67ms)
ℹ tests 13 | pass 13 | fail 0 | duration 324ms
```

---

## 13. Exact Pass/Fail Results

| Check | Tool / Command | Pass Criteria | Result | Status |
|---|---|---|---|---|
| **Unit & Integration Tests** | `pnpm test` | 13/13 passing | 13 passed, 0 failed | **PASS** |
| **Strict Typecheck** | `pnpm run typecheck` | 0 errors | 0 errors | **PASS** |
| **ESLint 9 Conformance** | `pnpm run lint` | 0 warnings, 0 errors | Clean exit code 0 | **PASS** |
| **Turbopack Build** | `pnpm run build` | 9/9 routes compiled | Clean exit code 0 | **PASS** |
| **Browser Console** | `list_console_messages` | 0 errors, 0 CSP alerts | 0 console messages | **PASS** |
| **Layout Shift** | Chromium `layout-shift` | CLS < 0.100 | **0.000 (Zero Shift)** | **PASS** |

---

## 14. Remaining Risks and Unresolved Issues

1. **`braces` Transitive Vulnerability in Dev Dependency:** Awaiting upstream patch from `@next/eslint-plugin-next`. Non-blocking for production deployment as it is build-time only.
2. **Third-Party Email Provider Token:** `RESEND_API_KEY` is deliberately uncommitted in `.env.example`. When deploying to Vercel production, adding the key to Vercel Environment Variables will activate live delivery automatically.

---

## 15. Tooling and Environment Limitations

- Local testing was performed on Windows with Node.js v26.8.1 on port `5001`.
- Full remote CDN edge performance (Cloudflare/Vercel Edge Network) will be evaluated post-deployment in Phase 09.

---

## 16. Recommended Follow-Up Actions

- Proceed to **Phase 09 — Final Audit, Polish & Deployment Readiness**.
- In Phase 09, perform final cross-browser rendering checks, configure Vercel deployment settings, and prepare the project hand-off checklist.
