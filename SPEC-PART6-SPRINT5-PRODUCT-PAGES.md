# OneSphere Labs Website Redesign — Ticket Specifications
## Part 6: Sprint 5 — Product Pages (WEB-20 through WEB-24)

---

## WEB-20 — Build Product Page Template

### Technical Specification

**File to create:** `/css/product-page.css`
**File to create:** `/components/product-page-template.html` (reference template — not deployed, used as copy-paste base for WEB-21–24)

This ticket builds the CSS scaffold and HTML structure that all four product pages share. No product-specific content — just the template.

---

### Product Page Section Anatomy

Every product page follows this structure:

```
[nav]
├── .product-hero          (product name, tagline, CTA, hero badge)
├── .product-overview      (2-col: description left, key stats right)
├── .product-features      (feature grid — icon + title + description)
├── .product-compliance    (trust/compliance badges — health products only)
├── .product-cta-section   (final CTA: visit site + contact)
[footer]
```

---

### File: `/css/product-page.css`

```css
/* =============================================================
   Product Page Layout
   Depends on: tokens.css, base.css, nav.css, footer.css
   ============================================================= */

/* Body needs nav offset */
body {
  padding-top: 72px;
}

@media (min-width: 1440px) {
  body { padding-top: 80px; }
}

/* ─── PRODUCT HERO ──────────────────────────────────────── */

.product-hero {
  padding-block: var(--space-24) var(--space-16);
  background: linear-gradient(
    135deg,
    var(--color-bg) 0%,
    var(--color-bg-alt) 100%
  );
  border-bottom: 1px solid var(--color-border);
}

.product-hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

.product-hero-copy {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* Breadcrumb */
.product-breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

.product-breadcrumb a {
  color: var(--color-primary);
  text-decoration: none;
}

.product-breadcrumb a:hover {
  text-decoration: underline;
}

.product-breadcrumb-sep {
  color: var(--color-border);
}

/* Category badge */
.product-category-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  border: 1px solid currentColor;
}

/* Per-product color theming */
.product-theme--maeda .product-category-badge {
  color: #059669;
  background: rgba(5, 150, 105, 0.08);
  border-color: rgba(5, 150, 105, 0.3);
}

.product-theme--vigility .product-category-badge {
  color: #2563EB;
  background: rgba(37, 99, 235, 0.08);
  border-color: rgba(37, 99, 235, 0.3);
}

.product-theme--attune .product-category-badge {
  color: #F97316;
  background: rgba(249, 115, 22, 0.08);
  border-color: rgba(249, 115, 22, 0.3);
}

.product-theme--petsense .product-category-badge {
  color: #7C3AED;
  background: rgba(124, 58, 237, 0.08);
  border-color: rgba(124, 58, 237, 0.3);
}

/* Product title */
.product-hero-title {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-bold);
  line-height: 1.1;
  color: var(--color-text-primary);
}

@media (max-width: 1023px) {
  .product-hero-title { font-size: var(--text-2xl); }
}

@media (max-width: 767px) {
  .product-hero-title { font-size: 2rem; }
}

/* Tagline */
.product-hero-tagline {
  font-size: var(--text-md);
  color: var(--color-text-secondary);
  line-height: var(--line-height-body);
  max-width: 520px;
}

/* Hero CTA row */
.product-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  align-items: center;
}

/* Hero visual (right column) */
.product-hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--space-8);
}

/* Hero icon (large) */
.product-hero-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: var(--radius-lg);
}

.product-theme--maeda   .product-hero-icon { background: rgba(5, 150, 105, 0.1);  color: #059669; }
.product-theme--vigility .product-hero-icon{ background: rgba(37, 99, 235, 0.1); color: #2563EB; }
.product-theme--attune  .product-hero-icon { background: rgba(249, 115, 22, 0.1); color: #F97316; }
.product-theme--petsense .product-hero-icon{ background: rgba(124, 58, 237, 0.1);color: #7C3AED; }

@media (max-width: 1023px) {
  .product-hero-inner {
    grid-template-columns: 1fr;
    gap: var(--space-12);
  }
  .product-hero-visual {
    max-width: 480px;
    margin-inline: auto;
    width: 100%;
    min-height: 200px;
  }
}

/* ─── OVERVIEW SECTION ──────────────────────────────────── */

.product-overview {
  padding-block: var(--space-24);
  background: var(--color-card-bg);
}

.product-overview-inner {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: var(--space-16);
  align-items: start;
}

.product-overview-description {
  font-size: var(--text-md);
  color: var(--color-text-secondary);
  line-height: var(--line-height-body);
}

.product-overview-description p + p {
  margin-top: var(--space-4);
}

/* Stats panel */
.product-stats {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-8);
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.product-stat-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.product-stat-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.product-stat-value {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  line-height: 1;
}

.product-stat-label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  line-height: 1.4;
}

@media (max-width: 1023px) {
  .product-overview-inner {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
  .product-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
  }
  .product-stat-item {
    border-bottom: none;
    border-right: 1px solid var(--color-border);
    padding-right: var(--space-4);
    padding-bottom: 0;
  }
  .product-stat-item:nth-child(even) {
    border-right: none;
    padding-right: 0;
  }
}

@media (max-width: 767px) {
  .product-stats {
    grid-template-columns: 1fr 1fr;
  }
}

/* ─── FEATURES GRID ─────────────────────────────────────── */

.product-features {
  padding-block: var(--space-24);
  background: var(--color-bg-alt);
}

.product-features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  margin-top: var(--space-12);
}

@media (max-width: 1023px) {
  .product-features-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 767px) {
  .product-features-grid { grid-template-columns: 1fr; }
}

.feature-card {
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

@media (prefers-reduced-motion: reduce) {
  .feature-card:hover { transform: none; }
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.product-theme--maeda   .feature-icon { background: rgba(5, 150, 105, 0.1);  color: #059669; }
.product-theme--vigility .feature-icon{ background: rgba(37, 99, 235, 0.1); color: #2563EB; }
.product-theme--attune  .feature-icon { background: rgba(249, 115, 22, 0.1); color: #F97316; }
.product-theme--petsense .feature-icon{ background: rgba(124, 58, 237, 0.1);color: #7C3AED; }

.feature-title {
  font-family: var(--font-heading);
  font-size: var(--text-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--line-height-heading);
}

.feature-description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-body);
}

/* ─── COMPLIANCE BADGES (health/compliance products) ─────── */

.product-compliance {
  padding-block: var(--space-16);
  background: var(--color-card-bg);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.compliance-badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  justify-content: center;
  margin-top: var(--space-8);
}

.compliance-badge {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-6);
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.compliance-badge svg {
  color: var(--color-success);
  flex-shrink: 0;
}

/* ─── PRODUCT CTA SECTION ───────────────────────────────── */

.product-cta-section {
  padding-block: var(--space-24);
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-primary-hover) 100%
  );
  text-align: center;
}

.product-cta-section h2 {
  color: #ffffff;
  font-size: var(--text-2xl);
  margin-bottom: var(--space-4);
}

.product-cta-section p {
  color: rgba(255, 255, 255, 0.85);
  font-size: var(--text-md);
  margin-bottom: var(--space-8);
  max-width: 560px;
  margin-inline: auto;
}

.product-cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  justify-content: center;
}

/* White-on-blue button variants for CTA section */
.btn-white {
  background-color: #ffffff;
  color: var(--color-primary);
  border: 2px solid #ffffff;
}

.btn-white:hover {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: var(--shadow-md);
}

.btn-outline-white {
  background-color: transparent;
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.6);
}

.btn-outline-white:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: #ffffff;
}
```

---

### Reference HTML Template (for developers — copy per product page)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Product Name] — [Tagline] — OneSphere Labs</title>
  <meta name="description" content="[160 char max description]">
  <link rel="canonical" href="https://onespherelabs.com.au/products/[slug]/">
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
<body class="product-theme--[slug]">

  <div id="nav-placeholder"></div>

  <main id="main-content">

    <!-- HERO -->
    <section class="product-hero" aria-labelledby="product-hero-heading">
      <div class="container">
        <div class="product-hero-inner">
          <div class="product-hero-copy animate-on-scroll">
            <nav class="product-breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span class="product-breadcrumb-sep" aria-hidden="true">/</span>
              <a href="/#products">Products</a>
              <span class="product-breadcrumb-sep" aria-hidden="true">/</span>
              <span aria-current="page">[Product Name]</span>
            </nav>
            <div class="product-category-badge">[Category]</div>
            <h1 id="product-hero-heading" class="product-hero-title">[Product Name]</h1>
            <p class="product-hero-tagline">[One-sentence product pitch]</p>
            <div class="product-hero-actions">
              <a href="https://[product-domain]" class="btn btn-primary"
                 target="_blank" rel="noopener noreferrer">
                Visit [product-domain]
              </a>
              <a href="/contact/" class="btn btn-secondary">Request Demo</a>
            </div>
          </div>
          <div class="product-hero-visual animate-on-scroll" style="transition-delay: 150ms;">
            <div class="product-hero-icon">
              <!-- SVG icon here, 64x64 -->
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- OVERVIEW -->
    <section class="product-overview" aria-labelledby="overview-heading">
      <div class="container">
        <div class="product-overview-inner">
          <div class="product-overview-description animate-on-scroll">
            <h2 id="overview-heading">About [Product Name]</h2>
            <p>[Overview paragraph 1]</p>
            <p>[Overview paragraph 2]</p>
          </div>
          <aside class="product-stats animate-on-scroll" style="transition-delay: 100ms;"
                 aria-label="[Product Name] key statistics">
            <div class="product-stat-item">
              <span class="product-stat-value">[Value]</span>
              <span class="product-stat-label">[Label]</span>
            </div>
            <!-- repeat stat-item -->
          </aside>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="product-features" aria-labelledby="features-heading">
      <div class="container">
        <div class="section-header animate-on-scroll">
          <h2 id="features-heading">Features</h2>
          <p>[Features section subtitle]</p>
        </div>
        <div class="product-features-grid stagger-children">
          <!-- feature-card × N -->
          <article class="feature-card animate-on-scroll">
            <div class="feature-icon" aria-hidden="true">
              <!-- SVG 24x24 -->
            </div>
            <h3 class="feature-title">[Feature Name]</h3>
            <p class="feature-description">[Feature description, 1–2 sentences]</p>
          </article>
        </div>
      </div>
    </section>

    <!-- COMPLIANCE (include for Maeda, Vigility — omit for Attune, Petsense or adapt) -->
    <section class="product-compliance" aria-labelledby="compliance-heading">
      <div class="container">
        <div class="section-header animate-on-scroll">
          <h2 id="compliance-heading">Compliance &amp; Security</h2>
        </div>
        <div class="compliance-badges animate-on-scroll">
          <!-- compliance-badge items -->
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="product-cta-section" aria-labelledby="product-cta-heading">
      <div class="container">
        <h2 id="product-cta-heading">[CTA Heading]</h2>
        <p>[CTA subtext]</p>
        <div class="product-cta-actions">
          <a href="https://[product-domain]" class="btn btn-white"
             target="_blank" rel="noopener noreferrer">
            Visit [product-domain]
          </a>
          <a href="/contact/" class="btn btn-outline-white">Contact Us</a>
        </div>
      </div>
    </section>

  </main>

  <div id="footer-placeholder"></div>

  <script src="/js/nav.js" defer></script>
  <script src="/js/animations.js" defer></script>
</body>
</html>
```

### Acceptance Criteria

- [ ] `/css/product-page.css` created with all sections defined
- [ ] 4 theme modifier classes exist: `product-theme--maeda`, `product-theme--vigility`, `product-theme--attune`, `product-theme--petsense`
- [ ] Feature grid is 3-col desktop, 2-col tablet, 1-col mobile
- [ ] Hero is 2-col desktop, stacked mobile
- [ ] `product-cta-section` buttons pass 4.5:1 contrast on blue background
- [ ] `.btn-white` and `.btn-outline-white` have correct styling for blue backgrounds

### Dependencies

- **Blocked by:** WEB-15, WEB-16 (nav + footer), WEB-13, WEB-14
- **Unblocks:** WEB-21, WEB-22, WEB-23, WEB-24

---

## WEB-21 — Build Maeda Health Product Page

**File to create:** `/products/maeda-health/index.html`

### Head Section

```html
<title>Maeda Health — AI Clinical Assistant for Australian Doctors — OneSphere Labs</title>
<meta name="description" content="Maeda Health is an AI-powered clinical assistant for Australian GPs. Medical Scribe in 5 languages, MBS Billing, Post-Consultation Forms, and APP-compliant Sydney data residency.">
<link rel="canonical" href="https://onespherelabs.com.au/products/maeda-health/">
```

`<body class="product-theme--maeda">`

### Hero Section Content

- **Category badge:** `Healthcare · AI`
- **H1:** `Maeda Health`
- **Tagline:** `AI-powered clinical intelligence for Australian doctors. Built for the GP workflow. Compliant by design.`
- **Primary CTA:** `Visit maedahealth.com` → `https://maedahealth.com` (new tab)
- **Secondary CTA:** `Request Demo` → `/contact/`

**Hero icon SVG (64x64):**
```html
<svg width="64" height="64" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="1.5"
     stroke-linecap="round" stroke-linejoin="round">
  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
</svg>
```

### Overview Section

**H2:** `About Maeda Health`

**Overview paragraph 1:**
```
Maeda Health is an AI clinical assistant purpose-built for Australian general practitioners.
It combines a real-time Medical Scribe, intelligent MBS billing, and a suite of post-consultation
tools into a single, integrated platform that reduces administrative burden and lets doctors
focus on patient care.
```

**Overview paragraph 2:**
```
All data is processed and stored in Sydney, Australia. Maeda Health is fully compliant with the
Privacy Act 1988 (Cth) and the Australian Privacy Principles (APP), with no data leaving
Australian borders.
```

**Stats panel:**
| Value | Label |
|-------|-------|
| 8 | Core Features |
| 5 | Scribe Languages |
| 14+ | Post-Consult Forms |
| AU | Data Residency |

### Features Grid (8 features, 3-col)

Feature data — use this exact copy:

1. **Clinical Assistant**
   Icon: brain/AI (`<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>` + circle)
   Description: `Real-time AI clinical support during consultations. Surfaces relevant guidelines, flags contraindications, and assists with clinical decision making as you work.`

2. **Medical Scribe**
   Icon: microphone
   Description: `Dictation and transcription in 5 languages — English, Mandarin, Hindi, Arabic, and Vietnamese. Converts spoken consultation notes into structured clinical documentation automatically.`

3. **MBS Billing Automation**
   Icon: dollar-sign / credit-card
   Description: `Automatic Medicare Benefits Schedule item number suggestions based on the consultation content. Reduces billing errors and missed item numbers.`

4. **Post-Consultation Forms**
   Icon: file-text
   Description: `Over 14 post-consultation form templates including referral letters, care plans, and patient summaries. Generated from consultation notes in seconds.`

5. **Specialist Referral Search**
   Icon: search / map-pin
   Description: `Intelligent specialist finder that matches patient needs with available specialists in your area. Includes wait times and referral pathway guidance.`

6. **Smart Patient Forms**
   Icon: clipboard-list
   Description: `Digital patient intake and consent forms that pre-populate from existing patient records. Reduces waiting room time and transcription errors.`

7. **Correspondence Management**
   Icon: mail / inbox
   Description: `AI-assisted management of incoming specialist correspondence, test results, and letters. Automatically categorises and prioritises items requiring action.`

8. **Clinical Knowledge Base**
   Icon: book-open
   Description: `Searchable clinical reference library integrated directly into the consultation workflow. Access guidelines, drug interactions, and clinical protocols without leaving the interface.`

### Compliance Section

**H2:** `Built for Australian Healthcare Compliance`

Badges:
```html
<div class="compliance-badge">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
  APP Compliant
</div>
<div class="compliance-badge">
  <svg ...checkmark...></svg>
  Privacy Act 1988 (Cth)
</div>
<div class="compliance-badge">
  <svg ...checkmark...></svg>
  Sydney Data Residency
</div>
<div class="compliance-badge">
  <svg ...checkmark...></svg>
  No Overseas Data Transfer
</div>
<div class="compliance-badge">
  <svg ...checkmark...></svg>
  RACGP Workflow Compatible
</div>
```

### CTA Section

- **H2:** `Ready to reclaim your clinical day?`
- **Body:** `Join Australian GPs already using Maeda Health to reduce admin time and focus on what matters: patient care.`
- **Primary CTA:** `Visit maedahealth.com` → `https://maedahealth.com`
- **Secondary CTA:** `Contact Us` → `/contact/`

### SEO

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Maeda Health",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web",
  "url": "https://maedahealth.com",
  "creator": {
    "@type": "Organization",
    "name": "OneSphere Labs",
    "url": "https://onespherelabs.com.au"
  },
  "description": "AI-powered clinical assistant for Australian doctors with Medical Scribe, MBS Billing, and APP compliance.",
  "offers": { "@type": "Offer", "availability": "https://schema.org/InStock" }
}
</script>
```

### Acceptance Criteria

- [ ] Page title, description, canonical URL all correct
- [ ] All 8 features display with correct name and description
- [ ] Stats panel shows 4 stats as specified
- [ ] 5 compliance badges render
- [ ] "HIPAA" does not appear anywhere on the page
- [ ] "APP" / "Privacy Act 1988" references are present and accurate
- [ ] maedahealth.com link opens in new tab
- [ ] Page passes Axe accessibility scan (0 critical violations)
- [ ] All `animate-on-scroll` elements animate on scroll
- [ ] `<body>` has class `product-theme--maeda`

### Dependencies

- **Blocked by:** WEB-20 (template)
- **Unblocks:** Nothing (parallelisable with WEB-22–24)

---

## WEB-22 — Build Vigility Product Page

**File to create:** `/products/vigility/index.html`

### Head

```html
<title>Vigility — Compliance Automation for RTOs, NDIS &amp; Aged Care — OneSphere Labs</title>
<meta name="description" content="Vigility automates compliance for RTOs, NDIS providers and aged care. Regulatory Standards Library, automated evidence classification, live compliance scores, and one-click audit packs.">
<link rel="canonical" href="https://onespherelabs.com.au/products/vigility/">
```

`<body class="product-theme--vigility">`

### Hero

- **Category badge:** `Compliance · Automation`
- **H1:** `Vigility`
- **Tagline:** `Compliance automation for RTOs, NDIS providers, and aged care organisations. From chaos to audit-ready in hours, not weeks.`
- **Primary CTA:** `Visit vigility.com.au` → `https://vigility.com.au` (new tab)
- **Secondary CTA:** `Request Demo` → `/contact/`

**Hero icon SVG:**
```html
<svg width="64" height="64" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="1.5"
     stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
</svg>
```

### Overview

**H2:** `About Vigility`

**Paragraph 1:**
```
Vigility is a compliance automation platform for Australian organisations in highly regulated
sectors: Registered Training Organisations (RTOs), NDIS service providers, and aged care.
It replaces manual compliance tracking with automated evidence classification, live scoring,
and one-click audit pack generation.
```

**Paragraph 2:**
```
Built on a comprehensive Regulatory Standards Library, Vigility maps your controls to the
relevant standards automatically — whether that's ASQA, the NDIS Practice Standards, or
Aged Care Quality Standards.
```

**Stats panel:**
| Value | Label |
|-------|-------|
| 7 | Core Features |
| 3 | Regulated Sectors |
| 1-Click | Audit Pack |
| Live | Compliance Score |

### Features Grid (7 features)

1. **Regulatory Standards Library**
   Description: `Comprehensive, up-to-date library of Australian regulatory standards for RTOs (ASQA), NDIS, and aged care. Auto-updated when standards change.`

2. **Controls Mapping**
   Description: `Map your organisation's controls and policies to regulatory requirements automatically. Identify gaps before auditors do.`

3. **Automated Evidence Classification**
   Description: `Upload documents, policies, and records. Vigility automatically classifies and tags evidence against the relevant standard controls.`

4. **Staff Credential Tracking**
   Description: `Track staff qualifications, certifications, and renewal dates. Automatic alerts before credentials expire.`

5. **One-Click Audit Pack**
   Description: `Generate a complete, formatted audit pack with a single click. Includes evidence register, gap analysis, and compliance statement.`

6. **CAPA Tracking**
   Description: `Corrective and Preventive Action tracking for non-conformances. Assign, track, and verify remediation actions through to closure.`

7. **Live Compliance Score**
   Description: `Real-time compliance score across all standards and domains. Drill down to identify which areas need attention before your next audit.`

### Compliance Section

**H2:** `Built for Australian Regulatory Requirements`

Badges: ASQA (RTOs), NDIS Practice Standards, Aged Care Quality Standards, Privacy Act 1988 (Cth), Australian-hosted data

### CTA Section

- **H2:** `Turn compliance from a burden into a competitive advantage`
- **Body:** `Join Australian RTOs, NDIS providers, and aged care operators using Vigility to stay audit-ready year-round.`
- **Primary CTA:** `Visit vigility.com.au`
- **Secondary CTA:** `Contact Us`

### Acceptance Criteria

- [ ] All 7 features render with correct names and descriptions
- [ ] Stats panel correct
- [ ] 5 compliance badges present
- [ ] vigility.com.au links correctly
- [ ] `<body>` class is `product-theme--vigility`

### Dependencies

- **Blocked by:** WEB-20
- **Parallelisable with:** WEB-21, WEB-23, WEB-24

---

## WEB-23 — Build Attune Product Page

**File to create:** `/products/attune/index.html`

### Head

```html
<title>Attune — AI Parenting Coach for Neurodivergent Children — OneSphere Labs</title>
<meta name="description" content="Attune is an AI parenting coach for families of neurodivergent children. Live Mode dual-camera, neuro-affirming language engine, on-device processing. Patent filed. iOS and Android.">
<link rel="canonical" href="https://onespherelabs.com.au/products/attune/">
```

`<body class="product-theme--attune">`

### Hero

- **Category badge:** `Parenting · AI`
- **H1:** `Attune`
- **Tagline:** `An AI parenting coach that understands neurodivergent children. Real-time support in the moments that matter most.`
- **Primary CTA:** `Visit attuneapp.com` → `https://attuneapp.com` (new tab)
- **Secondary CTA:** `Learn More` → `/contact/`

**Hero icon SVG (heart):**
```html
<svg width="64" height="64" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="1.5"
     stroke-linecap="round" stroke-linejoin="round">
  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
</svg>
```

### Overview

**H2:** `About Attune`

**Paragraph 1:**
```
Attune is an AI parenting coach designed specifically for families navigating neurodivergence.
Whether your child has autism, ADHD, sensory processing differences, or other neurological
variations, Attune provides real-time guidance using neuro-affirming language — in the
moments when you need it most.
```

**Paragraph 2:**
```
Attune's patent-filed technology uses dual-camera Live Mode to observe interactions and
offer context-aware coaching. All processing happens on-device — your family's data never
leaves your phone. Available on iOS and Android.
```

**Stats panel:**
| Value | Label |
|-------|-------|
| Patent | Filed |
| On-Device | Processing |
| iOS + Android | Available |
| Neuro-Affirming | Language Engine |

### Features Grid (6 features)

1. **Live Mode — Dual Camera**
   Description: `Real-time coaching using both front and rear cameras to observe the interaction. Attune sees what you see and provides immediate, context-aware guidance.`

2. **Record Mode**
   Description: `Record interactions for later review and coaching. Attune analyses the recording and provides structured feedback with specific, actionable suggestions.`

3. **Ask Attune**
   Description: `Conversational AI coaching for parenting questions. Ask anything about your child's behaviour, routines, or challenges and receive neuro-affirming guidance instantly.`

4. **Child Profile System**
   Description: `Personalised profile for each child capturing their unique needs, triggers, strengths, and communication style. Coaching adapts to each child's profile over time.`

5. **On-Device Processing**
   Description: `All video and audio analysis happens entirely on your device. No family data is transmitted to servers — complete privacy by design.`

6. **Neuro-Affirming Language**
   Description: `Attune's language engine is built around neuro-affirming principles. All coaching avoids deficit language and supports positive, strengths-based parenting approaches.`

### Note: No compliance section for Attune (replace with a "Privacy" section)

**Privacy section content:**
```html
<section class="product-compliance" aria-labelledby="privacy-heading">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="privacy-heading">Privacy First</h2>
      <p>Attune is built around a simple principle: your family's data stays with your family.</p>
    </div>
    <div class="compliance-badges animate-on-scroll">
      [On-Device Processing badge]
      [No Data Transmission badge]
      [Privacy Act 1988 (Cth) badge]
      [Patent Filed badge]
    </div>
  </div>
</section>
```

### CTA Section

- **H2:** `Support your child in the moments that matter`
- **Body:** `Download Attune and experience AI coaching that truly understands neurodivergent children.`
- **Primary CTA:** `Visit attuneapp.com`
- **Secondary CTA:** `Contact Us`

### Acceptance Criteria

- [ ] All 6 features render with correct names
- [ ] "Patent filed" appears prominently (hero tagline + stats panel)
- [ ] "On-device processing" and "no data transmission" are clearly communicated
- [ ] attuneapp.com links correctly
- [ ] Privacy section replaces compliance section
- [ ] `<body>` class is `product-theme--attune`

### Dependencies

- **Blocked by:** WEB-20
- **Parallelisable with:** WEB-21, WEB-22, WEB-24

---

## WEB-24 — Build Petsense Product Page

**File to create:** `/products/petsense/index.html`

### Head

```html
<title>Petsense — AI Pet Behaviour Analysis for Dogs and Cats — OneSphere Labs</title>
<meta name="description" content="Petsense uses AI to analyse real-time pet behaviour for dogs and cats. Behaviour history, breed-aware guidance, and actionable insights for pet owners.">
<link rel="canonical" href="https://onespherelabs.com.au/products/petsense/">
```

`<body class="product-theme--petsense">`

### Hero

- **Category badge:** `Pet Care · AI`
- **H1:** `Petsense`
- **Tagline:** `Real-time AI behaviour analysis for dogs and cats. Understand your pet. Act with confidence.`
- **Primary CTA:** `Visit petsenseapp.com` → `https://petsenseapp.com` (new tab)
- **Secondary CTA:** `Learn More` → `/contact/`

**Hero icon SVG:**
```html
<svg width="64" height="64" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="1.5"
     stroke-linecap="round" stroke-linejoin="round">
  <circle cx="11" cy="4" r="2"/>
  <circle cx="18" cy="8" r="2"/>
  <circle cx="20" cy="16" r="2"/>
  <path d="M9 10l-5 9h16l-2-6"/>
</svg>
```

### Overview

**H2:** `About Petsense`

**Paragraph 1:**
```
Petsense is an AI-powered behaviour analysis app for dog and cat owners. Point your camera
at your pet and Petsense analyses their body language, vocalisations, and movement patterns
in real time — explaining what your pet is communicating and what you can do about it.
```

**Paragraph 2:**
```
Petsense builds a behaviour history over time, so you can track changes, spot patterns,
and share insights with your vet. Breed-aware analysis means the guidance is specific to
your pet's breed and typical behavioural tendencies.
```

**Stats panel:**
| Value | Label |
|-------|-------|
| Real-Time | Behaviour Analysis |
| Dogs + Cats | Supported |
| Breed-Aware | AI Models |
| History | Behaviour Tracking |

### Features Grid (5 features)

1. **Real-Time Behaviour Analysis**
   Description: `Point your camera at your pet and receive instant AI analysis of their body language, posture, and behaviour signals. Know what your pet is trying to tell you.`

2. **Dog and Cat Support**
   Description: `Dedicated AI models for dogs and cats, trained on thousands of behaviour examples. Species-specific analysis means more accurate, relevant insights.`

3. **Behaviour History**
   Description: `Build a timeline of your pet's behaviour over days, weeks, and months. Identify patterns, triggers, and changes to share with your vet or behaviourist.`

4. **Actionable Guidance**
   Description: `Every analysis comes with specific, practical guidance. Not just "your dog is anxious" — but what to do about it, right now.`

5. **Breed Awareness**
   Description: `Petsense knows that a Greyhound's body language differs from a Labrador's. Breed-specific context makes the analysis more accurate and the guidance more relevant.`

### No compliance section for Petsense — omit entirely.

### CTA Section

- **H2:** `Finally understand your pet`
- **Body:** `Download Petsense and start having a two-way relationship with your dog or cat — powered by AI.`
- **Primary CTA:** `Visit petsenseapp.com`
- **Secondary CTA:** `Contact Us`

### Acceptance Criteria

- [ ] All 5 features render with correct names and descriptions
- [ ] Stats panel shows 4 stats
- [ ] petsenseapp.com links correctly
- [ ] No compliance section (omitted correctly)
- [ ] `<body>` class is `product-theme--petsense`
- [ ] Stagger animation on feature grid

### Dependencies

- **Blocked by:** WEB-20
- **Parallelisable with:** WEB-21, WEB-22, WEB-23
