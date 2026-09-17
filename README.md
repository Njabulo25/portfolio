# Njabulo Rikhotso — Portfolio

A personal developer portfolio built with **HTML5, CSS3 and vanilla JavaScript** — no frameworks, no build step, no external dependencies.

**Live site:** [njabulo25.github.io/portfolio](https://njabulo25.github.io/portfolio/)

---

## Overview

This is my professional portfolio as a Junior Software Developer at The Tech Giants. It presents my background, projects, skills, experience, education and certifications in a single-page layout with a section-progress navigation system.

The main interaction is a **progress-based navigation** — each section of the journey (Personal → Projects → Skills → Experience → Education → Certifications → Contact) shows its state as you scroll: unvisited (•), current (highlighted) or completed (✓).

The site is restrained, technical and credible. There are no fake statistics, invented achievements or exaggerated claims. Every project, certification and skill reflects actual work.

---

## Technologies Used

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic, accessible) |
| Styling | CSS3 (custom properties, grid, flexbox) |
| Behaviour | Vanilla JavaScript (ES5-compatible IIFEs) |
| Fonts | System font stack (Inter, -apple-system, Segoe UI, Roboto) |
| Hosting | GitHub Pages |
| Version control | Git, GitHub |

No frameworks, no bundlers, no npm packages. Everything is hand-written.

---

## Folder Structure

portfolio/
├── index.html
├── README.md
├── css/
│   ├── main.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── navigation.js
│   ├── theme.js
│   ├── project-filter.js
│   ├── animations.js
│   ├── form-validation.js
│   └── app.js
└── assets/
    ├── images/
    │   ├── projects/
    │   │   ├── iron-scalper/
    │   │   └── employee-management/
    │   ├── certificates/
    │   └── icons/
    └── documents/
        ├── Njabulo_Rikhotso_CV.pdf
        └── certificates/

---

## Features Implemented

### Navigation
- Sticky header with subtle shadow on scroll
- Section-progress navigation with active state and completed ticks (• → ✓)
- Smooth scroll with sticky-header offset
- Mobile: hamburger menu slides down from header, closes on outside click or Escape
- IntersectionObserver-based active section detection

### Theme
- Three modes: Light, Dark, System
- Persists choice in localStorage
- Follows OS theme when System is selected
- Dark mode uses the same design tokens — not a separate stylesheet

### Projects
- Two featured projects as mini case studies: Problem → Solution → My Role → Key Features → What I Learned
- Category filter: All / Backend / Web / Database / Personal
- Primary screenshot with thumbnail row
- Click any image to open in lightbox with prev/next, Escape and click-outside

### Contact
- Client-side validation (required fields, email format, message length)
- Clear error messages, errors clear as user types
- Currently opens email client via mailto. A hosted form service can be connected later.

### Accessibility
- Semantic HTML5 structure
- Proper heading hierarchy
- Visible focus states
- Real label elements on form fields
- Descriptive alt text on all project screenshots
- Full keyboard navigation
- prefers-reduced-motion respected

### Performance
- No external libraries
- Lazy-loaded images
- CSS split into three focused files
- JavaScript split into six focused files
- System font stack — no web font downloads

### SEO
- Descriptive title and meta description
- Open Graph tags
- Semantic landmarks and headings
- Descriptive image filenames

---

## Challenges Faced and Solutions

### 1. Synchronising scroll-based active navigation with completed ticks
Used IntersectionObserver with an optimised rootMargin so a section becomes active when roughly centred. Completed sections are tracked in a Set — once a section index is passed, all earlier sections are marked complete. Runs once per section entry, not on every scroll event.

### 2. Mobile menu without a framework
Added a compact menu-toggle button hidden above 768px and revealed below. The nav slides down from the header with a max-height transition. aria-expanded is updated on toggle. Menu closes on link click, outside click, Escape or resize to desktop.

### 3. Lightbox without library bloat
Wrote a ~60-line vanilla lightbox. Images marked with data-lightbox become triggers. Supports prev/next, Escape, click-outside and focus return. Works identically on mobile and desktop.

### 4. Design system that works in both themes
Every colour is a CSS custom property defined in :root for light and [data-theme="dark"] for dark. Changing theme swaps property values — no rules duplicated. Spacing, radius, shadows and transitions are also tokens.

---

## Installation (Local Development)

git clone https://github.com/Njabulo25/portfolio.git
cd portfolio

Then either open index.html directly, or use VS Code Live Server:

1. Open folder in VS Code
2. Right-click index.html
3. Choose "Open with Live Server"

Site runs at http://127.0.0.1:5500

No dependencies. No npm install. No configuration.

---

## Deployment

Deployed to GitHub Pages from the main branch.

Live URL: https://njabulo25.github.io/portfolio/

To deploy your own copy: fork or clone, push to GitHub, go to Settings → Pages, set Branch to main and Folder to /(root), save. Site builds in about 60 seconds.

---

## GitHub Repository

https://github.com/Njabulo25/portfolio

---

## Author

Njabulo Rikhotso
Junior Software Developer · The Tech Giants · Pretoria, South Africa

Email: njabulontsako49@gmail.com
LinkedIn: https://www.linkedin.com/in/njabulorikhotso/
GitHub: https://github.com/Njabulo25

---

## License

All content, images, project descriptions and code are © 2026 Njabulo Rikhotso. All rights reserved.
