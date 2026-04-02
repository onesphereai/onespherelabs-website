# OneSphere Labs Website Redesign — Ticket Specifications
## Part 2: Sprint 1 — Critical Fixes (WEB-7 through WEB-12)

---

## WEB-7 — Fix Duplicate Services Nav Link

### Technical Specification

**File to modify:** `/index.html`

**Problem:** The `<ul class="nav-menu">` contains two `<li>` elements linking to `#services` with the text "Services" (lines 129–130 and 134–136 in current file).

**Fix — remove the second occurrence:**

Current code (lines 128–143):
```html
<li class="nav-item">
    <a href="#services" class="nav-link">Services</a>
</li>
<li class="nav-item">
    <a href="#about" class="nav-link">About</a>
</li>
<li class="nav-item">
    <a href="#services" class="nav-link">Services</a>   <!-- DELETE THIS LI -->
</li>
<li class="nav-item">
    <a href="#products" class="nav-link">Products &amp; Demo</a>
</li>
<li class="nav-item">
    <a href="#contact" class="nav-link">Contact</a>
</li>
```

After fix:
```html
<li class="nav-item">
    <a href="#services" class="nav-link">Services</a>
</li>
<li class="nav-item">
    <a href="#about" class="nav-link">About</a>
</li>
<li class="nav-item">
    <a href="#products" class="nav-link">Products &amp; Demo</a>
</li>
<li class="nav-item">
    <a href="#contact" class="nav-link">Contact</a>
</li>
```

**No CSS changes required.**
**No JS changes required.**

### UI/UX Specification

- Nav must show exactly 5 links: Home, Services, About, Products & Demo, Contact
- Link order must be preserved as shown above
- No visual change to remaining links

### Acceptance Criteria

- [ ] Nav renders exactly 5 links (not 6) at all viewport widths
- [ ] No two nav links point to the same `href`
- [ ] Clicking "Services" scrolls to `#services` section
- [ ] W3C HTML validator shows no structural errors introduced by this change

### Dependencies

- **Blocked by:** WEB-8 (fix CSS error first so the page renders without errors)
- **Unblocks:** Nothing directly, but Sprint 1 must be fully complete before Sprint 2

---

## WEB-8 — Fix CSS Syntax Error (Stray Closing Brace Line 46)

### Technical Specification

**File to modify:** `/styles.css`

**Problem:** Line 46 in `styles.css` contains a stray `}` that closes the `.navbar` rule block prematurely (there is already a closing brace at line 45). This causes all `.nav-container` and subsequent rules to be parsed as top-level statements rather than within the intended cascade, producing broken layout.

**Current code (lines 35–55):**
```css
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    z-index: 1000;
    padding: 1rem 0;
    transition: all 0.3s ease;
    border-bottom: 1px solid rgba(74, 155, 155, 0.1);
}         /* line 45 — correct closing brace */
}         /* line 46 — STRAY BRACE, DELETE THIS LINE */

.nav-container {
```

**Fix:** Delete line 46 (the second `}` after the `.navbar` block).

**After fix (lines 35–48):**
```css
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    z-index: 1000;
    padding: 1rem 0;
    transition: all 0.3s ease;
    border-bottom: 1px solid rgba(74, 155, 155, 0.1);
}

.nav-container {
```

**Verification:** Run the file through the W3C CSS Validator (https://jigsaw.w3.org/css-validator/) — it must return zero parse errors.

### Acceptance Criteria

- [ ] W3C CSS Validator returns 0 errors for `styles.css`
- [ ] Nav layout is unchanged visually
- [ ] No other CSS rules are broken by the removal

### Dependencies

- **Blocked by:** Nothing — this is the first ticket to execute in Sprint 1
- **Unblocks:** WEB-7, WEB-9, WEB-10, WEB-11, WEB-12 (all Sprint 1 tickets)

---

## WEB-9 — Fix Staging URL in FormSubmit Redirect

### Technical Specification

**File to modify:** `/index.html`

**Problem:** The early access form (line 529 of current `index.html`) contains:
```html
<input type="hidden" name="_next" value="https://dub8fg1x2iiml.amplifyapp.com/early-access-success.html">
```
This exposes an internal AWS Amplify staging URL to the public (it appears in page source) and redirects users to a URL that may not exist or may expose infrastructure details.

**Fix options (choose one):**

**Option A — Remove the redirect entirely (recommended for MVP):**
Delete the entire `<input type="hidden" name="_next" ...>` line. FormSubmit will show its own default thank-you page, which is acceptable until a proper success page is built in WEB-26.

**Option B — Point to production success path:**
```html
<input type="hidden" name="_next" value="https://onespherelabs.com.au/contact/?submitted=true">
```
Use Option B only if `/contact/` page (WEB-26) is already live. Use Option A for Sprint 1.

**Exact edit for Option A:**
Find and delete this line from the early access form section:
```html
<input type="hidden" name="_next" value="https://dub8fg1x2iiml.amplifyapp.com/early-access-success.html">
```

**Also check:** The contact form (line 700–705) already has a comment saying the `_next` redirect was removed. Confirm no `_next` hidden input exists in the contact form block. If one exists, remove it.

### Acceptance Criteria

- [ ] `view-source:https://onespherelabs.com.au` contains no Amplify URL string
- [ ] Early access form submission does not redirect to an Amplify domain
- [ ] Contact form has no `_next` input pointing to a non-production domain
- [ ] Both forms still submit correctly (test with a real submission)

### Dependencies

- **Blocked by:** WEB-8
- **Unblocks:** Nothing directly

---

## WEB-10 — Fix HIPAA → APP Compliance Reference

### Technical Specification

**File to modify:** `/index.html`

**Problem:** Current site references "HIPAA-compliant" in the Smart Med Notes product features list (line 303):
```html
<li><i class="fas fa-check"></i> HIPAA-compliant AI medical documentation</li>
```
HIPAA is a US regulation. OneSphere Labs is Australian. The correct regulation is the **Privacy Act 1988 (Cth)** and the **Australian Privacy Principles (APP)**. Maeda Health operates with APP compliance and Sydney data residency.

**Find all instances:**
```
Search string: HIPAA
```

**All occurrences to replace:**

1. Line 303 in product features list:
   - Before: `HIPAA-compliant AI medical documentation`
   - After: `APP-compliant AI medical documentation`

2. Any occurrence in the demo modal text referencing "HIPAA" — search and replace all.

**Also fix:** The demo modal references "AHPRA-approved standards" (line 442). AHPRA is the Australian Health Practitioner Regulation Agency — this is correct and must NOT be changed.

**Full replacement map:**
| Find | Replace |
|------|---------|
| `HIPAA-compliant` | `APP-compliant` |
| `HIPAA compliant` | `APP compliant` |
| `HIPAA` (standalone) | `APP (Australian Privacy Principles)` |

**Do not change:** AHPRA, RACGP, Medicare — these are correct Australian references.

### Acceptance Criteria

- [ ] The word "HIPAA" does not appear anywhere in `index.html` or `styles.css` or `script.js`
- [ ] The replacement text "APP-compliant" is grammatically correct in context
- [ ] "AHPRA" references remain unchanged
- [ ] Text is factually accurate for Australian healthcare

### Dependencies

- **Blocked by:** WEB-8
- **Unblocks:** Nothing directly

---

## WEB-11 — Remove Fake Products (AutoFlow AI, TechSphere Dashboard)

### Technical Specification

**File to modify:** `/index.html`

**Problem:** The products section (lines 311–335) contains two placeholder product cards for fictional products:
1. "AutoFlow AI" — described as "intelligent workflow automation platform"
2. "TechSphere Dashboard" — described as "IT infrastructure monitoring"

Neither product exists. These create false impressions about the company's portfolio.

**Remove entire HTML blocks for both cards.** The Smart Med Notes card (soon to be renamed Maeda Health in WEB-12) must remain.

**Delete this entire block (AutoFlow AI):**
```html
<!-- Placeholder for future products -->
<div class="product-card coming-soon">
    <div class="product-icon">
        <i class="fas fa-robot"></i>
    </div>
    <h3>AutoFlow AI</h3>
    <p>Intelligent workflow automation platform for streamlining business processes and improving operational efficiency.</p>
    <div class="coming-soon-badge">Coming Soon</div>
    <button class="btn btn-secondary" disabled>
        <i class="fas fa-clock"></i> In Development
    </button>
</div>
```

**Delete this entire block (TechSphere Dashboard):**
```html
<div class="product-card coming-soon">
    <div class="product-icon">
        <i class="fas fa-chart-line"></i>
    </div>
    <h3>TechSphere Dashboard</h3>
    <p>Comprehensive IT infrastructure monitoring and management solution with real-time analytics and alerts.</p>
    <div class="coming-soon-badge">Coming Soon</div>
    <button class="btn btn-secondary" disabled>
        <i class="fas fa-clock"></i> In Development
    </button>
</div>
```

**After deletion:** The `.products-grid` should contain exactly one product card (Smart Med Notes / Maeda Health). The grid CSS may need a temporary override to prevent a single card stretching awkwardly:

```css
/* Temporary until WEB-18 replaces this section entirely */
.products-grid {
    display: grid;
    grid-template-columns: 1fr;
    max-width: 600px;
    margin: 0 auto;
}
```

Add this as an inline `<style>` comment block or at the bottom of `styles.css`, clearly marked `/* TEMPORARY — remove when WEB-18 is implemented */`.

**Also remove from `styles.css`:**
```css
.coming-soon { /* this class may be removed once no cards use it */ }
.coming-soon-badge { /* remove */ }
```
Only remove if no other element uses these classes. Search first.

### Acceptance Criteria

- [ ] "AutoFlow AI" does not appear anywhere in page source
- [ ] "TechSphere Dashboard" does not appear anywhere in page source
- [ ] Remaining product card (Smart Med Notes/Maeda Health) renders correctly
- [ ] No broken layout from single-card grid
- [ ] `.coming-soon-badge` CSS removed only if confirmed unused

### Dependencies

- **Blocked by:** WEB-8
- **Unblocks:** WEB-12 (cleaner to rename after fake products are gone)

---

## WEB-12 — Rename Smart Med Notes to Maeda Health

### Technical Specification

**Files to modify:** `/index.html`, `/script.js`

**Problem:** All references to "Smart Med Notes" must become "Maeda Health". The product's website is `maedahealth.com`.

**Search and replace map:**

| Find | Replace |
|------|---------|
| `Smart Med Notes` | `Maeda Health` |
| `Smart Med Notes AI` | `Maeda Health AI` |
| `smartMedNotes` (JS function/ID) | `maedaHealth` |
| `smartMedNotesDemo` (element ID) | `maedaHealthDemo` |
| `Smart Med Notes - Interactive Demo` | `Maeda Health - Interactive Demo` |

**In `index.html`:**
1. Product card heading: `<h3>Smart Med Notes</h3>` → `<h3>Maeda Health</h3>`
2. Demo button: `onclick="openDemo('smartMedNotes')"` → `onclick="openDemo('maedaHealth')"`
3. Demo modal ID: `id="smartMedNotesDemo"` → `id="maedaHealthDemo"`
4. Demo modal heading: `Smart Med Notes - Interactive Demo` → `Maeda Health - Interactive Demo`
5. All `🩺 Smart Med Notes AI:` strings in demo copy → `🩺 Maeda Health AI:`
6. Early access section: `Smart Med Notes AI` wherever it appears

**In `script.js`:**
1. Any function `openDemo('smartMedNotes')` reference → `openDemo('maedaHealth')`
2. Any `document.getElementById('smartMedNotesDemo')` → `document.getElementById('maedaHealthDemo')`
3. Search for all string literals containing "Smart Med Notes" and replace

**Product description update (product card paragraph):**
Replace current description with accurate Maeda Health description:
```html
<p>AI-powered clinical assistant for Australian doctors. Features Medical Scribe in 5 languages,
MBS Billing automation, Post-Consultation Forms, Specialist Referral Search, and APP-compliant
data processing with Sydney data residency.</p>
```

**Demo button — update CTA:**
```html
<a href="https://maedahealth.com" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
    Visit Maeda Health
</a>
```
(Remove the `openDemo()` interactive demo trigger from the Sprint 1 card — the full demo experience will be on the dedicated product page built in WEB-21.)

### Acceptance Criteria

- [ ] The string "Smart Med Notes" does not appear anywhere in `index.html`, `script.js`, or `styles.css`
- [ ] Product card heading reads "Maeda Health"
- [ ] Product card description accurately describes Maeda Health
- [ ] CTA links to `https://maedahealth.com` (opens in new tab)
- [ ] No broken JS references (demo modal JS, if still present, uses updated IDs)
- [ ] Browser console shows zero JS errors on page load

### Dependencies

- **Blocked by:** WEB-8, WEB-11 (fake products removed first)
- **Unblocks:** Sprint 2 work (cleaner baseline)
