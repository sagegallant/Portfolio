# Phase 5 — Implementation Plan
## Ram Chouhan Portfolio Website

> **Using writing-plans skill**

**Goal:** Build a stunning, single-file static portfolio website targeting the Adobe Technical Consultant Internship, deployable on GitHub Pages.

**Architecture:** Single `index.html` + `style.css` + `script.js` in `d:\Projects\Antigravity\Portfolio\`. All design tokens from MASTER.md as CSS custom properties. IntersectionObserver for scroll animations. Zero npm, zero build step.

**Tech Stack:** HTML5, CSS3, Vanilla JS, Google Fonts (JetBrains Mono + IBM Plex Sans), Devicons CDN, GitHub Pages

---

## Task 1: Project Scaffold + Git Init

**Files:**
- Create: `d:\Projects\Antigravity\Portfolio\index.html`
- Create: `d:\Projects\Antigravity\Portfolio\style.css`
- Create: `d:\Projects\Antigravity\Portfolio\script.js`
- Create: `d:\Projects\Antigravity\Portfolio\assets\` (folder)
- Copy: `Ram_Resume.pdf` → `d:\Projects\Antigravity\Portfolio\assets\Ram_Resume.pdf`

**Step 1:** Create `index.html` with semantic HTML5 boilerplate:
- `<!DOCTYPE html>`, `<html lang="en">`, meta charset/viewport
- SEO meta tags (title, description, og:, twitter:)
- Google Fonts `<link preconnect>` + stylesheet
- `<link rel="stylesheet" href="style.css">`
- `<script src="script.js" defer>`
- Semantic sections: `<nav>`, `<main>`, `<section id="hero">`, `<section id="about">`, `<section id="skills">`, `<section id="projects">`, `<section id="education">`, `<section id="contact">`, `<footer>`

**Step 2:** Copy `Ram_Resume.pdf` to `assets/` folder

**Step 3:** Git init
```bash
cd d:\Projects\Antigravity\Portfolio
git init
git add .
git commit -m "feat: scaffold portfolio project structure"
```

**Verify:** `index.html` opens in browser without errors (blank white/dark page is fine at this stage)

---

## Task 2: CSS Design System — Tokens + Base Styles

**Files:**
- Write: `d:\Projects\Antigravity\Portfolio\style.css` (full file)

**Step 1:** Write CSS custom properties (all tokens from MASTER.md):
- All `--color-*`, `--bg-*`, `--text-*` variables
- `--font-heading`, `--font-body`
- `--type-*` fluid clamp() scale
- `--space-*` spacing scale
- `--radius-*`, `--shadow-*`, `--ease-*`, `--duration-*`

**Step 2:** Write CSS reset + base styles:
- `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`
- `html { scroll-behavior: smooth; }`
- `body` — background, color, font-family, line-height
- Link styles, img responsive defaults

**Step 3:** Write `.container` utility, `.section` spacing, `SectionHeading` styles

**Step 4:** Write `.reveal` animation class + `@media (prefers-reduced-motion: reduce)` override

**Step 5:** Write `.btn` (primary + secondary variants), `.tag-chip` styles

**Step 6:** Commit
```bash
git add style.css
git commit -m "feat: add design system tokens and base styles"
```

**Verify:** Open `index.html` — body is `#0F172A` dark, text is `#F8FAFC` white, fonts load correctly from Google Fonts

---

## Task 3: Navbar + Mobile Menu

**Files:**
- Write: `<nav>` in `index.html`
- Write: navbar CSS block in `style.css`
- Write: navbar JS (scroll glassmorphism + mobile hamburger) in `script.js`

**Step 1:** Write navbar HTML:
```html
<nav id="navbar" role="navigation" aria-label="Main navigation">
  <div class="container nav-inner">
    <a href="#hero" class="nav-logo" aria-label="Ram Chouhan — Home">RC</a>
    <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Toggle menu">
      <!-- SVG hamburger icon -->
    </button>
    <ul class="nav-links" id="nav-menu" role="list">
      <li><a href="#about">About</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <a href="assets/Ram_Resume.pdf" class="btn btn-primary" download aria-label="Download Resume PDF">Resume</a>
  </div>
</nav>
```

**Step 2:** Write navbar CSS:
- `position: fixed; top: 0; width: 100%; z-index: 100;`
- Default: transparent background
- `.nav-scrolled` class: glassmorphism (`--glass-bg`, `--glass-border`, `backdrop-filter: blur(12px)`)
- Mobile: hamburger visible, nav-links hidden; `.nav-open` shows full-screen overlay
- Transition: opacity + transform 300ms

**Step 3:** Write navbar JS in `script.js`:
```js
// Glassmorphism on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('nav-scrolled', window.scrollY > 50);
}, { passive: true });

// Mobile toggle
const toggle = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  menu.classList.toggle('nav-open');
  document.body.classList.toggle('menu-active');
});

// Close menu on link click
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('nav-open');
    document.body.classList.remove('menu-active');
  });
});
```

**Step 4:** Commit
```bash
git add index.html style.css script.js
git commit -m "feat: add sticky navbar with glassmorphism and mobile menu"
```

**Verify:** Scroll down → navbar gets glass effect. Click hamburger on mobile (375px) → menu slides in. All nav links scroll to correct sections.

---

## Task 4: Hero Section

**Files:**
- Write: `<section id="hero">` in `index.html`
- Write: hero CSS in `style.css`
- Write: hero JS (typewriter effect) in `script.js`

**Step 1:** Write hero HTML:
```html
<section id="hero" aria-label="Introduction">
  <div class="hero-bg" aria-hidden="true"><!-- CSS animated mesh --></div>
  <div class="container hero-content">
    <p class="hero-label">// hello, world</p>
    <h1 class="hero-name">Ram Chouhan</h1>
    <p class="hero-role"><span id="typewriter"></span><span class="cursor" aria-hidden="true">|</span></p>
    <p class="hero-bio">MCA Student at MANIT Bhopal · Building real-time P2P systems & full-stack web experiences.</p>
    <div class="hero-actions">
      <a href="#projects" class="btn btn-primary">View Projects</a>
      <a href="assets/Ram_Resume.pdf" class="btn btn-secondary" download>Download Resume</a>
    </div>
  </div>
</section>
```

**Step 2:** Write hero CSS:
- Full viewport height (`min-height: 100svh`), flex center
- `hero-bg`: CSS animated radial gradient mesh (green + navy), `animation: mesh-drift 8s ease infinite alternate`
- `hero-label`: JetBrains Mono, green, small, monospace comment style
- `hero-name`: `var(--type-hero)`, white, bold
- `hero-role`: `var(--type-h2)`, secondary color, monospace
- Blinking cursor CSS animation
- `hero-actions`: gap between buttons, flex wrap on mobile

**Step 3:** Write typewriter JS:
```js
const roles = [
  'Full-Stack Developer',
  'Systems Thinker',
  'WebRTC Builder',
  'MCA @ MANIT Bhopal'
];
let rIdx = 0, cIdx = 0, deleting = false;
const el = document.getElementById('typewriter');

function type() {
  const current = roles[rIdx];
  el.textContent = deleting ? current.slice(0, cIdx--) : current.slice(0, cIdx++);
  if (!deleting && cIdx > current.length) { deleting = true; setTimeout(type, 1800); return; }
  if (deleting && cIdx < 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; }
  setTimeout(type, deleting ? 50 : 90);
}
// Respect reduced motion
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) type();
else el.textContent = roles[0];
```

**Step 4:** Generate hero background image for visual reference
- Use `generate_image` tool: dark OLED hero background with subtle green mesh/particle grid

**Step 5:** Commit
```bash
git add index.html style.css script.js
git commit -m "feat: add hero section with typewriter and animated background"
```

**Verify:** Hero fills viewport, name is large and legible, typewriter cycles through roles, both CTAs are visible on mobile and desktop.

---

## Task 5: About + Skills Sections

**Files:**
- Write: `<section id="about">` + `<section id="skills">` in `index.html`
- Write: about + skills CSS in `style.css`

**Step 1:** Write About HTML:
```html
<section id="about" aria-labelledby="about-heading">
  <div class="container">
    <div class="section-heading reveal">
      <span class="section-num" aria-hidden="true">01</span>
      <h2 id="about-heading">About Me</h2>
    </div>
    <div class="about-grid">
      <div class="about-avatar reveal">
        <img src="https://avatars.githubusercontent.com/u/61646026?v=4"
             alt="Ram Chouhan profile photo" width="200" height="200">
      </div>
      <div class="about-content reveal">
        <p>I'm a passionate full-stack developer and MCA student at MANIT Bhopal, with a strong foundation in C/C++, OOP, OS, and DBMS. I build things that work — from serverless P2P streaming apps to DSA visualizers.</p>
        <p>I thrive at the intersection of backend systems and user-facing interfaces. My goal is to join Adobe as a Technical Consultant Intern and bring engineering depth to real-world client solutions.</p>
        <div class="about-traits">
          <span class="tag-chip">Builder</span>
          <span class="tag-chip">Problem Solver</span>
          <span class="tag-chip">Quick Learner</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Step 2:** Write Skills HTML — 4 categories:
```
Languages:       C, C++, JavaScript, PHP, SQL
Web Tech:        HTML5, CSS3, React, Node.js, Express, TailwindCSS
CS Fundamentals: OOP, Operating Systems, DBMS, SDLC, Agile
Tools:           Git, VS Code, MySQL, GitHub, Antigravity
```

Each category: `<div class="skill-category reveal">` with heading + chip grid

**Step 3:** Write about + skills CSS:
- `about-grid`: 2-column on desktop (avatar left, text right), stacked on mobile
- Avatar: 160px circle, green ring border, `object-fit: cover`
- `section-num`: JetBrains Mono, green, small, positioned as prefix
- Skill categories: `display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr))`
- Devicon images inside chips (optional, fallback to text-only)

**Step 4:** Commit
```bash
git add index.html style.css
git commit -m "feat: add About and Skills sections"
```

**Verify:** About section shows avatar + text in 2 columns on 1024px+, stacks on mobile. Skills chips render in clean grid. `.reveal` animations trigger on scroll.

---

## Task 6: Projects Section (4 Cards + Case Study Modal)

**Files:**
- Write: `<section id="projects">` in `index.html`
- Write: projects CSS in `style.css`
- Write: modal/expand JS in `script.js`

**Step 1:** Write 4 project cards data (hardcoded):

| # | Name | Problem | Solution | Stack | Live | Repo |
|---|---|---|---|---|---|---|
| 1 | **movienight** | No private, zero-account watch parties exist | Serverless WebRTC P2P streaming; local files + YouTube; 1080p sync | JS, WebRTC, PeerJS | sagegallant.github.io/movienight | github.com/sagegallant/movienight |
| 2 | **VisualDS** | Abstract DSA concepts are hard to learn without visuals | Interactive animated visualizer for 10+ data structures | HTML5, CSS3, JS, Node.js | — | github.com/sagegallant/VisualDS |
| 3 | **EOMS** | [Event/order management system in progress] | Full-stack React + Express app with auth + CRUD | React, Express, Node.js, MySQL | — | github.com/sagegallant/EOMS |
| 4 | **Dotlify** | Need unlimited Gmail alias generation offline | Client-side generator with export (PDF/TXT/CSV/XLSX) | HTML5, JS, TailwindCSS | sagegallant.github.io/Dotlify | github.com/sagegallant/Dotlify |

**Step 2:** Write project card HTML for each:
```html
<article class="project-card reveal" data-project="movienight" role="article">
  <div class="project-header">
    <h3 class="project-name">movienight</h3>
    <span class="project-badge live">Live</span>
  </div>
  <p class="project-desc">Private, serverless P2P watch party in your browser. Stream local files, URLs & YouTube in 1080p with zero accounts, zero tracking.</p>
  <div class="project-stack">
    <span class="tag-chip">WebRTC</span>
    <span class="tag-chip">JavaScript</span>
    <span class="tag-chip">PeerJS</span>
    <span class="tag-chip">P2P</span>
  </div>
  <div class="project-links">
    <a href="https://sagegallant.github.io/movienight/" class="btn btn-primary btn-sm" target="_blank" rel="noopener">Live Demo</a>
    <a href="https://github.com/sagegallant/movienight" class="btn btn-secondary btn-sm" target="_blank" rel="noopener">GitHub</a>
  </div>
</article>
```

**Step 3:** Projects grid CSS:
- `display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--space-6);`
- Card: `--bg-card`, `--shadow-card`, `--radius-lg`, padding, border
- Hover: `translateY(-4px)`, `--shadow-hover`, green left-border accent
- Transition: 300ms `var(--ease-out)`

**Step 4:** Commit
```bash
git add index.html style.css script.js
git commit -m "feat: add Projects section with 4 case-study cards"
```

**Verify:** 4 cards render in responsive grid. Hover lifts the card with green shadow. All links open correctly. Tags are visible and readable.

---

## Task 7: Education Timeline + Contact + Footer

**Files:**
- Write: `<section id="education">`, `<section id="contact">`, `<footer>` in `index.html`
- Write: education + contact + footer CSS in `style.css`

**Step 1:** Write Education HTML (vertical timeline):
```html
<section id="education" aria-labelledby="education-heading">
  <div class="container">
    <div class="section-heading reveal">
      <span class="section-num" aria-hidden="true">04</span>
      <h2 id="education-heading">Education</h2>
    </div>
    <div class="timeline">
      <div class="timeline-item reveal">
        <div class="timeline-dot" aria-hidden="true"></div>
        <div class="timeline-content">
          <span class="timeline-year">2025 – 2027</span>
          <h3>Master of Computer Applications</h3>
          <p class="timeline-institution">MANIT Bhopal (NIT Bhopal)</p>
          <p class="timeline-meta">CGPA: <strong>8.10</strong></p>
        </div>
      </div>
      <div class="timeline-item reveal">
        <div class="timeline-dot" aria-hidden="true"></div>
        <div class="timeline-content">
          <span class="timeline-year">2022 – 2025</span>
          <h3>Bachelor of Computer Applications</h3>
          <p class="timeline-institution">Lucky Institute of Professional Studies, Jodhpur</p>
          <p class="timeline-meta">Percentage: <strong>83.7%</strong></p>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Step 2:** Write Contact HTML:
```html
<section id="contact" aria-labelledby="contact-heading">
  <div class="container contact-inner reveal">
    <span class="section-num" aria-hidden="true">05</span>
    <h2 id="contact-heading">Get In Touch</h2>
    <p>Open to internship opportunities, collaborations, and conversations about tech.</p>
    <div class="contact-links">
      <a href="mailto:ramchouhan160@gmail.com" class="contact-link">
        <!-- Email SVG icon --> ramchouhan160@gmail.com
      </a>
      <a href="https://github.com/sagegallant" class="contact-link" target="_blank" rel="noopener">
        <!-- GitHub SVG icon --> github.com/sagegallant
      </a>
    </div>
    <a href="assets/Ram_Resume.pdf" class="btn btn-primary" download>Download Resume</a>
  </div>
</section>
```

**Step 3:** Write Footer:
```html
<footer>
  <div class="container footer-inner">
    <p>© 2026 Ram Chouhan · Built with HTML, CSS & Vanilla JS</p>
    <a href="https://github.com/sagegallant" aria-label="GitHub profile"><!-- SVG --></a>
  </div>
</footer>
```

**Step 4:** Write timeline CSS:
- `timeline`: `position: relative` with vertical `::before` green line
- `timeline-dot`: green circle, `position: absolute` on the line
- `timeline-content`: left-padded, card-like background
- Stagger reveal delays: item 1 = 0ms, item 2 = 120ms

**Step 5:** Commit
```bash
git add index.html style.css
git commit -m "feat: add Education timeline, Contact section, and Footer"
```

**Verify:** Timeline shows vertical green line connecting two education items. Contact section has email and GitHub links visible. Footer renders correctly at page bottom.

---

## Task 8: Scroll Animations + IntersectionObserver

**Files:**
- Write: IntersectionObserver code in `script.js`
- Write: `.reveal` stagger CSS for sibling elements in `style.css`

**Step 1:** Write IntersectionObserver in `script.js`:
```js
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}
```

**Step 2:** Write active nav link tracker:
```js
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const link = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));
```

**Step 3:** Add CSS for stagger:
```css
.project-card:nth-child(1).reveal { transition-delay: 0ms; }
.project-card:nth-child(2).reveal { transition-delay: 80ms; }
.project-card:nth-child(3).reveal { transition-delay: 160ms; }
.project-card:nth-child(4).reveal { transition-delay: 240ms; }
.skill-category:nth-child(1).reveal { transition-delay: 0ms; }
/* etc. */
```

**Step 4:** Commit
```bash
git add script.js style.css
git commit -m "feat: add IntersectionObserver scroll reveals and active nav tracking"
```

**Verify:** Sections animate in on scroll. Active nav link highlights on scroll. Hamburger works on mobile. Reduced-motion: no animations, elements visible immediately.

---

## Task 9: SEO + Accessibility Polish + GitHub Pages Deploy

**Files:**
- Polish: `index.html` (meta tags, aria, semantic cleanup)
- Polish: `style.css` (focus rings, mobile edge cases)
- Create: `d:\Projects\Antigravity\Portfolio\.nojekyll` (GitHub Pages bypass)
- Create: `d:\Projects\Antigravity\Portfolio\README.md`

**Step 1:** Complete SEO meta tags in `<head>`:
```html
<title>Ram Chouhan — Full-Stack Developer & MCA Student at MANIT Bhopal</title>
<meta name="description" content="Ram Chouhan is a Full-Stack Developer and MCA student at MANIT Bhopal. Builder of WebRTC P2P systems, DSA visualizers, and web apps. Available for Adobe Technical Consultant Internship.">
<meta property="og:title" content="Ram Chouhan — Full-Stack Developer">
<meta property="og:description" content="MCA @ MANIT Bhopal | WebRTC, Node.js, React, C/C++ | Open to Adobe TC Internship">
<meta property="og:image" content="https://avatars.githubusercontent.com/u/61646026?v=4">
<meta property="og:url" content="https://sagegallant.github.io/portfolio/">
<meta name="twitter:card" content="summary">
<link rel="canonical" href="https://sagegallant.github.io/portfolio/">
```

**Step 2:** Accessibility audit pass:
- All `<img>` have `alt` attributes
- All SVG icons have `aria-hidden="true"` (decorative) or `aria-label` (standalone)
- All interactive elements reachable by Tab; focus ring visible (`:focus-visible { outline: 2px solid var(--ring); }`)
- Skip-to-content link: `<a href="#main" class="skip-link">Skip to main content</a>` as first child of `<body>`
- Heading hierarchy: single `<h1>` (hero name), `<h2>` per section, `<h3>` per card/timeline item

**Step 3:** Mobile polish:
- Test at 375px: hero text doesn't overflow, buttons are full-width, cards stack cleanly
- Test at 768px: 2-column projects, 2-column skills

**Step 4:** Create `.nojekyll` (empty file) to prevent GitHub's Jekyll processing

**Step 5:** Create `README.md`:
```markdown
# Ram Chouhan — Portfolio

Personal portfolio website built with vanilla HTML, CSS, and JavaScript.

**Live:** https://sagegallant.github.io/portfolio/

Built as part of my MCA journey at MANIT Bhopal.
```

**Step 6:** Final commit + GitHub Pages deploy:
```bash
git add .
git commit -m "feat: SEO meta tags, a11y polish, GitHub Pages config"
git push origin main
```
Then: GitHub → repo Settings → Pages → Source: Deploy from branch `main` / root

**Verify:** Lighthouse scores: Performance ≥90, Accessibility ≥90, Best Practices ≥90, SEO ≥90. Site live at `sagegallant.github.io/portfolio/`. Resume PDF downloads correctly.

---

## Summary

| Task | Component | Est. Time | Commit |
|---|---|---|---|
| 1 | Project scaffold + git | 5 min | `feat: scaffold` |
| 2 | CSS tokens + base | 15 min | `feat: design system` |
| 3 | Navbar + mobile | 15 min | `feat: navbar` |
| 4 | Hero section | 20 min | `feat: hero` |
| 5 | About + Skills | 20 min | `feat: about and skills` |
| 6 | Projects (4 cards) | 25 min | `feat: projects` |
| 7 | Education + Contact + Footer | 15 min | `feat: education contact footer` |
| 8 | Scroll animations | 10 min | `feat: scroll animations` |
| 9 | SEO + a11y + deploy | 15 min | `feat: polish and deploy` |

**Total estimated: ~2.5 hours of implementation time**

---

> **STOP — Approval Gate 4 (Final gate before any code is written).**
> Review the implementation plan above. Reply "approved" to begin Phase 6 implementation.
> Or "approved with changes: ..." to modify any task before I start coding.
>
> **Once approved, I will implement one task at a time and stop for your review after each commit before starting the next.**
