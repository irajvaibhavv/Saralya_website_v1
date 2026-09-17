import { useCallback, useState } from 'react'
import { IntegrationsMarquee } from '../components/home/IntegrationsMarquee'
import { Hero } from '../components/landing/Hero'
import { InAction } from '../components/landing/InAction'
import { PopularQuestions } from '../components/landing/PopularQuestions'
import { VideoModal } from '../components/landing/VideoModal'
import { ClosingCta } from '../components/layout/ClosingCta'
import { Container } from '../components/ui/Section'
import type { Starter } from '../content/saral-ai'

/* The front door. The hero is Saral AI; everything under it either feeds a
   question back into the panel or asks for the demo. */
export function Landing() {
  const [pending, setPending] = useState<Starter | null>(null)
  const [watching, setWatching] = useState(false)
  const closeVideo = useCallback(() => setWatching(false), [])

  /* A fresh object each time so the same question can be asked twice. */
  const ask = (s: Starter) => {
    setPending({ ...s })
    document.querySelector('#saral-ai-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Hero pending={pending} onAsk={ask} onBack={() => setPending(null)} onWatch={() => setWatching(true)} />
      <PopularQuestions onAsk={ask} />
      <Container>
        <IntegrationsMarquee />
      </Container>
      <InAction onWatch={() => setWatching(true)} />
      <ClosingCta demo />
      <VideoModal src="/video/reel.mp4" open={watching} onClose={closeVideo} />
    </>
  )
}
