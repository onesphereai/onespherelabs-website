# OneSphere Labs Website Redesign — Ticket Specifications
## Part 3: Sprint 2 — Design Foundation (WEB-13, WEB-14)

---

## WEB-13 — Implement New Design System (Colors, Typography, CSS Variables)

### Technical Specification

**Files to create:**
- `/css/tokens.css` — CSS custom properties only
- `/css/base.css` — Reset, typography rules, utility classes, animation base

**Files to modify:**
- `/index.html` — Replace current font link; add new CSS `<link>` tags
- `/styles.css` — Strip old `:root` variables; add `@import` for tokens (or replace with base.css in WEB-14)

---

### File: `/css/tokens.css` — Complete Content

```css
/* =============================================================
   OneSphere Labs Design Tokens
   Single source of truth for all design system values.
   All other CSS files consume these variables.
   ============================================================= */

:root {
  /* === COLOR PALETTE === */
  --color-primary:          #2563EB;
  --color-primary-hover:    #1D4ED8;
  --color-secondary:        #3B82F6;
  --color-cta:              #F97316;
  --color-cta-hover:        #EA580C;

  --color-bg:               #F8FAFC;
  --color-bg-alt:           #F1F5F9;
  --color-card-bg:          #FFFFFF;
  --color-border:           #E2E8F0;

  --color-text-primary:     #1E293B;
  --color-text-secondary:   #64748B;

  --color-destructive:      #DC2626;
  --color-ring:             #2563EB;
  --color-success:          #059669;

  /* === TYPOGRAPHY === */
  --font-heading:           'Archivo', sans-serif;
  --font-body:              'Space Grotesk', sans-serif;

  --text-xs:                0.875rem;   /* 14px */
  --text-sm:                1rem;       /* 16px */
  --text-md:                1.125rem;   /* 18px */
  --text-lg:                1.5rem;     /* 24px */
  --text-xl:                2rem;       /* 32px */
  --text-2xl:               3rem;       /* 48px */
  --text-3xl:               4rem;       /* 64px */

  --line-height-body:       1.6;
  --line-height-heading:    1.2;

  --font-weight-light:      300;
  --font-weight-regular:    400;
  --font-weight-medium:     500;
  --font-weight-semibold:   600;
  --font-weight-bold:       700;

  /* === SPACING (8px base grid) === */
  --space-1:    0.25rem;   /*  4px */
  --space-2:    0.5rem;    /*  8px */
  --space-3:    0.75rem;   /* 12px */
  --space-4:    1rem;      /* 16px */
  --space-6:    1.5rem;    /* 24px */
  --space-8:    2rem;      /* 32px */
  --space-12:   3rem;      /* 48px */
  --space-16:   4rem;      /* 64px */
  --space-24:   6rem;      /* 96px */

  /* === LAYOUT === */
  --content-max-width:    1200px;
  --grid-gap-desktop:     1.5rem;  /* 24px */
  --grid-gap-mobile:      1rem;    /* 16px */

  /* === RADII === */
  --radius-sm:    0.5rem;   /*  8px */
  --radius-md:    0.75rem;  /* 12px */
  --radius-lg:    1rem;     /* 16px */
  --radius-full:  9999px;

  /* === SHADOWS === */
  --shadow-sm:    0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08);
  --shadow-md:    0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.08);
  --shadow-lg:    0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08);
  --shadow-hover: 0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.10);

  /* === TRANSITIONS === */
  --transition-fast:    150ms ease-out;
  --transition-base:    200ms ease-out;
  --transition-slow:    300ms ease-out;

  /* === Z-INDEX SCALE === */
  --z-base:       0;
  --z-raised:     10;
  --z-dropdown:   100;
  --z-sticky:     200;
  --z-overlay:    300;
  --z-modal:      400;
  --z-toast:      500;

  /* === BREAKPOINTS (reference only — use in media queries directly) === */
  /* mobile:  375px  */
  /* tablet:  768px  */
  /* desktop: 1024px */
  /* wide:    1440px */
}
```

---

### File: `/css/base.css` — Complete Content

```css
/* =============================================================
   OneSphere Labs Base Styles
   Depends on: tokens.css
   ============================================================= */

/* --- RESET --- */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

body {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  line-height: var(--line-height-body);
  color: var(--color-text-primary);
  background-color: var(--color-bg);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img, video, svg {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

ul, ol {
  list-style: none;
}

button {
  cursor: pointer;
  font-family: inherit;
  border: none;
  background: none;
}

/* --- SKIP LINK (accessibility) --- */
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--space-4);
  z-index: var(--z-toast);
  padding: var(--space-2) var(--space-4);
  background: var(--color-primary);
  color: #fff;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-sm);
  transition: top var(--transition-fast);
}

.skip-link:focus {
  top: var(--space-4);
}

/* --- CONTAINER --- */
.container {
  width: 100%;
  max-width: var(--content-max-width);
  margin-inline: auto;
  padding-inline: var(--space-6);
}

@media (max-width: 768px) {
  .container {
    padding-inline: var(--space-4);
  }
}

/* --- TYPOGRAPHY --- */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  line-height: var(--line-height-heading);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-bold);
}

h1 { font-size: var(--text-3xl); }
h2 { font-size: var(--text-2xl); }
h3 { font-size: var(--text-xl); }
h4 { font-size: var(--text-lg); }
h5 { font-size: var(--text-md); }
h6 { font-size: var(--text-sm); }

@media (max-width: 768px) {
  h1 { font-size: var(--text-2xl); }
  h2 { font-size: var(--text-xl); }
  h3 { font-size: var(--text-lg); }
}

@media (max-width: 375px) {
  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
}

p {
  font-family: var(--font-body);
  color: var(--color-text-secondary);
  line-height: var(--line-height-body);
}

/* --- SECTION HEADER (shared pattern) --- */
.section-header {
  text-align: center;
  margin-bottom: var(--space-16);
}

.section-header h2 {
  margin-bottom: var(--space-4);
}

.section-header p {
  font-size: var(--text-md);
  max-width: 600px;
  margin-inline: auto;
}

/* --- BUTTONS --- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-semibold);
  line-height: 1;
  border-radius: var(--radius-md);
  transition: background-color var(--transition-base),
              color var(--transition-base),
              box-shadow var(--transition-base),
              border-color var(--transition-base);
  min-height: 44px;  /* touch target */
  min-width: 44px;   /* touch target */
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
}

.btn:focus-visible {
  outline: 3px solid var(--color-ring);
  outline-offset: 2px;
}

/* Primary */
.btn-primary {
  background-color: var(--color-primary);
  color: #ffffff;
  border: 2px solid transparent;
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
  box-shadow: var(--shadow-md);
}

.btn-primary:active {
  background-color: #1E40AF;
  transform: translateY(1px);
}

/* Secondary / Outline */
.btn-secondary {
  background-color: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.btn-secondary:hover {
  background-color: var(--color-primary);
  color: #ffffff;
}

/* CTA (orange) */
.btn-cta {
  background-color: var(--color-cta);
  color: #ffffff;
  border: 2px solid transparent;
}

.btn-cta:hover {
  background-color: var(--color-cta-hover);
  box-shadow: var(--shadow-md);
}

@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }
  .btn:active {
    transform: none;
  }
}

/* --- SCROLL ANIMATION UTILITIES --- */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity var(--transition-slow), transform var(--transition-slow);
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* Stagger delays for grid children */
.stagger-children > *:nth-child(1) { transition-delay:   0ms; }
.stagger-children > *:nth-child(2) { transition-delay:  50ms; }
.stagger-children > *:nth-child(3) { transition-delay: 100ms; }
.stagger-children > *:nth-child(4) { transition-delay: 150ms; }
.stagger-children > *:nth-child(5) { transition-delay: 200ms; }
.stagger-children > *:nth-child(6) { transition-delay: 250ms; }
.stagger-children > *:nth-child(7) { transition-delay: 300ms; }
.stagger-children > *:nth-child(8) { transition-delay: 350ms; }

@media (prefers-reduced-motion: reduce) {
  .stagger-children > * {
    transition-delay: 0ms !important;
  }
}

/* --- FOCUS RING (global visible focus) --- */
:focus-visible {
  outline: 3px solid var(--color-ring);
  outline-offset: 2px;
  border-radius: 2px;
}

/* --- UTILITY CLASSES --- */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.text-center { text-align: center; }
.text-left   { text-align: left; }

.mt-auto { margin-top: auto; }

.gradient-text {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

### Updating `/index.html` `<head>` for new fonts

**Remove:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

**Add (replace with):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

**Add CSS links before `styles.css`:**
```html
<link rel="stylesheet" href="/css/tokens.css">
<link rel="stylesheet" href="/css/base.css">
<link rel="stylesheet" href="/styles.css">
```

**Note:** In this sprint, `styles.css` is kept as-is (it will be refactored in WEB-14). The new tokens file is additive. No visual regression should occur from adding the token file alone, but the font will visually change from Inter to Space Grotesk/Archivo.

### UI/UX Specification

- No layout changes in this ticket — purely additive CSS variable layer
- Font change from Inter to Archivo/Space Grotesk is intentional and expected
- Body text: Space Grotesk Regular (400), 16px, line-height 1.6
- Headings: Archivo Bold (700), responsive scale as per tokens

### Acceptance Criteria

- [ ] `/css/tokens.css` exists and contains all 40+ custom properties
- [ ] `/css/base.css` exists with reset, typography, button, animation utilities
- [ ] Google Fonts: Archivo and Space Grotesk load on all pages (verify in Network tab)
- [ ] Inter font CDN link is removed
- [ ] CSS custom properties resolve correctly in browser DevTools (inspect `:root`)
- [ ] No visual regressions to layout (compare screenshots before/after)
- [ ] W3C CSS Validator passes on both new files

### Dependencies

- **Blocked by:** WEB-8 (CSS must be error-free before adding new layer)
- **Unblocks:** WEB-14, WEB-15, WEB-16, and all subsequent tickets

---

## WEB-14 — Create Multi-Page Site Structure and Split CSS

### Technical Specification

**Folders to create:**
```
/
├── css/
│   ├── tokens.css          (created in WEB-13)
│   ├── base.css            (created in WEB-13)
│   ├── nav.css             (created in WEB-15)
│   ├── footer.css          (created in WEB-16)
│   ├── home.css            (homepage-specific styles)
│   └── product-page.css    (shared product page styles, WEB-20)
├── js/
│   ├── nav.js              (navigation JS, WEB-15)
│   ├── animations.js       (Intersection Observer, this ticket)
│   └── main.js             (page-specific JS, refactored from script.js)
├── products/
│   ├── maeda-health/
│   │   └── index.html      (stub, content in WEB-21)
│   ├── vigility/
│   │   └── index.html      (stub, content in WEB-22)
│   ├── attune/
│   │   └── index.html      (stub, content in WEB-23)
│   └── petsense/
│       └── index.html      (stub, content in WEB-24)
├── about/
│   └── index.html          (stub, content in WEB-25)
├── contact/
│   └── index.html          (stub, content in WEB-26)
├── index.html              (homepage — existing, refactored)
├── styles.css              (legacy — kept for Sprint 1, deprecated after WEB-14)
├── script.js               (legacy — refactored into js/ folder in this ticket)
├── sitemap.xml
└── robots.txt
```

---

### Stub Page Template

Every stub `index.html` file (products/maeda-health/index.html, etc.) must follow this exact template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Product Name] — OneSphere Labs</title>
  <meta name="description" content="[Product description — to be filled in product-specific ticket]">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/tokens.css">
  <link rel="stylesheet" href="/css/base.css">
  <link rel="stylesheet" href="/css/nav.css">
  <link rel="stylesheet" href="/css/footer.css">
  <link rel="stylesheet" href="/css/product-page.css">
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <!-- nav.html include handled by JS in WEB-15 -->
  <div id="nav-placeholder"></div>

  <main id="main-content">
    <!-- Content added in WEB-21 through WEB-24 -->
    <section style="min-height: 100vh; display: flex; align-items: center; justify-content: center;">
      <p style="font-family: var(--font-body); color: var(--color-text-secondary);">
        Page coming soon — <a href="/" style="color: var(--color-primary);">Back to home</a>
      </p>
    </section>
  </main>

  <!-- footer.html include handled by JS in WEB-16 -->
  <div id="footer-placeholder"></div>

  <script src="/js/nav.js" defer></script>
</body>
</html>
```

**Stub titles per page:**
- `products/maeda-health/index.html` → `Maeda Health — AI Clinical Assistant — OneSphere Labs`
- `products/vigility/index.html` → `Vigility — Compliance Automation — OneSphere Labs`
- `products/attune/index.html` → `Attune — AI Parenting Coach — OneSphere Labs`
- `products/petsense/index.html` → `Petsense — AI Pet Behaviour Analysis — OneSphere Labs`
- `about/index.html` → `About Us — OneSphere Labs`
- `contact/index.html` → `Contact — OneSphere Labs`

---

### File: `/js/animations.js`

This file provides the shared Intersection Observer utility used by all pages for scroll-reveal animations.

```javascript
/**
 * animations.js
 * Scroll-reveal via Intersection Observer.
 * Respects prefers-reduced-motion.
 * Usage: add class "animate-on-scroll" to any element.
 * Add "stagger-children" to parent to enable 50ms stagger on children.
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    // Make all animated elements visible immediately
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',  // trigger 60px before entering viewport
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // animate once only
      }
    });
  }, observerOptions);

  // Observe all current and future animate-on-scroll elements
  function observeElements() {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeElements);
  } else {
    observeElements();
  }
})();
```

**Add to all pages' `<head>` (before closing `</body>`):**
```html
<script src="/js/animations.js" defer></script>
```

---

### Refactoring `script.js` → `js/main.js`

Move the following functionality from `script.js` into `js/main.js`:
- Google Analytics event tracking function
- Contact form submission handler
- Form validation function
- Notification system
- Navbar scroll background change

Remove from `js/main.js`:
- All demo modal JS (the old Smart Med Notes demo is gone after WEB-11/WEB-12)
- All early access form JS (moved to contact page in WEB-26)

Keep `script.js` at root **only during Sprint 1** for backwards compatibility. After WEB-14 is complete, `index.html` must reference `js/main.js` instead of `script.js`. The legacy `script.js` can remain as a redirect/empty file or be deleted.

### Acceptance Criteria

- [ ] All 6 directories created: `css/`, `js/`, `products/maeda-health/`, `products/vigility/`, `products/attune/`, `products/petsense/`, `about/`, `contact/`
- [ ] All stub pages return HTTP 200 with valid HTML
- [ ] Stub pages display "Page coming soon" placeholder with working "Back to home" link
- [ ] `/js/animations.js` exists and Intersection Observer runs on homepage
- [ ] `.animate-on-scroll` elements become visible when scrolled into view
- [ ] `prefers-reduced-motion: reduce` makes all elements visible immediately (test in DevTools)
- [ ] No 404 errors in browser console on any stub page

### Dependencies

- **Blocked by:** WEB-13 (tokens and base CSS must exist before stubs link to them)
- **Unblocks:** WEB-15, WEB-16, WEB-17, WEB-20, WEB-25, WEB-26
