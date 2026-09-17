import { ArrowLeft, ArrowUp, BarChart3, FileText, IndianRupee, ShieldCheck } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCallback, useState, type FormEvent } from 'react'
import { HERO_QS, type Starter } from '../../content/saral-ai'
import { ask, Mark, SaralAiChat } from './SaralAiChat'

/* The hero's Saral AI panel. Closed, it is an invitation: one hello, four
   questions, a composer. Pick or type, and the same panel becomes the
   conversation (SaralAiChat). The page owns `pending` so the marquee below
   can open the panel with its own question. */

const EASE = [0.22, 1, 0.36, 1] as const
const ICONS = [BarChart3, FileText, IndianRupee, ShieldCheck]
const TONES = ['bg-red-w text-red', 'bg-blue-w text-blue', 'bg-green-w text-green', 'bg-wash text-accent']

/* The conversation opens at one exchange and grows with it. */
const CHAT_MIN = 520
const CHAT_PER_MSG = 80

export function SaralAiPanel({ pending, onAsk, onBack }: { pending: Starter | null; onAsk: (s: Starter) => void; onBack: () => void }) {
  const [q, setQ] = useState('')
  const [msgs, setMsgs] = useState(0)
  const still = useReducedMotion()
  const open = pending !== null
  const onMessages = useCallback((n: number) => setMsgs(n), [])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const text = q.trim()
    if (!text) return
    setQ('')
    onAsk({ q: text, a: await ask(text) })
  }
  const back = () => {
    setMsgs(0)
    onBack()
  }
  const height = CHAT_MIN + Math.max(0, msgs - 3) * CHAT_PER_MSG

  return (
    <div id="saral-ai-panel" className="scroll-mt-20 rounded-[22px] bg-white/[0.06] p-px ring-1 ring-white/20 backdrop-blur-xl">
      <motion.div
        animate={open && !still ? { height } : { height: 'auto' }}
        transition={{ type: 'spring', stiffness: 220, damping: 30, mass: 0.7 }}
        className="max-h-[80svh] overflow-hidden rounded-[21px] bg-white text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {!open ? (
            <motion.div key="idle" exit={{ opacity: 0, transition: { duration: 0.18 } }}>
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
                <div className="rounded-2xl rounded-tl-md bg-wash px-4 py-3.5 text-[14.5px] leading-relaxed text-ink">
                  <span className="font-semibold">Hi, I’m Saral.</span> I can help with credit risk, collections, RBI norms, compliance or anything about our platform. What would you like to know?
                </div>
              </div>

              <motion.div
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: still ? 0 : 0.07, delayChildren: 0.15 } } }}
                className="grid grid-cols-1 gap-2 px-5 pt-3 sm:grid-cols-2"
              >
                {HERO_QS.map((s, i) => {
                  const Icon = ICONS[i]
                  return (
                    <motion.button
                      key={s.q}
                      type="button"
                      variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } }}
                      whileHover={still ? undefined : { y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onAsk(s)}
                      className="flex items-center gap-3 rounded-xl bg-bg px-3.5 py-3 text-left ring-1 ring-line transition-colors hover:bg-white hover:ring-accent/40"
                    >
                      <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${TONES[i]}`}>
                        <Icon className="size-4" />
                      </span>
                      <span className="text-[13.5px] font-medium leading-snug text-ink">{s.q}</span>
                    </motion.button>
                  )
                })}
              </motion.div>

              <form onSubmit={submit} className="m-5 flex items-center gap-2 rounded-xl bg-white p-1.5 pl-4 ring-1 ring-line focus-within:ring-accent">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Ask anything about lending…"
                  aria-label="Ask Saral AI"
                  className="min-w-0 flex-1 bg-transparent text-[14.5px] outline-none placeholder:text-hint"
                />
                <button type="submit" aria-label="Send" className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-white transition-colors hover:bg-accent2">
                  <ArrowUp className="size-4" />
                </button>
              </form>
              <div className="px-5 pb-4 text-[12px] text-hint">General information, not financial or legal advice.</div>
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 }} className="relative h-full">
              <button onClick={back} className="absolute right-4 top-5 z-10 flex items-center gap-1.5 rounded-lg bg-white/80 px-2.5 py-1.5 text-[12.5px] font-medium text-muted ring-1 ring-line backdrop-blur transition-colors hover:text-ink">
                <ArrowLeft className="size-3.5" /> Questions
              </button>
              <SaralAiChat pending={pending} onMessages={onMessages} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
