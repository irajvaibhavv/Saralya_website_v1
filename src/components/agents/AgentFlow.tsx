import { useReducedMotion } from 'motion/react'

/* Sources → the agent → a loop of specialist steps → what comes out.

   The loop assembles itself: a marker runs the rim and each step appears as
   the marker reaches it, so the diagram is building rather than sitting
   there. The source tiles scroll behind a fade on the left. One CYCLE
   drives all of it, so nothing drifts out of step.

   Everything is placed off the geometry block below, so the layout survives
   whatever number of rails or steps it is handed. */

export type Rail = { label: string; icon: keyof typeof ICONS }
export type Stage = { title: string; sub: string; icon?: keyof typeof ICONS }
export type Metric = { label: string; value: string }

export const ICONS = {
  bureau: 'M3 20h18M5 20V8l7-4 7 4v12M10 20v-5h4v5',
  data: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6',
  doc: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h7M10 17h7',
  shield: 'M12 3l8 3v6c0 5-3.4 8.2-8 9.5C7.4 20.2 4 17 4 12V6zM9 12l2 2 4-4',
  core: 'M4 7h16v10H4zM8 11h8M8 14h5',
  voice: 'M12 3v18M8 7v10M16 7v10M4 10v4M20 10v4',
  chart: 'M21 12a9 9 0 1 1-9-9v9zM21 8a9 9 0 0 0-5-5',
  lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
  bell: 'M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6M10 21h4',
  pen: 'M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z',
  split: 'M4 6h5l6 12h5M20 6h-5M17 3l3 3-3 3M17 15l3 3-3 3',
}

const W = 1240
const H = 412
const TILE = { x: 36, size: 48, gap: 14, step: 58 }
const BOX = { x: 250, y: 68, w: 158, h: 290, r: 38 }
const LOOP = { cx: 762, cy: 213, rx: 214, ry: 114 }
const NODE_R = 26
const MET = { x: 1048, ys: [124, 216, 308] }
const CYCLE = 5.4

/** the rim lap occupies this slice of the cycle */
const LAP: [number, number] = [0.2, 0.86]

const rad = (d: number) => (d * Math.PI) / 180
const onLoop = (deg: number) => ({ x: LOOP.cx + LOOP.rx * Math.cos(rad(deg)), y: LOOP.cy + LOOP.ry * Math.sin(rad(deg)) })
const f = (n: number) => Math.min(0.999, Math.max(0.001, n)).toFixed(3)

/* entry on the left, over the top, out at the right, back underneath */
const RIM_DEGS = [180, 270, 0, 90]

const line = (x1: number, x2: number, y: number) => `M ${x1} ${y} L ${x2} ${y}`

function Packet({ d, from, to }: { d: string; from: number; to: number }) {
  return (
    <circle r={5} fill="var(--color-accent)" filter="url(#agGlow)" opacity={0}>
      <animateMotion dur={`${CYCLE}s`} repeatCount="indefinite" path={d} calcMode="linear" keyPoints="0;0;1;1" keyTimes={`0;${f(from)};${f(to)};1`} />
      <animate
        attributeName="opacity"
        dur={`${CYCLE}s`}
        repeatCount="indefinite"
        calcMode="linear"
        values="0;0;1;1;0;0"
        keyTimes={`0;${f(from)};${f(from + 0.01)};${f(to - 0.01)};${f(to)};1`}
      />
    </circle>
  )
}

function Link({ d, from, to, reduce, head }: { d: string; from: number; to: number; reduce: boolean | null; head: [number, number] }) {
  return (
    <>
      <path d={d} fill="none" stroke="var(--color-line2)" strokeWidth={1.5} strokeDasharray="5 6" />
      <path d={`M ${head[0] - 8} ${head[1] - 5} L ${head[0]} ${head[1]} L ${head[0] - 8} ${head[1] + 5}`} fill="none" stroke="var(--color-line2)" strokeWidth={1.5} />
      {!reduce && <Packet d={d} from={from} to={to} />}
    </>
  )
}

function Glyph({ icon, x, y, scale = 1 }: { icon: keyof typeof ICONS; x: number; y: number; scale?: number }) {
  return (
    <path
      d={ICONS[icon]}
      transform={`translate(${x - 12 * scale} ${y - 12 * scale}) scale(${scale})`}
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )
}

export function AgentFlow({
  rails,
  stages,
  outcome,
  metrics,
  loopLabel = 'Credit decision',
}: {
  rails: Rail[]
  stages: Stage[]
  outcome: Stage
  metrics: Metric[]
  loopLabel?: string
}) {
  const reduce = useReducedMotion()
  const shown = stages.slice(0, 4)
  const degs = RIM_DEGS.slice(0, Math.max(shown.length, 1))

  const rim = `M ${LOOP.cx - LOOP.rx} ${LOOP.cy} A ${LOOP.rx} ${LOOP.ry} 0 1 1 ${LOOP.cx + LOOP.rx} ${LOOP.cy} A ${LOOP.rx} ${LOOP.ry} 0 1 1 ${LOOP.cx - LOOP.rx} ${LOOP.cy}`

  /* the tile column scrolls exactly one set, then repeats seamlessly */
  const tiles = rails.slice(0, 6)
  const half = (tiles.length * TILE.step) / 2
  const topY = LOOP.cy - 132

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full min-w-[980px]" role="img" aria-label="Your rails feed the agent, the work runs as a loop, a decision comes out">
      <defs>
        <filter id="agGlow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="agSoft" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#107a66" floodOpacity="0.22" />
        </filter>
        <linearGradient id="agBox" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#eef5f2" />
        </linearGradient>
        {/* the tiles dissolve at both ends of their run */}
        <linearGradient id="agFadeG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.2" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.8" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="agFade">
          <rect x={TILE.x - 12} y={topY} width={TILE.size * 2 + TILE.gap + 24} height={266} fill="url(#agFadeG)" />
        </mask>
      </defs>

      {/* 1 — the rails, scrolling */}
      <text x={TILE.x} y={48} className="fill-hint font-mono text-[10.5px] uppercase tracking-[0.16em]">
        Your rails
      </text>
      <g mask="url(#agFade)">
        <g>
          {!reduce && <animateTransform attributeName="transform" type="translate" from="0 0" to={`0 -${half}`} dur="18s" repeatCount="indefinite" />}
          {[...tiles, ...tiles].map((r, i) => {
            const col = i % 2
            const x = TILE.x + col * (TILE.size + TILE.gap)
            const y = topY + 10 + i * (TILE.step / 2) + (col ? 12 : 0)
            return (
              <g key={r.label + i}>
                <rect x={x} y={y} width={TILE.size} height={TILE.size} rx={15} fill="#ffffff" stroke="var(--color-line)" />
                <Glyph icon={r.icon} x={x + TILE.size / 2} y={y + TILE.size / 2} />
                <title>{r.label}</title>
              </g>
            )
          })}
        </g>
      </g>

      <Link d={line(TILE.x + TILE.size * 2 + TILE.gap + 18, BOX.x - 14, LOOP.cy)} from={0.02} to={0.14} reduce={reduce} head={[BOX.x - 14, LOOP.cy]} />

      {/* 2 — the agent: a lattice, quietly working */}
      <rect x={BOX.x} y={BOX.y} width={BOX.w} height={BOX.h} rx={BOX.r} fill="url(#agBox)" stroke="var(--color-accent)" strokeWidth={1.5} filter="url(#agSoft)" />
      {Array.from({ length: 8 }).map((_, row) => {
        const y = BOX.y + 36 + row * 32
        const left = BOX.x + 42
        const right = BOX.x + BOX.w - 42
        const mid = BOX.x + BOX.w / 2
        return (
          <g key={row}>
            {row < 7 && (
              <>
                <line x1={left} y1={y} x2={mid} y2={y + 32} stroke="var(--color-accent)" strokeWidth={1} opacity={0.26} />
                <line x1={right} y1={y} x2={mid} y2={y + 32} stroke="var(--color-accent)" strokeWidth={1} opacity={0.26} />
                <line x1={mid} y1={y + 32} x2={left} y2={y + 64} stroke="var(--color-accent)" strokeWidth={1} opacity={0.26} />
                <line x1={mid} y1={y + 32} x2={right} y2={y + 64} stroke="var(--color-accent)" strokeWidth={1} opacity={0.26} />
              </>
            )}
            {[left, right].map((cx) => (
              <circle key={cx} cx={cx} cy={y} r={3.4} fill="var(--color-accent)" opacity={reduce ? 0.8 : undefined}>
                {!reduce && <animate attributeName="opacity" values=".3;1;.3" dur="2.4s" begin={`${row * 0.25}s`} repeatCount="indefinite" />}
              </circle>
            ))}
            {row < 7 && (
              <circle cx={mid} cy={y + 32} r={3.4} fill="var(--color-accent3)" opacity={reduce ? 0.8 : undefined}>
                {!reduce && <animate attributeName="opacity" values=".3;1;.3" dur="2.4s" begin={`${row * 0.25 + 0.12}s`} repeatCount="indefinite" />}
              </circle>
            )}
          </g>
        )
      })}
      <text x={BOX.x + BOX.w / 2} y={BOX.y + BOX.h - 22} textAnchor="middle" className="fill-muted font-mono text-[11px] tracking-[0.04em]">
        Reading…
      </text>

      <Link d={line(BOX.x + BOX.w + 14, LOOP.cx - LOOP.rx - NODE_R - 12, LOOP.cy)} from={0.15} to={0.25} reduce={reduce} head={[LOOP.cx - LOOP.rx - NODE_R - 12, LOOP.cy]} />

      {/* 3 — the flywheel, assembling itself */}
      <text x={LOOP.cx} y={LOOP.cy - LOOP.ry - 62} textAnchor="middle" className="fill-hint font-mono text-[10.5px] uppercase tracking-[0.16em]">
        The loop
      </text>
      <ellipse cx={LOOP.cx} cy={LOOP.cy} rx={LOOP.rx} ry={LOOP.ry} fill="none" stroke="var(--color-line2)" strokeWidth={1.5} strokeDasharray="5 7" />
      {!reduce && (
        <circle r={5.5} fill="var(--color-accent)" filter="url(#agGlow)">
          <animateMotion dur={`${CYCLE}s`} repeatCount="indefinite" path={rim} calcMode="linear" keyPoints="0;0;1;1" keyTimes={`0;${f(LAP[0])};${f(LAP[1])};1`} />
          <animate
            attributeName="opacity"
            dur={`${CYCLE}s`}
            repeatCount="indefinite"
            calcMode="linear"
            values="0;0;1;1;0;0"
            keyTimes={`0;${f(LAP[0])};${f(LAP[0] + 0.01)};${f(LAP[1] - 0.01)};${f(LAP[1])};1`}
          />
        </circle>
      )}
      <text x={LOOP.cx} y={LOOP.cy + 5} textAnchor="middle" className="fill-muted text-[15px]">
        {loopLabel}
      </text>

      {degs.map((deg, i) => {
        const p = onLoop(deg)
        const above = deg === 270
        /* lands exactly as the marker reaches it */
        const hit = LAP[0] + ((LAP[1] - LAP[0]) * i) / degs.length
        const out = 0.965
        const s = shown[i]
        return (
          <g key={s.title} className="group">
            {/* the arrival: a ring thrown off as the step lands */}
            {!reduce && (
              <circle cx={p.x} cy={p.y} r={NODE_R} fill="none" stroke="var(--color-accent)" strokeWidth={2} opacity={0}>
                <animate
                  attributeName="r"
                  dur={`${CYCLE}s`}
                  repeatCount="indefinite"
                  calcMode="linear"
                  values={`${NODE_R};${NODE_R};${NODE_R + 30};${NODE_R + 30}`}
                  keyTimes={`0;${f(hit)};${f(hit + 0.06)};1`}
                />
                <animate
                  attributeName="opacity"
                  dur={`${CYCLE}s`}
                  repeatCount="indefinite"
                  calcMode="linear"
                  values="0;0;0.75;0;0"
                  keyTimes={`0;${f(hit)};${f(hit + 0.014)};${f(hit + 0.06)};1`}
                />
              </circle>
            )}

            {/* the disc itself, overshooting as it pops in */}
            <g transform={`translate(${p.x} ${p.y})`}>
              <g opacity={reduce ? 1 : 0}>
                {!reduce && (
                  <>
                    <animate
                      attributeName="opacity"
                      dur={`${CYCLE}s`}
                      repeatCount="indefinite"
                      calcMode="linear"
                      values="0;0;1;1;0"
                      keyTimes={`0;${f(hit)};${f(hit + 0.02)};${f(out)};1`}
                    />
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      dur={`${CYCLE}s`}
                      repeatCount="indefinite"
                      calcMode="linear"
                      values="0.3;0.3;1.28;0.93;1;1;0.3"
                      keyTimes={`0;${f(hit)};${f(hit + 0.028)};${f(hit + 0.05)};${f(hit + 0.072)};${f(out)};1`}
                    />
                  </>
                )}
                <circle r={NODE_R} fill="#ffffff" stroke="var(--color-accent)" strokeWidth={1.5} className="transition-all group-hover:fill-[var(--color-wash)]" />
                {s.icon ? <Glyph icon={s.icon} x={0} y={0} scale={0.92} /> : <circle r={6} fill="var(--color-accent)" />}
              </g>
            </g>

            {/* the name follows a beat later, rising into place */}
            <g opacity={reduce ? 1 : 0}>
              {!reduce && (
                <>
                  <animate
                    attributeName="opacity"
                    dur={`${CYCLE}s`}
                    repeatCount="indefinite"
                    calcMode="linear"
                    values="0;0;1;1;0"
                    keyTimes={`0;${f(hit + 0.024)};${f(hit + 0.058)};${f(out)};1`}
                  />
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    dur={`${CYCLE}s`}
                    repeatCount="indefinite"
                    calcMode="linear"
                    values={`0 ${above ? -8 : 8};0 ${above ? -8 : 8};0 0;0 0`}
                    keyTimes={`0;${f(hit + 0.024)};${f(hit + 0.058)};1`}
                  />
                </>
              )}
              <text x={p.x} y={above ? p.y - NODE_R - 14 : p.y + NODE_R + 24} textAnchor="middle" className="fill-ink text-[15px] font-semibold">
                {s.title}
              </text>
            </g>
          </g>
        )
      })}

      <Link d={line(LOOP.cx + LOOP.rx + NODE_R + 12, MET.x - 40, LOOP.cy)} from={0.9} to={0.97} reduce={reduce} head={[MET.x - 40, LOOP.cy]} />

      {/* 4 — what comes out */}
      <text x={MET.x} y={48} className="fill-hint font-mono text-[10.5px] uppercase tracking-[0.16em]">
        Outcomes
      </text>
      <line x1={MET.x} y1={70} x2={W - 28} y2={70} stroke="var(--color-line)" />
      <text x={MET.x} y={96} className="fill-ink text-[15px] font-semibold">
        {outcome.title}
      </text>
      {metrics.slice(0, 3).map((m, i) => (
        <g key={m.label}>
          <text x={MET.x} y={MET.ys[i]} className="fill-muted text-[13px]">
            {m.label}
          </text>
          <text x={MET.x} y={MET.ys[i] + 32} className="fill-accent text-[28px] font-bold">
            {m.value}
          </text>
        </g>
      ))}
    </svg>
  )
}

/** The frame the diagram sits in, with its header bar and caption row. */
export function AgentFrame({ badge, children }: { badge: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-bg ring-1 ring-line">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-white px-5 py-4 md:px-7">
        <span className="inline-flex items-center gap-2 rounded-full bg-wash px-3.5 py-2 font-mono text-label uppercase tracking-[0.14em] text-accent">
          <span className="size-1.5 rounded-full bg-accent" />
          {badge}
        </span>
        <span className="font-mono text-label uppercase tracking-[0.14em] text-hint">RBI-supervised by design</span>
      </div>

      <div className="overflow-x-auto p-4 md:p-6">{children}</div>

      <div className="grid gap-6 border-t border-line bg-white p-6 md:grid-cols-4 md:p-7">
        {[
          ['Knows your book', 'Every rail you already hold, read-only.'],
          ['Decides in the open', 'A reason code on every call.'],
          ['Cannot cross the line', 'SCN clock, KFS, DPDP, calling window.'],
          ['Lands on your desk', 'Hours removed, in numbers you can check.'],
        ].map(([t, d]) => (
          <div key={t}>
            <h4 className="text-body font-semibold text-accent">{t}</h4>
            <p className="mt-1.5 text-small leading-relaxed text-muted">{d}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
