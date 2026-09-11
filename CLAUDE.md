# Saralya website

Marketing website for Saralya (saralya.in) — lending infrastructure for
India's NBFCs. Ground-up redesign of the existing site.

## The brief

- Anyone (CTO, investor, regulator, NBFC operator) must understand what
  Saralya does within 3–4 seconds of landing. Benchmarks: Razorpay, Slide,
  Apple.
- Core message: **make lending as easy as UPI** — one tap / one API call.
- Design quality bar is very high. Every section should earn its place.

## Stack

- Vite + React 19 + TypeScript
- Tailwind v4 via `@tailwindcss/vite` (no `tailwind.config` — v4 CSS-first)
- React Router v7 (`react-router-dom`)
- Fonts: Manrope (UI) + Geist Mono (labels/data), loaded from Google Fonts in
  `index.html`

This matches the "Planned Stack" the team recorded in the old repo's
`DEPLOYMENT.md`.

## Commands

```
npm run dev      # http://localhost:5173
npm run build    # tsc + vite build → dist/
npx tsc -p tsconfig.app.json --noEmit   # typecheck only
```

## Layout

```
src/
  App.tsx               Router + Nav/Footer shell + ScrollProgress
  pages/Home.tsx        Assembles home sections in order
  components/           One file per section (Hero, StatsMarquee, LivePipeline,
                        Bento, Personas, Demo, UpiComparison, Modules, Orbit,
                        Roi, Architecture, Lifecycle, Compliance,
                        DeployTimeline, Voices, Faq, Partners, Cta, Footer)
  components/Reveal.tsx Wrapper that fades a block in on scroll
  components/icons.tsx  Shared tiny SVG icons (Check, ArrowRight)
  hooks/useReveal.ts    IntersectionObserver behind <Reveal>
  styles/legacy.css     Design tokens (CSS vars) + all prototype styles
  index.css             `@import "tailwindcss"` + legacy.css
legacy-source/saralya-v5.html   The original single-file prototype, kept for
                                reference only — never edit or import it
```

## How styling works right now

The site was ported from a single-file HTML prototype (`saralya-v5.html`).
Its CSS was moved verbatim into `src/styles/legacy.css` so the visual
design carried over pixel-for-pixel; components use those class names.

Going forward:
- New/redesigned work uses Tailwind utilities.
- Delete rules from `legacy.css` as the sections they belong to are rebuilt.
- Keep things in `legacy.css` only when Tailwind can't express them cleanly
  (keyframes, pseudo-elements, gradient text, range-input thumbs).
- Design tokens live as CSS custom properties on `:root` in `legacy.css`
  (`--accent`, `--ink`, `--muted`, `--sh-glow`, etc). Reuse them via
  `var(--x)` or Tailwind arbitrary values until they're promoted to a
  Tailwind `@theme` block.

Gotcha already hit: the architecture layer colours are `.l1`–`.l5`; don't
reuse those class names anywhere else (the hero originally used `.l2` and
got a blue box painted behind the headline).

## Interactions (all React state, no DOM scripting)

- Hero: rotating headline phrase, live "decisions today" counter, animated
  decision-card step loop (respects `prefers-reduced-motion`)
- LivePipeline: approved/flagged/rejected counters tick up
- Bento: random sparkbars, uptime ring animates on scroll-in
- Personas: tab state selects panel; content is data-driven (`PANELS`)
- Demo: `empty → loading → report` state machine; gauge/bars animate
- Roi: four sliders, derived outputs, flash on change
- Lifecycle: gradient line fills on scroll-in
- Everything else: static, wrapped in `<Reveal>` for fade-up

## Verifying UI changes

There's no browser tool in this environment; use headless Edge via
`puppeteer-core` from the scratchpad (see the session's `clip.mjs` /
`shoot.mjs` pattern: launch
`C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe`, scroll
through to trigger reveals, screenshot in ~2900px clips at 1400px and
400px, capture `console` errors). Always check:
- zero console errors/warnings
- `document.documentElement.scrollWidth <= viewport width` at 400px
- the demo runs end-to-end after clicking `.demo-run`

## Content sources

- Old live site + codebase: `C:\Users\HP\Desktop\Saralya` — **read-only**
  reference. Never write there. Useful files:
  - `saralya_corrections.md` — founder-approved copy edits (positioning line
    "Making Lending Saral for Bharat", "4+ decades of experience. 200+
    banks of pedigree.", benefits copy, About/conviction text, and a list of
    claims the founders struck as unverifiable)
  - `about.html`, `products.html`, `technology.html`, `privacy-policy.html`
  - `api/app.py` — Flask form handler that emails vikas@ and vishal@saralya.in
  - `DEPLOYMENT.md` — Nginx on EC2 ap-south-1, planned stack
- Live site: https://saralya.in

## Open content flags (raise with the lead before launch)

Inherited from the prototype and **not verified**:
- Partner logos naming real companies (Aye Finance, Paisalo, CSL Finance)
- Named testimonials in the Voices section
- Headline stats: ₹10,000Cr+, 25+ NBFC partners, 500+ LSPs, 5M+
  applications, 99.95% uptime, 4.7s decision, 62% STP

The founders have previously struck unverifiable claims (see corrections
doc); apply the same standard here.

## Working agreements

- Build fresh in this repo; do not modify the old codebase.
- Commit as we go; small, descriptive commits.
- Design direction comes from the user section by section — don't redesign
  ahead of that.
