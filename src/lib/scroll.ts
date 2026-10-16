import Lenis from 'lenis'

/* One smooth-scroll driver for the whole site, so the wheel eases instead
   of stepping and the stacked takeovers read as one continuous movement.
   Every programmatic scroll goes through here too — a native
   `scrollTo({ behavior: 'smooth' })` would fight Lenis's own loop. */

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
