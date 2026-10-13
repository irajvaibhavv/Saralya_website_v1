import { FadeIn, Item, Stagger } from '../ui/Reveal'
import { Container, Section, SectionHead } from '../ui/Section'
import { CONVICTIONS } from '../../content/site'

export function AboutSection() {
  return (
    <Section id="about">
      <Container>
        <SectionHead
          eyebrow="About us"
          title={
            <>
              Making lending <span className="text-accent">saral for Bharat.</span>
            </>
          }
          lede="Founded in 2026 by two banking-infrastructure operators. Smaller lenders pay crores upfront for legacy stacks, and still run on Excel. We build the alternative: modular, API-first, priced per loan."
        />
        <div className="grid items-stretch gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <FadeIn className="relative">
              <img src="/img/ledger.jpg" alt="" className="h-full min-h-[380px] w-full rounded-3xl object-cover shadow-lg" />
              <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink2 backdrop-blur">
                Excel is still the system of record
              </div>
              <div className="absolute bottom-5 left-5 rounded-3xl bg-white p-4 shadow-lg">
                <div className="display text-[34px] text-accent">200+</div>
                <div className="text-[12.5px] text-muted">deployments, one pattern</div>
              </div>
            </FadeIn>
            <Stagger className="grid gap-4">
              {CONVICTIONS.map((c) => (
                <Item key={c.n}>
                  <div className="flex h-full gap-6 rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-lg">
                    <div className="display text-[44px] leading-none text-wash">{c.n}</div>
                    <div>
                      <h3 className="text-[20px] font-extrabold tracking-[-0.02em] leading-snug">{c.title}</h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-muted">{c.body}</p>
                    </div>
                  </div>
                </Item>
              ))}
            </Stagger>
        </div>
      </Container>
    </Section>
  )
}

