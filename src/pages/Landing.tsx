import { useState } from 'react'
import { Hero } from '../components/landing/Hero'
import { PopularQuestions } from '../components/landing/PopularQuestions'
import { SaralAiWidget } from '../components/landing/SaralAiWidget'
import { ClosingCta } from '../components/layout/ClosingCta'
import type { Role } from '../components/landing/SaralAiChat'
import type { Starter } from '../content/saral-ai'

/* The front door. Saral Saarthi sits in the corner; every question on the
   page opens it, and the rest asks for the demo. */
export function Landing() {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState<Starter | null>(null)
  const [seat, setSeat] = useState<Role | null>(null)

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
      <ClosingCta demo />
      <SaralAiWidget open={open} pending={pending} seat={seat} onOpen={() => setOpen(true)} onAsk={ask} onClose={close} />
    </>
  )
}
