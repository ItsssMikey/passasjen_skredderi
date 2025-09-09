// Mobilmeny
const burger = document.querySelector('.burger');
const mobileMenu = document.getElementById('mobileMenu');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });

  // Lukk meny ved valg
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  // ESC lukker meny
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

// År i footer
document.getElementById('year').textContent = new Date().getFullYear();

// Enkel "shrink" på scroll (valgfritt)
const header = document.querySelector('.site-header');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY || window.pageYOffset;
  if (!header) return;
  if (y > 10 && y > lastY) {
    header.style.backdropFilter = 'saturate(180%) blur(10px)';
  } else if (y <= 10) {
    header.style.backdropFilter = 'saturate(180%) blur(8px)';
  }
  lastY = y;
});
