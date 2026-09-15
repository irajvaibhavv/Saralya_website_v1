import { motion } from 'motion/react'
import { FadeIn } from '../ui/Motion'
import { Container, Section, SectionHead } from '../ui/Section'

const ROWS = [
  {
    title: 'Paying with UPI',
    steps: ['Tap', 'Verify', 'Done'],
    time: '~4 seconds',
    fill: 0.04,
    bar: 'bg-gradient-to-r from-blue to-accent3',
    tone: 'text-blue',
  },
  {
    title: 'Lending with Saralya',
    steps: ['Apply', 'Score', 'Sanction'],
    time: '< 5 minutes',
    fill: 0.12,
    bar: 'bg-gradient-to-r from-accent3 to-accent',
    tone: 'text-accent',
    hero: true,
  },
  {
    title: 'Lending, the old way',
    steps: ['Paperwork', 'Branch visits', 'Committee'],
    time: '2–4 weeks',
    fill: 1,
    bar: 'bg-line2',
    tone: 'text-hint',
  },
]

export function UpiAnalogy() {
  return (
    <Section className="bg-bg2/60">
      <Container>
        <SectionHead
          eyebrow="The idea"
          title={
            <>
              UPI made payments instant. We're doing it for credit.
            </>
          }
        />
        <FadeIn>
          <div className="mx-auto max-w-4xl space-y-4">
            {ROWS.map((r, idx) => (
              <div
                key={r.title}
                className={`grid gap-3 rounded-3xl px-5 py-5 md:grid-cols-[210px_1fr_120px] md:items-center md:px-7 ${
                  r.hero ? 'bg-white shadow-md ring-1 ring-accent/20' : 'bg-white/60'
                }`}
              >
                <div>
                  <div className={`text-[16px] font-bold ${r.hero ? 'text-ink' : 'text-ink2'}`}>{r.title}</div>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {r.steps.map((s) => (
                      <span key={s} className="rounded-full bg-bg px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-bg">
                  <motion.div
                    className={`h-full rounded-full ${r.bar}`}
                    initial={{ width: '0%' }}
                    whileInView={{ width: `${Math.max(r.fill * 100, 2.5)}%` }}
                    viewport={{ once: true, margin: '-15% 0px' }}
                    transition={{ duration: r.fill === 1 ? 2.4 : 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 + idx * 0.15 }}
                  />
                </div>
                <div className={`display text-[22px] md:text-right ${r.tone}`}>{r.time}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
