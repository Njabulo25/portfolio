/* =========================================================
   FORM-VALIDATION.JS
   Contact form validation + mailto fallback
   ========================================================= */

(function () {
  'use strict';

  const form = document.getElementById('contactForm');
  if (!form) return;

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const fields = {
    name:    form.querySelector('#contact-name'),
    email:   form.querySelector('#contact-email'),
    subject: form.querySelector('#contact-subject'),
    message: form.querySelector('#contact-message')
  };

  const RECIPIENT = 'njabulontsako49@gmail.com';

  function clearError(field) {
    const parent = field.closest('.form-field');
    if (!parent) return;
    const existing = parent.querySelector('.form-error');
    if (existing) existing.remove();
    field.removeAttribute('aria-invalid');
  }

  function showError(field, message) {
    clearError(field);
    const parent = field.closest('.form-field');
    if (!parent) return;
    const error = document.createElement('p');
    error.className = 'form-error';
    error.textContent = message;
    error.style.color = '#b3261e';
    error.style.fontSize = '0.8125rem';
    error.style.marginTop = '0.25rem';
    parent.appendChild(error);
    field.setAttribute('aria-invalid', 'true');
  }

  function validate() {
    let ok = true;

    if (!fields.name.value.trim()) {
      showError(fields.name, 'Please enter your name.');
      ok = false;
    } else clearError(fields.name);

    const email = fields.email.value.trim();
    if (!email) {
      showError(fields.email, 'Please enter your email.');
      ok = false;
    } else if (!EMAIL_RE.test(email)) {
      showError(fields.email, 'Please enter a valid email address.');
      ok = false;
    } else clearError(fields.email);

    if (!fields.subject.value.trim()) {
      showError(fields.subject, 'Please enter a subject.');
      ok = false;
    } else clearError(fields.subject);

    const message = fields.message.value.trim();
    if (!message) {
      showError(fields.message, 'Please enter a message.');
      ok = false;
    } else if (message.length < 10) {
      showError(fields.message, 'Message should be at least 10 characters.');
      ok = false;
    } else if (message.length > 2000) {
      showError(fields.message, 'Message is too long.');
      ok = false;
    } else clearError(fields.message);

    return ok;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) return;

    // No backend yet — open the user's email client instead.
    // Replace this with a real form service (Formspree, Netlify Forms, etc.)
    // when one is configured.
    const body = encodeURIComponent(
      `Name: ${fields.name.value.trim()}\n` +
      `Email: ${fields.email.value.trim()}\n\n` +
      `${fields.message.value.trim()}`
    );
    const subject = encodeURIComponent(fields.subject.value.trim());

    window.location.href =
      `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;
  });

  // Clear errors as the user types
  Object.values(fields).forEach(field => {
    if (!field) return;
    field.addEventListener('input', () => clearError(field));
  });
})();