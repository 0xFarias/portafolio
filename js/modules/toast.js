/* ==========================================================================
   toast.js — Notificaciones breves y accesibles (role="status").
   Expone Portfolio.toast(mensaje, tipo) para el resto de módulos.
   ========================================================================== */
(() => {
  'use strict';

  const toast = document.getElementById('toast');
  const Portfolio = (window.Portfolio = window.Portfolio || {});
  const DURATION = 4200;
  let timerId;

  Portfolio.toast = (message, type = 'success') => {
    if (!toast) return;

    toast.querySelector('.toast__message').textContent = message;
    toast.classList.remove('toast--success', 'toast--error');
    toast.classList.add(`toast--${type}`);
    toast.querySelector('use')?.setAttribute('href', type === 'error' ? '#i-alert' : '#i-check');
    toast.classList.add('is-visible');

    clearTimeout(timerId);
    timerId = setTimeout(() => toast.classList.remove('is-visible'), DURATION);
  };
})();
