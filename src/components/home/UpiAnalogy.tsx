import { motion } from 'motion/react'
import { FadeIn } from '../ui/Reveal'
import { Container, Section, SectionHead } from '../ui/Section'

const ROWS = [
  {
    title: 'Paying with UPI',
    steps: ['Tap', 'Verify', 'Done'],
    time: '~4 seconds',
    fill: 0.04,
    bar: 'bg-accent',
    tone: 'text-accent',
  },
  {
    title: 'Lending with Saralya',
    steps: ['Apply', 'Score', 'Sanction'],
    time: '< 5 minutes',
    fill: 0.12,
    bar: 'bg-lime',
    tone: 'text-lime',
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
    <Section id="idea" className="relative isolate overflow-hidden bg-lime text-ink [&_.eyebrow_span]:bg-ink">
      {/* the band's own geometry, cropped at the edges and nowhere near
          the numbers people are here to compare */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-32 size-[26rem] rounded-full border-[24px] border-ink/10" />
        <div className="absolute -bottom-40 -right-32 size-[24rem] rounded-full bg-ink/10" />
      </div>
      <Container>
        <SectionHead
          eyebrow="The idea"
          title={
            <>
              UPI made payments <span className="font-hero font-normal italic">instant</span>. We're doing it for credit.
            </>
          }
        />
        <FadeIn>
          <div className="mx-auto max-w-4xl space-y-3">
            {ROWS.map((r, idx) => (
              <div
                key={r.title}
                className={`relative grid gap-3 px-5 py-5 md:grid-cols-[220px_1fr_130px] md:items-center md:px-7 ${
                  r.hero ? 'bg-ink text-white' : 'bg-white'
                }`}
              >
                {/* the row that matters carries a solid teal spine */}
                {r.hero && <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-lime" />}

                <div>
                  <div className={`text-lede font-bold ${r.hero ? 'text-white' : 'text-ink2'}`}>{r.title}</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {r.steps.map((s) => (
                      <span
                        key={s}
                        className={`px-2 py-1 font-mono text-label uppercase tracking-[0.08em] ${
                          r.hero ? 'bg-white/10 text-white/80' : 'bg-wash2 text-muted'
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`relative h-2.5 ${r.hero ? 'bg-white/15' : 'bg-wash2'}`}>
                  <motion.div
                    className={`relative h-full ${r.bar}`}
                    initial={{ width: '0%' }}
                    whileInView={{ width: `${Math.max(r.fill * 100, 2.5)}%` }}
                    viewport={{ once: true, margin: '-15% 0px' }}
                    transition={{ duration: r.fill === 1 ? 2.4 : 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 + idx * 0.15 }}
                  >
                    {/* the head of the bar, lime, only where the bar is ours */}
                    {r.hero && <span aria-hidden className="absolute -right-1 -top-1 size-4.5 bg-lime" />}
                  </motion.div>
                </div>

                <div className={`display text-stat md:text-right ${r.tone}`}>{r.time}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
