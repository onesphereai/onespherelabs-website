# OneSphere Labs Website Redesign — Ticket Specifications
## Part 4: Sprint 3 — Shared Components (WEB-15, WEB-16)

---

## WEB-15 — Build Shared Navigation with Products Dropdown

### Technical Specification

**Files to create:**
- `/css/nav.css`
- `/js/nav.js`
- `/components/nav.html` (partial — loaded via JS fetch)

**Files to modify:**
- `/index.html` — replace existing `<nav>` with nav placeholder + script
- All stub pages from WEB-14 already have `<div id="nav-placeholder"></div>`

---

### Strategy: HTML Fetch Injection

Navigation HTML lives in `/components/nav.html` and is injected into every page via `js/nav.js`. This avoids duplication across 7+ pages without requiring a build system.

```javascript
// js/nav.js — full content

(function () {
  'use strict';

  const NAV_PATH = '/components/nav.html';

  async function loadNav() {
    const placeholder = document.getElementById('nav-placeholder');
    if (!placeholder) return;

    try {
      const res = await fetch(NAV_PATH);
      if (!res.ok) throw new Error('Nav fetch failed');
      const html = await res.text();
      placeholder.outerHTML = html;
      initNav();
    } catch (e) {
      console.error('Navigation failed to load:', e);
    }
  }

  function initNav() {
    const nav       = document.querySelector('.site-nav');
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileMenu = document.querySelector('.nav-mobile-menu');
    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
    const dropdown  = document.querySelector('.nav-dropdown');

    if (!nav) return;

    // ── Hamburger (mobile menu) ─────────────────────────────
    hamburger?.addEventListener('click', () => {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu?.classList.toggle('is-open');
      hamburger.querySelector('.bar-top')?.classList.toggle('rotate-down');
      hamburger.querySelector('.bar-mid')?.classList.toggle('hidden');
      hamburger.querySelector('.bar-bot')?.classList.toggle('rotate-up');
    });

    // Close mobile menu on link click
    mobileMenu?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    function closeMobileMenu() {
      hamburger?.setAttribute('aria-expanded', 'false');
      mobileMenu?.classList.remove('is-open');
    }

    // ── Products dropdown (desktop) ─────────────────────────
    // Keyboard: Enter/Space to open, Escape to close
    dropdownToggle?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleDropdown();
      }
      if (e.key === 'Escape') closeDropdown();
    });

    // Click toggle for touch devices
    dropdownToggle?.addEventListener('click', toggleDropdown);

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-dropdown-wrap')) closeDropdown();
    });

    // Close on Escape anywhere
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDropdown();
    });

    function toggleDropdown() {
      const isOpen = dropdown?.classList.contains('is-open');
      isOpen ? closeDropdown() : openDropdown();
    }

    function openDropdown() {
      dropdown?.classList.add('is-open');
      dropdownToggle?.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
      dropdown?.classList.remove('is-open');
      dropdownToggle?.setAttribute('aria-expanded', 'false');
    }

    // ── Sticky nav shadow on scroll ─────────────────────────
    const scrollHandler = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });
    scrollHandler(); // run once on load

    // ── Active link highlighting ────────────────────────────
    const currentPath = window.location.pathname;
    nav.querySelectorAll('.nav-link[href]').forEach(link => {
      const linkPath = new URL(link.href, window.location.origin).pathname;
      if (linkPath === currentPath || (currentPath.startsWith(linkPath) && linkPath !== '/')) {
        link.setAttribute('aria-current', 'page');
        link.classList.add('is-active');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNav);
  } else {
    loadNav();
  }
})();
```

---

### File: `/components/nav.html`

```html
<a href="#main-content" class="skip-link">Skip to main content</a>

<header class="site-nav" role="banner">
  <div class="nav-inner container">

    <!-- Logo -->
    <a href="/" class="nav-logo" aria-label="OneSphere Labs — home">
      <img src="/logo.png" alt="OneSphere Labs" class="nav-logo-img" width="120" height="40">
    </a>

    <!-- Desktop Nav -->
    <nav class="nav-desktop" aria-label="Main navigation">
      <ul class="nav-links" role="list">
        <li>
          <a href="/" class="nav-link">Home</a>
        </li>

        <!-- Products dropdown -->
        <li class="nav-dropdown-wrap">
          <button
            class="nav-link nav-dropdown-toggle"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="products-dropdown"
          >
            Products
            <svg class="nav-chevron" width="16" height="16" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round"
                 aria-hidden="true">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <div class="nav-dropdown" id="products-dropdown" role="region" aria-label="Products menu">
            <a href="/products/maeda-health/" class="nav-dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="1.5"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </span>
              <span class="dropdown-text">
                <strong>Maeda Health</strong>
                <span>AI clinical assistant for Australian doctors</span>
              </span>
            </a>

            <a href="/products/vigility/" class="nav-dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="1.5"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </span>
              <span class="dropdown-text">
                <strong>Vigility</strong>
                <span>Compliance automation for RTOs, NDIS, aged care</span>
              </span>
            </a>

            <a href="/products/attune/" class="nav-dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="1.5"
                     stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </span>
              <span class="dropdown-text">
                <strong>Attune</strong>
                <span>AI parenting coach for neurodivergent children</span>
              </span>
            </a>

            <a href="/products/petsense/" class="nav-dropdown-item">
              <span class="dropdown-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="1.5"
                     stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/>
                  <circle cx="20" cy="16" r="2"/><path d="M9 10l-5 9h16l-2-6"/>
                </svg>
              </span>
              <span class="dropdown-text">
                <strong>Petsense</strong>
                <span>AI pet behaviour analysis for dogs and cats</span>
              </span>
            </a>
          </div>
        </li>

        <li>
          <a href="/about/" class="nav-link">About</a>
        </li>
        <li>
          <a href="/contact/" class="nav-link">Contact</a>
        </li>
      </ul>
    </nav>

    <!-- CTA Button (desktop) -->
    <a href="/contact/" class="btn btn-primary nav-cta">Get in Touch</a>

    <!-- Hamburger (mobile) -->
    <button
      class="nav-hamburger"
      aria-label="Open navigation menu"
      aria-expanded="false"
      aria-controls="mobile-menu"
    >
      <span class="bar bar-top" aria-hidden="true"></span>
      <span class="bar bar-mid" aria-hidden="true"></span>
      <span class="bar bar-bot" aria-hidden="true"></span>
    </button>
  </div>

  <!-- Mobile Menu (full-width panel) -->
  <nav class="nav-mobile-menu" id="mobile-menu" aria-label="Mobile navigation">
    <ul role="list">
      <li><a href="/" class="nav-link">Home</a></li>
      <li>
        <span class="mobile-section-label">Products</span>
        <ul class="mobile-products-list" role="list">
          <li><a href="/products/maeda-health/" class="nav-link">Maeda Health</a></li>
          <li><a href="/products/vigility/" class="nav-link">Vigility</a></li>
          <li><a href="/products/attune/" class="nav-link">Attune</a></li>
          <li><a href="/products/petsense/" class="nav-link">Petsense</a></li>
        </ul>
      </li>
      <li><a href="/about/" class="nav-link">About</a></li>
      <li><a href="/contact/" class="nav-link">Contact</a></li>
      <li>
        <a href="/contact/" class="btn btn-primary" style="width: 100%; justify-content: center; margin-top: var(--space-4);">
          Get in Touch
        </a>
      </li>
    </ul>
  </nav>
</header>
```

---

### File: `/css/nav.css`

```css
/* =============================================================
   Site Navigation
   Depends on: tokens.css, base.css
   ============================================================= */

/* --- HEADER WRAPPER --- */
.site-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-sticky);
  background: rgba(248, 250, 252, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  transition: box-shadow var(--transition-base);
}

.site-nav.is-scrolled {
  box-shadow: var(--shadow-md);
}

/* --- INNER CONTAINER --- */
.nav-inner {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  height: 72px;
}

/* --- LOGO --- */
.nav-logo {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.nav-logo-img {
  height: 40px;
  width: auto;
}

/* --- DESKTOP NAV --- */
.nav-desktop {
  display: flex;
  align-items: center;
  flex: 1;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-3);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
  transition: color var(--transition-base), background-color var(--transition-base);
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  min-height: 44px;
}

.nav-link:hover,
.nav-link.is-active,
.nav-link[aria-current="page"] {
  color: var(--color-primary);
  background-color: rgba(37, 99, 235, 0.06);
}

.nav-link:focus-visible {
  outline: 3px solid var(--color-ring);
  outline-offset: 2px;
}

/* --- DESKTOP CTA --- */
.nav-cta {
  margin-left: auto;
  flex-shrink: 0;
}

/* --- DROPDOWN WRAPPER --- */
.nav-dropdown-wrap {
  position: relative;
}

/* Chevron rotation */
.nav-chevron {
  transition: transform var(--transition-base);
}

.nav-dropdown-toggle[aria-expanded="true"] .nav-chevron {
  transform: rotate(180deg);
}

/* --- DROPDOWN PANEL --- */
.nav-dropdown {
  position: absolute;
  top: calc(100% + var(--space-2));
  left: 50%;
  transform: translateX(-50%);
  width: 360px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--space-2);
  opacity: 0;
  pointer-events: none;
  transform: translateX(-50%) translateY(-8px);
  transition: opacity var(--transition-base), transform var(--transition-base);
  z-index: var(--z-dropdown);
}

.nav-dropdown.is-open {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .nav-dropdown {
    transition: none;
  }
}

/* --- DROPDOWN ITEMS --- */
.nav-dropdown-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast);
  text-decoration: none;
}

.nav-dropdown-item:hover {
  background-color: var(--color-bg-alt);
}

.nav-dropdown-item:focus-visible {
  outline: 3px solid var(--color-ring);
  outline-offset: -2px;
}

.dropdown-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background-color: rgba(37, 99, 235, 0.08);
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 1px;
}

.dropdown-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.dropdown-text strong {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: 1.3;
}

.dropdown-text span {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  line-height: 1.4;
}

/* --- HAMBURGER BUTTON (mobile) --- */
.nav-hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: var(--radius-sm);
  margin-left: auto;
}

.nav-hamburger:focus-visible {
  outline: 3px solid var(--color-ring);
  outline-offset: 2px;
}

.nav-hamburger .bar {
  display: block;
  width: 22px;
  height: 2px;
  background-color: var(--color-text-primary);
  border-radius: var(--radius-full);
  transition: transform var(--transition-base), opacity var(--transition-base);
}

.nav-hamburger .bar.rotate-down  { transform: rotate(45deg) translate(5px, 5px); }
.nav-hamburger .bar.hidden       { opacity: 0; transform: scaleX(0); }
.nav-hamburger .bar.rotate-up    { transform: rotate(-45deg) translate(5px, -5px); }

@media (prefers-reduced-motion: reduce) {
  .nav-hamburger .bar { transition: none; }
}

/* --- MOBILE MENU PANEL --- */
.nav-mobile-menu {
  display: none;
  flex-direction: column;
  padding: var(--space-4) var(--space-6) var(--space-6);
  border-top: 1px solid var(--color-border);
  background: var(--color-card-bg);
}

.nav-mobile-menu.is-open {
  display: flex;
}

.nav-mobile-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.nav-mobile-menu .nav-link {
  width: 100%;
  justify-content: flex-start;
  padding: var(--space-3) var(--space-4);
}

.mobile-section-label {
  display: block;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: var(--space-3) var(--space-4) var(--space-2);
  margin-top: var(--space-2);
}

.mobile-products-list {
  padding-left: var(--space-4) !important;
}

.mobile-products-list .nav-link {
  font-size: var(--text-sm);
}

/* ── RESPONSIVE BREAKPOINTS ─────────────────────────────── */

/* Tablet: hide desktop nav links, show hamburger */
@media (max-width: 1023px) {
  .nav-desktop {
    display: none;
  }
  .nav-cta {
    display: none;
  }
  .nav-hamburger {
    display: flex;
  }
}

/* Desktop: ensure mobile menu is hidden */
@media (min-width: 1024px) {
  .nav-mobile-menu {
    display: none !important;
  }
  .nav-hamburger {
    display: none;
  }
}

/* Wide screens: increase nav height slightly */
@media (min-width: 1440px) {
  .nav-inner {
    height: 80px;
  }
}
```

---

### Wireframe (Desktop, 1024px+)

```
┌─────────────────────────────────────────────────────────────────────┐
│  [logo.png]   Home  [Products ▾]  About  Contact   [Get in Touch]  │
└─────────────────────────────────────────────────────────────────────┘
                        │
                        ▼ (on Products click/hover)
              ┌──────────────────────────────────┐
              │ [♥] Maeda Health                │
              │     AI clinical assistant...    │
              │ [🛡] Vigility                   │
              │     Compliance automation...    │
              │ [♡] Attune                      │
              │     AI parenting coach...       │
              │ [🐾] Petsense                   │
              │     AI pet behaviour...         │
              └──────────────────────────────────┘
```

### Wireframe (Mobile, <1024px)

```
┌────────────────────────────────┐
│  [logo.png]            [≡]    │
└────────────────────────────────┘
  (when ≡ clicked)
┌────────────────────────────────┐
│  Home                          │
│  PRODUCTS                      │
│    Maeda Health                │
│    Vigility                    │
│    Attune                      │
│    Petsense                    │
│  About                         │
│  Contact                       │
│  [     Get in Touch     ]      │
└────────────────────────────────┘
```

### Accessibility Requirements

- Nav `<header>` has `role="banner"`
- Desktop nav `<nav>` has `aria-label="Main navigation"`
- Mobile nav `<nav>` has `aria-label="Mobile navigation"`
- Dropdown button: `aria-haspopup="true"`, `aria-expanded` toggled by JS
- Dropdown panel: `role="region"`, `aria-label="Products menu"`
- Hamburger: `aria-label="Open navigation menu"`, `aria-expanded` toggled by JS
- All interactive elements have visible `:focus-visible` outline
- Skip link "Skip to main content" appears before the nav in DOM
- Tab order: skip link → logo → nav links → hamburger

### Acceptance Criteria

- [ ] Nav loads correctly on all 7 pages via fetch injection
- [ ] Products dropdown opens on click, closes on outside click and Escape key
- [ ] Dropdown is keyboard navigable (Tab through items, Escape closes)
- [ ] Hamburger toggles mobile menu; `aria-expanded` updates correctly
- [ ] Active page link has `aria-current="page"` and `.is-active` class
- [ ] Nav shadow appears after 20px scroll, disappears at top
- [ ] At 375px: nav shows logo + hamburger only; desktop links hidden
- [ ] At 768px: same as 375px (hamburger visible)
- [ ] At 1024px: full desktop nav; hamburger hidden
- [ ] Logo `alt` text is "OneSphere Labs"
- [ ] Skip link is visible on focus, hidden otherwise
- [ ] Axe DevTools accessibility scan: 0 violations on nav element

### Dependencies

- **Blocked by:** WEB-13 (tokens), WEB-14 (folder structure, components/ dir)
- **Unblocks:** WEB-16, WEB-17, WEB-18, WEB-19, WEB-20, WEB-21–26

---

## WEB-16 — Build Shared Footer Component

### Technical Specification

**Files to create:**
- `/css/footer.css`
- `/components/footer.html` (loaded via JS fetch)

**Files to modify:**
- `/js/nav.js` — extend to also load footer (or create `/js/footer.js`)

**Preferred approach:** Extend `nav.js` to also inject the footer. Add a `loadFooter()` function parallel to `loadNav()`.

---

### File: `/components/footer.html`

```html
<footer class="site-footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">

      <!-- Column 1: Brand -->
      <div class="footer-brand">
        <a href="/" class="footer-logo" aria-label="OneSphere Labs — home">
          <img src="/logo.png" alt="OneSphere Labs" width="120" height="40">
        </a>
        <p class="footer-tagline">
          Building AI products that make a real difference across healthcare,
          compliance, parenting, and pet care.
        </p>
        <div class="footer-social">
          <a
            href="https://linkedin.com/company/onespherelabs"
            class="footer-social-link"
            aria-label="OneSphere Labs on LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Column 2: Products -->
      <div class="footer-col">
        <h3 class="footer-heading">Products</h3>
        <ul class="footer-links" role="list">
          <li><a href="/products/maeda-health/">Maeda Health</a></li>
          <li><a href="/products/vigility/">Vigility</a></li>
          <li><a href="/products/attune/">Attune</a></li>
          <li><a href="/products/petsense/">Petsense</a></li>
        </ul>
      </div>

      <!-- Column 3: Company -->
      <div class="footer-col">
        <h3 class="footer-heading">Company</h3>
        <ul class="footer-links" role="list">
          <li><a href="/about/">About Us</a></li>
          <li><a href="/contact/">Contact</a></li>
        </ul>
      </div>

    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <p class="footer-copyright">
        &copy; <span id="footer-year">2026</span> OneSphere Labs Pty Ltd.
        All rights reserved. ABN: [ABN if available].
      </p>
      <p class="footer-legal">
        OneSphere Labs is an Australian company. All products comply with the
        <a href="https://www.oaic.gov.au/privacy/the-privacy-act" target="_blank" rel="noopener noreferrer">
          Privacy Act 1988 (Cth)
        </a>
        and the Australian Privacy Principles (APP).
      </p>
    </div>
  </div>
</footer>

<script>
  // Update year dynamically
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
</script>
```

---

### File: `/css/footer.css`

```css
/* =============================================================
   Site Footer
   Depends on: tokens.css, base.css
   ============================================================= */

.site-footer {
  background-color: var(--color-text-primary);  /* dark bg */
  color: #CBD5E1;
  padding-block: var(--space-16) var(--space-8);
  margin-top: auto;
}

/* --- GRID (3 columns desktop) --- */
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--space-12);
  padding-bottom: var(--space-12);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 1023px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8);
  }
  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 767px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
}

/* --- BRAND COLUMN --- */
.footer-logo img {
  filter: brightness(0) invert(1);  /* white logo on dark bg */
  opacity: 0.9;
}

.footer-tagline {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: #94A3B8;
  line-height: var(--line-height-body);
  margin-top: var(--space-4);
  max-width: 320px;
}

/* --- SOCIAL LINKS --- */
.footer-social {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.footer-social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.08);
  color: #94A3B8;
  transition: background-color var(--transition-base), color var(--transition-base);
}

.footer-social-link:hover {
  background: var(--color-primary);
  color: #ffffff;
}

.footer-social-link:focus-visible {
  outline: 3px solid var(--color-ring);
  outline-offset: 2px;
}

/* --- LINK COLUMNS --- */
.footer-heading {
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-semibold);
  color: #F1F5F9;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-4);
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links a {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: #94A3B8;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-links a:hover {
  color: #F1F5F9;
}

.footer-links a:focus-visible {
  outline: 3px solid var(--color-ring);
  outline-offset: 2px;
  border-radius: 2px;
}

/* --- BOTTOM BAR --- */
.footer-bottom {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding-top: var(--space-8);
}

.footer-copyright,
.footer-legal {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: #64748B;
  line-height: 1.5;
}

.footer-legal a {
  color: #94A3B8;
  text-decoration: underline;
  text-decoration-color: rgba(148, 163, 184, 0.4);
}

.footer-legal a:hover {
  color: #F1F5F9;
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
  .footer-legal {
    text-align: right;
    max-width: 400px;
  }
}
```

### Wireframe

```
Desktop (≥1024px):
┌──────────────────────────────────────────────────────────────────┐
│  [logo white]                Products      Company              │
│  Building AI products...     Maeda Health  About Us             │
│                              Vigility      Contact              │
│  [LinkedIn icon]             Attune                             │
│                              Petsense                           │
├──────────────────────────────────────────────────────────────────┤
│  © 2026 OneSphere Labs Pty Ltd...     ...Privacy Act 1988 (Cth) │
└──────────────────────────────────────────────────────────────────┘

Mobile (≤768px):
┌─────────────────────────────┐
│  [logo white]               │
│  Building AI products...    │
│  [LinkedIn]                 │
│                             │
│  Products                   │
│  Maeda Health               │
│  Vigility                   │
│  Attune                     │
│  Petsense                   │
│                             │
│  Company                    │
│  About Us                   │
│  Contact                    │
├─────────────────────────────┤
│  © 2026 OneSphere Labs...   │
│  ...Privacy Act 1988 (Cth)  │
└─────────────────────────────┘
```

### Acceptance Criteria

- [ ] Footer renders 3-column layout at 1024px+
- [ ] Footer renders 2-column (brand full-width + 2 link cols) at 768px
- [ ] Footer renders single-column stacked at 375px
- [ ] Logo displays white on dark background (CSS filter applied)
- [ ] Year auto-updates via JS
- [ ] All footer links navigate to correct pages
- [ ] LinkedIn link opens in new tab with `rel="noopener noreferrer"`
- [ ] "Privacy Act 1988 (Cth)" link is correct and functional
- [ ] Footer social link touch targets are ≥44x44px
- [ ] Contrast ratio of footer text on dark background ≥ 4.5:1 (verify with DevTools)
- [ ] `role="contentinfo"` on `<footer>`

### Dependencies

- **Blocked by:** WEB-13, WEB-14, WEB-15 (footer uses same component injection pattern as nav)
- **Unblocks:** WEB-17, WEB-18, WEB-19, WEB-25, WEB-26
