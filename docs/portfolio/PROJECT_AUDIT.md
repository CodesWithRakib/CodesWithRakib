# Project Audit & Technical Evaluation

**Date:** October 2026  
**Auditor:** Senior Product Designer & Staff-Level Frontend Engineer  
**Subject:** Md. Rakib Islam — Recruiter-Focused Developer Portfolio

---

## 1. Executive Summary

This document establishes the baseline audit for Md. Rakib Islam's developer portfolio. It evaluates the current repository state, reviews his existing deployed portfolio, analyzes the source code of his primary projects located on the local development environment, and defines the technical path to build a high-conversion, recruiter-focused portfolio.

The portfolio's primary objective is to communicate **credible, production-oriented frontend engineering ability** (focused on React, Next.js, and TypeScript) with an authentic, verified progression into **full-stack engineering, databases, and system design**.

---

## 2. Existing Repository State (`CodesWithRakib`)

| Attribute | Current Value | Notes |
| :--- | :--- | :--- |
| **Local Path** | `C:\Sofof_tech_2026\CodesWithRakib` | Active git workspace |
| **Git Remote** | `https://github.com/CodesWithRakib/CodesWithRakib.git` | GitHub personal profile repository |
| **Active Branch** | `main` | Clean working tree |
| **Existing Files** | `README.md`, `.git` | Profile README with shields, typing SVG, and project summary |
| **Package Architecture**| None currently configured | Needs Next.js App Router, TypeScript, and Tailwind CSS setup |
| **Installed Runtimes** | Node `v26.8.1`, npm `11.10.0`, pnpm `12.4.2` | Modern Node.js LTS/Current environment |

### Assessment of Existing Repository
- The repository previously functioned strictly as a GitHub profile README repository.
- There are no legacy config files or obsolete codebases in this directory to conflict with a modern Next.js setup.
- The `README.md` file contains valuable baseline biographical information, social links, and project descriptions that have been reviewed and refined for accuracy.

---

## 3. Audit of Existing Deployed Portfolio (`codeswithrakib.vercel.app`)

An automated inspection of the current live portfolio at `https://codeswithrakib.vercel.app` revealed several critical shortcomings from a technical recruiter's perspective:

1. **Vague Positioning vs. Reality:**
   - **Current Headline:** *"Portfolio | Full Stack Developer"*
   - **Problem:** Generic claim that dilutes Rakib's genuine strength as a **Frontend Developer at SOFOF Tech** with deep React/Next.js/TypeScript competence and practical full-stack growth.
2. **Visual Fluff over Substance:**
   - Heavy use of blurry green/emerald radial gradient blobs (`blur-3xl`), decorative background grids, and generic card glow effects.
   - Infinite marquee displaying tech badges (Bootstrap, Firebase, Express, Figma, Vite) with "Hover to pause"—a common template trope that recruiters often skip.
3. **Lack of Deep Technical Evidence:**
   - Projects are listed at a surface level without architectural context, component design breakdown, state management decisions, or verified code links.
   - Does not demonstrate *how* problems were solved, what architectural trade-offs were made, or what Rakib's exact responsibilities were.
4. **Missing Resume & Actionable Conversion:**
   - Lacks direct, frictionless access to an up-to-date resume and concrete contact paths.

---

## 4. Verification of Main Projects & Codebase Inspection

An in-depth review was conducted on the actual local repositories located in `C:\Sofof_tech_2026\`:

### Project A: OgroniEdu
- **Local Location:** `C:\Sofof_tech_2026\ogroniedu`
- **GitHub Repository:** `https://github.com/CodesWithRakib/ogroniedu`
- **Architecture:** Monorepo (`pnpm` workspace + Turborepo)
  - `apps/web`: Next.js 16.4.0, React 19.3.0, TypeScript 7.0.2, Tailwind CSS 4.3.3, Redux Toolkit 2.13.0, Radix UI primitives, `next-intl` (bilingual English/Bangla), `socket.io-client`, Vitest, Playwright.
  - `apps/api`: NestJS 12.1.2, TypeORM 1.1.2, PostgreSQL (`pg`), JWT authentication, bcryptjs, class-validator, Swagger/OpenAPI, Socket.io, Terminus.
  - `packages/contracts`: Shared schemas and interfaces enforcing type parity between frontend and backend.
  - `packages/database`: Centralized TypeORM entities and migration management.
- **Verified Implementations:**
  - Role-based routing and protection: Dedicated layout shells for `(admin)`, `(dashboard)`, `(public)`, `tutor`, `guardian`, and `student`.
  - Comprehensive RTK Query slice architecture: 18 modular services (`admin-api`, `bookings-api`, `learning-api`, `payments-api`, `trust-api`, `taxonomy-api`, etc.).
  - Web Audio API notification sounds (`notification-sound.ts`).
  - Full bilingual i18n support (`[locale]` routes with `next-intl`).
- **Verified Status:** Core architecture, auth shells, API services, and responsive UI components are implemented and verified in code.

### Project B: Dhruto
- **Local Location:** `C:\Sofof_tech_2026\dhruto`
- **GitHub Repository:** `https://github.com/CodesWithRakib/dhruto`
- **Architecture:** Monorepo (`pnpm` workspace + Turborepo)
  - `apps/web-merchant`: Next.js 16.3.8, React 19.3.0, TypeScript 5.8.2, Tailwind CSS 3.4.19, Redux Toolkit 2.5.1, React Hook Form 7.89, Zod 3.24, `next-intl`, Vitest, Playwright.
  - `apps/api`: NestJS 11.2.7, TypeORM 0.3.20, PostgreSQL, BullMQ 5.40.0, Redis (`ioredis`), Swagger, event emitter.
  - `packages/contracts` & `packages/ui`: Shared contract types and reusable UI components.
- **Verified Implementations:**
  - Merchant dashboard, shipment creation, tracking workflows, and COD settlements.
  - Role layout structure: `(admin)`, `(auth)`, `(customer)`, `(hub)`, `(merchant)`, `(public)`, `(rider)`.
  - Queue-based background processing for parcel dispatch and status lifecycle events using Redis and BullMQ.
- **Verified Status:** High-quality domain models, queue processors, and merchant frontend views exist in code.

### Project C: Gramer Bazar SaaS
- **Local Location:** `C:\Sofof_tech_2026\gramer-bazar`
- **GitHub Repository:** `https://github.com/CodesWithRakib/gramer-bazar-saas`
- **Architecture:** Monorepo (`pnpm` workspace)
  - `apps/web`: Next.js 16.3.5, React 19.2.8, TypeScript 5.0, Tailwind CSS 4, Redux Toolkit 2.12.0, Leaflet maps, PostHog, Sentry, Vitest.
  - `apps/api`: NestJS 12.0.1, PostgreSQL, TypeORM 0.3.20, Redis caching (`cache-manager-redis-yet`), Socket.io, Swagger.
- **Verified Implementations:**
  - Multi-role marketplace (buyers, sellers, delivery riders, platform admins).
  - Advanced catalog: Multi-attribute filtering, category facet trees, fashion size charts, cart drawer.
  - Real-time communication: Socket.io chat widget and notification dispatcher.
  - Seed and benchmark tools: Autocannon load testing scripts and database performance seeders.
- **Verified Status:** Fully implemented frontend catalog, cart, real-time chat, and backend API modules verified.

### Professional Experience at SOFOF Tech
- **Local References:** `tamkeen-client-webapp`, `mycoifeur-frontend-admin`, `mycoifeur-web-app`
- **Verified Capabilities:**
  - Building complex, production client web applications with Next.js 16/15, React 19, TypeScript, and Tailwind CSS.
  - Multi-language and RTL support (Arabic reshaping, bidi text support for Middle Eastern clients).
  - WebRTC integrations (Agora RTC, LiveKit) for real-time video/audio consultation.
  - Rich interactive components (TipTap WYSIWYG editor, Drag-and-Drop workflows, PDF export, Excel processing).
  - High fidelity Figma-to-code execution under strict client deadlines.

---

## 5. Technical Constraints & Standards for the New Portfolio

1. **Lightweight & Fast:** The portfolio itself will be built with **Next.js App Router**, **TypeScript** (strict mode), and **Tailwind CSS**.
2. **No Unnecessary State Complexity:** No Redux, RTK Query, or backend database will be installed in the portfolio. Static data models and clean React hooks will drive the UI.
3. **Design Standard:** Clean, high-contrast, typography-first aesthetic (light theme by default with accessible dark mode). No gimmicky marquee animations or low-contrast glows.
4. **Validation:** React Hook Form + Zod for any interactive contact forms.
5. **No Hallucinated Claims:** Every claim must map to verified repositories and real professional experience.

---

## 6. Identified Gaps & Missing Assets

1. **Resume Asset:** No `resume.pdf` file was found in the local repository. A placeholder link or designated file location (`public/resume.pdf`) must be established, with the user prompted to drop their latest resume.
2. **Live Demo Hosting Status:** While the source code for OgroniEdu, Dhruto, and Gramer Bazar is verified on disk and GitHub, public production URLs may be staging or local. Source repository links will be prioritized as primary evidence.
3. **Headshot/Avatar Asset:** A high-quality professional developer avatar or banner image needs to be standardized.

---

## 7. Audit Conclusion & Next Steps

The local codebase demonstrates an engineer with solid, verifiable frontend craftsmanship and substantial full-stack SaaS architecture experience. The portfolio must pivot away from generic templates and spotlight this tangible technical depth.

Phase 00 continues with the establishment of the Content Strategy, Design System, Route & Component Map, Decisions log, and Implementation Plan.
