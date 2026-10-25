import Lenis from 'lenis'

/* One smooth-scroll driver for the whole site, so the wheel eases instead
   of stepping and the stacked takeovers read as one continuous movement.
   Every programmatic scroll goes through here too — a native
   `scrollTo({ behavior: 'smooth' })` would fight Lenis's own loop. */

/* A refresh should land at the top of the page, not halfway down it. */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

/* A `#section` link someone follows or pastes still jumps to that section.
   Reloading on one, though, is someone starting the page again — so the
   anchor is dropped and the page opens at the top. */
const navType = (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined)?.type
if (navType === 'reload' && window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search)
}

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const lenis = new Lenis({
  autoRaf: true,
  duration: 1.05,
  smoothWheel: !reduce,
})

/* `force` so these still work while the landing stack holds Lenis. */
export const scrollToEl = (id: string, offset = 0) => {
  const el = document.getElementById(id)
  if (el) lenis.scrollTo(el, { immediate: reduce, offset, force: true })
}

/* Chrome puts the old offset back after the document loads, and does it
   late — once images and fonts have given the page its real height, which
   can be a second after `load`. One call to the top is not enough, so the
   top is held briefly and given up the moment the visitor touches
   anything. */
export const holdTop = () => {
  if (window.location.hash) return
  let released = false
  const release = () => {
    released = true
  }
  for (const ev of ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const) {
    window.addEventListener(ev, release, { once: true, passive: true })
  }
  const until = performance.now() + 2000
  const tick = () => {
    if (released || performance.now() > until) return
    if (window.scrollY !== 0) lenis.scrollTo(0, { immediate: true, force: true })
    requestAnimationFrame(tick)
  }
  tick()
}

holdTop()
window.addEventListener('load', holdTop)
