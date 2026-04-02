/**
 * glow.js — OneSphere Labs
 *
 * Effect 1: CTA Button Mouse-Following Inner Glow
 *   Finds all .btn-primary and .btn-cta buttons, injects a .glow-inner div
 *   and wraps existing content in a .btn-text span for z-index layering.
 *   The .glow-inner follows the cursor inside the button and fades out
 *   on mouseleave.
 *
 * Effect 2: Animated Rotating Card Border
 *   The CSS handles the conic-gradient animation via @property and
 *   @keyframes rotateBorder. This script simply ensures cards with
 *   matching selectors carry the correct stacking context — no extra
 *   JS is needed beyond what the CSS already provides. The card glow
 *   (cursor-tracking radial overlay) uses the existing data-card-glow
 *   attribute + CSS custom property approach.
 *
 * Guards:
 *   - prefers-reduced-motion: button glow not initialised.
 *   - coarse pointer (touch): button glow not initialised.
 *   - All event listeners are { passive: true }.
 *   - IIFE — no global variable pollution.
 */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarsePointer = window.matchMedia('(pointer: coarse)').matches;

  /* ─────────────────────────────────────────────
     Effect 1: CTA Button Mouse-Following Inner Glow
  ───────────────────────────────────────────── */

  function initButtonGlow() {
    var buttons = document.querySelectorAll('.btn-primary, .btn-cta');
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      // Skip buttons already processed (guard against double-init)
      if (btn.querySelector('.glow-inner')) return;

      // Ensure the button has relative positioning and clips overflow
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';

      // Wrap existing button content in .btn-text for z-index layering
      var existingNodes = Array.prototype.slice.call(btn.childNodes);
      var textSpan = document.createElement('span');
      textSpan.className = 'btn-text';
      existingNodes.forEach(function (node) {
        textSpan.appendChild(node);
      });
      btn.appendChild(textSpan);

      // Create the glow div that follows the cursor
      var glowEl = document.createElement('div');
      glowEl.className = 'glow-inner';
      btn.appendChild(glowEl);

      // Track mouse position within the button
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        glowEl.style.left = x + 'px';
        glowEl.style.top = y + 'px';
        glowEl.style.opacity = '1';
      }, { passive: true });

      // Fade out on leave
      btn.addEventListener('mouseleave', function () {
        glowEl.style.opacity = '0';
      }, { passive: true });
    });
  }

  /* ─────────────────────────────────────────────
     Effect 2: Card Border Light (cursor-tracking overlay)
     The rotating border is pure CSS (@property + @keyframes).
     This section preserves the existing cursor-tracking radial
     overlay via data-card-glow + CSS custom properties.
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
    // Button inner glow only on fine-pointer, non-reduced-motion devices
    if (!reducedMotion && !coarsePointer) {
      initButtonGlow();
    }

    // Card cursor glow works on all pointer types (reduced motion guard is in CSS)
    initCardGlow();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
