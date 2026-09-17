import { ArrowRight, ArrowUp, BarChart3, FileText, IndianRupee, ShieldCheck } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import { HERO_QS, type Starter } from '../../content/saral-ai'
import { ask, Mark } from './SaralAiChat'

/* The hero's Saral AI card: one hello, four questions, a composer. Picking
   or typing hands the question to the page, which opens the conversation. */

const EASE = [0.22, 1, 0.36, 1] as const
const ICONS = [BarChart3, FileText, IndianRupee, ShieldCheck]
const TONES = ['bg-red-w text-red', 'bg-blue-w text-blue', 'bg-green-w text-green', 'bg-wash text-accent']

export function SaralAiPanel({ onAsk }: { onAsk: (s: Starter) => void }) {
  const [q, setQ] = useState('')
  const still = useReducedMotion()

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const text = q.trim()
    if (!text) return
    setQ('')
    onAsk({ q: text, a: await ask(text) })
  }

  return (
    <div id="saral-ai-panel" className="scroll-mt-20 rounded-[20px] bg-white/[0.06] p-px ring-1 ring-white/20 backdrop-blur-xl">
      <div className="rounded-[19px] bg-white/95 text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <div className="flex items-center gap-3 px-4 pt-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-white">
            <Mark className="text-[19px]" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[15px] font-bold tracking-tight">
              Saral AI <span className="size-2 rounded-full bg-green animate-pulse-ring" />
            </div>
            <div className="text-[12.5px] text-muted">Your lending copilot</div>
          </div>
        </div>

        <div className="px-4 pt-3">
          <div className="rounded-xl rounded-tl-sm bg-wash px-3.5 py-3 text-[13.5px] leading-relaxed text-ink">
            <span className="font-semibold">Hi, I’m Saral.</span> I can help with credit risk, collections, RBI norms, compliance or anything about our platform.
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: still ? 0 : 0.07, delayChildren: 0.15 } } }}
          className="grid grid-cols-1 gap-1.5 px-4 pt-2.5 sm:grid-cols-2"
        >
          {HERO_QS.map((s, i) => {
            const Icon = ICONS[i]
            return (
              <motion.button
                key={s.q}
                type="button"
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAsk(s)}
                className="group flex items-center gap-2.5 rounded-lg bg-bg px-2.5 py-2 text-left ring-1 ring-line transition-colors hover:bg-white hover:ring-accent/40"
              >
                <span className={`grid size-8 shrink-0 place-items-center rounded-md ${TONES[i]}`}>
                  <Icon className="size-3.5" />
                </span>
                <span className="min-w-0 flex-1 text-[12.5px] font-medium leading-snug text-ink">{s.q}</span>
                <ArrowRight className="size-3.5 shrink-0 text-hint transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-accent" />
              </motion.button>
            )
          })}
        </motion.div>

        <form onSubmit={submit} className="mx-4 mt-3 flex items-center gap-2 rounded-lg bg-white p-1 pl-3.5 ring-1 ring-line focus-within:ring-accent">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ask anything about lending…"
            aria-label="Ask Saral AI"
            className="min-w-0 flex-1 bg-transparent text-[13.5px] outline-none placeholder:text-hint"
          />
          <button type="submit" aria-label="Send" className="grid size-8 shrink-0 place-items-center rounded-md bg-accent text-white transition-colors hover:bg-accent2">
            <ArrowUp className="size-3.5" />
          </button>
        </form>
        <div className="px-4 pb-3.5 pt-2.5 text-[11.5px] text-hint">General information, not financial or legal advice.</div>
      </div>
    </div>
  )
}
