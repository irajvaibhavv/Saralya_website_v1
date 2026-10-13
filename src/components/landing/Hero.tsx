import { ArrowRight, ArrowUp, BarChart3, Building2, FileText, IndianRupee, Plus, ShieldCheck, TrendingUp, Users, X, Zap } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import { HERO_QS, METRICS, type Starter } from '../../content/saral-ai'
import { HeroReel } from './HeroReel'
import { ACCEPT, ask, fileStarter, MicButton, SaralAiChat, useSpeech, type Role } from './SaralAiChat'

/* One screen, and the product is on it: the claim, then a box you can type
   into. No launcher to find and nothing covering the page — asking a
   question turns this same space into the conversation, with the reel still
   running behind it. */

const EASE = [0.22, 1, 0.36, 1] as const
const rise = (delay: number) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, ease: EASE, delay } })
const ICONS = [Building2, Zap, TrendingUp, Users]
const Q_ICONS = [BarChart3, FileText, IndianRupee, ShieldCheck]

export function Hero({ pending, seat, onAsk, onClose }: { pending: Starter | null; seat: Role | null; onAsk: (s: Starter) => void; onClose: () => void }) {
  return (
    <section data-hero id="saarthi" className="relative isolate -mt-[65px] overflow-hidden bg-[#0a0a0b] pt-[65px] text-white">
      <HeroReel />

      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col justify-end px-5 pb-10 pt-24 sm:px-8 lg:min-h-[calc(100svh-64px)] lg:px-10 lg:pb-12">
        <AnimatePresence mode="wait">
          {pending ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative mx-auto w-full max-w-[760px] rounded-3xl bg-bg text-ink shadow-[0_40px_90px_-30px_rgba(10,10,16,0.6)]"
            >
              <button onClick={onClose} aria-label="Close the conversation" className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-black/5 hover:text-ink">
                <X className="size-4.5" />
              </button>
              <div className="h-[min(620px,70svh)] px-4">
                <SaralAiChat pending={pending} seat={seat} />
              </div>
            </motion.div>
          ) : (
            <motion.div key="prompt" exit={{ opacity: 0, transition: { duration: 0.2 } }}>
              <div className="max-w-3xl [text-shadow:0_4px_10px_rgba(0,0,0,0.6)]">
                <motion.span {...rise(0)} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
                  <span className="h-px w-6 bg-accent3" /> AI for NBFCs
                </motion.span>

                <motion.h1 {...rise(0.1)} className="mt-4 text-[clamp(34px,4.4vw,58px)] font-semibold leading-[1.06] tracking-[-0.03em] text-white">
                  Smarter lending decisions.
                  <br />
                  Within everyone’s reach.
                </motion.h1>
              </div>

              <HeroPrompt seat={seat} onAsk={onAsk} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* the numbers run along the foot, quiet, under a hairline */}
        {!pending && (
          <motion.dl {...rise(0.5)} className="mt-10 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-4 border-t border-white/15 pt-5 [text-shadow:0_2px_8px_rgba(0,0,0,0.6)] sm:grid-cols-4">
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
        )}
      </div>
    </section>
  )
}

/* The box itself. Glass, so the reel keeps showing through it, with the four
   openers underneath for anyone who would rather pick than type.

   TODO(Vikas): "trained on Indian banking data" is a public technical claim
   sitting under a box people can type into — confirm before launch, and note
   that free-text ask() stays scripted until the model endpoint lands. */
function HeroPrompt({ seat, onAsk }: { seat: Role | null; onAsk: (s: Starter) => void }) {
  const [q, setQ] = useState('')
  const speech = useSpeech(setQ)
  const qs = seat ? seat.qs.slice(0, 4) : HERO_QS

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
    <motion.div {...rise(0.25)} className="mt-8 max-w-[640px]">
      <form onSubmit={submit} className="flex items-center gap-1.5 rounded-2xl bg-white/[0.12] p-1.5 ring-1 ring-white/25 backdrop-blur-xl transition focus-within:bg-white/[0.18] focus-within:ring-white/45">
        <label aria-label="Add a file" title="Add a file" className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-xl text-white/60 hover:bg-white/10 hover:text-white">
          <Plus className="size-4.5" />
          <input type="file" multiple accept={ACCEPT} className="sr-only" onChange={(e) => { attach(e.target.files); e.target.value = '' }} />
        </label>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={speech.listening ? 'Listening…' : 'Test our Saarthi with a question…'}
          aria-label="Ask Saral Saarthi"
          className="min-w-0 flex-1 bg-transparent px-1.5 text-[15px] text-white outline-none placeholder:text-white/55"
        />
        <MicButton speech={speech} />
        <button type="submit" aria-label="Send" className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-white transition-colors hover:bg-accent2">
          <ArrowUp className="size-4.5" />
        </button>
      </form>

      <p className="mt-2.5 text-[12.5px] text-white/60 [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
        Our own ML model, trained on Indian banking data.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {qs.map((s, i) => {
          const Icon = Q_ICONS[i]
          return (
            <button
              key={s.q}
              type="button"
              onClick={() => onAsk(s)}
              className="group inline-flex items-center gap-2 rounded-full bg-white/[0.1] py-2 pl-3 pr-3.5 text-[13px] font-medium text-white/90 ring-1 ring-white/20 backdrop-blur-md transition hover:bg-white/20 hover:ring-white/35"
            >
              <Icon className="size-3.5 shrink-0 text-accent3" />
              {s.q}
              <ArrowRight className="size-3 shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5" />
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
