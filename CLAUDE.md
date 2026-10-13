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

See README.md for the tree. In short: `content/` owns every word, `components/ui`
are primitives, `components/layout` is the shell, `components/landing` is the
`/` page (SaralAiChat, VideoReel), `components/home` is one file per section of
`/home`, `pages/` is one file per route.

## Styling

Everything is Tailwind v4 utilities + `motion/react` (Framer Motion) +
`lucide-react` icons. Tokens live in the `@theme` block in `src/index.css`
(`bg-accent`, `text-ink`, `text-muted`, `shadow-glow`, `font-mono`, …).

Conventions:
- **Type**: nine named sizes in `@theme` (`text-label` … `text-display`).
  Never write an arbitrary `text-[18px]` or a new `clamp()`; pick the
  nearest step.
- **Colour means status, never identity.** `accent` is the brand;
  `green`/`amber`/`red` mean pass/warn/fail only. Modules, avatars and
  chips are told apart by name and photograph, not by hue.
- Scroll reveals: wrap in `<FadeIn>` or `<Stagger>`/`<Item>` from
  `components/ui/Reveal`; never hand-roll IntersectionObservers.
- Looping visuals use `repeat: Infinity` with `repeatDelay` and respect
  `prefers-reduced-motion` (global CSS kill-switch + `useReducedMotion`).
- Keep copy short: headline, one line, chips. The lead's standing complaint
  is "too text heavy"; prefer a visual over a paragraph.
- Each page ends with `<ClosingCta />`.

## Interactions (all React state, no DOM scripting)

- Home hero: looping state machine idle → tap → processing → sanctioned
- Saral AI: starter questions (STARTERS, scripted answers) or the guided
  note: dept → challenges (multi) → book size → note (lifecycle rail,
  one tip per challenge, module fit, 30-day onboarding, mailto). Script data
  lives in `content/saral-ai.ts` (DEPARTMENTS, CHALLENGES, BOOK_SIZES,
  STARTERS, ONBOARDING). Free-text `ask()` in `SaralAiChat.tsx` is a stub until the model endpoint exists;
  captured notes go by mailto until an email/lead backend is added.
- HowItWorks: applicant cards cycle, packets travel along beams, lanes tick up
- Products: sticky left stage swaps visual via `useInView` on each module block
- Demo: `empty → loading → report`; the run button keeps the `.demo-run` class
  for the screenshot harness
- Counters: `<Counter to=… />` animates when scrolled into view

## Verifying UI changes

There may be no browser tool in this environment. `puppeteer-core` is not
installed and nothing needs it: Node 24 ships a global `WebSocket`, so a
~40-line CDP client can launch
`C:/Program Files/Google/Chrome/Application/chrome.exe --headless=new
--remote-debugging-port=…`, call `Emulation.setDeviceMetricsOverride`
(required — `--window-size` floors at ~500px on Windows, which silently
crops `--screenshot` output), scroll through to trigger reveals, then
`Page.captureScreenshot`. Capture viewport clips at scroll offsets;
`captureBeyondViewport` stalls on the full ~20,000px page. Always check:
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
