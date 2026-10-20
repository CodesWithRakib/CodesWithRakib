# Architecture & Design Decision Records (ADR)

**Subject:** Md. Rakib Islam — Developer Portfolio  
**Status:** Living Documentation

---

## ADR 001: Technology Stack Selection

### Context
We need to build a fast, modern, recruiter-focused portfolio that demonstrates engineering maturity and aligns with Rakib's real-world skill set.

### Decision
Use **Next.js App Router (React 19, TypeScript, Tailwind CSS)**.

### Rationale
1. **Alignment with Profile:** Rakib works with Next.js, React, and TypeScript daily at SOFOF Tech and in his flagship monorepo projects. Building the portfolio in this exact stack provides immediate proof of capability.
2. **Performance & SEO:** Server Components provide instant first-contentful-paint (FCP), zero client-side JavaScript for static sections, and built-in metadata APIs for rich Open Graph cards.
3. **Maintainability:** Tailwind CSS enables consistent design tokens without CSS bloat, and TypeScript in strict mode eliminates runtime type errors.

### Alternatives Considered
- **Vite + React SPA:** Faster local build, but lacks built-in server-side metadata generation for social sharing and SEO.
- **Astro:** Excellent for content sites, but does not showcase Rakib's primary expertise in Next.js App Router.

---

## ADR 002: Portfolio State Management Strategy

### Context
Rakib is experienced with Redux Toolkit and RTK Query in complex SaaS projects (OgroniEdu, Dhruto, Gramer Bazar). However, portfolios are fundamentally content-oriented applications.

### Decision
**No Redux, RTK Query, or external databases in the portfolio repository.** State will be handled exclusively using React Server Components by default, with localized React state (`useState`, `useTransition`) for client interactivity (e.g. contact form, theme toggle, case study tab selection).

### Rationale
- Introducing Redux into a personal portfolio adds unnecessary bundle weight, boilerplate, and maintenance overhead without providing any user benefit.
- Demonstrates engineering judgment: choosing the right tool for the job rather than over-engineering simple problems.

---

## ADR 003: Single-Page Recruiter Journey vs. Multi-Page Architecture

### Context
Recruiters evaluate candidate profiles in seconds. They require fast access to projects, resume, skills, and contact information without navigation friction.

### Decision
Adopt a **Single-Page Recruiter Journey (`/`) with smooth anchor-based deep linking (`#projects`, `#case-studies`, `#experience`, `#skills`, `#contact`)**, supplemented by dedicated direct asset routes (`/resume.pdf`). Detailed case study content will be cleanly integrated using accessible tabbed/expandable UI components directly on the page.

### Rationale
- Eliminates page load delays and route transitions during rapid recruiter scanning.
- Keeps bounce rates near zero.
- Ensures a recruiter can scroll through Rakib's entire professional narrative in under 60 seconds or dive deep into technical case studies on the same page.

### Alternatives Considered
- **Multi-page site (`/projects/[slug]`):** Requires recruiters to navigate back and forth, increasing cognitive load and drop-off rates.

---

## ADR 004: Visual Style: Restrained Light Theme Default over Gimmicky Effects

### Context
The previous portfolio suffered from common template clichés: dark backgrounds with neon green blur circles, glowing borders, infinite marquee tickers, and vague headlines.

### Decision
Establish an **editorial, high-contrast visual system with a crisp Light Mode default** (accompanied by a clean Dark Mode switch). Use subtle 1px slate borders, high-contrast typography, and zero blurry gradient glow effects.

### Rationale
- International recruiters and engineering leaders appreciate clarity, legibility, and professional restraint.
- Eliminates visual distraction and forces focus onto the quality of the engineering case studies and code links.
- Fully aligns with WCAG 2.1 AA accessibility contrast guidelines.

---

## ADR 005: Two-Tier Skill Matrix (Honesty & Evidence-First)

### Context
Traditional portfolios display progress bars (e.g. "React 95%", "Node 80%") or dump 40 technology badges without context, which damagingly undermines recruiter trust.

### Decision
Organize skills strictly into two transparent tiers:
1. **Tier 1 — Demonstrated in Production & Real Projects:** Technologies Rakib writes daily at SOFOF Tech or has implemented in verified monorepo code (React, Next.js, TypeScript, Tailwind, Redux Toolkit, RTK Query, NestJS, PostgreSQL, TypeORM).
2. **Tier 2 — Actively Exploring & Learning:** Technologies Rakib is studying and integrating (Redis queues, BullMQ, Docker containerization, system design).

### Rationale
- Builds instant trust with senior technical interviewers.
- Accurately conveys an ambitious engineer expanding from frontend mastery into full-stack architecture.

---

## ADR 006: Form Handling & Validation

### Context
Contact forms must be accessible, robust, and validate user input cleanly before submission.

### Decision
Use **React Hook Form + Zod**.

### Rationale
- Type-safe schema validation.
- Minimal re-renders and optimal performance.
- Direct alignment with the form validation libraries Rakib uses in production client work.

---

## ADR 007: Professional Positioning Selection

### Context
Recruiters must quickly categorize a candidate's level and technical domain. Three positioning statements were evaluated:
- Option A: "Frontend Developer focused on React, Next.js, and TypeScript"
- Option B: "Frontend Engineer building production-oriented SaaS applications"
- Option C: "Frontend Developer with growing full-stack engineering capabilities"

### Decision
Select **Option C (refined as "Frontend Developer at SOFOF Tech specializing in React, Next.js, and TypeScript — expanding with practical rigor into full-stack engineering, databases, and system design")**.

### Rationale
- Completely matches his verified day-to-day employment at SOFOF Tech.
- Accurately captures his active, verified monorepo work in NestJS, TypeORM, and BullMQ without over-claiming "senior full-stack" expertise.
- Maximizes recruiter interest for both dedicated frontend roles and growth-oriented full-stack positions.

---

## ADR 008: Evidence-First Case Study Depth Over Generic Project Showcases

### Context
Standard portfolios display project screenshots with 2-sentence summaries that fail to communicate real engineering ability to senior hiring managers.

### Decision
Structure each project as an **in-depth technical case study** documenting:
1. Business problem & domain complexity.
2. Exact personal responsibilities.
3. Architectural trade-offs and tech stack justifications.
4. Concrete code references (e.g., shared `@contracts`, modular RTK Query services, 21-state parcel state machine, Redis/BullMQ queues).
5. Explicit status categorization (Verified Implemented vs. In Progress vs. Planned).

### Rationale
- Allows technical interviewers and engineering managers to evaluate system design thinking and code quality before the initial interview.
- Demonstrates transparency by separating implemented features from roadmap goals.

---

## ADR 009: Data-Decoupled Content Layer (`data/*.ts`)

### Context
Hardcoding copy, projects, and skills directly into JSX page components leads to giant, unmaintainable monolithic files and tight coupling.

### Decision
Separate all portfolio content into strictly typed TypeScript data modules (`data/profile.ts`, `data/projects.ts`, `data/experience.ts`, `data/skills.ts`, `data/principles.ts`).

### Rationale
- Keeps UI components small, pure, and focused entirely on presentation and layout.
- Ensures all content adheres to strict TypeScript interfaces.
- Simplifies future updates to biographical details, new projects, or job milestones.

---

## ADR 010: Tailwind CSS v4 and Native CSS Custom Properties Architecture

### Context
Next.js 16 projects benefit from Tailwind CSS v4's unified `@import "tailwindcss";` and `@theme` configuration, eliminating legacy `tailwind.config.js` boilerplate while improving build performance.

### Decision
Adopt **Tailwind CSS v4** with CSS custom properties in `app/globals.css`. Map semantic tokens (`--background`, `--surface`, `--foreground`, `--primary`, `--accent`, `--border`, `--ring`) directly to Tailwind utility classes.

### Rationale
- Zero runtime CSS overhead.
- Instant, flicker-free Light Mode / Dark Mode switching.
- Direct alignment with the modern Tailwind 4 patterns used in Rakib's OgroniEdu and Gramer Bazar codebases.

---

## ADR 011: React 19 `useSyncExternalStore` for Hydration-Safe Theme Toggling

### Context
In React 19, calling `setState` inside a mount effect (e.g. `useEffect(() => setMounted(true), [])`) is flagged by `eslint-plugin-react-hooks@7` as `react-hooks/set-state-in-effect` because it triggers cascading renders.

### Decision
Use React's native `useSyncExternalStore` hook in `components/layout/ThemeToggle.tsx` to safely differentiate between server and client rendering without triggering cascading render warnings or layout shifts.

### Rationale
- 100% compliant with React 19 best practices.
- Completely avoids hydration mismatch between server-rendered HTML and client hydration.

---

## ADR 012: Inline SVG Brand Icons over Third-Party Icon Packages for Social Links

### Context
Lucide React does not export brand icons (such as GitHub and LinkedIn) in recent releases, leading to missing import errors.

### Decision
Implement lightweight, accessible inline SVG icons in `components/shared/Icons.tsx` for GitHub and LinkedIn, matching Lucide's exact 24x24 stroke aesthetic.

### Rationale
- Guarantees zero runtime dependency on external brand icon packages.
- Keeps bundle size minimal while matching the design system's exact visual stroke width.

---

## ADR 013: Terminal-Style Architectural Snapshot Card over Generic Stock Photos

### Context
Standard portfolio hero sections often feature generic stock photography, floating avatars, or abstract glowing blobs that add zero technical credibility for recruiters and engineering managers.

### Decision
Implement a **terminal-style Architectural Snapshot Card (`Rakib.profile.ts`)** in the hero section that exposes Rakib's real TypeScript data contracts, current role at SOFOF Tech, verified GitHub monorepos, and key tech stack tags.

### Rationale
- Communicates authentic technical craft to recruiters and hiring leads within 5 seconds.
- Demonstrates TypeScript syntax, object modeling, and clean code aesthetics directly in the visual hero composition.
- Eliminates visual clutter, fake avatars, and unverified decorative animations.


---

## ADR 014: Interactive Tabbed Case Studies with Verifiable File References and Hash Synchronization

### Context
Technical recruiters and engineering managers evaluate candidate portfolios with distinct levels of interest:
1. Fast-scanning recruiters want a high-level summary of flagship applications, core stack, and role responsibilities.
2. Senior engineering managers and staff interviewers want to inspect real architectural depth: concrete file paths, state machines, contract packages, and deliberate trade-offs.

A naive single-page dump of three extensive case studies creates overwhelming vertical scroll fatigue. Conversely, hiding case studies behind separate full-page routes causes page navigation latency and reduces recruiter retention.

### Decision
Implement a two-tiered presentation architecture on the home page:
1. **Featured Projects Showcase (`#projects`)**: A high-impact 3-column card overview communicating project titles, native Bengali names, domain taglines, verified implementation badges, role pills, architecture highlights, and core stack tags.
2. **Deep-Dive Technical Case Studies (`#case-studies`)**: A client-rendered interactive tab viewer (`CaseStudiesSection.tsx`) allowing users to seamlessly switch between the 3 flagship monorepos (OgroniEdu, Dhruto, Gramer Bazar SaaS).
3. **Cross-Section Event & Hash Synchronization**:
   - Clicking "Inspect Case Study" on any featured card dispatches a `select-case-study` event and scrolls smoothly to `#case-studies`.
   - URL hash synchronization (`#case-study-ogroniedu`, `#case-study-dhruto`, `#case-study-gramer-bazar`) enables direct link sharing to specific case studies.
4. **Verifiable File Paths with One-Click Copying**:
   - Concrete file paths from the real repositories (e.g., `packages/contracts/src/types/index.ts`, `apps/api/src/parcels/state-machine/parcel-state.machine.ts`) are displayed with monospace styling and one-click clipboard copying.
5. **Separate Early/Foundational Milestones Subsection**:
   - Secondary exploratory projects (Globira E-Commerce, Plant Tracker) are clearly demarcated in a foundational milestones subsection to illustrate technical growth without diluting the flagship monorepo standard.

### Rationale
- Zero page reloads or route transition delays; all data is instantly available in the bundle.
- Directly supports both fast scanning (30-second recruiter review) and deep technical evaluation (5-minute engineering manager review).
- 100% transparent and verifiable against real local repository source code.


---

## ADR 015: Categorized Contextual Skills and Evidence-First Engineering Strengths over Arbitrary Percentage Gauges

### Context
Developer portfolios frequently feature arbitrary percentage bars (e.g. "React 95%", "TypeScript 85%") or endless grids of tech badges. Technical recruiters, engineering leads, and hiring managers routinely disregard these metrics because:
1. Percentages are subjective, unverifiable, and convey no concrete operational context.
2. Undifferentiated badge clouds obscure a candidate's actual day-to-day focus versus technologies merely explored once.

### Decision
1. **Eliminate All Percentage Gauges and Proficiency Sliders**: Display zero progress bars, percentage circles, or arbitrary scores.
2. **Context-Rich Skill Rows**: Pair each technology with a concise description of *how* Rakib uses it in production or monorepos (e.g. `React 19 & Next.js 16: App Router, Server Components (RSC), Client leaf nodes, and route handlers`).
3. **Transparent Capability Hierarchy**:
   - *Core Production (Frontend & State)*: Reflects daily commercial work at SOFOF Tech.
   - *Monorepo Verified (Backend & Databases)*: Demonstrates full-stack capability backed by inspectable source code (NestJS, TypeORM, PostgreSQL, MongoDB).
   - *Active Practice & Growth (Workflows & Queues)*: Accurately communicates ongoing development in BullMQ, Redis, and testing.
4. **Concrete Evidence Linking for Engineering Strengths**:
   - Rather than abstract statements ("strong problem solver"), present 4 concrete engineering strengths where each strength explicitly cites verified source code or commercial projects (with direct deep links to `#case-study-ogroniedu`, `#case-study-dhruto`, or `#experience`).

### Rationale
- Elevates technical credibility and transparency.
- Directly satisfies senior tech leads who inspect portfolio code quality before technical screens.
- Completely prevents resume exaggeration while highlighting real, verifiable strengths.


---

## ADR 016: Transparent Contact Form Delivery Architecture with Anti-Spam Safeguards and Honest Resume Handling

### Context
Portfolio contact forms and resume buttons frequently suffer from deceptive patterns:
1. Contact forms that appear functional but silently discard messages or display fake "Message Sent!" toasts without any backend delivery provider configured.
2. Missing resume buttons that lead to broken 404 links or generic placeholder PDFs.
3. Contact endpoints vulnerable to automated bot spam and rapid repeated submissions.

### Decision
1. **Server-Side Validation & Anti-Spam Safeguards (`app/api/contact/route.ts`)**:
   - Validate every incoming submission using `contactFormSchema` (Zod).
   - Implement an in-memory IP rate limiter enforcing a 30-second cooldown per IP to prevent spam flood.
   - Include a hidden honeypot field (`botField`) that rejects automated bot submissions with HTTP 400.
2. **Honest Delivery Transparency (Zero Fake Success)**:
   - When `RESEND_API_KEY` is present, the server dispatches real emails via Resend's API.
   - When `RESEND_API_KEY` is absent (such as in local development without credentials committed), the server transparently informs the visitor via status 503 or development simulation.
   - The UI displays an actionable fallback message with a direct `mailto:codeswithrakib@gmail.com` link, ensuring the visitor's typed message is never lost.
3. **Honest Resume Access Handling (`app/resume/page.tsx`)**:
   - Rather than creating an empty PDF or linking to a 404, implement a dedicated `/resume` route that dynamically checks for `public/resume.pdf`.
   - If present, it embeds an in-browser PDF viewer and download action.
   - If pending, it honestly explains that the formal resume is updated on request, provides verified live portfolio evidence links, and offers a one-click email request button.
4. **Frictionless Recruiter Conversion**:
   - Provide a prominent one-click "Copy Email" button with instant visual confirmation.
   - Clearly display timezone (UTC+6, Dhaka), role availability, and response SLA.

### Rationale
- Completely adheres to the core principle of zero hallucination and professional honesty.
- Delivers a production-grade user experience for recruiters with multiple redundant channels to establish contact.

---

## ADR 017: Responsive Viewport Matrix, Touch Target Minimums, and W3C Tabs Accessibility

### Context
Developer portfolios frequently look polished on high-resolution desktop monitors but degrade on real mobile devices:
1. Horizontal scroll leakage caused by unclipped decorative gradient blurs or rigid un-wrapping flex rows.
2. Undersized touch targets (<44px) on mobile menus, social icons, and utility buttons violating WCAG 2.5.5.
3. Tabbed interfaces lacking keyboard navigation (Arrow keys, Home, End) and proper ARIA states, breaking screen-reader and power-user accessibility.
4. Mobile navigation drawers failing to trap focus, trap body scrolling, or respond to the standard `Escape` dismissal key.
5. In-page anchor links breaking when clicked from secondary routes (such as navigating from `/resume` to `#projects`).

### Decision
1. **Root Containment via `overflow-x-clip` (`app/layout.tsx`)**:
   - Apply `overflow-x-clip` to the root application wrapper. Unlike `overflow-x: hidden`, `overflow-x: clip` does not establish an independent scrolling container, perfectly preserving `position: sticky` on the navigation bar while preventing wide absolute decorative glow elements from leaking into horizontal scrollbars.
2. **Cross-Route Anchor Architecture (`config/site.ts`)**:
   - Update navigation hrefs from relative `#section` to root-relative `/#section`. When on the homepage, Next.js handles smooth scrolling; when on `/resume`, Next.js client-side navigates back to `/` and jumps directly to the targeted section.
3. **W3C WAI-ARIA Tabs Compliance (`CaseStudiesSection.tsx`)**:
   - Implement roving `tabIndex` (`0` for selected tab, `-1` for unselected tabs).
   - Implement keyboard handlers: `ArrowRight` and `ArrowLeft` cycle between tabs; `Home` jumps to the first tab; `End` jumps to the last tab.
   - Associate tabs and tabpanels programmatically with `id`, `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, and `role="tabpanel"`.
4. **Mobile Navigation Drawer Ergonomics (`Navbar.tsx`)**:
   - Lock body scrolling (`document.body.style.overflow = "hidden"`) when the mobile drawer is open to prevent background disorientation.
   - Implement global `Escape` key dismissal to restore focus and scroll state cleanly.
   - Upgrade toggle button and drawer navigation items to minimum 44x44px touch targets.
5. **Universal Touch Target & Focus Visibility (`Footer.tsx`, `HeroSection.tsx`, `ContactSection.tsx`)**:
   - Enforce WCAG 2.5.5 minimum 44x44px bounding boxes for all interactive links, icons, and buttons.
   - Apply distinct focus ring styles (`focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`) across all interactive components.
   - Provide explicit `aria-label`s on file copy buttons and honeypot inputs.

### Rationale
- Guarantees 100% compliance across all 10 standard device viewports (`320px` to `1920px`).
- Elevates the portfolio to WCAG 2.2 AA accessibility standards.
- Delivers an intuitive, flawless experience for technical evaluators on both mobile phones and desktop keyboards.

---

## ADR 018: Next.js Metadata Architecture, Security Headers, and Native Automated Testing Suite

### Context
In Phase 08, the portfolio required comprehensive search engine optimization (SEO), social sharing previews, HTTP defense headers, and an automated verification test suite:
1. Search engines require structured sitemaps (`/sitemap.xml`) and crawl policies (`/robots.txt`) with exact production canonical URLs.
2. Social platforms (LinkedIn, Twitter, Slack) require high-resolution (1200x630) OpenGraph cards.
3. Search engines benefit from structured data (JSON-LD) to parse professional identity and employment without hallucination.
4. Production web servers must be shielded against MIME sniffing, clickjacking, insecure HTTP downgrade, and cross-site execution via hardened HTTP headers and Content Security Policy (CSP).
5. Automated testing should prevent regressions without bloating project dependencies or introducing complex testing harnesses.

### Decision
1. **Dynamic App Router Metadata Generation (`app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`)**:
   - Utilize Next.js 16 native metadata file conventions instead of static manual text files.
   - Restrict sitemap strictly to verified public indexable routes (`/` priority 1.0, `/resume` priority 0.8).
   - Disallow `/api/` in `app/robots.ts` while allowing indexable routes.
   - Generate dynamic 1200x630 OpenGraph and Twitter cards using `ImageResponse` with clean Satori CSS and design system brand tokens.
2. **Canonical URL Hygiene and Title Deduplication**:
   - Configure metadata base and canonical alternates pointing to `https://codeswithrakib.vercel.app`.
   - Prevent duplicated title suffixes (`"Resume & CV | Md. Rakib Islam | Md. Rakib Islam"`) by allowing the layout title template (`%s | Md. Rakib Islam`) to handle title formatting.
3. **Truthful JSON-LD Structured Data (`Person` & `WebSite`)**:
   - Embed schema.org `Person` and `WebSite` JSON-LD schemas directly into the root layout.
   - Restrict properties to verified commercial experience (Frontend Developer at SOFOF Tech), real GitHub/LinkedIn profiles, and inspectable technologies.
4. **Hardened HTTP Response Headers (`next.config.ts`)**:
   - Configure `X-Content-Type-Options: nosniff`
   - Configure `X-Frame-Options: DENY`
   - Configure `Referrer-Policy: strict-origin-when-cross-origin`
   - Configure `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`
   - Configure `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
   - Configure a tailored `Content-Security-Policy` permitting essential Next.js inline scripts/styles and authorized image origins while enforcing `frame-ancestors 'none'` and `base-uri 'self'`.
5. **Zero-Dependency Native Automated Test Suite (`node:test`)**:
   - Utilize Node.js's native test runner (`node:test` and `node:assert/strict`) via `"test": "node --test tests/**/*.test.mjs"`.
   - Implement 13 automated tests verifying contact schema constraints, security headers, sitemap/robots contracts, and site configuration integrity. Runs in ~320ms with 0 third-party test dependencies.

### Rationale
- Maximizes search visibility, social click-through, and recruiter trust.
- Hardens the site against web vulnerabilities while maintaining zero breaking changes.
- Eliminates dependency bloat by leveraging built-in Next.js and Node.js capabilities.
