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
        lede="Founded in 2026 by two operators who spent two decades each inside Indian banking infrastructure."
      />

      <Section tight>
        <Container>
          {/* Story: portrait with a floating stat, text alongside */}
          <div className="mb-24 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <FadeIn className="relative">
              <img src="/img/ledger.jpg" alt="" className="aspect-[4/5] w-full rounded-[32px] object-cover shadow-lg" />
              <div className="absolute -bottom-6 -right-4 rounded-3xl bg-white p-5 shadow-lg sm:-right-8">
                <div className="display text-[40px] text-accent">200+</div>
                <div className="text-[13px] text-muted">deployments, one pattern</div>
              </div>
              <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink2 backdrop-blur">
                Excel is still the system of record
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="display text-[clamp(26px,3vw,38px)] leading-tight">
                Small and mid-sized lenders pay multi-crore upfront fees for legacy stacks — and live with rigidity, long
                change cycles and Excel as the real system of record.
              </p>
              <p className="mt-6 text-[17px] leading-relaxed text-muted">
                We are building the alternative — modular, API-first, priced per loan — so that a small bank or NBFC gets
                the same compliance backbone as a ₹50,000 Cr listed lender, without paying for it upfront.
              </p>
            </FadeIn>
          </div>
          <SectionHead eyebrow="What we believe" title="Three convictions." />
          <Stagger className="grid gap-4 md:grid-cols-3">
            {CONVICTIONS.map((c) => (
              <Item key={c.n}>
                <div className="relative h-full overflow-hidden rounded-3xl bg-white p-7 shadow-sm transition hover:shadow-lg">
                  <div className="display text-[64px] leading-none text-wash">{c.n}</div>
                  <h3 className="mt-4 text-[21px] font-extrabold tracking-[-0.02em] leading-snug">{c.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">{c.body}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section className="bg-bg2/60">
        <Container>
          <SectionHead
            eyebrow="Founders"
            title={
              <>
                Banking-technology veterans, <span className="text-accent">not lending tourists.</span>
              </>
            }
            lede="Together, Vikas and Vishal have led platform decisions across more than 200 Indian financial institutions — PSU banks, listed private banks, cooperative banks, RRBs and NBFCs."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {FOUNDERS.map((f, i) => (
              <FadeIn key={f.name} delay={i * 0.1}>
                <article className="h-full overflow-hidden rounded-[32px] bg-white shadow-sm">
                  <div className="relative bg-ink p-7 text-white">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(127,99,255,0.45),transparent_55%)]" />
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
