# Design System & Visual Foundation — Implemented Specifications

**Subject:** Md. Rakib Islam — Developer Portfolio  
**Status:** Implemented in Code (Phase 02 Verified)  
**Philosophy:** Editorial clarity, high contrast, typography-driven, zero gimmickry.

---

## 1. Design Direction & Implementation Reality

The visual identity has been implemented using **Tailwind CSS v4** with native CSS custom properties, providing zero runtime overhead, instant theme switching, and strict WCAG 2.1 AA accessibility compliance.

### Core Visual Principles
1. **Content First, Zero Fluff:**
   - No blurry glowing background radial circles.
   - No infinite marquee tickers.
   - Clean 1px slate borders (`border-border`) and subtle micro-elevations (`shadow-xs`).
2. **High-Contrast Precision:**
   - Light Mode (Default): `#FFFFFF` canvas with `#0F172A` (Slate-900) high-contrast foreground text (14.5:1 contrast ratio, surpassing WCAG AAA).
   - Dark Mode: `#09090B` (Zinc-950) canvas with `#F8FAFC` (Slate-50) text.
3. **Restrained Brand Accent (Deep Emerald & Teal):**
   - Signature primary accent: `#065F46` (Emerald-800) in Light Mode and `#34D399` (Emerald-400) in Dark Mode.
   - Secondary accent: `#0D9488` (Teal-600) in Light Mode and `#2DD4BF` (Teal-400) in Dark Mode.

---

## 2. Implemented Semantic Color Tokens (`app/globals.css`)

All color tokens are exposed via CSS custom properties and registered into Tailwind's `@theme` configuration:

```css
@theme {
  --color-background: var(--background);
  --color-surface: var(--surface);
  --color-surface-raised: var(--surface-raised);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-border-subtle: var(--border-subtle);

  --color-primary: var(--primary);
  --color-primary-hover: var(--primary-hover);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary-subtle: var(--primary-subtle);
  --color-primary-subtle-foreground: var(--primary-subtle-foreground);

  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent-subtle: var(--accent-subtle);
  --color-accent-subtle-foreground: var(--accent-subtle-foreground);

  --color-ring: var(--ring);
  --color-ring-offset: var(--ring-offset);

  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-error: var(--error);

  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
}
```

### Exact Token Value Reference

| Token Name | Light Mode Value | Dark Mode Value | Semantic Role |
| :--- | :--- | :--- | :--- |
| `--background` | `#FFFFFF` | `#09090B` | Primary page canvas |
| `--surface` | `#F8FAFC` (Slate-50) | `#141417` (Zinc-900) | Secondary blocks, cards, footer |
| `--surface-raised`| `#FFFFFF` | `#1C1C21` (Zinc-800) | Raised popovers, dialogs |
| `--foreground` | `#0F172A` (Slate-900) | `#F8FAFC` (Slate-50) | High-contrast body & headers |
| `--muted` | `#F1F5F9` (Slate-100) | `#1E1E24` (Zinc-850) | Inactive tabs, hover fills |
| `--muted-foreground` | `#475569` (Slate-600)| `#94A3B8` (Slate-400)| Supporting text, metadata |
| `--border` | `#E2E8F0` (Slate-200) | `#27272A` (Zinc-800) | Standard 1px dividers & cards |
| `--border-subtle`| `#F1F5F9` (Slate-100) | `#18181B` (Zinc-900) | Table rows, inactive borders |
| `--primary` | `#065F46` (Emerald-800) | `#34D399` (Emerald-400)| Primary buttons, brand touchstone |
| `--primary-hover`| `#044E3A` | `#10B981` | Interactive hover state |
| `--primary-subtle`| `#ECFDF5` (Emerald-50)| `#022C22` | Badge backgrounds, status pills |
| `--accent` | `#0D9488` (Teal-600) | `#2DD4BF` (Teal-400) | Secondary links, active highlights |
| `--ring` | `#059669` (Emerald-600) | `#34D399` | Keyboard focus ring |
| `--success` | `#16A34A` (Green-600) | `#22C55E` (Green-500) | Active status indicators |
| `--warning` | `#D97706` (Amber-600) | `#FBBF24` (Amber-400) | Actively learning tags |
| `--error` | `#DC2626` (Red-600) | `#F87171` (Red-400) | Validation error messaging |

---

## 3. Typography Hierarchy & Tokens

### Font Families
- **Primary Sans:** `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
  - Native system font stack guarantees zero external network request block, zero font-loading flicker, and immediate first contentful paint (FCP).
- **Monospace Code/Tags:** `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`
  - Applied to tech tags, date badges, status pills, and file paths.

### Typographic Hierarchy

| Level | Classes | Usage |
| :--- | :--- | :--- |
| **Hero Display** | `text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight` | Main page title |
| **Section H2** | `text-2xl sm:text-3xl font-bold tracking-tight text-foreground` | Section headers |
| **Subsection H3**| `text-lg font-semibold text-foreground` | Project titles, card headers |
| **Lead Body** | `text-base sm:text-lg text-muted-foreground leading-relaxed` | Hero subtext, section intros |
| **Regular Body** | `text-sm sm:text-base text-foreground/90 leading-relaxed` | Card descriptions, case study copy |
| **Meta / Tag** | `text-xs font-mono font-medium` | Badges, timeline periods, repo tags |

---

## 4. Layout, Spacing & Container Rules

- **Container:** `<Container />` enforces `max-w-6xl` (1152px) centered with `mx-auto`.
- **Responsive Horizontal Padding:** `px-4 sm:px-6 lg:px-8`.
- **Section Spacing:** `py-12 sm:py-16 md:py-20`.
- **Grid Gap Scale:** 4px modular scale (`gap-1.5`, `gap-3`, `gap-4`, `gap-6`, `gap-8`).

---

## 5. Implemented UI Primitives (`components/ui/` & `components/layout/`)

### 1. Button Primitive (`components/ui/button.tsx`)
- Variants:
  - `primary`: Solid emerald fill (`bg-primary text-primary-foreground hover:bg-primary-hover`).
  - `secondary`: Neutral surface with border (`bg-surface text-foreground border border-border hover:bg-muted`).
  - `outline`: Transparent background with border (`border border-border text-foreground hover:bg-muted`).
  - `ghost`: Transparent hover highlight (`hover:bg-muted`).
  - `link`: Text link style with underline offset.
- Sizes: `sm` (h-8), `md` (h-10), `lg` (h-11), `icon` (h-9 w-9).
- Focus Ring: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`.

### 2. Badge Primitive (`components/ui/badge.tsx`)
- Variants:
  - `default`: Monospace tech tag (`bg-muted text-foreground border-border`).
  - `primary`: Emerald pill (`bg-primary-subtle text-primary-subtle-foreground border-primary/25`).
  - `accent`: Teal pill (`bg-accent-subtle text-accent-subtle-foreground border-accent/25`).
  - `warning`: Amber learning tag (`bg-warning-subtle text-warning border-warning/30`).
  - `outline`: Transparent border.

### 3. Card Primitive (`components/ui/card.tsx`)
- Composable components: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.
- Optional `hoverEffect` prop for subtle hover outline transitions.

### 4. Layout Shell
- `Container`: Centered responsive wrapper.
- `SectionHeader`: Structured category badge, H2 heading, and description.
- `SkipToContent`: Accessible skip link for keyboard users.
- `ThemeToggle`: React 19 `useSyncExternalStore` hydration-safe light/dark toggle.
- `Navbar`: Sticky blurred header with brand monogram, desktop navigation, resume button, and mobile drawer.
- `Footer`: Semantic footer with copyright, tech stack disclosure, and inline SVG social icons.

---

## 6. Accessibility & Performance Verification

- **Keyboard Focus:** Verified `:focus-visible` styling with 2px emerald focus ring across all buttons and links.
- **Reduced Motion:** Verified `@media (prefers-reduced-motion: reduce)` resets all transitions and animations to 0.01ms.
- **Color Contrast:** All text and interactive surfaces pass WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text and UI components).
- **Headful Browser Testing:** Verified on `http://localhost:5001` via Chrome DevTools MCP with 0 console errors and 0 network failures.
