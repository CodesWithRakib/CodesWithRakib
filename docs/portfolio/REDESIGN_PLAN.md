# Portfolio V3 — Redesign Plan & Audit

**Subject:** Md. Rakib Islam — recruiter-focused developer portfolio  
**Date:** October 22, 2026  
**Target deployment:** `https://codeswithrakib.github.io/` (static export, GitHub Pages)  
**Scope:** Complete visual, content and architectural redesign of the V2 site. Not a cosmetic pass.

---

## 1. Audit of the current build (V2)

### 1.1 What exists

| Area | Current state |
| :--- | :--- |
| Framework | Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS 4, `output: "export"` |
| Page | 7 stacked sections: Hero, Featured Projects, Case Studies, Experience, Skills, Engineering Strengths, Contact |
| Motion | GSAP hero + scroll reveals + timeline progress; Framer Motion nav, tabs, tilt cards; R3F "interface atlas" hero |
| Type | Instrument Serif display + Inter Tight body + JetBrains Mono labels |
| Themes | Warm paper (light) / midnight + citrine (dark), persisted with `next-themes` |
| Routes | `/`, `/resume`, `/404`, dynamic OG image, sitemap, robots |
| Checks | typecheck, lint, 14 tests, static build, axe, responsive screenshots — all previously passing |

The engineering foundation is sound. The **interface and the writing are the problem**, and V2 repeated V1's core mistakes at a higher polish level.

### 1.2 Concrete problems

1. **Typography is too small across the board.** The rendered source contains dozens of `text-[8px]`, `text-[9px]`, `text-[10px]` and `text-[11px]` labels. Body copy sits at 11.5–13.5px in Contact, Footer, Resume and About. Metadata is often 7–9px. This is the single largest readability failure and directly contradicts the brief (body 17–20px, metadata 13–15px).
2. **The hero hides the name.** The H1 is the slogan “Interfaces with intent.”; “Md. Rakib Islam” appears in a 9px eyebrow. A recruiter cannot answer “whose site is this?” in one glance. The composition is also a conventional split hero with a badge, three CTAs, a fact list and a 3D prop.
3. **Too much text and duplicated narrative.** Project summaries, problem statements, target users, technical approach, implementation details, challenges, status breakdowns and inspectable areas all repeat the same facts. The Case Studies dossier alone is a second, longer version of the project section. Strengths repeat the About/experience copy; Skills repeat the toolkit with long context sentences. Homepage copy is roughly 2,800 words — documentation, not a portfolio.
4. **Section rhythm is monotonous.** Six of seven sections resolve to “small mono eyebrow → display heading → grid of bordered items”, with the same wash, grain, and card treatment. There is no editorial pacing, no large-scale imagery, no contrast in composition between sections.
5. **Project work is not the star.** Each project's visual is a miniature fake dashboard containing 6.5–9px labels. Nothing is displayed at poster scale; the strongest asset (three substantial systems) is reduced to small cards with long prose.
6. **The contact form cannot work on the deployment target.** `next build` marks `/api/contact` as dynamic and the static export emits no API route (verified: no `out/api`). On GitHub Pages the form can only fail. The brief explicitly forbids a form that pretends to send.
7. **Small decorative clutter.** Pills, badges, status dots, italic serif accents, layered washes and a paper-grain overlay accumulate without adding information. Hover-only affordances (tilt cards) add little.
8. **Dead weight after a content cut.** `badge.tsx`, `card.tsx`, `SectionHeader`, `TiltCard`, case-study-only data fields, `react-hook-form`, `zod`, `@hookform/resolvers` exist only because of the dossier/form. These should not survive V3.
9. **Navigation advertises sections that should not exist.** Six links (Work, Case Studies, Experience, Skills, Approach, Contact) for a page that should read in four movements.
10. **Theme difference is mostly a palette inversion.** Dark mode keeps identical geometry and rhythm; the brief asks for two genuinely art-directed themes.

### 1.3 What must be preserved

- Real identity, links, email, canonical URL and SEO artifacts (sitemap, robots, OG image, JSON-LD).
- Verified project facts and repository URLs: OgroniEdu, Dhruto, Gramer Bazar SaaS, Globira, Plant Tracker.
- Employment facts (Junior Frontend Developer, SOFOF Tech, Dhaka) and verified platform work (Tamkeen, MyCoifeur).
- Static export + GitHub Pages workflow, `.nojekyll`, canonical URL.
- Résumé page (with its honest “CV on request” state — no PDF exists).
- Accessible semantics, keyboard support, reduced-motion support, theme persistence without flash.
- GSAP, Framer Motion and R3F as the motion stack (already installed and React 19 compatible).

---

## 2. New visual direction — “Signal / Studio”

A Swiss-editorial gallery for an engineer: oversized typography, a strict grid, hairline rules, poster-scale project work, and exactly one electric accent. No glass cards, no glow, no gradient text, no card wall.

- **Composition:** a 12-column grid with deliberate asymmetry. The hero is dominated by the name itself. Work is presented as three full-bleed editorial plates. Experience is a two-column editorial spread. Contact is an inverted, full-width finale.
- **Light theme:** porcelain `#F2F0EA`, ink `#101114`, cobalt `#1B2AE0`, clay `#B4451F` as a secondary marker, warm-grey hairlines. Paper-like, high contrast, quiet.
- **Dark theme:** graphite `#0A0B0D`, bone `#F0EDE5`, periwinkle `#8F9BFF`, sand `#D6A97C`. Deeper surfaces, dimmer hairlines, luminous 3D materials. Not an inversion: the contact band becomes deep cobalt instead of near-black, and the poster set is re-lit for dark.
- **Signature details:** a persistent index system (`01 — About`), 1px rules, oversized numerals, a live scroll-progress hairline, and one interactive 3D paper-stack sculpture in the hero.
- **Project posters:** each project gets a large, art-directed composition (dark ink, clay, or olive field) built from its *verified* domain concepts, clearly labelled as an “interface study”. No invented metrics, fake dashboards or stock screenshots.

---

## 3. Typography & colour system

### 3.1 Type

| Role | Face | Size |
| :--- | :--- | :--- |
| Display / headings | **Bricolage Grotesque** (variable) | Hero name `clamp(3.9rem, 10.8vw, 8rem)`; section headings `clamp(2.5rem, 5vw, 4rem)`; project titles `clamp(1.85rem, 3.2vw, 2.75rem)` |
| Body / UI | **Manrope** (variable) | Body 17–18px, line-height 1.65, measure 60–68ch; lead paragraphs 19–21px |
| Labels / index | **JetBrains Mono** | 12–13px minimum, uppercase, 0.16em tracking |

Rules: no text below 12px anywhere; metadata at 13–14px; hierarchy through weight and scale, not colour alone; `clamp()` everywhere; all headings `text-wrap: balance`, paragraphs `text-wrap: pretty`.

### 3.2 Tokens

Background / surface / elevated surface, foreground / muted foreground, border / hairline, primary / primary-foreground / primary-subtle, accent, inverse band (bg/fg/muted), focus ring, poster palettes (`ink`, `clay`, `olive`), spacing scale, radii (2 / 6 / 12 / 999), shadows (one soft lift), section rhythm, and motion durations/easings. All defined once in `app/globals.css` and exposed through Tailwind's `@theme`.

### 3.3 Contrast targets

Body text ≥ 7:1 where possible, never below 4.5:1. Primary on background and inverse band checked in both themes. Accent used for large type, rules and icons, not small body copy.

---

## 4. Page structure & content strategy

1. **Hero** — name, role, one value sentence, two CTAs, GitHub/LinkedIn, 3D sculpture, three factual footnotes.
2. **About / Practice (01)** — one large statement, two short paragraphs, four numbered capabilities. ~120 words total.
3. **Selected work (02)** — three flagship projects as alternating poster plates (visual 7 cols / text 5 cols): one-sentence description, verifiable contribution, ≤5 technologies, repository link. Then two compact additional projects. ~200 words total.
4. **Experience & toolkit (03)** — one role with three outcome-focused bullets and a factual tech list; four toolkit groups as hairline lists. No cards. ~150 words.
5. **Contact (04)** — inverted finale, one invitation, giant email link with copy action, LinkedIn / GitHub / résumé, minimal footer.

Deleted: Case Studies dossier, standalone Skills section, Engineering Strengths section, all badges/pills, the contact form and its API route. All verified facts survive in condensed form; nothing is invented.

---

## 5. Motion plan

- **GSAP:** hero entrance timeline (masked name lines, staggered supports, sculpture fade); one-shot rise-and-fade reveals for section headers and rows (`top 88%`). All wrapped in `@gsap/react` `useGSAP` with `gsap.matchMedia()` for reduced motion and full cleanup.
- **Framer Motion:** header active marker (`layoutId`), mobile menu sheet, scroll-progress hairline, copy-email state.
- **R3F:** layered paper-slab sculpture with theme-aware materials, gentle float and pointer rotation; lazy-mounted after idle at ≥768px only; paused when off-screen or hidden; DPR capped at 1.75; static CSS composition when WebGL is unavailable or motion is reduced.
- No scroll hijacking, no loading screen, no cursor replacement, no infinite decorative loops.

---

## 6. Component refactoring plan

```
components/
  layout/      SiteHeader, SiteFooter, Container, ThemeToggle
  sections/    HeroSection, AboutSection, WorkSection, ExperienceSection, ContactSection
  projects/    ProjectArtwork
  motion/      Reveal
  three/       HeroScene, StackSculpture, StaticStack
  ui/          Button
  shared/      Icons, SkipToContent, PrintButton
data/          profile, experience (role + toolkit), projects (typed, concise)
lib/           motion, utils
```

- Page files compose sections only; no section imports another section.
- Server Components by default; client boundaries limited to hero motion, header, reveals, poster hover, contact copy, 3D and print.
- Delete `Navbar`, `Footer`, `CaseStudiesSection`, `SkillsSection`, `EngineeringStrengthsSection`, `SectionHeader`, `TiltCard`, `badge`, `card`, old three/motion files, `InterfaceStudy`, the contact API/validation, and unused data fields.
- Remove now-unused dependencies (`react-hook-form`, `@hookform/resolvers`, `zod`, `sonner` if unused).
- TypeScript strict, no `any`, no suppressions.

---

## 7. Accessibility & performance requirements

- Semantic landmarks, one H1, ordered headings, skip link, visible 2px focus rings on every interactive element.
- Icon-only controls named; mobile menu traps focus handling (Escape returns focus, body scroll locked).
- Reduced motion: all content visible without animation; 3D replaced by a static composition.
- WebGL disabled: static hero fallback, zero console errors.
- No JS: hero copy, project titles/links, experience and contact are server-rendered and readable.
- Heavy 3D chunk isolated to the hero, lazy-mounted, and skipped entirely below 768px; no external 3D assets; no bitmap assets required.
- No layout shift from fonts (`next/font` self-hosted, `display: swap`), no hydration warnings, no console errors.
- Contrast and axe checks in both themes at desktop and mobile.

---

## 8. Acceptance criteria

1. Hero leads with “Rakib Islam” at display scale; role, value sentence, both CTAs, GitHub/LinkedIn and 3D visual present.
2. Body text ≥ 17px, metadata ≥ 12px (target 13–14px), no clipped or overflowing headings at 360/390/768/1024/1440/1920.
3. Homepage sections: hero, about, work, experience+toolkit, contact — each with a distinct composition.
4. Each flagship project has a large original visual, one-sentence description, contribution, ≤5 tech items and a working repository link; Globira and Plant Tracker appear compactly.
5. Both themes are independently art-directed, persist across reloads, and show no flash of the wrong theme.
6. GSAP and Framer Motion sequences work on desktop and mobile; reduced motion removes them without hiding content.
7. 3D renders and reacts to pointer on supported devices; static fallback otherwise; the page is fully usable with JS or WebGL disabled.
8. Contact uses direct email with a working copy action and honest delivery links; no fake form.
9. `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build` all pass; static export contains all routes and assets; GitHub Pages workflow untouched and still valid.
10. No axe A/AA violations, no horizontal overflow, no console errors, and all major links resolve.

---

## 9. Implementation status & verification (October 22, 2026)

### 9.1 What shipped

| Area | Delivered |
| :--- | :--- |
| Identity | Bricolage Grotesque / Manrope / JetBrains Mono; porcelain–ink–cobalt light theme; graphite–bone–periwinkle dark theme; deep-cobalt contact band in dark, near-black ink band in light |
| Homepage | Hero → About → Selected work → Experience & toolkit → Contact, five sections with distinct compositions |
| Hero | Name at `clamp(3.9rem, 10.8vw, 8rem)`, role statement, one value sentence, two CTAs, GitHub/LinkedIn, three factual footnotes, interactive R3F paper-stack sculpture |
| Work | Three poster plates built from verified domain facts, alternating 7/5 compositions, contribution copy, ≤5 technologies, repository links; Globira and Plant Tracker as compact rows |
| Content | Homepage text cut from ≈2,800 words to ≈820 rendered words (including poster UI labels); removed the case-study dossier, standalone skills, principles and the non-functional contact form |
| Motion | GSAP hero timeline and one-shot scroll reveals; Framer Motion header marker, mobile sheet, progress and copy state; R3F pointer-reactive sculpture |
| Themes | Independently designed palettes, persisted by `next-themes`, applied before paint, motion and 3D read the active theme |
| Routes | `/`, `/resume/`, designed 404, icon, OG image, sitemap, robots — all static |
| Cleanup | Removed Navbar, Footer, CaseStudies, Skills, Strengths, SectionHeader, TiltCard, Badge, Card, InterfaceStudy, old 3D/motion files, contact API/validation, unused data and four packages |

Deviations from the original plan, all deliberate:

- Poster reveals are a short rise-and-fade rather than a clip-path wipe; the simpler move reads better against the large artwork and costs less on scroll.
- The 3D scene is desktop/tablet only (≥768px). Phones keep the CSS sculpture, which preserves the composition without shipping the Three.js chunk.
- There is no scroll-linked experience rule; the offset heading and hairline rows carry the section without another animation.
- The theme control is an icon button, not a segmented thumb, to keep the header quiet at 1024px.

### 9.2 Checks run

| Check | Command / method | Result |
| :--- | :--- | :--- |
| TypeScript | `pnpm typecheck` | pass, 0 errors |
| Lint | `pnpm lint` | pass, 0 errors |
| Tests | `pnpm test` | 7/7 pass (site config, security headers, SEO artifacts) |
| Production export | `pnpm build` | pass; 7 static routes, `out/` served with trailing slashes |
| Accessibility | axe-core 4.x, WCAG 2.0/2.1/2.2 A+AA | 0 violations on: home 1440 light, home 1440 dark, home 390 light, résumé 1440 light, résumé 390 dark |
| Responsive | Playwright at 360 / 390 / 768 / 1024 / 1440 / 1920 | no horizontal overflow at any width; H1 62.4 / 62.4 / 82.9 / 110.6 / 128 / 128px |
| Themes | toggle + reload | persists; dark class and background present at `DOMContentLoaded` (no flash); round-trip back to light |
| No JavaScript | JS disabled | H1, all headings, project titles, contact links and 27 links render; reveals are not hidden |
| No WebGL | `--disable-webgl` | no canvas, 9-plate CSS fallback, no console errors |
| Reduced motion | `prefers-reduced-motion: reduce` | no canvas, no timelines, all content visible, smooth scroll disabled |
| Interactions | Playwright | anchor lands 96px below viewport top; copy email writes the address and announces it; mobile menu locks scroll, moves and restores focus, closes on Escape; all external links have `noopener noreferrer` |
| Console | production export, all routes | 0 errors (prefetch 404 from `/resume` removed with `prefetch={false}`) |
| Layout stability | cold load, 1440×900 | CLS 0.000 |
| Paint (local static server) | Chromium | FCP 516ms, LCP 516ms, DOMContentLoaded 64ms, load 333ms |

Screenshots and machine-readable results: `docs/portfolio/screenshots/v3/` (`desktop-*`, `laptop-*`, `tablet-*`, `mobile-*`, section captures, `no-js.png`, `no-webgl.png`, `reduced-motion.png`, `mobile-menu-open.png`, `capture-metrics.json`, `audit-results.json`).

### 9.3 Bundle and asset weight (local, uncompressed)

| Asset | Size |
| :--- | :--- |
| HTML (with RSC payload) | 135 KB |
| Initial JavaScript (desktop) | ≈912 KB raw across 11 chunks |
| Deferred Three.js chunk | 908 KB raw, desktop/tablet only, loaded after idle |
| Initial JavaScript (mobile, no 3D) | ≈817 KB raw |
| CSS | 52 KB |
| Self-hosted fonts | 98 KB |
| Total `out/` export | 2.8 MB |

GitHub Pages serves these compressed. The animation stack is the dominant cost (GSAP + Framer Motion + React); the Three.js chunk is the single largest file and is deliberately kept out of the mobile path.

### 9.4 Deployment note

The export is static, has no server dependency, and keeps `output: "export"`, `trailingSlash: true`, `.nojekyll`, sitemap, robots, 404 and the existing Pages workflow. The configured target remains `https://codeswithrakib.github.io/` (`config/site.ts` is asserted by tests).

Two facts were verified against the live account while checking compatibility:

1. The configured remote is `https://github.com/CodesWithRakib/CodesWithRakib.git`, which is a **project** repository. GitHub Pages serves project sites at `https://codeswithrakib.github.io/CodesWithRakib/`, while the configured canonical URL is the root. The root currently returns GitHub's “Site not found”, and `/CodesWithRakib/` currently serves a different profile page. The code supports both cases: `NEXT_PUBLIC_BASE_PATH=/CodesWithRakib` switches assets and links to the project path at build time. Republishing the site at the root still requires either renaming the repository to `CodesWithRakib.github.io` or setting Pages to serve this repository at the root/custom domain.
2. The Vercel deployment (`codeswithrakib.vercel.app`) is live but unrelated to this export; it is not used as the canonical URL.

No deployment was performed as part of this work. The GitHub Actions workflow is unchanged and still runs lint → typecheck → tests → build → artifact checks before uploading `out/`.
