import { FileCheck2, Fingerprint, History, KeyRound, Landmark, Lock } from 'lucide-react'
import { SEALS } from '../../content/agents'
import { FadeIn } from '../ui/Reveal'
import { Container, Section } from '../ui/Section'

/* What the agent is held to. Labels only — the names are the content.

   No list of cores, bureaus or vendors here: naming third parties implies a
   partnership we have not verified, and the founders have struck exactly
   that before. See the content flags in CLAUDE.md. */

const SEAL_ICONS = [Landmark, FileCheck2, Fingerprint, Lock, KeyRound, History]

export function Trust() {
  return (
    <Section tight className="border-t border-line">
      <Container>
        <FadeIn>
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
