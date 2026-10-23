# Design System — V3 “Signal / Studio”

**Subject:** Md. Rakib Islam — recruiter-focused developer portfolio  
**Status:** Implemented and verified (October 22, 2026)  
**Stack:** Next.js 16 App Router · React 19 · TypeScript strict · Tailwind CSS 4 · GSAP · Framer Motion · React Three Fiber

Current implementation evidence: [`REDESIGN_PLAN.md`](./REDESIGN_PLAN.md) §9. Historical V1/V2 documents are listed in [`README.md`](./README.md).

---

## 1. Direction

An editorial gallery for an engineer: a porcelain or graphite canvas, oversized grotesque typography, a twelve-column grid, hairline rules, poster-scale project work and exactly one electric accent.

1. **Type does the work.** One display family, one reading family, mono only for labels and indices. No extra decorative faces.
2. **Asymmetry over equal cards.** Every section has its own composition: offset About, alternating work plates, offset experience spread, inverted contact finale.
3. **Whitespace is a material.** Section padding is 96–144px on desktop; nothing is packed to fill space.
4. **Evidence over adjectives.** Each project states what was actually built, links to its repository, and labels its visual as an interface study rather than a screenshot.
5. **Motion supports hierarchy.** Short entrances, one interactive 3D object, no scroll hijacking and no loading sequence.
6. **Accessibility is part of the style.** AA contrast, visible focus, reduced-motion parity, and a complete no-JS reading experience.

---

## 2. Typography

Loaded with `next/font/google` in `app/layout.tsx` (self-hosted, `display: swap`, latin subset):

| Role | Family | Variable | Usage |
| :--- | :--- | :--- | :--- |
| Display | **Bricolage Grotesque** (variable) | `--font-display-face` | H1–H4, project titles, email, wordmark |
| Reading | **Manrope** (variable) | `--font-sans-face` | Body, navigation, controls, lists |
| Label / code | **JetBrains Mono** (400/500) | `--font-mono-face` | Section indices, metadata, poster UI, stack lists |

Mapped in `@theme` as `--font-display`, `--font-sans`, `--font-mono`, with system fallbacks.

### Implemented scale

| Utility | Size | Notes |
| :--- | :--- | :--- |
| `.type-hero` | `clamp(3.9rem, 10.8vw, 8rem)` | 128px at 1440/1920, 62.4px at 390/360; uppercase, `line-height: 0.82`, `letter-spacing: -0.055em` |
| `.type-h2` | `clamp(2.5rem, 5vw, 4rem)` | 64px at 1440, 40px below 768 |
| `.type-h3` | `clamp(1.85rem, 3.2vw, 2.75rem)` | Project names, role titles |
| `.type-lead` | `clamp(1.2rem, 1.7vw, 1.5rem)` | Hero role statement |
| `.type-label` | 13px mono, uppercase, `0.16em` | Section indices and metadata |
| `.type-meta` | 14px mono | Poster captions, footer metadata |

Rules: body copy never below 17px; unsized secondary text never below 15px; no 8–11px labels anywhere. Reading measure capped at 46–62 characters with per-element `max-w-[ch]` utilities. Headings `text-wrap: balance`, paragraphs `text-wrap: pretty`. Hierarchy comes from scale and weight before colour.

---

## 3. Colour tokens

All colours are semantic CSS variables in `app/globals.css`, exposed to Tailwind through `@theme`. Components do not hardcode theme colours except inside the three art-directed poster palettes.

### Light — porcelain and ink

| Token | Value | Role |
| :--- | :--- | :--- |
| `--background` | `#F2F0EA` | Canvas |
| `--surface` | `#E8E5DC` | Quiet fills and hover |
| `--surface-raised` | `#FBFAF5` | Raised surfaces |
| `--foreground` | `#101114` | Primary ink |
| `--muted-foreground` | `#54565A` | Secondary text (≈6.4:1 on canvas) |
| `--border` | `#D3CFC3` | Hairlines |
| `--border-strong` | `#B9B3A4` | Emphasised rules |
| `--primary` | `#1B2AE0` | Cobalt accent and primary action |
| `--primary-foreground` | `#FBFBFF` | Text on cobalt |
| `--accent` | `#A9481F` | Clay marker (rare) |
| `--ring` | `#1B2AE0` | Focus |
| `--inverse-bg` | `#101114` | Contact finale band |
| `--inverse-fg` | `#F4F1E8` | Text on finale |

### Dark — graphite and bone

| Token | Value | Role |
| :--- | :--- | :--- |
| `--background` | `#0A0B0D` | Canvas |
| `--surface` | `#111215` | Quiet fills |
| `--surface-raised` | `#17181C` | Raised surfaces |
| `--foreground` | `#F0EDE5` | Warm bone ink |
| `--muted-foreground` | `#A7A49A` | Secondary text |
| `--border` | `#27282D` | Hairlines |
| `--border-strong` | `#3A3B41` | Emphasised rules |
| `--primary` | `#8F9BFF` | Periwinkle accent |
| `--primary-foreground` | `#0A0B22` | Text on periwinkle |
| `--accent` | `#D6A97C` | Sand marker |
| `--ring` | `#8F9BFF` | Focus |
| `--inverse-bg` | `#131A45` | Deep cobalt finale (not an inversion) |

Both themes are independently art-directed: light is paper and cobalt; dark is graphite with luminous periwinkle materials, dimmer hairlines and a deep-cobalt contact band. The poster palettes (`ink`, `clay`, `olive`) stay constant in both themes because they represent gallery artwork, not UI surfaces.

---

## 4. Surfaces, rules and utilities

- `.type-*` — the scale above.
- `.dot-field` — 26px radial dot texture, used once behind the hero with a radial mask.
- `.underline-grow` — background-size underline for text links.
- `.shadow-plate` — the single elevation token, used only on project posters.
- `.poster-ink` / `.poster-clay` / `.poster-olive` — poster palettes with `--poster-bg`, `-fg`, `-muted`, `-line`, `-accent`.
- `.poster`, `.poster-muted`, `.poster-line`, `.poster-accent` — poster-scoped surface utilities.

Borders are 1px and low-contrast. Shadows exist on the project posters and nowhere else. Radii: 2px for controls, 8px for panels, 14px for posters; no pill buttons in V3.

---

## 5. Layout

- **Container:** `max-w-[1240px]`, `px-5 sm:px-8 lg:px-10`.
- **Section rhythm:** `py-24 sm:py-28 lg:py-36`, separated by a 1px top rule. The contact finale breaks the rhythm with a full-width inverse band.
- **Hero:** 7/5 split on `lg`; name at display scale, three factual footnotes under a rule. Fits a 1440×900 viewport without clipping the rail.
- **About:** 4/8 split; the index column is sticky (`lg:sticky lg:top-28`), the statement and four capabilities sit in the right column.
- **Work:** alternating 7/5 poster/text plates; two additional projects as compact hairline rows.
- **Experience:** 4/8 offset heading; 7/5 role vs. toolkit spread.
- **Contact:** 8/4 split inside the inverse band; email action at display scale.
- **Section anchors:** every section carries `scroll-mt-24`; the fixed header is 80px tall.

---

## 6. Components

### Primitives

- **Button** (`components/ui/button.tsx`) — `cva` variants `primary`, `secondary`, `outline`, `ghost`, `link`; sizes `sm`–`xl`, `icon`. Rectangular with 2px radius, 44–52px height, visible focus ring.
- **Container** — max-width and responsive gutters.
- **Icons** — inline GitHub/LinkedIn SVGs; Lucide for interface icons only.
- **SkipToContent** — first focusable element, visible on focus.
- **PrintButton** — client control on `/resume`.

### Layout

- **SiteHeader** (client) — fixed 80px bar, wordmark, four desktop anchors, scroll-spy underline, scroll-progress hairline, theme toggle, “Let’s talk”. Mobile sheet is rendered as a sibling of the header so it can use viewport-fixed positioning; Escape closes it, focus moves in and returns, body scroll locks.
- **ThemeToggle** (client) — light/dark control with `aria-label`, persisted by `next-themes`; inline script prevents a flash.
- **SiteFooter** (server) — identity, four links, copyright, back-to-top.

### Sections

- **HeroSection** (client) — GSAP entrance timeline, name, role, value sentence, two CTAs, GitHub/LinkedIn, 3D scene, three factual footnotes.
- **AboutSection** (server + Reveal) — statement, two paragraphs, four capabilities.
- **WorkSection** (server + Reveal) — three poster plates, two compact rows, résumé link.
- **ExperienceSection** (server + Reveal) — one verified role, three contributions, platforms, stack, four toolkit groups.
- **ContactSection** (client) — inverse finale, email + copy action with live region, LinkedIn, GitHub, résumé, location and current role.

### Projects and 3D

- **ProjectArtwork** (server) — three original, theme-independent posters built from verified domain concepts: OgroniEdu role-gated workspace, Dhruto parcel lifecycle, Gramer Bazar faceted catalogue. Each is labelled “Interface study” and is not presented as a product screenshot.
- **HeroScene** (client) — WebGL detection, idle mount, `next/dynamic` with a static fallback, paused when off-screen/hidden, pointer-driven rotation.
- **StackSculpture** (client, lazy) — eleven rounded slabs, one accent slab, theme-aware materials, `Float` and contact shadows, DPR capped at 1.75.
- **StaticStack** (server-safe) — the same silhouette in CSS for no-WebGL, reduced-motion, pre-mount and mobile.

---

## 7. Motion system

Shared vocabulary in `lib/motion.ts`:

| Token | Value |
| :--- | :--- |
| `EASE_OUT` | `[0.22, 1, 0.36, 1]` |
| `EASE_IN_OUT` | `[0.65, 0, 0.35, 1]` |
| `DURATION` | `micro 0.16s`, `fast 0.26s`, `base 0.45s`, `slow 0.75s` |
| `GSAP_EASE` | `power3.out`, `power2.inOut`, `expo.out` |
| `springSoft` | stiffness 280, damping 32, mass 0.7 |

Ownership:

- **GSAP** — hero entrance, section/poster reveals (once, `top 88%`), with `useGSAP`, `gsap.matchMedia()` and explicit cleanup.
- **Framer Motion** — header active marker, mobile sheet, scroll progress, copy-email state.
- **R3F** — the hero sculpture only.
- **CSS** — colour, border, underline and hover transitions only.

Reduced motion removes timelines and WebGL, and leaves all content visible. No pinning, no smooth-scroll hijack, no custom cursor, no infinite decorative loop.

---

## 8. Accessibility & performance rules

- WCAG 2.2 AA; axe-core reports 0 violations on desktop light/dark, mobile light, and résumé light/dark.
- Focus: 2px `--ring` with 3px offset on every interactive element; the skip link is the first tab stop.
- The mobile menu is keyboard operable, labelled, and restores focus; the theme control is named by its next action.
- 3D is decorative, `aria-hidden`, loaded only at ≥768px, after idle, and paused when not visible; a CSS fallback is always present.
- No JS: all content, headings and links are server-rendered; GSAP/Framer never set initial hidden styles on the server.
- Fonts are self-hosted with metric-adjusted fallbacks; the hero media frame is intrinsically sized. CLS measured 0 on a cold load.
- Server Components by default; client boundaries are limited to the header, theme, hero, reveal wrapper, contact copy and 3D.

---

## 9. Verification

See [`REDESIGN_PLAN.md`](./REDESIGN_PLAN.md) §9 for the check matrix, axe results, viewport measurements, bundle weight and remaining caveats.
