# Route & Component Architecture Map — Phase 05 Status

**Subject:** Md. Rakib Islam — Developer Portfolio  
**Status:** Phase 05 Implemented (Professional Experience, Technical Skills & Engineering Strengths Complete)  
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
      ├── FeaturedProjectsSection (Client Component — components/sections/FeaturedProjectsSection.tsx) [PHASE 04 VERIFIED]
      │    ├── SectionHeader ("FLAGSHIP MONOREPOS & SAAS ARCHITECTURE")
      │    ├── QuickLink (All Repositories on GitHub)
      │    └── 3 Flagship Project Showcase Cards (OgroniEdu, Dhruto, Gramer Bazar SaaS)
      │
      ├── CaseStudiesSection (Client Component — components/sections/CaseStudiesSection.tsx) [PHASE 04 VERIFIED]
      │    ├── SectionHeader ("DEEP-DIVE TECHNICAL CASE STUDIES")
      │    ├── Accessible Tablist ([OgroniEdu] | [Dhruto] | [Gramer Bazar SaaS])
      │    ├── Interactive Case Study TabPanel:
      │    │    ├── Hero Summary Card (Native titles, Role badge, Verified Monorepo pill, Stakeholder tags)
      │    │    ├── The Operational Problem (Domain-specific failure modes and business constraints)
      │    │    ├── Technical Approach & Decisions (4 numbered architectural strategy cards)
      │    │    ├── Verified Implementation Highlights & Real File References (Copyable verified code paths)
      │    │    ├── Technical Challenges & Engineering Trade-offs (Non-trivial edge cases and architectural solutions)
      │    │    ├── Verified Status & Delivery Matrix (Implemented vs. Active In-Progress vs. Roadmap)
      │    │    ├── Deployment & Staging Callout (Explicit environment transparency)
      │    │    └── Recommended Repository Inspection Paths (Hiring manager code review guidance)
      │    └── Foundational Milestones Sub-Section (Globira E-Commerce, Plant Tracker)
      │
      ├── ExperienceSection (Server Component — components/sections/ExperienceSection.tsx) [PHASE 05 VERIFIED]
      │    ├── SectionHeader ("PROFESSIONAL WORK EXPERIENCE")
      │    └── SOFOF Tech Presentation Card:
      │         ├── Header Row (Junior Frontend Developer, SOFOF Tech, Present, Dhaka Bangladesh)
      │         ├── Role Overview (Client SaaS platforms, WebRTC consultations, RTL layouts)
      │         ├── Verified Contributions & Practical Responsibilities (6 Action+Tech+Purpose cards)
      │         ├── Production Client Platforms Mentioned (Tamkeen, MyCoifeur, Deshbyte)
      │         └── Daily Production Technologies Tags (Next.js 16, React 19, TS, RTK, Agora RTC, etc.)
      │
      ├── SkillsSection (Server Component — components/sections/SkillsSection.tsx) [PHASE 05 VERIFIED]
      │    ├── SectionHeader ("TECHNICAL CAPABILITIES & PROFICIENCY")
      │    ├── Classification Policy Banner (Zero arbitrary percentage meters disclosure)
      │    └── 4 Structured Skill Category Cards:
      │         ├── Frontend Development (Primary Focus & Daily Production)
      │         ├── State Management & Forms (Daily Production Practice)
      │         ├── Backend & Database Architecture (Demonstrated in Monorepos)
      │         └── Engineering Workflows & Tools (Active Practice & Growth)
      │
      ├── EngineeringStrengthsSection (Server Component — components/sections/EngineeringStrengthsSection.tsx) [PHASE 05 VERIFIED]
      │    ├── SectionHeader ("ENGINEERING STRENGTHS & PRINCIPLES")
      │    └── 4 Practical Pillars:
      │         ├── Maintainable Component & UI Architecture (Practical impact + OgroniEdu link)
      │         ├── Type Safety Across System Boundaries (Practical impact + Shared contracts link)
      │         ├── Complex SaaS Workflow & State Modeling (Practical impact + Dhruto state machine link)
      │         └── Bidirectional (RTL/LTR) & Accessible Interfaces (Practical impact + SOFOF Tech link)
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
| **FeaturedProjectsSection** | `components/sections/FeaturedProjectsSection.tsx` | **Client Component** | Cross-component event dispatching to activate case study tabs |
| **CaseStudiesSection** | `components/sections/CaseStudiesSection.tsx` | **Client Component** | Tab switching, URL hash sync, copy-to-clipboard file paths |
| **ExperienceSection** | `components/sections/ExperienceSection.tsx` | **Server Component** | Static markup for SOFOF Tech role, zero hydration overhead |
| **SkillsSection** | `components/sections/SkillsSection.tsx` | **Server Component** | Categorized capability cards with zero percentage bars |
| **EngineeringStrengthsSection**| `components/sections/EngineeringStrengthsSection.tsx`| **Server Component** | 4 core principles with cross-links to case studies |
| **Navbar** | `components/layout/Navbar.tsx` | **Client Component** | Mobile hamburger drawer state management |
| **ThemeToggle** | `components/layout/ThemeToggle.tsx`| **Client Component** | `useSyncExternalStore` theme switching |
| **Footer** | `components/layout/Footer.tsx` | **Server Component** | Static semantic footer with inline SVG icons |
| **Container** | `components/layout/Container.tsx` | **Server Component** | Layout wrapper (`max-w-6xl` responsive padding) |
| **SectionHeader**| `components/shared/SectionHeader.tsx`| **Server Component** | Reusable H2 + badge typography primitive |

---

## 3. Verified CTA & Anchor Target Mapping

| CTA Label | Source Location | Destination | Verification Method |
| :--- | :--- | :--- | :--- |
| **Explore My Work** | Hero Primary Action | `#projects` | Smooth scrolls to `#projects` showcase |
| **Inspect Case Study** | Featured Card Action | `#case-studies` | Dispatches `select-case-study` event and switches active tab |
| **Experience Nav Link** | Navbar Item | `#experience` | Smooth scrolls to SOFOF Tech experience section |
| **Skills Nav Link** | Navbar Item | `#skills` | Smooth scrolls to categorized capabilities section |
| **Principles Nav Link** | Navbar Item | `#principles` | Smooth scrolls to engineering strengths section |
| **Inspect OgroniEdu Architecture** | Principles Card Action | `#case-study-ogroniedu` | Jumps to OgroniEdu case study tab |
| **Inspect Shared Contracts** | Principles Card Action | `#case-study-ogroniedu` | Jumps to OgroniEdu case study tab |
| **Inspect Dhruto State Machine** | Principles Card Action | `#case-study-dhruto` | Jumps to Dhruto case study tab |
| **View SOFOF Tech Experience** | Principles Card Action | `#experience` | Scrolls to SOFOF Tech experience |
| **Get In Touch** | Hero Secondary Action | `#contact` | Smooth scrolls to `#contact` |
| **Resume PDF** | Hero & Navbar Action | `/resume` | Static link configured to canonical resume asset |
