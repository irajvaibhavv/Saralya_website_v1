import { Building2, Play, TrendingUp, Users, Zap } from 'lucide-react'
import { motion } from 'motion/react'
import { METRICS } from '../../content/saral-ai'
import { Button } from '../ui/Button'
import { HeroReel } from './HeroReel'

/* One screen: the claim on the left, the reel open on the right, four
   numbers along the foot. Saral Saarthi waits in the corner. */

const EASE = [0.22, 1, 0.36, 1] as const
const rise = (delay: number) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, ease: EASE, delay } })
const ICONS = [Building2, Zap, TrendingUp, Users]

export function Hero({ onTry, onWatch }: { onTry: () => void; onWatch: () => void }) {

  return (
    <section className="relative isolate -mt-[64px] overflow-hidden bg-ink pt-[64px] text-white">
      <HeroReel />

      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col justify-end px-5 pb-10 pt-24 sm:px-8 lg:min-h-[calc(100svh-64px)] lg:px-10 lg:pb-12">
        {/* the frame stays open above; the title sits low like a film card */}
        <div className="max-w-3xl [text-shadow:0_4px_10px_rgba(0,0,0,0.6)]">
          <motion.span {...rise(0)} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
            <span className="h-px w-6 bg-accent3" /> AI for NBFCs
          </motion.span>

          <motion.h1 {...rise(0.1)} className="mt-4 text-[clamp(34px,4.4vw,58px)] font-semibold leading-[1.06] tracking-[-0.03em] text-white">
            Smarter lending decisions.
            <br />
            Within everyone’s reach.
          </motion.h1>

          <motion.div {...rise(0.25)} className="mt-7 flex flex-wrap items-center gap-3">
            <Button variant="primary" size="lg" arrow onClick={onTry} className="shadow-[0_8px_24px_-8px_rgba(75,63,207,0.7)]">
              Try Saralya AI
            </Button>
            <button onClick={onWatch} className="group inline-flex items-center gap-3 rounded-xl border border-white/40 py-2 pl-2 pr-5 text-left transition-colors hover:border-white/70 hover:bg-white/5">
              <span className="grid size-9 place-items-center rounded-lg border border-white/40 text-white transition-colors group-hover:border-white/70">
                <Play className="ml-0.5 size-4 fill-current" />
              </span>
              <span>
                <span className="block text-[14px] font-semibold leading-tight">Watch video</span>
                <span className="block text-[12px] text-white/60">2 min</span>
              </span>
            </button>
          </motion.div>
        </div>

        {/* the numbers run along the foot, quiet, under a hairline */}
        <motion.dl {...rise(0.4)} className="mt-10 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-4 border-t border-white/15 pt-5 [text-shadow:0_2px_8px_rgba(0,0,0,0.6)] sm:grid-cols-4">
          {METRICS.map((m, i) => {
            const Icon = ICONS[i]
            return (
              <div key={m.label} className="flex items-center gap-3">
                <Icon className="hidden size-5 shrink-0 text-accent3 sm:block" strokeWidth={1.6} />
                <div>
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="font-mono text-[20px] font-medium leading-none">{m.value}</dd>
                  <dd className="mt-1 whitespace-nowrap text-[12px] text-white/65">{m.label}</dd>
                </div>
              </div>
            )
          })}
        </motion.dl>
      </div>
    </section>
  )
}
