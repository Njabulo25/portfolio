/* =========================================================
   PROJECT-FILTER.JS
   Filter project cards by category
   ========================================================= */

(function () {
  'use strict';

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards  = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) {
    console.warn('[project-filter] Buttons or cards not found');
    return;
  }

  function applyFilter(filter) {
    projectCards.forEach(card => {
      const raw = card.getAttribute('data-categories') || '';
      const categories = raw.split(/\s+/).filter(Boolean);

      const matches = filter === 'all' || categories.includes(filter);
      card.classList.toggle('is-hidden', !matches);
    });
  }

  function setActiveButton(active) {
    filterButtons.forEach(btn => {
      btn.classList.toggle('is-active', btn === active);
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter') || 'all';
      setActiveButton(button);
      applyFilter(filter);
    });
  });

  // Reset to "All" on load
  const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
  if (allBtn) {
    setActiveButton(allBtn);
    applyFilter('all');
  }
})();