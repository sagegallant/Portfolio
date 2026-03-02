# Phase 2 — Product Definition Sheet (PDS)
## Ram Chouhan — Personal Portfolio Website

---

## Problem Statement

Ram Chouhan is a 2nd-year MCA student at MANIT Bhopal with genuine projects (WebRTC P2P streaming, DSA visualizer, travel apps) and a strong CS foundation — but no portfolio website to present himself to recruiters, particularly for the Adobe Technical Consultant Internship. His GitHub exists but lacks narrative and visual impact. His best project (movienight) isn't even on his CV. He needs a portfolio that:

1. Immediately communicates his identity as a builder of real, technically interesting things
2. Presents his projects with case-study depth (problem → solution → tech → outcome)
3. Signals Adobe-relevant strengths: CS fundamentals, full-stack JS, SDLC understanding, client-focused thinking
4. Compensates for weaker verbal English with polished written communication on-page
5. Is deployable on GitHub Pages with zero hosting cost

---

## Target Users / Personas

| Persona | Goals | What they look for |
|---|---|---|
| **Tech Recruiter (Adobe, MNCs)** | Filter strong candidates fast | Clear identity, CGPA, project depth, GitHub link |
| **Technical Interviewer** | Validate what is on the CV | Live demos, code links, tech decisions explained |
| **Hiring Manager (TC role)** | Assess client-facing potential | Communication clarity, breadth of skills |
| **Fellow Students / Peers** | Inspiration, networking | What you built, how you think |

**Primary persona:** Technical Recruiter + Interviewer at Adobe

---

## User Stories

- As a recruiter, I want to immediately know who Ram is and what he specializes in within 5 seconds.
- As a recruiter, I want to see his CGPA, education, and skills without hunting through the page.
- As a technical interviewer, I want to click into any project and understand why it was built, what problem it solved, and what tech choices were made.
- As a technical interviewer, I want links to the live demo and GitHub repo for each project.
- As a hiring manager, I want to download his resume in one click.
- As a visitor, I want the site to feel fast and professional, not a template.
- As a mobile user, I want the site to work and look great on my phone.

---

## In Scope

- Single-page portfolio (all sections on one scrollable page)
- Sections: Hero, About, Skills, Projects (4 featured), Education, Contact
- Project cards with case-study expanded view (problem, solution, tech stack, links)
- Downloadable PDF resume button
- GitHub, LinkedIn, Email links
- Smooth scroll animations (subtle to expressive)
- Dark mode primary, with clean modern typography
- Mobile-responsive (mobile-first)
- SEO meta tags for Google indexing
- Deployable as static HTML/CSS/JS on GitHub Pages

---

## Out of Scope

- Blog or writing section (future phase)
- CMS or admin panel
- Contact form with backend (mailto link instead)
- Light mode toggle (dark is the default; can add later)
- Any JS framework — static HTML/CSS/JS only for GitHub Pages simplicity

---

## Success Metrics

| Metric | Target |
|---|---|
| Time-to-understand-identity | 5 seconds on hero |
| Project depth | Problem + Solution + Tech + Links per project |
| Page load speed | Under 2s on 4G |
| Mobile Lighthouse score | 90 or above |
| Resume download | 1 click from any section |
| Deployed URL | GitHub Pages |

---

## Full Sitemap / Section Inventory

Single page, top-to-bottom scroll:

1. **Navbar** — "RC" logo, nav links (About, Skills, Projects, Contact), Resume CTA button
2. **Hero** — Name, role tagline, one-liner bio, two CTAs (View Projects + Download Resume), animated mesh/particle background
3. **About** — Short personal story, avatar/photo, 3 personality trait badges, education summary
4. **Skills** — Categorized chips: Languages, Web Tech, Tools, CS Fundamentals
5. **Projects** — 4 featured cards: movienight, VisualDS, EOMS, Dotlify — each expandable to case study
6. **Education** — Timeline: MCA at MANIT (CGPA 8.10), BCA at LIPS (83.7%)
7. **Contact** — Email, GitHub, LinkedIn — no form
8. **Footer** — Copyright + "Built with vanilla JS"

---

## Shared Components (cross-section consistency)

- **Navbar** — sticky, glassmorphism background on scroll
- **Section headings** — numbered label + large title, consistent across all sections
- **CTA buttons** — primary (filled) + secondary (outline), consistent border-radius + hover state
- **Card pattern** — Projects use consistent shadow, hover lift, and tag chips
- **Tag chips** — tech stack labels used in Projects and Skills sections
- **Scroll animations** — single IntersectionObserver reveal pattern used site-wide

---

## Constraints

- **Stack:** Pure HTML5 + CSS3 + Vanilla JS (no build step, no npm, deployable as-is)
- **Fonts:** Google Fonts (Inter + one display font), loaded async
- **Icons:** Devicons CDN for tech logos; inline SVG for social links
- **Hosting:** GitHub Pages (sagegallant.github.io)
- **Accessibility:** WCAG AA contrast minimum; keyboard-navigable; semantic HTML5

---

> STOP — Approval Gate 1. Please review the PDS above.
> Reply "approved" to proceed to Phase 3 (TSD + Design System), or "approved with changes: ..." to modify before continuing.
