# Portfolio V2 — Editorial Visual Redesign (historical)

> **Superseded by V3.** The current interface is “Signal / Studio” — see [`REDESIGN_PLAN.md`](./REDESIGN_PLAN.md) §9 and [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md). This document describes the V2 build and its now-removed components; keep it as a record, not as a map of the current code.

**Subject:** Md. Rakib Islam — Frontend Developer Portfolio

**Scope:** Homepage, `/resume`, navbar, footer, design tokens, motion system, 3D hero, theme system

**Date:** October 21, 2026

**Verification:** Production build, 14 tests, TypeScript, ESLint, axe-core (WCAG A/AA across two themes and mobile), Playwright interaction and layout audits

This document describes what is actually in the repository. Claims are limited to verified behaviour; measurements and limitations are recorded at the end.

---

## 1. Why the previous redesign was not enough

The previous pass added real value — accessible structure, good copy, a working contact form, and clean semantics — but visually it stayed a **documentation site wearing cards**:

1. **Card wall, no composition.** Three equal flagship cards, four equal skill cards, four equal principle cards, and a four-card hero dashboard. Every section used the same `border + bg-card + tiny mono text` recipe, so nothing felt more important than anything else.
2. **Fake depth instead of real depth.** `TiltCard` applied CSS rotation to a code/dashboard panel. Impressive in a changelog, unremarkable on screen; the "3D workspace" was another dense text panel.
3. **The hero was crowded.** Three CTAs, a "verified links" row, floating stack badges, a tabbed dashboard, and a scroll prompt competed for the same 900px. The recruiter's first question — *who is this and can they build?* — was answered with microcopy.
4. **No art direction across themes.** Dark mode was the light palette inverted: same shapes, same accents, same shadows. There was no distinct light or dark experience.
5. **No real project imagery.** "Previews" were miniature dashboards inside cards, so the projects all looked alike and none looked designed.
6. **Typographic flatness.** System sans for everything, with monospace used as a decorative texture. No display scale, no editorial rhythm.
7. **No animation architecture.** Only CSS/IntersectionObserver reveals. GSAP, Framer Motion, and Three.js were explicitly avoided, which removed the strongest available tools for hierarchy and perceived craft.

The V2 brief was therefore not "more effects". It was **art direction, hierarchy, fewer but stronger components, and motion with a job**.

---

## 2. New visual direction — "Editorial Studio"

The portfolio now reads like a designer-engineer's working journal rather than a résumé rendered as cards:

- **Warm paper and ink (light).** Parchment canvas, warm white plates, near-black text, oxide red accent, moss secondary. Serif display type, hairline rules, generous margins, restrained shadows. The interface feels printed, not templated.
- **Midnight studio (dark).** Deep blue-black, layered graphite surfaces, citrine accent, sage secondary, fine blueprint grid, luminous 3D materials. Dark mode is a different room, not a dimmed light mode.
- **Asymmetry with intent.** One flagship project at 5/7 columns, a 7/5 pair offset vertically, a sticky case-study contents rail, a profile/timeline split. No repeated equal-card grids.
- **Fewer, larger type moments.** Instrument Serif display headings at fluid `clamp()` sizes; Inter Tight for reading; JetBrains Mono only for labels, paths and metadata.
- **Honest project visuals.** Each project gets a bespoke "interface study" composed from verified implementation facts (shared Zod contract, 21-state lifecycle, faceted catalog, queue workers). They are explicitly labelled as studies, not screenshots.
- **Motion as hierarchy.** A choreographed hero entrance, clip-path project reveals, scroll-linked timeline progress, hover depth, and state transitions — each owned by one engine.

### Homepage composition

1. Hero — identity, proof, two actions, interactive 3D atlas
2. Selected work — flagship + two offset projects
3. Case studies — technical dossier with sticky contents
4. Experience — profile column + scroll-linked contribution timeline
5. Capabilities — evidence-led skill rows
6. Approach — four numbered engineering principles
7. Contact — large conversion moment + validated form

The standalone About section and the duplicate "engineering strengths" card grid were removed; the profile narrative now lives with Experience, and the principles are an editorial list. This keeps the recruiter path focused instead of adding sections for length.

---

## 3. Two art-directed themes

Both themes share one component tree, one content model and one set of semantic CSS variables. Only tokens, textures, scene materials and emphasis change.

| Token | Light | Dark |
| :--- | :--- | :--- |
| Canvas | `#F4EFE6` warm parchment | `#0A0D10` midnight |
| Surface | `#FAF6EF` | `#11161A` |
| Raised | `#FFFCF6` | `#171D22` |
| Ink | `#191510` | `#F1EDE4` |
| Muted text | `#62594B` | `#A2A9A3` |
| Border | `#D8CFBF` | `#263039` |
| Accent | `#9C3B12` oxide | `#E9B86A` citrine |
| Secondary | `#315C46` moss | `#8FC0A9` sage |
| Focus ring | `#9C3B12` | `#E9B86A` |
| Grain | multiply, warm | screen, cool |
| Hero scene | ivory panels, oxide node, warm key light | graphite panels, citrine emissive node, sage fill |
| Shadows | soft warm grey | deep black + hairline highlight |

Additional theme-specific treatment:

- The light hero uses warm radial washes and a pale technical grid; the dark hero uses a brighter blueprint grid and citrine/sage glow around the 3D panels.
- Project plates use warm white mats and quiet shadows in light; graphite glass and luminous edges in dark.
- Buttons invert their material logic: oxide with cream text in light, citrine with near-black text in dark.
- The 3D scene reads its palette from `--scene-*` tokens on the current theme, so materials and lighting change with the theme rather than being hardcoded per component.

**Theme switcher:** a two-position segmented control (sun / moon) with `aria-pressed`, keyboard focus, an animated thumb and semantic labels. `next-themes` is configured with `defaultTheme="system"`, `enableSystem`, `enableColorScheme`, `disableTransitionOnChange`, and `suppressHydrationWarning` on `<html>`. Preferences persist in `localStorage`; when no preference exists, the system preference wins.

Verified: the dark class is already present at `DOMContentLoaded` under a dark system preference, with no flash; the choice survives reload and route changes.

---

## 4. Packages installed and actual usage

Installed with pnpm (existing lockfile preserved):

| Package | Version | Why it exists in the product |
| :--- | :--- | :--- |
| `gsap` | `3.15.0` | Hero timeline, scroll reveals, clip-path media reveals, timeline progress |
| `@gsap/react` | `2.1.2` | `useGSAP` scope/cleanup for every GSAP animation |
| `framer-motion` | `14.4.0` | Theme switch, navbar/menu, tabs, hover depth, form status |
| `three` | `0.186.1` | WebGL renderer behind the hero atlas |
| `@react-three/fiber` | `9.8.2` | React renderer for the Three.js scene |
| `@react-three/drei` | `10.7.9` | `RoundedBox` panels and `Float` drift |
| `@types/three` (dev) | `0.186.0` | TypeScript declarations for Three.js |

Compatibility checked before installing against **React 19.3.1**, **Next.js 16.4.2**, **TypeScript 5.8**:

- R3F 9 declares `react >=19 <19.4`; installed React is 19.3.1.
- Drei 10 declares `react ^19`, `three >=0.159`, `@react-three/fiber ^9`.
- Framer Motion 14 declares React 18/19 peer support.

`next-themes` was already installed and was reused, not duplicated. `lucide-react` already supplied every icon used. **No `lenis`** was added: native scrolling plus GSAP `ScrollTrigger` already provide the needed behaviour, and skipping smooth-scroll hijacking reduces accessibility and performance risk. No second animation engine was added.

---

## 5. GSAP — choreographed entrances and scroll storytelling

**File:** `components/motion/GsapReveal.tsx`, `components/motion/TimelineProgress.tsx`, hero timeline in `components/sections/HeroSection.tsx`.

- **Hero entrance timeline.** `.hero-eyebrow` fades in, the two display lines rise through overflow masks (`yPercent: 118 → 0`, 1.15s, `power4.out`, 0.09 stagger), supporting copy and CTAs follow, then the visual. It runs once on mount and is killed on cleanup.
- **`GsapReveal`.** A scoped `useGSAP` wrapper that animates its `[data-reveal]` children from `y: 24, autoAlpha: 0` with a single `ScrollTrigger` per section (`once: true`, `top 88%`). Used for section headers, project copy, experience rows, skills and contact.
- **`GsapMediaReveal`.** Clip-path reveal (`inset(0 0 100% 0)` → `0`) plus a small scale settle for the three interface plates, so project imagery is uncovered rather than simply faded.
- **`TimelineProgress`.** A scroll-linked accent line in Experience that scales from 0 to 1 with `scrub: 0.6` across the contribution list. It does not pin, hijack or lock scrolling.
- **Reduced motion.** Every animation is wrapped in `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)`. With `reduce`, nothing is hidden and no timeline is created.
- **Cleanup.** `useGSAP({ scope })` plus `matchMedia.revert()` on unmount; no duplicate triggers. `ScrollTrigger.refresh()` is not forced on every render.
- **Failure safety.** Content is server-rendered and visible without JavaScript. `clearProps` removes inline animation state after completion, and the Playwright audit scrolls the whole page and confirms zero hidden reveal elements afterwards.

---

## 6. Framer Motion — component state and interaction

**Files:** `components/layout/Navbar.tsx`, `ThemeToggle.tsx`, `components/shared/TiltCard.tsx`, `components/sections/CaseStudiesSection.tsx`, `ContactSection.tsx`, `lib/motion.ts`.

- **Theme control:** spring-animated thumb between light/dark segments.
- **Navbar:** `layoutId` underline that moves between active sections; scroll state changes header material.
- **Mobile menu:** `AnimatePresence` height/opacity panel, staggered large links, Escape close, body scroll lock, focus moves to the first link, resize above `md` closes it.
- **Case studies:** `AnimatePresence` panel transition and a `layoutId` active rail in the vertical tab list. Keyboard roving tabindex is preserved (`ArrowUp/Down/Left/Right`, Home, End).
- **Project depth:** `TiltCard` now uses Framer Motion springs (`useSpring` on rotateX/rotateY) and pointer-type detection, disabled under reduced motion and for touch pointers.
- **Contact:** animated success/error status region; submit button state changes.
- **Shared vocabulary:** `lib/motion.ts` defines two easing curves, four durations, `fadeUp`, `staggerGroup`, `panelTransition`, and a soft spring. This keeps timing consistent instead of inventing values per component.

### Animation ownership

| Engine | Owns | Does not own |
| :--- | :--- | :--- |
| GSAP + ScrollTrigger | Hero timeline, section scroll reveals, project clip reveals, timeline scrub | Hover, menu state, tab panels |
| Framer Motion | Theme thumb, nav menu/indicator, tabs/panels, tilt springs, form status | Scroll-linked sequences or hero entrance |
| React Three Fiber | 3D canvas rendering, pointer parallax, panel drift | DOM animation |
| CSS | Colors, borders, shadows, simple hover and focus transitions | Choreographed sequences |

No DOM property is animated simultaneously by GSAP and Framer Motion on the same element.

---

## 7. Three.js — the interface atlas

**Files:** `components/three/InterfaceAtlas.tsx`, `HeroVisual.tsx`, `StaticAtlas.tsx`.

The hero visual is a real WebGL scene through React Three Fiber, not a CSS mockup:

- **Concept:** a layered "interface atlas" — a main browser/application panel, two smaller floating interface panels behind it, five ruled backdrop lines, one orbital ring, and a single luminous accent node. It visually states *interfaces as layered systems* rather than being an unrelated floating object.
- **Geometry:** rounded panels built with drei `RoundedBox`, plus lightweight box/circle meshes for chrome, navigation, content tiles, a chart strip and status lines. No models, textures, HDR environments or network-fetched assets.
- **Motion:** drei `Float` provides slow drift; `useFrame` applies damped pointer parallax (max ±0.24 rad yaw, ±0.15 rad pitch). No continuous spin, bounce or flashing.
- **Lighting:** theme-aware ambient, warm key, sage/citrine fill. Dark mode uses graphite panels with a subtle self-illumination and stronger rim light so the scene has depth instead of disappearing into the background.
- **Theme awareness:** materials read `--scene-panel`, `--scene-chrome`, `--scene-line`, `--scene-ink`, `--scene-accent`, `--scene-secondary` and `--scene-screen` from `getComputedStyle`; a `MutationObserver` on `<html class>` refreshes them on theme change. No scene colors are hardcoded in components.
- **Performance:** dynamic import (`ssr: false`), dpr capped at `1.75`, antialias on, transparent canvas, no shadows, no post-processing. The scene mounts after `requestIdleCallback` (1.6s timeout; 900ms fallback) so it never competes with hero text paint. `IntersectionObserver` plus `visibilitychange` switch the canvas to demand rendering when off-screen or the tab is hidden.
- **Fallbacks:** if WebGL is unavailable or `prefers-reduced-motion: reduce` is set, a dependency-free CSS `StaticAtlas` is rendered with the same editorial language. The hero content remains fully usable in every case. A WebGL-disabled Chromium run confirmed: no canvas, static atlas visible, no console errors.
- **Accessibility:** canvas is `aria-hidden`; a screen-reader description explains the decorative visual; no interaction is required to reach CTAs.

---

## 8. Navbar, hero and project showcase

### Navbar

- Brand is now **Rakib Islam / Frontend developer**, with a small oxide dot. SOFOF Tech no longer appears in the navbar; it remains accurately documented in Experience and the case-study role copy.
- Navigation labels: Work, Case Studies, Experience, Skills, Approach, Contact. Existing cross-route anchors were preserved so route links and tests remain valid.
- Scroll-spy underline, theme toggle, Résumé link, and a mobile panel with large display links, availability, theme control and résumé action.
- Sticky header changes from transparent to blurred parchment/graphite only after scrolling.

### Hero

- Headline: **"Interfaces with intent."** — set in Instrument Serif with an italic oxide/citrine word.
- One sentence of positioned proof (React/Next/TypeScript in production, NestJS/PostgreSQL/Redis when the product needs it).
- Two primary actions (selected work, résumé) plus a quiet email action.
- Availability, current role, location and focus in a compact definition list.
- Interactive 3D atlas on the right, with a truthful caption and a static fallback.
- Removed the previous three-CTA row, floating stack badges, "verified links" strip, and dashboard tabs. The hero now answers identity → capability → next action in one scan.

### Project showcase

- OgroniEdu leads as a 5/7 editorial feature with a bespoke interface study: guardian role rail, contract snippet, 18 RTK Query services, Socket.io status.
- Dhruto is a 7-column feature with a different composition: lifecycle stages, BullMQ workers, COD ledger.
- Gramer Bazar is a 5-column feature offset lower: faceted catalog, Redis cache, buyer/seller chat.
- Hover uses Framer Motion tilt springs (disabled on touch/reduced motion); media reveals use GSAP clip-path.
- Deep-dive buttons still dispatch the existing `select-case-study` event and update `#case-study-{id}`.
- Every plate is labelled **"Interface study — composed from verified build details"**. No fabricated screenshots, user counts, revenue, testimonials or employer claims.

---

## 9. Responsive behaviour

Audited with Playwright at **320×720, 390×844, 768×1024, 1440×900 and 1920×1080**:

| Viewport | Result |
| :--- | :--- |
| 320 | No horizontal overflow, no clipped text; hero stacks above the visual; mobile menu works |
| 390 | Full mobile layout; 3D canvas 349×301; menu open/close verified |
| 768 | Two-column tablet layouts; canvas 704×564 |
| 1440 | Hero text 568px wide, 193px tall; canvas ≈565×498; sticky rails active |
| 1920 | Container remains 1240px; canvas stable; no overflow |

At every width, `documentElement.scrollWidth === clientWidth`. A programmatic sweep found no non-decorative element extending past the viewport and no text node with `scrollWidth > clientWidth`.

The mobile menu locks background scroll, moves focus to the first link, closes on Escape and returns focus to the trigger; resizing to desktop closes it and restores scrolling.

---

## 10. Accessibility and motion sensitivity

- **axe-core 4.14.0**, tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`: **0 violations** on desktop light, desktop dark and mobile light.
- Contrast fixed during the audit: removed low-opacity muted text in interface-study captions and inactive case-study metadata; all remaining text meets AA.
- Keyboard focus rings are visible in both themes; the hero CTA measured a 2px solid focus outline in the active theme color.
- Case-study tabs implement roving tabindex and arrow/Home/End navigation.
- Theme buttons expose `aria-pressed` and descriptive labels; the group is labelled "Color theme".
- The mobile menu exposes `aria-expanded`/`aria-controls`; Escape and focus return are verified.
- `prefers-reduced-motion: reduce` removes GSAP timelines, Framer variants, CSS drift, the WebGL canvas, smooth scrolling and decorative transitions. A reduced-motion audit found **0 hidden reveal elements**.
- JavaScript disabled: the hero headline renders at 193px height and all project content remains visible (opacity 1); no canvas is required.
- Contact validation errors use `role="alert"`, `aria-invalid` and `aria-describedby`; the first invalid field receives focus.
- Core actions never depend on hover.

---

## 11. Performance and measured results

### Bundle

Measured from the production `.next` output (Turbopack does not print per-route sizes):

| Metric | Before V2 | After V2 |
| :--- | ---: | ---: |
| JS chunks (raw) | 844 KB / 10 files | 2,035 KB / 12 files |
| JS chunks (gzip total) | not recorded | 595 KB |
| Largest chunk | — | 926 KB raw (239 KB transfer) — Three/R3F/Drei, deferred |
| Fonts | system stack (0 KB) | 121 KB transfer (4 woff2: display, display italic, sans, mono) |

The 3D chunk is the main increase. It is dynamically imported and mounted after idle; the CSS atlas and all hero copy paint first.

### Runtime (headless Chrome, production server, local)

| Run | FCP | LCP | CLS | 3D chunk start | Long tasks |
| :--- | ---: | ---: | ---: | ---: | :--- |
| Cold start | 1,664 ms | 1,664 ms | 0.000 | 1,859 ms | 71–908 ms |
| Warm 1 | 448 ms | 448 ms | 0.000 | 874 ms | 72–166 ms |
| Warm 2 | 724 ms | 724 ms | 0.000 | 1,450 ms | 71–409 ms |

- Initial script transfer measured **545 KB** including the deferred 3D chunk; the non-3D route JS is roughly **306 KB** transfer.
- The deferred 3D chunk loaded **after** first contentful paint in every run.
- No layout shift was recorded. Hidden reveals after a full scroll: **0 / 54**.
- Heap use after scene startup: **16–21 MB**.

These are local headless numbers, not Lighthouse scores. Headless Chrome used SwiftShader (software WebGL), so scene initialisation long tasks are likely worse than on a real GPU. No Lighthouse score is claimed.

---

## 12. Verification matrix

| Check | Command / tool | Result |
| :--- | :--- | :--- |
| Unit tests | `pnpm test` (Node test runner) | **14 / 14 passed** |
| TypeScript | `pnpm typecheck` | **0 errors** |
| ESLint | `pnpm lint` | **0 errors, 0 warnings** |
| Production build | `pnpm build` (Next 16.4.2 / Turbopack) | **Passed**, 9 routes generated |
| Axe WCAG A/AA | axe-core 4.14.0 | **0 violations** × 3 contexts |
| Layout overflow | Playwright at 5 widths | 0 horizontal overflow, 0 clipped text |
| Theme flash | dark system preference | Dark class present at DOMContentLoaded |
| Theme persistence | click + reload + route change | Persisted |
| Navigation / scroll-spy | Playwright | Anchor scroll, active link, hash verified |
| Case-study tabs | click + keyboard + clipboard | Panel, hash, live region and clipboard verified |
| Contact form | empty submit + valid submit | 4 field errors; honest fallback state; submit re-enabled |
| WebGL disabled | Chromium `--disable-webgl` | Static atlas, no canvas, 0 console errors |
| Reduced motion | Playwright emulation | No canvas, 0 hidden reveals, auto scroll |
| No JavaScript | JS disabled | Headline and all project content visible |

Screenshots for light, dark, mobile, menu, résumé, reduced-motion and no-WebGL states are in `docs/portfolio/screenshots/v2/`.

---

## 13. Files changed

**Created**

- `lib/motion.ts`
- `components/motion/GsapReveal.tsx`
- `components/motion/TimelineProgress.tsx`
- `components/three/InterfaceAtlas.tsx`
- `components/three/HeroVisual.tsx`
- `components/three/StaticAtlas.tsx`
- `components/projects/InterfaceStudy.tsx`
- `docs/portfolio/V2_VISUAL_REDESIGN.md`
- `docs/portfolio/screenshots/v2/*`

**Rebuilt**

- `app/globals.css` — V2 tokens, typography, paper/grid utilities, shadows, focus
- `app/layout.tsx` — display/sans/mono fonts, system theme, grain layer
- `app/page.tsx` — new section sequence
- `app/resume/page.tsx` — editorial résumé route with honest request state
- `components/layout/Navbar.tsx`, `ThemeToggle.tsx`, `Footer.tsx`, `Container.tsx`
- `components/shared/SectionHeader.tsx`, `TiltCard.tsx`, `components/ui/{button,badge,card}.tsx`
- `components/sections/{Hero,FeaturedProjects,CaseStudies,Experience,Skills,EngineeringStrengths,Contact}Section.tsx`
- `config/site.ts` — navigation labels only; hrefs and verified identity preserved
- `package.json`, `pnpm-lock.yaml`

**Removed**

- `components/sections/AboutSection.tsx` (merged into Experience)
- `components/shared/ScrollReveal.tsx` (replaced by GSAP reveals)

---

## 14. Remaining limitations

1. **No résumé PDF asset.** `public/resume.pdf` does not exist, so `/resume` intentionally shows an honest "request the latest CV" state. Adding the file activates the existing viewer and download actions automatically.
2. **Contact delivery needs credentials.** Without `RESEND_API_KEY`, the production API returns a 503 fallback; the UI explains this and offers direct email. Local validation and error handling were verified. No fake success state is shown.
3. **Console warning from a dependency.** Three.js r186 logs `THREE.Clock` deprecation through R3F; it is a warning, not a runtime error. No app-level console errors were observed.
4. **Interface studies are illustrative.** They are labelled compositions of verified implementation details, not screenshots of the applications. The underlying projects' public deployments are internal/staging per the verified project data.
5. **Headless GPU caveat.** Screenshots and timings come from headless Chromium with SwiftShader. Visual material response and frame cost on a physical GPU will differ.
6. **Bundle size.** Three/R3F adds a 926 KB raw chunk (239 KB transfer). It is deferred and isolated to the homepage hero; removing it would remove the requested 3D experience.
7. **No visual-regression test suite.** Validation used Playwright screenshots and DOM/layout assertions, not pixel-diff CI.
8. **Mobile page length.** The case-study dossier is intentionally detailed and makes the mobile page long; it remains navigable via the sticky contents list and section anchors.
