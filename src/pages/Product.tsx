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

/* The product page, ported from the lead's own design: the operating
   system in the hero, the three cards under it, the PQM each desk gets,
   the problem it answers, the five agents around one borrower profile,
   and the demo. Words and figures are his — see TODO in content/product.ts
   for the two that still need a source. */

const demo = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Saralya demo request')}`

/* status, never identity: the four tones the page uses */
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

/* ── the operating system ─────────────────────────────────────────────── */

function Hero() {
  const still = useReducedMotion()
  return (
    <section className="dots bg-ink py-14 text-white md:py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          <FadeIn>
            <div className="eyebrow text-accent3">Making lending Saral</div>
            <h1 className="display mt-4 text-balance text-h1">
              The enterprise&#8209;grade <span className="text-accent3">operating system</span> for lenders
            </h1>
            <p className="mt-4 max-w-[46ch] text-lede leading-relaxed text-white/70">
              The intelligence layer behind every lending decision.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={demo} className="rounded-full bg-white px-7 py-3.5 text-body font-semibold text-ink transition-colors hover:bg-wash">
                Request a demo
              </a>
              <a href="#how" className="rounded-full px-7 py-3.5 text-body font-semibold text-white ring-1 ring-white/35 transition hover:ring-white">
                See how it works
              </a>
            </div>
          </FadeIn>

          {/* the stack: decisions on top, your systems below, us between */}
          <FadeIn className="rounded-3xl bg-white/[0.03] p-6 ring-1 ring-white/10">
            <div className="font-mono text-label uppercase tracking-[0.16em] text-white/50">Every lending decision</div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {DECISIONS.map((d) => (
                <span key={d} className="rounded-full px-3.5 py-1.5 text-small text-white/90 ring-1 ring-white/25">
                  {d}
                </span>
              ))}
            </div>

            <Rails still={still} />

            <div className="rounded-2xl bg-accent2/60 p-4 ring-1 ring-accent3/60">
              <div className="font-mono text-label uppercase tracking-[0.16em] text-accent3">Saralya · intelligence layer</div>
              <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                {LAYER.map((l) => (
                  <span key={l} className="rounded-xl bg-white/10 px-3.5 py-3 text-body font-semibold leading-snug">
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <Rails still={still} delay={0.4} />

            <div className="flex flex-wrap gap-2">
              {SYSTEMS.map((s) => (
                <span key={s} className="rounded-lg bg-white/[0.06] px-3 py-1.5 text-small text-white/70">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-2.5 font-mono text-label uppercase tracking-[0.16em] text-white/50">Your existing systems</div>
          </FadeIn>
        </div>
      </Container>
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
              className="absolute -left-[3px] size-[7px] rounded-full bg-accent3"
              animate={{ y: [20, -20], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: d + delay, ease: 'linear' }}
            />
          )}
        </span>
      ))}
    </div>
  )
}

/* ── modules, model, overlay ───────────────────────────────────────────── */

function Three() {
  return (
    <section className="border-b border-line bg-bg py-12 md:py-16">
      <Container>
        {/* the chapter this section opens */}
        <div className="-mt-4 mb-7 flex justify-center">
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

/* ── the PQM each desk gets ───────────────────────────────────────────── */

function Leaders() {
  const [i, setI] = useState(0)
  const [running, setRunning] = useState(true)
  const still = useReducedMotion()
  const p = PERSONAS[i]

  useEffect(() => {
    if (!running || still) return
    const id = window.setTimeout(() => setI((n) => (n + 1) % PERSONAS.length), 5000)
    return () => window.clearTimeout(id)
  }, [running, still, i])

  return (
    <Section id="leaders">
      <Container>
        <FadeIn>
          <div className="-mt-4 mb-7 flex justify-center">
            <span className="bg-ink px-3.5 py-2 font-mono text-small uppercase tracking-[0.16em] text-lime">Trusted by Indian lenders</span>
          </div>
          <h2 className="display text-center text-h2 md:whitespace-nowrap">
            Built for leaders who demand <span className="text-accent">precision</span>
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-7 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
          {/* min-w-0, or the scrolling strip of roles widens the page instead
              of scrolling inside itself */}
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
                    className={`flex shrink-0 items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left transition lg:shrink ${on ? 'bg-white ring-1 ring-accent' : 'bg-bg ring-1 ring-line hover:ring-line2'}`}
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
            <button
              type="button"
              onClick={() => setRunning((r) => !r)}
              className="mt-3 rounded-full bg-white px-5 py-2 text-small font-semibold text-ink2 ring-1 ring-line2 transition hover:ring-accent"
            >
              {running ? 'Pause' : 'Play'}
            </button>
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
              <div className="flex h-[140px] items-end gap-2.5 border-b border-line">
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
                  <div key={r.k} className="grid grid-cols-[minmax(92px,150px)_minmax(0,1fr)_56px] items-center gap-2.5">
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
              <div className="min-w-[480px]">
                <div className="grid grid-cols-[1.7fr_1fr_0.8fr_1.5fr] gap-2 border-b border-line py-1.5 font-mono text-label uppercase tracking-[0.06em] text-muted">
                  <span>File</span>
                  <span>Product</span>
                  <span className="text-right">Amount</span>
                  <span>Status</span>
                </div>
                {p.chart.trows.map((t) => (
                  <div key={t.id} className="grid grid-cols-[1.7fr_1fr_0.8fr_1.5fr] items-center gap-2 border-b border-line2/50 py-2.5 text-small">
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
    <Section id="problem" tight className="flex flex-col justify-center lg:min-h-[calc(100svh-64px)] lg:pt-6 lg:pb-20">
      <Container>
        <FadeIn>
          <div className="-mt-3 mb-3 flex justify-center">
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
              <div className="grid min-h-[76px] flex-1 place-items-center rounded-xl bg-bg p-2">
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
                <div className="grid h-[84px] w-full shrink-0 sm:w-[224px] place-items-center rounded-xl bg-amber-w/40 p-2">
                  {x.kind === 'nim' && (
                    <svg viewBox="0 0 280 112" role="img" aria-label="Yield falls towards the cost of funds, so the margin narrows" className="w-full">
                      <path d="M8 20 L272 44 L272 70 L8 76 Z" className="fill-amber-w" />
                      <path d="M8 20 L272 44" className="stroke-accent" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      <path d="M8 76 L272 70" className="stroke-amber" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      <text x="10" y="13" className="fill-accent text-[14px] font-semibold">Yield</text>
                      <text x="10" y="94" className="fill-amber text-[14px] font-semibold">Cost of funds</text>
                      <text x="264" y="61" textAnchor="end" className="fill-amber text-[15px] font-bold">NIM ↓</text>
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
                      <text x="266" y="9" textAnchor="end" className="fill-accent text-[14px] font-semibold">Loan book</text>
                      <text x="10" y="22" className="fill-amber text-[14px] font-semibold">Headcount</text>
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

        <p className="display mx-auto mt-5 max-w-[860px] text-center text-h3">
          The fix isn’t more people. It’s an <span className="text-accent">operating system</span>.
        </p>
      </Container>
    </Section>
  )
}

/* ── how it works: five agents, one profile ───────────────────────────── */

/* What the architecture diagram is handed. The bureaus the prototype named
   by brand are one "Bureau" rail: we do not name third parties on the site.
   The metrics stay words, not percentages — the founders have struck
   unverifiable numbers before. */
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
  const [looping, setLooping] = useState(false)
  const a = AGENTS[i]
  const still = useReducedMotion()

  useEffect(() => {
    if (!looping || still) return
    const id = window.setTimeout(() => {
      if (i + 1 >= AGENTS.length) {
        setLooping(false)
        return
      }
      setI(i + 1)
    }, 2600)
    return () => window.clearTimeout(id)
  }, [looping, still, i])

  return (
    <Section id="how" className="border-t border-line bg-bg pb-10 md:pb-12">
      <Container>
        {/* the write-up on the left, the agent architecture running beside
            it: rails in, the engine, the loop of steps, a decided file out */}
        {/* The diagram is a 1240-wide landscape object. Beside a column of
            copy it can only be shrunk, and the headline pays for it, so the
            headline owns the first row at full size and the diagram owns the
            one beneath it at its own. */}
        {/* the name is two words, so it sits on the line with its
            description rather than floating alone over the diagram */}
        <FadeIn className="border-b border-line pb-6">
          <div className="-mt-4 mb-7 flex justify-center">
            <span className="bg-ink px-3.5 py-2 font-mono text-small uppercase tracking-[0.16em] text-lime">The solution</span>
          </div>
          <div className="grid gap-3 xl:grid-cols-[auto_minmax(0,1fr)] xl:items-end xl:gap-10">
            <h2 className="display whitespace-nowrap text-h2">
              Saralya <span className="text-accent">OS</span>
            </h2>
            <p className="text-body leading-relaxed text-muted xl:whitespace-nowrap xl:pb-3.5">
              The OS that improves with every lending decision: from a system of record to a system of intelligence.
            </p>
          </div>
        </FadeIn>

        {/* too wide to read on a phone; the stage chips below carry it there */}
        <FadeIn className="mt-9 hidden md:block">
          <AgentFlow compact rails={FLOW_RAILS} stages={FLOW_STAGES} outcome={FLOW_OUTCOME} metrics={FLOW_METRICS} loopLabel="Saralya CML" />
        </FadeIn>

        {/* the same engine read end to end: six stops */}
        <FadeIn className="mt-4 flex flex-wrap items-stretch justify-center gap-2">
          {STAGES.map((s, n) => (
            <div key={s.name} className="flex items-stretch gap-2">
              <div className="flex items-center rounded-xl bg-white px-4 py-2.5 ring-1 ring-line2">
                <span className="whitespace-nowrap text-body font-semibold">{s.name}</span>
              </div>
              {n < STAGES.length - 1 && <span aria-hidden className="self-center text-line2">›</span>}
            </div>
          ))}
        </FadeIn>

        <div className="mt-10 grid items-center gap-10 rounded-3xl bg-white p-6 ring-1 ring-line2 md:p-9 lg:grid-cols-2">
          {/* the ring */}
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
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
                  onClick={() => {
                    setLooping(false)
                    setI(n)
                  }}
                  className="absolute grid aspect-square w-[max(44px,13.6%)] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-h3 font-bold transition"
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

          {/* the agent the ring is showing */}
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
                <span className={`whitespace-nowrap rounded-full px-3 py-1 text-small font-semibold ${TONE[a.tone]}`}>{a.status}</span>
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

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (looping) return setLooping(false)
                  setI(0)
                  setLooping(true)
                }}
                className="rounded-full bg-ink px-5 py-2.5 text-small font-semibold text-white transition-colors hover:bg-ink2"
              >
                {looping ? 'Stop' : 'Play the loop'}
              </button>
              <span className="font-mono text-label uppercase tracking-[0.1em] text-muted">Step {i + 1} of 5</span>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="display text-h2">Every problem, fixed at the source</h3>
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
  )
}

/* ── the ask ──────────────────────────────────────────────────────────── */

function Demo() {
  return (
    <section id="demo" className="border-t border-line bg-[radial-gradient(ellipse_70%_90%_at_10%_50%,#dcebe6_0%,transparent_60%),radial-gradient(ellipse_60%_90%_at_95%_40%,#eef5f2_0%,transparent_60%),linear-gradient(180deg,#f7faf9_0%,#eef4f2_100%)] py-16 text-center md:py-24">
      <Container>
        <FadeIn>
          <div className="eyebrow text-accent">Making lending Saral</div>
          <h2 className="display mt-4 text-h2">
            Ready to transform your <span className="text-accent">lending</span>?
          </h2>
          <a href={demo} className="mt-7 inline-block rounded-full bg-ink px-7 py-3.5 text-body font-semibold text-white transition-colors hover:bg-ink2">
            Request a demo
          </a>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {['30 minutes', 'Built on your KPIs', 'Under NDA'].map((c) => (
              <span key={c} className="rounded-full px-3 py-1 text-small text-muted ring-1 ring-line2">
                {c}
              </span>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
