/* =========================================================
   NAVIGATION.JS
   Active section detection, completed ticks, smooth scroll
   ========================================================= */

(function () {
  'use strict';

  const SECTION_IDS = [
    'home',
    'projects',
    'skills',
    'experience',
    'education',
    'certifications',
    'contact'
  ];

  const header   = document.querySelector('.site-header');
  const navItems = document.querySelectorAll('.nav-item');

  const visited = new Set();
  let currentActiveId = null;

  /* ---------------------------------------------------------
     Header scroll state
     --------------------------------------------------------- */
  function updateHeaderState() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  }

  /* ---------------------------------------------------------
     Active section
     --------------------------------------------------------- */
  function setActiveSection(id) {
    if (currentActiveId === id) return;
    currentActiveId = id;

    navItems.forEach(item => {
      const target = item.getAttribute('data-target');
      item.classList.toggle('is-active', target === id);
    });
  }

  /* ---------------------------------------------------------
     Completed section (• → ✓)
     --------------------------------------------------------- */
  function markComplete(id) {
    if (visited.has(id)) return;
    visited.add(id);

    navItems.forEach(item => {
      if (item.getAttribute('data-target') === id) {
        item.classList.add('is-complete');
        const marker = item.querySelector('.nav-marker');
        if (marker) marker.textContent = '✓';
      }
    });
  }

  /* ---------------------------------------------------------
     When a section becomes active, mark everything above it
     as completed.
     --------------------------------------------------------- */
  function updateCompleted(currentId) {
    const currentIndex = SECTION_IDS.indexOf(currentId);
    if (currentIndex === -1) return;

    for (let i = 0; i < currentIndex; i++) {
      markComplete(SECTION_IDS[i]);
    }
  }

  /* ---------------------------------------------------------
     Smooth scroll on nav click
     --------------------------------------------------------- */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function handleNavClick(event) {
    const link = event.currentTarget;
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const targetId = href.slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    event.preventDefault();

    const headerHeight = header ? header.offsetHeight : 0;
    const targetTop =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight -
      12;

    window.scrollTo({
      top: targetTop,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
  }

  /* ---------------------------------------------------------
     Observer — fires when sections enter the viewport
     --------------------------------------------------------- */
  function createSectionObserver() {
    const sections = SECTION_IDS
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) {
      console.warn('[navigation] No sections found');
      return;
    }

    const options = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        setActiveSection(id);
        updateCompleted(id);
      });
    }, options);

    sections.forEach(section => observer.observe(section));
  }

  /* ---------------------------------------------------------
     Init
     --------------------------------------------------------- */
  function init() {
    document.documentElement.classList.add('js-enabled');

    navItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      if (link) link.addEventListener('click', handleNavClick);
    });

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });

    createSectionObserver();
    setActiveSection('home');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();