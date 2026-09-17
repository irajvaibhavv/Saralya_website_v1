import { ArrowRight, ArrowUp, BarChart3, FileText, IndianRupee, ShieldCheck } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import { HERO_QS, type Starter } from '../../content/saral-ai'
import { ask, Mark, type Role } from './SaralAiChat'

/* The opening view of the Saral window: one hello, four questions, a
   composer. Picking or typing hands the question up, and the window
   becomes the conversation. */

const EASE = [0.22, 1, 0.36, 1] as const
const ICONS = [BarChart3, FileText, IndianRupee, ShieldCheck]
const TONES = ['bg-red-w text-red', 'bg-blue-w text-blue', 'bg-green-w text-green', 'bg-wash text-accent']

export function SaralAiPanel({ onAsk, seat }: { onAsk: (s: Starter) => void; seat: Role | null }) {
  const [q, setQ] = useState('')
  const still = useReducedMotion()
  const qs = seat ? seat.qs.slice(0, 4) : HERO_QS

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const text = q.trim()
    if (!text) return
    setQ('')
    onAsk({ q: text, a: await ask(text) })
  }

  return (
    <div className="text-ink">
      <div className="flex items-center gap-3 px-5 pt-5">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-white">
          <Mark className="text-[21px]" />
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[16px] font-bold tracking-tight">
            Saral AI <span className="size-2 rounded-full bg-green animate-pulse-ring" />
          </div>
          <div className="text-[13px] text-muted">Your lending copilot</div>
        </div>
      </div>

      <div className="px-5 pt-4">
        <div className="rounded-2xl rounded-tl-md bg-wash2 px-4 py-3.5 text-[14px] leading-relaxed">
          <span className="font-semibold">Hi, I’m Saral.</span> {seat ? seat.hello : 'I can help with credit risk, collections, RBI norms, compliance or anything about our platform.'}
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: still ? 0 : 0.07, delayChildren: 0.15 } } }}
        className="grid gap-2 px-5 pt-3"
      >
        {qs.map((s, i) => {
          const Icon = ICONS[i]
          return (
            <motion.button
              key={s.q}
              type="button"
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAsk(s)}
              className="group flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 text-left ring-1 ring-line transition-colors hover:bg-bg hover:ring-accent/30"
            >
              <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${TONES[i]}`}>
                <Icon className="size-4" />
              </span>
              <span className="min-w-0 flex-1 text-[13.5px] font-medium leading-snug">{s.q}</span>
              <ArrowRight className="size-3.5 shrink-0 text-hint transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-accent" />
            </motion.button>
          )
        })}
      </motion.div>

      <form onSubmit={submit} className="mx-5 mt-4 flex items-center gap-2 rounded-xl bg-bg p-1.5 pl-4 ring-1 ring-line focus-within:ring-accent">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask anything about lending…"
          aria-label="Ask Saral AI"
          autoFocus
          className="min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-hint"
        />
        <button type="submit" aria-label="Send" className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-white transition-colors hover:bg-accent2">
          <ArrowUp className="size-4" />
        </button>
      </form>
      <div className="px-5 pb-4 pt-3 text-[12px] text-hint">General information, not financial or legal advice.</div>
    </div>
  )
}
