import Lenis from 'lenis'

/* One smooth-scroll driver for the whole site, so the wheel eases instead
   of stepping and the stacked takeovers read as one continuous movement.
   Every programmatic scroll goes through here too — a native
   `scrollTo({ behavior: 'smooth' })` would fight Lenis's own loop. */

/* A refresh should land on the reel, not halfway through the takeover the
   visitor happened to leave off at. */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const lenis = new Lenis({
  autoRaf: true,
  duration: 1.05,
  smoothWheel: !reduce,
})

export const scrollToY = (y: number, immediate = reduce) => lenis.scrollTo(y, { immediate })

export const scrollToEl = (id: string) => {
  const el = document.getElementById(id)
  if (el) lenis.scrollTo(el, { immediate: reduce })
}

/* Chrome still puts the old offset back after the document loads, so take
   the top again once everything has settled. */
const toTop = () => {
  if (!window.location.hash) lenis.scrollTo(0, { immediate: true, force: true })
}
toTop()
window.addEventListener('load', () => {
  toTop()
  requestAnimationFrame(toTop)
})
