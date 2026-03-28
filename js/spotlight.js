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

  function initWordSpotlight() {
    var targets = document.querySelectorAll('[data-word-spotlight]');
    if (!targets.length) return;

    // prefers-reduced-motion: illuminate all words immediately, skip scroll
    if (reducedMotion) {
      targets.forEach(function (el) {
        if (hasChildElements(el)) return;
        var spans = splitIntoWordSpans(el);
        spans.forEach(function (s) {
          s.style.opacity = '1';
        });
      });
      return;
    }

    // Map from element -> its word spans
    var elementWordMap = [];

    targets.forEach(function (el) {
      // Skip elements that already contain child element nodes
      if (hasChildElements(el)) return;

      var wordSpans = splitIntoWordSpans(el);
      if (!wordSpans.length) return;

      elementWordMap.push({ el: el, spans: wordSpans });
    });

    if (!elementWordMap.length) return;

    function updateSpotlight() {
      var vh = window.innerHeight;

      for (var i = 0; i < elementWordMap.length; i++) {
        var entry = elementWordMap[i];
        var el = entry.el;
        var spans = entry.spans;
        var rect = el.getBoundingClientRect();
        var total = spans.length;

        // Progress calculation:
        //   Start (0): element top enters viewport bottom (rect.top = vh)
        //   End   (1): element top reaches 20% from viewport top (rect.top = vh * 0.2)
        // This spreads the sweep across 80% of the viewport height,
        // giving a slow, cinematic progression regardless of element size.
        var startTrigger = vh;
        var endTrigger = vh * 0.2;
        var scrollProgress = Math.min(1, Math.max(0,
          (startTrigger - rect.top) / (startTrigger - endTrigger)
        ));

        for (var j = 0; j < total; j++) {
          // Each word has its own activation point in the scroll timeline
          var wordProgress = j / total;
          var diff = scrollProgress - wordProgress;

          if (diff > 0.02) {
            // Fully lit — past the activation point
            spans[j].style.opacity = '1';
          } else if (diff > -0.01) {
            // Smooth transition zone — interpolate between dim and lit
            var t = (diff + 0.01) / 0.03;
            spans[j].style.opacity = String(0.25 + 0.75 * t);
          } else {
            // Not yet reached — dim
            spans[j].style.opacity = '0.25';
          }
        }
      }

      requestAnimationFrame(updateSpotlight);
    }

    requestAnimationFrame(updateSpotlight);
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

      // Directly update the overlay's background with a full gradient string.
      // This avoids CSS custom property resolution issues on the deployed site
      // where --mouse-x / --mouse-y on <html> may not cascade to the overlay.
      overlay.style.background =
        'radial-gradient(600px circle at ' + x + 'px ' + y + 'px, rgba(61, 126, 255, 0.08), transparent 40%)';

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
