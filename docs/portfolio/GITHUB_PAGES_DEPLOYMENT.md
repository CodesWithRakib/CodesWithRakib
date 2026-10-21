# GitHub Pages Deployment Guide — CodesWithRakib Portfolio

**Project:** Personal Developer Portfolio  
**Author:** Md. Rakib Islam  
**GitHub Username:** `CodesWithRakib`  
**Configured Remote:** `https://github.com/CodesWithRakib/CodesWithRakib.git`  
**Target URL:** `https://codeswithrakib.github.io/`  
**Package Manager:** `pnpm` (lockfile: `pnpm-lock.yaml`)  
**Framework:** Next.js 16.4.2 (App Router) + React 19.3.0 + TypeScript 5.8.2  
**Status:** **Fully Prepared, Locally Verified, and Ready to Deploy**

---

## 1. Verified Repository & Target URL Assumptions

### 1.1. Remote Configuration
- Git remote: `origin -> https://github.com/CodesWithRakib/CodesWithRakib.git`
- Current branch: `main`
- GitHub account: `CodesWithRakib`

### 1.2. GitHub Pages Root User Site vs. Project Site
GitHub Pages operates under two distinct models:

| Type | Repository Naming Convention | Published Default URL |
| :--- | :--- | :--- |
| **User Site (Root)** | `<username>.github.io`<br>*(e.g., `CodesWithRakib.github.io`)* | `https://codeswithrakib.github.io/` |
| **Project Site** | `<repository-name>`<br>*(e.g., `CodesWithRakib`)* | `https://codeswithrakib.github.io/CodesWithRakib/` |

> [!IMPORTANT]
> **Action Required for Root URL `https://codeswithrakib.github.io/`:**
> 1. To publish directly to the root domain (`https://codeswithrakib.github.io/`), GitHub requires the repository to be named **`CodesWithRakib.github.io`**.
> 2. If you retain the current repository name (`CodesWithRakib`), GitHub Pages will default to serving the site at `https://codeswithrakib.github.io/CodesWithRakib/`.
> 3. **Our Next.js configuration is built to support both seamlessly:**
>    - `basePath` defaults to `""` (for the root user site `https://codeswithrakib.github.io/`).
>    - If deploying under the project path `CodesWithRakib`, you can supply `NEXT_PUBLIC_BASE_PATH=/CodesWithRakib` at build time without changing any code.

---

## 2. Static-Export Compatibility Findings

GitHub Pages is a static hosting provider; it does not run a Node.js runtime or Next.js server. An architectural audit of the application produced the following findings:

### 2.1. Server-Side Features & Static Adaptations
1. **Next.js Static Export (`output: "export"`):**
   - Enabled in `next.config.ts`.
   - Generates the standalone `out/` deployment directory.
2. **Next.js Image Optimization:**
   - Static exports cannot run the on-demand Next.js Node image optimization server (`sharp`).
   - Configured `images: { unoptimized: true }` in `next.config.ts`. All images and SVGs render with full fidelity and zero distortion.
3. **App Router Dynamic Metadata Routes:**
   - Dynamic image and metadata generators (`/icon`, `/opengraph-image`, `/sitemap.xml`, `/robots.txt`) require explicit build-time prerendering.
   - Added `export const dynamic = "force-static"` to:
     - [`app/icon.tsx`](file:///C:/Sofof_tech_2026/CodesWithRakib/app/icon.tsx)
     - [`app/opengraph-image.tsx`](file:///C:/Sofof_tech_2026/CodesWithRakib/app/opengraph-image.tsx)
     - [`app/sitemap.ts`](file:///C:/Sofof_tech_2026/CodesWithRakib/app/sitemap.ts)
     - [`app/robots.ts`](file:///C:/Sofof_tech_2026/CodesWithRakib/app/robots.ts)
4. **Bypassing Jekyll with `.nojekyll`:**
   - GitHub Pages runs Jekyll by default, which ignores directories starting with underscores (e.g. `_next/`). This causes 404 errors for all JavaScript and CSS chunks.
   - Added [`public/.nojekyll`](file:///C:/Sofof_tech_2026/CodesWithRakib/public/.nojekyll) (automatically copied to `out/.nojekyll`) and added an explicit `touch out/.nojekyll` safeguard in the GitHub Actions workflow.
5. **Clean Routing (`trailingSlash: true`):**
   - Configured `trailingSlash: true` in `next.config.ts`.
   - Next.js exports nested routes as directories with `index.html` (e.g. `out/resume/index.html`), ensuring direct URL navigation to `/resume/` works without server rewrites.
6. **Custom 404 Routing:**
   - Next.js automatically outputs `out/404.html` from [`app/not-found.tsx`](file:///C:/Sofof_tech_2026/CodesWithRakib/app/not-found.tsx).
   - GitHub Pages serves `404.html` for any unmatched route, guaranteeing client-side recovery.

### 2.2. Contact Form & API Routes Strategy
- **Limitation:** GitHub Pages cannot execute `app/api/contact/route.ts` because there is no server-side execution environment.
- **Resilient Client Solution:**
  1. [`components/sections/ContactSection.tsx`](file:///C:/Sofof_tech_2026/CodesWithRakib/components/sections/ContactSection.tsx) now reads `process.env.NEXT_PUBLIC_CONTACT_API_URL || "/api/contact"`.
  2. If an external API gateway (such as Formspree, Cloudflare Worker, or a Vercel-hosted API) is provided via `NEXT_PUBLIC_CONTACT_API_URL`, form submissions are delivered via HTTP `POST`.
  3. If unconfigured or offline on static GitHub Pages, the form gracefully explains the static environment and offers an **"Open in Email Client"** action pre-filling `mailto:codeswithrakib@gmail.com` with the validated subject and message.
  4. **No fake success messages:** The user is always honestly informed of delivery status.

---

## 3. Preservation of GSAP, Framer Motion & Three.js

All animation systems and 3D visual effects have been verified working in the production static export:

| Library | Version | Usage & Verification in Static Build (`out/`) |
| :--- | :--- | :--- |
| **Three.js** | `^0.186.1` | Core WebGL engine. Verified executing in browser via MCP DevTools. |
| **@react-three/fiber** | `^9.8.2` | Renders the interactive 3D `InterfaceAtlas` in the Hero section. |
| **@react-three/drei** | `^10.7.9` | Provides `Float` and `RoundedBox` geometry in `InterfaceAtlas.tsx`. |
| **gsap** | `^3.15.0` | Orchestrates scroll entrance timelines in `GsapReveal.tsx`. |
| **@gsap/react** | `^2.1.2` | Manages GSAP lifecycle with `useGSAP` in Next.js client components. |
| **framer-motion** | `^14.4.0` | Powers layout transitions, `TiltCard` pointer depth, and ThemeToggle. |

### Browser Verification (`chrome-devtools-mcp`)
- Tested the production static build served on `http://localhost:5002`:
  - Three.js 3D canvas rendered on high-DPI viewports.
  - Interactive camera rotation tracked pointer movement smoothly.
  - GSAP `ScrollTrigger` and `ScrollReveal` triggered animations without layout shift (`CLS = 0.000`).
  - Zero fatal JavaScript errors in the browser console.

---

## 4. GitHub Actions Deployment Workflow

The deployment workflow is defined in [`.github/workflows/deploy.yml`](file:///C:/Sofof_tech_2026/CodesWithRakib/.github/workflows/deploy.yml).

### Key Features
1. **Triggers:**
   - Automatic execution on pushes to `main`.
   - Manual triggering via `workflow_dispatch`.
2. **Permissions (Least Privilege):**
   ```yaml
   permissions:
     contents: read
     pages: write
     id-token: write
   ```
3. **Deterministic CI/CD Steps:**
   - Checks out code with `actions/checkout@v4`.
   - Configures `pnpm` using `pnpm/action-setup@v4` with version `10`.
   - Configures Node.js 22 with `pnpm` store caching.
   - Installs dependencies strictly via `pnpm install --frozen-lockfile`.
   - Executes linting (`pnpm run lint`), type-checking (`pnpm run typecheck`), and unit tests (`pnpm test`).
   - Runs `pnpm run build` with `output: "export"`.
   - Generates and verifies `out/.nojekyll`, `out/index.html`, and `out/404.html`.
   - Uploads artifact with `actions/upload-pages-artifact@v3`.
   - Deploys artifact using official `actions/deploy-pages@v4`.

---

## 5. Step-by-Step GitHub Setup Instructions

To enable automated deployment on GitHub:

### Step 1: (Recommended for Root URL) Rename Repository
If your goal is to publish to **`https://codeswithrakib.github.io/`**:
1. Go to your repository on GitHub: `https://github.com/CodesWithRakib/CodesWithRakib`.
2. Click **Settings** (top navigation tab).
3. Under **Repository name**, change `CodesWithRakib` to:
   ```
   CodesWithRakib.github.io
   ```
4. Click **Rename**.

*(Note: If you prefer keeping the repository named `CodesWithRakib`, GitHub will serve it at `https://codeswithrakib.github.io/CodesWithRakib/`)*.

### Step 2: Configure GitHub Pages Source
1. In your GitHub repository, open **Settings → Pages** (in the left sidebar).
2. Under **Build and deployment → Source**, select:
   ```
   GitHub Actions
   ```
3. Do not select "Deploy from a branch". The official GitHub Pages deployment action will manage deployments automatically.

### Step 3: Push Changes to Main
Commit and push the local changes to GitHub (see Section 6 below).

### Step 4: Monitor & Verify
1. Click the **Actions** tab in your repository.
2. Select the running workflow: **Deploy to GitHub Pages**.
3. Once completed, your live portfolio will be available at:
   **`https://codeswithrakib.github.io/`**

---

## 6. Git Commands to Review, Commit & Push

Run the following commands from your terminal:

```bash
# 1. Review status of modified and untracked files
git status

# 2. Stage all deployment and configuration changes
git add .

# 3. Commit with a clear, conventional message
git commit -m "feat(deploy): configure Next.js static export and GitHub Pages deployment workflow"

# 4. Push to your deployment branch
git push origin main
```

---

## 7. Verification Checklist for the Live Website

After GitHub Actions completes deployment, open `https://codeswithrakib.github.io/` and verify:

- [ ] **Home Page Loads:** HTTP 200, fonts and stylesheets load without 404s.
- [ ] **Three.js Visual:** Hero 3D interactive canvas renders and responds to pointer movement.
- [ ] **Theme Toggle:** Switch between Light and Dark themes; verify colors persist upon page reload.
- [ ] **Navigation & Case Studies:** Click "Work" and "Case Studies" tabs; verify smooth scrolling.
- [ ] **Direct Nested URL:** Open `https://codeswithrakib.github.io/resume/` directly in a new tab; verify it renders cleanly.
- [ ] **Custom 404:** Open `https://codeswithrakib.github.io/non-existent-page/`; verify custom 404 page renders.
- [ ] **Contact Form:** Verify that the form validates fields and provides direct email options.
- [ ] **SEO Artifacts:** Inspect `https://codeswithrakib.github.io/sitemap.xml` and `https://codeswithrakib.github.io/robots.txt`.
