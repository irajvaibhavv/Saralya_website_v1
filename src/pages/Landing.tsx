import { useCallback, useState } from 'react'
import { Hero } from '../components/landing/Hero'
import { InAction } from '../components/landing/InAction'
import { Pillars } from '../components/landing/Pillars'
import { PopularQuestions } from '../components/landing/PopularQuestions'
import { VideoModal } from '../components/landing/VideoModal'
import { ClosingCta } from '../components/layout/ClosingCta'
import type { Role } from '../components/landing/SaralAiChat'
import type { Starter } from '../content/saral-ai'

/* The front door. Saarthi is the hero — a box you can type into, in the
   page, over the running reel. Questions from further down scroll back up to
   it rather than opening anything on top. */
export function Landing() {
  const [pending, setPending] = useState<Starter | null>(null)
  const [seat, setSeat] = useState<Role | null>(null)
  const [watching, setWatching] = useState(false)
  const closeVideo = useCallback(() => setWatching(false), [])

  /* A fresh object each time so the same question can be asked twice. */
  const ask = (s: Starter) => {
    setPending({ ...s })
    document.getElementById('saarthi')?.scrollIntoView({ behavior: 'smooth' })
  }
  const close = () => setPending(null)

  return (
    <>
      <Hero pending={pending} seat={seat} onAsk={ask} onClose={close} />
      <div id="explore" className="scroll-mt-16" />
      <PopularQuestions onAsk={ask} seat={seat} onSeat={setSeat} />
      <Pillars />
      <InAction onWatch={() => setWatching(true)} />
      <ClosingCta demo />
      <VideoModal src="/video/borrowers.mp4" open={watching} onClose={closeVideo} />
    </>
  )
}
