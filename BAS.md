# Phase 4 — Backend Architecture Specification (BAS)
## Ram Chouhan Portfolio Website

> This is a **static frontend-only site**. Backend sections are explicitly marked N/A.

---

## Data Model — N/A

No database. All data is hardcoded in `index.html`:
- Personal info (name, email, links)
- Skills array
- Projects array (title, description, stack, links)
- Education timeline
- Social links

---

## API Contract — N/A

No server-side API. All external calls are:
- **GitHub avatar** — `https://avatars.githubusercontent.com/u/61646026?v=4` (CDN, GET, no auth)
- **Google Fonts** — `fonts.googleapis.com` (CDN, GET, no auth)
- **Devicons CDN** — `cdn.jsdelivr.net/gh/devicons/devicon@latest` (CDN, GET, no auth)

---

## Auth & Security — N/A

No authentication. No user data collected. No form submission. Contact via `mailto:` link only.

**Security headers** (configured in GitHub Pages via `_headers` file or meta tags):
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' https://avatars.githubusercontent.com data:; script-src 'self' 'unsafe-inline'">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta name="referrer" content="strict-origin-when-cross-origin">
```

---

## Hosting / Infra / Deployment

| Concern | Decision |
|---|---|
| **Host** | GitHub Pages (free, HTTPS auto) |
| **Branch** | `main` → deploy from root (or `gh-pages` branch) |
| **Custom domain** | Optional later — CNAME file + DNS |
| **Deploy method** | `git push origin main` → auto-deploy |
| **Build step** | None — single `index.html` file |
| **URL** | `https://sagegallant.github.io/portfolio/` |
| **CDN** | GitHub's own CDN (automatic) |
| **HTTPS** | Automatic via GitHub Pages |
| **Resume PDF** | Committed to repo as `assets/Ram_Resume.pdf` |

**Deployment Checklist:**
```
1. git init (inside d:\Projects\Antigravity\Portfolio)
2. git add .
3. git commit -m "feat: initial portfolio launch"
4. git remote add origin https://github.com/sagegallant/portfolio.git
5. git push -u origin main
6. GitHub repo Settings → Pages → Source: main branch / root
```

---

## Third-Party Integrations

| Integration | Purpose | How |
|---|---|---|
| Google Fonts | JetBrains Mono + IBM Plex Sans | `<link>` preconnect + stylesheet in `<head>` |
| Devicons CDN | Tech stack logos (JS, React, Node, C++, etc.) | `<img>` tags pointing to jsdelivr CDN |
| GitHub Avatars | Profile photo | `<img src="https://avatars.githubusercontent.com/u/61646026">` |
| mailto: | Contact link | `<a href="mailto:ramchouhan160@gmail.com">` |
| GitHub profile | Project links | `href="https://github.com/sagegallant/[repo]"` |

---

> STOP — Approval Gate 3. BAS above covers all hosting and deployment decisions.
> This is a static site so API/data/auth are all N/A.
> Reply "approved" to proceed to Phase 5 (Implementation Plan).
