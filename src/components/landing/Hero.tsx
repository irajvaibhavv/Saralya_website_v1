import { Building2, TrendingUp, Users, X, Zap } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { METRICS, type Starter } from '../../content/saral-ai'
import { ButtonLink } from '../ui/Button'
import { HeroReel } from './HeroReel'
import type { Role } from './SaralAiChat'
import { SaralAiPanel } from './SaralAiPanel'

/* One screen: the claim on the left, the reel open on the right, four
   numbers along the foot.

   After ten seconds the copy steps aside and Saral Saarthi takes the hero
   itself — not a sheet over the page. The reel keeps playing behind it, the
   rest of the page is still there to scroll to, and the cross puts the
   claim back. */

const EASE = [0.22, 1, 0.36, 1] as const
const rise = (delay: number) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, ease: EASE, delay } })
const ICONS = [Building2, Zap, TrendingUp, Users]

export function Hero({
  takeover = false,
  seat = null,
  onAsk,
  onDismiss,
}: {
  takeover?: boolean
  seat?: Role | null
  onAsk?: (s: Starter) => void
  onDismiss?: () => void
}) {
  return (
    <section className="relative isolate -mt-[65px] overflow-hidden bg-[#0a0a0b] pt-[65px] text-white">
      <HeroReel />

      {/* Saral Saarthi, in the hero itself */}
      <AnimatePresence>
        {takeover && onAsk && (
          <motion.div
            key="saarthi"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-20 flex items-center"
            aria-label="Saral Saarthi"
          >
            {/* only the reading column dims; the reel keeps its brightness either side */}
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_56%_at_50%_50%,rgba(10,10,16,0.68),rgba(10,10,16,0.2)_62%,transparent_80%)]" />
            <button
              onClick={onDismiss}
              aria-label="Close Saral Saarthi"
              className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white sm:right-6 sm:top-6"
            >
              <X className="size-5" />
            </button>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
              className="relative mx-auto w-full max-w-[720px] px-5"
            >
              <SaralAiPanel onAsk={onAsk} seat={seat} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        data-hero-copy
        className="relative mx-auto flex w-full max-w-[1240px] flex-col justify-end px-5 pb-10 pt-24 sm:px-8 lg:min-h-[calc(100svh-64px)] lg:px-10 lg:pb-12"
      >
        {/* the copy steps aside when Saarthi arrives, and comes back if it is closed */}
        <AnimatePresence>
          {!takeover && (
            <motion.div key="copy" exit={{ opacity: 0, y: -10, transition: { duration: 0.35, ease: EASE } }}>
              {/* the frame stays open above; the title sits low like a film card */}
              <div className="max-w-3xl [text-shadow:0_4px_10px_rgba(0,0,0,0.6)]">
                <motion.span {...rise(0)} className="inline-flex items-center gap-2 font-mono text-label uppercase tracking-[0.14em] text-white/80">
                  <span className="h-px w-6 bg-accent3" /> AI for NBFCs
                </motion.span>

                <motion.h1 {...rise(0.1)} className="mt-4 text-display font-semibold leading-[1.06] tracking-[-0.03em] text-white">
                  Making Lending Saral for Bharat.
                </motion.h1>

                <motion.div {...rise(0.25)} className="mt-7">
                  <ButtonLink to="/agents" variant="white" size="lg" arrow>
                    Make your own AI agents
                  </ButtonLink>
                </motion.div>
              </div>

              {/* the numbers run along the foot, quiet, under a hairline */}
              <motion.dl
                {...rise(0.4)}
                className="mt-10 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-4 border-t border-white/15 pt-5 [text-shadow:0_2px_8px_rgba(0,0,0,0.6)] sm:grid-cols-4"
              >
                {METRICS.map((m, i) => {
                  const Icon = ICONS[i]
                  return (
                    <div key={m.label} className="flex items-center gap-3">
                      <Icon className="hidden size-5 shrink-0 text-accent3 sm:block" strokeWidth={1.6} />
                      <div>
                        <dt className="sr-only">{m.label}</dt>
                        <dd className="font-mono text-h3 font-medium leading-none">{m.value}</dd>
                        <dd className="mt-1 whitespace-nowrap text-small text-white/65">{m.label}</dd>
                      </div>
                    </div>
                  )
                })}
              </motion.dl>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
