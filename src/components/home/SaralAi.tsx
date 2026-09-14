import { ArrowRight, ArrowUp, Check, RotateCcw, Sparkles } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { FormEvent, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BOOK_SIZES, CHALLENGES, CONTACT_EMAIL, CONVICTIONS, DEPARTMENTS, MODULES, ONBOARDING, STAGES, type ChallengeId, type DeptId } from '../../content/site'
import { ButtonLink } from '../ui/Button'
import { FadeIn } from '../ui/Motion'
import { Container, Section } from '../ui/Section'

/* Saral AI: a guided diagnostic that ends in a personal note — where it hurts
   on the lending lifecycle, one vendor-neutral fix per challenge, where
   Saralya fits, and the first 30 days. Scripted; `ask()` is where the model
   plugs in. */

type Msg = { from: 'ai' | 'you'; text: string }
type Step = 'dept' | 'challenges' | 'size' | 'note'
const STEPS: Step[] = ['dept', 'challenges', 'size', 'note']
const STEP_LABELS = ['Who you are', 'Your challenges', 'Your book', 'Your note']

const HELLO = 'Hi, I’m Saral AI. I know Indian lending — RBI norms, credit ops, collections. Tell me a little about you and I’ll leave you with something useful, whether or not we ever talk. What do you do?'

// TODO: point at the model endpoint once it is exposed. Until then every
// question gets the same honest answer.
async function ask(_q: string): Promise<string> {
  return 'That one needs the full model, which is being wired in. For now the founders read every question — the walkthrough button below reaches them today.'
}

export function SaralAi() {
  const [step, setStep] = useState<Step>('dept')
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'ai', text: HELLO }])
  const [typing, setTyping] = useState(true)
  const [dept, setDept] = useState<DeptId>('credit')
  const [picked, setPicked] = useState<ChallengeId[]>([])
  const [size, setSize] = useState('')
  const [who, setWho] = useState('')
  const [custom, setCustom] = useState<string[]>([]) // challenges in their own words
  const [q, setQ] = useState('')
  const [ready, setReady] = useState(false) // note revealed once its intro finishes typing
  const [thinking, setThinking] = useState(false) // dots before a reply starts typing
  useEffect(() => {
    if (msgs.length === 1) return
    setThinking(true)
    const id = window.setTimeout(() => setThinking(false), 700)
    return () => window.clearTimeout(id)
  }, [msgs.length])

  const say = (you: string, ai: string) => {
    setMsgs((m) => [...m, { from: 'you', text: you }, { from: 'ai', text: ai }])
    setTyping(true)
  }
  const reset = () => {
    setStep('dept')
    setMsgs([{ from: 'ai', text: HELLO }])
    setTyping(true)
    setPicked([])
    setSize('')
    setWho('')
    setCustom([])
    setQ('')
    setReady(false)
  }

  const chooseDept = (d: (typeof DEPARTMENTS)[number], label: string = d.label) => {
    setDept(d.id)
    setWho(label)
    if (d.id === 'other') {
      say(label, 'Good — then here’s the shortest honest version of what we believe about Indian credit.')
      setStep('note')
    } else {
      say(label, `${d.ask} Pick as many as you like, or type your own.`)
      setStep('challenges')
    }
  }
  const doneChallenges = () => {
    say([...CHALLENGES.filter((c) => picked.includes(c.id)).map((c) => c.label), ...custom].join(' · '), 'And roughly how big is the book?')
    setStep('size')
  }
  const chooseSize = (s: string) => {
    setSize(s)
    say(s, 'Here’s your note.')
    setStep('note')
  }
  const submitQ = async (e: FormEvent) => {
    e.preventDefault()
    const text = q.trim()
    if (!text) return
    setQ('')
    if (step === 'dept') chooseDept(DEPARTMENTS.find((d) => d.id === 'leadership')!, text)
    else if (step === 'challenges') setCustom((c) => [...c, text])
    else if (step === 'size') chooseSize(text)
    else say(text, await ask(text))
  }
  const PLACEHOLDER: Record<Step, string> = {
    dept: 'Or tell me in your own words…',
    challenges: 'Something else? Type it and press enter',
    size: 'Or type it…',
    note: 'Ask Saral AI anything about lending…',
  }

  const me = DEPARTMENTS.find((d) => d.id === dept)!
  const ordered = [...CHALLENGES].sort((a, b) => rank(me.first, a.id) - rank(me.first, b.id))
  const chosen = ordered.filter((c) => picked.includes(c.id))
  const note = [`Who: ${who}`, `Book: ${size}`, `Challenges: ${[...chosen.map((c) => c.label), ...custom].join('; ')}`].join('\n')
  const mail = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Saral AI note — 20-minute walkthrough')}&body=${encodeURIComponent(note + '\n\n')}`
  const idx = STEPS.indexOf(step)

  return (
    <Section id="saral-ai" tight>
      <Container>
        <FadeIn className="overflow-hidden rounded-[32px] bg-white shadow-lg">
          <div className="grid lg:grid-cols-[300px_1fr]">
            {/* who you're talking to */}
            <div className="border-b border-line bg-wash2 p-7 md:p-9 lg:border-b-0 lg:border-r">
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} className="relative grid size-14 place-items-center rounded-2xl bg-accent text-white shadow-glow">
                <Sparkles className="size-6" />
                <span className="absolute -right-1 -top-1 size-3 rounded-full bg-green ring-2 ring-white animate-pulse-ring" />
              </motion.div>
              <div className="mt-5 text-[22px] font-extrabold tracking-tight">Saral AI</div>
              <p className="mt-1 text-[14px] text-muted">An AI built for BFSI. Ask it about lending ops, RBI norms or your own bottleneck.</p>
              <ol className="mt-7 space-y-2 font-mono text-[10.5px] uppercase tracking-[0.12em]">
                {STEPS.map((s, i) => {
                  const done = i < idx
                  return (
                    <li key={s} className={`flex items-center gap-2 ${i === idx ? 'text-accent' : done ? 'text-ink' : 'text-hint'}`}>
                      <span className={`grid size-4 place-items-center rounded-full border ${done ? 'border-green bg-green text-white' : i === idx ? 'border-accent' : 'border-line2'}`}>
                        {done && (
                          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 18 }}>
                            <Check className="size-2.5" strokeWidth={4} />
                          </motion.span>
                        )}
                      </span>
                      {STEP_LABELS[i]}
                    </li>
                  )
                })}
              </ol>
              <p className="mt-7 font-mono text-[10.5px] uppercase tracking-[0.12em] text-hint">Nothing leaves your browser</p>
            </div>

            {/* the conversation */}
            <div className="p-5 sm:p-7 md:p-9">
              <div className="space-y-3">
                {msgs.map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 420, damping: 30 }} className={`flex ${m.from === 'you' ? 'justify-end' : ''}`}>
                    <div className={`max-w-[80%] rounded-3xl px-4 py-2.5 text-[15px] leading-snug ${m.from === 'you' ? 'rounded-br-md bg-ink text-white' : 'rounded-bl-md bg-wash2 text-ink'}`}>
                      {m.from === 'ai' && i === msgs.length - 1 ? (
                        thinking ? <Dots /> : <Typed key={i} text={m.text} onDone={() => { setTyping(false); if (step === 'note') setReady(true) }} />
                      ) : (
                        m.text
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* answers */}
              <AnimatePresence mode="wait">
                {!typing && step === 'dept' && (
                  <Chips key="dept">
                    {DEPARTMENTS.map((d) => (
                      <Chip key={d.id} onClick={() => chooseDept(d)}>
                        {d.label}
                      </Chip>
                    ))}
                  </Chips>
                )}
                {!typing && step === 'challenges' && (
                  <Chips key="ch">
                    {ordered.map((c) => {
                      const on = picked.includes(c.id)
                      return (
                        <Chip key={c.id} on={on} onClick={() => setPicked((p) => (on ? p.filter((x) => x !== c.id) : [...p, c.id]))}>
                          {on && <Check className="size-3.5" strokeWidth={3} />}
                          {c.label}
                        </Chip>
                      )
                    })}
                    {custom.map((t) => (
                      <Chip key={t} on onClick={() => setCustom((c) => c.filter((x) => x !== t))}>
                        <Check className="size-3.5" strokeWidth={3} />
                        {t}
                      </Chip>
                    ))}
                    <motion.button
                      type="button"
                      disabled={!picked.length && !custom.length}
                      onClick={doneChallenges}
                      variants={chip}
                      whileTap={{ scale: 0.96 }}
                      style={{ opacity: picked.length || custom.length ? 1 : 0.4 }}
                      className="rounded-full bg-accent px-5 py-2 text-[14px] font-semibold text-white disabled:cursor-not-allowed"
                    >
                      That’s it →
                    </motion.button>
                  </Chips>
                )}
                {!typing && step === 'size' && (
                  <Chips key="size">
                    {BOOK_SIZES.map((s) => (
                      <Chip key={s} onClick={() => chooseSize(s)}>
                        {s}
                      </Chip>
                    ))}
                  </Chips>
                )}
              </AnimatePresence>

              {ready && (dept === 'other' ? <Explainer /> : <Note who={`${who} · ${size} book`} chosen={chosen} custom={custom} mail={mail} />)}

              {!typing && (
                <form onSubmit={submitQ} className="mt-6 flex items-center gap-2 rounded-full bg-wash2 p-1.5 pl-5 ring-1 ring-line focus-within:ring-accent/50">
                  <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={PLACEHOLDER[step]} className="min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-hint" />
                  <button type="submit" aria-label="Ask" className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-white hover:bg-accent">
                    <ArrowUp className="size-4" />
                  </button>
                  <button type="button" onClick={reset} aria-label="Start over" className="grid size-9 shrink-0 place-items-center rounded-full text-muted hover:text-ink">
                    <RotateCcw className="size-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}

/* The note: lifecycle rail with hot stages, one tip per challenge, module
   fit, and the 30-day journey. */
function rank(first: readonly string[], id: string) {
  const i = first.indexOf(id)
  return i === -1 ? first.length : i
}

function Note({ who, chosen, custom, mail }: { who: string; chosen: (typeof CHALLENGES)[number][]; custom: string[]; mail: string }) {
  const hot = new Set<number>(chosen.map((c) => c.stage))
  const mods = MODULES.filter((m) => chosen.some((c) => c.module === m.code))
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mt-6 space-y-6 rounded-3xl bg-bg p-5 ring-1 ring-line md:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="text-[17px] font-extrabold tracking-tight">Your note</div>
        <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-hint">{who}</div>
      </div>
      <div>
        <div className="eyebrow mb-3">Where it hurts</div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {STAGES.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className={`rounded-xl px-2 py-2.5 text-center text-[12.5px] font-semibold ${hot.has(i) ? 'bg-accent text-white shadow-glow animate-pulse-ring' : 'bg-white text-hint'}`}
            >
              {s}
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <div className="eyebrow mb-3">Do this quarter, with or without us</div>
        <ul className="space-y-2">
          {chosen.map((c, i) => (
            <motion.li key={c.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.12 }} className="rounded-2xl bg-white p-4 text-[14px] leading-snug">
              <div className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-hint">{c.label}</div>
              {c.tip}
              {'next' in c && (
                <Link to={c.next.to} className="mt-2 flex w-fit items-center gap-1 text-[13px] font-semibold text-accent hover:underline">
                  {c.next.label} <ArrowRight className="size-3.5" />
                </Link>
              )}
            </motion.li>
          ))}
          {custom.map((t, i) => (
            <motion.li key={t} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + (chosen.length + i) * 0.12 }} className="rounded-2xl bg-white p-4 text-[14px] leading-snug ring-1 ring-accent/30">
              <div className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-accent">In your words</div>
              “{t}” — this one we take up on the walkthrough; it goes to the founders with your note.
            </motion.li>
          ))}
        </ul>
      </div>

      {mods.length > 0 && (
        <div>
          <div className="eyebrow mb-3">Where Saralya fits</div>
          <div className="flex flex-wrap gap-2">
            {mods.map((m) => (
              <Link key={m.code} to={`/products#${m.code}`} className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold ${m.wash} ${m.color}`}>
                <m.icon className="size-3.5" /> {m.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="eyebrow mb-3">Your first 30 days</div>
        <ol className="grid gap-3 sm:grid-cols-3">
          {ONBOARDING.map((o, i) => (
            <motion.li key={o.day} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.1 }} className="rounded-2xl bg-white p-4">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-accent">{o.day}</div>
              <div className="mt-1 text-[14.5px] font-bold">{o.title}</div>
              <p className="mt-1 text-[13px] text-muted">{o.body}</p>
            </motion.li>
          ))}
        </ol>
        <div className="mt-4 flex flex-wrap gap-3">
          <ButtonLink to={mail} variant="primary" size="lg" arrow>
            Start with the walkthrough
          </ButtonLink>
          <ButtonLink to="/home" variant="ghost" size="lg">
            Explore Saralya
          </ButtonLink>
        </div>
      </div>
    </motion.div>
  )
}

/* For investors and the curious: what we believe, then where to go next. */
function Explainer() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-3">
      {CONVICTIONS.map((c, i) => (
        <motion.div key={c.n} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.12 }} className="rounded-2xl bg-bg p-4 ring-1 ring-line">
          <div className="text-[15px] font-bold">{c.title}</div>
          <p className="mt-1 text-[13.5px] text-muted">{c.body}</p>
        </motion.div>
      ))}
      <div className="flex flex-wrap gap-3 pt-2">
        <ButtonLink to="/home" variant="ink" arrow>
          Explore Saralya
        </ButtonLink>
        <ButtonLink to="/about" variant="ghost">
          Who’s behind it
        </ButtonLink>
      </div>
    </motion.div>
  )
}

const chip = { hidden: { opacity: 0, y: 8, scale: 0.94 }, show: { opacity: 1, y: 0, scale: 1 } }

function Chips({ children }: { children: ReactNode }) {
  return (
    <motion.div initial="hidden" animate="show" exit={{ opacity: 0, transition: { duration: 0.15 } }} transition={{ staggerChildren: 0.045 }} className="mt-4 flex flex-wrap gap-2">
      {children}
    </motion.div>
  )
}

/* Three dots that breathe while Saral AI thinks. */
function Dots() {
  return (
    <span className="flex h-[21px] items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="size-1.5 rounded-full bg-accent" animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
      ))}
    </span>
  )
}

function Chip({ children, on, onClick }: { children: ReactNode; on?: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      variants={chip}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      aria-pressed={on}
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-medium ring-1 transition-colors ${
        on ? 'bg-ink text-white ring-ink' : 'bg-white text-ink ring-line hover:bg-wash2 hover:ring-accent/40'
      }`}
    >
      {children}
    </motion.button>
  )
}

/* Types the text out; instant under reduced motion. */
function Typed({ text, onDone }: { text: string; onDone: () => void }) {
  const reduced = useReducedMotion()
  const [n, setN] = useState(reduced ? text.length : 0)
  useEffect(() => {
    if (n >= text.length) {
      onDone()
      return
    }
    const id = window.setTimeout(() => setN(n + 2), 14)
    return () => window.clearTimeout(id)
  }, [n, text, onDone])
  return <>{text.slice(0, n)}</>
}
