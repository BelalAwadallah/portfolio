# Product Requirements Document (PRD)

## Belal Mohamed Mahmoud — Personal Portfolio Website

**Owner:** Belal Mohamed Mahmoud (Frontend Developer — Angular / React)
**Prepared by:** Claude
**Status:** Approved concept — ready for implementation
**Version:** 1.0

\---

## 1\. Overview

A one-page personal portfolio website for Belal, a Frontend Developer specializing in Angular and React. The design merges the strongest elements of four reference sources into one cohesive, simple, professional identity — built around Belal's real skills, real projects, and a black \& white professional photo of Belal himself (not stock imagery).

## 2\. References Used (and what was taken from each)

|Reference|What we took from it|
|-|-|
|**Mahmoud ElSaey portfolio** (mahmoudelsaey.vercel.app)|Overall page structure: Navbar → Hero → About → Services → Portfolio → Contact/Footer|
|**"Jamie" template video** (dark developer template)|The scroll-reveal animation: each section's screenshot/device mockup slides up from below into a rounded frame with a soft drop shadow as the user scrolls|
|**Sevora hero image**|Hero layout: split screen (text left / large photo right), black \& white portrait treatment, stats row (Projects / Experience / Clients), floating "Available for projects" card over the photo, serif headline treatment|
|**Mariana Napolitani dark portfolio**|Color inspiration only — the warm maroon/burgundy accent tone, used sparingly as a highlight color, not as the dominant background|

## 3\. Goals

* Present Belal as a credible, senior-feeling Frontend Developer despite being early-career, through clean execution rather than flashy visuals.
* Make the real CV content (skills, 3 projects, metrics like "\~40% reduction in HTTP traffic") the hero of the page — not generic filler copy.
* Keep the build genuinely simple: one accent color, one photo treatment, one animation pattern, reused consistently.
* Ship a single, self-contained, responsive HTML page that can be published/hosted immediately.

## 4\. Non-Goals

* No CMS, no backend, no blog, no e-commerce.
* No dark-mode toggle (light theme only, per decision).
* No AI-generated illustrations or stock photography — the only imagery is Belal's own (edited) photo.

## 5\. Design Direction — Decisions Log

All decisions below were confirmed with Belal directly:

|Decision|Choice|Rationale|
|-|-|-|
|Base theme|**Light** (off-white background) with a **maroon/burgundy accent** used only on buttons, the floating card, and small UI details|Requested "very simple"; light base keeps focus on the photo and content; accent gives it warmth without complexity|
|Photo treatment|**Full black \& white** for both Hero and About photos|Matches the Sevora reference exactly; reads as premium and timeless|
|About section photo|**Reuse Belal's own portrait** (different angle/crop if a second photo is available), not a generic desk/laptop stock photo|Keeps the identity personal and consistent — no stock imagery|
|Scroll animation|Each major section (Services, Projects) reveals inside a **rounded device/tablet frame with a drop shadow**, animating up into view on scroll — replicating the "Jamie" video effect|This was the single most-requested visual behavior from the references|
|Services content|Based on Belal's actual CV skills (see Content Spec), not generic design-agency services|Belal is a developer, not a UI/UX designer — services must reflect real capability|

## 6\. Color System

```
--bg-base:        #F7F4F2   /\* off-white / warm cream background \*/
--bg-card:         #FFFFFF   /\* card surfaces \*/
--text-primary:    #1A1A1A   /\* headings, primary text \*/
--text-secondary:  #7A7A7A   /\* supporting text, muted labels \*/
--accent-maroon:   #3C1516   /\* primary accent — buttons, active states \*/
--accent-maroon-2: #512024   /\* secondary accent — hover states, tags \*/
--border-hairline: #E5E1DD   /\* dividers, card borders \*/
--floating-card-bg:#1A1A1A   /\* dark "Available for projects" card, floats over the photo \*/
--floating-card-fg:#F5F0EC   /\* text on the floating card \*/
```

Only **one** accent hue (maroon) is used throughout. No secondary chromatic colors (no blue, green, etc.) — this is what keeps the palette "simple."

## 7\. Typography

* **Headings:** Serif typeface (e.g. "Playfair Display" or "Fraunces") — used only for the Hero H1 and section titles, echoing the Sevora reference's editorial feel.
* **Body / UI text:** Sans-serif (e.g. "Inter" or "General Sans") for everything else — nav, buttons, paragraph copy, cards.
* Sentence case throughout. No all-caps except small eyebrow labels (e.g. "SELECT PROJECT").

## 8\. Page Structure \& Section Requirements

### 8.1 Navbar (sticky)

* Left: initials/logo mark ("B.") + name "Belal Mahmoud"
* Center/right links: Home, About, Services, Projects, Contact
* Right: solid dark CTA button "Let's talk" / "Start a project" → mailto or WhatsApp/contact anchor

### 8.2 Hero Section

* Left column: Serif H1 (two-line headline, dark line + muted line — pattern from Sevora), one-paragraph value proposition summarizing Belal (Angular/React frontend developer, performance-focused, design-first workflow), two CTAs ("View projects" solid, "Get in touch" outline)
* Stats row under CTAs: 3 stats pulled from the CV — e.g. **"4+ Projects delivered"**, **"200+ Training hours"**, **"Excellent w/ Honors — B.Sc. IT"**
* Right column: full-height black \& white portrait photo of Belal
* Floating card over the bottom-right of the photo: "Select project" (eyebrow) / "Available for projects" (bold) / short line + arrow icon — same pattern as Sevora
* Below the hero: a muted logo/tooling strip showing the tech stack marks instead of client logos (Angular, React, TypeScript, RxJS, Tailwind, Figma)

### 8.3 About Section

* Reuses Belal's portrait (second angle if available), same black \& white treatment, smaller/cropped than Hero
* Serif subhead: a one-line personal statement (see Content Spec for exact copy)
* 2–3 sentence bio paragraph built from the CV summary
* Small fact list or badges: B.Sc. Information Technology (Excellent, With Honors), Huawei AI \& ML Certified, Based in Egypt / Open to Remote

### 8.4 Services Section

Four service cards (see Content Spec for exact titles/copy), each with:

* A simple line icon (no illustration)
* Title
* One-sentence description
* This section is the one that uses the **tablet-frame scroll-reveal animation**

### 8.5 Projects Section

Three project cards pulled directly from the CV:

1. University Management Platform
2. E-Commerce Web Application
3. Real-Time Weather Dashboard

Each card: project name, one-line description, tech tags (e.g. Angular 17+, PrimeNG, Tailwind), and 1–2 standout metrics (e.g. "\~40% less HTTP traffic", "\~70% test coverage"). This section also uses the tablet-frame scroll-reveal animation, matching Services.

### 8.6 Contact / Footer

* Short closing line inviting contact
* Email, phone, LinkedIn, GitHub (as available)
* Copyright line

## 9\. Animation Specification (Scroll Reveal)

Replicates the reference video behavior:

1. As the Services and Projects sections enter the viewport, their card/frame content starts translated down (`translateY(40px)`) and at `opacity: 0`.
2. On intersection (via `IntersectionObserver`), the element animates to `translateY(0)`, `opacity: 1` over \~500–600ms with an ease-out curve.
3. Each card sits inside a rounded frame (`border-radius: 16px`) with a soft drop shadow (`box-shadow: 0 20px 40px rgba(0,0,0,0.08)`), reinforcing the "device mockup" look from the reference.
4. Stagger cards within the same section by \~80–100ms so they don't all pop at once.
5. Animation should only play once per element (no re-triggering on scroll-up) to keep it calm and "simple" rather than distracting.

## 10\. Photo Requirements

* Belal will supply one (or two) personal photos.
* Photos must be processed into a **professional black \& white portrait**, matching the lighting/contrast style of the Sevora reference (soft studio-like lighting, sharp focus on the face, smooth neutral background/backdrop blur).
* The exact AI editing prompt to use for this transformation is provided in `CONTENT-SPEC.md`.
* No fictional/stock face may replace Belal's real photo — the edit only adjusts lighting, color grading (B\&W conversion), and background cleanup.

## 11\. Technical Requirements

* Single self-contained responsive HTML file (HTML/CSS/JS, no build step) so it can be published immediately as a hosted page.
* Fully responsive: desktop, tablet, and mobile breakpoints.
* Fonts loaded from Google Fonts (serif + sans-serif pairing above).
* No backend — the contact "form" can be a `mailto:` link or a simple static form pending future backend integration.
* Performance: no heavy JS libraries; use plain CSS + vanilla JS `IntersectionObserver` for the scroll-reveal effect.

## 12\. Success Criteria

* Belal can open the page on both desktop and mobile and it looks intentional, not templated.
* The Hero and About sections visually echo the Sevora reference; the Services/Projects sections visually echo the scroll-reveal from the Jamie video reference.
* All content is truthful and pulled from the real CV — no placeholder Lorem Ipsum in the final build.
* The whole page uses exactly one accent color family (maroon) plus black/white/gray.

## 13\. Open Items Before Build

* \[ ] Belal to upload his personal photo(s) so the black \& white portrait can be produced.
* \[ ] Confirm final wording for the Hero headline (draft provided in CONTENT-SPEC.md — Belal to approve or edit).
* \[ ] Confirm LinkedIn/GitHub links to display in the footer (previously found in the CV: LinkedIn — `belal-awadallah-3213b1288`, GitHub — `BelalAwadallah`).
* \[ ] Once approved, Claude will build the full HTML page and publish it as a shareable link.

