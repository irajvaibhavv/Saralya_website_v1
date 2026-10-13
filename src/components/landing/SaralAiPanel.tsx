import { ArrowRight, ArrowUp, BarChart3, FileText, IndianRupee, Plus, ShieldCheck } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import { HERO_QS, type Starter } from '../../content/saral-ai'
import { ACCEPT, ask, fileStarter, Mark, MicButton, useSpeech, type Role } from './SaralAiChat'

/* The opening view, centred in the full-page sheet: one hello, four
   questions, a composer. Picking or typing hands the question up, and the
   sheet becomes the conversation.

   TODO(Vikas): "trained on Indian banking data" under the composer is a
   public technical claim — confirm before launch, and note that free-text
   ask() is still scripted until the model endpoint lands. */

const EASE = [0.22, 1, 0.36, 1] as const
const ICONS = [BarChart3, FileText, IndianRupee, ShieldCheck]
const TONES = ['bg-red-w text-red', 'bg-blue-w text-blue', 'bg-green-w text-green', 'bg-wash text-accent']

export function SaralAiPanel({ onAsk, seat }: { onAsk: (s: Starter) => void; seat: Role | null }) {
  const [q, setQ] = useState('')
  const speech = useSpeech(setQ)
  const still = useReducedMotion()
  const qs = seat ? seat.qs.slice(0, 4) : HERO_QS

  /* a file picked here opens the conversation with it */
  const attach = (list: FileList | null) => {
    const s = list && fileStarter(list)
    if (s) onAsk(s)
  }
  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const text = q.trim()
    if (!text) return
    setQ('')
    onAsk({ q: text, a: await ask(text) })
  }

  return (
    <div className="flex h-full flex-col justify-center overflow-y-auto py-10 text-white">
      <div className="flex items-center gap-2.5">
        <span className="grid size-7 shrink-0 place-items-center rounded-md bg-accent text-white">
          <Mark className="text-[15px]" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">Saral Saarthi</span>
        <span className="size-1.5 rounded-full bg-green animate-pulse-ring" />
      </div>

      <h2 className="mt-5 max-w-[18ch] text-[clamp(30px,4.6vw,46px)] font-semibold leading-[1.08] tracking-[-0.03em] [text-shadow:0_2px_20px_rgba(0,0,0,0.35)]">
        Ask me anything<span className="text-accent3">.</span>
      </h2>
      <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-white/65">
        {seat ? seat.hello : 'Credit risk, collections, RBI norms, compliance — or anything about our platform.'}
      </p>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: still ? 0 : 0.07, delayChildren: 0.15 } } }}
        className="mt-7 grid gap-2 sm:grid-cols-2"
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
              className="group flex items-center gap-3 rounded-2xl bg-white/[0.07] px-3 py-3 text-left ring-1 ring-white/15 backdrop-blur-md transition-colors hover:bg-white/[0.14] hover:ring-white/30"
            >
              <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${TONES[i]}`}>
                <Icon className="size-3.5" />
              </span>
              <span className="min-w-0 flex-1 text-[13.5px] font-medium leading-snug text-white/90">{s.q}</span>
              <ArrowRight className="size-3.5 shrink-0 text-white/35 transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-white" />
            </motion.button>
          )
        })}
      </motion.div>

      <form onSubmit={submit} className="mt-3 flex items-center gap-1.5 rounded-2xl bg-white/[0.09] p-1.5 ring-1 ring-white/20 backdrop-blur-md transition focus-within:bg-white/[0.14] focus-within:ring-white/40">
        <label aria-label="Add a file" title="Add a file" className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-xl text-white/55 hover:bg-white/10 hover:text-white">
          <Plus className="size-4" />
          <input type="file" multiple accept={ACCEPT} className="sr-only" onChange={(e) => { attach(e.target.files); e.target.value = '' }} />
        </label>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={speech.listening ? 'Listening…' : 'Ask anything about lending…'}
          aria-label="Ask Saral AI"
          autoFocus
          className="min-w-0 flex-1 bg-transparent px-1.5 text-[14.5px] text-white outline-none placeholder:text-white/40"
        />
        <MicButton speech={speech} />
        <button type="submit" aria-label="Send" className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-white transition-colors hover:bg-accent2">
          <ArrowUp className="size-4" />
        </button>
      </form>
      <p className="mt-3.5 text-[12px] leading-relaxed text-white/45">
        Our own ML model, trained on Indian banking data. General information, not financial or legal advice.
      </p>
    </div>
  )
}
