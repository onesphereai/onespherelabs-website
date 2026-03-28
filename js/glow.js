/**
 * glow.js — OneSphere Labs
 *
 * Two mouse-driven glow effects:
 *
 * 1. CTA Button Inner Glow
 *    Buttons with [data-btn-glow] get a warm radial gradient that follows
 *    the mouse inside the button, creating a light-under-glass effect.
 *
 * 2. Card Border Light
 *    Cards with [data-card-glow] get a subtle radial gradient overlay
 *    that follows the mouse, illuminating the nearest border region.
 *
 * Both effects are disabled on touch devices and when
 * prefers-reduced-motion is active.
 *
 * IIFE — no global variable pollution.
 */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarsePointer = window.matchMedia('(pointer: coarse)').matches;

  if (reducedMotion || coarsePointer) return;

  /* ─────────────────────────────────────────────
     1. CTA Button Inner Glow
  ───────────────────────────────────────────── */

  function initButtonGlow() {
    var buttons = document.querySelectorAll('.btn-primary, .btn-cta');
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      btn.setAttribute('data-btn-glow', '');

      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        btn.style.setProperty('--btn-glow-x', x + 'px');
        btn.style.setProperty('--btn-glow-y', y + 'px');
      }, { passive: true });
    });
  }

  /* ─────────────────────────────────────────────
     2. Card Border Light
  ───────────────────────────────────────────── */

  function initCardGlow() {
    var cards = document.querySelectorAll(
      '.glass-card, .feature-card, .about-product-card, .mission__value, .about-stat, .trust__badge, .product-trust__badge'
    );
    if (!cards.length) return;

    cards.forEach(function (card) {
      card.setAttribute('data-card-glow', '');

      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        card.style.setProperty('--card-glow-x', x + 'px');
        card.style.setProperty('--card-glow-y', y + 'px');
      }, { passive: true });
    });
  }

  /* ─────────────────────────────────────────────
     Bootstrap
  ───────────────────────────────────────────── */
  function init() {
    initButtonGlow();
    initCardGlow();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
