# 10-Phase Implementation Roadmap & Status Tracker

**Subject:** Md. Rakib Islam — Recruiter-Focused Developer Portfolio

**Status:** All 10 phases completed (Phase 00–09), followed by the **V2 editorial visual redesign** (see section 8).

**Methodology:** Sequential phase-by-phase execution with explicit verification gates.

> **Latest visual state:** Section 6 below records the first visual pass (V1). That UI has since been superseded by V2: an editorial paper/midnight art direction, real Three.js hero, GSAP scroll storytelling, Framer Motion interactions, and reworked project/case-study presentation. Read [`V2_VISUAL_REDESIGN.md`](./V2_VISUAL_REDESIGN.md) before using section 6 as a description of the current UI.

---

## 1. Roadmap Overview & Status Matrix

| Phase | Description | Status | Verification & Deliverables |
| :--- | :--- | :--- | :--- |
| **Phase 00** | Master Setup, Audit & Architecture Blueprint | **COMPLETED** | Verified local repos, created baseline audit & ADRs |
| **Phase 01** | Recruiter-Focused Content Strategy & UX Planning | **COMPLETED** | 4 audiences analyzed, positioning selected, full copy, case studies |
| **Phase 02** | Design System and Website Foundation | **COMPLETED** | Next.js 16 App Router init, strict TS, Tailwind 4, tokens, UI primitives |
| **Phase 03** | Hero, About, and Professional Introduction | **COMPLETED** | High-impact hero, engineering snapshot card, full About narrative, strengths grid |
| **Phase 04** | Featured Projects and Detailed Case Studies | **COMPLETED** | Flagship showcase cards (`#projects`), interactive tabbed case studies (`#case-studies`), file references, status matrix, foundational projects |
| **Phase 05** | Experience, Skills, and Engineering Strengths | **COMPLETED** | SOFOF Tech role card, categorized skills matrix without arbitrary percentage gauges, 4 evidence-backed engineering strengths |
| **Phase 06** | Resume, Contact, and Recruiter Conversion | **COMPLETED** | Dedicated `/resume` route with asset detection, Zod/React Hook Form contact form, `/api/contact` route with IP rate limiting & honeypot, one-click email copy |
| **Phase 07** | Interactions, Responsive UI, and Accessibility | **COMPLETED** | 10-viewport responsive matrix, mobile drawer Escape dismissal & scroll lock, W3C tabs keyboard navigation, WCAG 2.2 AA audit |
| **Phase 08** | SEO, Performance, Security, and Testing | **COMPLETED** | Dynamic sitemap, robots, OpenGraph 1200x630 image, JSON-LD, security headers & CSP, native Node test suite (14 passing) |
| **Phase 09** | Final Audit, Polish, and Deployment Readiness | **COMPLETED** | Custom 404 page, deployment checklist, zero console errors, 100% Vercel production ready |

---

## 2. Phase 06 Verification & Deliverables

### Deliverables Completed
- [`lib/validations/contact.ts`](file:///C:/Sofof_tech_2026/CodesWithRakib/lib/validations/contact.ts):
  - Shared Zod validation schema: `contactFormSchema` enforcing constraints on `name` (2-100), `email` (valid, max 100), `subject` (3-150), `message` (10-2000), and `botField` (honeypot, max 0).
  - API response contract: `ContactApiResponse`.
- [`app/api/contact/route.ts`](file:///C:/Sofof_tech_2026/CodesWithRakib/app/api/contact/route.ts):
  - Dynamic Next.js API Route Handler (`POST`).
  - IP-based sliding window rate limiter (enforces 30-second cooldown per IP).
  - Honeypot bot protection (silently rejects automated submissions).
  - Server-side Zod validation with structured field-level error responses.
  - Delivery Gateway: Checks for `RESEND_API_KEY`; dispatches via Resend when configured, or honestly returns status 503 / development simulation when unconfigured (zero fake success).
- [`app/resume/page.tsx`](file:///C:/Sofof_tech_2026/CodesWithRakib/app/resume/page.tsx):
  - Dedicated `/resume` route.
  - Checks for the physical presence of `public/resume.pdf`.
  - When present: embeds in-browser PDF viewer and download buttons.
  - When pending: honestly explains resume status, links directly to live portfolio evidence, and offers a one-click `mailto:` request button with developer instructions.
- [`components/sections/ContactSection.tsx`](file:///C:/Sofof_tech_2026/CodesWithRakib/components/sections/ContactSection.tsx):
  - Client component implementing a 2-column conversion layout:
    - Left Column: Direct access card with timezone (UTC+6, Dhaka), response SLA, one-click clipboard copy for `codeswithrakib@gmail.com`, LinkedIn, GitHub, and Resume links.
    - Right Column: Zod-validated contact form with live character counter (`0 / 2000`), submitting spinner, field errors, server feedback banner, and native email fallback.
- [`.env.example`](file:///C:/Sofof_tech_2026/CodesWithRakib/.env.example):
  - Environment variable template documenting `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, and `CONTACT_SIMULATION` without committing secrets.
- [`app/page.tsx`](file:///C:/Sofof_tech_2026/CodesWithRakib/app/page.tsx):
  - Integrated `<ContactSection />` replacing the temporary placeholder.

---

## 3. Phase 07 Verification & Deliverables

### Deliverables Completed
- [`docs/portfolio/RESPONSIVE_ACCESSIBILITY_AUDIT.md`](file:///C:/Sofof_tech_2026/CodesWithRakib/docs/portfolio/RESPONSIVE_ACCESSIBILITY_AUDIT.md):
  - Comprehensive responsive and accessibility audit report covering all 10 device viewports, interaction states, and WCAG 2.2 Level AA compliance.
- [`app/layout.tsx`](file:///C:/Sofof_tech_2026/CodesWithRakib/app/layout.tsx):
  - Root container `overflow-x-clip` containment preventing decorative blurred glow elements from triggering subpixel horizontal scrolling on narrow viewports.
- [`components/layout/Navbar.tsx`](file:///C:/Sofof_tech_2026/CodesWithRakib/components/layout/Navbar.tsx):
  - Mobile drawer with `Escape` key listener, dynamic `document.body.style.overflow = "hidden"` scroll locking, `aria-expanded`, and `aria-controls="mobile-navigation-menu"`.
  - Upgraded mobile hamburger toggle and menu links to minimum 44x44px touch targets.
  - Next.js client-side `<Link href="/resume">` routing.
- [`config/site.ts`](file:///C:/Sofof_tech_2026/CodesWithRakib/config/site.ts):
  - Upgraded navigation item hrefs from `#section` to `/#section` for cross-route navigation from `/resume` to homepage sections.
- [`components/sections/CaseStudiesSection.tsx`](file:///C:/Sofof_tech_2026/CodesWithRakib/components/sections/CaseStudiesSection.tsx):
  - Full W3C WAI-ARIA tab pattern with roving `tabIndex` (`0` for selected, `-1` for unselected), `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, and `role="tabpanel"`.
  - Keyboard navigation handlers for `ArrowRight`, `ArrowLeft`, `Home`, and `End` keys.
  - Explicit `aria-label` attributes on code path copy buttons.
- [`components/sections/HeroSection.tsx`](file:///C:/Sofof_tech_2026/CodesWithRakib/components/sections/HeroSection.tsx):
  - Responsive flex wrapping on verified social links (`flex-wrap gap-x-5 gap-y-2`) eliminating narrow-width horizontal overflow.
  - Upgraded resume CTA to client-side Next.js `<Link href="/resume">`.
- [`components/sections/ContactSection.tsx`](file:///C:/Sofof_tech_2026/CodesWithRakib/components/sections/ContactSection.tsx):
  - Added `autoComplete="name"` and `autoComplete="email"`.
  - Programmatically associated validation alerts using `aria-invalid`, `aria-describedby`, and `role="alert"`.
  - Added `aria-label="Do not fill this field"` to honeypot anti-bot input.
- [`components/layout/Footer.tsx`](file:///C:/Sofof_tech_2026/CodesWithRakib/components/layout/Footer.tsx):
  - Upgraded social icon links and Back-to-Top anchor to minimum 44x44px touch targets.

### Verification Results
1. **10-Viewport Matrix Verification (`chrome-devtools-mcp` emulation on `http://localhost:5001`):**
   - `320px` (iPhone SE): `scrollWidth === clientWidth (320px)` — **Zero horizontal overflow**.
   - `360px` (Galaxy A): `scrollWidth === clientWidth (360px)` — **Zero horizontal overflow**.
   - `375px` (iPhone 12/13 mini): `scrollWidth === clientWidth (375px)` — **Zero horizontal overflow**.
   - `390px` (iPhone 14/15/16): `scrollWidth === clientWidth (390px)` — **Zero horizontal overflow**.
   - `430px` (iPhone Pro Max): `scrollWidth === clientWidth (430px)` — **Zero horizontal overflow**.
   - `768px` (iPad Portrait): `scrollWidth === clientWidth (753px)` — **Zero horizontal overflow**.
   - `1024px` (Tablet Landscape): `scrollWidth === clientWidth (1009px)` — **Zero horizontal overflow**.
   - `1280px` (Laptop): `scrollWidth === clientWidth (1265px)` — **Zero horizontal overflow**.
   - `1440px` (Desktop): `scrollWidth === clientWidth (1425px)` — **Zero horizontal overflow**.
   - `1920px` (Full HD): `scrollWidth === clientWidth (1905px)` — **Zero horizontal overflow**.
2. **Keyboard & Interaction Verification:**
   - Case study tabs: `ArrowRight` (OgroniEdu -> Dhruto -> Gramer Bazar), `ArrowLeft`, `Home`, and `End` keys switch tabs and focus panels accurately.
   - Mobile menu: Opened via hamburger button, dismissed cleanly with `Escape` key, and restored body scrolling.
   - Copy button: Evaluated clipboard copy and transient `"Copied!"` confirmation state.
   - Cross-route anchor: Navigating from `/resume` to `/#projects` properly loaded homepage and scrolled to target anchor.
3. **WCAG 2.2 Level AA Verification:**
   - Headings: 51 total headings with exactly 1 `H1` and **0 skipped levels**.
   - Landmarks: `<header>`, `<nav>`, `<main id="main-content">`, and `<footer>` present.
   - Forms: 0 inputs without accessible labels (honeypot explicitly annotated).
   - Touch targets: All mobile buttons and links meet or exceed 44x44px.
   - Reduced Motion: Evaluated `prefers-reduced-motion: reduce`.
4. **Code Quality & Build:**
   - `pnpm run typecheck` (`tsc --noEmit`): Exited 0.
   - `pnpm run lint` (`eslint .`): Exited 0.
   - `pnpm run build` (`next build`): Exited 0.

---

## 4. Phase 08 Verification & Deliverables

### Deliverables Completed
- [`docs/portfolio/SEO_PERFORMANCE_SECURITY_AUDIT.md`](file:///C:/Sofof_tech_2026/CodesWithRakib/docs/portfolio/SEO_PERFORMANCE_SECURITY_AUDIT.md):
  - Comprehensive 16-section SEO, performance, security, and automated testing audit.
- [`app/sitemap.ts`](file:///C:/Sofof_tech_2026/CodesWithRakib/app/sitemap.ts):
  - Dynamic XML sitemap covering real indexable routes (`/`, `/resume`).
- [`app/robots.ts`](file:///C:/Sofof_tech_2026/CodesWithRakib/app/robots.ts):
  - Dynamic crawler policy protecting `/api/` from indexing and pointing to `https://codeswithrakib.vercel.app/sitemap.xml`.
- [`app/opengraph-image.tsx`](file:///C:/Sofof_tech_2026/CodesWithRakib/app/opengraph-image.tsx):
  - 1200x630 dynamic OpenGraph and Twitter card generator via `ImageResponse` with zero Satori warnings.
- [`app/layout.tsx`](file:///C:/Sofof_tech_2026/CodesWithRakib/app/layout.tsx):
  - Canonical link alternates, Open Graph images metadata, and truthful JSON-LD structured data (`Person`, `WebSite`).
- [`app/resume/page.tsx`](file:///C:/Sofof_tech_2026/CodesWithRakib/app/resume/page.tsx):
  - Deduplicated title metadata (`"Resume & CV"`) and canonical alternate URL (`/resume`).
- [`next.config.ts`](file:///C:/Sofof_tech_2026/CodesWithRakib/next.config.ts):
  - Configured comprehensive security headers: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `Strict-Transport-Security`, and custom `Content-Security-Policy`.
- [`tests/`](file:///C:/Sofof_tech_2026/CodesWithRakib/tests):
  - Automated test suite using native `node:test` (13 tests passing in 324ms):
    - `tests/contact-validation.test.mjs` (7 tests)
    - `tests/site-config.test.mjs` (2 tests)
    - `tests/security-headers.test.mjs` (1 test)
    - `tests/seo-artifacts.test.mjs` (3 tests)
  - Configured `"test": "node --test tests/**/*.test.mjs"` script in `package.json`.

### Verification Results
1. **Automated Test Suite (`pnpm test`):**
   - 13/13 passing in 324 ms (0 failures).
2. **Strict TypeScript Checking (`pnpm run typecheck`):**
   - 0 errors, strict mode passing.
3. **ESLint 9 Conformance (`pnpm run lint`):**
   - 0 errors, 0 warnings.
4. **Turbopack Production Build (`pnpm run build`):**
   - All 9 routes compiled cleanly (8 static prerendered, 1 dynamic).
5. **Real Browser Performance (Chromium Navigation Timing):**
   - TTFB: 11 ms
   - First Paint / FCP: 184 ms
   - DOM Content Loaded: 213 ms
   - Window Load: 214 ms
   - CLS: 0.000 (Zero layout shift)
   - Network transfer size: 22.3 kB

---

## 5. Phase 09 Verification & Deliverables

### Deliverables Completed
- [`app/not-found.tsx`](file:///C:/Sofof_tech_2026/CodesWithRakib/app/not-found.tsx):
  - Brand-consistent 404 page featuring clean error badge, descriptive copy, and direct actions to return to homepage or explore projects.
- [`docs/portfolio/DEPLOYMENT_CHECKLIST.md`](file:///C:/Sofof_tech_2026/CodesWithRakib/docs/portfolio/DEPLOYMENT_CHECKLIST.md):
  - Actionable 10-point deployment checklist covering environment variables, Vercel configuration, SSL/domain verification, smoke tests, and rollback procedures.
- [`docs/portfolio/FINAL_AUDIT.md`](file:///C:/Sofof_tech_2026/CodesWithRakib/docs/portfolio/FINAL_AUDIT.md):
  - Final audit report confirming 100% completion across all 10 project phases.
- [`tests/seo-artifacts.test.mjs`](file:///C:/Sofof_tech_2026/CodesWithRakib/tests/seo-artifacts.test.mjs):
  - Added test validating custom 404 page existence and return navigation (14 tests total).

### Verification Results
1. **Automated Test Suite (`pnpm test`):**
   - 14/14 tests passing in 906ms (0 failures).
2. **TypeScript Strict Typecheck (`pnpm run typecheck`):**
   - 0 errors, strict mode passing.
3. **ESLint 9 Conformance (`pnpm run lint`):**
   - 0 errors, 0 warnings.
4. **Turbopack Production Build (`pnpm run build`):**
   - All 9 routes compiled cleanly (8 static prerendered, 1 dynamic).
5. **Browser & Route Verification (`chrome-devtools-mcp`):**
   - Tested `/`, `/resume`, and `/404-slug` with zero console errors and zero CSP alerts.

---

## 6. Visual Experience Redesign Verification & Deliverables

### Deliverables Completed
- [`docs/portfolio/VISUAL_EXPERIENCE_REDESIGN.md`](file:///C:/Sofof_tech_2026/CodesWithRakib/docs/portfolio/VISUAL_EXPERIENCE_REDESIGN.md):
  - Comprehensive documentation of the premium visual overhaul, zero-dependency motion primitives, 3D tilt architecture, and recruiter conversion strategy.
- [`app/globals.css`](file:///C:/Sofof_tech_2026/CodesWithRakib/app/globals.css):
  - 3D perspective transforms (`perspective-1000`, `perspective-1200`, `transform-style-3d`), floating keyframe animations, responsive tech grid pattern, and reduced-motion overrides.
- [`components/shared/ScrollReveal.tsx`](file:///C:/Sofof_tech_2026/CodesWithRakib/components/shared/ScrollReveal.tsx):
  - GPU-accelerated directional scroll entrance primitive with SSR-safe `useSyncExternalStore` reduced-motion support and zero layout shifts.
- [`components/shared/TiltCard.tsx`](file:///C:/Sofof_tech_2026/CodesWithRakib/components/shared/TiltCard.tsx):
  - Native 3D pointer-tracking perspective card with radial specular glare reflection, auto-disabled on touch devices.
- [`components/layout/Navbar.tsx`](file:///C:/Sofof_tech_2026/CodesWithRakib/components/layout/Navbar.tsx):
  - Rebranded identity to `Md. Rakib Islam / Software Engineer`, dynamic scroll elevation backdrop blur, and accessible mobile drawer.
- [`components/sections/HeroSection.tsx`](file:///C:/Sofof_tech_2026/CodesWithRakib/components/sections/HeroSection.tsx):
  - Concise recruiter-focused value proposition and interactive 3D workspace canvas with tabbed switcher (`Topology`, `Contracts`, `Metrics`) and ambient floating badges.
- [`components/sections/FeaturedProjectsSection.tsx`](file:///C:/Sofof_tech_2026/CodesWithRakib/components/sections/FeaturedProjectsSection.tsx):
  - 3D layered project cards with authentic browser preview frames (OgroniEdu WebRTC dashboard, Dhruto FSM logistics state machine, Gramer Bazar faceted rural catalog).
- **Reduced Content Density Across Sections:**
  - Applied `ScrollReveal` and streamlined card layouts across About, Case Studies, Experience, Skills, Engineering Strengths, and Contact.

### Verification Results
1. **Automated Test Suite (`pnpm test`):**
   - 14/14 tests passing in 352ms.
2. **TypeScript Strict Typecheck (`pnpm run typecheck`):**
   - 0 errors, strict mode passing.
3. **ESLint 9 Conformance (`pnpm run lint`):**
   - 0 errors, 0 warnings.
4. **Turbopack Production Build (`pnpm run build`):**
   - All 9 routes compiled cleanly (8 static prerendered, 1 dynamic).
5. **Multi-Viewport Browser Verification (`chrome-devtools-mcp`):**
   - 375px (Mobile), 768px (Tablet), and 1440px (Desktop) verified with zero horizontal overflow and zero console errors.

---

## 7. Project Completion Summary

All 10 foundational development phases (00 through 09) were completed, then the visual layer was rebuilt again as **V2**. The site keeps the verified content model, routes, contact API, resume detection, SEO artifacts and test suite while replacing the card-heavy visual system with an editorial one.

## 8. V2 Editorial Redesign (current visual state)

**Status:** Implemented and verified on October 21, 2026.

### What changed
- Replaced the emerald/slate card system with a warm-paper / midnight-studio token system, Instrument Serif display type, Inter Tight reading type and JetBrains Mono labels.
- Replaced the CSS-only “3D workspace” card with a real React Three Fiber interface atlas, lazy-mounted after first paint with a CSS fallback for WebGL/reduced motion.
- Added GSAP for the hero timeline, scroll reveals, project clip reveals and experience timeline progress; added Framer Motion for the theme control, navbar/menu, tabs, tilt and form status.
- Rebuilt the homepage sequence: Hero → Selected Work → Case Studies → Experience → Capabilities → Approach → Contact. Removed the standalone About section and duplicate strengths grid.
- Rebuilt the project showcase as one flagship feature plus two offset compositions with labelled interface studies, and rebuilt case studies as a technical dossier with sticky contents.
- Rebuilt the navbar around personal identity (no SOFOF Tech branding), added scroll-spy, a segmented theme switch with persistence/system preference, and an accessible mobile panel.
- Rewrote `/resume` in the new visual language while keeping the honest no-PDF state.
- Rebuilt the footer and contact area around recruiter conversion.

### Packages
`gsap@3.15.0`, `@gsap/react@2.1.2`, `framer-motion@14.4.0`, `three@0.186.1`, `@react-three/fiber@9.8.2`, `@react-three/drei@10.7.9`, and `@types/three@0.186.0` (dev). `next-themes` and `lucide-react` were already present and reused. No Lenis was added.

### Verification
- `pnpm test`: 14/14 passing.
- `pnpm typecheck`: 0 errors; `pnpm lint`: 0 errors/warnings.
- `pnpm build`: passes, 9 routes generated.
- axe-core 4.14.0 (WCAG 2.0/2.1/2.2 A/AA): 0 violations on desktop light, desktop dark and mobile light.
- Playwright: 320/390/768/1440/1920 widths with no horizontal overflow or clipped text; theme persistence, no-flash, mobile menu, tabs, clipboard, form validation and fallback states verified.
- Performance and bundle measurements, including the deferred 3D chunk and limitations, are documented in `V2_VISUAL_REDESIGN.md` sections 11–14.

### Documentation
- [`V2_VISUAL_REDESIGN.md`](./V2_VISUAL_REDESIGN.md) — current implementation report.
- [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) — current tokens, typography, components and motion rules.
- [`screenshots/v2`](./screenshots/v2) — light/dark/mobile/resume/fallback screenshots.
