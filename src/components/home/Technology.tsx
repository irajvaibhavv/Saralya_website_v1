import { Check } from 'lucide-react'
import { motion } from 'motion/react'
import { FadeIn, Item, Stagger } from '../ui/Reveal'
import { Container, Section, SectionHead } from '../ui/Section'
import { COMPLIANCE, PILLARS } from '../../content/site'

/* TODO(Vikas): verify the technical claims in the hero lede: "Indian data
   residency", "inspection-grade audit trail", "no vendor lock-in" (corrections
   brief item 19). Copy is unchanged from saralya.in until signed off. */

const LAYERS = [
  { name: 'Your channels', items: ['Branch', 'LSP apps', 'Web journeys', 'Partner APIs'] },
  { name: 'Saralya modules', items: ['Appraisal', 'Screen', 'Watch', 'Recover', 'Insight', 'Comply'], hero: true },
  { name: 'Platform', items: ['REST + webhooks', 'RBAC · maker-checker', 'Immutable audit', 'Multi-tenant'] },
  { name: 'Data rails', items: ['Bureaus', 'Account Aggregator', 'GSTN · MCA21', 'NPCI · NACH'] },
  { name: 'Your core', items: ['CBS', 'LOS / LMS', 'GL', 'Data warehouse'] },
]

export function TechnologySection() {
  return (
    <>
      {/* Layer diagram */}
      <Section id="technology">
        <Container>
          <SectionHead
            eyebrow="Technology"
            title={
              <>
                How it is built, <span className="text-accent">underneath.</span>
              </>
            }
            lede="No black boxes. No lock-in. Indian data residency. Audit trail end to end."
          />
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-white p-5 shadow-lg md:p-8">
              <div className="relative space-y-3">
                {LAYERS.map((l, i) => (
                  <motion.div
                    key={l.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className={`grid gap-3 rounded-2xl p-4 md:grid-cols-[180px_1fr] md:items-center ${
                      l.hero ? 'bg-ink text-white shadow-md' : 'bg-bg'
                    }`}
                  >
                    <div className={`font-mono text-[11px] uppercase tracking-[0.12em] ${l.hero ? 'text-[#c4b5fd]' : 'text-hint'}`}>
                      {l.name}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {l.items.map((it) => (
                        <span
                          key={it}
                          className={`rounded-full px-3 py-1.5 text-[13px] font-semibold ${
                            l.hero ? 'border border-white/15 bg-white/10' : 'bg-white shadow-sm text-ink2'
                          }`}
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Four pillars */}
      <Section>
        <Container>
          <SectionHead eyebrow="Under the hood" title="Four things your CTO will ask about." />
          <Stagger className="grid gap-4 md:grid-cols-2">
            {PILLARS.map((p) => (
              <Item key={p.title}>
                <div className="h-full rounded-3xl bg-white p-7 shadow-sm transition-shadow hover:shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-2xl bg-wash text-accent">
                      <p.icon className="size-5" strokeWidth={2.2} />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-hint">{p.sub}</span>
                  </div>
                  <h3 className="mt-5 text-[22px] font-extrabold tracking-[-0.02em]">{p.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-[14px] text-ink2">
                        <Check className="mt-1 size-4 shrink-0 text-accent" strokeWidth={2.5} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Item>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Compliance */}
      <Section id="compliance">
        <Container>
          <SectionHead
            eyebrow="Compliance & security"
            title={
              <>
                Built for inspection.
              </>
            }
            lede="Every module is built against current RBI Master Directions and the DPDP Act 2023."
          />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMPLIANCE.map((c) => (
              <Item key={c.title}>
                <div className="h-full rounded-3xl border border-line/70 bg-white/70 p-6 backdrop-blur transition hover:bg-white hover:shadow-md">
                  <div className="eyebrow">{c.tag}</div>
                  <div className="mt-3 text-[18px] font-extrabold tracking-[-0.02em]">{c.title}</div>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{c.body}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </Container>
      </Section>
    </>
  )
}
