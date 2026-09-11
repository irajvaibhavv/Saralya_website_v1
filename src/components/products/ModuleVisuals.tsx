import { Check, FileCheck2, PhoneCall, ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'
import { Counter } from '../ui/Motion'

/* One bespoke animation per module. Every visual loops so the stage never
   looks static, and all of them are pure SVG/CSS — no image assets. */

const EASE = [0.22, 1, 0.36, 1] as const
const LOOP = { repeat: Infinity, repeatDelay: 1.6 } as const

function Stage({ children, wash }: { children: React.ReactNode; wash: string }) {
  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-[28px] ${wash}`}>
      <div className="absolute inset-0 grid-paper opacity-40 mask-fade-radial" />
      <div className="absolute inset-5 md:inset-7">{children}</div>
    </div>
  )
}

/* M1 · Appraisal — a credit gauge sweeping up while data sources land. */
export function AppraisalVisual() {
  const r = 84
  const c = Math.PI * r // half circle
  const sources = ['CIBIL', 'Account Aggregator', 'GSTN', 'MCA21']
  return (
    <Stage wash="bg-wash">
      <div className="flex h-full flex-col items-center justify-between rounded-3xl bg-white/85 p-6 shadow-md backdrop-blur">
        <div className="relative">
          <svg width="220" height="120" viewBox="0 0 220 120">
            <path d={`M ${110 - r} 110 A ${r} ${r} 0 0 1 ${110 + r} 110`} fill="none" stroke="var(--color-line)" strokeWidth="14" strokeLinecap="round" />
            <motion.path
              d={`M ${110 - r} 110 A ${r} ${r} 0 0 1 ${110 + r} 110`}
              fill="none"
              stroke="url(#ag)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={c}
              initial={{ strokeDashoffset: c }}
              animate={{ strokeDashoffset: [c, c * 0.18, c * 0.18, c] }}
              transition={{ duration: 5, times: [0, 0.35, 0.85, 1], ease: EASE, ...LOOP }}
            />
            <defs>
              <linearGradient id="ag" x1="0" x2="1">
                <stop offset="0" stopColor="#7f63ff" />
                <stop offset="1" stopColor="#c034e8" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-x-0 bottom-0 text-center">
            <div className="display text-[40px] tabular-nums">
              <Counter to={742} duration={1.8} />
            </div>
            <div className="-mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-hint">Prime · approve</div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {sources.map((s, i) => (
            <motion.span
              key={s}
              className="inline-flex items-center gap-1.5 rounded-full bg-bg px-3 py-1 text-[12px] font-semibold text-ink2"
              animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -6] }}
              transition={{ duration: 5, times: [0, 0.1, 0.85, 1], delay: 0.2 + i * 0.25, ...LOOP }}
            >
              <Check className="size-3 text-accent" strokeWidth={3} /> {s}
            </motion.span>
          ))}
        </div>
        <motion.div
          className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[13px] font-bold text-white"
          animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.9, 0.9, 1, 1, 0.95] }}
          transition={{ duration: 5, times: [0, 0.4, 0.5, 0.85, 1], ...LOOP }}
        >
          <FileCheck2 className="size-4 text-[#c4b5fd]" /> Sanction ₹4,50,000
        </motion.div>
      </div>
    </Stage>
  )
}

/* M2 · Screen — a radar sweep over an applicant cluster; one node lights red. */
export function ScreenVisual() {
  const nodes = [
    [30, 28], [62, 22], [78, 46], [24, 62], [48, 50], [70, 74], [40, 80], [58, 66],
  ]
  const links = [[0, 4], [1, 2], [4, 7], [3, 6], [2, 7], [4, 1]]
  return (
    <Stage wash="bg-red-w">
      <div className="relative h-full overflow-hidden rounded-3xl bg-ink shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(224,67,92,0.18),transparent_60%)]" />
        {/* rings */}
        {[30, 55, 80].map((s) => (
          <div key={s} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" style={{ width: `${s}%`, aspectRatio: '1' }} />
        ))}
        {/* sweep */}
        <motion.div
          className="absolute left-1/2 top-1/2 size-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'conic-gradient(from 0deg, rgba(224,67,92,0.45), transparent 22%)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
        />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {links.map(([a, b], i) => (
            <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
          ))}
        </svg>
        {nodes.map(([x, y], i) => {
          const bad = i === 7
          return (
            <motion.span
              key={i}
              className={`absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${bad ? 'bg-red' : 'bg-[#c4b5fd]'}`}
              style={{ left: `${x}%`, top: `${y}%` }}
              animate={bad ? { boxShadow: ['0 0 0 0 rgba(224,67,92,0.7)', '0 0 0 14px rgba(224,67,92,0)'] } : { opacity: [0.5, 1, 0.5] }}
              transition={{ duration: bad ? 1.4 : 2.4, repeat: Infinity, delay: i * 0.2 }}
            />
          )
        })}
        <motion.div
          className="absolute rounded-xl bg-white px-3 py-2 text-[12px] font-semibold text-ink shadow-lg"
          style={{ left: '58%', top: '66%' }}
          animate={{ opacity: [0, 1, 1, 0], y: [6, -8, -8, -14] }}
          transition={{ duration: 4.5, times: [0, 0.15, 0.85, 1], ...LOOP }}
        >
          <span className="text-red">●</span> Shared device · 3 applicants
        </motion.div>
        <div className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/50">Fraud radar · live</div>
        <div className="absolute bottom-5 left-5 right-5 flex justify-between font-mono text-[11px] text-white/70">
          <span>Scanned <b className="text-white">2,418</b></span>
          <span>Flagged <b className="text-red">7</b></span>
        </div>
      </div>
    </Stage>
  )
}

/* M3 · Watch — a repayment-health line dips; the EWS marker fires on day 1. */
export function WatchVisual() {
  const d = 'M0 60 C 40 55, 70 50, 110 52 S 170 40, 200 46 S 250 62, 280 78 S 330 92, 360 96'
  return (
    <Stage wash="bg-amber-w">
      <div className="relative flex h-full flex-col rounded-3xl bg-white/85 p-6 shadow-md backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-hint">Deterioration index · Loan #48213</div>
          <span className="whitespace-nowrap rounded-full bg-amber-w px-2 py-0.5 font-mono text-[10px] text-amber">SMA-0</span>
        </div>
        <div className="relative mt-4 flex-1">
          <svg viewBox="0 0 360 120" className="h-full w-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="wg" x1="0" x2="1">
                <stop offset="0" stopColor="#5b3df5" />
                <stop offset="0.55" stopColor="#5b3df5" />
                <stop offset="1" stopColor="#e08700" />
              </linearGradient>
            </defs>
            {[30, 60, 90].map((y) => (
              <line key={y} x1="0" x2="360" y1={y} y2={y} stroke="var(--color-line)" strokeWidth="1" strokeDasharray="4 6" />
            ))}
            <motion.path
              d={d}
              fill="none"
              stroke="url(#wg)"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 1] }}
              transition={{ duration: 4.5, times: [0, 0.6, 1], ease: 'easeInOut', ...LOOP }}
            />
          </svg>
          {/* marker at the inflection */}
          <motion.div
            className="absolute"
            style={{ left: '55%', top: '38%' }}
            animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.6, 0.6, 1, 1, 0.8] }}
            transition={{ duration: 4.5, times: [0, 0.38, 0.45, 0.9, 1], ...LOOP }}
          >
            <span className="relative block size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber">
              <span className="absolute inset-0 animate-ping rounded-full bg-amber/60" />
            </span>
            <div className="absolute left-2 top-2 whitespace-nowrap rounded-xl bg-ink px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg">
              GST filings stopped · Day 1
            </div>
          </motion.div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[['AA', 'inflow −38%'], ['Bureau', '+2 enquiries'], ['Action', 'Call queued']].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-bg px-2 py-2">
              <div className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-hint">{k}</div>
              <div className="text-[12px] font-semibold">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  )
}

/* M4 · Recover — the dialler rings, contacts land, the bucket drains. */
export function RecoverVisual() {
  const r = 46
  const c = 2 * Math.PI * r
  return (
    <Stage wash="bg-blue-w">
      <div className="grid h-full grid-cols-[1fr_1.1fr] gap-4 rounded-3xl bg-white/85 p-6 shadow-md backdrop-blur">
        <div className="flex flex-col items-center justify-center">
          <div className="relative grid size-[120px] place-items-center">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute inset-0 rounded-full border-2 border-blue"
                initial={{ scale: 0.7, opacity: 0.8 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.7, ease: 'easeOut' }}
              />
            ))}
            <svg width="120" height="120" className="absolute -rotate-90">
              <circle cx="60" cy="60" r={r} fill="none" stroke="var(--color-line)" strokeWidth="8" />
              <motion.circle
                cx="60" cy="60" r={r} fill="none" stroke="var(--color-blue)" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={c}
                animate={{ strokeDashoffset: [c, c * 0.32, c * 0.32, c] }}
                transition={{ duration: 5, times: [0, 0.5, 0.9, 1], ease: EASE, ...LOOP }}
              />
            </svg>
            <span className="grid size-14 place-items-center rounded-full bg-blue text-white shadow-lg">
              <PhoneCall className="size-6" />
            </span>
          </div>
          <div className="mt-3 text-center">
            <div className="display text-[26px] text-blue">68%</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-hint">Right-party contact</div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2.5">
          {[
            ['0–30 DPD', 72, 'bg-blue'],
            ['31–60 DPD', 46, 'bg-accent3'],
            ['61–90 DPD', 22, 'bg-amber'],
            ['90+ DPD', 9, 'bg-red'],
          ].map(([k, v, cls], i) => (
            <div key={k as string}>
              <div className="mb-1 flex justify-between text-[11.5px]">
                <span className="font-medium">{k}</span>
                <span className="font-mono text-hint">₹ recovered</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-bg">
                <motion.div
                  className={`h-full rounded-full ${cls}`}
                  animate={{ width: ['0%', `${v}%`, `${v}%`, '0%'] }}
                  transition={{ duration: 5, times: [0, 0.5, 0.9, 1], delay: i * 0.12, ease: EASE, ...LOOP }}
                />
              </div>
            </div>
          ))}
          <motion.div
            className="mt-1 self-start rounded-full bg-ink px-3 py-1 font-mono text-[10px] text-white"
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ duration: 5, times: [0, 0.5, 0.6, 0.9, 1], ...LOOP }}
          >
            Sec 138 notice · auto-drafted
          </motion.div>
        </div>
      </div>
    </Stage>
  )
}

/* M5 · Insight — vintage curves draw, then the board pack slides in. */
export function InsightVisual() {
  const bars = [
    [40, 28], [52, 34], [58, 30], [66, 38], [72, 42], [80, 44], [88, 50], [96, 54],
  ]
  return (
    <Stage wash="bg-purple-w">
      <div className="relative h-full rounded-3xl bg-white/85 p-6 shadow-md backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-hint">Vintage · disbursal vs 30+ DPD</div>
          <div className="flex gap-3 font-mono text-[10px] text-hint">
            <span><i className="mr-1 inline-block size-2 rounded-sm bg-purple" />Book</span>
            <span><i className="mr-1 inline-block size-2 rounded-sm bg-accent3" />Peer</span>
          </div>
        </div>
        <div className="mt-5 flex h-[55%] items-end gap-2.5">
          {bars.map(([a, b], i) => (
            <div key={i} className="flex flex-1 items-end gap-0.5">
              <motion.div
                className="flex-1 rounded-t-md bg-purple"
                animate={{ height: ['0%', `${a}%`, `${a}%`, '0%'] }}
                transition={{ duration: 5, times: [0, 0.4, 0.9, 1], delay: i * 0.07, ease: EASE, ...LOOP }}
              />
              <motion.div
                className="flex-1 rounded-t-md bg-accent3/60"
                animate={{ height: ['0%', `${b}%`, `${b}%`, '0%'] }}
                transition={{ duration: 5, times: [0, 0.4, 0.9, 1], delay: 0.1 + i * 0.07, ease: EASE, ...LOOP }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[9.5px] text-hint">
          <span>Q1 FY25</span><span>Q4 FY26</span>
        </div>
        <motion.div
          className="absolute bottom-6 right-6 w-[58%] rounded-2xl bg-ink p-4 text-white shadow-lg"
          animate={{ opacity: [0, 0, 1, 1, 0], x: [30, 30, 0, 0, 20] }}
          transition={{ duration: 5, times: [0, 0.45, 0.55, 0.9, 1], ease: EASE, ...LOOP }}
        >
          <div className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-[#c4b5fd]">Board pack · auto-generated</div>
          <div className="mt-1 text-[14px] font-bold">Q4 portfolio review</div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            {[['NPA', '1.8%'], ['Roll 30→60', '11%'], ['LTV', '3.4×']].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-white/10 py-1.5">
                <div className="text-[13px] font-extrabold">{v}</div>
                <div className="font-mono text-[8.5px] text-white/50">{k}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Stage>
  )
}

/* M6 · Comply — the shield fills as checks tick past; the pack gets stamped. */
export function ComplyVisual() {
  const checks = ['MD-FRM · SCN window', 'DLD 2025 · KFS sent', 'DPDP · consent logged', 'KYC MD · CKYC match', 'NBS-9 · mapped', 'CRILC · filed']
  return (
    <Stage wash="bg-green-w">
      <div className="grid h-full grid-cols-[1fr_1.2fr] gap-5 rounded-3xl bg-white/85 p-6 shadow-md backdrop-blur">
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative size-[120px]">
            <ShieldCheck className="absolute inset-0 size-full text-line" strokeWidth={1.2} />
            <motion.div
              className="absolute inset-0 overflow-hidden"
              animate={{ clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)', 'inset(0% 0 0 0)', 'inset(100% 0 0 0)'] }}
              transition={{ duration: 5.5, times: [0, 0.55, 0.9, 1], ease: EASE, ...LOOP }}
            >
              <ShieldCheck className="size-full text-green" strokeWidth={1.2} />
            </motion.div>
          </div>
          <div className="display mt-2 text-[28px] text-green tabular-nums">
            <Counter to={600} suffix="+" duration={2} />
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-hint">checks · every loan</div>
          <motion.div
            className="absolute -bottom-1 rotate-[-8deg] rounded-md border-2 border-green px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-green"
            animate={{ opacity: [0, 0, 1, 1, 0], scale: [1.6, 1.6, 1, 1, 1] }}
            transition={{ duration: 5.5, times: [0, 0.6, 0.66, 0.9, 1], ...LOOP }}
          >
            Inspection ready
          </motion.div>
        </div>
        <ul className="flex flex-col justify-center gap-2">
          {checks.map((t, i) => (
            <motion.li
              key={t}
              className="flex items-center gap-2 text-[12.5px] font-medium text-ink2"
              animate={{ opacity: [0.25, 1, 1, 0.25], x: [-6, 0, 0, -6] }}
              transition={{ duration: 5.5, times: [0, 0.12, 0.9, 1], delay: i * 0.4, ...LOOP }}
            >
              <motion.span
                className="grid size-4 shrink-0 place-items-center rounded-full bg-green text-white"
                animate={{ scale: [0, 1, 1, 0] }}
                transition={{ duration: 5.5, times: [0, 0.12, 0.9, 1], delay: i * 0.4, ...LOOP }}
              >
                <Check className="size-2.5" strokeWidth={3.5} />
              </motion.span>
              {t}
            </motion.li>
          ))}
        </ul>
      </div>
    </Stage>
  )
}

export const VISUALS = [AppraisalVisual, ScreenVisual, WatchVisual, RecoverVisual, InsightVisual, ComplyVisual]
