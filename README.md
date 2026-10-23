# Portfolio foundation

The shared, theme-agnostic base for the portfolio's three theme branches
(space, terminal, 3d-desk). It holds the content model, design tokens, motion
primitives and app shell only — no theme-specific layout or 3D.

## Stack

- Next.js 16 (App Router) + React 19, TypeScript strict
- Tailwind CSS 4 with CSS-variable tokens
- Framer Motion for component animation
- GSAP + ScrollTrigger for scroll storytelling
- Lenis smooth scroll, synced to the GSAP ticker
- React Three Fiber + Drei installed for the branches that need 3D
- ESLint (flat config) + Prettier

## Scripts

| Command             | What it does                        |
| :------------------ | :---------------------------------- |
| `pnpm dev`          | Dev server on http://localhost:3000 |
| `pnpm build`        | Production build                    |
| `pnpm start`        | Serve the production build          |
| `pnpm typecheck`    | `tsc --noEmit`                      |
| `pnpm lint`         | ESLint                              |
| `pnpm format`       | Prettier write                      |
| `pnpm format:check` | Prettier check                      |

## Structure

```
src/
  app/
    layout.tsx          # fonts, metadata, shell: Lenis, cursor, progress, loader
    page.tsx            # minimal placeholder for theme branches to replace
    not-found.tsx
  components/
    shared/
      Cursor.tsx        # spring cursor, fine pointers only
      Loader.tsx        # GSAP preloader, onComplete callback
      MagneticButton.tsx
      ScrollProgress.tsx
      Seo.tsx           # JSON-LD (metadata lives in lib/seo.ts)
      SmoothScroll.tsx  # mounts useLenis
      SoundToggle.tsx   # UI + state stub
  content/
    profile.ts          # profile + siteConfig
    projects.ts
    skills.ts
    experience.ts
  lib/
    cn.ts
    motion.ts           # variants, easing, registerGsapPlugins, prefersReducedMotion
    seo.ts              # createMetadata wrapper over the Metadata API
    useLenis.ts         # Lenis + ticker, shared scrollTo()
  styles/
    tokens.css          # the only place with raw values
    globals.css         # Tailwind wiring + base/Lenis/cursor styles
  types/
    index.ts
```

## Rules the branches inherit

1. **Tokens are the theme.** Override the variables in `src/styles/tokens.css`
   (or add a theme scope class); do not add raw colours to components.
2. **Content is data.** Swap `src/content/*` and keep the types in
   `src/types/index.ts` as the contract.
3. **Replace `src/app/page.tsx`.** Keep the shell in `layout.tsx`: skip link,
   Lenis provider, scroll progress, cursor, loader and SEO.
4. **Accessibility is not optional.** Every animation checks reduced motion;
   the loader is client-only so the page still renders without JavaScript.
5. **3D is decorative.** Mount R3F scenes lazily, mark them `aria-hidden`, and
   provide a static fallback for reduced motion and missing WebGL.

## Notes

- `createMetadata()` in `lib/seo.ts` is the Metadata API wrapper. App Router
  metadata cannot be emitted from a rendered component, so `Seo.tsx` renders
  the matching Person / WebSite / WebPage JSON-LD instead.
- Lenis is skipped entirely when `prefers-reduced-motion: reduce` is set;
  `scrollTo()` falls back to native scrolling with `behavior: "auto"`.
- `public/avatar.svg` and `public/og.png` are placeholders.
