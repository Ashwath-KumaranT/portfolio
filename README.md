# Portfolio — Ashwath Kumaran Thirumoorthy

A personal portfolio built as a premium dark **Bento grid**: a persistent left sidebar, rounded near-black cards on a purple/blue ambient field, and an interactive walkthrough of a retrieval-augmented generation pipeline.

**Software Engineer · AI Engineer · Android Developer** — *Building reliable software. Exploring intelligent systems.*

🔗 **Live:** https://ashwath-kumarant.github.io/portfolio/

---

## Contents

- [Stack](#stack)
- [Local setup](#local-setup)
- [Project structure](#project-structure)
- [Replacing the placeholder content](#replacing-the-placeholder-content) ← start here
- [Connecting the contact form](#connecting-the-contact-form)
- [Design system](#design-system)
- [Routing on GitHub Pages](#routing-on-github-pages)
- [Deployment](#deployment)
- [Adding a custom domain](#adding-a-custom-domain)
- [Accessibility and motion](#accessibility-and-motion)
- [Content rules](#content-rules)

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | React 19 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Animation | Framer Motion |
| Icons | Lucide React (+ four hand-drawn brand marks) |
| Routing | React Router (HashRouter) |
| Fonts | Inter + JetBrains Mono, self-hosted via Fontsource |
| Content | Typed local data files — no CMS, no API |
| Hosting | GitHub Pages via GitHub Actions |

---

## Local setup

Requires Node 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

The dev server prints a URL (default `http://localhost:5173/portfolio/` — note the base path).

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | Type-check, then build to `dist/` |
| `npm run build:root` | Same, but for serving from a domain root (`BASE_PATH=/`) |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run typecheck` | TypeScript only, no emit |
| `npm run lint` | oxlint |

---

## Project structure

```
src/
├── assets/
│   ├── projects/                 project cover art (SVG placeholders)
│   ├── avatar-placeholder.svg    ← swap for a real photo
│   └── noise.png                 ambient grain texture
├── components/
│   ├── architecture/             RagArchitecture, ProjectArchitecture
│   ├── layout/                   Sidebar, MobileHeader, PageContainer, Footer, ThemeToggle
│   ├── sections/                 Hero, About, Experience, Projects, Skills, AiLab, …
│   └── ui/                       BentoCard, Button, TechChip, SectionHeading, StatusBadge, …
├── data/                         ← ALL CONTENT LIVES HERE
│   ├── profile.ts                name, titles, tagline, email, avatar, about copy
│   ├── site.ts                   social links, contact provider, canonical URL
│   ├── projects.ts               the three projects + full case studies
│   ├── experience.ts             Accenture role, education, "how I work"
│   ├── skills.ts                 grouped technologies
│   ├── aiLab.ts                  RAG pipeline stages, AI focus areas
│   ├── certifications.ts         dummy certifications
│   ├── blog.ts                   planned blog posts
│   └── navigation.ts             sidebar items and their routes
├── hooks/                        useTheme, useScrollSpy, useDocumentTitle, useLockBodyScroll
├── lib/                          cn, motion variants, contact transport
└── pages/                        one file per route
```

**The rule:** presentation components never hard-code content. Editing text, links, or data should only ever mean editing a file in `src/data/`.

---

## Replacing the placeholder content

Everything below is dummy data. None of it is presented as real — placeholders are visibly marked in the UI so a visitor can tell.

### 1. Avatar

Replace `src/assets/avatar-placeholder.svg` with a real photo (or add a new file and point `profile.avatar` at it in `src/data/profile.ts`). Nothing else needs to change — the sidebar, mobile header, and metadata all read that one value.

### 2. Social links — `src/data/site.ts`

GitHub is real. LinkedIn, Instagram, and Medium are placeholders:

```ts
{ id: 'linkedin', label: 'LinkedIn', url: 'https://…', isPlaceholder: false }
```

Set the real `url` **and** flip `isPlaceholder` to `false`. The "dummy" marker next to the link disappears automatically.

### 3. Project links — `src/data/projects.ts`

Each project has `links.demo` and `links.repo`, both `isPlaceholder: true`. Same pattern: real URL, flag to `false`. The case-study "Demo & source" cards stop rendering as dashed placeholders.

Also update `caseStudy.outcome.placeholders` — that list is rendered as an explicit "not yet available" block, so remove entries as they become available.

### 4. Experience — `src/data/experience.ts`

`responsibilityPlaceholders` holds three placeholder bullets. Replace them with verified, non-confidential responsibilities and add safe technologies to the `technologies` array.

> **Do not** add client names, internal system names, internal URLs, proprietary architecture, credentials, or non-public screenshots. The UI carries a visible note explaining the omission.

### 5. Certifications — `src/data/certifications.ts`

Three dummy cards. Replace `name`, `issuer`, `year`, `credentialUrl`, and set `isPlaceholder: false` to turn the card into a real one with a working "View Credential" link.

### 6. Blog — `src/data/blog.ts`

Five **planned** posts. Each renders its outline and is labelled "Planned — not published yet". To publish one:

```ts
status: 'published',
publishedOn: '2026-03-14',
body: ['First paragraph…', 'Second paragraph…'],
```

### 7. Canonical URL and social preview

- `src/data/site.ts` → `canonicalUrl`
- `index.html` → `<link rel="canonical">`, `og:url`, `og:image`, `twitter:image`
- `public/og-image.png` (1200×630) — regenerate from `src/assets/og-image.svg` if you restyle it

---

## Connecting the contact form

The form works out of the box with **no provider**: submitting opens the visitor's own mail client with the message pre-composed (`mailto:`). Validation, loading, success, and error states all work regardless of provider.

To send over the network instead, edit `contactConfig` in `src/data/site.ts`:

**Formspree**

```ts
provider: 'formspree',
endpoint: 'https://formspree.io/f/xxxxxxx',
```

**EmailJS**

```ts
provider: 'emailjs',
emailjs: { serviceId: '…', templateId: '…', publicKey: '…' },
```

**Your own endpoint** — any URL accepting `POST` with a JSON body of `{ name, email, subject, message }`:

```ts
provider: 'custom',
endpoint: 'https://api.example.com/contact',
```

The transport logic lives in `src/lib/contact.ts`. The form component never changes.

> EmailJS public keys and Formspree endpoint IDs are designed to be public, so they are safe in this file. **Never** put a private API key, token, or secret here — this is a static site and everything in the bundle is readable by anyone.

---

## Design system

Tokens are CSS custom properties in `src/index.css`, exposed to Tailwind through `@theme inline`. Dark is the default; light is a separately designed palette, not an inversion.

| Token | Dark | Light |
| --- | --- | --- |
| `--canvas` | `#07060B` | `#F6F5FA` |
| `--surface` | `#111014` | `#FFFFFF` |
| `--content` | `#F5F5F7` | `#17151F` |
| `--content-muted` | `#A7A3AF` | `#5D5872` |
| `--accent` | `#8B5CF6` | `#6D28D9` |
| `--accent-2` | `#5B6CFF` | `#3B46D6` |

Changing a colour here changes it everywhere, in both themes, including the ambient background.

**Theme switching** is class-based (`.light` / `.dark` on `<html>`). An inline script in `index.html` resolves the theme *before first paint*, so there is no flash of the wrong theme. Preference order: saved choice in `localStorage` → OS `prefers-color-scheme` → dark.

---

## Routing on GitHub Pages

This project uses **`HashRouter`**, so URLs look like `…/portfolio/#/projects/flight-booking`.

GitHub Pages serves static files with no rewrite rules. Under `BrowserRouter`, a hard refresh or a shared deep link to `/projects/flight-booking` would return a 404, because no such file exists on disk. The usual workaround is a `404.html` that redirects back into the app — a hack that flashes and breaks referrers. Hash routing avoids the problem entirely, works identically on a custom domain, and works from `npm run preview`.

To switch to `BrowserRouter` later (e.g. behind a host that supports SPA fallbacks), change the import in `src/App.tsx` and configure the fallback on that host.

---

## Deployment

Deployment is automatic: pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages.

**One-time setup on the repository:**

1. Push this project to `https://github.com/Ashwath-KumaranT/portfolio`.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push to `main` (or run the workflow manually from the **Actions** tab).

The site is served at `https://ashwath-kumarant.github.io/portfolio/`.

**Base path.** Vite needs to know the site is served from a subdirectory. `vite.config.ts` defaults to `/portfolio/` and can be overridden with the `BASE_PATH` environment variable — so the repository name and the base path only need to agree in one place.

If you rename the repository, either rename it to something else and set `BASE_PATH=/new-name/` in the workflow's build step, or update the default in `vite.config.ts`.

---

## Adding a custom domain

1. Add a `CNAME` file to `public/` containing just the domain, e.g. `ashwath.dev`.
2. Point the domain's DNS at GitHub Pages (`A` records to GitHub's IPs, or a `CNAME` to `ashwath-kumarant.github.io`).
3. Set the domain under **Settings → Pages → Custom domain** and enable **Enforce HTTPS**.
4. The site now serves from the root, so change the build step in `.github/workflows/deploy.yml`:

   ```yaml
   - name: Type-check and build
     run: npm run build:root      # BASE_PATH=/
   ```

5. Update `canonicalUrl` in `src/data/site.ts` and the canonical/OG URLs in `index.html`.

No domain is hard-coded anywhere, so nothing else needs to change.

---

## Accessibility and motion

- Semantic landmarks (`header`, `nav`, `main`, `aside`, `footer`) and a skip-to-content link.
- Every interactive control is a real `button` or `a`, reachable and operable by keyboard.
- Visible focus rings everywhere, via a global `:focus-visible` outline.
- The mobile drawer closes on `Escape`, on backdrop click, and on navigation, returning focus to its trigger.
- Form fields have real `<label>`s, `aria-invalid`, and errors wired up through `aria-describedby`.
- Status is never carried by colour alone — the availability badge, placeholder markers, and form feedback all pair colour with text and an icon.
- Images have meaningful `alt` text; decorative images use `alt=""`.
- `prefers-reduced-motion` is respected two ways: `<MotionConfig reducedMotion="user">` flattens every Framer Motion animation to opacity, and a global CSS rule disables the ambient drift, the ping on the status dot, and smooth scrolling.

All animation uses `transform` and `opacity` only, so nothing animates on the layout path.

---

## Content rules

These constraints are deliberate and worth preserving when editing:

- **No invented metrics.** No user counts, performance numbers, revenue figures, or client outcomes appear anywhere. Project outcomes describe scope and what was learned.
- **No fake proficiency scores.** Skills are grouped chips linked to the projects that demonstrate them — not "React 85%".
- **No confidential information.** Professional work is described only at a level that is safe to publish.
- **No resume download button.** This is intentional; `showResumeButton` in `src/data/site.ts` is a flag, not an oversight.
- **Placeholders stay visible as placeholders** until they are replaced with real data.
- **No secrets in the repository.** This is a public static site; anything committed here is public.

---

## License

MIT — see [LICENSE](LICENSE).
