import { Banknote, Building2, Database, FileSearch, Landmark, Receipt, ShieldCheck } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FadeIn } from '../ui/Motion'
import { Container, Section, SectionHead } from '../ui/Section'

/* India's rails on the left, one Saralya core in the middle, a decided loan
   on the right: joined by lines that carry packets. The lines are drawn
   from the real positions of the cards, so the layout can reflow freely. */

const RAILS = [
  [
    { n: 'CIBIL', icon: Building2 },
    { n: 'Experian', icon: Landmark },
  ],
  [
    { n: 'Account Aggregator', icon: Database },
    { n: 'GSTN', icon: Receipt },
    { n: 'MCA21', icon: FileSearch },
  ],
  [
    { n: 'CERSAI', icon: ShieldCheck },
    { n: 'NPCI · NACH', icon: Banknote },
  ],
]
const APPLICANTS = [
  { i: 'RK', n: 'Rahul K.', m: 'MSME · ₹4.5L · 24 months', c: 'bg-accent' },
  { i: 'PS', n: 'Priya S.', m: 'Retail · ₹80K · 12 months', c: 'bg-blue' },
  { i: 'AM', n: 'Anand M.', m: 'LAP · ₹22L · 84 months', c: 'bg-purple' },
  { i: 'SG', n: 'SHG Group 14', m: 'JLG · ₹1.2L · 18 months', c: 'bg-amber' },
]

type P = { x: number; y: number }
const curve = (a: P, b: P) => {
  const dx = Math.max(40, (b.x - a.x) * 0.5)
  return `M ${a.x} ${a.y} C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`
}

export function HowItWorks() {
  const box = useRef<HTMLDivElement>(null)
  const rails = useRef<(HTMLDivElement | null)[]>([])
  const core = useRef<HTMLDivElement>(null)
  const out = useRef<HTMLDivElement>(null)
  const [paths, setPaths] = useState<string[]>([])
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [who, setWho] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setWho((w) => (w + 1) % APPLICANTS.length), 3200)
    return () => window.clearInterval(id)
  }, [])

  useLayoutEffect(() => {
    const el = box.current
    if (!el) return
    const draw = () => {
      if (!window.matchMedia('(min-width: 1024px)').matches || !core.current || !out.current) return setPaths([])
      const b = el.getBoundingClientRect()
      const rel = (r: DOMRect, side: 'l' | 'r'): P => ({ x: (side === 'l' ? r.left : r.right) - b.left, y: r.top + r.height / 2 - b.top })
      const c = core.current.getBoundingClientRect()
      const o = out.current.getBoundingClientRect()
      // every rail runs straight to a shared trunk just right of the cluster, then curves into the core
      const rects = rails.current.filter(Boolean).map((r) => r!.getBoundingClientRect())
      const trunk = Math.max(...rects.map((r) => r.right)) - b.left + 28
      const next = rects.map((r) => {
        const from = rel(r, 'r')
        return `M ${from.x} ${from.y} L ${trunk} ${from.y} ` + curve({ x: trunk, y: from.y }, rel(c, 'l')).replace(/^M [^C]+/, '')
      })
      next.push(curve(rel(c, 'r'), rel(o, 'l')))
      setPaths(next)
      setSize({ w: b.width, h: b.height })
    }
    draw()
    const ro = new ResizeObserver(draw)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const a = APPLICANTS[who]

  return (
    <Section id="how">
      <Container>
        <SectionHead
          eyebrow="How it works"
          title={
            <span className="relative inline-block">
              One endpoint. Every rail.
              {/* two hand-drawn strokes, like a sketch mark next to the headline */}
              <svg aria-hidden viewBox="0 0 40 40" className="absolute -right-10 -top-6 hidden size-9 text-accent md:block">
                <motion.path d="M8 30 L22 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.5 }} />
                <motion.path d="M20 32 L34 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.7 }} />
              </svg>
            </span>
          }
          lede="Bureau, AA, GSTN, MCA21 and CERSAI in one pull. One call to us. A decided loan back."
        />

        <FadeIn>
          <div ref={box} className="relative grid items-center gap-10 py-4 lg:grid-cols-[auto_1fr_auto] lg:gap-0 lg:py-10">
            {/* the lines, drawn from measured positions (desktop only) */}
            {paths.length > 0 && (
              <svg className="pointer-events-none absolute inset-0 hidden lg:block" width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`} fill="none">
                {paths.map((d, i) => (
                  <g key={i}>
                    <path d={d} stroke="var(--color-line2)" strokeWidth="1.5" />
                    <motion.path d={d} stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="4 12" strokeLinecap="round" animate={{ strokeDashoffset: [0, -32] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }} />
                    <circle r="4" fill="var(--color-accent)">
                      <animateMotion dur="2.6s" repeatCount="indefinite" begin={`${(i * 0.45) % 2.6}s`} path={d} />
                    </circle>
                  </g>
                ))}
              </svg>
            )}

            {/* rails, staggered like a switchboard */}
            <div className="relative flex justify-center gap-3 lg:justify-start">
              {RAILS.map((col, ci) => (
                <div key={ci} className={`flex flex-col gap-3 ${ci === 1 ? '-mt-8 lg:-mt-10' : ci === 2 ? 'mt-6' : 'mt-2'}`}>
                  {col.map((r, ri) => {
                    const idx = RAILS.slice(0, ci).reduce((n, c) => n + c.length, 0) + ri
                    return (
                      <motion.div
                        key={r.n}
                        ref={(el) => {
                          rails.current[idx] = el
                        }}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 4 + (idx % 3), repeat: Infinity, ease: 'easeInOut', delay: idx * 0.4 }}
                        className="flex w-[104px] flex-col items-center justify-center gap-2 rounded-2xl bg-white px-2 py-4 text-center shadow-lg sm:w-[118px]"
                      >
                        <r.icon className="size-6 text-accent" strokeWidth={1.7} />
                        <span className="text-[12px] font-semibold leading-tight text-ink2">{r.n}</span>
                      </motion.div>
                    )
                  })}
                </div>
              ))}
            </div>

            {/* the core */}
            <div className="relative flex flex-col items-center justify-center gap-3">
              <div ref={core} className="relative grid size-24 place-items-center rounded-3xl bg-ink text-white shadow-lg">
                <span className="absolute inset-0 rounded-3xl bg-ink animate-pulse-ring" />
                {/* the wordmark's initial, same weight and dot as the nav logo */}
                <span className="relative flex items-start text-[44px] font-extrabold leading-none tracking-[-0.06em]">
                  S<span className="mt-[9px] ml-0.5 size-2.5 rounded-full bg-accent3" />
                </span>
              </div>
              <span className="font-mono text-[11px] text-hint">POST /v1/decisions</span>
            </div>

            {/* the decision */}
            <div className="relative mx-auto w-full max-w-[300px] lg:mx-0 lg:pt-12">
              <div ref={out} className="rounded-3xl bg-white p-5 shadow-lg">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-hint">Decision out</div>
                <div className="mt-3 h-[52px]">
                  <AnimatePresence mode="wait">
                    <motion.div key={a.n} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="flex items-center gap-3">
                      <span className={`grid size-10 place-items-center rounded-xl text-[12px] font-bold text-white ${a.c}`}>{a.i}</span>
                      <div>
                        <div className="text-[15px] font-bold">{a.n}</div>
                        <div className="font-mono text-[11px] text-muted">{a.m}</div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="mt-4 flex items-center justify-between rounded-xl bg-bg px-3 py-2 text-[12.5px] ring-1 ring-line">
                  <span className="text-muted">Score</span>
                  <span className="font-bold tabular-nums">742 / 850</span>
                </div>
                <div className="mt-3 grid h-11 place-items-center rounded-xl bg-ink text-[13.5px] font-bold uppercase tracking-[0.06em] text-white">Approve · STP</div>
              </div>

              {/* the outcome card sits on the corner of the decision */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
                className="mx-auto -mt-4 flex w-fit items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg lg:absolute lg:-right-6 lg:-top-2 lg:mt-0"
              >
                <span className="relative grid size-10 place-items-center rounded-full bg-green-w text-green ring-1 ring-green/20">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <motion.path d="M5 12.5 L10 17 L19 7" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.9 }} />
                  </svg>
                </span>
                <div>
                  <div className="text-[13.5px] font-bold">Sanctioned</div>
                  <div className="font-mono text-[10.5px] text-muted">KFS sent · under 5 min</div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line pt-5 font-mono text-[12px] text-muted">
            <span>
              Bureau + AA + GSTN one pull
            </span>
            <span>
              Inference inside India
            </span>
            <span>
              Audit trail immutable
            </span>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}

