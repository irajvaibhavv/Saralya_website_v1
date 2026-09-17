import { ArrowRight, Building2, TrendingUp, Users, Zap } from 'lucide-react'
import { motion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import { HERO_QS, METRICS, type Starter } from '../../content/saral-ai'
import { HeroReel } from './HeroReel'
import { ask } from './SaralAiChat'

/* One screen: the claim on the left, the reel open on the right, four
   numbers along the foot. Saral Saarthi waits in the corner. */

const EASE = [0.22, 1, 0.36, 1] as const
const rise = (delay: number) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, ease: EASE, delay } })
const ICONS = [Building2, Zap, TrendingUp, Users]

export function Hero({ onAsk }: { onAsk: (s: Starter) => void }) {
  const [q, setQ] = useState('')
  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const text = q.trim()
    if (!text) return
    setQ('')
    onAsk({ q: text, a: await ask(text) })
  }

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

          {/* the shortest path to Saral: type here, the window opens with the answer */}
          <motion.form {...rise(0.25)} onSubmit={submit} className="mt-7 flex max-w-xl items-center gap-2 rounded-2xl bg-[#fff]/10 p-1.5 pl-5 ring-1 ring-[#fff]/25 backdrop-blur-xl focus-within:ring-[#fff]/60">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ask Saral anything about lending…"
              aria-label="Ask Saral AI"
              className="min-w-0 flex-1 bg-transparent text-[15px] text-[#fff] outline-none placeholder:text-[#fff]/55"
            />
            <button type="submit" className="flex shrink-0 items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[14px] font-semibold text-[#fff] transition-colors hover:bg-accent2">
              Ask <ArrowRight className="size-4" />
            </button>
          </motion.form>
          <motion.div {...rise(0.32)} className="mt-3 flex flex-wrap items-center gap-2 text-[12.5px] text-[#fff]/60">
            Try:
            {HERO_QS.slice(0, 3).map((s) => (
              <button key={s.q} type="button" onClick={() => onAsk(s)} className="rounded-full bg-[#fff]/10 px-3 py-1 text-[12.5px] text-[#fff]/85 ring-1 ring-[#fff]/20 transition-colors hover:bg-[#fff]/20">
                {s.q}
              </button>
            ))}
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
