import { ArrowRight, Check } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import {
  AGENTS,
  ARC_LABELS,
  ARC_PATHS,
  BLANKS,
  CHAIN,
  DECISIONS,
  FIXES,
  LAYER,
  LEAVES,
  MODULES,
  PERSONAS,
  PRESSURES,
  PROBLEMS,
  SIGNALS,
  STAGES,
  SYSTEMS,
  TRUTHS,
  type Persona,
  type Tone,
} from '../content/product'
import { CONTACT_EMAIL } from '../content/site'
import { AgentFlow, type Rail, type Stage } from '../components/agents/AgentFlow'
import { FadeIn } from '../components/ui/Reveal'
import { Container, Section } from '../components/ui/Section'

/* /products: hero, architecture, role dashboards, the problem, the solution
   (agent diagram and ring) and a demo request. Copy lives in
   content/product.ts. */

const demo = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Saralya demo request')}`

/* status tones used on this page */
const TONE: Record<Tone, string> = {
  good: 'bg-green-w text-green',
  warn: 'bg-amber-w text-amber',
  critical: 'bg-red-w text-red',
  info: 'bg-wash text-accent',
  neutral: 'bg-wash2 text-muted',
}
const FILL: Record<Tone, string> = {
  good: 'bg-accent',
  warn: 'bg-amber',
  critical: 'bg-red',
  info: 'bg-petrol',
  neutral: 'bg-accent',
}

export function Product() {
  return (
    <>
      <Hero />
      <Three />
      <Leaders />
      <Problem />
      <How />
      <Demo />
    </>
  )
}

/* ── hero ───────────────────────────────────────────────────────────── */

/* Same dark band, shapes, buttons and lime rule as the /agents hero, so the
   two pages open alike. */
function Hero() {
  const still = useReducedMotion()
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {/* decorative shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '96px 96px',
          }}
        />
        <div className="absolute -bottom-72 -left-60 size-[26rem] rounded-full bg-lav" />
        <div className="absolute -right-40 -top-52 size-[42rem] rounded-full border-[2rem] border-lime/70" />
        <div className="absolute right-[12%] top-0 h-28 w-px bg-lime" />
        <div className="absolute bottom-0 left-[46%] h-20 w-px bg-lav" />
      </div>

      <Container className="relative py-14 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_minmax(0,28.75rem)] lg:gap-14">
          <FadeIn>
            <div className="flex items-center gap-2.5 font-mono text-label uppercase tracking-[0.22em] text-lime">
              <span className="size-2 bg-lime" />
              Making lending Saral
            </div>

            <h1 className="display mt-6 text-balance text-h1 leading-[1.02]">
              The enterprise&#8209;grade <span className="text-lime">operating system</span> for lenders
            </h1>
            <p className="mt-5 max-w-[46ch] text-lede leading-relaxed text-white/70">
              The intelligence layer behind every lending decision.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={demo}
                className="bg-lime px-8 py-4 text-body font-bold uppercase tracking-[0.06em] text-ink transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
              >
                Request a demo
              </a>
              <a
                href="#how"
                className="border border-white/35 px-8 py-4 text-body font-semibold text-white transition hover:border-lav hover:bg-lav hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lav"
              >
                See how it works
              </a>
            </div>
          </FadeIn>

          {/* stack diagram: decisions on top, existing systems below, Saralya
             between */}
          <FadeIn className="min-w-0 border-l-8 border-lime bg-[#0a110f] p-6 ring-1 ring-white/15">
            <div className="font-mono text-label uppercase tracking-[0.16em] text-white/50">Every lending decision</div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {DECISIONS.map((d) => (
                <span key={d} className="px-3.5 py-1.5 text-small text-white/90 ring-1 ring-white/25">
                  {d}
                </span>
              ))}
            </div>

            <Rails still={still} />

            <div className="bg-accent2/60 p-4 ring-1 ring-accent3/60">
              <div className="font-mono text-label uppercase tracking-[0.16em] text-accent3">Saralya · intelligence layer</div>
              <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                {LAYER.map((l) => (
                  <span key={l} className="bg-white/10 px-3.5 py-3 text-body font-semibold leading-snug">
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <Rails still={still} delay={0.4} />

            <div className="flex flex-wrap gap-2">
              {SYSTEMS.map((s) => (
                <span key={s} className="bg-white/[0.06] px-3 py-1.5 text-small text-white/70">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-2.5 font-mono text-label uppercase tracking-[0.16em] text-white/50">Your existing systems</div>
          </FadeIn>
        </div>
      </Container>

      {/* lime rule at the bottom edge */}
      <div aria-hidden className="h-2 w-full bg-lime" />
    </section>
  )
}

/** three wires with a bead travelling up each one */
function Rails({ still, delay = 0 }: { still: boolean | null; delay?: number }) {
  return (
    <div aria-hidden className="my-4 flex h-12 justify-evenly">
      {[0, 0.8, 1.6].map((d) => (
        <span key={d} className="relative w-px bg-accent3/35">
          {!still && (
            <motion.span
              className="absolute -left-[0.1875rem] size-[0.4375rem] rounded-full bg-accent3"
              animate={{ y: [20, -20], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: d + delay, ease: 'linear' }}
            />
          )}
        </span>
      ))}
    </div>
  )
}

/* ── architecture cards ────────────────────────────────────────────── */

function Three() {
  return (
    <section className="border-b border-line bg-bg py-12 md:py-16">
      <Container>
        {/* section label */}
        <div className="mb-4 flex justify-center">
          <span className="bg-ink px-3.5 py-2 font-mono text-small uppercase tracking-[0.16em] text-lime">Architecture</span>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <article className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-line2">
            <h2 className="display text-h3">Modular &amp; API-first</h2>
            <div className="mt-4 flex flex-1 flex-col border-t border-line pt-4">
              <div className="font-mono text-label uppercase tracking-[0.14em] text-muted">Plug-and-play modules</div>
              <div className="mt-2.5 grid flex-1 grid-cols-2 gap-2">
                {MODULES.map((m) => (
                  <div key={m.name} className="flex flex-col justify-center rounded-xl bg-bg px-3 py-2.5 ring-1 ring-line">
                    <div className="text-small font-semibold">{m.name}</div>
                    <div className="text-label text-muted">{m.state}</div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="flex flex-col rounded-2xl bg-ink p-6 text-white">
            <h2 className="display text-h3">Saralya Credit ML Model</h2>
            <p className="mt-1.5 text-small leading-relaxed text-white/70">Trained on Indian banking data.</p>
            <div className="mt-4 flex flex-1 flex-col border-t border-white/10 pt-4">
              <div className="font-mono text-label uppercase tracking-[0.14em] text-white/50">Three signals, one score</div>
              <div className="mt-2.5 flex flex-1 items-stretch gap-1.5">
                {SIGNALS.map((s, i) => (
                  <div key={s.k} className="flex flex-1 items-center gap-1.5">
                    <div className="flex flex-1 flex-col justify-center rounded-xl bg-white/[0.06] px-2 py-2.5 text-center ring-1 ring-white/10">
                      <div className="text-small font-bold text-accent3">{s.k}</div>
                      <div className="text-label text-white/50">{s.v}</div>
                    </div>
                    {i < SIGNALS.length - 1 && <span className="font-bold text-white/40">+</span>}
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-line2">
            <h2 className="display text-h3">Zero-disruption overlay</h2>
            <div className="mt-4 flex flex-1 flex-col border-t border-line pt-4">
              <div className="font-mono text-label uppercase tracking-[0.14em] text-muted">Agents beside your stack</div>
              <div className="mt-2.5 grid flex-1 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-2 rounded-xl bg-bg p-2 ring-1 ring-line">
                <div className="flex flex-col justify-center px-1 text-center">
                  <div className="text-small font-bold">Your LOS / LMS</div>
                  <div className="text-label text-muted">System of record</div>
                </div>
                <div className="self-center text-center font-mono text-label font-semibold text-accent">⇄ 2-way</div>
                <div className="flex flex-col justify-center rounded-lg bg-accent px-1 py-1.5 text-center text-white">
                  <div className="text-small font-bold">Saralya agents</div>
                  <div className="text-label text-white/70">System of intelligence</div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  )
}

/* ── role dashboards ───────────────────────────────────────────────── */

function Leaders() {
  const [i, setI] = useState(0)
  const still = useReducedMotion()
  const p = PERSONAS[i]

  /* autoplay through the roles, no pause button (asked for directly); a click
     jumps and restarts the timer */
  useEffect(() => {
    if (still) return
    const id = window.setTimeout(() => setI((n) => (n + 1) % PERSONAS.length), 5000)
    return () => window.clearTimeout(id)
  }, [still, i])

  return (
    /* one screen on desktop, set like the problem and solution sections */
    <Section id="leaders" tight className="flex flex-col justify-center lg:min-h-[calc(100svh-4rem)] lg:pt-6 lg:pb-6">
      <Container>
        <FadeIn>
          <div className="mb-4 flex justify-center">
            <span className="bg-ink px-3.5 py-2 font-mono text-small uppercase tracking-[0.16em] text-lime">Trusted by Indian lenders</span>
          </div>
          <h2 className="display text-center text-h2 md:whitespace-nowrap">
            Built for leaders who demand <span className="text-accent">precision</span>
          </h2>
        </FadeIn>

        <div className="mt-6 grid gap-7 lg:grid-cols-[minmax(0,18.75rem)_minmax(0,1fr)]">
          {/* min-w-0 so the scrollable role strip doesn't widen the page */}
          <div className="min-w-0">
            <div role="group" aria-label="Choose a role" className="flex gap-1.5 overflow-x-auto pb-1.5 lg:flex-col lg:overflow-visible">
              {PERSONAS.map((x, n) => {
                const on = n === i
                return (
                  <button
                    key={x.role}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setI(n)}
                    className={`flex shrink-0 items-center justify-between gap-3 rounded-xl px-4 py-2 text-left transition lg:shrink ${on ? 'bg-white ring-1 ring-accent' : 'bg-bg ring-1 ring-line hover:ring-line2'}`}
                  >
                    <span>
                      <span className="block whitespace-nowrap text-body font-semibold">{x.role}</span>
                      <span className="hidden text-small text-muted lg:block">{x.hint}</span>
                    </span>
                    <span className={`hidden font-mono text-label lg:block ${on ? 'text-accent' : 'text-muted'}`}>
                      {String(n + 1).padStart(2, '0')}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <Board p={p} />
        </div>
      </Container>
    </Section>
  )
}

function Board({ p }: { p: Persona }) {
  return (
    <motion.figure
      key={p.view}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      aria-label={`${p.view} dashboard, sample data`}
      className="m-0 overflow-hidden rounded-2xl bg-bg shadow-lg ring-1 ring-line2"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-white px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-6 place-items-center rounded-md bg-ink font-mono text-label text-white">S</span>
          <span className="text-small font-bold">PQM</span>
          <span className="text-small text-muted">{p.view}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-small text-muted">{p.period}</span>
          <span className="rounded bg-wash2 px-2 py-0.5 font-mono text-label text-muted">Sample data</span>
        </div>
      </div>

      <div className="flex flex-col gap-3.5 p-4">
        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
          {p.kpis.map((k) => (
            <div key={k.k} className="rounded-lg bg-white p-3 ring-1 ring-line">
              <div className="font-mono text-label uppercase tracking-[0.06em] text-muted">{k.k}</div>
              <div className="mt-1 text-h3 font-bold tabular-nums">{k.v}</div>
              <span className={`mt-1.5 inline-block rounded px-1.5 py-0.5 text-label font-semibold ${TONE[k.tone]}`}>{k.d}</span>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-white p-4 ring-1 ring-line">
          <div className="font-mono text-label uppercase tracking-[0.06em] text-muted">{p.chart.title}</div>

          {p.chart.type === 'plan' && (
            <div className="mt-3">
              <div className="flex h-[8.25rem] items-end gap-2.5 border-b border-line">
                {p.chart.cols.map((c) => (
                  <div key={c.m} className="relative h-full flex-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${c.h}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="absolute inset-x-[14%] bottom-0 rounded-t bg-accent"
                    />
                    <div className="absolute inset-x-[2%] border-t-2 border-dashed border-amber" style={{ bottom: `${c.p}%` }} />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex gap-2.5">
                {p.chart.cols.map((c) => (
                  <span key={c.m} className="flex-1 text-center text-label text-muted">
                    {c.m}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex gap-4 text-label text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-3 rounded-sm bg-accent" /> Actual
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 border-t-2 border-dashed border-amber" /> Plan
                </span>
              </div>
            </div>
          )}

          {p.chart.type === 'rows' && (
            <div className="mt-3 flex flex-col gap-2.5">
              {p.chart.rows.map((r) => {
                const max = Math.max(...(p.chart as { rows: typeof r[] }).rows.map((x) => x.n))
                return (
                  <div key={r.k} className="grid grid-cols-[minmax(5.75rem,9.375rem)_minmax(0,1fr)_3.5rem] items-center gap-2.5">
                    <span className={`justify-self-start text-small ${r.chip && r.tone ? `rounded px-2 py-0.5 font-semibold ${TONE[r.tone]}` : ''}`}>{r.k}</span>
                    <span className="h-2.5 rounded bg-wash2">
                      <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.max(2, (r.n / max) * 100)}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className={`block h-2.5 rounded ${r.tone ? FILL[r.tone] : 'bg-accent'}`}
                      />
                    </span>
                    <span className="text-right text-small font-bold tabular-nums">{r.v}</span>
                  </div>
                )
              })}
            </div>
          )}

          {p.chart.type === 'table' && (
            <div className="mt-3 overflow-x-auto">
              <div className="min-w-[30rem]">
                <div className="grid grid-cols-[1.7fr_1fr_0.8fr_1.5fr] gap-2 border-b border-line py-1.5 font-mono text-label uppercase tracking-[0.06em] text-muted">
                  <span>File</span>
                  <span>Product</span>
                  <span className="text-right">Amount</span>
                  <span>Status</span>
                </div>
                {p.chart.trows.map((t) => (
                  <div key={t.id} className="grid grid-cols-[1.7fr_1fr_0.8fr_1.5fr] items-center gap-2 border-b border-line2/50 py-2 text-small">
                    <span className="font-mono text-label">{t.id}</span>
                    <span>{t.p}</span>
                    <span className="text-right tabular-nums">{t.amt}</span>
                    <span>
                      <span className={`whitespace-nowrap rounded px-2 py-0.5 text-label font-semibold ${TONE[t.tone]}`}>{t.s}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-start gap-2.5 rounded-lg bg-wash px-3.5 py-3">
          <span className="grid size-6 shrink-0 place-items-center rounded-md bg-accent font-mono text-label text-white">S</span>
          <span className="text-small leading-relaxed text-ink2">
            <b>Insight:</b> {p.insight}
          </span>
        </div>
      </div>
    </motion.figure>
  )
}

/* ── the problem ──────────────────────────────────────────────────────── */

function Problem() {
  return (
    <Section id="problem" tight className="flex flex-col justify-center lg:min-h-[calc(100svh-4rem)] lg:pt-8 lg:pb-8">
      <Container>
        <FadeIn>
          <div className="mb-4 flex justify-center">
            <span className="bg-ink px-3.5 py-2 font-mono text-small uppercase tracking-[0.16em] text-lime">The problem</span>
          </div>
          <h2 className="display text-center text-h2">21st-century capital. 19th-century cockpit</h2>
        </FadeIn>

        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col">
            <div className="eyebrow">What it looks like on the floor</div>
            <div className="mt-3 grid flex-1 auto-rows-fr gap-4 sm:grid-cols-2">
          {PROBLEMS.map((p) => (
            <article key={p.n} className="flex rounded-2xl bg-white p-4 ring-1 ring-line2">
              <div className="grid min-h-[4.75rem] flex-1 place-items-center rounded-xl bg-bg p-2">
                {p.kind === 'blanks' && (
                  <div className="grid size-full grid-cols-2 gap-1.5">
                    {BLANKS.map((b) => (
                      <div key={b} className="flex flex-col justify-between rounded-lg bg-white px-1.5 py-1.5 ring-1 ring-dashed ring-line2">
                        <span className="whitespace-nowrap text-label leading-tight text-muted">{b}</span>
                        <span aria-hidden className="block h-0.5 w-5 bg-line2" />
                      </div>
                    ))}
                  </div>
                )}
                {p.kind === 'chain' && (
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      {CHAIN.map((c, n) => (
                        <div key={c} className="flex items-center gap-1">
                          <span className="text-label text-muted">{c}</span>
                          {n < CHAIN.length - 1 && <span className="text-line2">›</span>}
                        </div>
                      ))}
                    </div>
                    <span className="mx-auto mt-4 block w-fit rounded-full bg-amber-w px-3 py-1 text-label font-semibold text-amber">
                      Slow TAT loses prime borrowers
                    </span>
                  </div>
                )}
                {p.kind === 'leaves' && (
                  <div className="flex w-full flex-wrap items-center justify-center gap-1.5">
                    {LEAVES.map((l) => (
                      <span key={l} className="w-fit rounded-full bg-white px-3 py-1 text-label ring-1 ring-dashed ring-line2">
                        {l}
                      </span>
                    ))}
                  </div>
                )}
                {p.kind === 'truths' && (
                  <div className="grid size-full grid-cols-3 gap-1">
                    {TRUTHS.map((t) => (
                      <div key={t.k} className="rounded-lg bg-white px-1.5 py-1 ring-1 ring-line2">
                        <div className="text-label text-muted">{t.k}</div>
                        <div className="whitespace-nowrap text-label font-bold tabular-nums">{t.v}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
            </div>
          </div>

          <div>
            <div className="eyebrow">All of this leads to</div>
            <div className="mt-3 grid gap-4">
            {PRESSURES.map((x) => (
              <article key={x.t} className="flex flex-col gap-4 sm:flex-row sm:items-center rounded-2xl bg-white p-4 ring-1 ring-line2">
                <div className="grid h-[5.25rem] w-full shrink-0 sm:w-[14rem] place-items-center rounded-xl bg-amber-w/40 p-2">
                  {x.kind === 'nim' && (
                    <svg viewBox="0 0 280 112" role="img" aria-label="Yield falls towards the cost of funds, so the margin narrows" className="w-full">
                      <path d="M8 20 L272 44 L272 70 L8 76 Z" className="fill-amber-w" />
                      <path d="M8 20 L272 44" className="stroke-accent" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      <path d="M8 76 L272 70" className="stroke-amber" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      <text x="10" y="13" className="fill-accent text-[0.875rem] font-semibold">Yield</text>
                      <text x="10" y="94" className="fill-amber text-[0.875rem] font-semibold">Cost of funds</text>
                      <text x="264" y="61" textAnchor="end" className="fill-amber text-[0.9375rem] font-bold">NIM ↓</text>
                    </svg>
                  )}
                  {x.kind === 'unit' && (
                    <div className="flex w-full items-end justify-between gap-1">
                      {[
                        { t: 'CAC ↑', h: 34, c: 'bg-amber' },
                        { t: 'Productivity ↓', h: 11, c: 'bg-amber' },
                        { t: 'Delinquency ↑', h: 28, c: 'bg-red' },
                        { t: 'Margin ↓', h: 4, c: 'bg-red' },
                      ].map((b, n) => (
                        <div key={b.t} className="flex flex-1 items-end gap-1">
                          <div className="flex flex-1 flex-col items-center gap-1.5">
                            <div className={`w-5 rounded-t ${b.c}`} style={{ height: b.h }} />
                            <span className="text-center text-label leading-tight">{b.t}</span>
                          </div>
                          {n < 3 && <span className="pb-6 text-muted">{n === 2 ? '=' : '+'}</span>}
                        </div>
                      ))}
                    </div>
                  )}
                  {x.kind === 'scale' && (
                    <svg viewBox="0 0 280 112" role="img" aria-label="Headcount rises in step with the loan book" className="w-full">
                      <path d="M10 96 C 90 86, 170 56, 268 16" className="stroke-accent" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      <path d="M10 104 C 90 95, 170 66, 268 28" className="stroke-amber" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="5 5" />
                      <text x="266" y="9" textAnchor="end" className="fill-accent text-[0.875rem] font-semibold">Loan book</text>
                      <text x="10" y="22" className="fill-amber text-[0.875rem] font-semibold">Headcount</text>
                    </svg>
                  )}
                </div>
                <div className="min-w-0">
                <h3 className="display text-h3">{x.t}</h3>
                {x.chips.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {x.chips.map((c) => (
                      <span key={c} className="rounded-full bg-amber-w px-2.5 py-1 text-label font-semibold text-amber">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
                {x.body && <p className="mt-2 text-small leading-snug text-muted">{x.body}</p>}
                </div>
              </article>
            ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* ── the solution ──────────────────────────────────────────────────── */

/* Diagram data. Bureaus appear as one generic rail (no third-party names) and
   metrics are words, not unverified percentages. */
const FLOW_RAILS: Rail[] = [
  { label: 'Bureau', icon: 'bureau' },
  { label: 'Account Aggregator', icon: 'data' },
  { label: 'GSTN · MCA21', icon: 'doc' },
  { label: 'CERSAI', icon: 'shield' },
  { label: 'Your core', icon: 'core' },
  { label: 'CKYC · Video KYC', icon: 'lock' },
]

const FLOW_STAGES: Stage[] = [
  { title: 'Collector', sub: 'one pull, not five tabs', icon: 'data' },
  { title: 'Policy engine', sub: 'your matrix, your cut-offs', icon: 'chart' },
  { title: 'Reason writer', sub: 'reason codes, not a number', icon: 'pen' },
  { title: 'Escalator', sub: 'what it may not decide', icon: 'split' },
]

const FLOW_OUTCOME: Stage = { title: 'Approve · STP', sub: 'sanctioned with the KFS attached' }

const FLOW_METRICS = [
  { label: 'Decision', value: 'Minutes' },
  { label: 'Rails, one consent', value: '9 types' },
  { label: 'Reason codes', value: 'Every call' },
]

function How() {
  const [i, setI] = useState(0)
  const a = AGENTS[i]
  const still = useReducedMotion()

  /* the ring walks the loop on its own, every 2s, and keeps going under the
     pointer (asked for directly); a click jumps and restarts the timer */
  useEffect(() => {
    if (still) return
    const id = window.setTimeout(() => setI((i + 1) % AGENTS.length), 2000)
    return () => window.clearTimeout(id)
  }, [still, i])

  return (
    <>
      {/* one screen on desktop, laid out like the problem section it answers:
          tag, centred heading, then the diagram and the lifecycle under it */}
      <Section id="how" tight className="flex flex-col justify-center bg-[linear-gradient(to_bottom,#fff,transparent_14%,transparent_86%,#fff),radial-gradient(ellipse_95%_85%_at_50%_55%,var(--color-wash2)_0%,#fff_100%)] lg:min-h-[calc(100svh-4rem)] lg:pt-6 lg:pb-6">
        <Container>
          <FadeIn className="text-center">
            <div className="mb-4 flex justify-center">
              <span className="bg-ink px-3.5 py-2 font-mono text-small uppercase tracking-[0.16em] text-lime">The solution</span>
            </div>
            <h2 className="display text-h2">
              Saralya <span className="text-accent">OS</span>
            </h2>
            <p className="mx-auto mt-2 max-w-[62ch] text-body leading-relaxed text-muted lg:max-w-none">
              The OS that improves with every lending decision: from a system of record to a system of intelligence.
            </p>
          </FadeIn>

          {/* too wide to read on a phone; the stage chips below carry it there */}
          <FadeIn className="mt-4 hidden md:block">
            <AgentFlow compact rails={FLOW_RAILS} stages={FLOW_STAGES} outcome={FLOW_OUTCOME} metrics={FLOW_METRICS} loopLabel="Saralya CML" />
          </FadeIn>

          {/* lifecycle stages */}
          <FadeIn className="mt-3 flex flex-wrap items-stretch justify-center gap-2">
            {STAGES.map((s, n) => (
              <div key={s.name} className="flex items-stretch gap-2">
                <div className="flex items-center rounded-lg bg-white px-3 py-1.5 ring-1 ring-line2">
                  <span className="whitespace-nowrap text-small font-semibold">{s.name}</span>
                </div>
                {n < STAGES.length - 1 && <span aria-hidden className="self-center text-line2">›</span>}
              </div>
            ))}
          </FadeIn>
        </Container>
      </Section>

      <Section className="border-t-0 pt-0 pb-10 md:pt-0 md:pb-12">
        <Container>
          <div className="grid items-center gap-10 rounded-3xl bg-white p-6 ring-1 ring-line2 md:p-9 lg:grid-cols-2">
            {/* agent ring */}
            <div className="relative mx-auto aspect-square w-full max-w-[32.5rem]">
              <svg viewBox="0 0 560 560" aria-hidden className="absolute inset-0 size-full overflow-visible">
                {[
                  'M280 184 L280 122',
                  'M371.3 250.3 L430.3 231.2',
                  'M336.4 357.7 L372.9 407.8',
                  'M223.6 357.7 L187.1 407.8',
                  'M188.7 250.3 L129.7 231.2',
                ].map((d) => (
                  <path key={d} d={d} className="stroke-line2" strokeWidth="1.5" strokeDasharray="4 5" fill="none" />
                ))}
                {ARC_PATHS.map((d, n) => (
                  <path
                    key={d}
                    d={d}
                    fill="none"
                    strokeLinecap="round"
                    stroke={n === i ? AGENTS[n].color : '#c9d5d1'}
                    strokeWidth={n === i ? 3 : 2}
                  />
                ))}
              </svg>

              <div className="absolute left-1/2 top-1/2 flex aspect-square w-[32%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full bg-ink p-2 text-center text-white">
                <span className="font-mono text-label uppercase tracking-[0.16em] text-accent3">Shared</span>
                <span className="text-small font-semibold leading-tight md:text-body">Borrower profile</span>
              </div>

              {ARC_LABELS.map((l, n) => (
                <div
                  key={l}
                  className="arc-label absolute hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-label font-semibold sm:block"
                  style={{ left: `${AGENTS[n].arc.x}%`, top: `${AGENTS[n].arc.y}%`, color: n === i ? AGENTS[n].color : '#5d6b67' }}
                >
                  {l}
                </div>
              ))}

              {AGENTS.map((x, n) => {
                const on = n === i
                return (
                  <button
                    key={x.name}
                    type="button"
                    aria-pressed={on}
                    aria-label={`Agent ${x.no}, ${x.name}`}
                    onClick={() => setI(n)}
                    className="absolute grid aspect-square w-[max(2.75rem,13.6%)] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-h3 font-bold transition"
                    style={{
                      left: `${x.at.x}%`,
                      top: `${x.at.y}%`,
                      border: `2px solid ${x.color}`,
                      background: on ? x.color : '#ffffff',
                      color: on ? '#ffffff' : x.color,
                      boxShadow: on ? `0 0 0 6px ${x.soft}` : 'none',
                    }}
                  >
                    {x.no}
                  </button>
                )
              })}

              {AGENTS.map((x) => (
                <div
                  key={`${x.name}-label`}
                  aria-hidden
                  className="absolute -translate-x-1/2 whitespace-nowrap text-small font-semibold"
                  style={{ left: `${x.label.x}%`, top: `${x.label.y}%` }}
                >
                  {x.name}
                </div>
              ))}
            </div>

            {/* details for the active agent */}
            <div>
              <motion.div key={a.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full text-body font-bold text-white" style={{ background: a.color }}>
                    {a.no}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-h3 font-semibold">{a.name}</span>
                    <span className="block text-small text-muted">{a.role}</span>
                  </span>
                </div>
                <p className="mt-3.5 text-lede leading-relaxed text-ink2">{a.does}</p>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {a.kpis.map((k) => (
                    <span key={k} className="rounded-full bg-wash px-3 py-1.5 text-small font-semibold text-accent2">
                      {k}
                    </span>
                  ))}
                </div>
              </motion.div>

              <div className="mt-5 font-mono text-label uppercase tracking-[0.1em] text-muted">Step {i + 1} of 5</div>
            </div>
          </div>

          <div className="mt-20">
            <h3 className="display text-center text-[2.5rem] leading-tight">Every problem, fixed at the source</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {FIXES.map((f) => (
                <article key={f.problem} className="flex flex-col rounded-2xl bg-white p-5 ring-1 ring-line2">
                  <div className="font-mono text-label uppercase tracking-[0.14em] text-amber">Today</div>
                  <p className="mt-1.5 text-small text-muted">{f.problem}</p>
                  <div className="mt-3 font-mono text-label uppercase tracking-[0.14em] text-accent">With Saralya</div>
                  <p className="mt-1.5 text-body font-semibold leading-snug">{f.fix}</p>
                  <div className="mt-auto border-t border-line pt-3 text-h3 font-bold text-accent2">{f.kpi}</div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

/* ── demo request ──────────────────────────────────────────────────── */

/* Same lime block as the closing block on /agents, so both pages end alike. */
function Demo() {
  return (
    <Section id="demo">
      <Container>
        <FadeIn className="relative overflow-hidden bg-lime px-7 py-12 text-ink md:px-14 md:py-16">
          {/* decorative shapes */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 -top-28 size-80 rounded-full border-[1.75rem] border-ink/10" />
            <div className="absolute -bottom-32 right-[18%] size-56 rounded-full bg-ink/10" />
            <div className="absolute left-0 top-0 h-full w-2 bg-ink" />
          </div>

          <div className="relative grid items-end gap-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
            <div>
              <div className="flex items-center gap-2.5 font-mono text-label uppercase tracking-[0.22em] text-ink/70">
                <span className="size-2 bg-ink" />
                Making lending Saral
              </div>
              <h2 className="display mt-4 max-w-[18ch] text-h2">Ready to transform your lending?</h2>

              <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2.5">
                {['30 minutes', 'Built on your KPIs', 'Under NDA'].map((b) => (
                  <span key={b} className="flex items-center gap-2 text-small font-semibold text-ink/80">
                    <Check className="size-3.5" strokeWidth={3} />
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={demo}
              className="group inline-flex items-center gap-2.5 self-start bg-ink px-8 py-4 text-body font-bold uppercase tracking-[0.06em] text-lime transition hover:bg-ink2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink lg:self-end"
            >
              Request a demo
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
