// ===== Mobile nav =====
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');
navToggle?.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

// ===== Year in footer =====
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

// ===== Theme toggle (persist + system fallback) =====
// Works with CSS that defines light in :root and dark in html[data-theme="dark"]
const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const THEME_KEY = 'theme'; // 'light' | 'dark'

initTheme();

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);               // 'light' | 'dark' | null
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const start = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(start);

  // Toggle on click
  themeBtn?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  // If the user hasn't chosen, follow OS changes live
  if (!saved) {
    try {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const onChange = (e) => applyTheme(e.matches ? 'dark' : 'light');
      // modern browsers
      mql.addEventListener?.('change', onChange);
      // fallback
      mql.addListener?.(onChange);
    } catch (_) { /* noop */ }
  }
}

function applyTheme(mode) {
  if (mode === 'dark') {
    root.setAttribute('data-theme', 'dark');  // activates html[data-theme="dark"] in CSS
    if (themeBtn) {
      themeBtn.textContent = '☀️';
      themeBtn.setAttribute('aria-label', 'Switch to light theme');
      themeBtn.setAttribute('aria-pressed', 'true');
    }
  } else {
    root.removeAttribute('data-theme');       // falls back to light :root vars
    if (themeBtn) {
      themeBtn.textContent = '🌓';            // or '🌙'
      themeBtn.setAttribute('aria-label', 'Switch to dark theme');
      themeBtn.setAttribute('aria-pressed', 'false');
    }
  }
}

// ===== Hero photo 3D flip toggle =====
(() => {
  const card = document.getElementById('hero-photo');
  if (!card) return;

  const front = card.querySelector('.front');
  const back  = card.querySelector('.back');

  // Preload both so the first flip is instant
  [front?.src, back?.src].forEach(src => { if (src) { const i = new Image(); i.src = src; } });

  const flip = () => {
    card.classList.toggle('flipped');
    // Update cursor hint
    card.style.cursor = card.classList.contains('flipped') ? 'zoom-out' : 'zoom-in';
  };

  card.addEventListener('click', flip);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      flip();
    }
  });
})();