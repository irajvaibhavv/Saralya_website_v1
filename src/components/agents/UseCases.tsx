import { ArrowUpRight, Check, Mic, Phone } from 'lucide-react'
import { animate, AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { useEffect, useState } from 'react'
import { BoardPack } from './BoardPack'
import { USE_CASES, type Screen } from '../../content/use-cases'
import { CONTACT_EMAIL } from '../../content/site'
import { WAVE } from './Platform'
import { FadeIn } from '../ui/Reveal'
import { Container, Section } from '../ui/Section'

/* The agents, one at a time, each with the screen it works on. The tabs
   move on their own every few seconds — the visitor who waits sees all
   five; the visitor who clicks takes over and the wait restarts. */

/** how long one agent holds the stage */
const DWELL = 3200

/** how long one view of the board pack holds */
const BOARD = 2400

export function UseCases() {
  const [i, setI] = useState(0)
  const still = useReducedMotion()
  const u = USE_CASES[i]

  /* the board agent has four views of its own to get through, so it holds
     the stage for all four rather than being cut off after the first */
  const boards = 4
  const dwell = u.board ? BOARD * boards : DWELL

  useEffect(() => {
    if (still) return
    const id = window.setTimeout(() => setI((n) => (n + 1) % USE_CASES.length), dwell)
    return () => window.clearTimeout(id)
  }, [still, i, dwell])

  return (
    <Section tight id="use-cases">
      <Container>
        <FadeIn className="text-center">
          <h2 className="display mx-auto text-h3 md:whitespace-nowrap md:text-h2">
            End-to-end agentic <span className="text-accent">use cases for lenders</span>.
          </h2>
        </FadeIn>

        {/* the tabs, as a rule with one lit */}
        <div role="tablist" aria-label="Our agents" className="mt-6 flex flex-wrap justify-center gap-x-7 gap-y-2 border-b border-line">
          {USE_CASES.map((x, n) => {
            const on = n === i
            return (
              <button
                key={x.id}
                role="tab"
                aria-selected={on}
                type="button"
                onClick={() => setI(n)}
                className={`relative -mb-px pb-2.5 text-small font-semibold transition-colors ${on ? 'text-ink' : 'text-muted hover:text-ink'}`}
              >
                {x.tab}
                {on && (
                  <motion.span
                    layoutId="use-case-rule"
                    className="absolute inset-x-0 -bottom-px block h-0.5 bg-accent"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={u.id}
              initial={still ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.35 }}
              className="lg:pt-10"
            >
              <h3 className="display max-w-[22ch] text-h3 md:text-h2">{u.title}</h3>
              <ul className="mt-5 space-y-3">
                {u.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-small leading-relaxed text-ink2">
                    <Check className="mt-1 size-4 shrink-0 text-accent" strokeWidth={2.2} />
                    {p}
                  </li>
                ))}
              </ul>

              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Demo: ${u.tab}`)}`}
                className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 font-mono text-small uppercase tracking-[0.1em] text-white transition-colors hover:bg-accent2"
              >
                Ask for a demo
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} />
              </a>
            </motion.div>
          </AnimatePresence>

          <div className={`relative grid place-items-center overflow-hidden rounded-3xl bg-accent ring-1 ring-ink/10 p-7`}>
            <span aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: WAVE }} />
            <span aria-hidden className="pointer-events-none absolute -left-20 -top-24 size-64 rounded-full bg-white/20 blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={u.id}
                initial={still ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.4 }}
                className={u.board ? 'w-full' : ''}
              >
                {u.board ? <BoardPack every={BOARD} /> : <PhoneScreen screen={u.screen} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/* The phone: a frame, the agent's work as rows, and the agent speaking at
   the foot of it. A recording drops into the same frame when one exists. */
function PhoneScreen({ screen }: { screen: Screen }) {
  const still = useReducedMotion()
  /* the rows run while the agent holds the stage, so the frame reads as a
     recording rather than a still */
  const [step, setStep] = useState(still ? screen.rows.length : 0)
  useEffect(() => {
    if (still) return
    const id = window.setInterval(() => setStep((n) => Math.min(n + 1, screen.rows.length)), DWELL / (screen.rows.length + 1))
    return () => window.clearInterval(id)
  }, [still, screen])

  return (
    <div className="relative">
      {/* the rim: an accent halo behind the handset, so it reads as lit */}
      <div aria-hidden className="pointer-events-none absolute -inset-8 rounded-[3.5rem] bg-white/50 blur-3xl" />
      <div className="relative w-[300px] rounded-[2.6rem] bg-ink p-2.5 shadow-[0_40px_80px_-30px_rgba(13,22,20,0.75)] ring-1 ring-white/30">
      <div className="overflow-hidden rounded-[2.1rem] bg-white">
        <div className="flex items-center justify-between px-4 pb-2 pt-3">
          <span className="font-mono text-label text-hint">9:41</span>
          <span className="h-4 w-16 rounded-full bg-ink" />
          <span className="font-mono text-label text-hint">5G</span>
        </div>

        <div className="flex items-center gap-2 bg-gradient-to-r from-accent/15 to-transparent px-4 py-2.5">
          <span className="grid size-6 place-items-center rounded-md bg-accent text-white">
            <span className="font-mono text-label">S</span>
          </span>
          <span className="text-small font-semibold text-accent2">{screen.app}</span>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-white px-2 py-0.5 ring-1 ring-line2">
            <span className="size-1.5 rounded-full bg-green" />
            <span className="font-mono text-label text-muted">Live</span>
          </span>
        </div>

        <div className="min-h-[382px] border-t border-line2 px-4 py-3.5">
          <div className="text-small font-semibold leading-snug">{screen.title}</div>
          <div className="mt-1 line-clamp-1 font-mono text-label text-hint">{screen.sub}</div>

          <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-wash">
            <motion.span
              className="block h-1 rounded-full bg-accent"
              initial={{ width: still ? '100%' : '6%' }}
              animate={{ width: `${Math.round(((step + 1) / (screen.rows.length + 1)) * 100)}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          <ul className="mt-3 space-y-2">
            {screen.rows.map((r, i) => {
              const state = i < step ? 'done' : i === step ? 'live' : 'wait'
              return (
                <li
                  key={r.label}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-small leading-snug transition-colors ${
                    state === 'live' ? 'bg-wash text-ink ring-1 ring-accent/40' : state === 'done' ? 'bg-white text-ink2 ring-1 ring-line2' : 'bg-white text-hint ring-1 ring-line2'
                  }`}
                >
                  {state === 'done' ? (
                    <Check className="size-3.5 shrink-0 text-green" strokeWidth={2.4} />
                  ) : state === 'live' ? (
                    <motion.span
                      className="size-2 shrink-0 rounded-full bg-accent"
                      animate={still ? {} : { scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  ) : (
                    <span className="size-2 shrink-0 rounded-full ring-1 ring-line" />
                  )}
                  <span className="truncate">{r.label}</span>
                </li>
              )
            })}
          </ul>

          {/* the agent speaks once it has read the file; the room for the
              line is held from the start so nothing below it moves */}
          <div className="mt-2.5 min-h-[72px]">
          <AnimatePresence>
            {step >= screen.rows.length - 1 &&
              (screen.verdict ? (
                <Verdict key="verdict" verdict={screen.verdict} says={screen.says} still={!!still} />
              ) : (
                <motion.p
                  key="says"
                  initial={still ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl bg-wash2 px-3 py-2 text-small leading-relaxed text-ink2"
                >
                  {screen.says}
                </motion.p>
              ))}
          </AnimatePresence>
          </div>
        </div>

        {/* the agent on the line */}
        <div className="m-2.5 flex items-center gap-2.5 rounded-xl bg-ink px-2.5 py-2 text-white">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent">
            <Phone className="size-3.5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-small font-semibold leading-tight">{screen.agent}</span>
            <span className="block font-mono text-label text-white/60">Speaking</span>
          </span>
          <span className="flex items-end gap-0.5">
            {[0, 1, 2, 3].map((n) => (
              <motion.span
                key={n}
                className="w-0.5 rounded-full bg-accent3"
                animate={still ? { height: 8 } : { height: [5, 13, 7, 11, 5] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: n * 0.12 }}
              />
            ))}
          </span>
          <Mic className="size-3.5 text-white/70" />
        </div>
      </div>
      </div>
    </div>
  )
}

/* The decision lands the way it landed in the old live demo: the dial
   fills, the score counts up to it, and the call arrives on a green pill. */
const R = 26
const C = 2 * Math.PI * R

function Verdict({ verdict, says, still }: { verdict: NonNullable<Screen['verdict']>; says: string; still: boolean }) {
  const n = useMotionValue(still ? verdict.score : 0)
  const score = useTransform(n, (v) => Math.round(v))
  useEffect(() => {
    if (still) return
    const run = animate(n, verdict.score, { duration: 1.2, ease: [0.22, 1, 0.36, 1] })
    return () => run.stop()
  }, [n, still, verdict.score])

  return (
    <motion.div
      initial={still ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3 rounded-xl bg-wash2 px-3 py-2"
    >
      <div className="relative size-[60px] shrink-0">
        <svg width="60" height="60" viewBox="0 0 60 60" className="-rotate-90">
          <circle cx="30" cy="30" r={R} fill="none" stroke="var(--color-line)" strokeWidth="6" />
          <motion.circle
            cx="30"
            cy="30"
            r={R}
            fill="none"
            stroke="url(#verdict-dial)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: still ? C - C * (verdict.score / verdict.of) : C }}
            animate={{ strokeDashoffset: C - C * (verdict.score / verdict.of) }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <defs>
            <linearGradient id="verdict-dial" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="var(--color-accent)" />
              <stop offset="1" stopColor="var(--color-accent3)" />
            </linearGradient>
          </defs>
        </svg>
        <motion.span className="display absolute inset-0 grid place-items-center text-small tabular-nums">{score}</motion.span>
      </div>

      <div className="min-w-0">
        <motion.span
          initial={still ? false : { scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-green px-2.5 py-1 text-label font-bold text-white"
        >
          <Check className="size-3" strokeWidth={3} /> {verdict.call}
        </motion.span>
        <span className="mt-1 block line-clamp-2 text-label leading-snug text-ink2">{says}</span>
      </div>
    </motion.div>
  )
}
