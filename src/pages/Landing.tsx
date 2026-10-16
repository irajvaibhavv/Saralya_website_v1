import { useCallback, useEffect, useRef, useState } from 'react'
import { BookAtAGlance } from '../components/landing/BookAtAGlance'
import { Hero } from '../components/landing/Hero'
import { InAction } from '../components/landing/InAction'
import { Pillars } from '../components/landing/Pillars'
import { PopularQuestions } from '../components/landing/PopularQuestions'
import { SaralAiSection } from '../components/landing/SaralAiSection'
import { VideoModal } from '../components/landing/VideoModal'
import { ClosingCta } from '../components/layout/ClosingCta'
import type { Role } from '../components/landing/SaralAiChat'
import type { Starter } from '../content/saral-ai'
import { scrollToEl, scrollToY } from '../lib/scroll'

/* The front door is a sequence of screens. The reel is a held stage: it
   stays where it is while the rest rides up over it on its own opaque
   layer, one page covering another, driven straight off the scroll. Past a
   third of the way that first takeover finishes itself, so nobody is left
   reading half a screen. Then: what the platform is, who you are, and
   Saral Saarthi — which pins to the top while the rest of the page rides
   up over it in turn. Scroll back and the reel is still there. */

/** past this much of the takeover, it completes on its own */
const SETTLE_AT = 0.3

export function Landing() {
  const [pending, setPending] = useState<Starter | null>(null)
  const [seat, setSeat] = useState<Role | null>(null)
  const [watching, setWatching] = useState(false)
  const closeVideo = useCallback(() => setWatching(false), [])

  /* Once the visitor has committed to the takeover, land it. Armed again
     only when they go all the way back to the reel, so scrolling up out of
     Saarthi is never fought. */
  const settled = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onScroll = () => {
      const sec = document.getElementById('explore')
      if (!sec) return
      const target = Math.round(sec.getBoundingClientRect().top + window.scrollY)
      const y = window.scrollY
      if (y < target * 0.1) settled.current = false
      if (!settled.current && y > target * SETTLE_AT && y < target) {
        settled.current = true
        scrollToY(target)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
        <div className="sticky top-0 z-0 motion-reduce:static">
          <Hero />
        </div>

        <div id="explore" className="relative z-10 bg-bg shadow-[0_-30px_60px_-30px_rgba(13,22,20,0.45)]">
          <Pillars />
          <PopularQuestions onAsk={ask} seat={seat} onSeat={setSeat} />
        </div>

        <div className="sticky top-0 z-20 h-[100svh] overflow-hidden bg-bg shadow-[0_-30px_60px_-30px_rgba(13,22,20,0.45)] motion-reduce:static motion-reduce:h-auto">
          <SaralAiSection pending={pending} seat={seat} onAsk={ask} onReset={() => setPending(null)} />
        </div>

        <div className="relative z-30 bg-bg shadow-[0_-30px_60px_-30px_rgba(13,22,20,0.35)]">
          <BookAtAGlance />
          <InAction onWatch={() => setWatching(true)} />
          <ClosingCta demo />
        </div>
      </div>

      <VideoModal src="/video/borrowers.mp4" open={watching} onClose={closeVideo} />
    </>
  )
}
