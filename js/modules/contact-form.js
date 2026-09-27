/* ==========================================================================
   contact-form.js — Validación del formulario de contacto.
   Valida al salir de cada campo y al enviar, muestra mensajes accesibles
   (aria-invalid + aria-describedby) y, si todo es correcto, abre el correo
   del visitante con el mensaje ya redactado (GitHub Pages no tiene backend).
   ========================================================================== */
(() => {
  'use strict';

  const form = document.getElementById('contact-form');
  if (!form) return;

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const NAME_PATTERN = /^[\p{L}\s'.-]+$/u;
  const recipient = form.getAttribute('action').replace('mailto:', '');

  const rules = {
    nombre(value) {
      const text = value.trim();
      if (!text) return 'Escribe tu nombre.';
      if (text.length < 3) return 'El nombre debe tener al menos 3 caracteres.';
      if (!NAME_PATTERN.test(text)) return 'Usa solo letras y espacios en el nombre.';
      return '';
    },
    correo(value) {
      const text = value.trim();
      if (!text) return 'Escribe tu correo electrónico.';
      if (!EMAIL_PATTERN.test(text)) return 'Ingresa un correo válido, por ejemplo nombre@correo.com.';
      return '';
    },
    motivo(value) {
      return value ? '' : 'Selecciona el motivo de tu mensaje.';
    },
    mensaje(value) {
      const length = value.trim().length;
      if (!length) return 'Escribe tu mensaje.';
      if (length < 20) return `Tu mensaje necesita al menos 20 caracteres (llevas ${length}).`;
      return '';
    },
  };

  const fieldNames = Object.keys(rules);

  const validateField = (name) => {
    const control = form.elements[name];
    const message = rules[name](control.value);
    const wrapper = control.closest('.field');
    const errorEl = document.getElementById(`${control.id}-error`);

    wrapper.classList.toggle('is-invalid', Boolean(message));
    wrapper.classList.toggle('is-valid', !message);
    control.setAttribute('aria-invalid', String(Boolean(message)));
    if (errorEl) errorEl.textContent = message;

    return !message;
  };

  const resetField = (name) => {
    const control = form.elements[name];
    control.closest('.field').classList.remove('is-invalid', 'is-valid');
    control.removeAttribute('aria-invalid');
    const errorEl = document.getElementById(`${control.id}-error`);
    if (errorEl) errorEl.textContent = '';
  };

  // Contador de caracteres del mensaje
  const message = form.elements.mensaje;
  const counter = form.querySelector(`[data-counter-for="${message.id}"]`);
  const updateCounter = () => {
    if (counter) counter.textContent = `${message.value.length} / ${message.maxLength}`;
  };

  fieldNames.forEach((name) => {
    const control = form.elements[name];
    const hasError = () => control.closest('.field').classList.contains('is-invalid');

    control.addEventListener('blur', () => {
      if (control.value || hasError()) validateField(name);
    });

    control.addEventListener(control.tagName === 'SELECT' ? 'change' : 'input', () => {
      if (hasError()) validateField(name);
    });
  });

  message.addEventListener('input', updateCounter);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const allValid = fieldNames.map(validateField).every(Boolean);

    if (!allValid) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      window.Portfolio?.toast('Revisa los campos marcados antes de enviar.', 'error');
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    const subject = `[Portafolio] ${data.motivo} — ${data.nombre.trim()}`;
    const body = `${data.mensaje.trim()}\n\n—\n${data.nombre.trim()}\n${data.correo.trim()}`;

    window.location.href =
      `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.Portfolio?.toast('¡Gracias! Se abrirá tu aplicación de correo con el mensaje listo.', 'success');
    form.reset();
    fieldNames.forEach(resetField);
    updateCounter();
  });

  updateCounter();
})();
