# Saralya website

Marketing site for [saralya.in](https://saralya.in), lending infrastructure for India's NBFCs.
A single-page React app with no backend: copy and data are static TypeScript modules, and
contact actions use `mailto:` links.

## Stack

| Concern    | Choice                                                        |
| ---------- | ------------------------------------------------------------- |
| Build      | Vite 8, TypeScript 6                                          |
| UI         | React 19, React Router 7                                      |
| Styling    | Tailwind CSS 4 (CSS-first: tokens live in `src/index.css`)    |
| Motion     | `motion/react` for animation, `lenis` for smooth scrolling    |
| Icons      | `lucide-react`                                                |
| Lint       | `oxlint`                                                      |
| Hosting    | Vercel (`vercel.json` rewrites every path to `index.html`)    |

Requires Node 20.19+ (Node 22 or 24 recommended).

## Getting started

```bash
npm install
npm run dev       # dev server on http://localhost:5173
npm run build     # typecheck (tsc -b) + production build to dist/
npm run preview   # serve the production build
npm run lint      # oxlint
```

## Routes

| Path          | Page file                | Purpose                                                    |
| ------------- | ------------------------ | ---------------------------------------------------------- |
| `/`           | `pages/Landing.tsx`      | Hero video, then the Saral Saarthi chat screen             |
| `/products`   | `pages/Product.tsx`      | Platform: architecture, role dashboards, problem, solution |
| `/agents`     | `pages/Agents.tsx`       | Agent platform tracks, use cases, compliance               |
| `/privacy`    | `pages/Privacy.tsx`      | Privacy policy                                             |
| `/saralya-ai` | `pages/SaralyaAi.tsx`    | Full-screen AI workspace (own chrome, no site nav/footer)  |

`/home` redirects to `/`, `/demo` to `/products#demo`, and unknown paths render the landing page.
Every page except the landing is lazy-loaded and prefetched after first paint (`App.tsx`).

## Project structure

```
public/
  img/                   photography and logos
  video/                 landing hero video (1080p, 720p, poster)
src/
  main.tsx               entry point
  App.tsx                routes, page transitions, scroll restoration, document titles
  index.css              Tailwind import, design tokens (@theme), custom utilities
  content/               all copy and data, one file per page or feature
    site.ts              shared data: contact email, product modules, company convictions
    product.ts           /products
    agents.ts            /agents data model (seats, wants, plans)
    agent-platform.ts    /agents platform tracks
    use-cases.ts         /agents use-case carousel
    chat.ts              landing chat script (roles, starter questions, diagnostic)
    workspace.ts         /saralya-ai tools and notices
  lib/
    scroll.ts            the single Lenis instance and scroll helpers
    chat.ts              chat helpers: ask() stub, file starter, accepted file types
    speech.ts            useSpeech(): browser speech-to-text
  components/
    ui/                  primitives: Button, Section/Container, Reveal (FadeIn, Held)
    layout/              Navbar, Footer, PageHero, ClosingCta
    landing/             hero, hero video, Saarthi chat screen and its parts
    agents/              /agents sections, the animated AgentFlow diagram, phone mocks
  pages/                 one component per route
```

## Conventions

- **Content is data.** Words, figures and lists live in `src/content/`; components render them.
- **Design tokens only.** Use the colours and the type scale defined in the `@theme` block of
  `src/index.css` (`text-label` … `text-mega`, `bg-ink`, `text-accent`, …) rather than arbitrary
  values. `green`/`amber`/`red` mean pass/warn/fail and are never used decoratively.
- **Typography.** Headings use the `display` utility (Clash Display); labels, tabs and buttons use
  Geist Mono in caps; body text uses the sans stack.
- **Motion.** Scroll reveals go through `FadeIn` in `components/ui/Reveal.tsx`. Programmatic
  scrolling goes through `lib/scroll.ts`, never `window.scrollTo({ behavior: 'smooth' })`, which
  conflicts with Lenis. Everything respects `prefers-reduced-motion`.
- **Auto-rotating content pauses** on hover and keyboard focus.
- **No third-party company names** (partners, bureaus, core-banking vendors) in copy. Standards
  and regimes such as Account Aggregator, GSTN, RBI and DPDP are fine.

## Not yet wired up

- `ask()` in `src/lib/chat.ts` returns a placeholder until the model endpoint exists.
- Uploaded files stay in the browser; there is no upload endpoint.
- Demo requests, sign-ups and notes open the visitor's mail client (`mailto:`).
- `/saralya-ai` stores conversations in `localStorage`; there are no accounts.
- Copy awaiting confirmation is marked `TODO(content)`: run `grep -rn "TODO(content)" src`.
