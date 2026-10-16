import { motion } from 'motion/react'
import { Container, Section, SectionHead } from '../components/ui/Section'

/* TEMPORARY: /lab — candidate visuals for the "Built ground-up for Digital
   Lending" card, in the real card frame so they can be judged as they will
   look. Pick one and this file, its route in App.tsx and every visual but
   the chosen one go. */

const EASE = [0.22, 1, 0.36, 1] as const

export function Lab() {
  return (
    <Section>
      <Container>
        <SectionHead
          eyebrow="Lab · temporary"
          title={
            <>
              Six ways to say <span className="text-accent">trained on BFSI data</span>.
            </>
          }
          lede="Same card, same size. Tell me a number."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {[
            ['01 · Vocabulary', <Vocab key="1" />],
            ['02 · Attention heatmap', <Heat key="2" />],
            ['03 · A file being read', <FileRead key="3" />],
            ['04 · Signals it watches', <Sparks key="4" />],
            ['05 · What it has seen', <Scatter key="5" />],
            ['06 · One consent, one answer', <Flow key="6" />],
            ['07 · Same question, two answers', <TwoAnswers key="7" />],
            ['08 · X-ray on the file', <Xray key="8" />],
            ['09 · The account’s heartbeat', <Pulse key="9" />],
          ].map(([label, node]) => (
            <div key={String(label)} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-line">
              <div className="relative h-[190px] overflow-hidden bg-gradient-to-b from-wash2 to-white">{node}</div>
              <div className="p-6 pt-5">
                <div className="font-mono text-label uppercase tracking-[0.12em] text-accent">{label}</div>
                <div className="mt-2 text-h3 font-extrabold leading-snug tracking-[-0.02em]">Built ground-up for Digital Lending.</div>
                <p className="mt-2 text-body text-muted">Trained on BFSI data, not a generic model.</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function Badge() {
  return (
    <div className="absolute left-4 top-4 z-10 rounded-full bg-white px-2.5 py-1 font-mono text-label text-accent shadow-sm">
      BFSI-trained
    </div>
  )
}

/* 01 — the words it was trained on, landing one by one */
const TERMS = [
  { t: 'NACH bounce', x: 6, y: 26 },
  { t: 'SMA-0', x: 46, y: 12 },
  { t: 'KFS', x: 72, y: 30 },
  { t: 'GSTR-3B', x: 10, y: 56 },
  { t: 'CRILC', x: 38, y: 44 },
  { t: 'DPD 30', x: 66, y: 60 },
  { t: 'SARFAESI', x: 20, y: 78 },
  { t: 'roll-rate', x: 56, y: 82 },
]

function Vocab() {
  return (
    <div className="absolute inset-0">
      <Badge />
      {TERMS.map((w, i) => (
        <motion.span
          key={w.t}
          className="absolute rounded-full bg-white px-2.5 py-1 font-mono text-[11px] text-ink2 shadow-sm ring-1 ring-line"
          style={{ left: `${w.x}%`, top: `${w.y}%` }}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 + i * 0.09, ease: EASE }}
        >
          {w.t}
        </motion.span>
      ))}
    </div>
  )
}

/* 02 — attention over the signals, filling in waves */
const ROWS = ['NACH', 'SMA-0', 'GST', 'Bureau', 'KYC']
const COLS = 16

function Heat() {
  return (
    <div className="absolute inset-0 px-4 pt-11">
      <Badge />
      <div className="space-y-1.5">
        {ROWS.map((r, y) => (
          <div key={r} className="flex items-center gap-2">
            <span className="w-12 shrink-0 text-right font-mono text-[9px] uppercase text-hint">{r}</span>
            <div className="flex flex-1 gap-1">
              {Array.from({ length: COLS }, (_, x) => {
                /* a deterministic ripple, so it reads as a pattern not noise */
                const v = (Math.sin(x * 0.9 + y * 1.7) + 1) / 2
                return (
                  <motion.span
                    key={x}
                    className="h-4 flex-1 rounded-[3px] bg-accent"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.08 + v * 0.82 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + (x + y) * 0.035 }}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* 03 — a file scrolling past, three lines marked */
const LINES = [
  { w: 72 },
  { w: 54, note: 'turnover ↓ 18%' },
  { w: 84 },
  { w: 44, note: 'NACH bounce' },
  { w: 66 },
  { w: 58, note: 'GST filing gap' },
  { w: 78 },
]

function FileRead() {
  return (
    <div className="absolute inset-0 px-5 pt-11">
      <Badge />
      <div className="space-y-2.5">
        {LINES.map((l, i) => (
          <div key={i} className="flex items-center gap-3">
            <motion.span
              className={`h-2 rounded-full ${l.note ? 'bg-accent' : 'bg-line2'}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${l.w / 2}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
            />
            {l.note && (
              <motion.span
                className="whitespace-nowrap font-mono text-[10px] text-accent"
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                ◂ {l.note}
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* 04 — the signals it watches, as small multiples */
const SERIES = [
  { k: 'Cash flow', d: [8, 10, 9, 12, 11, 14, 13, 16], tone: 'stroke-accent' },
  { k: 'Bounces', d: [3, 2, 4, 3, 6, 9, 12, 15], tone: 'stroke-red' },
  { k: 'GST filings', d: [12, 12, 11, 12, 10, 7, 6, 4], tone: 'stroke-amber' },
  { k: 'Enquiries', d: [2, 3, 3, 5, 4, 7, 9, 11], tone: 'stroke-ink2' },
]

function Sparks() {
  const line = (d: number[]) =>
    d.map((v, i) => `${i ? 'L' : 'M'}${(i / (d.length - 1)) * 60} ${22 - (v / 16) * 18}`).join(' ')
  return (
    <div className="absolute inset-0 grid grid-cols-2 gap-x-6 gap-y-3 px-5 pt-12">
      <Badge />
      {SERIES.map((s, i) => (
        <div key={s.k} className="flex items-center gap-3">
          <svg viewBox="0 0 60 24" className="h-6 w-16 shrink-0">
            <motion.path
              d={line(s.d)}
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              className={s.tone}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.12 }}
            />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-hint">{s.k}</span>
        </div>
      ))}
    </div>
  )
}

/* 05 — the book it has seen: every dot a file, the flagged ones apart */
function Scatter() {
  const dots = Array.from({ length: 90 }, (_, i) => {
    const a = i * 2.39996
    const r = Math.sqrt(i / 90)
    return { x: 50 + Math.cos(a) * r * 38, y: 50 + Math.sin(a) * r * 34, bad: i % 11 === 0 }
  })
  return (
    <div className="absolute inset-0">
      <Badge />
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className={`absolute size-1.5 rounded-full ${d.bad ? 'bg-red' : 'bg-accent/45'}`}
          style={{ left: `${d.x}%`, top: `${d.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: d.bad ? 1.6 : 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.008 }}
        />
      ))}
      <div className="absolute bottom-3 right-4 font-mono text-[10px] text-hint">
        <span className="text-red">●</span> flagged before disbursal
      </div>
    </div>
  )
}

/* 06 — four sources in, one answer out */
const SRC = ['Bureau', 'Account Aggregator', 'GSTN', 'MCA21']

function Flow() {
  return (
    <div className="absolute inset-0 px-5 pt-11">
      <Badge />
      <svg viewBox="0 0 280 120" className="size-full">
        {SRC.map((s, i) => {
          const y = 14 + i * 30
          return (
            <g key={s}>
              <motion.text
                x="0"
                y={y + 3}
                className="fill-muted font-mono text-[9px]"
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {s}
              </motion.text>
              <motion.path
                d={`M96 ${y} C 140 ${y}, 150 60, 196 60`}
                fill="none"
                strokeWidth="2"
                className="stroke-accent/50"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
              />
            </g>
          )
        })}
        <motion.rect
          x="196"
          y="44"
          width="78"
          height="32"
          rx="10"
          className="fill-ink"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ transformOrigin: '235px 60px' }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 300, damping: 20 }}
        />
        <motion.text
          x="235"
          y="64"
          textAnchor="middle"
          className="fill-white font-mono text-[10px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          scored
        </motion.text>
      </svg>
    </div>
  )
}

/* 07 — the one thing a general model gets wrong. Nobody puts a model's
   mistake on a marketing card; it is the fastest way to prove the claim. */
function TwoAnswers() {
  return (
    <div className="absolute inset-0 px-4 pt-11">
      <Badge />
      <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-hint">“Can we tag this account as fraud today?”</div>
      <div className="mt-2.5 space-y-2">
        <motion.div
          className="flex items-start gap-2 rounded-xl bg-white px-3 py-2 ring-1 ring-line"
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-red/10 font-mono text-[10px] text-red">✕</span>
          <span className="min-w-0">
            <span className="block font-mono text-[9px] uppercase tracking-[0.1em] text-hint">General model</span>
            <span className="block text-[11px] leading-snug text-ink2">“Yes — flag it as fraud and close the file.”</span>
          </span>
        </motion.div>
        <motion.div
          className="flex items-start gap-2 rounded-xl bg-white px-3 py-2 ring-1 ring-accent/40"
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-[10px] text-accent">✓</span>
          <span className="min-w-0">
            <span className="block font-mono text-[9px] uppercase tracking-[0.1em] text-accent">Saralya</span>
            <span className="block text-[11px] leading-snug text-ink">“Not yet — the 21-day show-cause notice has to close first.”</span>
          </span>
        </motion.div>
      </div>
    </div>
  )
}

/* 08 — a scan passes over the document and the fields come out of it */
const FIELDS = [
  { t: 'Turnover ₹1.4 Cr', top: 18 },
  { t: 'EMI/NMI 46%', top: 44 },
  { t: 'Bounce ×2', top: 70 },
]

function Xray() {
  return (
    <div className="absolute inset-0 overflow-hidden px-4 pt-11">
      <Badge />
      <div className="relative h-[120px] rounded-xl bg-white ring-1 ring-line">
        {/* the page */}
        <div className="space-y-2 p-3">
          {[80, 62, 90, 54, 72, 44].map((w, i) => (
            <span key={i} className="block h-1.5 rounded-full bg-line2" style={{ width: `${w}%` }} />
          ))}
        </div>
        {/* the scan */}
        <motion.span
          className="absolute inset-y-0 w-14 bg-gradient-to-r from-transparent via-accent/25 to-transparent"
          initial={{ x: -60 }}
          whileInView={{ x: 320 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.2 }}
        />
        {/* what it pulled out */}
        {FIELDS.map((f, i) => (
          <motion.span
            key={f.t}
            className="absolute right-3 rounded-md bg-ink px-2 py-1 font-mono text-[9px] text-white"
            style={{ top: f.top }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + i * 0.35 }}
          >
            {f.t}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

/* 09 — the account as an ECG: steady until the mandate fails */
function Pulse() {
  const d =
    'M0 30 L22 30 L28 18 L34 42 L40 30 L70 30 L76 20 L82 40 L88 30 L118 30 ' +
    'L124 6 L130 54 L136 30 L150 30 L156 10 L162 50 L168 30 L200 30 L206 22 L212 38 L218 30 L260 30'
  return (
    <div className="absolute inset-0 px-4 pt-12">
      <Badge />
      <svg viewBox="0 0 260 62" className="w-full">
        <line x1="0" y1="30" x2="260" y2="30" className="stroke-line" strokeWidth="1" strokeDasharray="2 4" />
        <motion.path
          d={d}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-accent"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="127"
          cy="30"
          r="16"
          className="fill-none stroke-red"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ transformOrigin: '127px 30px' }}
          transition={{ delay: 1.3, type: 'spring', stiffness: 300, damping: 18 }}
        />
      </svg>
      <motion.div
        className="mt-1 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.08em]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6 }}
      >
        <span className="text-hint">Mandate healthy</span>
        <span className="font-bold text-red">Day 1 · NACH failed</span>
        <span className="text-hint">SMA-0 tagged</span>
      </motion.div>
    </div>
  )
}
