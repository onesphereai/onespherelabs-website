# OneSphere Labs Website Redesign — Ticket Specifications
## Part 5: Sprint 4 — Homepage Redesign (WEB-17, WEB-18, WEB-19)

---

## WEB-17 — Redesign Hero Section

### Technical Specification

**File to modify:** `/index.html`
**CSS file to create/modify:** `/css/home.css`

Replace the entire `<section id="home" class="hero">` block with the following.

---

### Hero HTML

```html
<!-- Hero Section -->
<section id="home" class="hero" aria-labelledby="hero-heading">
  <div class="container">
    <div class="hero-inner">

      <!-- Left: Copy -->
      <div class="hero-copy animate-on-scroll">
        <div class="hero-eyebrow">Australian AI Product Studio</div>
        <h1 id="hero-heading" class="hero-title">
          We Build AI Products That
          <span class="gradient-text">Actually Ship</span>
        </h1>
        <p class="hero-description">
          OneSphere Labs creates focused, production-grade AI products for healthcare,
          compliance, parenting, and pet care. Four products. Real users. Built in Australia.
        </p>
        <div class="hero-actions">
          <a href="#products" class="btn btn-primary hero-cta">
            See Our Products
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2.5"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
          <a href="/contact/" class="btn btn-secondary">
            Get in Touch
          </a>
        </div>
      </div>

      <!-- Right: Visual product grid teaser -->
      <div class="hero-visual animate-on-scroll" style="transition-delay: 150ms;">
        <div class="hero-product-pills">
          <div class="hero-pill">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.5"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
            Maeda Health
          </div>
          <div class="hero-pill">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.5"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Vigility
          </div>
          <div class="hero-pill">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.5"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            Attune
          </div>
          <div class="hero-pill">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.5"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/>
              <circle cx="20" cy="16" r="2"/><path d="M9 10l-5 9h16l-2-6"/>
            </svg>
            Petsense
          </div>
        </div>
        <div class="hero-stat-grid">
          <div class="hero-stat">
            <span class="hero-stat-number">4</span>
            <span class="hero-stat-label">Live AI Products</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-number">AU</span>
            <span class="hero-stat-label">Built &amp; Hosted</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-number">APP</span>
            <span class="hero-stat-label">Compliant</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
```

---

### Hero CSS (add to `/css/home.css`)

```css
/* =============================================================
   Homepage Styles
   Depends on: tokens.css, base.css, nav.css, footer.css
   ============================================================= */

/* Body offset for fixed nav (72px height) */
body {
  padding-top: 72px;
}

@media (min-width: 1440px) {
  body {
    padding-top: 80px;
  }
}

/* ─── HERO ──────────────────────────────────────────────── */

.hero {
  min-height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  background: linear-gradient(
    135deg,
    var(--color-bg) 0%,
    var(--color-bg-alt) 60%,
    rgba(37, 99, 235, 0.04) 100%
  );
  padding-block: var(--space-24) var(--space-16);
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

/* Left column */
.hero-copy {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  background: rgba(37, 99, 235, 0.08);
  color: var(--color-primary);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-full);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  width: fit-content;
  border: 1px solid rgba(37, 99, 235, 0.2);
}

.hero-title {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-bold);
  line-height: 1.1;
  color: var(--color-text-primary);
}

@media (max-width: 1023px) {
  .hero-title {
    font-size: var(--text-2xl);
  }
}

@media (max-width: 767px) {
  .hero-title {
    font-size: 2.25rem;
  }
}

.hero-description {
  font-size: var(--text-md);
  color: var(--color-text-secondary);
  line-height: var(--line-height-body);
  max-width: 520px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  align-items: center;
}

.hero-cta {
  font-size: var(--text-md);
  padding: var(--space-4) var(--space-8);
}

/* Right column — visual */
.hero-visual {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding: var(--space-8);
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

/* Product pills */
.hero-product-pills {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.hero-pill {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  transition: background-color var(--transition-fast), border-color var(--transition-fast);
}

.hero-pill svg {
  color: var(--color-primary);
  flex-shrink: 0;
}

/* Stats row */
.hero-stat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
}

.hero-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  text-align: center;
}

.hero-stat-number {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  line-height: 1;
}

.hero-stat-label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  text-align: center;
  line-height: 1.3;
}

/* ── Responsive ── */
@media (max-width: 1023px) {
  .hero {
    padding-block: var(--space-16) var(--space-12);
  }
  .hero-inner {
    grid-template-columns: 1fr;
    gap: var(--space-12);
  }
  .hero-visual {
    max-width: 480px;
    margin-inline: auto;
    width: 100%;
  }
}

@media (max-width: 767px) {
  .hero {
    min-height: auto;
    padding-block: var(--space-12) var(--space-8);
  }
  .hero-stat-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .hero-pill {
    padding: var(--space-2) var(--space-3);
  }
}
```

### Interaction States

| Element | Default | Hover | Focus |
|---------|---------|-------|-------|
| `.btn-primary` (See Products) | Blue fill | Darker blue + shadow | 3px blue ring |
| `.btn-secondary` (Get in Touch) | Blue outline | Blue fill + white text | 3px blue ring |
| `.hero-pill` | Gray bg, gray border | No hover effect (static display) | N/A |

### Animation

- `.hero-copy`: `animate-on-scroll` → fade up 24px, 300ms ease-out, 0ms delay
- `.hero-visual`: `animate-on-scroll` → fade up 24px, 300ms ease-out, 150ms delay
- Both respect `prefers-reduced-motion`

### Acceptance Criteria

- [ ] Hero heading reads "We Build AI Products That Actually Ship"
- [ ] Eyebrow reads "Australian AI Product Studio"
- [ ] No references to "services company" or "IT services"
- [ ] "See Our Products" button scrolls to `#products` section
- [ ] "Get in Touch" button links to `/contact/`
- [ ] Hero visual shows 4 product pills with correct product names
- [ ] Stat grid shows: "4 Live AI Products", "AU Built & Hosted", "APP Compliant"
- [ ] Two-column layout at 1024px+; stacked at <1024px
- [ ] Hero fills viewport height on desktop
- [ ] Scroll animations fire correctly; prefers-reduced-motion disables them
- [ ] Lighthouse Performance score not degraded by new CSS

### Dependencies

- **Blocked by:** WEB-15 (nav), WEB-16 (footer), WEB-13, WEB-14
- **Unblocks:** WEB-18

---

## WEB-18 — Build 4-Product Portfolio Grid

### Technical Specification

**File to modify:** `/index.html`
**CSS file:** `/css/home.css` (append to existing)

Replace the entire `<section id="products" class="products">` block.

---

### Products Section HTML

```html
<!-- Products Section -->
<section id="products" class="products-section" aria-labelledby="products-heading">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="products-heading">Our Products</h2>
      <p>Four production-ready AI products built for real Australian users.</p>
    </div>

    <!-- Bento Grid -->
    <div class="products-bento stagger-children">

      <!-- Featured card: Maeda Health (spans 2 columns) -->
      <article class="product-card product-card--featured animate-on-scroll"
               aria-labelledby="card-maeda-heading">
        <div class="product-card-inner">
          <div class="product-card-header">
            <div class="product-icon product-icon--maeda" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="1.5"
                   stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <div class="product-badge">Healthcare</div>
          </div>
          <h3 id="card-maeda-heading" class="product-title">Maeda Health</h3>
          <p class="product-description">
            AI-powered clinical assistant for Australian doctors. Medical Scribe in 5 languages,
            MBS Billing, Post-Consultation Forms, Specialist Referral Search, and full APP compliance
            with Sydney data residency.
          </p>
          <ul class="product-features-list" aria-label="Key features">
            <li>Clinical Assistant &amp; Medical Scribe</li>
            <li>MBS Billing Automation</li>
            <li>14+ Post-Consultation Forms</li>
            <li>APP Compliant · Sydney Data Residency</li>
          </ul>
          <div class="product-card-footer">
            <a href="/products/maeda-health/" class="btn btn-primary">
              Learn More
            </a>
            <a href="https://maedahealth.com" class="btn btn-secondary"
               target="_blank" rel="noopener noreferrer">
              Visit maedahealth.com
            </a>
          </div>
        </div>
      </article>

      <!-- Vigility -->
      <article class="product-card animate-on-scroll"
               aria-labelledby="card-vigility-heading">
        <div class="product-card-inner">
          <div class="product-card-header">
            <div class="product-icon product-icon--vigility" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="1.5"
                   stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div class="product-badge">Compliance</div>
          </div>
          <h3 id="card-vigility-heading" class="product-title">Vigility</h3>
          <p class="product-description">
            Compliance automation for RTOs, NDIS providers, and aged care.
            Automated evidence classification, one-click audit packs, and live compliance scoring.
          </p>
          <div class="product-card-footer">
            <a href="/products/vigility/" class="btn btn-primary">Learn More</a>
          </div>
        </div>
      </article>

      <!-- Attune -->
      <article class="product-card animate-on-scroll"
               aria-labelledby="card-attune-heading">
        <div class="product-card-inner">
          <div class="product-card-header">
            <div class="product-icon product-icon--attune" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="1.5"
                   stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <div class="product-badge">Parenting</div>
          </div>
          <h3 id="card-attune-heading" class="product-title">Attune</h3>
          <p class="product-description">
            AI parenting coach for neurodivergent children. Live Mode dual-camera,
            neuro-affirming language engine. Patent filed. iOS &amp; Android.
          </p>
          <div class="product-card-footer">
            <a href="/products/attune/" class="btn btn-primary">Learn More</a>
          </div>
        </div>
      </article>

      <!-- Petsense -->
      <article class="product-card animate-on-scroll"
               aria-labelledby="card-petsense-heading">
        <div class="product-card-inner">
          <div class="product-card-header">
            <div class="product-icon product-icon--petsense" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="1.5"
                   stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/>
                <circle cx="20" cy="16" r="2"/><path d="M9 10l-5 9h16l-2-6"/>
              </svg>
            </div>
            <div class="product-badge">Pet Care</div>
          </div>
          <h3 id="card-petsense-heading" class="product-title">Petsense</h3>
          <p class="product-description">
            Real-time AI behaviour analysis for dogs and cats.
            Breed-aware guidance, behaviour history, and actionable insights.
          </p>
          <div class="product-card-footer">
            <a href="/products/petsense/" class="btn btn-primary">Learn More</a>
          </div>
        </div>
      </article>

    </div><!-- /.products-bento -->
  </div>
</section>
```

---

### Products CSS (append to `/css/home.css`)

```css
/* ─── PRODUCTS SECTION ──────────────────────────────────── */

.products-section {
  padding-block: var(--space-24);
  background-color: var(--color-bg-alt);
}

/* Bento grid */
.products-bento {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: var(--space-6);
}

/* Featured card spans first 2 columns */
.product-card--featured {
  grid-column: span 2;
}

/* Base card */
.product-card {
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.product-card:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-hover);
}

@media (prefers-reduced-motion: reduce) {
  .product-card:hover {
    transform: none;
  }
}

.product-card-inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-8);
  height: 100%;
}

/* Card header row */
.product-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Icon */
.product-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
}

.product-icon--maeda  { background: rgba(5, 150, 105, 0.1);  color: #059669; }
.product-icon--vigility{ background: rgba(37, 99, 235, 0.1); color: #2563EB; }
.product-icon--attune { background: rgba(249, 115, 22, 0.1); color: #F97316; }
.product-icon--petsense{ background: rgba(139, 92, 246, 0.1);color: #7C3AED; }

/* Badge */
.product-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px var(--space-3);
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

/* Title */
.product-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: var(--line-height-heading);
}

/* Description */
.product-description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-body);
}

/* Features list (featured card only) */
.product-features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.product-features-list li {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  padding-left: var(--space-5);
  position: relative;
}

.product-features-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
}

/* Footer row */
.product-card-footer {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: auto;
  padding-top: var(--space-4);
}

/* ── Responsive ── */
@media (max-width: 1023px) {
  .products-bento {
    grid-template-columns: 1fr 1fr;
  }
  .product-card--featured {
    grid-column: span 2;
  }
}

@media (max-width: 767px) {
  .products-bento {
    grid-template-columns: 1fr;
  }
  .product-card--featured {
    grid-column: span 1;
  }
  .product-card-inner {
    padding: var(--space-6);
  }
}
```

### Wireframe

```
Desktop (1024px+): 3-column bento
┌───────────────────────────────────┬──────────────────┐
│  Maeda Health (featured, 2 cols)  │   Vigility       │
│  [icon]           [Healthcare]    │   [icon][badge]  │
│  Title                            │   Title          │
│  Description...                   │   Description    │
│  • Feature 1                      │   [Learn More]   │
│  • Feature 2                      │                  │
│  [Learn More] [Visit site]        ├──────────────────┤
│                                   │   Attune         │
├───────────────────────────────────┤   [icon][badge]  │
│                            Petsense│   Title          │
│  [icon][badge] Title               │   Description    │
│  Description  [Learn More]         │   [Learn More]   │
└───────────────────────────────────┴──────────────────┘

Tablet (768–1023px): 2-column
┌──────────────────────────────────────────────┐
│  Maeda Health (spans both columns)           │
├─────────────────────┬────────────────────────┤
│  Vigility           │  Attune                │
├─────────────────────┴────────────────────────┤
│  Petsense (full width)                       │
└──────────────────────────────────────────────┘

Mobile (<768px): single column stack
```

### Acceptance Criteria

- [ ] All four real products appear: Maeda Health, Vigility, Attune, Petsense
- [ ] No fake products (AutoFlow AI, TechSphere Dashboard) present
- [ ] Maeda Health card spans 2 columns on desktop/tablet
- [ ] All product descriptions are factually accurate per product context above
- [ ] Each card has "Learn More" linking to the correct product page path
- [ ] Maeda Health card additionally has "Visit maedahealth.com" external link
- [ ] Card hover: `scale(1.02)` + elevated shadow, 200ms ease-out
- [ ] Hover animation disabled when `prefers-reduced-motion` is set
- [ ] Stagger animation fires 50ms apart per card
- [ ] Grid collapses correctly at 768px and 375px

### Dependencies

- **Blocked by:** WEB-17 (hero must be done first — same file edit, avoid conflicts)
- **Unblocks:** WEB-19

---

## WEB-19 — Add Trust Strip and Update Homepage SEO

### Technical Specification

**File to modify:** `/index.html`

#### Trust Strip HTML

Add between hero section and products section:

```html
<!-- Trust Strip -->
<section class="trust-strip" aria-label="Key facts about OneSphere Labs">
  <div class="container">
    <ul class="trust-items stagger-children" role="list">
      <li class="trust-item animate-on-scroll">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.5"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <span>Built &amp; hosted in Australia</span>
      </li>
      <li class="trust-item animate-on-scroll" style="transition-delay: 50ms;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.5"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        <span>APP compliant · Privacy Act 1988</span>
      </li>
      <li class="trust-item animate-on-scroll" style="transition-delay: 100ms;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.5"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
        <span>Sydney data residency for health data</span>
      </li>
      <li class="trust-item animate-on-scroll" style="transition-delay: 150ms;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.5"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        <span>4 production products · shipped</span>
      </li>
      <li class="trust-item animate-on-scroll" style="transition-delay: 200ms;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.5"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <span>Patent filed · Attune neuro-affirming AI</span>
      </li>
    </ul>
  </div>
</section>
```

#### Trust Strip CSS (append to `/css/home.css`)

```css
/* ─── TRUST STRIP ───────────────────────────────────────── */

.trust-strip {
  background: var(--color-card-bg);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding-block: var(--space-6);
}

.trust-items {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-8);
  list-style: none;
  padding: 0;
  margin: 0;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.trust-item svg {
  color: var(--color-primary);
  flex-shrink: 0;
}

@media (max-width: 767px) {
  .trust-items {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-4);
  }
  .trust-item {
    white-space: normal;
  }
}
```

---

#### SEO Updates to `<head>` in `/index.html`

**Replace `<title>`:**
```html
<title>OneSphere Labs — Australian AI Product Studio</title>
```

**Replace `<meta name="description">`:**
```html
<meta name="description" content="OneSphere Labs is an Australian AI product studio. We build production-grade AI products: Maeda Health for doctors, Vigility for compliance, Attune for neurodivergent parenting, and Petsense for pet care.">
```

**Replace `<meta name="keywords">`:**
```html
<meta name="keywords" content="OneSphere Labs, Australian AI, Maeda Health, Vigility, Attune, Petsense, AI product studio, healthcare AI Australia, compliance automation, neurodivergent parenting app">
```

**Replace OG tags:**
```html
<meta property="og:title" content="OneSphere Labs — Australian AI Product Studio">
<meta property="og:description" content="Building production-grade AI products for healthcare, compliance, parenting, and pet care. Made in Australia.">
<meta property="og:url" content="https://onespherelabs.com.au">
```

**Replace Twitter card tags:**
```html
<meta name="twitter:title" content="OneSphere Labs — Australian AI Product Studio">
<meta name="twitter:description" content="Building production-grade AI products for healthcare, compliance, parenting, and pet care. Made in Australia.">
```

**Update JSON-LD structured data — replace `serviceType` array:**
```json
"serviceType": [
  "AI Product Studio",
  "Healthcare AI",
  "Compliance Automation",
  "Parenting Technology",
  "Pet Care Technology"
]
```

**Add `foundingDate` and remove incorrect description:**
```json
"description": "OneSphere Labs is an Australian AI product studio building production-grade AI products including Maeda Health, Vigility, Attune, and Petsense.",
"foundingDate": "2024"
```

### Acceptance Criteria

- [ ] Trust strip appears between hero and products sections
- [ ] Trust strip contains 5 factually accurate items
- [ ] All 5 items reference real attributes (APP compliant, Sydney data residency, patent filed, etc.)
- [ ] `<title>` reads "OneSphere Labs — Australian AI Product Studio"
- [ ] `<meta description>` is 155 characters or fewer and mentions all 4 products
- [ ] OG `og:title` and `og:description` updated
- [ ] JSON-LD no longer describes a services company
- [ ] No "HIPAA" anywhere in page (confirmed per WEB-10)
- [ ] Trust strip is responsive: horizontal on desktop, vertical on mobile
- [ ] Trust strip items are WCAG AA contrast compliant

### Dependencies

- **Blocked by:** WEB-18 (products grid before trust strip — correct DOM order)
- **Unblocks:** Sprint 5 (product pages)
