import { useCallback, useEffect, useState } from 'react'
import { Hero } from '../components/landing/Hero'
import { InAction } from '../components/landing/InAction'
import { Pillars } from '../components/landing/Pillars'
import { PopularQuestions } from '../components/landing/PopularQuestions'
import { SaralAiWidget } from '../components/landing/SaralAiWidget'
import { VideoModal } from '../components/landing/VideoModal'
import { ClosingCta } from '../components/layout/ClosingCta'
import type { Role } from '../components/landing/SaralAiChat'
import type { Starter } from '../content/saral-ai'

/* The front door. The reel plays for ten seconds, then Saral Saarthi takes
   the screen; the corner launcher opens it sooner, and every question on the
   page opens it too. */

const HANDOVER_MS = 10_000

export function Landing() {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState<Starter | null>(null)
  const [seat, setSeat] = useState<Role | null>(null)
  const [watching, setWatching] = useState(false)
  const closeVideo = useCallback(() => setWatching(false), [])

  /* Once only: a visitor who closes it, or scrolls on to read the page, is
     not handed the sheet a second time. */
  const [handedOver, setHandedOver] = useState(false)
  useEffect(() => {
    if (handedOver) return
    const stop = () => setHandedOver(true)
    const t = window.setTimeout(() => {
      setOpen(true)
      setHandedOver(true)
    }, HANDOVER_MS)
    window.addEventListener('pointerdown', stop, { once: true })
    window.addEventListener('wheel', stop, { once: true, passive: true })
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('pointerdown', stop)
      window.removeEventListener('wheel', stop)
    }
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
      <Pillars />
      <InAction onWatch={() => setWatching(true)} />
      <ClosingCta demo />
      <VideoModal src="/video/borrowers.mp4" open={watching} onClose={closeVideo} />
      <SaralAiWidget open={open} pending={pending} seat={seat} onOpen={() => setOpen(true)} onAsk={ask} onClose={close} />
    </>
  )
}
