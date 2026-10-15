import { FileCheck2, Fingerprint, History, KeyRound, Landmark, Lock } from 'lucide-react'
import { RAILS, SEALS } from '../../content/agents'
import { FadeIn } from '../ui/Reveal'
import { Container, Section } from '../ui/Section'

/* The two things a CTO and a compliance head look for before they read a
   word: what it already talks to, and what it is held to. Labels only —
   the names are the content. */

const SEAL_ICONS = [Landmark, FileCheck2, Fingerprint, Lock, KeyRound, History]

export function Trust() {
  return (
    <Section tight className="border-t border-line">
      <Container>
        <FadeIn className="eyebrow mb-5">Already speaks to</FadeIn>
      </Container>

      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee gap-2.5 pl-2.5 [animation-duration:48s] hover:[animation-play-state:paused]">
          {[...RAILS, ...RAILS].map((r, i) => (
            <span
              key={r + i}
              className="shrink-0 rounded-full bg-white px-5 py-2.5 font-mono text-small tracking-[0.04em] text-ink2 ring-1 ring-line"
            >
              {r}
            </span>
          ))}
        </div>
      </div>

      <Container>
        <FadeIn className="mt-12">
          <div className="eyebrow mb-5">Held to</div>
          <div className="flex flex-wrap gap-2.5">
            {SEALS.map((s, i) => {
              const Icon = SEAL_ICONS[i % SEAL_ICONS.length]
              return (
                <span key={s} className="inline-flex items-center gap-2 rounded-full bg-wash2 px-4 py-2.5 text-small font-medium text-ink2 ring-1 ring-line">
                  <Icon className="size-3.5 shrink-0 text-accent" strokeWidth={2} />
                  {s}
                </span>
              )
            })}
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
