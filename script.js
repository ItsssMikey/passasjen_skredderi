// --- Burger / mobilmeny ---
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

// --- År i footer ---
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// --- Logo-swap + body padding ved scroll ---
const headerEl = document.querySelector('.site-header');
const rootStyle = getComputedStyle(document.documentElement);
const HEADER_H = (rootStyle.getPropertyValue('--headerH') || '76px').trim();
const HEADER_H_SCROLLED = (rootStyle.getPropertyValue('--headerH-scrolled') || '64px').trim();

function onScrollHeaderSwap() {
  if (!headerEl) return;
  const y = window.scrollY || window.pageYOffset;
  const scrolled = y > 10;
  headerEl.classList.toggle('scrolled', scrolled);
  // Match body padding til header-høyden (siden header er fixed)
  document.body.style.paddingTop = scrolled ? HEADER_H_SCROLLED : HEADER_H;
}
window.addEventListener('scroll', onScrollHeaderSwap, { passive: true });
onScrollHeaderSwap(); // init ved load

// --- Fullbredde galleri (karusell) ---
(function initGallery(){
  const gallery = document.querySelector('.gallery');
  const track = document.querySelector('.gallery-track');
  const slides = Array.from(document.querySelectorAll('.gallery-slide'));
  const prevBtn = document.querySelector('.gallery-btn.prev');
  const nextBtn = document.querySelector('.gallery-btn.next');
  const dots = Array.from(document.querySelectorAll('.gallery-dots .dot'));
  if (!gallery || !track || slides.length === 0) return;

  let index = 0;
  const slideCount = slides.length;
  let timer = null;
  const INTERVAL = 6000; // ms

  function goTo(i) {
    index = (i + slideCount) % slideCount;
    // 3D transform for jevnhet (hindrer 1px-gliper)
    track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
    dots.forEach((d, di) => d.setAttribute('aria-selected', di === index ? 'true' : 'false'));
  }

  function next(){ goTo(index + 1); }
  function prev(){ goTo(index - 1); }

  // Dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAuto();
      goTo(i);
      startAuto();
    });
  });

  // Buttons
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); next(); startAuto(); });

  // Autoplay
  function startAuto() { timer = setInterval(next, INTERVAL); }
  function stopAuto() { if (timer) clearInterval(timer); timer = null; }

  // Pause ved hover/touch
  gallery.addEventListener('mouseenter', stopAuto);
  gallery.addEventListener('mouseleave', startAuto);
  gallery.addEventListener('touchstart', stopAuto, {passive:true});
  gallery.addEventListener('touchend', startAuto, {passive:true});

  // Piltaster når galleriet har fokus
  gallery.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { stopAuto(); next(); startAuto(); }
    if (e.key === 'ArrowLeft')  { stopAuto(); prev(); startAuto(); }
  });

  // Init
  goTo(0);
  startAuto();

  // Re-init ved vindusstørrelse-endring
  window.addEventListener('resize', () => { goTo(index); });
})();
