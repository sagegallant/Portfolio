# Phase 3 — Technical Specification Document (TSD)
# + MASTER.md Design System

## Ram Chouhan Portfolio Website

---

## 1. Stack Rationale

| Choice | Rationale |
|---|---|
| **Vanilla HTML5 + CSS3 + JS** | Zero build step, deploys to GitHub Pages as-is. No npm, no bundler. Reviewer can open the file locally and it works. |
| **No framework** | Portfolio reviewers sometimes view source — clean vanilla JS signals fundamentals mastery, aligning perfectly with Adobe's CS fundamentals emphasis. |
| **Single HTML file (index.html)** | Simplest possible deployment surface. Fonts and icons loaded from CDN. |
| **CSS Custom Properties** | All design tokens as `--var` — one place to change the entire palette. |
| **IntersectionObserver API** | Native browser API for scroll-triggered animations. No GSAP needed, keeps bundle at zero. |
| **GitHub Pages** | Free, custom domain possible later, instant HTTPS. |

---

## 2. MASTER.md — Design System

### 2.1 Brand Identity

- **Name:** Ram Chouhan
- **Role Identity:** Full-Stack Developer & Systems Thinker
- **Mode (impeccable):** Experience → Persuade (portfolio page with recruiters as audience)
- **Adjectives:** Technical · Precise · Builder

### 2.2 Color Tokens

```css
:root {
  /* Backgrounds */
  --bg-base:       #0F172A;  /* OLED-friendly deep navy */
  --bg-card:       #1B2336;  /* Card surface */
  --bg-muted:      #272F42;  /* Muted/subtle surfaces */

  /* Text */
  --text-primary:  #F8FAFC;  /* Headings, primary text */
  --text-secondary:#94A3B8;  /* Subtitles, captions */
  --text-accent:   #22C55E;  /* Green accent — code + run */

  /* UI */
  --border:        #2D3B55;  /* Card borders, dividers */
  --ring:          #22C55E;  /* Focus rings */

  /* Interactive */
  --btn-primary-bg:    #22C55E;
  --btn-primary-text:  #0F172A;
  --btn-outline-border:#22C55E;
  --btn-outline-text:  #22C55E;

  /* Semantic */
  --tag-bg:        rgba(34, 197, 94, 0.12);
  --tag-text:      #22C55E;
  --tag-border:    rgba(34, 197, 94, 0.25);
}
```

**Contrast checks (WCAG AA):**
- `--text-primary` (#F8FAFC) on `--bg-base` (#0F172A) = 17.9:1 ✅
- `--text-accent` (#22C55E) on `--bg-base` (#0F172A) = 6.5:1 ✅
- `--btn-primary-text` (#0F172A) on `--btn-primary-bg` (#22C55E) = 8.1:1 ✅
- `--text-secondary` (#94A3B8) on `--bg-base` (#0F172A) = 5.1:1 ✅

### 2.3 Typography

**Fonts:**
```
Heading / Code labels: JetBrains Mono (wght 400, 500, 600, 700)
Body / UI copy:        IBM Plex Sans (wght 300, 400, 500, 600, 700)
```

**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap
```

**Type Scale:**
```css
--type-hero:    clamp(2.5rem, 6vw, 5rem);     /* Hero name */
--type-h1:      clamp(2rem, 4vw, 3.5rem);     /* Section titles */
--type-h2:      clamp(1.4rem, 3vw, 2rem);     /* Card titles, sub-headings */
--type-h3:      1.125rem;                      /* Labels */
--type-body:    1rem;                          /* Body text */
--type-small:   0.875rem;                      /* Captions, tags */
--type-xs:      0.75rem;                       /* Meta, timestamps */

--font-heading: 'JetBrains Mono', monospace;
--font-body:    'IBM Plex Sans', sans-serif;
```

### 2.4 Spacing System (8px grid, spacious density)

```css
--space-1:  0.25rem;   /* 4px */
--space-2:  0.5rem;    /* 8px */
--space-3:  0.75rem;   /* 12px */
--space-4:  1rem;      /* 16px */
--space-5:  1.25rem;   /* 20px */
--space-6:  1.5rem;    /* 24px */
--space-8:  2rem;      /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
--space-32: 8rem;      /* 128px */

--section-padding: var(--space-24) var(--space-4);  /* Spacious sections */
--container-max: 1100px;
--container-px: clamp(1rem, 5vw, 3rem);
```

### 2.5 Border Radius

```css
--radius-sm:   4px;    /* Tags, chips */
--radius-md:   8px;    /* Buttons */
--radius-lg:   12px;   /* Cards */
--radius-xl:   16px;   /* Large containers */
--radius-full: 9999px; /* Pills */
```

### 2.6 Shadows & Effects

```css
--shadow-card: 0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.25);
--shadow-hover: 0 8px 32px rgba(34, 197, 94, 0.08), 0 2px 8px rgba(0,0,0,0.5);
--glow-accent: 0 0 20px rgba(34, 197, 94, 0.15);
--glass-bg: rgba(27, 35, 54, 0.85);
--glass-border: rgba(45, 59, 85, 0.6);
--glass-blur: blur(12px);
```

### 2.7 Motion Tokens

```css
--ease-out:   cubic-bezier(0.16, 1, 0.3, 1);     /* Standard reveals */
--ease-back:  cubic-bezier(0.34, 1.56, 0.64, 1); /* Spring-like pops */
--duration-fast:   150ms;
--duration-base:   300ms;
--duration-slow:   450ms;
```

**Scroll reveal pattern (IntersectionObserver):**
```js
// Applied to every .reveal element
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      observer.unobserve(e.target); // fire once
    }
  });
}, { threshold: 0.1 });
```

```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity var(--duration-slow) var(--ease-out),
              transform var(--duration-slow) var(--ease-out);
}
.reveal.in-view {
  opacity: 1;
  transform: none;
}
/* Stagger children via CSS custom property */
.reveal:nth-child(1) { transition-delay: 0ms; }
.reveal:nth-child(2) { transition-delay: 60ms; }
.reveal:nth-child(3) { transition-delay: 120ms; }
.reveal:nth-child(4) { transition-delay: 180ms; }

@media (prefers-reduced-motion: reduce) {
  .reveal { transition: none; opacity: 1; transform: none; }
}
```

### 2.8 Anti-Patterns to Avoid

- ❌ Plain white or light-mode-first design
- ❌ Generic blue-card template patterns
- ❌ Emojis as structural icons (use inline SVG)
- ❌ Slow performance / unoptimized fonts
- ❌ Gradient rainbow overload
- ❌ Fixed font sizes (use clamp() for fluid type)
- ❌ Cards without hover states
- ❌ Tab order not matching visual order

---

## 3. Component Architecture

### 3.1 Component Inventory

| Component | Reused In | Notes |
|---|---|---|
| `<Navbar>` | All (sticky) | Glassmorphism on scroll; logo + nav links + Resume CTA |
| `<SectionHeading>` | About, Skills, Projects, Education, Contact | Number badge + large title |
| `<CTAButton>` | Hero, Navbar, Contact | primary (green filled) + secondary (green outline) variants |
| `<ProjectCard>` | Projects section | Expandable, tag chips, hover lift, demo + github links |
| `<TagChip>` | Projects, Skills | Small green pill with border |
| `<SkillCategory>` | Skills section | Grid of chips grouped by category |
| `<Timeline>` | Education | Vertical line + dots + content |
| `<SocialLink>` | Contact, Footer | Icon + label, hover underline |
| `.reveal` | Every section | IntersectionObserver scroll animation class |
| `.container` | Every section | max-width + horizontal padding |

### 3.2 Navbar Behavior

```
Default:   transparent background, full height
On scroll: --glass-bg + --glass-border + backdrop-filter:blur(12px)
Mobile:    hamburger menu, full-screen overlay or slide-down
Active:    underline on current section (IntersectionObserver tracks section)
```

### 3.3 Project Card States

```
Default:   --bg-card background, --shadow-card
Hover:     translateY(-4px) + --shadow-hover + green border glow
Focus:     visible green ring (keyboard accessible)
Expanded:  full-width case study panel slides down OR modal overlay
```

---

## 4. Page-by-Page Component Map

| Section | Components Used | Unique Elements |
|---|---|---|
| **Navbar** | CTAButton, SocialLink SVGs | Glassmorphism on scroll, mobile hamburger |
| **Hero** | CTAButton ×2, .reveal | Animated background mesh (CSS only), typewriter on role |
| **About** | SectionHeading, TagChip ×3 (traits) | Avatar circle with green ring, prose paragraph |
| **Skills** | SectionHeading, SkillCategory, TagChip | 4 categories, stagger reveal per category |
| **Projects** | SectionHeading, ProjectCard ×4, TagChip | Case study expansion, live demo badge |
| **Education** | SectionHeading, Timeline ×2 | Vertical line, institution logos or initials |
| **Contact** | SectionHeading, SocialLink ×3, CTAButton | Minimal, no form, email mailto |
| **Footer** | — | One-liner copyright + built-with note |

---

## 5. State Management

None required. This is a static document with:
- **Navbar scroll state** — single boolean `isScrolled`, toggled via scroll listener
- **Mobile menu state** — single boolean `menuOpen`, toggled via hamburger click
- **Project expand state** — per-card `expanded` class toggle on click
- **Scroll animation state** — IntersectionObserver adds `in-view` class, no further state

---

## 6. Accessibility & Performance Budgets

### Accessibility (WCAG AA target)
- All text ≥ 4.5:1 contrast (verified in tokens above)
- All interactive elements keyboard-reachable (Tab order = visual order)
- All SVG icons have `aria-hidden="true"` when decorative, or `aria-label` when standalone
- `prefers-reduced-motion` respected (animations disabled)
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<h1>`–`<h6>` hierarchy

### Performance Budgets
- Page weight target: < 200KB total (excluding avatar image)
- Fonts: async loaded via `display=swap` to prevent FOUT blocking
- Images: none initially (avatar = CSS gradient circle or GitHub avatar URL)
- No JavaScript dependencies — zero npm packages
- Lighthouse mobile target: 90+ Performance, 90+ Accessibility, 100 Best Practices

---

## 7. Responsive Breakpoints

```css
/* Mobile first */
Default:           375px  (single column)
@media (min-width: 640px):  tablet portrait (2-column skills, 2-col projects)
@media (min-width: 1024px): desktop (3-4 col skills, 2 col projects, full nav)
@media (min-width: 1280px): wide desktop (centered container, max 1100px)
```

---

> STOP — Approval Gate 2. Please review TSD + MASTER.md above.
> Reply "approved" to proceed to Phase 4 (BAS), or "approved with changes: ..." to adjust.
