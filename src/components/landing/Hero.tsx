import { Play } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { METRICS, type Starter } from '../../content/saral-ai'
import { Button } from '../ui/Button'
import { HeroReel } from './HeroReel'
import { SaralAiPanel } from './SaralAiPanel'

/* One screen: the claim on the left, Saral AI on the right, four numbers
   along the foot. The reel runs under all of it. */

const EASE = [0.22, 1, 0.36, 1] as const
const rise = (delay: number) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, ease: EASE, delay } })

export function Hero({ pending, onAsk, onBack, onWatch }: { pending: Starter | null; onAsk: (s: Starter) => void; onBack: () => void; onWatch: () => void }) {
  const still = useReducedMotion()
  const tryAi = () => {
    const el = document.querySelector<HTMLElement>('#saral-ai-panel')
    el?.scrollIntoView({ behavior: still ? 'instant' : 'smooth', block: 'start' })
    window.setTimeout(() => el?.querySelector('input')?.focus({ preventScroll: true }), still ? 0 : 500)
  }

  return (
    <section className="relative isolate -mt-[64px] overflow-hidden bg-ink pt-[64px] text-white">
      <HeroReel dim={pending !== null} />

      <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-10 px-5 pb-20 pt-12 sm:px-8 lg:min-h-[calc(100svh-64px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-14 lg:px-10 lg:pb-24 lg:pt-12">
        <div className="min-w-0">
          <motion.span {...rise(0)} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-white/85 ring-1 ring-white/15 backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-green" /> AI for NBFCs
          </motion.span>

          <motion.h1 {...rise(0.1)} className="display mt-5 max-w-[12ch] text-[clamp(38px,5.4vw,66px)] [text-shadow:0_2px_24px_rgba(0,0,0,0.5)]">
            Smarter lending decisions. Within <span className="text-accent3">everyone’s reach.</span>
          </motion.h1>

          <motion.p {...rise(0.2)} className="mt-5 max-w-[46ch] text-[clamp(15px,1.3vw,17px)] leading-relaxed text-white/80 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
            Ask. Explore. Get expert-backed insights on credit risk, collections, compliance and more — powered by Saralya’s BFSI AI.
          </motion.p>

          <motion.div {...rise(0.3)} className="mt-8 flex flex-wrap gap-3">
            <Button variant="white" size="lg" arrow onClick={tryAi}>
              Try Saralya AI
            </Button>
            <button onClick={onWatch} className="group inline-flex items-center gap-3 rounded-xl bg-white/10 py-2 pl-2 pr-5 text-left ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-white/15">
              <span className="grid size-9 place-items-center rounded-lg bg-white text-ink transition-transform group-hover:scale-105">
                <Play className="ml-0.5 size-4 fill-current" />
              </span>
              <span>
                <span className="block text-[14px] font-semibold leading-tight">Watch video</span>
                <span className="block text-[12px] text-white/60">2 min</span>
              </span>
            </button>
          </motion.div>

          <motion.dl {...rise(0.45)} className="mt-12 grid max-w-[640px] grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-x-0 sm:divide-x sm:divide-white/15">
            {METRICS.map((m) => (
              <div key={m.label} className="sm:px-4 sm:first:pl-0 sm:last:pr-0">
                <dt className="sr-only">{m.label}</dt>
                <dd className="font-mono text-[22px] font-medium leading-none">{m.value}</dd>
                <dd className="mt-1.5 whitespace-nowrap text-[12px] text-white/60">{m.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}>
          <SaralAiPanel pending={pending} onAsk={onAsk} onBack={onBack} />
        </motion.div>
      </div>
    </section>
  )
}
