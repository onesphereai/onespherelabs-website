# OneSphere Labs Website Redesign — Ticket Specifications
## Part 8: Sprint 7 — SEO & Performance Polish (WEB-27, WEB-28, WEB-29)

---

## WEB-27 — Update sitemap.xml and robots.txt

### Technical Specification

**Files to modify:**
- `/sitemap.xml`
- `/robots.txt`

---

### New `/sitemap.xml` — Complete Replacement

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Homepage -->
  <url>
    <loc>https://onespherelabs.com.au/</loc>
    <lastmod>2026-03-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- About -->
  <url>
    <loc>https://onespherelabs.com.au/about/</loc>
    <lastmod>2026-03-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Contact -->
  <url>
    <loc>https://onespherelabs.com.au/contact/</loc>
    <lastmod>2026-03-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Maeda Health -->
  <url>
    <loc>https://onespherelabs.com.au/products/maeda-health/</loc>
    <lastmod>2026-03-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Vigility -->
  <url>
    <loc>https://onespherelabs.com.au/products/vigility/</loc>
    <lastmod>2026-03-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Attune -->
  <url>
    <loc>https://onespherelabs.com.au/products/attune/</loc>
    <lastmod>2026-03-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Petsense -->
  <url>
    <loc>https://onespherelabs.com.au/products/petsense/</loc>
    <lastmod>2026-03-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

</urlset>
```

**Update `lastmod` values** to the actual deployment date when this ticket ships.

---

### New `/robots.txt` — Complete Replacement

```
User-agent: *
Allow: /

# Disallow any build artifacts or private directories
Disallow: /components/
Disallow: /node_modules/
Disallow: /*.log$

# Sitemap
Sitemap: https://onespherelabs.com.au/sitemap.xml
```

**Why disallow `/components/`:** The nav and footer partial HTML files in `/components/` are implementation details. Disallowing them prevents search engines indexing partial HTML fragments, which could create duplicate content issues.

---

### Additional SEO tasks in this ticket

**1. Add `<link rel="canonical">` to homepage** (`/index.html`):
```html
<link rel="canonical" href="https://onespherelabs.com.au/">
```

**2. Verify canonical tags on all product pages** (should already be added in WEB-21–24):
- `/products/maeda-health/` → `https://onespherelabs.com.au/products/maeda-health/`
- `/products/vigility/` → `https://onespherelabs.com.au/products/vigility/`
- `/products/attune/` → `https://onespherelabs.com.au/products/attune/`
- `/products/petsense/` → `https://onespherelabs.com.au/products/petsense/`

**3. Verify all `<title>` tags are unique** across all 7 pages. No two pages should have the same title.

**4. Update JSON-LD on homepage** — add `@graph` to include all products as `SoftwareApplication` entries:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "OneSphere Labs",
      "url": "https://onespherelabs.com.au",
      "logo": "https://onespherelabs.com.au/logo.png",
      "description": "Australian AI product studio building production-grade AI products.",
      "foundingDate": "2024",
      "address": { "@type": "PostalAddress", "addressCountry": "AU", "addressLocality": "Sydney" },
      "contactPoint": { "@type": "ContactPoint", "contactType": "customer service", "email": "contact@onespherelabs.com.au" },
      "sameAs": ["https://linkedin.com/company/onespherelabs"]
    },
    {
      "@type": "SoftwareApplication",
      "name": "Maeda Health",
      "applicationCategory": "HealthApplication",
      "url": "https://maedahealth.com",
      "creator": { "@id": "https://onespherelabs.com.au" }
    },
    {
      "@type": "SoftwareApplication",
      "name": "Vigility",
      "applicationCategory": "BusinessApplication",
      "url": "https://vigility.com.au",
      "creator": { "@id": "https://onespherelabs.com.au" }
    },
    {
      "@type": "SoftwareApplication",
      "name": "Attune",
      "applicationCategory": "LifestyleApplication",
      "url": "https://attuneapp.com",
      "creator": { "@id": "https://onespherelabs.com.au" }
    },
    {
      "@type": "SoftwareApplication",
      "name": "Petsense",
      "applicationCategory": "LifestyleApplication",
      "url": "https://petsenseapp.com",
      "creator": { "@id": "https://onespherelabs.com.au" }
    }
  ]
}
```

### Acceptance Criteria

- [ ] `sitemap.xml` lists exactly 7 URLs (home, about, contact, 4 product pages)
- [ ] All URLs use `https://` and trailing slash
- [ ] `lastmod` dates are current (not 2025-08-10 from original file)
- [ ] `robots.txt` disallows `/components/` and includes sitemap URL
- [ ] All 7 pages have unique `<title>` tags
- [ ] All 7 pages have `<link rel="canonical">` pointing to their canonical URL
- [ ] Google Search Console sitemap submission: no errors (validate after deploy)
- [ ] W3C sitemap validated at https://www.xml-sitemaps.com/validate-xml-sitemap.html

### Dependencies

- **Blocked by:** All pages must exist (WEB-17 through WEB-26 complete)
- **Parallelisable with:** WEB-28

---

## WEB-28 — Replace Font Awesome with Inline SVG Icons

### Technical Specification

**Problem:** The site currently loads Font Awesome 6 from CDN:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
```
This is ~30KB of CSS plus icon font files, all for a handful of icons. After the redesign, icons have already been replaced with inline Lucide SVGs in all new page templates (WEB-15–26). This ticket cleans up any remaining Font Awesome references and removes the CDN link.

---

### Audit: Find all remaining Font Awesome usage

Search all HTML and JS files for:
- `fas fa-`
- `far fa-`
- `fab fa-`
- `fa-`
- `font-awesome`
- `cdnjs.cloudflare.com/ajax/libs/font-awesome`

**Expected remaining usages after Sprint 1–6 work (in the original `index.html` if it still has legacy sections):**

These should all have been replaced during WEB-17, WEB-18, WEB-19 hero/products work. If any remain:

| Font Awesome class | Lucide SVG replacement |
|---------------------|----------------------|
| `fas fa-heartbeat` | `<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>` |
| `fas fa-robot` | `<rect x="3" y="11" width="18" height="10" rx="2"/>...` (robot icon) |
| `fas fa-cogs` | `<circle cx="12" cy="12" r="3"/>...` (settings/gear) |
| `fas fa-check` | `<polyline points="20 6 9 17 4 12"/>` |
| `fas fa-check-circle` | `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>` |
| `fas fa-stethoscope` | `<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>` (waveform — medical) |
| `fas fa-fire` | `<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>` |
| `fas fa-download` | `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>` |
| `fas fa-redo` | `<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.67"/>` |
| `fas fa-play` | `<polygon points="5 3 19 12 5 21 5 3"/>` |
| `fas fa-edit` | `<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>` |

**Standard SVG wrapper for all replacements:**
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="1.5"
     stroke-linecap="round" stroke-linejoin="round"
     aria-hidden="true">
  <!-- path here -->
</svg>
```

Use `aria-hidden="true"` on all decorative icons.
Add `aria-label` only if the icon is the sole content of a button/link.

---

### Remove CDN links from all HTML files

**In every HTML file** (index.html + all page stubs + nav.html):

**Remove this line:**
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
```

**Also remove from `/index.html` head:**
```html
<link rel="preconnect" href="https://cdnjs.cloudflare.com">
```

---

### Performance Impact

After removing Font Awesome CDN:
- Eliminates ~1 DNS lookup + ~1 TCP connection to `cdnjs.cloudflare.com`
- Removes ~30KB CSS download + ~80KB icon font download (WOFF2)
- Eliminates render-blocking stylesheet
- Expected Lighthouse Performance improvement: +3–8 points

---

### Acceptance Criteria

- [ ] No `font-awesome` CDN link exists in any HTML file
- [ ] No `fas fa-`, `far fa-`, or `fab fa-` classes exist in any HTML file
- [ ] All icon usages replaced with inline Lucide SVG elements
- [ ] All decorative SVGs have `aria-hidden="true"`
- [ ] Button/link icons that are the sole content have explicit `aria-label` on the button/link
- [ ] SVG stroke-width is consistently 1.5px across all product page icons
- [ ] Lighthouse Performance score improves (run before/after comparison)
- [ ] No visual regressions (compare screenshots before/after)
- [ ] Browser Network tab shows 0 requests to `cdnjs.cloudflare.com`

### Dependencies

- **Blocked by:** All page tickets (WEB-17–26) — must know all icon usages to replace them
- **Unblocks:** WEB-29

---

## WEB-29 — Accessibility and Reduced-Motion Compliance Pass

### Technical Specification

This is a verification and remediation ticket. Run the full site through accessibility testing tools and fix any violations found. The spec below lists required checks and the expected state after completion.

**Tools to use:**
1. Axe DevTools browser extension — run on every page
2. Chrome DevTools Lighthouse — Accessibility audit
3. Keyboard-only navigation test (Tab, Shift+Tab, Enter, Space, Escape, Arrow keys)
4. Screen reader test — use VoiceOver (macOS) or NVDA (Windows)
5. `prefers-reduced-motion` test — simulate via Chrome DevTools → Rendering → Emulate media feature

---

### Checklist by Category

#### A. Skip Link

- [ ] Skip link `<a href="#main-content" class="skip-link">Skip to main content</a>` is the first focusable element on every page
- [ ] Skip link is visually hidden by default (`position: absolute; top: -100%`)
- [ ] Skip link becomes visible on `:focus` (`top: var(--space-4)`)
- [ ] Activating the skip link moves focus to `<main id="main-content">`
- [ ] `<main>` has `id="main-content"` and `tabindex="-1"` (required for focus to land on a non-interactive element)

**Fix for `<main>` tabindex:**
```html
<main id="main-content" tabindex="-1">
```
Add `tabindex="-1"` to all `<main>` elements. The `-1` value means the element can receive programmatic focus (from the skip link) but is not in the tab order.

#### B. Heading Hierarchy

Every page must have exactly one `<h1>`. Headings must not skip levels (e.g., `<h1>` → `<h3>` without `<h2>`).

| Page | H1 | H2 | H3 |
|------|----|----|-----|
| Homepage | "We Build AI Products That Actually Ship" | "Our Products" | Product card titles |
| Maeda Health | "Maeda Health" | "About Maeda Health", "Features", "Compliance" | Feature titles |
| Vigility | "Vigility" | "About Vigility", "Features", "Compliance" | Feature titles |
| Attune | "Attune" | "About Attune", "Features", "Privacy First" | Feature titles |
| Petsense | "Petsense" | "About Petsense", "Features" | Feature titles |
| About | "We build AI products…" | "What we believe", "Our Products", "Want to work with us?" | Mission item titles |
| Contact | "Get in Touch" | (none needed) | (none needed) |

**Run this check:** Use Axe → "Heading order" rule or the HeadingsMap browser extension.

#### C. Focus Management

- [ ] Every interactive element (link, button, input, select, textarea) has a visible `:focus-visible` state
- [ ] Focus ring: 3px solid `#2563EB`, offset 2px
- [ ] Focus never gets "trapped" anywhere except inside modals (there are no modals in the new design)
- [ ] After closing the nav dropdown (Escape), focus returns to the dropdown toggle button
- [ ] Tab order follows logical DOM order (same as visual order)

**Check for outline suppression:**
Search all CSS files for `outline: none` or `outline: 0`. These must be replaced with `outline: none` ONLY inside `:focus:not(:focus-visible)` rules:
```css
/* Correct approach — suppress only for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
:focus-visible {
  outline: 3px solid var(--color-ring);
  outline-offset: 2px;
}
```

#### D. Colour Contrast

Verify 4.5:1 minimum contrast ratio for all text/background combinations.

**Critical pairs to verify (use WebAIM Contrast Checker):**

| Text | Background | Required | Check |
|------|-----------|----------|-------|
| `#64748B` (text-secondary) | `#F8FAFC` (bg) | 4.5:1 | `#64748B` on `#F8FAFC` = 4.54:1 ✓ |
| `#64748B` (text-secondary) | `#FFFFFF` (card) | 4.5:1 | Verify — marginal |
| `#FFFFFF` (white text) | `#2563EB` (primary) | 4.5:1 | `#FFFFFF` on `#2563EB` = 4.54:1 ✓ |
| `#FFFFFF` (white text) | `#F97316` (cta orange) | 4.5:1 | Orange on white must be verified — **orange fails at normal size** |
| Footer `#94A3B8` | `#1E293B` (dark bg) | 4.5:1 | Verify |
| `#FFFFFF` | `#F97316` | 4.5:1 | Orange CTA button with white text — verify carefully |

**Known risk: Orange CTA button.**
`#F97316` (orange-500) with `#FFFFFF` text = approximately 3.1:1 — this FAILS WCAG AA for normal text.

**Fix:** Use `#C2410C` (orange-700) as the CTA button background when text is white:
```css
--color-cta: #C2410C;           /* Was #F97316 — updated for contrast */
--color-cta-hover: #9A3412;     /* Was #EA580C */
```
Update in `tokens.css`. The orange-700 on white = 5.74:1 ✓

If the orange-500 colour is preferred visually, use dark text (`#1E293B`) on the orange button instead:
```css
.btn-cta { color: #1E293B; }   /* dark text on orange-500 = 5.74:1 ✓ */
```

**Decision:** Use dark text on orange-500 (preserves the bright orange). Update `base.css`:
```css
.btn-cta {
  background-color: var(--color-cta);
  color: #1E293B;   /* dark text for contrast */
  border: 2px solid transparent;
}
```

#### E. Images and Icons

- [ ] All `<img>` elements have meaningful `alt` text or `alt=""` if decorative
- [ ] `logo.png` alt text is "OneSphere Labs" (not empty)
- [ ] All decorative SVG icons have `aria-hidden="true"`
- [ ] No icon-only buttons without `aria-label`

**Check list:**
```html
<!-- Correct: decorative icon, button has visible text -->
<button class="btn btn-primary">
  <svg aria-hidden="true">...</svg>
  Visit maedahealth.com
</button>

<!-- Correct: icon-only button, has aria-label -->
<button class="nav-hamburger" aria-label="Open navigation menu">
  <span class="bar" aria-hidden="true"></span>
  ...
</button>

<!-- Wrong — fix this pattern if found: -->
<button>
  <svg>...</svg>  <!-- No aria-label on button, no visible text -->
</button>
```

#### F. Forms

- [ ] Every `<input>` and `<select>` and `<textarea>` has an associated `<label>` using `for`/`id`
- [ ] No input uses `placeholder` as its only label
- [ ] Required fields indicated with `aria-required="true"` and visible indicator (asterisk with `aria-hidden="true"`)
- [ ] Error messages use `role="alert"` and `aria-live="polite"` (verified in WEB-26 spec)
- [ ] Error messages are associated with their input via `aria-describedby`

#### G. ARIA Landmarks

Every page must have all required landmark regions:

```html
<header role="banner">        <!-- .site-nav -->
<main id="main-content">      <!-- page content -->
<footer role="contentinfo">   <!-- .site-footer -->
<nav aria-label="Main navigation">
<nav aria-label="Breadcrumb"> (on pages that have breadcrumbs)
```

- [ ] No `<div>` is used where a semantic element exists
- [ ] `<section>` elements have `aria-labelledby` pointing to their heading

#### H. prefers-reduced-motion

Simulate via Chrome DevTools → Rendering panel → Emulate CSS media feature: `prefers-reduced-motion: reduce`.

With reduced motion active:
- [ ] `.animate-on-scroll` elements are immediately visible (no fade-in transition)
- [ ] `.stagger-children` transition delays are all 0ms
- [ ] `.product-card:hover` does not scale (`transform: none`)
- [ ] `.about-product-row:hover` does not translate (`transform: none`)
- [ ] `.nav-dropdown` open/close has no transition (instant show/hide)
- [ ] `.nav-hamburger .bar` has no transition (instant state change)
- [ ] Hero scroll animation does not fire
- [ ] Navbar scroll background change: acceptable (opacity change, not transform)

**Verify in `base.css` that these rules exist:**

```css
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .stagger-children > * {
    transition-delay: 0ms !important;
  }

  .product-card:hover {
    transform: none;
  }

  .feature-card:hover {
    transform: none;
  }

  .about-product-row:hover {
    transform: none;
  }

  .btn:active {
    transform: none;
  }

  .nav-dropdown {
    transition: none;
  }

  .nav-hamburger .bar {
    transition: none;
  }
}
```

#### I. Touch Targets

- [ ] All interactive elements have minimum 44x44px touch target
- [ ] Check: nav links (`.nav-link` has `min-height: 44px`)
- [ ] Check: hamburger button (`.nav-hamburger` is 44x44px)
- [ ] Check: product card "Learn More" buttons
- [ ] Check: footer social link (40px — upgrade to 44px)

**Fix footer social link size:**
```css
.footer-social-link {
  width: 44px;   /* was 40px */
  height: 44px;  /* was 40px */
}
```

#### J. Language

- [ ] `<html lang="en">` on all pages
- [ ] Pages with Australian English content may use `lang="en-AU"` — acceptable but `lang="en"` is sufficient

---

### Lighthouse Targets

Run Lighthouse (mobile simulation) on homepage and each product page:

| Metric | Target |
|--------|--------|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | ≥ 95 |

**If Performance < 90:** Check for render-blocking resources (Font Awesome CDN must be gone after WEB-28), large images (logo.png — consider converting to WebP or ensuring it's ≤50KB), and unused CSS from `styles.css` legacy file.

**If Accessibility < 95:** Re-check focus states, heading hierarchy, and landmark regions.

---

### Acceptance Criteria

- [ ] Axe DevTools: 0 critical violations on every page
- [ ] Lighthouse Accessibility: ≥ 95 on homepage and all product pages
- [ ] Lighthouse SEO: ≥ 95 on homepage
- [ ] `prefers-reduced-motion: reduce` tested — all transitions/animations disabled
- [ ] Skip link visible on focus and functional on all pages
- [ ] Heading hierarchy is correct and sequential on all pages
- [ ] All form inputs have associated labels
- [ ] Orange CTA button passes 4.5:1 contrast (fix applied per Section D above)
- [ ] All `<img>` elements have meaningful alt text
- [ ] All decorative SVGs have `aria-hidden="true"`
- [ ] All icon-only interactive elements have `aria-label`
- [ ] All footer social links are ≥ 44x44px touch target
- [ ] `<main>` has `tabindex="-1"` on all pages
- [ ] ARIA landmark structure correct on all pages
- [ ] Keyboard-only navigation tested: can reach all links, buttons, and form elements
- [ ] VoiceOver/NVDA test: product page reads correctly — headings announced, images described, buttons labelled

### Dependencies

- **Blocked by:** WEB-28 (icons must be replaced before accessibility audit)
- **Blocked by:** All page tickets complete
- **Unblocks:** Production launch

---

## APPENDIX: File Structure Reference (Complete)

After all 23 tickets are implemented:

```
/
├── css/
│   ├── tokens.css            (WEB-13)
│   ├── base.css              (WEB-13)
│   ├── nav.css               (WEB-15)
│   ├── footer.css            (WEB-16)
│   ├── home.css              (WEB-17, WEB-18, WEB-19)
│   └── product-page.css      (WEB-20)
├── js/
│   ├── nav.js                (WEB-15)
│   ├── animations.js         (WEB-14)
│   └── main.js               (WEB-14, refactored from script.js)
├── components/
│   ├── nav.html              (WEB-15)
│   └── footer.html           (WEB-16)
├── products/
│   ├── maeda-health/
│   │   └── index.html        (WEB-21)
│   ├── vigility/
│   │   └── index.html        (WEB-22)
│   ├── attune/
│   │   └── index.html        (WEB-23)
│   └── petsense/
│       └── index.html        (WEB-24)
├── about/
│   └── index.html            (WEB-25)
├── contact/
│   └── index.html            (WEB-26)
├── index.html                (modified throughout WEB-7 through WEB-19)
├── styles.css                (patched in WEB-8, legacy — can be emptied after all pages move to new CSS)
├── script.js                 (patched in WEB-12, legacy — superceded by js/main.js)
├── logo.png                  (unchanged)
├── favicon.ico               (unchanged)
├── sitemap.xml               (WEB-27)
└── robots.txt                (WEB-27)
```

---

## APPENDIX: Dependency Graph (Visual)

```
WEB-8 (CSS fix)
  │
  ├─► WEB-7, WEB-9, WEB-10, WEB-11
  │         │
  │         └─► WEB-12
  │
  └─► WEB-13 (design system)
        │
        └─► WEB-14 (multi-page structure)
              │
              ├─► WEB-15 (nav) ──────────────────────────────┐
              │     │                                          │
              │     └─► WEB-16 (footer) ──────────────────────┤
              │                                                │
              └──────────────────────────────────────────────►│
                                                              │
                              ┌───────────────────────────────┘
                              │
                              ├─► WEB-17 (hero)
                              │     └─► WEB-18 (products grid)
                              │           └─► WEB-19 (trust strip + SEO)
                              │
                              ├─► WEB-20 (product template)
                              │     ├─► WEB-21 (Maeda Health) ─┐
                              │     ├─► WEB-22 (Vigility)       │
                              │     ├─► WEB-23 (Attune)         ├─► WEB-28 (SVG icons)
                              │     └─► WEB-24 (Petsense) ──────┤       │
                              │                                  │       └─► WEB-29 (a11y)
                              ├─► WEB-25 (About) ───────────────┤
                              └─► WEB-26 (Contact) ─────────────┘
                                                                │
                                                       WEB-27 (sitemap) ──► done
```
