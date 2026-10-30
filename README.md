# Noor Dental Studio

> Designing a premium dental experience that builds trust before the first appointment.

A bilingual (English / Arabic, full RTL) website for a fictional boutique dental clinic in Dubai. It's a frontend portfolio project about two questions: how a healthcare site can feel premium without feeling salesy, and how a cinematic scroll experience can coexist with usability and accessibility.

**[Live demo](https://noor-dental.netlify.app)** · **[Case study](https://sadafnemani.netlify.app/projects/noor-dental)**

## The brief

The site is designed around three patients rather than a generic template:

| Persona                | What they need                                     | Where it lives                                                                |
| ---------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------- |
| The anxious patient    | Reassurance, no pressure, to know what will happen | First Visit (step-by-step accordion, "you're always in control", FAQ), About  |
| The comparison shopper | Credentials, results, technology, honest pricing   | Invisalign (journey, before/after, pricing guidance, testimonials), Your Care |
| The busy professional  | Fast booking, hours, location, WhatsApp            | Booking flow, Contact, persistent nav with a Book CTA                         |

## Highlights

- **Pinned scroll scenes.** The Home page is a set of full-viewport scenes that dissolve into each other (a depth-blur transition) instead of scrolling past. A small convention drives scroll-linked effects: GSAP writes a live `--scene-progress` CSS variable and components read it in CSS, so nothing re-renders on scroll. Mobile and `prefers-reduced-motion` fall back to a normal flow layout.
- **Real bilingual RTL.** English and Arabic from day one: logical CSS properties throughout, locale-specific fonts, localized dates, times and numbers via `Intl`, and mirrored layouts only where a mirrored image or composition actually helps.
- **Calm where it counts.** The cinematic treatment is reserved for the pages that persuade (Home, the Invisalign journey). Task pages (Booking, Contact) deliberately have no scroll-triggered reveal around their forms.
- **Accessible interactions.** Keyboard-operable accordions and sliders with proper ARIA, visible focus states, forms with inline errors that move focus to the first invalid field, and a before/after slider that works with arrow keys.
- **SEO ready.** Per-locale metadata, canonical URLs and hreflang, Open Graph images per language, and a sitemap with language alternates.
- **No third-party font requests.** Fonts are self-hosted via Fontsource.

## Tech stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 (`@theme` tokens) · GSAP + ScrollTrigger · Motion · next-intl · Tabler Icons · Fontsource

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000 (it redirects to `/en`; Arabic lives at `/ar`).

| Script          | What it does               |
| --------------- | -------------------------- |
| `npm run dev`   | Development server         |
| `npm run build` | Production build           |
| `npm start`     | Serve the production build |
| `npm run lint`  | ESLint                     |

### Environment variables

| Variable                     | Purpose                                                                                                                 |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`       | Deployed origin (no trailing slash). Used for canonical URLs, hreflang, Open Graph and the sitemap.                     |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` to allow search indexing. Defaults to off: this is a demo with fictional contact details, so it ships `noindex`. |

## Project structure

```
src/
├── app/[locale]/        # routes: home, your-care, your-care/invisalign, first-visit, about, booking, contact
├── components/
│   ├── scenes/          # PinnedSceneSystem, Scene, progress indicator
│   ├── motion/          # Arrive, GradientBlob, AtmosphereWash, DrawIcon, SlowZoom
│   ├── layout/ ui/ typography/ forms/
│   └── home/ care/ journey/ compare/ booking/ about/ contact/ shared/
├── context/             # nav environment, active-scene context
├── data/                # typed mock data (treatments, time slots, gallery…)
├── hooks/               # useReducedMotion, useIsMobile, useHasMounted, …
├── i18n/                # next-intl routing, request config, navigation
├── lib/                 # cn(), SEO helpers, route list, booking helpers
└── messages/            # en.json, ar.json
```

## Documentation

[`ARCHITECTURE.md`](./ARCHITECTURE.md) covers the patterns the codebase relies on: the scene-progress system, the dual-mode reveal, RTL conventions and the reasoning behind them.

## Demo notes and limitations

- Imagery is AI-generated and stylized. Interior scenes approximate current boutique clinic design and haven't been checked against healthcare facility standards.
- Contact details, prices, credentials and testimonials are fictional.
- The booking and contact forms are front-end only: they validate fully and end in a mock success state. A production build would post to a serverless function (for example with Resend) to email the clinic and sync with a calendar.
- Arabic copy is written for tone rather than translated literally, and should still be reviewed by a native speaker before production use.

## What I'd do next

- Real availability and booking backend, and email delivery for both forms
- `Dentist` structured data (JSON-LD) once the details are real
- Per-page Open Graph images
- Content in a CMS rather than message files
- Consent-based analytics

## Author

Built by [Sadaf Nemani](https://sadafnemani.netlify.app), frontend developer and web designer.
[Email](mailto:sedefnemani@gmail.com)
