# Route & Component Architecture Map — V2

**Subject:** Md. Rakib Islam — Developer Portfolio

**Status:** V2 editorial redesign implemented (October 21, 2026)

**Architecture:** Next.js 16 App Router; Server Components by default, client boundaries limited to interaction, motion and 3D

For the visual implementation and audit results see [`V2_VISUAL_REDESIGN.md`](./V2_VISUAL_REDESIGN.md).

---

## 1. Routes

| Route | File | Type | Purpose |
| :--- | :--- | :--- | :--- |
| `/` | `app/page.tsx` | Static | Portfolio homepage |
| `/resume` | `app/resume/page.tsx` | Static (filesystem check) | Résumé viewer or honest request state |
| `/api/contact` | `app/api/contact/route.ts` | Dynamic | Zod validation, rate limiting, honeypot, Resend/fallback |
| `/robots.txt` | `app/robots.ts` | Static | Crawl rules |
| `/sitemap.xml` | `app/sitemap.ts` | Static | Public routes |
| `/opengraph-image` | `app/opengraph-image.tsx` | Static | 1200×630 social image |
| `/_not-found` | `app/not-found.tsx` | Static | Custom 404 |

---

## 2. Component tree

```
app/layout.tsx (Server)
 ├── Instrument Serif / Inter Tight / JetBrains Mono (next/font)
 ├── JSON-LD Person + WebSite
 ├── ThemeProvider (client; system default, persistence, no-flash)
 ├── paper-grain overlay
 ├── SkipToContent
 ├── Navbar (client)
 │    ├── personal wordmark + descriptor
 │    ├── desktop scroll-spy nav (6 anchors)
 │    ├── ThemeToggle (client)
 │    └── mobile menu (Framer AnimatePresence)
 ├── app/page.tsx (Server)
 │    ├── HeroSection (client; GSAP timeline)
 │    │    ├── HeroVisual (client; WebGL detection + idle mount)
 │    │    │    ├── InterfaceAtlas (dynamic, ssr:false; R3F/Drei)
 │    │    │    └── StaticAtlas (CSS fallback)
 │    │    └── primary/secondary CTA links + facts
 │    ├── FeaturedProjectsSection (client)
 │    │    ├── GsapReveal / GsapMediaReveal
 │    │    ├── TiltCard (Framer springs)
 │    │    └── InterfaceStudy × 3 (server-safe presentational)
 │    ├── CaseStudiesSection (client)
 │    │    ├── vertical WAI-ARIA tablist (roving tabindex)
 │    │    ├── AnimatePresence dossier
 │    │    └── copyable repository paths + delivery <details>
 │    ├── ExperienceSection (Server)
 │    │    ├── profile + verified SOFOF Tech role
 │    │    └── TimelineProgress (client; GSAP scrub) + GsapReveal
 │    ├── SkillsSection (Server) + GsapReveal
 │    ├── EngineeringStrengthsSection (Server) + GsapReveal
 │    └── ContactSection (client; RHF + Zod)
 │         ├── Framer status animation
 │         └── contact API fallback handling
 └── Footer (Server)
```

### Motion modules

| File | Engine | Responsibility |
| :--- | :--- | :--- |
| `components/motion/GsapReveal.tsx` | GSAP / ScrollTrigger | Section and media reveals, reduced-motion handling, cleanup |
| `components/motion/TimelineProgress.tsx` | GSAP / ScrollTrigger | Scrub-linked experience line |
| `lib/motion.ts` | Framer Motion values | Easing, durations, variants, springs, ownership notes |
| `components/shared/TiltCard.tsx` | Framer Motion | Pointer tilt and hover scale |
| `components/three/HeroVisual.tsx` | React / WebGL detection | Idle mount and fallbacks |
| `components/three/InterfaceAtlas.tsx` | Three.js / R3F / Drei | Canvas, palette, float, parallax, visibility pause |
| `components/three/StaticAtlas.tsx` | CSS | Static 3D-inspired fallback |

---

## 3. Server vs client boundaries

| Component | Rendering | Reason |
| :--- | :--- | :--- |
| `app/layout.tsx` | Server | Metadata, fonts, JSON-LD, shell |
| `ThemeProvider` | Client | next-themes state |
| `Navbar` | Client | Scroll spy, menu state, theme control |
| `ThemeToggle` | Client | Theme write + mounted state |
| `Footer` | Server | Static links and identity |
| `HeroSection` | Client | GSAP timeline + WebGL visual wrapper |
| `InterfaceAtlas` | Client (dynamic) | Three.js canvas; no SSR |
| `StaticAtlas` | Server-safe | No hooks; CSS only |
| `FeaturedProjectsSection` | Client | Case-study event + Framer/GSAP reveals |
| `CaseStudiesSection` | Client | Tabs, hash sync, clipboard, AnimatePresence |
| `ExperienceSection` | Server | Copy and structure; injects client motion wrappers |
| `SkillsSection` | Server | Static content |
| `EngineeringStrengthsSection` | Server | Static content |
| `ContactSection` | Client | Form state, fetch, status animation |
| `ResumePage` | Server | Filesystem asset check |
| `ContactApiRoute` | Route handler | Validation, rate limit, delivery |

---

## 4. Navigation and CTA targets

| Label / action | Destination | Behaviour |
| :--- | :--- | :--- |
| Work | `/#projects` | Anchor scroll, scroll-spy underline |
| Case Studies | `/#case-studies` | Anchor scroll, scroll-spy underline |
| Experience | `/#experience` | Anchor scroll, scroll-spy underline |
| Skills | `/#skills` | Anchor scroll, scroll-spy underline |
| Approach | `/#principles` | Anchor scroll, scroll-spy underline |
| Contact | `/#contact` | Anchor scroll, scroll-spy underline |
| Explore selected work | `#projects` | Primary hero CTA |
| Résumé (hero/nav/footer/contact) | `/resume` | Route navigation |
| Or say hello | `#contact` | Anchor |
| Case study (project) | `#case-study-{id}` | Selects tab, updates hash, scrolls to dossier |
| Copy repository path | Clipboard | Live region announces success |
| Send message | `POST /api/contact` | Validated form; honest fallback if email delivery is not configured |
| Request latest CV | `mailto:` | Prefilled subject on `/resume` |

All external links use `target="_blank"` with `rel="noopener noreferrer"`.
