# Route & Component Architecture Map — Phase 07 Status

**Subject:** Md. Rakib Islam — Developer Portfolio  
**Status:** Phase 07 Implemented (Full Interaction, Responsive UI & Accessibility Audit Complete)  
**Architecture:** Next.js 16 App Router (React Server Components by default; Client Components restricted strictly to interactive leaf nodes)

---

## 1. Implemented Component Tree

```
app/layout.tsx (Server Component — overflow-x-clip root containment) [PHASE 07 VERIFIED]
 ├── ThemeProvider (Client Component — theme state only)
 ├── SkipToContent (Server Component — accessible keyboard skip anchor)
 ├── Navbar (Client Component — brand identity, scroll spy, mobile drawer with Escape key & 44px touch targets, /#anchor cross-route links) [PHASE 07 VERIFIED]
 ├── app/resume/page.tsx (Server Component — /resume route) [PHASE 06 VERIFIED]
 │    ├── ReturnLink (/ to homepage)
 │    ├── StatusHero (Curated asset view if public/resume.pdf exists; honest request view if pending)
 │    ├── DirectActionButtons (Request via Email, LinkedIn, GitHub)
 │    └── InBrowserPDFViewer (Auto-enabled when public/resume.pdf is detected)
 ├── app/api/contact/route.ts (Dynamic Route Handler — /api/contact) [PHASE 06 VERIFIED]
 │    ├── IPRateLimiter (30-second sliding window mitigation)
 │    ├── ZodPayloadValidator (contactFormSchema with field-level errors)
 │    ├── HoneypotMitigation (Hidden botField filter with aria-hidden="true" & aria-label)
 │    └── DeliveryGateway (Resend integration when RESEND_API_KEY is present; honest 503 fallback when unconfigured)
 └── app/page.tsx (Server Component — / route)
      │
      ├── HeroSection (Server Component — components/sections/HeroSection.tsx) [PHASE 07 VERIFIED]
      │    ├── StatusBadge ("Available for select Frontend & Full-Stack opportunities")
      │    ├── RoleHeadline & ValueProp
      │    ├── PrimaryCTAs (Explore My Work [/#projects], Contact Me [/#contact], Resume PDF [/resume])
      │    ├── VerifiedSocialLinks (GitHub, LinkedIn, Email — flex-wrap with 44px hit areas)
      │    └── ArchitecturalCodeCard (Rakib.profile.ts terminal-style verified snapshot)
      │
      ├── AboutSection (Server Component — components/sections/AboutSection.tsx) [PHASE 03 VERIFIED]
      │    ├── SectionHeader ("ABOUT ME: Engineering with clarity, type safety, and real-world intent")
      │    ├── NarrativeParagraphs (SOFOF Tech client SaaS, Next.js, RTL, full-stack expansion)
      │    ├── FullStackTrajectoryCard (Honest growth statement)
      │    ├── 4 CoreEngineeringFocusPillars (Architecture, Contracts, SaaS Workflows, Localization)
      │    └── 5 EvidenceBackedStrengthsGrid (Strictly mapped to verified monorepo code)
      │
      ├── FeaturedProjectsSection (Client Component — components/sections/FeaturedProjectsSection.tsx) [PHASE 07 VERIFIED]
      │    ├── SectionHeader ("FLAGSHIP MONOREPOS & SAAS ARCHITECTURE")
      │    ├── QuickLink (All Repositories on GitHub)
      │    └── 3 Flagship Project Showcase Cards with aria-label CTAs (OgroniEdu, Dhruto, Gramer Bazar SaaS)
      │
      ├── CaseStudiesSection (Client Component — components/sections/CaseStudiesSection.tsx) [PHASE 07 VERIFIED]
      │    ├── SectionHeader ("DEEP-DIVE TECHNICAL CASE STUDIES")
      │    ├── W3C WAI-ARIA Tablist with keyboard Arrow / Home / End navigation ([OgroniEdu] | [Dhruto] | [Gramer Bazar SaaS])
      │    ├── Interactive Case Study TabPanel:
      │    │    ├── Hero Summary Card (Native titles, Role badge, Verified Monorepo pill, Stakeholder tags)
      │    │    ├── The Operational Problem (Domain-specific failure modes and business constraints)
      │    │    ├── Technical Approach & Decisions (4 numbered architectural strategy cards)
      │    │    ├── Verified Implementation Highlights & Real File References (Copyable verified code paths with explicit aria-labels)
      │    │    ├── Technical Challenges & Engineering Trade-offs (Non-trivial edge cases and architectural solutions)
      │    │    ├── Verified Status & Delivery Matrix (Implemented vs. Active In-Progress vs. Roadmap)
      │    │    ├── Deployment & Staging Callout (Explicit environment transparency)
      │    │    └── Recommended Repository Inspection Paths (Hiring manager code review guidance)
      │    └── Foundational Milestones Sub-Section (Globira E-Commerce, Plant Tracker)
      │
      ├── ExperienceSection (Server Component — components/sections/ExperienceSection.tsx) [PHASE 05 VERIFIED]
      │    ├── SectionHeader ("PROFESSIONAL WORK EXPERIENCE")
      │    └── SOFOF Tech Presentation Card (Junior Frontend Developer, 6 verified responsibilities, client platforms)
      │
      ├── SkillsSection (Server Component — components/sections/SkillsSection.tsx) [PHASE 05 VERIFIED]
      │    ├── SectionHeader ("TECHNICAL CAPABILITIES & PROFICIENCY")
      │    ├── Classification Policy Banner (Zero arbitrary percentage meters disclosure)
      │    └── 4 Structured Skill Category Cards (Frontend, State/Forms, Backend/DB, Workflows/Tools)
      │
      ├── EngineeringStrengthsSection (Server Component — components/sections/EngineeringStrengthsSection.tsx) [PHASE 05 VERIFIED]
      │    ├── SectionHeader ("ENGINEERING STRENGTHS & PRINCIPLES")
      │    └── 4 Practical Pillars (Maintainable UI, Type Safety Boundaries, SaaS Modeling, Resilient UX)
      │
      ├── ContactSection (Client Component — components/sections/ContactSection.tsx) [PHASE 07 VERIFIED]
      │    ├── SectionHeader ("GET IN TOUCH & CONNECT")
      │    ├── Recruiter Quick Contact Card (Availability, Location, SLA, One-Click Copy Email, LinkedIn, GitHub, Resume Link)
      │    └── Production Contact Form:
      │         ├── Status Feedback Banner (Success delivery / Honest fallback notice)
      │         ├── Zod-Validated Form Fields with aria-invalid, aria-describedby, role="alert"
      │         ├── Honeypot Bot Mitigation (Hidden botField with aria-hidden="true" & aria-label)
      │         └── Send Message Action with Submitting Spinner & Fallback mailto trigger
      │
      └── Footer (Server Component — components/layout/Footer.tsx) [PHASE 07 VERIFIED]
           ├── Copyright & Stack Disclosure
           ├── VerifiedSocialIcons (Icons.gitHub, Icons.linkedIn, Mail with 44x44px touch targets)
           └── BackToTopAnchor (44x44px touch target linking to #main-content)
```

---

## 2. Server vs. Client Boundary Map

| Component | File Path | Rendering Type | Purpose |
| :--- | :--- | :--- | :--- |
| **HeroSection** | `components/sections/HeroSection.tsx` | **Server Component** | Static markup, instant FCP, zero JS bundle cost |
| **AboutSection**| `components/sections/AboutSection.tsx`| **Server Component** | Editorial narrative, focus cards, strengths grid |
| **FeaturedProjectsSection** | `components/sections/FeaturedProjectsSection.tsx` | **Client Component** | Cross-component event dispatching to activate case study tabs |
| **CaseStudiesSection** | `components/sections/CaseStudiesSection.tsx` | **Client Component** | Tab switching, URL hash sync, copy-to-clipboard file paths |
| **ExperienceSection** | `components/sections/ExperienceSection.tsx` | **Server Component** | Static markup for SOFOF Tech role |
| **SkillsSection** | `components/sections/SkillsSection.tsx` | **Server Component** | Categorized capability cards with zero percentage bars |
| **EngineeringStrengthsSection**| `components/sections/EngineeringStrengthsSection.tsx`| **Server Component** | 4 core principles with cross-links to case studies |
| **ContactSection** | `components/sections/ContactSection.tsx` | **Client Component** | Form state, React Hook Form validation, copy-to-clipboard |
| **ResumePage** | `app/resume/page.tsx` | **Server Component** | Static `/resume` route with asset detection |
| **ContactApiRoute** | `app/api/contact/route.ts` | **API Route Handler** | Server-side validation, rate limiting, and email dispatch |
| **Navbar** | `components/layout/Navbar.tsx` | **Client Component** | Mobile hamburger drawer state management |
| **ThemeToggle** | `components/layout/ThemeToggle.tsx`| **Client Component** | `useSyncExternalStore` theme switching |
| **Footer** | `components/layout/Footer.tsx` | **Server Component** | Static semantic footer with inline SVG icons |

---

## 3. Verified CTA & Anchor Target Mapping

| CTA Label | Source Location | Destination | Verification Method |
| :--- | :--- | :--- | :--- |
| **Explore My Work** | Hero Primary Action | `#projects` | Smooth scrolls to `#projects` showcase |
| **Inspect Case Study** | Featured Card Action | `#case-studies` | Dispatches `select-case-study` event and switches active tab |
| **Copy Email Button** | Contact Card Action | Clipboard | Copies `codeswithrakib@gmail.com` with visual feedback |
| **Access Resume Overview**| Contact Card Action | `/resume` | Navigates to `/resume` route |
| **Resume Navbar Action** | Navbar Item | `/resume` | Navigates to `/resume` route |
| **Request Resume via Email**| Resume Page Action | `mailto:codeswithrakib@gmail.com` | Opens email client with prefilled subject |
| **Return to Portfolio** | Resume Page Action | `/` | Navigates back to homepage |
| **Send Message** | Contact Form Button | `POST /api/contact` | Validated by Zod, handles loading & feedback |
| **LinkedIn Profile** | Contact & Hero Actions | `https://linkedin.com/in/codeswithrakib` | Opens verified profile in new tab |
| **GitHub Profile** | Contact & Hero Actions | `https://github.com/CodesWithRakib` | Opens verified profile in new tab |
