# Featured Projects — Evidence-Based Technical Case Studies

**Subject:** Md. Rakib Islam — Developer Portfolio  
**Status:** Canonical Case Studies Reference (Phase 01)  
**Evidence Standard:** Every technical highlight is strictly mapped to verified code in local repositories and verified GitHub branches. Zero fabricated user metrics, performance percentages, or commercial outcomes.

---

## Overview Matrix

| Project | Primary Focus | Architecture | Verified Codebase Status | Key Engineering Highlight |
| :--- | :--- | :--- | :--- | :--- |
| **1. OgroniEdu** | Tutoring Marketplace & LMS | Monorepo (`pnpm` + Turborepo) | Next.js 16 + NestJS 12 + TypeORM | Shared `@contracts` layer, 18 RTK Query services, bilingual `next-intl` |
| **2. Dhruto** | Courier Logistics Operating System | Monorepo (`pnpm` + Turborepo) | Next.js 16 + NestJS 11 + BullMQ | 21-state parcel state machine, Redis/BullMQ background queue worker |
| **3. Gramer Bazar SaaS**| Rural Hyperlocal Marketplace | Monorepo (`pnpm` workspaces) | Next.js 16 + NestJS 12 + PostgreSQL | Faceted multi-attribute filters, Socket.io real-time chat, load benchmarks |

---

## Case Study 1: OgroniEdu (অগ্রণী এডু)

### 1. Problem Statement
In Bangladesh, academic tutoring (Class 1–12, Bangla & English medium/version, Madrasah, and university admission prep) is largely managed through unstructured, unverified informal channels. Guardians face lack of credential verification and safety concerns; tutors struggle with scheduling conflicts, payment defaults, and attendance tracking; students lack structured learning materials and consistent progress monitoring.

OgroniEdu was conceived to transform this fragmented market into a trusted, structured educational platform with strict verification, automated scheduling, and real-time operational transparency.

### 2. Target Users & Personas
- **Guardians:** Searching for verified tutors by district/upazila, managing multiple children, tracking attendance, and processing secure payments.
- **Tutors:** Managing teaching profiles, subject catalogs, hourly availability, lesson notes, and payout histories.
- **Students:** Viewing scheduled lessons, homework assignments, and communicating with tutors.
- **Platform Administrators:** Verifying tutor NIDs and university credentials, moderating disputes, and monitoring bookings.

### 3. Rakib's Actual Role & Contribution
- **Architect & Lead Developer:**
  - Designed the end-to-end monorepo architecture connecting Next.js (frontend) and NestJS (backend).
  - Built the multi-role routing architecture (`(admin)`, `(dashboard)`, `(public)`, `tutor`, `guardian`, `student`).
  - Implemented the entire client data-fetching architecture using Redux Toolkit and 18 dedicated RTK Query API services.
  - Authored the shared `@ogroniedu/contracts` package to eliminate API schema drift.
  - Implemented complete bilingual localization (`en` and `bn`) with `next-intl`.

### 4. Verified Technology Stack & Why Chosen
- **Frontend Web:** Next.js 16.4.0 (App Router) & React 19.3.0.
  - *Why:* Leverages React Server Components for fast initial page load and SEO on public pages, transitioning smoothly into rich client-side dashboard state.
- **Styling:** Tailwind CSS 4.3.3 with customized Radix UI / shadcn headless primitives.
  - *Why:* Mobile-first, zero-runtime CSS footprint, and high-contrast accessibility.
- **State & Data Management:** Redux Toolkit 2.13.0 & RTK Query.
  - *Why:* Centralized cache management, automatic cache invalidation tags, and normalized server state.
- **Backend API:** NestJS 12.1.2 Modular Monolith.
  - *Why:* Strong TypeScript dependency injection, clean separation of concerns (controllers, services, entities), and Swagger auto-generation.
- **Database & ORM:** PostgreSQL 18 with TypeORM 1.1.2.
  - *Why:* Strict relational integrity, foreign key constraints, and migration version control.
- **Real-Time Layer:** Socket.io 4.8.4.
  - *Why:* Authenticated WebSocket gateway for instantaneous in-app booking alerts and attendance notifications.
- **Audio Synthesis:** Web Audio API (`notification-sound.ts`).
  - *Why:* Synthesizes pleasant in-browser chime frequencies without depending on heavy external `.mp3` audio assets.

### 5. Architectural Highlights & Key Workflows

#### A. Isomorphic Contracts Package (`packages/contracts`)
To ensure frontend-backend type safety, all DTOs and Zod validation schemas reside in a shared monorepo package:
- Next.js forms validate user input client-side using the identical Zod schema that the NestJS backend uses to validate incoming HTTP payloads via `ValidationPipe`.
- Eliminates common backend/frontend mismatch bugs when updating API parameters.

#### B. 18 Modular RTK Query Services
Instead of a monolithic API file, the client data layer is cleanly decoupled:
- `admin-api.ts`: Admin moderation, platform verification, user management.
- `bookings-api.ts` & `sessions-api.ts`: Lesson booking creation, confirmation, rescheduling.
- `payments-api.ts`: Escrow invoice records and payment status checks.
- `trust-api.ts` & `tutors-api.ts`: Tutor public profile data, badges, and verified credentials.
- `notifications-api.ts`: Real-time notification synchronization and read-state management.

#### C. Role-Based Route Protection Architecture
Custom layouts ensure unauthenticated or unauthorized users cannot access privileged views:
- `RequireAuth.tsx`: Checks JWT session validity.
- `RequireRole.tsx`: Evaluates role permissions (`GUARDIAN`, `TUTOR`, `STUDENT`, `ADMIN`, `SUPER_ADMIN`).
- `OnboardingGate.tsx`: Redirects newly registered users to profile completion before unlocking dashboards.

### 6. Technical Challenges Addressed
- **Challenge:** Handling real-time audio and visual notifications without freezing UI rendering or triggering memory leaks.
  - *Solution:* Implemented an audio synthesis utility using the browser’s native `AudioContext`, coupled with a debounced Socket.io event listener in `SocketProvider`.
- **Challenge:** Dynamic bilingual interface switching across complex nested dashboard routes.
  - *Solution:* Configured `next-intl` with route-level locale negotiation (`/en/...` and `/bn/...`), formatting currency in BDT (৳) and localized Gregorian/Bangla dates.

### 7. What Can a Reviewer Inspect in the Repository?
- Monorepo task pipeline in `turbo.json` and `pnpm-workspace.yaml`.
- Shared validation schemas in `packages/contracts/src/`.
- Frontend store architecture in `apps/web/src/store/services/`.
- Authentication guards and role layouts in `apps/web/src/components/auth/` and `apps/web/src/layouts/`.
- NestJS modules and TypeORM entity definitions in `apps/api/src/`.

### 8. Implementation Status Categorization
- **Verified Implemented:**
  - Monorepo orchestration (pnpm + Turbo).
  - Next.js 16 App Router layouts with role protection and `next-intl` localization.
  - 18 RTK Query API slice definitions with endpoints and cache tags.
  - Shared contract DTOs and Zod schemas.
  - NestJS modular API structure with TypeORM entities and Socket.io gateway.
  - Web Audio API notification sounds.
- **Work in Progress:**
  - Complete end-to-end integration of automated escrow payout settlement in production banking APIs (SSLCommerz/bKash).
- **Planned:**
  - Native mobile applications (React Native / Flutter).
- **Live Demo Status:** Local development and staging configurations verified. Public production URL is currently internal/staging.

---

## Case Study 2: Dhruto (দ্রুত)

### 1. Problem Statement
Courier logistics in Bangladesh suffer from severe operational friction: high rates of Return-to-Origin (RTO), manual cash-on-delivery (COD) reconciliation delays between couriers and merchants, lack of normalized geographic addressing, and uncoordinated hub bag transfers.

Dhruto was designed as an enterprise-grade logistics operating system to automate the entire parcel lifecycle—from merchant bulk booking to hub bagging, dispatch, rider delivery, and financial settlement.

### 2. Target Users & Personas
- **E-Commerce Merchants:** Creating shipments, generating parcel barcode labels, tracking package statuses in real-time, monitoring COD disbursements, and managing customer returns.
- **Hub Operators:** Scanning barcodes, bagging packages for transit, dispatching manifests, and reconciling incoming cash from delivery riders.
- **Delivery Riders:** Mobile delivery interface for OTP verification, failed attempt logging, and cash collection.
- **Super Administrators:** Platform-wide oversight, pricing tier configuration, operational audit logs, and merchant payout approvals.

### 3. Rakib's Actual Role & Contribution
- **Lead Full-Stack Architect & Engineer:**
  - Modeled the formal 21-state parcel lifecycle state machine in NestJS.
  - Integrated asynchronous queue architecture using Redis and BullMQ (`@nestjs/bullmq`) for non-blocking parcel lifecycle events and webhook notifications.
  - Built the merchant web portal (`apps/web-merchant`) using Next.js 16, Redux Toolkit, and Tailwind CSS.
  - Designed the relational PostgreSQL schema and TypeORM migrations for merchants, parcels, tracking events, hubs, and financial ledgers.

### 4. Verified Technology Stack & Why Chosen
- **Frontend Portal:** Next.js 16.3.8 (App Router), React 19.3.0, TypeScript 5.8.2.
  - *Why:* High-performance merchant portal with granular route caching and accessible dashboard components.
- **Form Architecture:** React Hook Form 7.89.0 + Zod 3.24.2 via `@hookform/resolvers`.
  - *Why:* Strict validation for recipient phone numbers, division/district/upazila geographic selectors, and COD amount calculations.
- **Backend API:** NestJS 11.2.7 + Express 5.2.1.
  - *Why:* Structured enterprise architecture with native support for BullMQ queue processors.
- **Queue & Background Processing:** Redis (`ioredis` 5.4.1) & BullMQ 5.40.0 (`@nestjs/bullmq`).
  - *Why:* Decouples heavy transactional tasks (generating tracking history, sending notifications, recalculating merchant balances) from the synchronous HTTP request-response cycle.
- **Database:** PostgreSQL with TypeORM 0.3.20.
  - *Why:* Relational data consistency for financial transactions and parcel status integrity.

### 5. Architectural Highlights & Key Workflows

#### A. 21-State Parcel State Machine
The core logistics engine enforces a strict state machine preventing invalid parcel transitions:
```
CREATED → PICKUP_REQUESTED → PICKED_UP → ORIGIN_HUB_RECEIVED
   → BAGGED → IN_TRANSIT → DESTINATION_HUB_RECEIVED
   → ASSIGNED_TO_RIDER → OUT_FOR_DELIVERY → DELIVERED → CASH_VERIFIED
   (Alternate branches: DELIVERY_ATTEMPTED, RESCHEDULED, RTO_INITIATED, RETURNED_TO_MERCHANT)
```
Every status change generates an immutable tracking record with timestamp, operator ID, and optional geo-coordinates.

#### B. Asynchronous Queue Processing with BullMQ & Redis
In `apps/api`, parcel events are dispatched onto background queues:
- Allows high-concurrency merchant order uploads (e.g. bulk CSV/Excel shipment creation) without timing out API requests.
- Workers process parcel status updates, update merchant ledger entries, and schedule retry attempts asynchronously.

#### C. Financial Ledger & COD Settlement Model
- Double-entry tracking of COD collections.
- Distinguishes between collected cash (`CASH_PENDING` in rider custody) and verified cash (`CASH_VERIFIED` deposited at hub), preventing revenue leakage before merchant wallet crediting.

### 6. Technical Challenges Addressed
- **Challenge:** Preventing race conditions when multiple hub operators scan parcels in the same bag simultaneously.
  - *Solution:* Implemented database-level transaction locks in TypeORM and queue-level concurrency limits in BullMQ.
- **Challenge:** Normalizing non-standardized Bangladeshi addresses into structured delivery zones.
  - *Solution:* Structured hierarchical database modeling (Division → District → Thana/Upazila → Hub coverage area).

### 7. What Can a Reviewer Inspect in the Repository?
- Architectural specifications in `Dhruto-Architecture-Docs-v1/` (BRD, PRD, System Design, State Machine).
- Queue module integration in `apps/api/src/` (`@nestjs/bullmq` configuration).
- Merchant dashboard layout and state slices in `apps/web-merchant/`.
- TypeORM entities and migration scripts in `apps/api/src/database/`.

### 8. Implementation Status Categorization
- **Verified Implemented:**
  - Complete architecture documentation and specifications.
  - NestJS API with TypeORM entities, migrations, and BullMQ queue integration.
  - Merchant web application structure in Next.js 16 with role layouts (`(merchant)`, `(admin)`, `(hub)`, `(rider)`).
  - React Hook Form and Zod validation workflows for parcel creation.
- **Work in Progress:**
  - Dedicated Rider Progressive Web App (PWA) barcode scanning workflow.
- **Planned:**
  - Public customer tracking portal with SMS OTP delivery verification.
- **Live Demo Status:** Local development and staging configurations verified. Public production URL is currently internal/staging.

---

## Case Study 3: Gramer Bazar SaaS (গ্রামের বাজার)

### 1. Problem Statement
Agricultural producers and small cottage artisans in rural upazilas of Bangladesh (starting from Khansama Upazila, Dinajpur) lack digital marketplace access to showcase their products, manage inventory variants, and fulfill local orders without paying exorbitant middleman commissions.

Gramer Bazar SaaS was built as a hyperlocal rural marketplace platform designed specifically for mobile-first, low-bandwidth environments, connecting rural shopkeepers, consumers, and local delivery riders.

### 2. Target Users & Personas
- **Rural Consumers:** Browsing local shop products, applying multi-attribute filters, ordering via COD, and initiating real-time support requests.
- **Local Shopkeepers / Sellers:** Managing product catalogs, attributes, sizing charts, inventory quantities, and shop profiles.
- **Delivery Riders:** Accepting neighborhood parcel deliveries and updating fulfillment status.
- **System Admins:** Managing categories, approving seller applications, configuring promotional banners, and monitoring dispute resolutions.

### 3. Rakib's Actual Role & Contribution
- **Full-Stack Developer & Frontend Lead:**
  - Designed and implemented the complete customer and merchant web frontend using Next.js 16, React 19, TypeScript, and Tailwind CSS.
  - Engineered the complex catalog filtering interface with faceted multi-parameter query synchronization.
  - Built the real-time customer-merchant chat interface powered by Socket.io.
  - Configured Redis caching on the NestJS backend to accelerate high-frequency catalog reads.
  - Authored automated load testing and benchmarking scripts using Autocannon.

### 4. Verified Technology Stack & Why Chosen
- **Frontend Web:** Next.js 16.3.5, React 19.2.8, TypeScript 5.0.
  - *Why:* Hybrid static generation and server-side rendering for marketplace product listings.
- **Styling:** Tailwind CSS 4 with custom theme palettes (`palettes.ts`) and animations.
  - *Why:* Mobile-first responsiveness tailored for 3G/4G smartphone users in rural Bangladesh.
- **Backend API:** NestJS 12.0.1 Modular Architecture.
  - *Why:* Structured module boundaries (`catalog`, `orders`, `chat`, `coupons`, `disputes`, `reviews`).
- **Database & Cache:** PostgreSQL with TypeORM 0.3.20 + Redis Cache (`cache-manager-redis-yet` 5.1.5).
  - *Why:* Relational modeling for shops, categories, and orders; Redis caching for category tree and popular catalog items.
- **Real-Time Communication:** Socket.io 4.8.3 (`@nestjs/platform-socket.io`).
  - *Why:* Instant bidirectional communication between shoppers and shopkeepers.
- **Performance & Testing:** Autocannon 8.0.0 and Vitest 4.1.2.
  - *Why:* Stress-testing catalog endpoints under simulated high concurrent loads.

### 5. Architectural Highlights & Key Workflows

#### A. Multi-Attribute Faceted Catalog Filtering
- Complex filter sidebar supporting category trees, price range sliders, brand facets, rating filters, and in-stock toggles.
- URL state synchronization: All filter parameters are serializable to URL query parameters for shareable search links and server-side pre-rendering.
- Responsive mobile filter sheet with instant count preview.

#### B. Real-Time Chat & Dispute Resolution Gateway
- In `apps/web/src/components/chat/`: Includes `ChatInterface.tsx`, `FloatingChatWidget.tsx`, and `ChatWindow.tsx`.
- WebSocket integration enables direct customer inquiries to shop owners before purchase, reducing order cancellations.
- Formal dispute dialog (`OpenDisputeDialog.tsx`) allowing customers to submit photo evidence and reason codes for damaged or incorrect goods.

#### C. Benchmarking & Automated Load Testing Suite
- Unlike typical hobby projects, Gramer Bazar includes dedicated load-testing scripts in `apps/api/src/seeder/`:
  - `load-test.js`: Simulates concurrent traffic bursts using Autocannon.
  - `benchmark.js`: Tests database query performance comparing offset-based pagination versus cursor-based pagination.

### 6. Technical Challenges Addressed
- **Challenge:** Slow catalog response times when querying nested categories and variant attributes.
  - *Solution:* Implemented Redis caching layer on NestJS category queries and optimized database index definitions on `(shopId, categoryId, status)`.
- **Challenge:** Handling image uploads on low-bandwidth connections.
  - *Solution:* Implemented client-side image compression (`image-compression.ts`) before uploading multipart files to storage.

### 7. What Can a Reviewer Inspect in the Repository?
- Comprehensive System Design documents (`Gramer_Bazar_Frontend_System_Design_Document.md` and `Gramer_Bazar_Backend_System_Design_API_Document.md`).
- Catalog components in `apps/web/src/components/catalog/` (`ProductFilterSidebar.tsx`, `ProductCard.tsx`, `FashionSizeChartModal.tsx`).
- Socket chat integration in `apps/web/src/components/chat/`.
- Load testing scripts in `apps/api/src/seeder/load-test.js`.

### 8. Implementation Status Categorization
- **Verified Implemented:**
  - Next.js 16 web application with complete catalog, cart drawer, and checkout components.
  - Faceted filtering with URL state synchronization.
  - Real-time Socket.io chat interface and notification handlers.
  - NestJS backend modules with TypeORM, PostgreSQL, and Redis caching.
  - Autocannon load-test and seeder scripts.
- **Work in Progress:**
  - Offline PWA service worker caching with Serwist for intermittent rural connectivity.
- **Planned:**
  - Automated SMS order notification dispatching for non-smartphone users.
- **Live Demo Status:** Local development and staging configurations verified. Public production URL is currently internal/staging.
