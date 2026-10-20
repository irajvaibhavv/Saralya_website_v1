import { motion, useReducedMotion } from 'motion/react'

/* Sources → the agent → a loop of specialist steps → what comes out.

   Nothing in here sits still. The rails feed the engine along curved
   streams, the engine's net pulses and carries light along its edges, dots
   run the rim, and each step on the loop lights as the marker reaches it.
   One CYCLE drives the loop so the lighting never drifts out of step with
   the marker.

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
  bars: 'M5 20V11M12 20V4M19 20V8',
  lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
  bell: 'M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6M10 21h4',
  pen: 'M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z',
  split: 'M4 6h5l6 12h5M20 6h-5M17 3l3 3-3 3M17 15l3 3-3 3',
}

const W = 1240
const H = 440
const TILE = { x: 44, size: 52, gap: 14, rowGap: 30, cols: 2 }
const BOX = { x: 310, y: 72, w: 172, h: 300, r: 42 }
const LOOP = { cx: 770, cy: 222, rx: 172, ry: 112 }
const NODE_R = 30
const HUB_R = 74
const MET = { x: 1042, ys: [130, 224, 318] }
const CYCLE = 5.4

const rad = (d: number) => (d * Math.PI) / 180
const onLoop = (deg: number) => ({ x: LOOP.cx + LOOP.rx * Math.cos(rad(deg)), y: LOOP.cy + LOOP.ry * Math.sin(rad(deg)) })
const f = (n: number) => Math.min(0.999, Math.max(0.001, n)).toFixed(3)

/* entry on the left, over the top, out at the right, back underneath */
const RIM_DEGS = [180, 270, 0, 90]

/** the rim runs clockwise; this is the heading of travel at a given degree */
const heading = (deg: number) =>
  (Math.atan2(LOOP.ry * Math.cos(rad(deg)), -LOOP.rx * Math.sin(rad(deg))) * 180) / Math.PI

/** a blip centred on `hit` of the cycle, wrapping cleanly at the seam */
function pulse(hit: number, w: number, lo: number, hi: number) {
  const a = hit - w
  const b = hit + w
  if (a < 0) return { values: `${hi};${lo};${lo};${hi}`, keyTimes: `0;${f(b)};${f(1 + a)};1` }
  if (b > 1) return { values: `${hi};${lo};${lo};${hi}`, keyTimes: `0;${f(b - 1)};${f(a)};1` }
  return { values: `${lo};${lo};${hi};${lo};${lo}`, keyTimes: `0;${f(a)};${f(hit)};${f(b)};1` }
}

const line = (x1: number, x2: number, y: number) => `M ${x1} ${y} L ${x2} ${y}`

/* the engine's net: three loose layers of cells, in box-relative space */
const NET_NODES: [number, number, number][] = [
  [0.24, 0.17, 6.5],
  [0.24, 0.39, 10],
  [0.24, 0.62, 9],
  [0.24, 0.83, 6.5],
  [0.5, 0.27, 8.5],
  [0.5, 0.51, 12],
  [0.5, 0.74, 7.5],
  [0.76, 0.16, 7.5],
  [0.76, 0.37, 10.5],
  [0.76, 0.59, 8.5],
  [0.76, 0.81, 9.5],
]
const NET_EDGES: [number, number][] = [
  [0, 4], [1, 4], [1, 5], [2, 5], [2, 6], [3, 6], [1, 6], [0, 5],
  [4, 7], [4, 8], [5, 8], [5, 9], [6, 9], [6, 10], [5, 7], [4, 10],
]
/* the net is stretched to the card's own edges, so it fills the panel
   rather than floating in the middle of it */
const SPAN = (k: 0 | 1) => {
  const vs = NET_NODES.map((n) => n[k])
  return [Math.min(...vs), Math.max(...vs)] as const
}
const [NX0, NX1] = SPAN(0)
const [NY0, NY1] = SPAN(1)
const PAD = { x: 24, top: 28, bottom: 76 }
const net = (i: number) => ({
  x: BOX.x + PAD.x + ((NET_NODES[i][0] - NX0) / (NX1 - NX0)) * (BOX.w - PAD.x * 2),
  y: BOX.y + PAD.top + ((NET_NODES[i][1] - NY0) / (NY1 - NY0)) * (BOX.h - PAD.top - PAD.bottom),
  r: NET_NODES[i][2] * 1.12,
})

/** dashes that run along a path, so every connector is always moving */
function Flow({ d, dur = 0.9, dim = false }: { d: string; dur?: number; dim?: boolean }) {
  return (
    <path d={d} fill="none" stroke="var(--color-accent)" strokeWidth={dim ? 1.6 : 2} strokeLinecap="round" strokeDasharray="2 13" opacity={dim ? 0.45 : 0.75}>
      <animate attributeName="stroke-dashoffset" from="15" to="0" dur={`${dur}s`} repeatCount="indefinite" />
    </path>
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
  compact = false,
}: {
  rails: Rail[]
  stages: Stage[]
  outcome: Stage
  metrics: Metric[]
  loopLabel?: string
  /** beside a column of copy there is no room for the metrics panel, and
      the rest has to fit without a scrollbar: drop it and crop the frame */
  compact?: boolean
}) {
  const reduce = useReducedMotion()
  const shown = stages.slice(0, 4)
  const degs = RIM_DEGS.slice(0, Math.max(shown.length, 1))

  const rim = `M ${LOOP.cx - LOOP.rx} ${LOOP.cy} A ${LOOP.rx} ${LOOP.ry} 0 1 1 ${LOOP.cx + LOOP.rx} ${LOOP.cy} A ${LOOP.rx} ${LOOP.ry} 0 1 1 ${LOOP.cx - LOOP.rx} ${LOOP.cy}`

  const tiles = rails.slice(0, 6)
  const rows = Math.ceil(tiles.length / TILE.cols)
  const gridH = rows * TILE.size + (rows - 1) * TILE.rowGap
  const gridY = LOOP.cy - gridH / 2
  const tileAt = (i: number) => ({
    x: TILE.x + (i % TILE.cols) * (TILE.size + TILE.gap),
    y: gridY + Math.floor(i / TILE.cols) * (TILE.size + TILE.rowGap),
  })
  const mouth = { x: BOX.x - 6, y: BOX.y + BOX.h / 2 }

  return (
    <svg
      viewBox={`0 0 ${compact ? MET.x + 20 : W} ${H}`}
      className={`block h-auto w-full ${compact ? '' : 'min-w-[980px]'}`}
      role="img" aria-label="Your rails feed the agent, the work runs as a loop, a decision comes out">
      <defs>
        <filter id="agGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="agSoft" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="10" stdDeviation="16" floodColor="#107a66" floodOpacity="0.18" />
        </filter>
        <radialGradient id="agAmbient">
          <stop offset="0" stopColor="#4cc3a5" stopOpacity="0.45" />
          <stop offset="1" stopColor="#4cc3a5" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="agHub">
          <stop offset="0" stopColor="#4cc3a5" stopOpacity="0.22" />
          <stop offset="0.72" stopColor="#4cc3a5" stopOpacity="0.1" />
          <stop offset="1" stopColor="#4cc3a5" stopOpacity="0.02" />
        </radialGradient>
        {/* the cells read as spheres: lit top-left, deep at the base */}
        <radialGradient id="agCellDeep" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#35b296" />
          <stop offset="1" stopColor="#0b5f4f" />
        </radialGradient>
        <radialGradient id="agCellLite" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#8fdcc6" />
        </radialGradient>
        <linearGradient id="agBox" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f3faf7" />
        </linearGradient>
      </defs>

      {/* 1 — the rails, each streaming into the engine */}
      <text x={TILE.x} y={48} className="fill-hint font-mono text-[10.5px] uppercase tracking-[0.16em]">
        Your rails
      </text>
      {tiles.map((r, i) => {
        const t = tileAt(i)
        const from = { x: t.x + TILE.size, y: t.y + TILE.size / 2 }
        const d = `M ${from.x} ${from.y} C ${from.x + 70} ${from.y}, ${mouth.x - 90} ${mouth.y}, ${mouth.x} ${mouth.y}`
        return (
          <g key={r.label + i}>
            {!reduce && <Flow d={d} dur={1.6 + (i % 3) * 0.25} dim />}
            <rect x={t.x} y={t.y} width={TILE.size} height={TILE.size} rx={16} fill="#ffffff" stroke="var(--color-line)" />
            <Glyph icon={r.icon} x={t.x + TILE.size / 2} y={t.y + TILE.size / 2} />
            <title>{r.label}</title>
          </g>
        )
      })}

      {/* 2 — the agent: a net, quietly working */}
      <ellipse cx={BOX.x + BOX.w / 2} cy={BOX.y + BOX.h / 2} rx={BOX.w * 1.05} ry={BOX.h * 0.62} fill="url(#agAmbient)">
        {!reduce && <animate attributeName="opacity" values="0.35;0.7;0.35" dur="6s" repeatCount="indefinite" />}
      </ellipse>
      <rect x={BOX.x} y={BOX.y} width={BOX.w} height={BOX.h} rx={BOX.r} fill="url(#agBox)" stroke="var(--color-accent)" strokeWidth={1.5} filter="url(#agSoft)" />

      {NET_EDGES.map(([a, b], i) => {
        const p = net(a)
        const q = net(b)
        const d = `M ${p.x} ${p.y} L ${q.x} ${q.y}`
        return (
          <g key={`e${i}`}>
            <path d={d} stroke="var(--color-accent)" strokeWidth={1} opacity={0.22} />
            {!reduce && (
              <circle r={2} fill="var(--color-accent3)">
                <animateMotion dur="2.6s" begin={`${(i % 8) * 0.33}s`} repeatCount="indefinite" path={d} />
                <animate attributeName="opacity" values="0;1;1;0" dur="2.6s" begin={`${(i % 8) * 0.33}s`} repeatCount="indefinite" />
              </circle>
            )}
          </g>
        )
      })}
      {NET_NODES.map((_, i) => {
        const p = net(i)
        return (
          <circle key={`n${i}`} cx={p.x} cy={p.y} r={p.r} fill={i % 3 === 1 ? 'url(#agCellLite)' : 'url(#agCellDeep)'}>
            {!reduce && <animate attributeName="r" values={`${p.r};${p.r * 1.18};${p.r}`} dur="2.8s" begin={`${i * 0.21}s`} repeatCount="indefinite" />}
            {!reduce && <animate attributeName="opacity" values="0.72;1;0.72" dur="2.8s" begin={`${i * 0.21}s`} repeatCount="indefinite" />}
          </circle>
        )
      })}

      <text x={BOX.x + BOX.w / 2} y={BOX.y + BOX.h - 46} textAnchor="middle" className="fill-muted font-mono text-[11px] tracking-[0.04em]">
        Reading…
      </text>
      <rect x={BOX.x + 36} y={BOX.y + BOX.h - 34} width={BOX.w - 72} height={6} rx={3} fill="var(--color-line)" />
      <rect x={BOX.x + 36} y={BOX.y + BOX.h - 34} width={BOX.w - 72} height={6} rx={3} fill="var(--color-accent)">
        {!reduce && <animate attributeName="width" values={`0;${BOX.w - 72};${BOX.w - 72}`} keyTimes="0;0.82;1" dur={`${CYCLE}s`} repeatCount="indefinite" />}
      </rect>

      {!reduce && <Flow d={line(BOX.x + BOX.w + 10, LOOP.cx - LOOP.rx - NODE_R - 14, LOOP.cy)} />}
      <path
        d={`M ${LOOP.cx - LOOP.rx - NODE_R - 22} ${LOOP.cy - 5} L ${LOOP.cx - LOOP.rx - NODE_R - 14} ${LOOP.cy} L ${LOOP.cx - LOOP.rx - NODE_R - 22} ${LOOP.cy + 5}`}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={1.6}
        strokeLinecap="round"
      />

      {/* 3 — the loop: dots run the rim, each step lights as they pass */}
      <circle cx={LOOP.cx} cy={LOOP.cy} r={HUB_R} fill="url(#agHub)">
        {!reduce && <animate attributeName="r" values={`${HUB_R};${HUB_R + 7};${HUB_R}`} dur="4.2s" repeatCount="indefinite" />}
      </circle>
      <Glyph icon="bars" x={LOOP.cx} y={LOOP.cy - 20} scale={1.1} />
      <text x={LOOP.cx} y={LOOP.cy + 22} textAnchor="middle" className="fill-ink2 text-[15px]">
        {loopLabel}
      </text>

      <path d={rim} fill="none" stroke="var(--color-line2)" strokeWidth={1.5} strokeDasharray="5 7" />
      {!reduce && (
        <>
          <path d={rim} fill="none" stroke="var(--color-accent)" strokeWidth={2.4} strokeLinecap="round" strokeDasharray="2 20" opacity={0.65}>
            <animate attributeName="stroke-dashoffset" from="22" to="0" dur="1.1s" repeatCount="indefinite" />
          </path>
          <circle r={5.5} fill="var(--color-accent)" filter="url(#agGlow)">
            <animateMotion dur={`${CYCLE}s`} repeatCount="indefinite" path={rim} calcMode="linear" />
          </circle>
        </>
      )}

      {degs.map((deg, i) => {
        const at = deg + (360 / degs.length) * 0.5
        const p = onLoop(at)
        return (
          <path
            key={`arrow-${i}`}
            d="M -7 -5 L 0 0 L -7 5"
            transform={`translate(${p.x} ${p.y}) rotate(${heading(at)})`}
            fill="none"
            stroke="var(--color-line2)"
            strokeWidth={1.6}
            strokeLinecap="round"
          />
        )
      })}

      {degs.map((deg, i) => {
        const p = onLoop(deg)
        const above = deg === 270
        /* the marker passes here at this point of the cycle */
        const hit = i / degs.length
        const s = shown[i]
        const halo = pulse(hit, 0.055, 0, 0.55)
        const wash = pulse(hit, 0.055, 0, 1)
        const grow = pulse(hit, 0.055, 1, 1.14)
        return (
          <g key={s.title} className="group">
            {!reduce && (
              <circle cx={p.x} cy={p.y} r={NODE_R + 9} fill="none" stroke="var(--color-accent)" strokeWidth={2} opacity={0}>
                <animate attributeName="opacity" dur={`${CYCLE}s`} repeatCount="indefinite" calcMode="linear" {...halo} />
              </circle>
            )}

            <g transform={`translate(${p.x} ${p.y})`}>
              <g>
                {!reduce && (
                  <animateTransform attributeName="transform" type="scale" dur={`${CYCLE}s`} repeatCount="indefinite" calcMode="linear" {...grow} />
                )}
                <circle r={NODE_R + 7} fill="none" stroke="var(--color-accent)" strokeWidth={1.5} opacity={0} className="transition-opacity group-hover:opacity-40" />
                <circle r={NODE_R} fill="#ffffff" stroke="var(--color-accent)" strokeWidth={1.5} className="transition-all group-hover:fill-[var(--color-wash)]" />
                {!reduce && (
                  <circle r={NODE_R} fill="var(--color-wash)" opacity={0}>
                    <animate attributeName="opacity" dur={`${CYCLE}s`} repeatCount="indefinite" calcMode="linear" {...wash} />
                  </circle>
                )}
                {s.icon ? <Glyph icon={s.icon} x={0} y={0} scale={0.95} /> : <circle r={6} fill="var(--color-accent)" />}
              </g>
            </g>

            <text x={p.x} y={above ? p.y - NODE_R - 16 : p.y + NODE_R + 26} textAnchor="middle" className="fill-ink text-[15px] font-semibold">
              {s.title}
            </text>
            <text
              x={p.x}
              y={above ? p.y - NODE_R - 34 : p.y + NODE_R + 44}
              textAnchor="middle"
              opacity={0}
              className="fill-muted text-[12px] transition-opacity group-hover:opacity-100"
            >
              {s.sub}
            </text>
          </g>
        )
      })}

      {!compact && (
        <>
          {!reduce && <Flow d={line(LOOP.cx + LOOP.rx + NODE_R + 14, MET.x - 42, LOOP.cy)} />}
          <path
            d={`M ${MET.x - 50} ${LOOP.cy - 5} L ${MET.x - 42} ${LOOP.cy} L ${MET.x - 50} ${LOOP.cy + 5}`}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={1.6}
            strokeLinecap="round"
          />
        </>
      )}

      {/* 4 — what comes out. Beside a column of copy only the call itself
          fits, so the metrics panel stands down and the call rides the
          arrow out of the loop. */}
      {!compact && (
        <>
      <text x={MET.x} y={48} className="fill-hint font-mono text-[10.5px] uppercase tracking-[0.16em]">
        Outcomes
      </text>
      <line x1={MET.x} y1={70} x2={W - 28} y2={70} stroke="var(--color-line)" />
      <text x={MET.x} y={98} className="fill-ink text-[15px] font-semibold">
        {outcome.title}
      </text>
      {metrics.slice(0, 3).map((m, i) => (
        <motion.g
          key={m.label}
          initial={reduce ? undefined : { opacity: 0, y: 12 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.3 + i * 0.12 }}
        >
          <line x1={MET.x} y1={MET.ys[i] - 22} x2={W - 28} y2={MET.ys[i] - 22} stroke="var(--color-line)" />
          <text x={MET.x} y={MET.ys[i]} className="fill-muted text-[13px]">
            {m.label}
          </text>
          <text x={MET.x} y={MET.ys[i] + 32} className="fill-accent text-[28px] font-bold">
            {m.value}
          </text>
        </motion.g>
      ))}
        </>
      )}
    </svg>
  )
}

/** The frame the diagram sits in, with its header bar and caption row. */
export function AgentFrame({ badge, out, children }: { badge: string; out?: Stage; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-bg ring-1 ring-line">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-white px-5 py-4 md:px-7">
        <span className="inline-flex items-center gap-2 rounded-full bg-wash px-3.5 py-2 font-mono text-label uppercase tracking-[0.14em] text-accent">
          <span className="size-1.5 rounded-full bg-accent" />
          {badge}
        </span>
        {out ? (
          <span className="flex min-w-0 items-center gap-2.5">
            <span className="shrink-0 rounded-full bg-green px-3 py-1 text-label font-bold text-white">{out.title}</span>
            <span className="truncate text-label text-muted">{out.sub}</span>
          </span>
        ) : (
          <span className="font-mono text-label uppercase tracking-[0.14em] text-hint">RBI-supervised by design</span>
        )}
      </div>

      <div className="overflow-x-auto p-4 md:p-6">{children}</div>

      {/* the four, as labels: the sentences under them came out on the lead's
          instruction */}
      <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line bg-white px-6 py-5 md:px-7">
        {['Knows your book', 'Decides in the open', 'Cannot cross the line', 'Lands on your desk'].map((t) => (
          <span key={t} className="text-body font-semibold text-accent">{t}</span>
        ))}
      </div>
    </div>
  )
}
