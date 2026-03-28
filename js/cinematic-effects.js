/**
 * cinematic-effects.js — OneSphere Labs
 *
 * Three cinematic effects for the redesigned product pages:
 *
 * 1. Scroll-Linked Word Spotlight (Narrative)
 *    Splits .narrative__text into word spans. As the user scrolls,
 *    words progressively light up via the .lit class.
 *
 * 2. Mouse-Tracking Card Glow (Bento Grid)
 *    A radial gradient follows the cursor inside bento cards via
 *    the .bento-card__glow overlay element.
 *
 * 3. Scroll-triggered .animate-in elements
 *    IntersectionObserver adds .visible to .animate-in elements.
 *
 * Guards:
 *   - prefers-reduced-motion: words fully visible, no scroll tracking.
 *   - coarse pointer: card glow not initialised.
 *   - All event listeners use { passive: true }.
 *   - IIFE — no global variable pollution.
 */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarsePointer = window.matchMedia('(pointer: coarse)').matches;

  /* ─────────────────────────────────────────────
     1. Scroll-Linked Word Spotlight
  ───────────────────────────────────────────── */

  function initNarrativeSpotlight() {
    var spotlightEl = document.getElementById('spotlight-text');
    if (!spotlightEl) return;

    var text = spotlightEl.textContent.trim();
    var words = text.split(/\s+/);
    spotlightEl.innerHTML = words.map(function (w) {
      return '<span class="word">' + w + '</span>';
    }).join('');

    var wordSpans = spotlightEl.querySelectorAll('.word');

    if (reducedMotion) {
      // Show all words immediately
      wordSpans.forEach(function (span) {
        span.classList.add('lit');
      });
      return;
    }

    function updateSpotlight() {
      var rect = spotlightEl.getBoundingClientRect();
      var viewH = window.innerHeight;
      var start = viewH * 0.8;
      var end = -rect.height * 0.2;
      var progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      var activeIndex = Math.floor(progress * wordSpans.length);

      for (var i = 0; i < wordSpans.length; i++) {
        if (i <= activeIndex) {
          wordSpans[i].classList.add('lit');
        } else {
          wordSpans[i].classList.remove('lit');
        }
      }
    }

    window.addEventListener('scroll', updateSpotlight, { passive: true });
    updateSpotlight();
  }

  /* ─────────────────────────────────────────────
     2. Mouse-Tracking Bento Card Glow
  ───────────────────────────────────────────── */

  function initBentoCardGlow() {
    if (coarsePointer || reducedMotion) return;

    var bentoGrid = document.getElementById('bento-grid');
    if (!bentoGrid) return;

    // Read the accent card glow color from the CSS variable
    var computedStyle = getComputedStyle(document.body);
    var glowColor = computedStyle.getPropertyValue('--accent-card-glow').trim();
    if (!glowColor) glowColor = 'rgba(99, 102, 241, 0.08)';

    bentoGrid.addEventListener('mousemove', function (e) {
      var cards = bentoGrid.querySelectorAll('.bento-card');
      for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var glow = card.querySelector('.bento-card__glow');
        if (glow) {
          glow.style.background =
            'radial-gradient(400px circle at ' + x + 'px ' + y + 'px, ' +
            glowColor + ', transparent 60%)';
        }
      }
    }, { passive: true });
  }

  /* ─────────────────────────────────────────────
     3. Scroll-triggered .animate-in
  ───────────────────────────────────────────── */

  function initAnimateIn() {
    var elements = document.querySelectorAll('.animate-in');
    if (!elements.length) return;

    if (reducedMotion) {
      elements.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ─────────────────────────────────────────────
     Bootstrap
  ───────────────────────────────────────────── */

  function init() {
    initNarrativeSpotlight();
    initBentoCardGlow();
    initAnimateIn();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
