import { Building2, ChevronDown, Play, TrendingUp, Users, Zap } from 'lucide-react'
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

      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col px-5 pb-8 pt-10 sm:px-8 lg:min-h-[calc(100svh-64px)] lg:px-10 lg:pt-8">
        <div className="flex flex-1 items-center">
          <div className="min-w-0 max-w-2xl [text-shadow:0_4px_10px_rgba(0,0,0,0.6)] lg:max-w-[55%]">
            <motion.span {...rise(0)} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-white/85 ring-1 ring-white/15 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-accent3" /> AI for NBFCs
            </motion.span>

            <motion.h1 {...rise(0.1)} className="display mt-5 max-w-[13ch] text-[clamp(40px,5.6vw,72px)]">
              Smarter lending decisions. <span className="text-[#c4bdff]">Within everyone’s reach.</span>
            </motion.h1>

            <motion.div {...rise(0.3)} className="mt-8 flex flex-wrap gap-3">
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
        </div>

        <motion.div {...rise(0.5)} className="mt-14 w-fit rounded-2xl bg-[rgba(8,8,22,0.55)] px-6 py-5 ring-1 ring-white/10 backdrop-blur-[10px] lg:mt-10 lg:px-8">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-x-0 sm:divide-x sm:divide-white/12">
            {METRICS.map((m, i) => {
              const Icon = ICONS[i]
              return (
                <div key={m.label} className="flex items-center gap-3 sm:px-6 sm:first:pl-0 sm:last:pr-0">
                  <Icon className="hidden size-6 shrink-0 text-accent3 sm:block" strokeWidth={1.6} />
                  <div>
                    <dt className="sr-only">{m.label}</dt>
                    <dd className="font-mono text-[22px] font-medium leading-none">{m.value}</dd>
                    <dd className="mt-1.5 whitespace-nowrap text-[12.5px] text-white/65">{m.label}</dd>
                  </div>
                </div>
              )
            })}
          </dl>
        </motion.div>

        <motion.a
          href="#explore"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mx-auto mt-6 hidden flex-col items-center gap-1 text-[11.5px] text-ink/60 transition-colors hover:text-ink lg:flex"
        >
          Scroll to explore
          <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.6, ease: 'easeInOut' }}>
            <ChevronDown className="size-4" />
          </motion.span>
        </motion.a>
      </div>
    </section>
  )
}
