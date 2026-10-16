import { useCallback, useEffect, useState } from 'react'
import { BookAtAGlance } from '../components/landing/BookAtAGlance'
import { Hero } from '../components/landing/Hero'
import { InAction } from '../components/landing/InAction'
import { Pillars } from '../components/landing/Pillars'
import { PopularQuestions } from '../components/landing/PopularQuestions'
import { SaralAiWidget } from '../components/landing/SaralAiWidget'
import { VideoModal } from '../components/landing/VideoModal'
import { ClosingCta } from '../components/layout/ClosingCta'
import type { Role } from '../components/landing/SaralAiChat'
import type { Starter } from '../content/saral-ai'

/* The front door. The reel plays until the visitor scrolls a quarter of a
   screen, and Saral Saarthi takes over then — a timer on the reel just
   loses the ones who were still watching. The corner launcher opens it
   sooner, and every question on the page opens it too. */

/** how much of a screen the visitor has to scroll before the hand-over */
const HANDOVER_AT = 0.25

export function Landing() {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState<Starter | null>(null)
  const [seat, setSeat] = useState<Role | null>(null)
  const [watching, setWatching] = useState(false)
  const closeVideo = useCallback(() => setWatching(false), [])

  /* Once only: whoever closes it is not handed the window a second time. */
  const [handedOver, setHandedOver] = useState(false)
  useEffect(() => {
    if (handedOver) return
    const onScroll = () => {
      if (window.scrollY >= window.innerHeight * HANDOVER_AT) {
        setOpen(true)
        setHandedOver(true)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [handedOver])

  /* A fresh object each time so the same question can be asked twice. */
  const ask = (s: Starter) => {
    setPending({ ...s })
    setOpen(true)
  }
  const close = () => {
    setOpen(false)
    setPending(null)
  }

  return (
    <>
      <Hero />
      <div id="explore" className="scroll-mt-16" />
      <PopularQuestions onAsk={ask} seat={seat} onSeat={setSeat} />
      <BookAtAGlance />
      <Pillars />
      <InAction onWatch={() => setWatching(true)} />
      <ClosingCta demo />
      <VideoModal src="/video/borrowers.mp4" open={watching} onClose={closeVideo} />
      <SaralAiWidget open={open} pending={pending} seat={seat} onOpen={() => setOpen(true)} onAsk={ask} onClose={close} />
    </>
  )
}
