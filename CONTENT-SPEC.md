# Content Spec — Belal Mahmoud Portfolio

Companion file to `PRD.md`. Contains the actual copy to use in the build, plus the AI image-editing prompt for the profile photo. All content below is drawn directly from Belal's CV — no invented experience or numbers.

---

## 1. AI Photo Editing Prompt (use this once Belal uploads his photo)

Use this prompt with an image-editing AI model (e.g. Gemini/Nano Banana, or any photo-editing tool that accepts a reference style photo + a source photo). Attach Belal's uploaded photo as the source image.

```
Edit this photo of the person into a professional black-and-white
portrait suitable for a personal portfolio website hero section.

Requirements:
- Convert to a rich, high-contrast black and white (true monochrome,
  not a light gray filter) — deep blacks, clean whites, smooth
  mid-tone gradients on skin.
- Keep the person's actual face, features, expression, and identity
  completely unchanged — this is a color-grade and lighting edit,
  not a face swap or a stylization/illustration.
- Apply soft, directional studio-style lighting on the face, similar
  to an editorial fashion/portrait shoot — gentle shadow on one side,
  catchlight in the eyes, no harsh flash look.
- Clean and simplify the background into a smooth, softly blurred
  neutral tone (light-to-mid gray gradient) so the person is the
  clear focal point.
- Sharpen focus on the eyes and face; keep clothing and hair natural,
  slightly softened background blur (shallow depth of field look).
- Overall mood: calm, confident, premium, minimal — similar to a
  high-end designer/creative-director portrait, not a casual selfie.
- Output at high resolution, portrait orientation, with the person
  positioned slightly off-center (rule of thirds) so there is empty
  space on one side for text/UI elements to sit next to the photo.
- Do not add sunglasses, props, text, or watermarks.
```

If a second photo is available for the About section, apply the same prompt but note in the request: "use a different angle/crop than the hero photo, slightly closer crop (chest-up)."

---

## 2. Hero Section Copy

**Eyebrow (optional, small label above headline):**
`Frontend Developer`

**Headline (two lines, serif, dark line + muted line — same pattern as Sevora):**
```
Building Fast
Reliable Interfaces
```
*(Alternative option: "Clean Code / Real Products")*

**Sub-copy (one paragraph, sans-serif, under the headline):**
> I build fast, accessible, production-ready interfaces with Angular and React — from a design-first Figma workflow through to performance-tuned, tested code.

**CTAs:**
- Primary button: `View projects`
- Secondary button: `Get in touch`

**Stats row (3 stats, pulled from CV):**
| Number | Label |
|---|---|
| 4+ | Projects delivered |
| 200+ | Training hours completed |
| Excellent | B.Sc. Information Technology, With Honors |

**Floating card (bottom-right over photo):**
- Eyebrow: `Select project`
- Title: `Available for freelance work`
- Body: `Share a few details about your project, and I'll get back with a clear direction.`
- Icon: arrow (↗)

**Tooling strip below hero (replaces "trusted by" logos):**
`Angular` · `React` · `TypeScript` · `RxJS` · `Tailwind CSS` · `Figma`

---

## 3. About Section Copy

**Subhead (serif, one line):**
```
Frontend development, built on structure, performance, and clarity.
```

**Bio paragraph:**
> I'm a Frontend Developer with a B.Sc. in Information Technology (Excellent, With Honors) and 4+ delivered projects using Angular v17+/v20, React, TypeScript, and RxJS — with a design-first Figma workflow. I care most about performance and structure: lazy loading, OnPush change detection, reactive pipelines, role-based access control, and reusable, well-tested components.

**Fact badges/list:**
- B.Sc. Information Technology — Excellent, With Honors (Delta University for Science and Technology)
- Huawei Certified — AI & Machine Learning (2024)
- Based in Egypt — open to remote / flexible work
- Arabic (native) · English (B1–B2)

**CTA under bio:**
`Let's build your product` → links to contact section

---

## 4. Services Section Copy

*(Proposed by Claude, based on real CV skills — 4 cards to match the Mahmoud ElSaey layout pattern)*

**1. Frontend Development**
> Building responsive, production-grade web applications with Angular (v17+/v20) and React — component-based architecture, reactive forms, and clean state management.

**2. Figma-to-Code (UI Implementation)**
> Translating Figma designs into pixel-accurate, responsive interfaces using Tailwind CSS and PrimeNG — with a design-first workflow from wireframe to shipped UI.

**3. Performance & Architecture**
> Optimizing real-world apps with lazy loading, OnPush change detection, and RxJS pipelines (debounceTime, switchMap, shareReplay) — cutting redundant network calls and re-renders at scale.

**4. Dashboards & Role-Based Systems**
> Architecting multi-role platforms with RBAC, route guards, and reusable component libraries — built for admin panels, e-commerce, and data-heavy dashboards.

---

## 5. Projects Section Copy

**1. University Management Platform**
`Angular 17+ · PrimeNG · Tailwind CSS · RESTful APIs`
> A multi-role platform (student / instructor / admin) with a full RBAC system, route guards, and role-driven navigation.
- ~40% reduction in redundant HTTP traffic via RxJS operators
- ~70% unit test coverage (Jasmine/Karma) on auth guards and core services
- Lazy-loaded feature modules for a lighter initial bundle

**2. E-Commerce Web Application**
`Angular · Tailwind CSS · RxJS · Angular Services`
> A reactive shopping platform with a real-time cart engine synced across all cart-aware components.
- ~60% fewer API calls during active search (300ms debounce)
- Mobile-first responsive layout across 5 breakpoints (320px–1440px)
- Reusable component library: product card, filters, sort, pagination

**3. Real-Time Weather Dashboard**
`Angular · OpenWeather API · RxJS · HttpClient`
> A live weather dashboard consuming a full RxJS pipeline with error handling and retry logic.
- Full pipeline: `catchError`, `retry(2)`, `finalize`, loading-state via `BehaviorSubject`
- WCAG-compliant color contrast and aria-labels on all dynamic content

---

## 6. Contact / Footer Copy

**Heading:** `Let's build something reliable together.`
**Sub-line:** `Open to freelance projects and full-time roles — remote or flexible.`

**Contact details:**
- Email: belalawadallah891@gmail.com
- Phone: +20 109 616 2788
- LinkedIn: linkedin.com/in/belal-awadallah-3213b1288
- GitHub: github.com/BelalAwadallah

**Footer line:**
`© 2026 Belal Mahmoud. Built with Angular-grade attention to detail.`
