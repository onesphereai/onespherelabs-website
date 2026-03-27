# OneSphere Labs Website Redesign — Full Technical Specification
## Part 1: Sprint Plan & Critical Path

**Document version:** 1.0
**Date:** 2026-03-27
**Tech Lead:** OneSphere Labs Engineering
**Stack:** Vanilla HTML5 / CSS3 / ES6 JavaScript (no framework — static site)

---

## SPRINT PLAN OVERVIEW

| Sprint | Name | Duration | Tickets | Goal |
|--------|------|----------|---------|------|
| 1 | Critical Fixes | Week 1 | WEB-7 through WEB-12 | Production is no longer broken or misleading |
| 2 | Design Foundation | Week 2 | WEB-13, WEB-14 | Design system and file structure in place |
| 3 | Shared Components | Week 2–3 | WEB-15, WEB-16 | Navigation and footer reusable across all pages |
| 4 | Homepage Redesign | Week 3 | WEB-17, WEB-18, WEB-19 | Homepage reflects AI product studio identity |
| 5 | Product Pages | Week 4–5 | WEB-20 through WEB-24 | All four product pages live |
| 6 | About & Contact | Week 5 | WEB-25, WEB-26 | Full site navigable |
| 7 | SEO & Polish | Week 6 | WEB-27, WEB-28, WEB-29 | Lighthouse 90+, WCAG AA compliant |

---

## SPRINT 1 — Critical Fixes
**Goal:** Remove all incorrect, broken, or embarrassing content from the live site before any other work begins. These tickets can be shipped to production immediately — they require no design system changes.

**Sprint 1 Definition of Done:**
- [ ] No duplicate nav links visible at any viewport
- [ ] CSS validates without errors (W3C CSS Validator passes)
- [ ] FormSubmit `_next` redirect points to production URL or is removed
- [ ] No "HIPAA" text anywhere on site; APP compliance text is correct
- [ ] AutoFlow AI and TechSphere Dashboard cards are gone
- [ ] All references to "Smart Med Notes" have been replaced with "Maeda Health"
- [ ] Site deployed and smoke-tested on production

### Ticket Execution Order (Sprint 1)

1. WEB-8 — Fix CSS syntax error (unblocks all subsequent CSS work)
2. WEB-7 — Fix duplicate Services nav link
3. WEB-10 — Fix HIPAA → APP compliance reference
4. WEB-9 — Fix staging URL in FormSubmit redirect
5. WEB-11 — Remove fake products
6. WEB-12 — Rename Smart Med Notes to Maeda Health

**Dependency graph:**
```
WEB-8 (CSS fix) ──► All other Sprint 1 tickets can proceed in any order after WEB-8
WEB-11 ──► WEB-12 (remove fake products before renaming the real one, avoid confusion)
```

---

## SPRINT 2 — Design Foundation
**Goal:** The new design system token file and multi-page folder structure are in place. No visible change to users yet — this is groundwork.

**Sprint 2 Definition of Done:**
- [ ] `css/tokens.css` exists with all CSS custom properties from design system
- [ ] `css/base.css` exists with reset, typography, utility classes
- [ ] Folder structure `/products/`, `/about/`, `/contact/` exists with stub `index.html` files
- [ ] Google Fonts (Archivo + Space Grotesk) load correctly on all pages
- [ ] All Sprint 1 fixes are preserved in the new structure

### Ticket Execution Order (Sprint 2)

1. WEB-13 — Implement design system (must be first; everything else consumes tokens)
2. WEB-14 — Create multi-page site structure and split CSS

**Dependency graph:**
```
Sprint 1 complete ──► WEB-13 ──► WEB-14
```

---

## SPRINT 3 — Shared Components
**Goal:** Navigation and footer HTML/CSS/JS are written once and included on every page.

**Sprint 3 Definition of Done:**
- [ ] Navigation renders correctly at 375px, 768px, 1024px, 1440px
- [ ] Products dropdown opens/closes correctly on desktop hover and mobile tap
- [ ] Mobile hamburger menu works with keyboard and touch
- [ ] Footer renders in 3 columns on desktop, stacked on mobile
- [ ] All focus states visible on navigation and footer links
- [ ] Skip link "Skip to main content" functional

### Ticket Execution Order (Sprint 3)

1. WEB-15 — Shared navigation (Products dropdown is the most complex component; build first)
2. WEB-16 — Shared footer

**Dependency graph:**
```
WEB-13, WEB-14 ──► WEB-15 ──► WEB-16
WEB-15, WEB-16 ──► All page tickets (WEB-17 through WEB-26)
```

---

## SPRINT 4 — Homepage Redesign
**Goal:** Homepage accurately represents OneSphere Labs as an AI product studio.

**Sprint 4 Definition of Done:**
- [ ] Hero copy is correct ("AI product studio" framing, no "services company" language)
- [ ] 4-product bento grid shows Maeda Health, Vigility, Attune, Petsense with correct names/URLs
- [ ] Trust strip visible and contains real, accurate content
- [ ] All scroll animations respect prefers-reduced-motion
- [ ] Homepage meta title and description are updated
- [ ] Page passes Lighthouse Performance 90+

### Ticket Execution Order (Sprint 4)

1. WEB-17 — Hero section
2. WEB-18 — Product portfolio grid
3. WEB-19 — Trust strip and SEO

**Dependency graph:**
```
WEB-15, WEB-16 ──► WEB-17 ──► WEB-18 ──► WEB-19
```

---

## SPRINT 5 — Product Pages
**Goal:** Each of the four products has a dedicated, fully specified page accessible from the Products nav dropdown.

**Sprint 5 Definition of Done:**
- [ ] `/products/maeda-health/` — full page live
- [ ] `/products/vigility/` — full page live
- [ ] `/products/attune/` — full page live
- [ ] `/products/petsense/` — full page live
- [ ] Template used consistently across all four
- [ ] Each page links correctly from nav dropdown
- [ ] "Visit [product].com" CTA links to correct external domain

### Ticket Execution Order (Sprint 5)

1. WEB-20 — Product page template (HTML/CSS scaffold, no product content)
2. WEB-21 — Maeda Health (most complex; 8 features, compliance copy)
3. WEB-22 — Vigility
4. WEB-23 — Attune
5. WEB-24 — Petsense

**Dependency graph:**
```
WEB-15, WEB-16 ──► WEB-20 ──► WEB-21, WEB-22, WEB-23, WEB-24 (parallelisable after WEB-20)
```

---

## SPRINT 6 — About & Contact
**Goal:** About and Contact pages replace the old single-page sections.

**Sprint 6 Definition of Done:**
- [ ] `/about/` page live with studio story, mission, team section
- [ ] `/contact/` page live with updated form (services dropdown updated to products)
- [ ] FormSubmit action is production email hash (not staging Amplify URL)
- [ ] Contact form submits successfully and shows confirmation

### Ticket Execution Order (Sprint 6)

1. WEB-25 — About page
2. WEB-26 — Contact page

**Dependency graph:**
```
WEB-15, WEB-16 ──► WEB-25, WEB-26 (parallelisable)
```

---

## SPRINT 7 — SEO & Polish
**Goal:** Site is production-ready: fast, accessible, and crawlable.

**Sprint 7 Definition of Done:**
- [ ] `sitemap.xml` lists all pages (home, 4 products, about, contact)
- [ ] `robots.txt` updated; no sensitive paths
- [ ] Font Awesome CDN removed; all icons are inline SVG
- [ ] Lighthouse Accessibility 95+
- [ ] prefers-reduced-motion disables all transforms and transitions
- [ ] All interactive elements have visible focus rings
- [ ] Touch targets minimum 44x44px verified

### Ticket Execution Order (Sprint 7)

1. WEB-27 — Sitemap and robots.txt (quick win, no dependencies on WEB-28/29)
2. WEB-28 — Replace Font Awesome with inline SVG (do before accessibility pass)
3. WEB-29 — Accessibility and reduced-motion pass (last; validates the full site)

**Dependency graph:**
```
All pages complete ──► WEB-27, WEB-28 (parallelisable)
WEB-28 ──► WEB-29
```

---

## CRITICAL PATH

The minimum time sequence that determines the earliest ship date:

```
WEB-8 (CSS fix)
  └─► WEB-13 (design system tokens)
        └─► WEB-14 (multi-page structure)
              └─► WEB-15 (navigation)
                    └─► WEB-16 (footer)
                          └─► WEB-17 (hero)
                                └─► WEB-18 (product grid)
                                      └─► WEB-19 (trust strip + SEO)
                                            └─► WEB-20 (product template)
                                                  └─► WEB-21 (Maeda Health — most complex product page)
                                                        └─► WEB-28 (replace Font Awesome)
                                                              └─► WEB-29 (a11y pass)
```

**Non-critical (parallelisable once WEB-20 is done):**
- WEB-22, WEB-23, WEB-24 alongside WEB-21
- WEB-25, WEB-26 alongside WEB-21–24
- WEB-27 alongside WEB-28

**Sprint 1 tickets (WEB-7, WEB-9, WEB-10, WEB-11, WEB-12) are independent of the critical path** — they run in parallel against the current single-page site and ship to production immediately.
