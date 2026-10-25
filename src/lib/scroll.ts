import Lenis from 'lenis'

/* Single Lenis smooth-scroll instance for the site. Route all programmatic
   scrolling through it: native smooth scrolling would conflict with Lenis's
   loop. */

/* always start at the top on refresh */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

/* keep #hash links working, but drop the hash on reload so the page opens at
   the top */
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

/* `force` so this works while the landing stack has Lenis stopped */
export const scrollToEl = (id: string, offset = 0) => {
  const el = document.getElementById(id)
  if (el) lenis.scrollTo(el, { immediate: reduce, offset, force: true })
}

/* Chrome restores the previous scroll offset late (after images and fonts
   settle), so hold the top for up to 2s, releasing on any user input. */
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
