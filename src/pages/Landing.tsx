import { Check } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { SaralAi } from '../components/home/SaralAi'
import { ButtonLink } from '../components/ui/Button'

/* The front door: copy on the left, Saral AI on the right. Everything else
   lives at /home. */

const EASE = [0.22, 1, 0.36, 1] as const
const FACTS: [string, string, string][] = [
  ['9', 'AA FI types', 'bg-green-w text-green'],
  ['600+', 'RBI & DPDP checks', 'bg-amber-w text-amber'],
  ['6', 'modules, one API', 'bg-wash text-accent'],
]

export function Landing() {
  return (
    <div className="relative bg-[radial-gradient(ellipse_70%_60%_at_0%_0%,#ebeafa_0%,transparent_60%),radial-gradient(ellipse_60%_60%_at_100%_100%,#ffe9d9_0%,transparent_60%),radial-gradient(ellipse_50%_50%_at_10%_100%,#dff6ec_0%,transparent_60%)]">
    <div className="mx-auto grid w-full max-w-[1240px] items-center gap-10 px-5 py-10 sm:px-8 lg:h-[calc(100svh-64px)] lg:min-h-[560px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12 lg:px-10 lg:py-6">
      <div className="min-w-0">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="eyebrow inline-flex items-center gap-2 rounded-full bg-wash px-3 py-1.5 text-accent">
          <span className="size-1.5 rounded-full bg-accent" /> Lending intelligence for India
        </motion.div>
        <h1 className="display mt-4 text-[clamp(32px,min(3.4vw,5.2vh),52px)]">
          {['Get answers to your', 'lending questions.'].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.55, ease: EASE, delay: 0.1 + i * 0.1 }} className={`block ${i === 1 ? 'text-accent' : ''}`}>
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.ul initial="hidden" animate="show" transition={{ staggerChildren: 0.07, delayChildren: 0.45 }} className="mt-5 flex flex-wrap gap-2">
          {FACTS.map(([n, label, tone]) => (
            <motion.li key={label} variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }} className={`flex items-baseline gap-1.5 rounded-lg px-3 py-1.5 ${tone}`}>
              <span className="text-[15px] font-semibold">{n}</span>
              <span className="text-[12.5px] font-medium opacity-80">{label}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE, delay: 0.55 }} className="mt-5 rounded-[20px] bg-white/70 p-1.5 ring-1 ring-white">
          <Reel />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-6 flex flex-wrap gap-3">
          <ButtonLink to="/home" variant="ink" arrow>
            Explore Saralya
          </ButtonLink>
          <ButtonLink to="/demo" variant="ghost">
            Try the live demo
          </ButtonLink>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.3 }} className="h-[600px] lg:h-full lg:min-h-0">
        <SaralAi />
      </motion.div>
    </div>
    </div>
  )
}

/* A 21-second reel: three shots of the India Saralya lends to (Pexels, free
   for commercial use: Aamir Somewhere, Yogendra Singh, Nathanael Arias), with
   one product moment captioned over each. Captions follow the video clock. */
const SCENES = [
  { kicker: '10:04', title: 'Rahul K. applies for ₹4.5L working capital.', steps: ['CIBIL', 'Account Aggregator', 'GSTN'], done: 'Sanctioned 10:08' },
  { kicker: 'Day 1', title: 'A NACH bounce. The account is tagged SMA-0 the same day.', steps: ['Bounce seen', 'Cross-lender check'], done: 'Officer routed' },
  { kicker: 'Q4', title: 'RBI inspection notice. The pack is ready in four clicks.', steps: ['CRILC', 'NBS-9', 'Audit trail'], done: 'Pack sent' },
]
const SCENE_S = 7

function Reel() {
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
