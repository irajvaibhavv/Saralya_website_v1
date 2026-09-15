import { ChevronRight } from 'lucide-react'
import { Cta } from '../components/layout/Cta'
import { PageHero } from '../components/layout/PageHero'
import { FadeIn, Item, Stagger } from '../components/ui/Motion'
import { Container, Section, SectionHead } from '../components/ui/Section'
import { CONVICTIONS, FOUNDERS } from '../content/site'

export function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            Making lending
            <br />
            <span className="text-gradient">saral for Bharat.</span>
          </>
        }
        lede="Founded in 2026 by two banking-infrastructure operators. Smaller lenders pay crores upfront for legacy stacks, and still run on Excel. We build the alternative: modular, API-first, priced per loan."
      />

      <Section tight>
        <Container>
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

      <Section className="bg-bg2/60">
        <Container>
          <SectionHead
            eyebrow="Founders"
            title={
              <>
                Banking-technology veterans, not lending tourists.
              </>
            }
            lede="Platform decisions across 200+ Indian financial institutions: PSU, private, cooperative, RRBs and NBFCs."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {FOUNDERS.map((f, i) => (
              <FadeIn key={f.name} delay={i * 0.1}>
                <article className="h-full overflow-hidden rounded-3xl bg-white shadow-sm">
                  <div className="relative bg-ink p-7 text-white">
                    <div className="relative flex items-center gap-4">
                      <span className="grid size-16 place-items-center rounded-2xl bg-white/10 text-[20px] font-extrabold ring-1 ring-white/20">
                        {f.initials}
                      </span>
                      <div>
                        <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#c4b5fd]">{f.role}</div>
                        <div className="display text-[26px]">{f.name}</div>
                        <div className="text-[13px] text-white/60">{f.line}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-7">
                    <p className="text-[15px] leading-relaxed text-ink2">{f.body}</p>
                    <ul className="mt-5 space-y-2.5">
                      {f.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-[14px] text-muted">
                          <ChevronRight className="mt-0.5 size-4 shrink-0 text-accent" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      <Cta />
    </>
  )
}
