---
name: design-craft
description: Rules for typography, spacing, layout and motion on the Saralya site. Use when building or reshaping any UI, reviewing a page that "looks off", or tuning an animation.
---

# Design craft

Companion to the `frontend-design` skill, which sets aesthetic direction.
This one is the measurable half: the numbers, and the motion rules.

If a choice here conflicts with something the lead asked for directly, the
lead wins — note the conflict, don't silently obey the rule.

## Motion

Animation principles distilled from Emil Kowalski's public writing
(animations.dev, emilkowal.ski) — not an official skill of his.

**Duration.** Most UI motion belongs in 150–300ms. Under 100ms reads as a
jump cut; over 400ms feels sluggish on repeat. Scale with distance, not
importance: a 4px hover nudge is ~120ms, a full panel entrance ~400ms.
Exits run faster than entrances (~70% of the duration) — nobody wants to
wait to dismiss something.

**Easing.** Never `linear` for anything physical, and never the CSS `ease`
default. Elements entering or moving on screen use ease-out, so they arrive
fast and settle. Elements leaving use ease-in. This project's token is
`[0.22, 1, 0.36, 1]` (`EASE` in `pages/Landing.tsx`). Springs beat duration
curves for anything interruptible or gesture-driven — height that grows with
content, drag, layout shifts.

**Animate transform and opacity.** These are the only two properties the
compositor handles for free. Animating `width`, `height`, `top` or `margin`
triggers layout on every frame. When height genuinely has to move (a pane
growing with the conversation), use Framer Motion's `layout` prop or an
explicit spring on height, and accept it as a deliberate exception.

**Interruptibility.** Motion must survive being interrupted mid-flight —
an animation that snaps or queues when someone clicks twice reads as broken.
Framer Motion handles this if you animate to a target rather than replaying
a keyframe array on state change.

**Origin.** Things should animate from where they came from. A panel opened
by a card should appear to grow from that card, not fade in at screen centre.

**Stagger.** 40–120ms between siblings. More than that and the list feels
like it is loading rather than arriving. Cap the total: stagger the first
handful, show the rest together.

**Restraint is the tell.** Generated pages animate everything. Pick the one
or two moments that carry meaning and leave the rest still. If a reviewer
notices the animation before the content, it is too much.

Always respect `prefers-reduced-motion` — `useReducedMotion()` plus the
global kill-switch in `src/index.css`. Reduced motion means no movement, not
no feedback: keep opacity and colour changes.

## Typography

- One scale, no ad-hoc sizes. Steps roughly 1.2–1.25x apart.
- Body copy under 80 characters per line (`max-w-xl` / `max-w-2xl`).
- Line-height falls as size rises: ~1.6 for body, ~1.1–1.2 for display.
- Tighten tracking on large type (`tracking-tight`), never on small.
- Weight carries hierarchy better than size. Two weights beat four sizes.
- Numbers in `font-mono` (Geist Mono) so columns align and figures read as data.

## Spacing

- One spacing scale, multiples of 4px. A stray `mt-[13px]` is a bug.
- Space belongs between *groups*, not sprinkled evenly. Related things sit
  close; the gap between sections should be several times the gap within one.
- Vertical rhythm beats horizontal decoration — get the stack spacing right
  before reaching for borders or cards to create separation.
- Optical over mathematical: icons beside text usually need a half-step
  adjustment to look centred even when they measure centred.

## Layout

- Establish a max width and hold it. This site uses `max-w-[1080px]`.
- Alignment is the cheapest quality signal. Anything that fails to line up
  with a neighbour should be a deliberate choice you can name.
- Contrast: WCAG AA (4.5:1 body, 3:1 large). Text over video or imagery
  needs a scrim, and the scrim should be weighted toward the text, not
  flattened over the whole frame.
- Depth comes from large soft shadows and a 1px light border, not from
  heavy drop shadows or thick strokes.

## Taste — references

When the brief says "make it good", look at work that already is. The lead's
own benchmarks come first.

- **Razorpay, Slide** — Indian fintech, the direct peer set (in CLAUDE.md).
- **Apple** — restraint, product-as-hero, motion tied to scroll.
- **Wistia** — the lead pointed at this for video treatment: video supports
  the page, it is not the page.
- **Linear, Stripe, Vercel** — density done well: tight type scales,
  purposeful motion, dark surfaces that don't turn muddy.

Use these for structure and rhythm, not for copying components. If output
resembles a generic template — centred hero, three feature cards, gradient
blob — throw it out and go back to the subject matter.

## Checking the work

Use the Playwright MCP server (`playwright` plugin) rather than hand-rolled
puppeteer scripts. See CLAUDE.md → "Verifying UI changes".

Look at the screenshot before saying it is done. Most design bugs are
obvious on sight and invisible in the diff.
