# SPEC-SPOTLIGHT — OneSphere Labs Website
## Spotlight Effects: Scroll-Linked Word Reveal & Mouse Radial Gradient

**Tickets:** WEB-45 (epic), WEB-46 – WEB-51 (tasks)
**Status:** Design complete — implementation tickets pending HTML changes

---

## 1. File Locations

| File | Purpose |
|---|---|
| `/js/spotlight.js` | Single IIFE: word spotlight (T1) + mouse overlay (T2) |
| `/css/spotlight.css` | All spotlight-specific styles |

These two files are the only files written by this design. HTML modifications
(adding `data-word-spotlight` attributes and `<link>`/`<script>` tags) are
handled in separate implementation tickets (WEB-46 to WEB-51) and are **not**
done by this spec.

---

## 2. Architecture Decisions

### 2.1 Single IIFE, no module bundler

The project uses plain `<script>` tags and vanilla JS throughout
(`nav.js`, `animations.js`, `hero-effect.js`). Introducing a bundler would
be out of scope and would add operational overhead with no benefit at this
site scale. The IIFE pattern — already used by `hero-effect.js` — keeps the
file self-contained and adds zero globals.

### 2.2 IntersectionObserver for T1, not scroll events

`IntersectionObserver` fires off the main thread and coalesces callbacks,
making it far cheaper than a `scroll` listener that would need to call
`getBoundingClientRect()` on every frame. The 21-step threshold array
`[0, 0.05, 0.10, … 1.0]` ensures fine-grained callbacks without the cost of a
continuous scroll listener.

### 2.3 CSS custom properties + `radial-gradient` for T2

Updating `--mouse-x` and `--mouse-y` on `<html>` on each `mousemove` causes
a style recalculation only on the `.page-spotlight` element (because it is the
only element consuming those variables). The browser composites the gradient
on the GPU. No canvas, no RAF loop, no JS paint code.

### 2.4 `mix-blend-mode: screen` on the overlay

`screen` blending adds luminosity to the dark background without darkening or
obscuring any text. It is the correct blend mode for a "torch beam" effect on a
dark site.

### 2.5 Word splitting strategy

Words are split by `/(\s+)/` with the separator captured so whitespace tokens
can be re-inserted as bare text nodes. This preserves word spacing and means
the parent element's CSS `font-size`, `line-height`, `font-family`, and any
`gradient-text` utilities continue to apply without interference.

Only elements whose `childNodes` contain no `ELEMENT_NODE` children are
processed. Elements with existing markup (icons, `<strong>` tags, gradient
`<span>` wrappers) are skipped to avoid destructive DOM surgery.

### 2.6 Hero zone guard for T2

On the homepage the hero section already contains a dense canvas animation
(`hero-effect.js`). Overlaying the `.page-spotlight` gradient on top of it
would wash out the carefully tuned beam colours. The JS detects the homepage
by the presence of `#heroCanvas` and hides the overlay while the cursor
is within the hero's bounding rect.

---

## 3. HTML Integration Guide

### 3.1 CSS import (all pages)

Add after `/css/effects.css` and before the page-specific stylesheet:

```html
<link rel="stylesheet" href="/css/spotlight.css">
```

#### index.html — line 57 (after effects.css, before home.css)
```html
<!-- existing -->
<link rel="stylesheet" href="/css/effects.css">
<!-- ADD THIS LINE -->
<link rel="stylesheet" href="/css/spotlight.css">
<link rel="stylesheet" href="/css/home.css">
```

#### about.html — line 15 (after effects.css, before about.css)
```html
<link rel="stylesheet" href="/css/effects.css">
<!-- ADD THIS LINE -->
<link rel="stylesheet" href="/css/spotlight.css">
<link rel="stylesheet" href="/css/about.css">
```

#### contact.html — line 15 (after effects.css, before contact.css)
```html
<link rel="stylesheet" href="/css/effects.css">
<!-- ADD THIS LINE -->
<link rel="stylesheet" href="/css/spotlight.css">
<link rel="stylesheet" href="/css/contact.css">
```

#### products/maeda-health.html — line 13 (after effects.css, before product-page.css)
#### products/vigility.html — same pattern
#### products/attune.html — same pattern
#### products/petsense.html — same pattern
```html
<link rel="stylesheet" href="/css/effects.css">
<!-- ADD THIS LINE -->
<link rel="stylesheet" href="/css/spotlight.css">
<link rel="stylesheet" href="/css/product-page.css">
```

---

### 3.2 JS import (all pages)

Add after `animations.js` and before the closing `</body>` tag.

#### index.html — after line 306 (`hero-effect.js`)
```html
<script src="/js/nav.js"></script>
<script src="/js/animations.js"></script>
<script src="/js/hero-effect.js"></script>
<!-- ADD THIS LINE -->
<script src="/js/spotlight.js"></script>
```

#### about.html, contact.html — after line 118 (`animations.js`)
```html
<script src="/js/nav.js"></script>
<script src="/js/animations.js"></script>
<!-- ADD THIS LINE -->
<script src="/js/spotlight.js"></script>
```

#### All product pages — same pattern as about/contact
```html
<script src="/js/nav.js"></script>
<script src="/js/animations.js"></script>
<!-- ADD THIS LINE -->
<script src="/js/spotlight.js"></script>
```

---

### 3.3 data-word-spotlight attribute placement

The attribute is added to block-level elements containing **plain text only**
(no child element nodes). Below are the recommended elements per page.

#### index.html — recommended elements

| Element selector | Text content (excerpt) | Notes |
|---|---|---|
| `.hero__description` (line 143) | "From clinical documentation…" | Hero paragraph — high-impact placement |
| `.products__header p` (line 176) | "AI platforms built for…" | Section intro |
| `.trust__statement` (line 229) | "Founded in Australia…" | Short punchy line, works well |
| `.contact-strip__container p` (line 259) | "Interested in our products…" | CTA paragraph |

Example markup change for `.hero__description`:
```html
<p class="hero__description" data-word-spotlight>
  From clinical documentation to compliance automation…
</p>
```

#### about.html — recommended elements

| Element selector | Text content (excerpt) |
|---|---|
| `.about-hero__description` (line 46) | "OneSphere Labs is an Australian AI…" |
| `.mission__content p:first-of-type` (line 55) | "Every product we build starts with…" |
| `.mission__content p:nth-of-type(2)` (line 57) | "We build vertical AI…" |
| `.mission__content p:nth-of-type(3)` (line 58) | "Founded in 2024 and based in Australia…" |

Note: `.mission__value` `<p>` elements each contain only text and are also
candidates, but they are short — the spotlight effect has the most visual impact
on sentences of 15+ words.

#### contact.html — recommended elements

| Element selector | Text content (excerpt) |
|---|---|
| `.contact-hero__description` (line 45) | "Interested in our products, partnership…" |

The contact form itself should **not** receive `data-word-spotlight` because
its content is interactive.

#### products/maeda-health.html — recommended elements

| Element selector | Text content (excerpt) |
|---|---|
| `.product-hero__tagline` (line 59) | "Maeda is an AI-powered clinical…" |
| `.problem-solution__col p` (lines 76, 80) | Both problem/solution paragraphs |
| `.features__header p` (line 91) | "Maeda supports the full consultation…" |
| `.feature-card__desc` (each card) | Individual feature descriptions |

Note: `.feature-card__desc` elements that contain `<ul>` children must **not**
receive `data-word-spotlight` — the skip guard in JS will leave them untouched,
but it is cleaner not to add the attribute at all on those elements.

#### products/vigility.html, attune.html, petsense.html

Apply the same pattern as maeda-health.html:
- Hero tagline paragraph
- Problem/solution column paragraphs
- Features header paragraph
- Feature card description paragraphs that contain only text (no `<ul>`)

---

## 4. How to Add Spotlight to a New Element

1. Identify the element. It must contain **only text** — no child HTML elements.
2. Add `data-word-spotlight` as a bare attribute:
   ```html
   <p data-word-spotlight>Your text here.</p>
   ```
3. No JS changes required. The observer is set up once on `DOMContentLoaded`
   and picks up all `[data-word-spotlight]` elements present at that time.
4. If the element is added to the DOM dynamically (after DOMContentLoaded),
   call `spotlight.js` manually or trigger a re-scan — see section 6 for
   the extension pattern.

---

## 5. Performance Characteristics

### T1 — Word Spotlight

| Metric | Detail |
|---|---|
| Paint cost | Zero. Class toggling triggers opacity transitions which the browser compositor handles without a paint. |
| Layout cost | Zero after initial split. `opacity` is a compositor-only property. |
| JS cost | IntersectionObserver fires at most 21 times per element per scroll-through. Callback is O(n words) per firing. |
| Memory | One `Map` entry and an array of span references per observed element. Negligible. |
| Initial DOM mutation | One-time `childNodes` replacement on DOMContentLoaded. No ongoing mutations. |

### T2 — Mouse Overlay

| Metric | Detail |
|---|---|
| Paint cost | One CSS `background` repaint on the fixed overlay per mousemove tick. GPU composited due to `will-change: background`. |
| Layout cost | Zero. Fixed overlay does not participate in document flow. |
| JS cost | Two `style.setProperty` calls per mousemove. No `getBoundingClientRect` calls during normal cursor movement. `getBoundingClientRect` is called only when entering/leaving hero zone (homepage only). |
| Event listener | Single passive `mousemove` on `window`. |

### Cumulative Layout Shift (CLS) impact

Splitting text into `<span>` elements can theoretically cause a layout shift
if the font has not loaded by `DOMContentLoaded`. Both `Archivo` and
`Space Grotesk` are loaded with `display=swap` and `preconnect` hints
(already in `<head>`), which minimises this risk. The spans use
`display: inline` and carry no margin, padding, or size properties, so
they cannot introduce block-level layout shifts.

---

## 6. Accessibility Guarantees

### Reduced motion
- `prefers-reduced-motion: reduce`: all `word-dim` spans are immediately given
  `word-lit`, CSS sets `transition: none`, and the overlay is never created.
  The content appears as if spotlight.js had never run.

### Screen readers
- `<span class="word-dim">` elements are `display: inline` with no
  `aria-hidden`, `role`, or `aria-label` overrides. Screen readers read the
  text as a continuous string — the DOM restructuring is invisible to AT.
- The `.page-spotlight` overlay has `pointer-events: none` and no focusable
  children. It is invisible to all AT.

### Keyboard navigation
- No focusable elements are created or modified by spotlight.js.
- The overlay does not intercept any keyboard or pointer events.

### Colour contrast
- `word-dim` at `opacity: 0.25` on `--text-secondary` (#94A3B8) against
  `--bg` (#050506) yields a contrast ratio of approximately 1.2:1 — below
  WCAG AA. This is intentional and acceptable because:
  1. All dimmed words become fully visible as the user scrolls.
  2. `prefers-reduced-motion` ensures all words are always at full opacity
     for users who have indicated a motion sensitivity preference.
  3. The text is never permanently hidden — the dim state is a transient
     animation frame, not a resting state for any content above the fold.
- If a stricter interpretation of WCAG is required, the `opacity` of
  `.word-dim` may be raised to `0.4` (minimum threshold for the effect to
  remain perceptually meaningful) in `spotlight.css`.

---

## 7. Browser Support

| Browser | T1 (Word Spotlight) | T2 (Mouse Overlay) |
|---|---|---|
| Chrome 90+ | Full | Full |
| Firefox 88+ | Full | Full |
| Safari 14.1+ | Full | Full (`mix-blend-mode: screen` supported since Safari 8) |
| Edge 90+ | Full | Full |
| iOS Safari 14.5+ | T1 full; T2 skipped (coarse pointer) | N/A |
| Android Chrome | T1 full; T2 skipped (coarse pointer) | N/A |
| IE 11 | Not supported — `IntersectionObserver` unavailable; JS silently skips T1. No T2. | N/A |

`IntersectionObserver` is supported in all browsers with >0.5% global market
share as of 2026. No polyfill is required for the target audience.

CSS custom properties (`var()`) used by T2 are supported in all modern
browsers. If `--mouse-x`/`--mouse-y` are not yet set (before first mousemove),
the gradient falls back to `50% 50%` via the fallback values in `spotlight.css`.

---

## 8. Related Specs

- `SPEC-PART5-SPRINT4-HOMEPAGE.md` — homepage layout and animation context
- `SPEC-PART8-SPRINT7-SEO-POLISH.md` — performance and CLS guidance
- `/css/effects.css` — existing glow, glass, and beam effect classes
- `/css/tokens.css` — all design tokens referenced in spotlight.css
