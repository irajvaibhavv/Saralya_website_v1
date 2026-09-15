import { ArrowRight, ArrowUp, Check, Lock, RotateCcw, Sparkles } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { FormEvent, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BOOK_SIZES, CHALLENGES, CONTACT_EMAIL, CONVICTIONS, DEPARTMENTS, MODULES, ONBOARDING, STAGES, STARTERS, type ChallengeId, type DeptId } from '../../content/site'
import { ButtonLink } from '../ui/Button'

/* Saral AI, the landing chat. Two ways in: a starter question (scripted
   answer from site facts) or "Get a note for my NBFC", the guided diagnostic
   that ends in a personal note. `ask()` is where the model plugs in. */

type Msg = { from: 'ai' | 'you'; text: string; link?: { to: string; label: string } }
type Step = 'idle' | 'dept' | 'challenges' | 'size' | 'note'
const FLOW: Step[] = ['dept', 'challenges', 'size', 'note']

const HELLO = 'Hi, I’m Saral. I can help with credit risk, collections, RBI norms, lending products, compliance, or anything about our platform. What would you like to know?'

// TODO: point at the model endpoint once it is exposed.
async function ask(_q: string): Promise<string> {
  return 'That one needs the full model, which is being wired in. For now the founders read every question. Use “Talk to a human” and it reaches them today.'
}

const CHIPS = STARTERS.slice(0, 6) // the rest are reachable from the rolling strip on the landing

export function SaralAi({ seed }: { seed?: { q: string; n: number } }) {
  const [step, setStep] = useState<Step>('idle')
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

  const say = (you: string, ai: string, link?: Msg['link']) => {
    setMsgs((m) => [...m, { from: 'you', text: you }, { from: 'ai', text: ai, link }])
    setTyping(true)
  }
  const reset = () => {
    setStep('idle')
    setMsgs([{ from: 'ai', text: HELLO }])
    setTyping(true)
    setPicked([])
    setSize('')
    setWho('')
    setCustom([])
    setQ('')
    setReady(false)
  }

  const starter = (s: (typeof STARTERS)[number]) => {
    if (s.note) {
      say(s.q, 'Happy to. Three quick questions and I’ll leave you with a note you can act on. First, what do you do?')
      setStep('dept')
    } else say(s.q, s.a, s.link)
  }
  // a question handed in from outside (the rolling strip on the landing)
  useEffect(() => {
    if (!seed) return
    const s = STARTERS.find((x) => x.q === seed.q)
    if (s) starter(s)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed?.n])

  // the composer suggests questions by typing them out while nothing has been asked
  const [focused, setFocused] = useState(false)
  const hint = useTypedHint(step === 'idle' && !q && !focused)
  const chooseDept = (d: (typeof DEPARTMENTS)[number], label: string = d.label) => {
    setDept(d.id)
    setWho(label)
    if (d.id === 'other') {
      say(label, 'Good. Here’s the shortest honest version of what we believe about Indian credit.')
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
    idle: 'Ask a question…',
    dept: 'Or tell me in your own words…',
    challenges: 'Something else? Type it and press enter',
    size: 'Or type it…',
    note: 'Ask a follow-up…',
  }

  const me = DEPARTMENTS.find((d) => d.id === dept)!
  const ordered = [...CHALLENGES].sort((a, b) => rank(me.first, a.id) - rank(me.first, b.id))
  const chosen = ordered.filter((c) => picked.includes(c.id))
  const note = [`Who: ${who}`, `Book: ${size}`, `Challenges: ${[...chosen.map((c) => c.label), ...custom].join('; ')}`].join('\n')
  const mail = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Saral AI note: 20-minute walkthrough')}&body=${encodeURIComponent(note + '\n\n')}`
  const idx = FLOW.indexOf(step)
  const pane = useRef<HTMLDivElement>(null) // the scrolling part of the chat; scrolled directly so the page never moves
  useEffect(() => {
    const el = pane.current
    if (!el || msgs.length === 1) return
    const target = el.querySelector<HTMLElement>('#your-note')
    el.scrollTo({ top: ready && target ? target.offsetTop - el.offsetTop - 8 : el.scrollHeight, behavior: 'smooth' })
  }, [msgs.length, typing, ready])

  return (
    <div id="saral-ai" className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg">
      {/* header */}
      <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-4 sm:px-6">
        <motion.span animate={focused ? { scale: 1.08, rotate: -6 } : { y: [0, -3, 0] }} transition={focused ? { type: 'spring', stiffness: 300, damping: 14 } : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-white">
          <Sparkles className="size-5" />
        </motion.span>
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[17px] font-extrabold tracking-tight">
            Saral AI <span className="size-2 rounded-full bg-green animate-pulse-ring" />
          </div>
          <div className="text-[13px] text-muted">Your lending copilot</div>
        </div>
        <div className="ml-auto hidden items-center gap-1.5 2xl:flex">
          {idx >= 0 ? (
            FLOW.map((s, i) => <span key={s} className={`size-2 rounded-full ${i < idx ? 'bg-green' : i === idx ? 'bg-accent' : 'bg-line2'}`} />)
          ) : (
            <span className="rounded-lg bg-bg px-3 py-1.5 text-[12.5px] text-ink2 ring-1 ring-line">Trained on RBI guidelines, credit ops, collections and more</span>
          )}
        </div>
      </div>

      {/* conversation */}
      <div ref={pane} className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6">
        <div className="space-y-3">
          {msgs.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 420, damping: 30 }} className={`flex items-start gap-3 ${m.from === 'you' ? 'justify-end' : ''}`}>
              {m.from === 'ai' && (
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-white">
                  <Sparkles className="size-4" />
                </span>
              )}
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${m.from === 'you' ? 'rounded-tr-md bg-ink text-white' : 'rounded-tl-md bg-bg text-ink'}`}>
                {m.from === 'ai' && i === msgs.length - 1 ? (
                  thinking ? <Dots /> : <Typed key={i} text={m.text} onDone={() => { setTyping(false); if (step === 'note') setReady(true) }} />
                ) : (
                  m.text
                )}
                {m.link && !(i === msgs.length - 1 && (thinking || typing)) && (
                  <Link to={m.link.to} className="mt-2 flex w-fit items-center gap-1 text-[13.5px] font-semibold text-accent hover:underline">
                    {m.link.label} <ArrowRight className="size-3.5" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!typing && step === 'idle' && (
            <Chips key="idle">
              {CHIPS.map((s) => (
                <Chip key={s.q} onClick={() => starter(s)}>
                  {s.q}
                </Chip>
              ))}
            </Chips>
          )}
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
                className="rounded-lg bg-accent px-4 py-2 text-[14px] font-semibold text-white disabled:cursor-not-allowed"
              >
                Continue{picked.length + custom.length ? ` with ${picked.length + custom.length}` : ''} →
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
      </div>

      {/* composer */}
      <div className="border-t border-line p-4 sm:px-6">
        <form onSubmit={submitQ} className="flex items-center gap-2 rounded-xl bg-white p-1.5 pl-4 ring-1 ring-line focus-within:ring-accent">
          <input value={q} onChange={(e) => setQ(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} disabled={typing} placeholder={step === 'idle' && !focused ? hint : PLACEHOLDER[step]} className="min-w-0 flex-1 bg-transparent text-[14.5px] outline-none placeholder:text-hint disabled:opacity-60" />
          {msgs.length > 1 && (
            <button type="button" onClick={reset} aria-label="Start over" className="grid size-9 shrink-0 place-items-center rounded-lg text-muted hover:text-ink">
              <RotateCcw className="size-4" />
            </button>
          )}
          <button type="submit" aria-label="Send" disabled={typing} className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-white hover:bg-accent2 disabled:opacity-50">
            <ArrowUp className="size-4" />
          </button>
        </form>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[12.5px] text-muted">
          <span className="flex items-center gap-1.5">
            <Lock className="size-3.5" /> Nothing you type here leaves your browser or trains any external model.
          </span>
          <Link to="/privacy" className="font-medium text-accent hover:underline">
            See disclaimer
          </Link>
        </div>
      </div>
    </div>
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
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} id="your-note" className="mt-6 space-y-6 rounded-3xl bg-bg p-5 ring-1 ring-line md:p-7">
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
              “{t}”: this one we take up on the walkthrough; it goes to the founders with your note.
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
      className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[14px] font-medium ring-1 transition-colors ${
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

/* Types example questions into the composer, one after another. */
function useTypedHint(on: boolean) {
  const [text, setText] = useState('Ask a question…')
  useEffect(() => {
    if (!on) return
    const qs = STARTERS.filter((s) => !s.note).map((s) => s.q)
    let qi = 0
    let n = 0
    let dir = 1
    let id = 0
    const tick = () => {
      const full = qs[qi]
      n += dir
      setText(full.slice(0, n) + (n < full.length ? '|' : ''))
      let wait = 38
      if (dir === 1 && n >= full.length) {
        dir = -1
        wait = 1800
      } else if (dir === -1 && n <= 0) {
        dir = 1
        qi = (qi + 1) % qs.length
        wait = 400
      } else if (dir === -1) wait = 14
      id = window.setTimeout(tick, wait)
    }
    id = window.setTimeout(tick, 900)
    return () => window.clearTimeout(id)
  }, [on])
  return on ? text : 'Ask a question…'
}
