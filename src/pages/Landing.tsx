import { useEffect, useRef, useState } from 'react'
import { Hero } from '../components/landing/Hero'
import { TwoDoors } from '../components/landing/TwoDoors'
import { SaralAiSection } from '../components/landing/SaralAiSection'
import { ClosingCta } from '../components/layout/ClosingCta'
import { Held } from '../components/ui/Reveal'
import type { Role } from '../components/landing/SaralAiChat'
import type { Starter } from '../content/chat'
import { lenis, scrollToEl } from '../lib/scroll'

/* Landing page: the hero and the Saarthi screen are stacked sticky layers;
   each scroll gesture moves exactly one screen. Below the stack the page
   scrolls normally. */

/** seconds per screen transition */
const TRAVEL = 1.05
/** ease-in-out cubic */
const GLIDE = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export function Landing() {
  const [pending, setPending] = useState<Starter | null>(null)
  const [seat, setSeat] = useState<Role | null>(null)

  /* Screen paging: Lenis is stopped inside the stack so scrolling can't rest
     between screens, and restarted once the user leaves the bottom. */
  /* end time of the current transition (a timestamp, not a flag, so an
     interrupted transition can't leave paging stuck) */
  const until = useRef(0)
  /* accumulated scroll pressure at the bottom of the Saarthi screen, so a light
     nudge doesn't leave it */
  const push = useRef(0)
  const pushed = useRef(0)
  /* last interaction inside Saarthi */
  const touched = useRef(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    /* measure screen tops from rendered heights */
    const tops = () => {
      const out: number[] = []
      let y = 0
      for (const el of document.querySelectorAll<HTMLElement>('[data-screen]')) {
        out.push(y)
        y += el.offsetHeight
      }
      return out
    }
    const last = () => {
      const t = tops()
      return t[t.length - 1] ?? 0
    }

    const page = (dir: number) => {
      const t = tops()
      const y = window.scrollY
      /* current screen: the nearest resting point at or above scrollY */
      let i = 0
      for (let n = 0; n < t.length; n++) if (y >= t[n] - 2) i = n
      const to = t[Math.min(t.length - 1, Math.max(0, i + dir))]
      if (to === undefined || Math.abs(to - y) < 2) return
      until.current = performance.now() + TRAVEL * 1000 + 80
      lenis.scrollTo(to, {
        force: true,
        duration: TRAVEL,
        easing: GLIDE,
        onComplete: () => {
          /* on the last screen, hand scrolling back to Lenis */
          if (to >= last() - 2) lenis.start()
        },
      })
    }

    /* returns true when paging handles the gesture */
    const take = (dir: number, e: Event) => {
      if (!dir) return false
      if ((e.target as Element | null)?.closest?.('[data-lenis-prevent]')) return false
      /* mid-transition: swallow the rest of the gesture (trackpads send dozens
         of events per flick) */
      if (performance.now() < until.current) {
        e.preventDefault()
        /* extend the hold until events stop */
        until.current = Math.max(until.current, performance.now() + 260)
        return true
      }
      const y = window.scrollY
      /* user is interacting with Saarthi: don't move */
      if (y >= last() - 2 && performance.now() - touched.current < 2500) {
        e.preventDefault()
        return true
      }
      /* at the Saarthi screen going down: require enough accumulated scroll
         before handing back to normal scrolling */
      if (dir > 0 && y >= last() - 2 && y <= last() + 2) {
        const now = performance.now()
        if (now - pushed.current > 400) push.current = 0
        pushed.current = now
        push.current += Math.abs((e as WheelEvent).deltaY || 70)
        if (push.current < 240) {
          e.preventDefault()
          return true
        }
        push.current = 0
        lenis.start()
        return false
      }
      /* below the stack: normal scrolling */
      if (y > last() + 2 || (dir > 0 && y >= last() - 2)) {
        lenis.start()
        return false
      }
      e.preventDefault()
      lenis.stop()
      page(dir)
      return true
    }

    const onWheel = (e: WheelEvent) => void take(Math.sign(e.deltaY), e)
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return
      const dir = { ArrowDown: 1, PageDown: 1, ' ': 1, ArrowUp: -1, PageUp: -1 }[e.key]
      if (dir) take(dir, e)
    }
    let y0 = 0
    const onTouchStart = (e: TouchEvent) => { y0 = e.touches[0].clientY }
    const onTouchMove = (e: TouchEvent) => {
      const dy = y0 - e.touches[0].clientY
      if (Math.abs(dy) > 8) take(Math.sign(dy), e)
    }

    const onTouched = (e: Event) => {
      if ((e.target as Element | null)?.closest?.('#saarthi')) touched.current = performance.now()
    }

    window.addEventListener('input', onTouched, true)
    window.addEventListener('pointerdown', onTouched, true)
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => {
      window.removeEventListener('input', onTouched, true)
      window.removeEventListener('pointerdown', onTouched, true)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      lenis.start()
    }
  }, [])

  /* new object each time so the same question can be asked twice */
  const ask = (s: Starter) => {
    setPending({ ...s })
    scrollToEl('saarthi')
  }

  return (
    <>
      {/* stacked screens */}
      <div className="relative">
        <Held z={0} data-screen>
          <Hero />
        </Held>

        <div data-screen className="relative z-30 md:sticky md:top-0 md:h-[100svh] md:overflow-hidden bg-bg shadow-[0_-1.875rem_3.75rem_-1.875rem_rgba(13,22,20,0.45)] motion-reduce:static motion-reduce:h-auto">
          <SaralAiSection pending={pending} seat={seat} onAsk={ask} onSeat={setSeat} onReset={() => setPending(null)} />
        </div>

        <div className="relative z-40 bg-bg shadow-[0_-1.875rem_3.75rem_-1.875rem_rgba(13,22,20,0.35)]">
          <TwoDoors />
          <ClosingCta demo />
        </div>
      </div>
    </>
  )
}

