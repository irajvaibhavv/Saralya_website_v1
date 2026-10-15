# Saralya website

Marketing website for Saralya (saralya.in) — lending infrastructure for
India's NBFCs. Ground-up redesign of the existing site.

## The brief

- Anyone (CTO, investor, regulator, NBFC operator) must understand what
  Saralya does within 3–4 seconds of landing. Benchmarks: Razorpay, Slide,
  Apple.
- Core message: **make lending as easy as UPI** — one tap / one API call.
- Design quality bar is very high. Every section should earn its place.
- **Scope: this repo is the website only.** The chatbot and the ML model
  (trained on Indian banking data) already exist and get integrated later —
  do not design, build or hedge around them.
- Design benchmark the lead gave for the next pass is
  [nugget.com](https://www.nugget.com) (Zomato's CRM agents product):
  ~8 sections, one accent, a photograph per card, carousels instead of
  endless stacking, security badges as a strip.

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

npx vite --port 5180 --strictPort                      # v1 dev server
npx vite preview --outDir .v2-build --port 5181        # frozen v2 snapshot
```

`.v1-build/`, `.v2-build/`, `.v3-build/` are frozen `vite build` snapshots,
one per version, so an old design can be served without switching branches.
They are gitignored.

## Versions

Three designs were built on branches `v1`, `v2`, `v3`. **The lead picked `v1`
and all work happens there**; `v2` and `v3` are parked for reference only.
`main` is behind. Nothing has been pushed since the redesign started.

## Layout

See README.md for the tree. In short: `content/` owns every word, `components/ui`
are primitives, `components/layout` is the shell, `components/landing` is the
`/` page (SaralAiChat, VideoReel), `components/home` is one file per section of
`/home`, `pages/` is one file per route.

Routes: `/` (Landing), `/home`, `/privacy`. `/products` and `/demo` redirect
to the matching `#` anchor on `/home`.

`/home` is eleven sections, in order: Hero, Photo, HowItWorks, UpiAnalogy,
Products, Demo, MonthlyReview, InspectionReadiness, Benefits, TrackRecord,
ClosingCta. Technology and About were deleted on the lead's instruction —
nav is Overview and Products only. Two things died with them and have not
been re-homed: the founder-approved pedigree line ("4+ decades of
experience. 200+ banks of pedigree.") and the core-integration /
compliance story. A Nugget-style security badge strip is the cheap
substitute if the lead wants them back.

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
  (This pass replaced 27 arbitrary sizes across 12 `clamp()` formulas with
  nine tokens, and cut 24 colour tokens to 19 — `blue`, `purple` and
  `peach` are gone. Do not reintroduce them.)
- Scroll reveals: wrap in `<FadeIn>` or `<Stagger>`/`<Item>` from
  `components/ui/Reveal`; never hand-roll IntersectionObservers.
- Looping visuals use `repeat: Infinity` with `repeatDelay` and respect
  `prefers-reduced-motion` (global CSS kill-switch + `useReducedMotion`).
- Keep copy short: headline, one line, chips. The lead's standing complaint
  is "too text heavy"; prefer a visual over a paragraph. **Never fill a thin
  section with a new paragraph** — use a chart, a diagram, a photograph, a
  label-only chip row, or cut the section.
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

**Never name a third-party company on the site.** No partner logos, no
"integrates with" lists of cores or bureaus (FinnOne, Lentra, Finflux,
AllCloud), no named testimonials. The lead has had these removed twice.
Standards and regimes are fine — Account Aggregator, GSTN, RBI MD-FRM, DPDP
— because those are infrastructure, not companies we claim to partner with.

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
- **Never `git push` without the user saying so explicitly.** Standing
  instruction; commits pile up locally until they approve.
- **No `Co-Authored-By` trailer on commits.** The repo must show only the
  user as contributor.
- No unnecessary code, files or abstractions. Edit an existing file before
  adding a new one.
- Design direction comes from the user section by section — don't redesign
  ahead of that.

## Open work

- **Agents section** (next, started 2026-10-15). The lead wants an
  `#agents` block on `/home` where anyone at an NBFC — underwriter, credit
  officer, collections officer, RM, compliance, ops — picks a seat,
  multi-selects the flows they want, and gets an assembled agent. Drive it
  off the data that already exists: `ROLES` in `content/saral-ai.ts`,
  `MODULES` and `CHALLENGES` in `content/site.ts`. A section on `/home`,
  not a new page; it outputs a spec, not a deploy button; no
  drag-and-drop canvas. Note that Nugget's own marketing page has no real
  builder UI on it.
- **Photographs are the blocker on the look.** The site has two images and
  ~38 line icons; Nugget has a photograph per card. Needs ~8–12 real
  Indian lending images (branch counter, field officer, ledger, borrower's
  shopfront) plus the hi-res logo, from Vishal.
- Section count is still 11 against Nugget's ~8. `MonthlyReview` and
  `InspectionReadiness` are the candidates, but the lead only named
  Technology and About — ask before cutting more.
- Undecided with the lead: Saarthi vs Saral AI naming; login gate / token
  tiers / social login; dark-mode toggle.
