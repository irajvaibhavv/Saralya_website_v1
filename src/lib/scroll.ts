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

/* `force` so these still work while the landing stack holds Lenis. */
export const scrollToY = (y: number, immediate = reduce) => lenis.scrollTo(y, { immediate, force: true })

export const scrollToEl = (id: string, offset = 0) => {
  const el = document.getElementById(id)
  if (el) lenis.scrollTo(el, { immediate: reduce, offset, force: true })
}

/* Chrome puts the old offset back after the document loads, and does it
   late — once images and fonts have given the page its real height, which
   can be a second after `load`. One call to the top is not enough, so the
   top is held briefly and given up the moment the visitor touches
   anything. */
const holdTop = () => {
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
