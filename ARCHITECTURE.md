# Architecture Notes

Short reference for the patterns this codebase relies on — not a full
walkthrough, just enough for anyone (including future me) to extend
the project consistently instead of re-deriving these decisions from
scratch. Each section links to where the real implementation lives.

## Scene-progress system

The pinned scroll experience (`PinnedSceneSystem.tsx`) writes a live
`--scene-progress` (0→1) CSS custom property onto whichever scene is
currently active, every scroll tick — not React state, so nothing
re-renders on scroll. Any component wanting scroll-scrubbed motion
(word emphasis, image reveals, progress lines) reads this variable
directly in CSS via `calc()`/`clamp()`.

Full rules — timing boundaries, the `flow`/mobile fallback
requirement, how to scope a derived variable via `Scene`'s
`className` prop — are documented as a comment block at the top of
`src/components/scenes/PinnedSceneSystem.tsx`. Read that before
building a new scroll-driven section.

Shared timing constants live in `src/lib/scene-timing.ts` (JS side)
and `:root` in `globals.css` (`--scene-stable-start`,
`--scene-stable-end`, CSS side). These two must be kept in sync by
hand — there's no way to share a literal value across TS and CSS.

## Motion: dual-mode reveal (`Arrive` / `useRevealState`)

`src/hooks/useRevealState.ts` is the shared logic behind every
scroll-triggered fade: if a component is rendered inside a `Scene`
(pinned mode), it reads visibility from `SceneActiveContext` — GSAP
controls exactly when it's "on." If there's no `Scene` context (flow
mode, mobile, or any plain page section), it falls back to Framer
Motion's own `whileInView`.

`Arrive` (`src/components/motion/Arrive.tsx`) is the base component
built on this hook — default choice for any element that should fade
up once. `DrawIcon` (`src/components/motion/DrawIcon.tsx`) is the
same pattern applied to SVG `pathLength` for self-drawing icons.

Any new motion component that needs to work correctly both inside
pinned scenes and on plain flow pages should build on
`useRevealState`, not reimplement the context check.

## Styling: `cn()` and design tokens

`src/lib/cn.ts` wraps `clsx` + `tailwind-merge`, configured with this
project's actual custom token groups (colors, `text-h1`/`h2`/`h3`,
etc.) — always use `cn(...)` instead of template-literal string
concatenation for any component accepting a `className` override, or
conflicting Tailwind classes won't resolve correctly.

Design tokens (`globals.css`, inside `@theme`) are the single source
for color, type scale, radius, and shadow. `shadow-soft` is
deliberately the _only_ shadow token in use — don't reach for
Tailwind's default `shadow-md`/`lg`.

**Tailwind dynamic-class gotcha:** utility classes must appear as
complete, literal strings somewhere in source for Tailwind's scanner
to generate them. Never build one via template-literal interpolation
(`` `text-${size}` ``) — map to a literal string via a lookup object
instead.

## Buttons

Three-tier hierarchy, not one component with variants bolted on:
`primary` (filled gold pill, circle-expand hover), `secondary`
(text-only, inherits `text-current`), `tertiary` (outlined). See
`src/components/ui/Button.tsx`. Pick by hierarchy, not by "which one
looks free" — `secondary`'s `text-current` inheritance is what makes
it work correctly on both dark and light scenes without per-instance
color overrides; don't hardcode a color on it unless you have a
specific reason.

## i18n / RTL

- **Logical properties always**, never physical (`ms-`/`me-`/`ps-`/`pe-`/`start-`/`end-`,
  never `ml-`/`mr-`/`left-`/`right-`) — this is what lets most
  layouts flip correctly under `dir="rtl"` with zero JS branching.
  Exception: anything tied to real pixel/pointer math rather than
  reading order (e.g. `CompareSlider`'s drag position) stays
  physical.
- **Fonts switch per-locale via plain CSS**, not JS — `[dir="rtl"] .font-heading`
  overrides in `globals.css`, driven by the `dir` attribute already
  required on `<html>`. No custom-property indirection (that path
  caused a real SSR hydration bug).
- **JS-driven animation directionality** (GSAP translate offsets,
  drag directions) needs an explicit `useDirection()` check and a
  `dirX = isRTL ? -1 : 1` multiplier — the browser can't infer this
  for imperative transforms the way it can for CSS layout.
- **Every visible string goes through `next-intl`** — `useTranslations`
  (client) / `getTranslations` (server). Watch for the "assembled
  sentence" trap: concatenating already-translated fragments into an
  untranslated template still needs its own message key.

## Client-only browser state

Any hook reading a browser API that isn't available during SSR
(`matchMedia`, `scrollY`, mount status) uses `useSyncExternalStore`,
not `useState` + `useEffect` — see `useReducedMotion`, `useIsMobile`,
`useScrolled`, `useHasMounted`. This avoids React 19's
`set-state-in-effect` lint error and, more importantly, avoids a real
class of bug where a brief "wrong default" render window lets
expensive setup (GSAP pinning) run before the real client state is
known.

## Nav environment

`NavEnvironmentContext` lets the pinned scene system tell `Navbar`
what's currently behind it (`image`/`dark`/`light`/`solid`), so the
nav morphs its background/text color per active scene. Any new page
that doesn't use `PinnedSceneSystem` gets the `solid` default
automatically — no per-page wiring needed unless it wants pinned
scenes too.
