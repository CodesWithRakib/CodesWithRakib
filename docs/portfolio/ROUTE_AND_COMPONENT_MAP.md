# Route & Component Map — V3

**Subject:** Md. Rakib Islam — developer portfolio  
**Status:** Implemented (October 22, 2026)  
**Architecture:** Next.js 16 App Router · static export · Server Components by default

Design tokens and motion rules: [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md). Verification evidence: [`REDESIGN_PLAN.md`](./REDESIGN_PLAN.md) §9.

---

## 1. Routes

| Route | File | Output | Purpose |
| :--- | :--- | :--- | :--- |
| `/` | `app/page.tsx` | Static `out/index.html` | Portfolio homepage (five sections) |
| `/resume/` | `app/resume/page.tsx` | Static `out/resume/index.html` | Résumé document, honest PDF state |
| `/_not-found` | `app/not-found.tsx` | Static `out/404.html` | Designed 404 |
| `/icon` | `app/icon.tsx` | Static `out/icon` | 32px site icon |
| `/opengraph-image` | `app/opengraph-image.tsx` | Static `out/opengraph-image` | 1200×630 social image |
| `/sitemap.xml` | `app/sitemap.ts` | Static | Public routes |
| `/robots.txt` | `app/robots.ts` | Static | Crawl rules |

There is no API route, no server action and no runtime dependency. `next.config.ts` keeps `output: "export"`, `trailingSlash: true`, unoptimized images and an optional `NEXT_PUBLIC_BASE_PATH`.

---

## 2. Component tree

```text
app/layout.tsx (Server)
 ├── Bricolage Grotesque / Manrope / JetBrains Mono (next/font)
 ├── JSON-LD Person + WebSite
 ├── ThemeProvider (client; system default, storage, no-flash)
 ├── SkipToContent
 ├── SiteHeader (client)
 │    ├── wordmark
 │    ├── desktop scroll-spy nav (4 anchors)
 │    ├── scroll-progress hairline (Framer)
 │    ├── ThemeToggle (client)
 │    ├── “Let’s talk” link
 │    └── mobile sheet (Framer AnimatePresence, sibling of <header>)
 ├── app/page.tsx (Server)
 │    ├── HeroSection (client; GSAP timeline)
 │    │    ├── HeroScene (client; WebGL detection, idle mount, ≥768px)
 │    │    │    ├── StackSculpture (dynamic, ssr:false; R3F/Drei)
 │    │    │    └── StaticStack (CSS fallback)
 │    │    └── CTAs, social links, three footnotes
 │    ├── AboutSection (Server + Reveal)
 │    ├── WorkSection (Server + Reveal)
 │    │    ├── ProjectArtwork × 3 (Server)
 │    │    └── additional project rows
 │    ├── ExperienceSection (Server + Reveal)
 │    └── ContactSection (client; copy-email state)
 └── SiteFooter (Server)
```

### Motion and 3D modules

| File | Engine | Responsibility |
| :--- | :--- | :--- |
| `components/motion/Reveal.tsx` | GSAP / ScrollTrigger | One-shot rise + fade at `top 88%`, scoped cleanup, reduced-motion opt-out |
| `components/three/HeroScene.tsx` | React / WebGL detection | Idle mount, viewport and motion gates, visibility pause, static fallback |
| `components/three/StackSculpture.tsx` | Three.js / R3F / Drei | Slab sculpture, theme palettes, pointer rotation, float, shadows |
| `components/three/StaticStack.tsx` | CSS | Reduced-motion, no-WebGL, pre-mount and mobile fallback |
| `lib/motion.ts` | Shared values | Easings, durations, springs, engine ownership notes |

---

## 3. Server vs client boundaries

| Component | Rendering | Reason |
| :--- | :--- | :--- |
| `app/layout.tsx` | Server | Metadata, fonts, JSON-LD, shell |
| `ThemeProvider` | Client | `next-themes` state |
| `SiteHeader` | Client | Scroll spy, progress, menu state |
| `ThemeToggle` | Client | Theme write |
| `SiteFooter` | Server | Static links and identity |
| `HeroSection` | Client | GSAP timeline |
| `HeroScene` | Client | Browser capability checks + canvas |
| `StackSculpture` | Client, dynamic | Three.js; no SSR |
| `StaticStack` | Server-safe | CSS only |
| `AboutSection` | Server | Copy and structure; wraps rows in `Reveal` |
| `WorkSection` | Server | Copy and structure; wraps rows in `Reveal` |
| `ProjectArtwork` | Server | Presentational posters |
| `ExperienceSection` | Server | Copy, role, toolkit |
| `ContactSection` | Client | Clipboard + live region |
| `ResumePage` | Server | Filesystem check for an optional PDF |
| `Reveal` | Client | GSAP scroll trigger |

Copy lives in typed data files (`data/profile.ts`, `data/experience.ts`, `data/projects.ts`) and identity in `config/site.ts`; sections do not import each other and `app/page.tsx` only composes them.

---

## 4. Navigation and actions

| Label / action | Destination | Behaviour |
| :--- | :--- | :--- |
| Work | `/#work` | Anchor scroll with scroll-spy underline |
| About | `/#about` | Anchor scroll with scroll-spy underline |
| Experience | `/#experience` | Anchor scroll with scroll-spy underline |
| Contact | `/#contact` | Anchor scroll with scroll-spy underline |
| View projects | `#work` | Primary hero CTA |
| Contact me | `#contact` | Secondary hero CTA |
| GitHub / LinkedIn | External profiles | `target="_blank"`, `rel="noopener noreferrer"` |
| Let’s talk | `/#contact` | Header action |
| View repository | Verified GitHub repository | External, new tab |
| All repositories | GitHub profile | External, new tab |
| Full experience and résumé | `/resume/` | Route navigation, prefetch disabled |
| Copy email | Clipboard | Writes `codeswithrakib@gmail.com`, announces in a live region |
| Email address | `mailto:` | Native mail client |
| Request latest CV | `mailto:` with subject | On `/resume` |
| Print / save PDF | `window.print()` | On `/resume`, print stylesheet |
| Back to top | `#main-content` | Footer |

The homepage intentionally has no contact form: the deployment is static, so the site offers email, clipboard, LinkedIn, GitHub and a résumé route rather than pretending a form delivers messages.
