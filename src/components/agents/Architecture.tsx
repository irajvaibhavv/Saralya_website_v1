import { Ban, Database, MonitorSmartphone, Send, Workflow } from 'lucide-react'
import { motion } from 'motion/react'
import { SEATS } from '../../content/agents'
import { CHALLENGES } from '../../content/saral-ai'
import { FadeIn } from '../ui/Reveal'
import { Container, Section, SectionHead } from '../ui/Section'

/* Every agent is the same five layers. Pick a seat and only the labels
   change: that is the whole argument of the page, so the layers stay put
   and the chips animate in. The fourth layer is the one that matters in
   lending, and it is the one a CRM agent doesn't have. */

const LAYERS = [
  { key: 'sees', icon: Database, title: 'What it sees', note: 'Read-only, on your consent' },
  { key: 'does', icon: Workflow, title: 'What it does', note: 'The work it takes off the desk' },
  { key: 'cannot', icon: Ban, title: 'What it cannot do', note: 'Hard limits, not prompts' },
  { key: 'actsIn', icon: MonitorSmartphone, title: 'Where it acts', note: 'Inside the tools you already use' },
] as const

export function Architecture({ seat, onSeat }: { seat: number; onSeat: (i: number) => void }) {
  const s = SEATS[seat]
  const rows: Record<string, string[]> = {
    sees: s.sees,
    does: s.does.map((id) => CHALLENGES.find((c) => c.id === id)!.label),
    cannot: s.cannot,
    actsIn: s.actsIn,
  }

  return (
    <Section id="architecture">
      <Container>
        <SectionHead
          eyebrow="How an agent is built"
          title={
            <>
              Five layers. Only the <span className="text-accent">labels</span> change.
            </>
          }
          lede="An agent is not a chat window. It is a seat, a set of data it may read, work it may do, limits it cannot cross, and a place it reports back."
        />

        <FadeIn>
          <div className="flex flex-wrap gap-2">
            {SEATS.map((x, i) => (
              <button
                key={x.id}
                type="button"
                aria-pressed={i === seat}
                onClick={() => onSeat(i)}
                className={`rounded-full px-4 py-2 text-small font-semibold transition-colors ${
                  i === seat ? 'bg-ink text-white' : 'bg-white text-ink2 ring-1 ring-line hover:bg-wash2'
                }`}
              >
                {x.label}
              </button>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-lg">
            {LAYERS.map((l, i) => (
              <div key={l.key} className={`grid gap-4 p-6 md:grid-cols-[minmax(0,230px)_1fr] md:gap-8 md:p-7 ${i ? 'border-t border-line' : ''}`}>
                <div className="flex gap-3">
                  <l.icon className={`mt-0.5 size-5 shrink-0 ${l.key === 'cannot' ? 'text-red' : 'text-accent'}`} strokeWidth={2} />
                  <div>
                    <div className="text-body font-semibold">{l.title}</div>
                    <div className="mt-0.5 text-small text-hint">{l.note}</div>
                  </div>
                </div>
                <div className="flex flex-wrap items-start gap-2">
                  {rows[l.key].map((t) => (
                    <motion.span
                      key={s.id + t}
                      layout
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22 }}
                      className={`rounded-lg px-3 py-2 text-small ${
                        l.key === 'cannot' ? 'bg-red-w text-red' : 'bg-wash2 text-ink2 ring-1 ring-line'
                      }`}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}

            <div className="grid gap-4 border-t border-line bg-ink p-6 text-white md:grid-cols-[minmax(0,230px)_1fr] md:gap-8 md:p-7">
              <div className="flex gap-3">
                <Send className="mt-0.5 size-5 shrink-0 text-accent3" strokeWidth={2} />
                <div>
                  <div className="text-body font-semibold">What it hands back</div>
                  <div className="mt-0.5 text-small text-white/50">Every morning</div>
                </div>
              </div>
              <motion.p key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} className="text-lede leading-relaxed text-white/90">
                {s.handsBack}
              </motion.p>
            </div>
          </div>

          <p className="mt-5 max-w-2xl text-small leading-relaxed text-muted">
            The third layer is the one a CRM agent never needs. Lending is supervised: the 21-day show-cause notice, the Key Fact
            Statement, DPDP consent and the calling window are limits in the system, not instructions in a prompt.
          </p>
        </FadeIn>
      </Container>
    </Section>
  )
}
