// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');
navToggle?.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

// Year in footer
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

// Theme toggle (persisted)
const themeBtn = document.getElementById('theme-toggle');
const root = document.documentElement;
const THEME_KEY = 'theme';

function applyTheme(mode) {
  if (mode === 'light') root.classList.add('light');
  else root.classList.remove('light');
}

applyTheme(localStorage.getItem(THEME_KEY));

themeBtn?.addEventListener('click', () => {
  const current = localStorage.getItem(THEME_KEY) === 'light' ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, current);
  applyTheme(current);
});
