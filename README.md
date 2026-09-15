# Saralya website

Marketing site for [saralya.in](https://saralya.in): lending infrastructure for India's banks and NBFCs.

## Stack

- Vite 8, React 19, TypeScript
- Tailwind CSS v4 (CSS-first, tokens in `src/index.css`)
- `motion/react` for animation, `lucide-react` for icons
- React Router v7

## Getting started

```
npm install
npm run dev       # http://localhost:5173
npm run build     # typecheck + production build to dist/
npm run preview   # serve the production build
npm run lint      # oxlint
```

Deploys on Vercel from `main`; `vercel.json` rewrites every route to `index.html` for the SPA router.

## Routes

| Path          | Page                                                        |
| ------------- | ----------------------------------------------------------- |
| `/`           | Landing: Saral AI chat beside a short video reel            |
| `/home`       | Full overview: hero, how it works, modules, benefits, team  |
| `/products`   | The six Saral modules with looping visuals                  |
| `/technology` | Architecture, integrations, compliance                      |
| `/about`      | Founders and convictions                                    |
| `/demo`       | Interactive sample decision                                 |
| `/privacy`    | Privacy policy                                              |

## Project layout

```
public/
  img/                  photography used on /home and /about
  video/                landing reel (reel.mp4 + poster)
src/
  main.tsx              React entry
  App.tsx               router, page transitions, scroll/title handling
  index.css             Tailwind import, design tokens, small utilities
  content/
    site.ts             all site copy and data: modules, pillars, compliance, founders
    saral-ai.ts         the Saral AI script: departments, challenges, starter Q&A, onboarding
  components/
    ui/                 primitives: Button, Section/Container/SectionHead, Reveal (scroll animations)
    layout/             Navbar, Footer, PageHero, ClosingCta
    landing/            SaralAiChat, VideoReel
    home/               one component per section of /home
    products/           ModuleVisuals: one looping visual per module
  pages/                one file per route
```

## Conventions

- All copy lives in `src/content/`. Components render it; they do not own words.
- Claims about the product must be ones the founders will stand behind. Unverified numbers, customer names and logos stay out.
- Animations respect `prefers-reduced-motion`.
- Saral AI's free-text answers are a stub until the model endpoint exists (`ask()` in `SaralAiChat.tsx`). Captured notes go out by `mailto:` until a lead backend is added.
