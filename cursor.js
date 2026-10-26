const siteNav = document.querySelector('.site-nav');

const updateNavigation = () => {
  if (!siteNav) return;
  siteNav.classList.toggle('is-visible', window.scrollY >= window.innerHeight * .72);
};

updateNavigation();
window.addEventListener('scroll', updateNavigation, { passive: true });
window.addEventListener('resize', updateNavigation);

const intro = document.querySelector('.logo-intro');
const about = document.querySelector('.about-store');
const scrollCue = document.querySelector('.scroll-cue');
const mobileViewport = window.matchMedia('(max-width: 700px)');
let touchStartY = 0;
let mobileIntroHasAdvanced = false;

const advanceFromIntro = () => {
  if (mobileIntroHasAdvanced || window.scrollY > 24 || !about) return;
  mobileIntroHasAdvanced = true;
  about.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.setTimeout(() => { mobileIntroHasAdvanced = false; }, 900);
};

scrollCue?.addEventListener('click', advanceFromIntro);

window.addEventListener('touchstart', (event) => {
  touchStartY = event.touches[0]?.clientY ?? 0;
}, { passive: true });

window.addEventListener('touchmove', (event) => {
  const currentY = event.touches[0]?.clientY ?? touchStartY;
  if (touchStartY - currentY > 7) advanceFromIntro();
}, { passive: true });

window.addEventListener('wheel', (event) => {
  if (event.deltaY > 2 && window.scrollY <= 24) {
    event.preventDefault();
    advanceFromIntro();
  }
}, { passive: false });
