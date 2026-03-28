/**
 * spotlight.js — OneSphere Labs
 *
 * T1: Scroll-linked word spotlight
 *     Elements marked with [data-word-spotlight] have their text split into
 *     individual <span class="word-dim"> nodes. As the element scrolls into
 *     view, words are progressively revealed by adding the class "word-lit".
 *
 * T2: Mouse radial-gradient overlay (.page-spotlight)
 *     A fixed overlay tracks the cursor via CSS custom properties on <html>
 *     and creates a subtle torch-beam effect. Skipped on coarse-pointer
 *     (touch) devices and when prefers-reduced-motion is active.
 *
 * Guards:
 *   - prefers-reduced-motion: all words fully visible; T2 not initialised.
 *   - coarse pointer: T2 not initialised.
 *   - Elements containing child element nodes (not text) are left untouched.
 *   - All event listeners use { passive: true }.
 *   - IIFE — no global variable pollution.
 */
(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     0. Capability checks
  ───────────────────────────────────────────── */
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarsePointer = window.matchMedia('(pointer: coarse)').matches;

  /* ─────────────────────────────────────────────
     T1 — Scroll-Linked Word Spotlight
  ───────────────────────────────────────────── */

  /**
   * Returns true if an element has any child *element* nodes (not just text).
   * Elements with rich child markup are skipped to avoid breaking them.
   */
  function hasChildElements(el) {
    var nodes = el.childNodes;
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].nodeType === Node.ELEMENT_NODE) {
        return true;
      }
    }
    return false;
  }

  /**
   * Splits the textContent of el into individual <span class="word-dim"> nodes,
   * preserving whitespace between words as text nodes for natural spacing.
   * Returns the array of word span elements (not whitespace nodes).
   */
  function splitIntoWordSpans(el) {
    var raw = el.textContent || '';
    // Tokenise: alternate between words and the whitespace/punctuation that
    // separates them so we can reconstruct the text faithfully.
    var tokens = raw.split(/(\s+)/);

    // Clear current content
    el.textContent = '';

    var wordSpans = [];
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (!token.length) continue;

      if (/^\s+$/.test(token)) {
        // Preserve whitespace as a bare text node
        el.appendChild(document.createTextNode(token));
      } else {
        var span = document.createElement('span');
        span.className = 'word-dim';
        span.textContent = token;
        el.appendChild(span);
        wordSpans.push(span);
      }
    }
    return wordSpans;
  }

  /**
   * Build a threshold array with numSteps evenly-spaced values from 0 to 1.
   * numSteps = 21 gives [0, 0.05, 0.10, ... 1.0].
   */
  function buildThresholds(numSteps) {
    var arr = [];
    for (var i = 0; i <= numSteps; i++) {
      arr.push(i / numSteps);
    }
    return arr;
  }

  function initWordSpotlight() {
    var targets = document.querySelectorAll('[data-word-spotlight]');
    if (!targets.length) return;

    // prefers-reduced-motion: illuminate all words immediately, skip observer
    if (reducedMotion) {
      targets.forEach(function (el) {
        if (hasChildElements(el)) return;
        var spans = splitIntoWordSpans(el);
        spans.forEach(function (s) {
          s.classList.add('word-lit');
        });
      });
      return;
    }

    // Map from element -> its word spans, maintained for observer callbacks
    var elementWordMap = new Map();

    targets.forEach(function (el) {
      // Skip elements that already contain child element nodes
      if (hasChildElements(el)) return;

      var wordSpans = splitIntoWordSpans(el);
      if (!wordSpans.length) return;

      elementWordMap.set(el, wordSpans);
    });

    if (!elementWordMap.size) return;

    var thresholds = buildThresholds(20); // 21 steps → 0, 0.05 … 1.0

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var spans = elementWordMap.get(entry.target);
        if (!spans || !spans.length) return;

        var ratio = entry.intersectionRatio;

        if (!entry.isIntersecting) {
          // Element has fully left the viewport — dim all words so the
          // animation replays when it re-enters from below.
          // But only dim if the element is BELOW the viewport (not already
          // scrolled past above) to avoid a flash on upward scroll.
          var rect = entry.boundingClientRect;
          if (rect.top > 0) {
            // Element is below viewport — reset so it replays on re-entry
            spans.forEach(function (s) {
              s.classList.remove('word-lit');
            });
          }
          // If above viewport (already read), leave words lit.
          return;
        }

        // Determine how many words to illuminate based on intersection ratio
        var total = spans.length;
        var litCount = Math.round(ratio * total);

        spans.forEach(function (s, idx) {
          if (idx < litCount) {
            s.classList.add('word-lit');
          } else {
            s.classList.remove('word-lit');
          }
        });
      });
    }, {
      threshold: thresholds,
      // No rootMargin — we want pixel-accurate intersection relative to viewport
      rootMargin: '0px'
    });

    elementWordMap.forEach(function (_, el) {
      observer.observe(el);
    });
  }

  /* ─────────────────────────────────────────────
     T2 — Mouse Radial Gradient Overlay
  ───────────────────────────────────────────── */

  function initPageSpotlight() {
    // Skip entirely on touch devices or reduced-motion preference
    if (coarsePointer || reducedMotion) return;

    var overlay = document.createElement('div');
    overlay.className = 'page-spotlight';
    document.body.appendChild(overlay);

    var htmlEl = document.documentElement;
    var activated = false;

    // Detect whether we are on the homepage by checking for the hero canvas
    // element, which is unique to index.html.
    var heroCanvas = document.getElementById('heroCanvas');
    var heroEl = heroCanvas ? heroCanvas.closest('.hero') : null;

    function getHeroRect() {
      return heroEl ? heroEl.getBoundingClientRect() : null;
    }

    function isCursorInHeroZone(x, y) {
      if (!heroEl) return false;
      var rect = getHeroRect();
      return (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      );
    }

    window.addEventListener('mousemove', function (e) {
      var x = e.clientX;
      var y = e.clientY;

      // Persist cursor position as CSS custom properties on <html> so the
      // CSS gradient can reference them via var(--mouse-x) / var(--mouse-y).
      htmlEl.style.setProperty('--mouse-x', x + 'px');
      htmlEl.style.setProperty('--mouse-y', y + 'px');

      // Reveal overlay after first mousemove (it starts hidden via CSS)
      if (!activated) {
        activated = true;
        overlay.classList.add('is-active');
      }

      // On homepage: hide overlay while cursor is inside the hero zone so the
      // canvas hero effect is not washed out by the page-level spotlight.
      if (isCursorInHeroZone(x, y)) {
        overlay.classList.remove('is-active');
      } else if (activated) {
        overlay.classList.add('is-active');
      }
    }, { passive: true });
  }

  /* ─────────────────────────────────────────────
     Bootstrap — wait for DOM
  ───────────────────────────────────────────── */
  function init() {
    initWordSpotlight();
    initPageSpotlight();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already parsed (script loaded with defer or placed before </body>)
    init();
  }

})();
