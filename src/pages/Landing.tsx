import { useCallback, useState } from 'react'
import { Hero } from '../components/landing/Hero'
import { InAction } from '../components/landing/InAction'
import { PopularQuestions } from '../components/landing/PopularQuestions'
import { SaralAiWidget } from '../components/landing/SaralAiWidget'
import { VideoModal } from '../components/landing/VideoModal'
import { ClosingCta } from '../components/layout/ClosingCta'
import type { Starter } from '../content/saral-ai'

/* The front door. The hero is Saral AI; every question on the page opens
   the same small conversation window, and the rest asks for the demo. */
export function Landing() {
  const [pending, setPending] = useState<Starter | null>(null)
  const [watching, setWatching] = useState(false)
  const closeVideo = useCallback(() => setWatching(false), [])

  /* A fresh object each time so the same question can be asked twice. */
  const ask = (s: Starter) => setPending({ ...s })

  return (
    <>
      <Hero onAsk={ask} onWatch={() => setWatching(true)} />
      <div id="explore" className="scroll-mt-16" />
      <PopularQuestions onAsk={ask} />
      <InAction onWatch={() => setWatching(true)} />
      <ClosingCta demo />
      <SaralAiWidget pending={pending} onClose={() => setPending(null)} />
      <VideoModal src="/video/reel.mp4" open={watching} onClose={closeVideo} />
    </>
  )
}
