/* =========================================================
   ANIMATIONS.JS
   Section entrance fade-up, lightbox image viewer
   ========================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     1. Section entrance fade-up
     Only runs if JS is enabled. If JS fails, sections stay
     visible — the CSS only hides them under .js-enabled.
     --------------------------------------------------------- */
  function initSectionFade() {
    const sections = document.querySelectorAll('.section');
    if (!sections.length) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      sections.forEach(s => s.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    });

    sections.forEach(section => {
      // Hero shows immediately
      if (section.id === 'home') {
        section.classList.add('is-visible');
        return;
      }
      observer.observe(section);
    });
  }

  /* ---------------------------------------------------------
     2. Lightbox
     Opens any element marked with [data-lightbox].
     Supports Escape, click-outside and close button.
     Arrow keys navigate between sibling images.
     --------------------------------------------------------- */
  function initLightbox() {
    const triggers = Array.from(
      document.querySelectorAll('[data-lightbox]')
    );
    if (!triggers.length) return;

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image viewer');
    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Close viewer">✕</button>
      <button class="lightbox-prev" aria-label="Previous image">‹</button>
      <img class="lightbox-image" alt="">
      <button class="lightbox-next" aria-label="Next image">›</button>
    `;
    document.body.appendChild(lightbox);

    const imageEl  = lightbox.querySelector('.lightbox-image');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn  = lightbox.querySelector('.lightbox-prev');
    const nextBtn  = lightbox.querySelector('.lightbox-next');

    let currentIndex = 0;
    let lastFocused  = null;

    function show(index) {
      if (index < 0) index = triggers.length - 1;
      if (index >= triggers.length) index = 0;
      currentIndex = index;

      const source = triggers[currentIndex];
      imageEl.src = source.src;
      imageEl.alt = source.alt || '';

      // Hide nav buttons if only one image
      const single = triggers.length <= 1;
      prevBtn.style.display = single ? 'none' : 'flex';
      nextBtn.style.display = single ? 'none' : 'flex';
    }

    function open(index) {
      lastFocused = document.activeElement;
      show(index);
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function close() {
      lightbox.classList.remove('is-open');
      imageEl.src = '';
      document.body.style.overflow = '';
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    triggers.forEach((img, index) => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => open(index));
    });

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', () => show(currentIndex - 1));
    nextBtn.addEventListener('click', () => show(currentIndex + 1));

    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  show(currentIndex - 1);
      if (e.key === 'ArrowRight') show(currentIndex + 1);
    });
  }

  /* ---------------------------------------------------------
     Init
     --------------------------------------------------------- */
  function init() {
    initSectionFade();
    initLightbox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
/* =========================================================
   TYPING HERO
   Types out the text in #typingText letter by letter.
   Then reveals #heroWelcome.
   ========================================================= */

(function () {
  'use strict';

  function initTyping() {
    const el = document.getElementById('typingText');
    const welcome = document.getElementById('heroWelcome');
    if (!el) return;

    const fullText = el.getAttribute('data-typed') || '';
    if (!fullText) return;

    // Respect reduced motion — just show the text immediately
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced) {
      el.textContent = fullText;
      if (welcome) welcome.classList.add('is-visible');
      return;
    }

    let index = 0;
    const speed = 55; // milliseconds per character

    function type() {
      if (index < fullText.length) {
        el.textContent += fullText.charAt(index);
        index++;
        setTimeout(type, speed);
      } else {
        // Finished typing — reveal the welcome line
        if (welcome) welcome.classList.add('is-visible');
      }
    }

    // Start after a short pause
    setTimeout(type, 400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTyping);
  } else {
    initTyping();
  }
})();