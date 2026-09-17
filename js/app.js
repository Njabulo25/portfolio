/* =========================================================
   APP.JS
   Small global helpers and page-level setup
   ========================================================= */

(function () {
  'use strict';

  function setCurrentYear() {
    const el = document.querySelector('[data-current-year]');
    if (el) el.textContent = new Date().getFullYear();
  }

  function init() {
    setCurrentYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();