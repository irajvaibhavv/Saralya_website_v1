import { useReducedMotion } from 'motion/react'

/* The agent drawn as one left-to-right flow, on an ink card so it reads as a
   piece of machinery rather than another white panel. Fixed viewBox: every
   wire is computed once from the node geometry, so the packets ride paths
   that never move and only the labels change.

   Palette note: the reference for this was Nugget's cyan-on-black. We use
   accent3 (lavender) on ink instead, because the one thing worse than no
   house style is two of them. */

export type Rail = { label: string; icon: keyof typeof ICONS }
export type Stage = { title: string; sub: string }
export type Metric = { label: string; value: string }

export const ICONS = {
  bureau: 'M3 20h18M5 20V8l7-4 7 4v12M10 20v-5h4v5',
  data: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6',
  doc: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h7M10 17h7',
  shield: 'M12 3l8 3v6c0 5-3.4 8.2-8 9.5C7.4 20.2 4 17 4 12V6zM9 12l2 2 4-4',
  core: 'M4 7h16v10H4zM8 11h8M8 14h5',
  voice: 'M12 3v18M8 7v10M16 7v10M4 10v4M20 10v4',
}

/* geometry */
const IN = { x: 46, w: 246, h: 56, ys: [96, 170, 244, 318, 392] }
const TRUNK = 350
const CORE = { x: 440, y: 230, w: 210, h: 200 }
const ST = { x: 742, w: 232, h: 74, ys: [176, 288, 400] }
const OUT = { x: 1066, y: 252, w: 232, h: 156 }
const MET = { x: 1366, w: 206, ys: [232, 330, 428] }
const CY = CORE.y + CORE.h / 2
const OY = OUT.y + OUT.h / 2

const curve = (ax: number, ay: number, bx: number, by: number) => {
  const dx = Math.max(50, (bx - ax) * 0.55)
  return `M ${ax} ${ay} C ${ax + dx} ${ay}, ${bx - dx} ${by}, ${bx} ${by}`
}
/* rails run straight out to a shared trunk, then curve into the core */
const feeder = (y: number) => `M ${IN.x + IN.w} ${y} L ${TRUNK} ${y} C ${TRUNK + 70} ${y}, ${CORE.x - 70} ${CY}, ${CORE.x} ${CY}`

function Card({
  x,
  y,
  w,
  h,
  title,
  sub,
  icon,
  lit,
}: {
  x: number
  y: number
  w: number
  h: number
  title: string
  sub?: string
  icon?: keyof typeof ICONS
  lit?: boolean
}) {
  const tx = icon ? x + 54 : x + 20
  return (
    <g className="group">
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={15}
        fill={lit ? 'url(#agentCore)' : 'rgba(255,255,255,0.05)'}
        stroke={lit ? 'var(--color-accent3)' : 'rgba(255,255,255,0.12)'}
        strokeWidth={lit ? 1.5 : 1}
        className="transition-all group-hover:fill-[rgba(255,255,255,0.09)] group-hover:stroke-[var(--color-accent3)]"
      />
      {icon && (
        <path
          d={ICONS[icon]}
          transform={`translate(${x + 18} ${y + h / 2 - 10}) scale(.85)`}
          fill="none"
          stroke="var(--color-accent3)"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      <text x={tx} y={sub ? y + h / 2 - 4 : y + h / 2 + 5} className="fill-white text-[15px] font-semibold">
        {title}
      </text>
      {sub && (
        <text x={tx} y={y + h / 2 + 16} className="fill-white/45 text-[12.5px]">
          {sub}
        </text>
      )}
    </g>
  )
}

function Cap({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} className="fill-accent3 font-mono text-[10.5px] uppercase tracking-[0.16em]">
      {children}
    </text>
  )
}

export function AgentFlow({ rails, stages, outcome, metrics }: { rails: Rail[]; stages: Stage[]; outcome: Stage; metrics: Metric[] }) {
  const reduce = useReducedMotion()

  const wires = [
    ...IN.ys.slice(0, rails.length).map((y) => feeder(y + IN.h / 2)),
    ...ST.ys.slice(0, stages.length).map((y) => curve(CORE.x + CORE.w, CY, ST.x, y + ST.h / 2)),
    ...ST.ys.slice(0, stages.length).map((y) => curve(ST.x + ST.w, y + ST.h / 2, OUT.x, OY)),
    curve(OUT.x + OUT.w, OY, MET.x - 28, OY),
  ]

  /* three stages sit at fixed heights; with fewer, centre them */
  const stageY = (i: number) => (stages.length === 3 ? ST.ys[i] : stages.length === 2 ? [ST.ys[0] + 56, ST.ys[2] - 56][i] : [ST.ys[1]][i])

  return (
    <svg viewBox="0 0 1600 512" className="block h-auto w-full min-w-[900px]" role="img" aria-label="How the agent moves data from your rails to a decision">
      <defs>
        <filter id="agentGlow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="agentSoft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="9" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="agentGrid" width="44" height="44" patternUnits="userSpaceOnUse">
          <path d="M44 0H0v44" fill="none" stroke="rgba(138,128,232,0.07)" strokeWidth="1" />
        </pattern>
        <linearGradient id="agentCore" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a2550" />
          <stop offset="1" stopColor="#191a2e" />
        </linearGradient>
      </defs>

      <rect width="1600" height="512" fill="url(#agentGrid)" />

      {/* wires */}
      {wires.map((d, i) => (
        <g key={d}>
          <path d={d} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={1.5} />
          {!reduce && (
            <>
              <path
                id={`agentWire${i}`}
                d={d}
                fill="none"
                stroke="var(--color-accent3)"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeDasharray="3 13"
                opacity={0.85}
                className="animate-wire"
                style={{ animationDelay: `${(i % 5) * -0.3}s` }}
              />
              <circle r={4} fill="var(--color-accent3)" filter="url(#agentGlow)">
                <animateMotion dur="2.8s" repeatCount="indefinite" begin={`${(i * 0.23) % 2.8}s`} path={d} />
              </circle>
            </>
          )}
          {reduce && <path d={d} fill="none" stroke="var(--color-accent3)" strokeWidth={1.5} opacity={0.4} />}
        </g>
      ))}

      {/* rails */}
      <Cap x={IN.x} y={IN.ys[0] - 22}>
        Your rails
      </Cap>
      {rails.map((r, i) => (
        <Card key={r.label} x={IN.x} y={IN.ys[i]} w={IN.w} h={IN.h} title={r.label} icon={r.icon} />
      ))}

      {/* the core */}
      <rect
        x={CORE.x}
        y={CORE.y}
        width={CORE.w}
        height={CORE.h}
        rx={26}
        fill="url(#agentCore)"
        stroke="var(--color-accent3)"
        strokeWidth={1.5}
        filter="url(#agentSoft)"
      />
      {Array.from({ length: 25 }).map((_, n) => {
        const r = Math.floor(n / 5)
        const c = n % 5
        const gx = (CORE.w - 76) / 4
        const gy = (CORE.h - 120) / 4
        const x = CORE.x + 38 + c * gx
        const y = CORE.y + 42 + r * gy
        return (
          <g key={n}>
            {c < 4 && <line x1={x} y1={y} x2={x + gx} y2={y} stroke="rgba(138,128,232,0.22)" strokeWidth={1} />}
            <circle cx={x} cy={y} r={3.2} fill="var(--color-accent3)" opacity={reduce ? 0.7 : undefined}>
              {!reduce && <animate attributeName="opacity" values=".25;1;.25" dur="2.6s" begin={`${(n % 9) * 0.26}s`} repeatCount="indefinite" />}
            </circle>
          </g>
        )
      })}
      <text x={CORE.x + CORE.w / 2} y={CORE.y + CORE.h - 26} textAnchor="middle" className="fill-accent3 font-mono text-[10.5px] uppercase tracking-[0.16em]">
        The agent
      </text>

      {/* what it runs */}
      <Cap x={ST.x} y={ST.ys[0] - 22}>
        What it runs
      </Cap>
      {stages.map((s, i) => (
        <Card key={s.title} x={ST.x} y={stageY(i)} w={ST.w} h={ST.h} title={s.title} sub={s.sub} />
      ))}

      {/* what comes back */}
      <Cap x={OUT.x} y={OUT.y - 22}>
        What comes back
      </Cap>
      <Card x={OUT.x} y={OUT.y} w={OUT.w} h={OUT.h} title={outcome.title} sub={outcome.sub} lit />

      {/* impact */}
      <Cap x={MET.x} y={MET.ys[0] - 34}>
        Impact
      </Cap>
      {metrics.map((m, i) => (
        <g key={m.label}>
          <line x1={MET.x} y1={MET.ys[i] - 18} x2={MET.x + MET.w} y2={MET.ys[i] - 18} stroke="rgba(255,255,255,0.1)" />
          <text x={MET.x} y={MET.ys[i] + 4} className="fill-white/55 text-[13px]">
            {m.label}
          </text>
          <text x={MET.x} y={MET.ys[i] + 34} className="fill-accent3 text-[26px] font-extrabold">
            {m.value}
          </text>
        </g>
      ))}
    </svg>
  )
}

/** The ink frame the diagram sits in, with its header bar and caption row. */
export function AgentFrame({ badge, children }: { badge: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-ink text-white ring-1 ring-accent3/20">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 md:px-7">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent3/10 px-3.5 py-2 font-mono text-label uppercase tracking-[0.14em] text-accent3 ring-1 ring-accent3/25">
          <span className="size-1.5 rounded-full bg-accent3 shadow-[0_0_10px_var(--color-accent3)]" />
          {badge}
        </span>
        <span className="font-mono text-label uppercase tracking-[0.14em] text-white/35">RBI-supervised by design</span>
      </div>

      <div className="overflow-x-auto px-3 py-4 md:px-4">{children}</div>

      <div className="grid gap-6 border-t border-white/10 p-6 md:grid-cols-4 md:p-7">
        {[
          ['Knows your book', 'Every rail, policy and past file you already hold — read-only, on your consent.'],
          ['Decides in the open', 'A reason code on every call, never a score with no explanation behind it.'],
          ['Cannot cross the line', 'The 21-day SCN clock, the KFS, DPDP consent and the calling window are limits in the system.'],
          ['Lands on your desk', 'Real work removed, counted in hours you can check against your own numbers.'],
        ].map(([t, d]) => (
          <div key={t}>
            <h4 className="text-body font-semibold text-accent3">{t}</h4>
            <p className="mt-1.5 text-small leading-relaxed text-white/45">{d}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
