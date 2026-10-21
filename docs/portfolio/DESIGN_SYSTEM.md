# Design System & Visual Foundation — V2

**Subject:** Md. Rakib Islam — Developer Portfolio

**Status:** Implemented and verified (V2 editorial redesign)

**Stack:** Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS 4 · GSAP · Framer Motion · React Three Fiber

**Reference:** `docs/portfolio/V2_VISUAL_REDESIGN.md` for implementation, measurements and audit evidence.

---

## 1. Direction

**"Editorial Studio"** — a working journal for a designer-engineer. Warm paper, ink typography, hairlines and generous margins in light mode; a midnight studio with graphite surfaces, citrine light and a blueprint grid in dark mode. Project presentation is bespoke rather than card-repeated, and motion is used to establish hierarchy.

Principles:

1. **One strong idea per viewport.** No competing badges, CTAs or micro-dashboards.
2. **Type does the work.** Display serif for identity and section titles; sans for reading; mono only for labels/paths.
3. **Asymmetry over grids of equals.** Flagship project at 5/7, offset 7/5 pair, sticky contents rail.
4. **Real material, not decoration.** Depth comes from type scale, rules, surfaces, lighting and the 3D atlas.
5. **Evidence over adjectives.** Project claims link to repositories; interface studies are labelled.
6. **Accessibility is part of the style.** AA contrast, visible focus, reduced-motion parity, semantic controls.

---

## 2. Typography

Loaded with `next/font/google` in `app/layout.tsx`:

| Role | Family | Usage |
| :--- | :--- | :--- |
| Display | **Instrument Serif** (400, italic) | Hero, section H2, project names, contact headline |
| Reading | **Inter Tight** (variable) | Body, navigation, controls, most UI |
| Label / code | **JetBrains Mono** (400/500) | Eyebrows, metadata, paths, status, tags |

CSS variables: `--font-display`, `--font-sans`, `--font-mono` (mapped in `@theme`), with local fallbacks (`Iowan Old Style`, `Palatino`, system sans, ui-monospace).

### Implemented scale

| Level | Classes | Notes |
| :--- | :--- | :--- |
| Hero | `text-[clamp(3.4rem,8.4vw,6.35rem)] leading-[0.88] tracking-[-0.03em]` | Two masked lines; italic accent word |
| H2 | `text-[clamp(2.15rem,4.4vw,3.65rem)] leading-[0.98] tracking-[-0.02em]` | `SectionHeader` |
| Project feature | `text-[clamp(2.6rem,5vw,4.1rem)]` | Flagship |
| Project secondary | `text-[clamp(2rem,3.6vw,2.9rem)]` | Offset pair |
| Lead copy | `text-[0.98rem] sm:text-[1.05rem] leading-relaxed` | Hero |
| Body | `text-[12px]`–`text-[13.5px]` | Editorial density by section |
| Eyebrow | `.eyebrow`: 11px mono, 0.2em tracking, uppercase | Section indices and labels |
| Micro label | 8–10px mono | Metadata and interface-study UI only |

Headings use `text-balance`; paragraphs use `text-pretty` where supported.

---

## 3. Colour tokens

All colours are semantic CSS variables in `app/globals.css` and exposed to Tailwind through `@theme`. Components never hardcode theme colours.

### Light — warm paper

| Token | Value | Role |
| :--- | :--- | :--- |
| `--background` | `#F4EFE6` | Parchment canvas |
| `--surface` | `#FAF6EF` | Section bands, footer |
| `--surface-raised` | `#FFFCF6` | Popovers |
| `--foreground` | `#191510` | Primary ink |
| `--muted` | `#EAE3D6` | Hover fills |
| `--muted-foreground` | `#62594B` | Secondary text (AA on paper) |
| `--border` | `#D8CFBF` | Rules and frames |
| `--border-subtle` | `#E7DFD1` | Inner dividers |
| `--primary` | `#9C3B12` | Oxide accent, primary actions |
| `--primary-hover` | `#7C2D0B` | Hover |
| `--primary-foreground` | `#FFF8F0` | Text on oxide |
| `--primary-subtle` | `#F2E2D5` | Accent surfaces |
| `--accent` | `#315C46` | Moss secondary |
| `--accent-subtle` | `#E2EAE1` | Secondary surfaces |
| `--ring` | `#9C3B12` | Focus |

### Dark — midnight studio

| Token | Value | Role |
| :--- | :--- | :--- |
| `--background` | `#0A0D10` | Midnight canvas |
| `--surface` | `#11161A` | Layers |
| `--surface-raised` | `#171D22` | Raised layers |
| `--foreground` | `#F1EDE4` | Warm white ink |
| `--muted` | `#1B2227` | Hover fills |
| `--muted-foreground` | `#A2A9A3` | Secondary text |
| `--border` | `#263039` | Rules and frames |
| `--border-subtle` | `#1A2127` | Inner dividers |
| `--primary` | `#E9B86A` | Citrine accent |
| `--primary-hover` | `#F3C87D` | Hover |
| `--primary-foreground` | `#1A1206` | Text on citrine |
| `--primary-subtle` | `#2A2114` | Accent surfaces |
| `--accent` | `#8FC0A9` | Sage secondary |
| `--accent-subtle` | `#12241C` | Secondary surfaces |
| `--ring` | `#E9B86A` | Focus |

Semantic status tokens (`success`, `warning`, `error` + subtle variants) exist in both themes and are used for form errors, status dots and delivery state.

### Art-direction tokens

- `--wash-1`, `--wash-2`: RGB triplets for radial hero washes.
- `--grid-line`, `--grid-opacity`: blueprint grid.
- `--grain-opacity`, `--grain-blend`: fixed paper grain overlay.
- `--panel-glass`, `--panel-line`: translucent surfaces.
- `--shadow-soft`, `--shadow-lift`: warm light shadows vs deep dark shadows.
- `--scene-panel`, `--scene-chrome`, `--scene-line`, `--scene-ink`, `--scene-accent`, `--scene-secondary`, `--scene-screen`: Three.js palette. The scene reads these at runtime, including on theme change.

---

## 4. Surfaces, rules and utilities

- `.paper-grain` — fixed SVG noise overlay, multiply in light / screen in dark, pointer-events none.
- `.blueprint-grid` — 88px technical grid using theme-aware line colour.
- `.wash-light` — theme-aware radial washes behind hero and contact.
- `.surface-plate` — bordered card surface with a top sheen.
- `.panel-edge` — translucent glass edge for overlays.
- `.rule` / `.hairline` — editorial dividers.
- `.eyebrow` — standard metadata label.
- `.underline-sweep` — background-size underline for text links.
- `.shadow-soft` / `.shadow-lift` — two controlled elevation levels.
- `.animate-drift` — slow 9s drift for static 3D fallback chips, only when motion is allowed.

Radii: full pills for actions, `rounded-2xl` for project plates/panels, `rounded-xl` for inner UI studies. Borders are 1px and low-contrast; shadows are sparse.

---

## 5. Layout

- **Container:** `max-w-[1240px]`, `px-5 sm:px-8 lg:px-10`.
- **Section rhythm:** `py-20 sm:py-28`; alternating `bg-surface/40` bands for Case Studies, Skills, Contact and Footer.
- **Grid:** 12-column desktop with 4/8, 5/7 and 7/5 splits; single column on mobile.
- **Sticky elements:** case-study contents rail and experience profile use `lg:sticky lg:top-28`.
- **Line length:** body copy capped at `max-w-md`–`max-w-2xl` (roughly 45–70 characters).
- **No fixed card heights** except media frames, preventing clipped overflow and layout shift.

---

## 6. Components

### Primitives

- **Button** — pill shape; variants `primary`, `secondary`, `outline`, `ghost`, `link`; sizes `sm`, `md`, `lg`, `xl`, `icon`. Focus ring uses `ring-ring` + `ring-offset-background`. Primary uses oxide/citrine material logic.
- **Badge** — uppercase mono label pill, 10px, 0.14em tracking; variants default/primary/accent/warning/outline.
- **Card** — existing composition API retained, default shadow removed, optional hover border.
- **SectionHeader** — index + rule + eyebrow; display H2; optional description; left/center alignment.
- **TiltCard** — Framer Motion pointer tilt with springs; disabled for touch/reduced motion.
- **Icons** — inline GitHub/LinkedIn SVG (no extra icon dependency).
- **Container / SkipToContent** — unchanged responsibilities.

### Layout components

- **Navbar** — sticky personal wordmark, scroll-spy navigation, segmented theme control, résumé link, accessible mobile panel.
- **ThemeToggle** — 68×36 segmented control; spring thumb; `aria-pressed`; no hydration mismatch.
- **Footer** — editorial identity block, complete index, elsewhere links, availability action, back-to-top.

### Section components

- **HeroSection** — GSAP timeline, 3D `HeroVisual`, definition-list facts.
- **FeaturedProjectsSection** — flagship + offset pair, GSAP clip reveals, `InterfaceStudy`.
- **CaseStudiesSection** — vertical tabs, dossier, evidence copy buttons, delivery `<details>`, foundational work.
- **ExperienceSection** — profile column, role facts, GSAP `TimelineProgress` contributions.
- **SkillsSection** — four evidence-labelled categories as typographic rows.
- **EngineeringStrengthsSection** — numbered principles with evidence and case-study links.
- **ContactSection** — large email action, copy control, validated form, animated status.
- **ResumePage** — editorial document route; PDF viewer when an asset exists, honest request state otherwise.

---

## 7. Motion system

Shared values in `lib/motion.ts`:

| Token | Value |
| :--- | :--- |
| `EASE_OUT` | `[0.22, 1, 0.36, 1]` |
| `EASE_IN_OUT` | `[0.65, 0, 0.35, 1]` |
| Durations | `micro 0.16s`, `fast 0.28s`, `base 0.5s`, `slow 0.8s` |
| `springSoft` | stiffness 260, damping 32, mass 0.7 |
| Variants | `fadeUp`, `fadeIn`, `staggerGroup`, `panelTransition` |

Rules:

- Animate transform and opacity for ordinary UI; animate `clip-path` only for intentional media reveals.
- GSAP owns hero sequencing and scroll-linked choreography; Framer Motion owns hover/state/layout; CSS owns colour/border/shadow.
- Never animate the same DOM property with two engines.
- Reduced motion removes timelines, variants, drift, smooth scroll and WebGL; content remains visible.
- No scroll hijacking, no long pins, no bouncing/spinning decorations, no text movement that harms reading.

---

## 8. Accessibility & performance rules

- WCAG 2.2 AA minimum; axe-core 0 violations on desktop light/dark and mobile.
- Focus-visible ring: 2px `--ring` with 2px offset; never removed without a replacement.
- Interactive targets at least 44×44px on mobile navigation.
- Tabs use roving tabindex and arrow/Home/End keys.
- Mobile menu sets `aria-expanded`, locks scroll, moves focus, closes on Escape, restores focus and closes on resize.
- Theme preference follows system by default, persists explicitly, and applies before paint.
- Reduced motion produces a fully static experience with no hidden content.
- 3D is decorative, `aria-hidden`, lazy-mounted after idle, paused off-screen/hidden, and replaced with a CSS fallback without WebGL.
- No layout shift: all media frames are intrinsically sized; CLS measured at 0.000.
- Keep client boundaries tight: Navbar, theme, hero, project reveals, tabs and contact are client components; Experience, Skills, Principles, Footer and most copy remain server-rendered.

---

## 9. Verification

See `V2_VISUAL_REDESIGN.md` sections 11–12 for bundle sizes, paint timings, long tasks, Playwright layout results, axe output and the full check matrix.
