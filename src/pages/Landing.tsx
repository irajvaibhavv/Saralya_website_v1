import { useEffect, useRef, useState } from 'react'
import { Hero } from '../components/landing/Hero'
import { TwoDoors } from '../components/landing/TwoDoors'
import { SaralAiSection } from '../components/landing/SaralAiSection'
import { ClosingCta } from '../components/layout/ClosingCta'
import { Held } from '../components/ui/Reveal'
import type { Role } from '../components/landing/SaralAiChat'
import type { Starter } from '../content/saral-ai'
import { lenis, scrollToEl } from '../lib/scroll'

/* The front door is four screens stacked: the reel, what the platform is,
   who you are, and Saral Saarthi. Each one is an opaque layer pinned to
   the top until the next pulls up over it — one page covering another.
   Inside the stack a scroll moves a whole screen, never half of one, so
   two are never on screen at once; below Saarthi the page scrolls the
   ordinary way. Scroll back up and each screen is still where it was. */

/** one gesture, one screen — how long that screen takes to arrive */
const TRAVEL = 1.05
/** eased both ends, so the screen sets off and lands rather than snapping */
const GLIDE = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export function Landing() {
  const [pending, setPending] = useState<Starter | null>(null)
  const [seat, setSeat] = useState<Role | null>(null)

  /* One gesture pulls the next screen up whole. Lenis is held while we are
     inside the stack so nothing can come to rest between two screens, and
     handed back the moment the visitor leaves it at the bottom. */
  /* the clock the travel runs on, not a flag: a flag that is cleared by a
     callback stays set for good if the travel is ever interrupted, and the
     screens stop snapping */
  const until = useRef(0)
  /* how hard the visitor has pushed against the bottom of the Saarthi
     screen, and when they last pushed: a nudge is not a scroll */
  const push = useRef(0)
  const pushed = useRef(0)
  /* when the visitor last typed in Saarthi or picked a seat */
  const touched = useRef(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    /* measured, not assumed: each screen is as tall as it renders, and a
       hero a pixel off would otherwise drift the whole stack */
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
      /* the screen we are on is the nearest resting place below us */
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
          /* landed on the last screen: the page below is ordinary scrolling
             again, so give the wheel straight back */
          if (to >= last() - 2) lenis.start()
        },
      })
    }

    /* true once we have taken the gesture over */
    const take = (dir: number, e: Event) => {
      if (!dir) return false
      if ((e.target as Element | null)?.closest?.('[data-lenis-prevent]')) return false
      /* still settling from the last gesture: swallow the rest of the flick,
         wherever it has left us. A trackpad sends thirty of these, and
         without this the page sails past the section it just landed on. */
      if (performance.now() < until.current) {
        e.preventDefault()
        /* a flick is one gesture however long it runs: hold until it stops */
        until.current = Math.max(until.current, performance.now() + 260)
        return true
      }
      const y = window.scrollY
      /* typing in the box or picking a seat: the screen stays put until
         they are done with it */
      if (y >= last() - 2 && performance.now() - touched.current < 2500) {
        e.preventDefault()
        return true
      }
      /* on Saarthi, going down: below it the page is ordinary, but a light
         scroll while someone is reading or typing should not move it. The
         push has to add up before the page is handed back. */
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
      /* below the stack, or stepping off its bottom edge: hands off */
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

  /* A fresh object each time so the same question can be asked twice. */
  const ask = (s: Starter) => {
    setPending({ ...s })
    scrollToEl('saarthi')
  }

  return (
    <>
      {/* layered screens, each held until the next one covers it */}
      <div className="relative">
        <Held z={0} data-screen>
          <Hero />
        </Held>

        <div data-screen className="sticky top-0 z-30 h-[100svh] overflow-hidden bg-bg shadow-[0_-30px_60px_-30px_rgba(13,22,20,0.45)] motion-reduce:static motion-reduce:h-auto">
          <SaralAiSection pending={pending} seat={seat} onAsk={ask} onSeat={setSeat} onReset={() => setPending(null)} />
        </div>

        <div className="relative z-40 bg-bg shadow-[0_-30px_60px_-30px_rgba(13,22,20,0.35)]">
          <TwoDoors />
          <ClosingCta demo />
        </div>
      </div>
    </>
  )
}

