import { Check } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

/* A 21-second reel: three shots of the India Saralya lends to (Pexels, free
   for commercial use: Aamir Somewhere, Yogendra Singh, Nathanael Arias), with
   one product moment captioned over each. Captions follow the video clock. */
const SCENES = [
  { kicker: '10:04', title: 'Rahul K. applies for ₹4.5L working capital.', steps: ['CIBIL', 'Account Aggregator', 'GSTN'], done: 'Sanctioned 10:08' },
  { kicker: 'Day 1', title: 'A NACH bounce. The account is tagged SMA-0 the same day.', steps: ['Bounce seen', 'Cross-lender check'], done: 'Officer routed' },
  { kicker: 'Q4', title: 'RBI inspection notice. The pack is ready in four clicks.', steps: ['CRILC', 'NBS-9', 'Audit trail'], done: 'Pack sent' },
]
const SCENE_S = 7

export function VideoReel() {
  const [i, setI] = useState(0)
  const [t, setT] = useState(0)
  const s = SCENES[i]
  return (
    <div className="relative h-[clamp(160px,22vh,240px)] overflow-hidden rounded-2xl bg-ink text-white">
      <video
        src="/video/reel.mp4"
        poster="/video/reel-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onTimeUpdate={(e) => {
          const now = e.currentTarget.currentTime
          setT(now)
          const n = Math.min(SCENES.length - 1, Math.floor(now / SCENE_S))
          if (n !== i) setI(n)
        }}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />

      <div className="absolute left-4 top-4 rounded-md bg-ink/60 px-2 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-white/80 backdrop-blur-sm">Built for banks, NBFCs and financial institutions</div>

      <div className="absolute inset-x-4 bottom-4">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35 }}>
            <div className="font-mono text-[11px] text-accent3">{s.kicker}</div>
            <div className="mt-0.5 max-w-md text-[15px] font-semibold leading-snug">{s.title}</div>
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              {s.steps.map((st, k) => (
                <motion.span key={st} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + k * 0.7 }} className="flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 font-mono text-[10.5px] ring-1 ring-white/15">
                  <Check className="size-3 text-green" strokeWidth={3} /> {st}
                </motion.span>
              ))}
              <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + s.steps.length * 0.7 + 0.4, type: 'spring', stiffness: 300, damping: 18 }} className="rounded-md bg-green px-2 py-1 font-mono text-[10.5px] font-medium text-white">
                {s.done}
              </motion.span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* scene progress, driven by the video clock */}
      <div className="absolute right-4 top-4 flex gap-1">
        {SCENES.map((_, k) => (
          <span key={k} className="h-1 w-6 overflow-hidden rounded-full bg-white/20">
            <span className="block h-full bg-white" style={{ width: `${Math.max(0, Math.min(1, t / SCENE_S - k)) * 100}%` }} />
          </span>
        ))}
      </div>
    </div>
  )
}
