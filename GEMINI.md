# Project 3dfier: Technical Specification

## 1. Brand Identity
- **Logo Theme:** Layered 3D effect (FDM style).
- **Core Colors:**
  - Primary Action: `#F97316` (Orange)
  - Secondary Accent: `#0F4C75` (Teal)
  - Background: `#0F172A` (Slate-900)
- **Typography:** Sans-serif (Inter/Plus Jakarta Sans), Mono for tech specs.

## 2. Architecture: Single Page Application (SPA)
- **Framework:** React + Vite.
- **Styling:** Tailwind CSS (Utility-first).
- **Navigation:** Smooth-scroll to ID-based sections (`#services`, `#portfolio`, `#quote`).

## 3. Key Components & Logic
### A. Hero Section
- Focus on "Precision" and "Innovation."
- Visuals should highlight high-quality finishes.

### B. Manual Quote Workflow
- **Constraint:** No automated pricing engine.
- **UI Requirement:** User must provide:
  - File (.STL, .OBJ, .STEP)
  - Material (PLA, PETG, TPU, ABS, Carbon Fiber)
  - Color & Infill requirements.
- **Action:** Form submits to a manual review queue (captured via Netlify/Formspree).

### C. Portfolio Gallery
- Responsive grid (2-column mobile, 4-column desktop).
- Use aspect-ratio boxes for consistent 3D print photos.

## 4. Coding Standards
- Use Functional Components with Hooks.
- Implement Lucide-React for consistent iconography.
- Ensure all components are mobile-first responsive.
- Use `framer-motion` for subtle reveal animations on scroll.

## 5. Deployment
- **Platform:** Vercel/Netlify.
- **Environment:** Production-ready frontend with optimized assets.