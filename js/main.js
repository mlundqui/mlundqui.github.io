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


// ===== Hero photo 3D flip toggle =====
(() => {
  const card = document.getElementById('hero-photo');
  if (!card) return;

  const front = card.querySelector('.front');
  const back  = card.querySelector('.back');

  [front?.src, back?.src].forEach(src => { if (src) { const i = new Image(); i.src = src; } });

  const flip = () => {
    card.classList.toggle('flipped');
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

// ===== Fake hit counter =====
(() => {
  const HIT_KEY = 'geocities-hits';
  let count = parseInt(localStorage.getItem(HIT_KEY) || '427', 10);
  count++;
  localStorage.setItem(HIT_KEY, String(count));

  const padded = String(count).padStart(6, '0');

  const el = document.getElementById('hit-count');
  const elFooter = document.getElementById('hit-count-footer');
  if (el) el.textContent = padded;
  if (elFooter) elFooter.textContent = padded;
})();

