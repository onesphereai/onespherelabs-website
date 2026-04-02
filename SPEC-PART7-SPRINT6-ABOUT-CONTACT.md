# OneSphere Labs Website Redesign — Ticket Specifications
## Part 7: Sprint 6 — About & Contact Pages (WEB-25, WEB-26)

---

## WEB-25 — Build About Page

**File to create:** `/about/index.html`
**CSS:** Uses `product-page.css` for layout primitives; add about-specific rules inline or in a `<style>` block within the page.

### Head

```html
<title>About Us — OneSphere Labs · Australian AI Product Studio</title>
<meta name="description" content="OneSphere Labs is an Australian AI product studio. We build focused, production-grade AI products for healthcare, compliance, parenting, and pet care.">
<link rel="canonical" href="https://onespherelabs.com.au/about/">
```

---

### Page Structure

```
[nav]
├── .about-hero        (studio intro)
├── .about-mission     (what we believe)
├── .about-products    (product roster — brief)
├── .about-cta         (contact prompt)
[footer]
```

---

### About Hero HTML

```html
<section class="about-hero" aria-labelledby="about-hero-heading">
  <div class="container">
    <div class="about-hero-inner">
      <div class="about-hero-copy animate-on-scroll">
        <nav class="product-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span class="product-breadcrumb-sep" aria-hidden="true">/</span>
          <span aria-current="page">About</span>
        </nav>
        <div class="about-eyebrow">Australian AI Product Studio</div>
        <h1 id="about-hero-heading" class="about-hero-title">
          We build AI products that make a
          <span class="gradient-text">real difference</span>
        </h1>
        <p class="about-hero-description">
          OneSphere Labs is a small, focused team building production-grade AI products
          for Australian users. No consulting. No vaporware. We ship products that work
          in the real world.
        </p>
      </div>

      <div class="about-hero-stats animate-on-scroll" style="transition-delay: 150ms;">
        <div class="about-stat">
          <span class="about-stat-number">4</span>
          <span class="about-stat-label">Production Products</span>
        </div>
        <div class="about-stat">
          <span class="about-stat-number">AU</span>
          <span class="about-stat-label">Built &amp; hosted in Australia</span>
        </div>
        <div class="about-stat">
          <span class="about-stat-number">2024</span>
          <span class="about-stat-label">Founded</span>
        </div>
        <div class="about-stat">
          <span class="about-stat-number">APP</span>
          <span class="about-stat-label">Compliant across all products</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

### About Hero CSS (inline or in `<style>`)

```css
body { padding-top: 72px; }

.about-hero {
  padding-block: var(--space-24) var(--space-16);
  background: linear-gradient(135deg, var(--color-bg) 0%, var(--color-bg-alt) 100%);
  border-bottom: 1px solid var(--color-border);
}

.about-hero-inner {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: var(--space-16);
  align-items: center;
}

.about-eyebrow {
  display: inline-flex;
  padding: var(--space-1) var(--space-3);
  background: rgba(37, 99, 235, 0.08);
  color: var(--color-primary);
  font-size: var(--text-xs);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-full);
  border: 1px solid rgba(37, 99, 235, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: var(--space-4);
}

.about-hero-title {
  font-size: var(--text-3xl);
  line-height: 1.1;
  margin-bottom: var(--space-6);
}

.about-hero-description {
  font-size: var(--text-md);
  color: var(--color-text-secondary);
  line-height: var(--line-height-body);
}

/* Stats grid (right column) */
.about-hero-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  padding: var(--space-8);
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.about-stat {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-1);
  padding: var(--space-4);
  background: var(--color-bg-alt);
  border-radius: var(--radius-md);
}

.about-stat-number {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  line-height: 1;
}

.about-stat-label {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  line-height: 1.4;
}

@media (max-width: 1023px) {
  .about-hero-inner { grid-template-columns: 1fr; gap: var(--space-10); }
  .about-hero-title { font-size: var(--text-2xl); }
}

@media (max-width: 767px) {
  .about-hero-title { font-size: 1.75rem; }
  .about-hero-stats { grid-template-columns: 1fr 1fr; }
}
```

---

### Mission Section HTML

```html
<section class="about-mission" aria-labelledby="mission-heading">
  <div class="container">
    <div class="about-mission-inner animate-on-scroll">
      <h2 id="mission-heading">What we believe</h2>
      <div class="mission-grid stagger-children">

        <div class="mission-item animate-on-scroll">
          <div class="mission-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.5"
                 stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 11 12 14 22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
          </div>
          <h3>Ship, don't pitch</h3>
          <p>We build things that work and put them in front of real users. We don't spend years in stealth mode.</p>
        </div>

        <div class="mission-item animate-on-scroll" style="transition-delay: 50ms;">
          <div class="mission-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.5"
                 stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>
          <h3>Australian by design</h3>
          <p>Our products are built for Australian regulations, users, and infrastructure. Not adapted from overseas tools — designed from day one for Australia.</p>
        </div>

        <div class="mission-item animate-on-scroll" style="transition-delay: 100ms;">
          <div class="mission-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.5"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h3>Focus on the user, not the feature list</h3>
          <p>Every feature in every product exists because a real user needed it. We don't add things to make a slide deck look impressive.</p>
        </div>

        <div class="mission-item animate-on-scroll" style="transition-delay: 150ms;">
          <div class="mission-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.5"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h3>Privacy is non-negotiable</h3>
          <p>We operate under the Privacy Act 1988 (Cth) and the Australian Privacy Principles. Your data stays in Australia.</p>
        </div>

      </div>
    </div>
  </div>
</section>
```

### Mission CSS

```css
.about-mission {
  padding-block: var(--space-24);
  background: var(--color-card-bg);
}

.about-mission-inner h2 {
  font-size: var(--text-2xl);
  text-align: center;
  margin-bottom: var(--space-12);
}

.mission-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-8);
}

.mission-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-8);
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.mission-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: rgba(37, 99, 235, 0.08);
  color: var(--color-primary);
}

.mission-item h3 {
  font-size: var(--text-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.mission-item p {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-body);
}

@media (max-width: 767px) {
  .mission-grid { grid-template-columns: 1fr; }
}
```

---

### Products Roster Section

```html
<section class="about-products" aria-labelledby="about-products-heading">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="about-products-heading">Our Products</h2>
      <p>Each product is a focused solution to a real problem for Australian users.</p>
    </div>
    <div class="about-product-list stagger-children">

      <a href="/products/maeda-health/" class="about-product-row animate-on-scroll">
        <div class="apr-icon product-theme--maeda">
          <!-- waveform SVG 24x24 -->
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        </div>
        <div class="apr-content">
          <strong>Maeda Health</strong>
          <span>AI clinical assistant for Australian doctors · maedahealth.com</span>
        </div>
        <svg class="apr-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>

      <a href="/products/vigility/" class="about-product-row animate-on-scroll" style="transition-delay: 50ms;">
        <div class="apr-icon product-theme--vigility">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div class="apr-content">
          <strong>Vigility</strong>
          <span>Compliance automation for RTOs, NDIS, aged care · vigility.com.au</span>
        </div>
        <svg class="apr-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>

      <a href="/products/attune/" class="about-product-row animate-on-scroll" style="transition-delay: 100ms;">
        <div class="apr-icon product-theme--attune">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </div>
        <div class="apr-content">
          <strong>Attune</strong>
          <span>AI parenting coach for neurodivergent children · attuneapp.com</span>
        </div>
        <svg class="apr-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>

      <a href="/products/petsense/" class="about-product-row animate-on-scroll" style="transition-delay: 150ms;">
        <div class="apr-icon product-theme--petsense">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10l-5 9h16l-2-6"/></svg>
        </div>
        <div class="apr-content">
          <strong>Petsense</strong>
          <span>AI pet behaviour analysis for dogs and cats · petsenseapp.com</span>
        </div>
        <svg class="apr-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>

    </div>
  </div>
</section>
```

### Products Roster CSS

```css
.about-products {
  padding-block: var(--space-24);
  background: var(--color-bg-alt);
}

.about-product-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-top: var(--space-12);
}

.about-product-row {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding: var(--space-6) var(--space-8);
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: transform var(--transition-base), box-shadow var(--transition-base),
              border-color var(--transition-base);
}

.about-product-row:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary);
}

@media (prefers-reduced-motion: reduce) {
  .about-product-row:hover { transform: none; }
}

.about-product-row:focus-visible {
  outline: 3px solid var(--color-ring);
  outline-offset: 2px;
}

.apr-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

/* Reuse product theme colour rules from product-page.css */
.apr-icon.product-theme--maeda   { background: rgba(5, 150, 105, 0.1);  color: #059669; }
.apr-icon.product-theme--vigility { background: rgba(37, 99, 235, 0.1); color: #2563EB; }
.apr-icon.product-theme--attune  { background: rgba(249, 115, 22, 0.1); color: #F97316; }
.apr-icon.product-theme--petsense { background: rgba(124, 58, 237, 0.1);color: #7C3AED; }

.apr-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.apr-content strong {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.apr-content span {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

.apr-arrow {
  color: var(--color-text-secondary);
  flex-shrink: 0;
  transition: color var(--transition-fast);
}

.about-product-row:hover .apr-arrow {
  color: var(--color-primary);
}

@media (max-width: 767px) {
  .about-product-row {
    padding: var(--space-4) var(--space-6);
    gap: var(--space-4);
  }
}
```

---

### About CTA Section

```html
<section class="about-cta" aria-labelledby="about-cta-heading">
  <div class="container">
    <div class="about-cta-inner animate-on-scroll">
      <h2 id="about-cta-heading">Want to work with us?</h2>
      <p>
        We're always interested in talking to people who are passionate about building AI products
        that make a real difference for Australian users.
      </p>
      <a href="/contact/" class="btn btn-primary">Get in Touch</a>
    </div>
  </div>
</section>
```

### About CTA CSS

```css
.about-cta {
  padding-block: var(--space-24);
  background: var(--color-card-bg);
  text-align: center;
}

.about-cta-inner {
  max-width: 640px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
}

.about-cta-inner h2 {
  font-size: var(--text-2xl);
}

.about-cta-inner p {
  font-size: var(--text-md);
  color: var(--color-text-secondary);
}
```

### Acceptance Criteria

- [ ] About page renders at `/about/`
- [ ] Page correctly describes OneSphere Labs as an AI product studio (not services company)
- [ ] Four stat items in hero: 4 products, AU, 2024, APP
- [ ] Mission section has 4 belief items with correct copy
- [ ] Products roster lists all 4 products with correct links to product pages
- [ ] Products roster hover: translate-X 4px + blue border
- [ ] "Get in Touch" links to `/contact/`
- [ ] Breadcrumb: Home / About with `aria-current="page"` on About
- [ ] All scroll animations fire; prefers-reduced-motion disables them
- [ ] No "services company" language anywhere on the page
- [ ] Axe DevTools: 0 critical violations

### Dependencies

- **Blocked by:** WEB-15 (nav), WEB-16 (footer), WEB-14 (folder structure)
- **Parallelisable with:** WEB-26

---

## WEB-26 — Build Contact Page

**File to create:** `/contact/index.html`

### Head

```html
<title>Contact — OneSphere Labs</title>
<meta name="description" content="Get in touch with OneSphere Labs. Whether you're interested in Maeda Health, Vigility, Attune, or Petsense — we'd love to hear from you.">
<link rel="canonical" href="https://onespherelabs.com.au/contact/">
```

---

### Contact Page HTML (full `<main>` content)

```html
<main id="main-content">
  <section class="contact-hero" aria-labelledby="contact-heading">
    <div class="container">
      <div class="contact-hero-inner">

        <!-- Left: Info -->
        <div class="contact-info animate-on-scroll">
          <nav class="product-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span class="product-breadcrumb-sep" aria-hidden="true">/</span>
            <span aria-current="page">Contact</span>
          </nav>
          <h1 id="contact-heading">Get in Touch</h1>
          <p class="contact-intro">
            Whether you're a GP exploring Maeda Health, an RTO investigating Vigility,
            a parent curious about Attune, or a pet owner interested in Petsense —
            we'd love to hear from you.
          </p>

          <div class="contact-details">
            <div class="contact-detail-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="1.5"
                   stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <a href="mailto:contact@onespherelabs.com.au">contact@onespherelabs.com.au</a>
            </div>
            <div class="contact-detail-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="1.5"
                   stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Sydney, Australia</span>
            </div>
            <div class="contact-detail-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="1.5"
                   stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
              <a href="https://linkedin.com/company/onespherelabs"
                 target="_blank" rel="noopener noreferrer">
                linkedin.com/company/onespherelabs
              </a>
            </div>
          </div>
        </div>

        <!-- Right: Form -->
        <div class="contact-form-wrapper animate-on-scroll" style="transition-delay: 150ms;">
          <form
            id="contactForm"
            class="contact-form"
            action="https://formsubmit.co/3e2b08b13fd6229c192c7c6f8c811867"
            method="POST"
            novalidate
            aria-label="Contact form"
          >
            <!-- FormSubmit config -->
            <input type="hidden" name="_subject" value="New Enquiry — OneSphere Labs">
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="_template" value="table">
            <!-- NO _next redirect — FormSubmit default confirmation is acceptable -->

            <div class="form-group">
              <label for="contact-name" class="form-label">Full Name <span aria-hidden="true">*</span></label>
              <input
                type="text"
                id="contact-name"
                name="name"
                class="form-input"
                placeholder="Jane Smith"
                required
                autocomplete="name"
                aria-required="true"
              >
              <span class="form-error" id="name-error" role="alert" aria-live="polite"></span>
            </div>

            <div class="form-group">
              <label for="contact-email" class="form-label">Email Address <span aria-hidden="true">*</span></label>
              <input
                type="email"
                id="contact-email"
                name="email"
                class="form-input"
                placeholder="jane@example.com.au"
                required
                autocomplete="email"
                aria-required="true"
              >
              <span class="form-error" id="email-error" role="alert" aria-live="polite"></span>
            </div>

            <div class="form-group">
              <label for="contact-organisation" class="form-label">Organisation</label>
              <input
                type="text"
                id="contact-organisation"
                name="organisation"
                class="form-input"
                placeholder="Your practice, company, or organisation"
                autocomplete="organization"
              >
            </div>

            <div class="form-group">
              <label for="contact-product" class="form-label">Product Interest <span aria-hidden="true">*</span></label>
              <select
                id="contact-product"
                name="product_interest"
                class="form-input form-select"
                required
                aria-required="true"
              >
                <option value="" disabled selected>Select a product or topic</option>
                <option value="Maeda Health">Maeda Health — AI for doctors</option>
                <option value="Vigility">Vigility — Compliance automation</option>
                <option value="Attune">Attune — AI parenting coach</option>
                <option value="Petsense">Petsense — AI pet behaviour</option>
                <option value="General">General enquiry</option>
                <option value="Partnership">Partnership or investment</option>
              </select>
              <span class="form-error" id="product-error" role="alert" aria-live="polite"></span>
            </div>

            <div class="form-group">
              <label for="contact-message" class="form-label">Message <span aria-hidden="true">*</span></label>
              <textarea
                id="contact-message"
                name="message"
                class="form-input form-textarea"
                placeholder="Tell us what you're working on or what you'd like to know..."
                rows="5"
                required
                aria-required="true"
              ></textarea>
              <span class="form-error" id="message-error" role="alert" aria-live="polite"></span>
            </div>

            <button type="submit" class="btn btn-primary form-submit" id="contactSubmitBtn">
              Send Message
            </button>

            <div class="form-success" id="formSuccess" role="status" aria-live="polite" hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2"
                   stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Thank you — we'll be in touch within 24 hours.
            </div>

          </form>
        </div>

      </div>
    </div>
  </section>
</main>
```

---

### Contact Page CSS (inline `<style>` or separate `/css/contact.css`)

```css
body { padding-top: 72px; }

.contact-hero {
  padding-block: var(--space-24);
  min-height: calc(100vh - 72px);
  background: linear-gradient(135deg, var(--color-bg) 0%, var(--color-bg-alt) 100%);
}

.contact-hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: start;
}

/* Left info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding-top: var(--space-4);
}

.contact-info h1 {
  font-size: var(--text-3xl);
  line-height: 1.1;
}

.contact-intro {
  font-size: var(--text-md);
  color: var(--color-text-secondary);
  line-height: var(--line-height-body);
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-6);
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.contact-detail-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.contact-detail-item svg {
  color: var(--color-primary);
  flex-shrink: 0;
}

.contact-detail-item a {
  color: var(--color-primary);
  text-decoration: none;
}

.contact-detail-item a:hover {
  text-decoration: underline;
}

/* Right: form card */
.contact-form-wrapper {
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--space-8);
}

/* Form elements */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-label {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.form-input {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  background: var(--color-bg);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  min-height: 44px;
  width: 100%;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  outline: none;
}

.form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.form-input.is-invalid {
  border-color: var(--color-destructive);
}

.form-input.is-invalid:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-4) center;
  padding-right: var(--space-10);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-error {
  font-size: var(--text-xs);
  color: var(--color-destructive);
  min-height: 1rem;
}

.form-submit {
  width: 100%;
  justify-content: center;
  font-size: var(--text-md);
  padding-block: var(--space-4);
}

.form-success {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background: rgba(5, 150, 105, 0.08);
  border: 1px solid rgba(5, 150, 105, 0.3);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--color-success);
  font-weight: var(--font-weight-medium);
}

/* Responsive */
@media (max-width: 1023px) {
  .contact-hero-inner {
    grid-template-columns: 1fr;
    gap: var(--space-10);
  }
  .contact-info h1 { font-size: var(--text-2xl); }
}

@media (max-width: 767px) {
  .contact-form-wrapper { padding: var(--space-6); }
  .contact-info h1 { font-size: 1.75rem; }
}
```

---

### Contact Form JavaScript (add to `/js/main.js` or inline `<script>` at bottom of page)

```javascript
(function () {
  'use strict';

  const form     = document.getElementById('contactForm');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const successMsg = document.getElementById('formSuccess');
  if (!form) return;

  // Validation rules
  const validators = {
    'contact-name':    { required: true, minLength: 2, errorId: 'name-error',    message: 'Please enter your full name.' },
    'contact-email':   { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, errorId: 'email-error',   message: 'Please enter a valid email address.' },
    'contact-product': { required: true, errorId: 'product-error', message: 'Please select a product or topic.' },
    'contact-message': { required: true, minLength: 10, errorId: 'message-error', message: 'Please enter a message (at least 10 characters).' }
  };

  function validateField(id) {
    const el    = document.getElementById(id);
    const rules = validators[id];
    const errorEl = document.getElementById(rules.errorId);
    const value = el.value.trim();
    let valid = true;

    if (rules.required && !value) { valid = false; }
    if (valid && rules.minLength && value.length < rules.minLength) { valid = false; }
    if (valid && rules.pattern && !rules.pattern.test(value)) { valid = false; }

    if (!valid) {
      el.classList.add('is-invalid');
      el.setAttribute('aria-describedby', rules.errorId);
      if (errorEl) errorEl.textContent = rules.message;
    } else {
      el.classList.remove('is-invalid');
      el.removeAttribute('aria-describedby');
      if (errorEl) errorEl.textContent = '';
    }

    return valid;
  }

  // Real-time validation on blur
  Object.keys(validators).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('blur', () => validateField(id));
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate all fields
    const allValid = Object.keys(validators)
      .map(id => validateField(id))
      .every(Boolean);

    if (!allValid) {
      // Focus first invalid field
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    })
    .then(() => {
      form.reset();
      form.hidden = true;
      successMsg.hidden = false;
      successMsg.focus();
    })
    .catch(() => {
      // FormSubmit delivers email even on fetch "error" due to CORS
      form.reset();
      form.hidden = true;
      successMsg.hidden = false;
      successMsg.focus();
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    });
  });
})();
```

### Acceptance Criteria

- [ ] Contact page renders at `/contact/`
- [ ] Form has 5 fields: Name, Email, Organisation, Product Interest (dropdown), Message
- [ ] Product Interest dropdown has 6 options: 4 products + General + Partnership
- [ ] Name, Email, Product, Message are required; Organisation is optional
- [ ] Validation runs on blur for each required field
- [ ] Validation error messages render below each field with `role="alert"`
- [ ] Submit button shows "Sending…" during submission
- [ ] On success: form hides, success message appears, focus moves to success message
- [ ] No `_next` redirect to Amplify URL (confirmed removed per WEB-9)
- [ ] Contact details show email, location (Sydney, Australia), and LinkedIn
- [ ] Email link `href="mailto:contact@onespherelabs.com.au"` is correct
- [ ] All form inputs have associated `<label>` elements (no placeholder-only labels)
- [ ] Form inputs have min-height 44px (touch target)
- [ ] Breadcrumb: Home / Contact
- [ ] Axe DevTools: 0 critical violations on form

### Dependencies

- **Blocked by:** WEB-15 (nav), WEB-16 (footer), WEB-14
- **Parallelisable with:** WEB-25
