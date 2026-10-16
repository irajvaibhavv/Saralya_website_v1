import { useCallback, useEffect, useRef, useState } from 'react'
import { BookAtAGlance } from '../components/landing/BookAtAGlance'
import { Hero } from '../components/landing/Hero'
import { InAction } from '../components/landing/InAction'
import { Pillars } from '../components/landing/Pillars'
import { PopularQuestions } from '../components/landing/PopularQuestions'
import { SaralAiSection } from '../components/landing/SaralAiSection'
import { VideoModal } from '../components/landing/VideoModal'
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

/** the stacked screens: reel, platform, who are you, Saarthi */
const SCREENS = 4
/** one gesture, one screen — how long that screen takes to arrive */
const TRAVEL = 1.05
/** eased both ends, so the screen sets off and lands rather than snapping */
const GLIDE = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export function Landing() {
  const [pending, setPending] = useState<Starter | null>(null)
  const [seat, setSeat] = useState<Role | null>(null)
  const [watching, setWatching] = useState(false)
  const closeVideo = useCallback(() => setWatching(false), [])

  /* One gesture pulls the next screen up whole. Lenis is held while we are
     inside the stack so nothing can come to rest between two screens, and
     handed back the moment the visitor leaves it at the bottom. */
  const busy = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const h = () => window.innerHeight
    const last = () => (SCREENS - 1) * h()

    const page = (dir: number) => {
      const i = Math.round(window.scrollY / h())
      const to = Math.min(SCREENS - 1, Math.max(0, i + dir)) * h()
      if (to === Math.round(window.scrollY)) return
      busy.current = true
      lenis.scrollTo(to, {
        force: true,
        duration: TRAVEL,
        easing: GLIDE,
        onComplete: () => {
          busy.current = false
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
      const y = window.scrollY
      /* below the stack, or stepping off its bottom edge: hands off */
      if (y > last() + 2 || (dir > 0 && y >= last() - 2)) {
        lenis.start()
        return false
      }
      e.preventDefault()
      lenis.stop()
      if (!busy.current) page(dir)
      return true
    }

    const onWheel = (e: WheelEvent) => void take(Math.sign(e.deltaY), e)
    const onKey = (e: KeyboardEvent) => {
      const dir = { ArrowDown: 1, PageDown: 1, ' ': 1, ArrowUp: -1, PageUp: -1 }[e.key]
      if (dir) take(dir, e)
    }
    let y0 = 0
    const onTouchStart = (e: TouchEvent) => { y0 = e.touches[0].clientY }
    const onTouchMove = (e: TouchEvent) => {
      const dy = y0 - e.touches[0].clientY
      if (Math.abs(dy) > 8) take(Math.sign(dy), e)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => {
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
        <Held z={0}>
          <Hero />
        </Held>

        <Held z={10} id="explore" className="h-[100svh] overflow-hidden bg-bg shadow-[0_-30px_60px_-30px_rgba(13,22,20,0.45)] motion-reduce:h-auto">
          <Pillars />
        </Held>

        <Held z={20} className="h-[100svh] overflow-hidden bg-bg shadow-[0_-30px_60px_-30px_rgba(13,22,20,0.45)] motion-reduce:h-auto">
          <PopularQuestions onAsk={ask} seat={seat} onSeat={setSeat} />
        </Held>

        <div className="sticky top-0 z-30 h-[100svh] overflow-hidden bg-bg shadow-[0_-30px_60px_-30px_rgba(13,22,20,0.45)] motion-reduce:static motion-reduce:h-auto">
          <SaralAiSection pending={pending} seat={seat} onAsk={ask} onReset={() => setPending(null)} />
        </div>

        <div className="relative z-40 bg-bg shadow-[0_-30px_60px_-30px_rgba(13,22,20,0.35)]">
          <BookAtAGlance />
          <InAction onWatch={() => setWatching(true)} />
          <ClosingCta demo />
        </div>
      </div>

      <VideoModal src="/video/borrowers.mp4" open={watching} onClose={closeVideo} />
    </>
  )
}

