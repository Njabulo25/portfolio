/* =========================================================
   NAVIGATION.JS
   Active section detection, completed ticks, smooth scroll,
   mobile menu toggle, header scroll state
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

  const header     = document.querySelector('.site-header');
  const navItems   = document.querySelectorAll('.nav-item');
  const navList    = document.getElementById('primaryNav');
  const menuToggle = document.getElementById('menuToggle');

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

  function updateCompleted(currentId) {
    const currentIndex = SECTION_IDS.indexOf(currentId);
    if (currentIndex === -1) return;

    for (let i = 0; i < currentIndex; i++) {
      markComplete(SECTION_IDS[i]);
    }
  }

  /* ---------------------------------------------------------
     Mobile menu
     --------------------------------------------------------- */
  function openMenu() {
    if (!navList || !menuToggle) return;
    navList.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close navigation menu');
  }

  function closeMenu() {
    if (!navList || !menuToggle) return;
    navList.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  }

  function toggleMenu() {
    if (!navList) return;
    if (navList.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
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

    // Close mobile menu if open
    closeMenu();

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
     Section observer
     --------------------------------------------------------- */
  function createSectionObserver() {
    const sections = SECTION_IDS
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

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
     Outside-click and Escape closes the menu
     --------------------------------------------------------- */
  function handleOutsideClick(event) {
    if (!navList || !navList.classList.contains('is-open')) return;
    if (navList.contains(event.target)) return;
    if (menuToggle && menuToggle.contains(event.target)) return;
    closeMenu();
  }

  function handleEscape(event) {
    if (event.key === 'Escape') closeMenu();
  }

  /* ---------------------------------------------------------
     Init
     --------------------------------------------------------- */
  function init() {
    document.documentElement.classList.add('js-enabled');

    // Nav link click handlers
    navItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      if (link) link.addEventListener('click', handleNavClick);
    });

    // Mobile menu toggle
    if (menuToggle) {
      menuToggle.addEventListener('click', toggleMenu);
    }

    // Outside click and Escape
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    // Header scroll state
    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });

    // Active section detection
    createSectionObserver();
    setActiveSection('home');

    // Close menu when resizing to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();