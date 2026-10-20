# Route & Component Architecture Map — Phase 03 Status

**Subject:** Md. Rakib Islam — Developer Portfolio  
**Status:** Phase 03 Implemented (Hero & About Complete)  
**Architecture:** Next.js 16 App Router (React Server Components by default; Client Components restricted strictly to interactive leaf nodes)

---

## 1. Implemented Component Tree

```
app/layout.tsx (Server Component)
 ├── ThemeProvider (Client Component — theme state only)
 ├── SkipToContent (Server Component — accessible keyboard skip anchor)
 ├── Navbar (Client Component — brand identity, scroll spy, mobile drawer)
 └── app/page.tsx (Server Component)
      │
      ├── HeroSection (Server Component — components/sections/HeroSection.tsx) [PHASE 03 VERIFIED]
      │    ├── StatusBadge ("Available for select Frontend & Full-Stack opportunities")
      │    ├── RoleHeadline & ValueProp
      │    ├── PrimaryCTAs (Explore My Work [#projects], Contact Me [#contact], Resume PDF [/resume])
      │    ├── VerifiedSocialLinks (GitHub, LinkedIn, Email)
      │    └── ArchitecturalCodeCard (Rakib.profile.ts terminal-style verified snapshot)
      │
      ├── AboutSection (Server Component — components/sections/AboutSection.tsx) [PHASE 03 VERIFIED]
      │    ├── SectionHeader ("ABOUT ME: Engineering with clarity, type safety, and real-world intent")
      │    ├── NarrativeParagraphs (SOFOF Tech client SaaS, Next.js, RTL, full-stack expansion)
      │    ├── FullStackTrajectoryCard (Honest growth statement)
      │    ├── 4 CoreEngineeringFocusPillars (Architecture, Contracts, SaaS Workflows, Localization)
      │    └── 5 EvidenceBackedStrengthsGrid (Strictly mapped to verified monorepo code)
      │
      ├── #projects Target (Server Component — Flagship Overview queued for Phase 04)
      │    ├── SectionHeader & Phase 04 Queue Notice
      │    └── MinimalProjectCardsGrid (OgroniEdu, Dhruto, Gramer Bazar GitHub links)
      │
      ├── #experience & #skills Target (Server Component — SOFOF Tech Banner queued for Phase 05)
      │
      ├── #contact Target (Server Component — Direct Verified Channels queued for Phase 06)
      │    └── DirectContactButtons (Email mailto, LinkedIn, GitHub)
      │
      └── Footer (Server Component — components/layout/Footer.tsx) [PHASE 02 VERIFIED]
           ├── Copyright & Stack Disclosure
           ├── VerifiedSocialIcons (Icons.gitHub, Icons.linkedIn, Mail)
           └── BackToTopAnchor
```

---

## 2. Server vs. Client Boundary Map

| Component | File Path | Rendering Type | Purpose |
| :--- | :--- | :--- | :--- |
| **HeroSection** | `components/sections/HeroSection.tsx` | **Server Component** | Static markup, instant FCP, zero JS bundle cost |
| **AboutSection**| `components/sections/AboutSection.tsx`| **Server Component** | Editorial narrative, focus cards, strengths grid |
| **Navbar** | `components/layout/Navbar.tsx` | **Client Component** | Mobile hamburger drawer state management |
| **ThemeToggle** | `components/layout/ThemeToggle.tsx`| **Client Component** | `useSyncExternalStore` theme switching |
| **Footer** | `components/layout/Footer.tsx` | **Server Component** | Static semantic footer with inline SVG icons |
| **Container** | `components/layout/Container.tsx` | **Server Component** | Layout wrapper (`max-w-6xl` responsive padding) |
| **SectionHeader**| `components/shared/SectionHeader.tsx`| **Server Component** | Reusable H2 + badge typography primitive |

---

## 3. Verified CTA & Anchor Target Mapping

| CTA Label | Source Location | Destination | Verification Method |
| :--- | :--- | :--- | :--- |
| **Explore My Work** | Hero Primary Action | `#projects` | Evaluated in Chrome DevTools; smooth scrolls to `#projects` |
| **Get In Touch** | Hero Secondary Action | `#contact` | Evaluated in Chrome DevTools; smooth scrolls to `#contact` |
| **Resume PDF** | Hero & Navbar Action | `/resume` | Static link configured to canonical resume asset |
| **GitHub Profile** | Hero & Contact Action | `https://github.com/CodesWithRakib` | Opens verified profile in new tab |
| **LinkedIn Profile**| Hero & Contact Action | `https://linkedin.com/in/codeswithrakib` | Opens verified profile in new tab |
| **Direct Email** | Hero & Contact Action | `mailto:codeswithrakib@gmail.com` | Opens default mail client |
