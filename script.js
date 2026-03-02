// Ram Chouhan Portfolio — script.js
// ponytail: no framework, no build step, native browser APIs only

/* ── Navbar: glassmorphism on scroll ── */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('nav-scrolled', window.scrollY > 60);
}, { passive: true });

navToggle?.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!open));
  navMenu.classList.toggle('nav-open');
  document.body.classList.toggle('menu-active');
});

navMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('nav-open');
    document.body.classList.remove('menu-active');
  });
});

/* ── Typewriter ── */
const roles = ['Full-Stack Developer', 'WebRTC Builder', 'Systems Thinker', 'MCA @ MANIT Bhopal'];
let rIdx = 0, cIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  if (!typeEl) return;
  const cur = roles[rIdx];
  typeEl.textContent = deleting ? cur.slice(0, cIdx--) : cur.slice(0, cIdx++);
  if (!deleting && cIdx > cur.length) { deleting = true; setTimeout(type, 1800); return; }
  if (deleting && cIdx < 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; }
  setTimeout(type, deleting ? 45 : 85);
}

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  if (typeEl) typeEl.textContent = roles[0];
} else {
  type();
}

/* ── Scroll reveal (IntersectionObserver) ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealEls.forEach(el => el.classList.add('in-view'));
} else {
  revealEls.forEach(el => revealObserver.observe(el));
}

/* ── Active nav link tracking ── */
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
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));
