import { Check, CheckCheck, Mic, Video } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

/* What the four tracks look like while they run, built rather than filmed:
   the WhatsApp journey that opens a file, the AI personal discussion, and
   the portfolio-quality monitor. Each one loops.

   TODO(Vishal): these stand in for the recordings. When a clip exists, set
   `video` on that track in content/agent-platform.ts and the panel plays it
   instead of this. */

/** one beat of every mock, so the three keep the same pulse */
const BEAT = 1100

function useBeats(n: number, pause = 2) {
  const still = useReducedMotion()
  const [i, setI] = useState(still ? n : 0)
  useEffect(() => {
    if (still) return
    const id = window.setInterval(() => setI((x) => (x + 1) % (n + pause)), BEAT)
    return () => window.clearInterval(id)
  }, [still, n, pause])
  return Math.min(i, n)
}

export function TrackMock({ id }: { id: 'app' | 'workflow' | 'analytics' | 'custom' }) {
  if (id === 'app') return <Whatsapp />
  if (id === 'workflow') return <Interview />
  if (id === 'custom') return <Custom />
  return <Pqm />
}

/* ── the borrower journey, on the channel they already have ───────────── */

const THREAD: { from: 'them' | 'us'; text: string }[] = [
  { from: 'them', text: 'Namaste 🙏 I want a loan for my shop' },
  { from: 'us', text: 'Of course. What is the shop’s monthly sale, roughly?' },
  { from: 'them', text: 'Around ₹3.5 lakh' },
  { from: 'us', text: 'Thank you. PAN and the shop’s pin code?' },
  { from: 'them', text: 'ABCDE1234F · 250001' },
]

function Whatsapp() {
  const step = useBeats(THREAD.length + 1, 3)
  return (
    <Phone label="WhatsApp · Saralya">
      <div className="flex min-h-[392px] flex-col gap-2 bg-gradient-to-b from-wash to-wash2 px-3.5 py-3.5">
        {THREAD.slice(0, step).map((m) => (
          <motion.div
            key={m.text}
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`max-w-[86%] rounded-2xl px-3 py-2 text-small leading-snug shadow-sm ${
              m.from === 'us' ? 'ml-auto rounded-br-sm bg-green-w text-ink' : 'rounded-bl-sm bg-white text-ink'
            }`}
          >
            {m.text}
            {m.from === 'us' && <CheckCheck className="ml-1.5 inline size-3 text-accent" />}
          </motion.div>
        ))}

        {step > THREAD.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-auto rounded-2xl bg-ink px-3.5 py-3 text-white"
          >
            <div className="font-mono text-label uppercase tracking-[0.12em] text-accent3">File opened</div>
            <div className="mt-1.5 text-small font-semibold leading-snug">Continue on Saralya →</div>
            <div className="mt-1 text-small text-white/60">Everything you typed is already filled in.</div>
          </motion.div>
        )}
      </div>
    </Phone>
  )
}

/* ── the personal discussion, run by an agent with a face ─────────────── */

const SAID = [
  'Tell me about the shop. How many years at this counter?',
  'Eleven years, sir. My father ran it before me.',
  'Your bank credits read ₹41,000 a month. Which months are cash sales?',
  'Festive months, mostly. October and March are the big ones.',
]

function Interview() {
  const step = useBeats(SAID.length, 2)
  const still = useReducedMotion()
  const line = SAID[Math.max(0, step - 1)]
  const theirs = step % 2 === 0
  return (
    <Phone label="Saral Saarthi · PD">
      <div className="relative min-h-[392px] bg-ink">
        {/* the agent, in the frame */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-ink to-ink" />
        <div className="relative flex h-full flex-col items-center px-4 pt-7">
          <motion.span
            className="grid size-24 place-items-center rounded-full bg-accent text-white ring-4 ring-white/15"
            animate={still ? {} : { scale: theirs ? 1 : [1, 1.04, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
          >
            <Video className="size-9" strokeWidth={1.6} />
          </motion.span>
          <div className="mt-2.5 text-small font-semibold text-white">Saarthi · AI interviewer</div>
          <div className="flex items-center gap-1.5 font-mono text-label text-white/60">
            <span className="size-1.5 rounded-full bg-red" /> Recording · 04:12
          </div>

          {/* the borrower's own tile */}
          <div className="mt-3 flex w-full items-center gap-2 rounded-xl bg-white/10 px-2.5 py-2 text-white">
            <span className="size-7 shrink-0 rounded-lg bg-white/20" />
            <span className="min-w-0 flex-1 truncate text-small">Ramesh · Meerut</span>
            <span className="flex items-end gap-0.5">
              {[0, 1, 2, 3].map((n) => (
                <motion.span
                  key={n}
                  className="w-0.5 rounded-full bg-accent3"
                  animate={still ? { height: 7 } : { height: theirs ? [4, 12, 6, 10, 4] : 4 }}
                  transition={{ duration: 1, repeat: Infinity, delay: n * 0.1 }}
                />
              ))}
            </span>
            <Mic className="size-3.5 text-white/70" />
          </div>

          <motion.p
            key={line}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 w-full rounded-xl bg-white/95 px-3 py-2.5 text-small leading-relaxed text-ink"
          >
            <span className="mb-0.5 block font-mono text-label uppercase tracking-[0.12em] text-accent">
              {theirs ? 'Borrower' : 'Saarthi'}
            </span>
            {line}
          </motion.p>
        </div>
      </div>
    </Phone>
  )
}

/* ── the book, read every morning ─────────────────────────────────────── */

const PILLARS = [
  { label: 'Delinquency', weight: '30%', fill: 0.82 },
  { label: 'Momentum', weight: '20%', fill: 0.64 },
  { label: 'New business', weight: '15%', fill: 0.71 },
  { label: 'Concentration', weight: '15%', fill: 0.48 },
]

function Pqm() {
  const step = useBeats(PILLARS.length, 3)
  const still = useReducedMotion()
  return (
    <div className="w-[460px] max-w-full overflow-hidden rounded-2xl bg-white shadow-[0_40px_80px_-30px_rgba(13,22,20,0.6)] ring-1 ring-white/40">
      {/* the browser */}
      <div className="flex items-center gap-2 border-b border-line2 bg-wash2 px-3 py-2">
        <span className="flex gap-1">
          {['bg-red', 'bg-amber', 'bg-green'].map((c) => (
            <span key={c} className={`size-2 rounded-full ${c} opacity-70`} />
          ))}
        </span>
        <span className="mx-auto rounded-full bg-white px-3 py-0.5 font-mono text-label text-muted ring-1 ring-line2">
          portfolio quality monitor
        </span>
      </div>

      <div className="px-4 py-3.5">
        <div className="flex items-baseline justify-between gap-3">
          <div className="text-small font-semibold">Portfolio Quality Index</div>
          <span className="font-mono text-label text-hint">Oct 2026</span>
        </div>

        {/* the index, counting into place */}
        <div className="mt-3 flex items-center gap-4">
          <div className="relative grid size-20 shrink-0 place-items-center">
            <svg viewBox="0 0 40 40" className="size-20 -rotate-90">
              <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" className="text-wash" strokeWidth="5" />
              <motion.circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="currentColor"
                className="text-accent"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={100}
                initial={{ pathLength: still ? 0.74 : 0 }}
                animate={{ pathLength: 0.74 }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
              />
            </svg>
            <span className="absolute text-body font-semibold">74</span>
          </div>

          <ul className="min-w-0 flex-1 space-y-1.5">
            {PILLARS.map((p, i) => (
              <li key={p.label} className="flex items-center gap-2">
                <span className={`w-[92px] shrink-0 truncate text-small ${i < step ? 'text-ink2' : 'text-hint'}`}>{p.label}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-wash">
                  <motion.span
                    className="block h-1.5 rounded-full bg-accent"
                    initial={{ width: still ? `${p.fill * 100}%` : 0 }}
                    animate={{ width: i < step ? `${p.fill * 100}%` : 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </span>
                <span className="font-mono text-label text-hint">{p.weight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* what moved, in status colour only */}
        <div className="mt-3.5 grid grid-cols-3 gap-2">
          {[
            { k: 'SMA-0', v: '9.0%', tone: 'text-amber' },
            { k: 'SMA-2', v: '1.8%', tone: 'text-red' },
            { k: 'Current', v: '86.0%', tone: 'text-green' },
          ].map((m) => (
            <div key={m.k} className="rounded-lg bg-wash2 px-2.5 py-2">
              <div className="font-mono text-label uppercase tracking-[0.1em] text-hint">{m.k}</div>
              <div className={`mt-0.5 text-small font-semibold ${m.tone}`}>{m.v}</div>
            </div>
          ))}
        </div>

        <p className="mt-3 rounded-lg bg-wash px-3 py-2 text-small leading-relaxed text-ink2">
          FY24 Q2 is ageing twice as fast as the rest. Eleven accounts carry most of it.
        </p>
      </div>
    </div>
  )
}

/* ── a problem, said once, assembled into an agent ────────────────── */

const BUILD = [
  { k: 'Reads', v: 'Ledger · NACH returns · promise-to-pay log' },
  { k: 'Decides', v: 'Who to call today, in what order' },
  { k: 'Writes', v: 'The call list, into the collections queue' },
  { k: 'Stops at', v: 'Any waiver, which stays with the manager' },
]

function Custom() {
  const step = useBeats(BUILD.length + 1, 3)
  return (
    <div className="w-[460px] max-w-full overflow-hidden rounded-2xl bg-white shadow-[0_40px_80px_-30px_rgba(13,22,20,0.6)] ring-1 ring-white/40">
      <div className="flex items-center gap-2 border-b border-line2 bg-wash2 px-3 py-2">
        <span className="flex gap-1">
          {['bg-red', 'bg-amber', 'bg-green'].map((c) => (
            <span key={c} className={`size-2 rounded-full ${c} opacity-70`} />
          ))}
        </span>
        <span className="mx-auto rounded-full bg-white px-3 py-0.5 font-mono text-label text-muted ring-1 ring-line2">
          build an agent
        </span>
      </div>

      <div className="px-4 py-3.5">
        {/* what the lender said */}
        <div className="font-mono text-label uppercase tracking-[0.14em] text-hint">Your problem</div>
        <p className="mt-1.5 rounded-xl bg-wash px-3 py-2.5 text-small leading-snug text-ink">
          “Nobody gets to the 1–30 bucket before it rolls. I want the calls made the day a payment breaks.”
        </p>

        <div className="mt-3.5 font-mono text-label uppercase tracking-[0.14em] text-hint">Assembling</div>
        <ul className="mt-1.5 space-y-1.5">
          {BUILD.map((b, i) => {
            const on = i < step
            return (
              <li
                key={b.k}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 ring-1 transition-colors ${
                  on ? 'bg-white ring-line2' : 'bg-wash2/60 ring-transparent'
                }`}
              >
                <span
                  className={`grid size-5 shrink-0 place-items-center rounded-full transition-colors ${
                    on ? 'bg-accent text-white' : 'bg-line2 text-white'
                  }`}
                >
                  <Check className="size-3" strokeWidth={3} />
                </span>
                <span className={`w-[68px] shrink-0 font-mono text-label uppercase tracking-[0.1em] ${on ? 'text-accent2' : 'text-hint'}`}>
                  {b.k}
                </span>
                <span className={`min-w-0 flex-1 truncate text-small ${on ? 'text-ink2' : 'text-hint'}`}>{b.v}</span>
              </li>
            )
          })}
        </ul>

        <motion.div
          initial={false}
          animate={{ opacity: step > BUILD.length ? 1 : 0.25 }}
          transition={{ duration: 0.3 }}
          className="mt-3 flex items-center gap-2.5 rounded-xl bg-ink px-3.5 py-3 text-white"
        >
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-label uppercase tracking-[0.12em] text-accent3">Agent ready</span>
            <span className="block text-small font-semibold leading-snug">Bucket-1 recovery agent</span>
          </span>
          <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 font-mono text-label">Runs 7:00 daily</span>
        </motion.div>
      </div>
    </div>
  )
}

/* The frame the two phone mocks share. */
function Phone({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      <div aria-hidden className="pointer-events-none absolute -inset-8 rounded-[3.5rem] bg-white/50 blur-3xl" />
      <div className="relative w-[310px] rounded-[2.6rem] bg-ink p-2.5 shadow-[0_40px_80px_-30px_rgba(13,22,20,0.75)] ring-1 ring-white/30">
        <div className="overflow-hidden rounded-[2.1rem] bg-white">
          <div className="flex items-center justify-between px-4 pb-2 pt-3">
            <span className="font-mono text-label text-hint">9:41</span>
            <span className="h-4 w-16 rounded-full bg-ink" />
            <span className="font-mono text-label text-hint">5G</span>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-accent/15 to-transparent px-4 py-2">
            <span className="grid size-6 place-items-center rounded-md bg-accent text-white">
              <span className="font-mono text-label">S</span>
            </span>
            <span className="truncate text-small font-semibold text-accent2">{label}</span>
            <span className="ml-auto flex items-center gap-1.5 rounded-full bg-white px-2 py-0.5 ring-1 ring-line2">
              <span className="size-1.5 rounded-full bg-green" />
              <span className="font-mono text-label text-muted">Live</span>
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
