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
  App.tsx                  Router (/ = Saral AI landing, /home = full site,
                           /products, /technology, /about, /demo, /privacy) + Nav/Footer shell + scroll-to-top/title
  index.css                `@import "tailwindcss"` + @theme design tokens +
                           the few @utility helpers Tailwind can't express
                           (text-gradient, grid-paper, mask-fade-*, eyebrow)
  content/site.ts          All copy/data: MODULES, PILLARS, COMPLIANCE,
                           CONVICTIONS, FOUNDERS, INTEGRATIONS, CONTACT_EMAIL
  components/ui/           Primitives: Button/ButtonLink, Section/Container/
                           SectionHead, Motion (FadeIn, Stagger/Item, Counter)
  components/layout/       Nav (active pill, mobile menu), Footer, PageHero,
                           Cta (dark closing block used on every page)
  components/home/         Hero (looping tap→sanction card), SaralAi (guided
                           diagnostic → note; `ask()` is the model seam), IntegrationsMarquee,
                           HowItWorks (beams + core), UpiAnalogy, ModulesPreview,
                           Benefits (bento w/ mini visuals), Pedigree
  components/products/     ModuleVisuals — one bespoke looping animation per
                           module, used by the sticky showcase on /products
  pages/                   Landing (copy left, SaralAi chat right), Home, Products, Technology, About, Demo, Privacy
```

## Styling

Everything is Tailwind v4 utilities + `motion/react` (Framer Motion) +
`lucide-react` icons. Tokens live in the `@theme` block in `src/index.css`
(`bg-accent`, `text-ink`, `text-muted`, `shadow-glow`, `font-mono`, …).

Conventions:
- Scroll reveals: wrap in `<FadeIn>` or `<Stagger>`/`<Item>` from
  `components/ui/Motion` — never hand-roll IntersectionObservers.
- Looping visuals use `repeat: Infinity` with `repeatDelay` and respect
  `prefers-reduced-motion` (global CSS kill-switch + `useReducedMotion`).
- Keep copy short: headline, one line, chips. The lead's standing complaint
  is "too text heavy"; prefer a visual over a paragraph.
- Each page ends with `<Cta />`.

## Interactions (all React state, no DOM scripting)

- Home hero: looping state machine idle → tap → processing → sanctioned
- Saral AI: starter questions (STARTERS, scripted answers) or the guided
  note: dept → challenges (multi) → book size → note (lifecycle rail,
  one tip per challenge, module fit, 30-day onboarding, mailto). Script data
  lives in `content/site.ts` (DEPARTMENTS, CHALLENGES, BOOK_SIZES,
  ONBOARDING). Free-text `ask()` is a stub until the model endpoint exists;
  captured notes go by mailto until an email/lead backend is added.
- HowItWorks: applicant cards cycle, packets travel along beams, lanes tick up
- Products: sticky left stage swaps visual via `useInView` on each module block
- Demo: `empty → loading → report`; the run button keeps the `.demo-run` class
  for the screenshot harness
- Counters: `<Counter to=… />` animates when scrolled into view

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
