import { Check, CheckCheck, Flag, Mic, Video } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import type { Track } from '../../content/agent-platform'

/* Animated mock-ups of each platform track, used until real recordings exist.
   Each track has one screen per row, so the device shows what the open row
   describes. A screen opens with its first items already in place and reveals
   the rest, so the device is never blank.
   TODO(content): when a recording is ready, set `video` on its track in
   content/agent-platform.ts and the panel plays it instead. */

/** ms between items appearing on a screen; a row stays open 3600ms */
const BEAT = 750

/** counts from `from` to `total`, one per beat. Screens are keyed by row, so a
    new row remounts and starts the count again. */
function useCount(total: number, from: number) {
  const still = useReducedMotion()
  const [n, setN] = useState(still ? total : from)
  useEffect(() => {
    if (still) return
    const id = window.setInterval(() => setN((x) => Math.min(x + 1, total)), BEAT)
    return () => window.clearInterval(id)
  }, [still, total])
  return n
}

export function TrackMock({ id, step }: { id: Track['id']; step: number }) {
  const row = Math.max(0, step)
  const screen =
    id === 'app' ? <Chat key={row} {...CHATS[row]} /> :
    id === 'workflow' ? (row === 2 ? <PdNote key={row} /> : <Interview key={row} {...CALLS[row]} />) :
    id === 'analytics' ? [<Pqm key={0} />, <Officers key={1} />, <Warnings key={2} />, <Pack key={3} />][row] :
    <Custom key={row} row={row} />

  if (id === 'app' || id === 'workflow')
    return <Phone label={id === 'app' ? 'Saralya' : 'Saral Saarthi'} dark={id === 'workflow' && row !== 2}>{screen}</Phone>
  return <Browser label={id === 'analytics' ? 'portfolio quality monitor' : 'build an agent'}>{screen}</Browser>
}

/* Cross-fades one screen into the next inside a device. */
function Fade({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  )
}

function Rise({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* A status card that closes a screen. */
function Note({ tag, title, body, tone = 'ok' }: { tag: string; title: string; body: string; tone?: 'ok' | 'warn' }) {
  return (
    <Rise className="rounded-2xl bg-ink px-3.5 py-3 text-white">
      <div className={`flex items-center gap-1.5 font-mono text-label uppercase tracking-[0.12em] ${tone === 'warn' ? 'text-amber' : 'text-accent3'}`}>
        {tone === 'warn' ? <Flag className="size-3" /> : <Check className="size-3" strokeWidth={3} />}
        {tag}
      </div>
      <div className="mt-1.5 text-small font-semibold leading-snug">{title}</div>
      <div className="mt-0.5 text-small leading-snug text-white/60">{body}</div>
    </Rise>
  )
}

function Typing({ mine }: { mine: boolean }) {
  return (
    <div className={`flex w-fit gap-1 rounded-2xl px-3 py-2.5 shadow-sm ${mine ? 'ml-auto bg-green-w' : 'bg-white'}`}>
      {[0, 1, 2].map((n) => (
        <motion.span
          key={n}
          className="size-1.5 rounded-full bg-hint"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: n * 0.15 }}
        />
      ))}
    </div>
  )
}

/* ── in-app agent: one conversation per row ─────────────────────────── */

type Msg = { us?: boolean; text: string }
type NoteProps = { tag: string; title: string; body: string }

const CHATS: { msgs: Msg[]; note: NoteProps }[] = [
  {
    msgs: [
      { text: 'Which bank statement do I upload?' },
      { us: true, text: 'The account your shop’s sales come into. Six months is enough.' },
      { text: 'It’s on my son’s phone 😅' },
      { us: true, text: 'No problem. Your place is saved, send it when he’s back.' },
    ],
    note: { tag: 'Caught at step 4', title: 'Paused, not abandoned', body: 'Resume link sent. Nothing to retype.' },
  },
  {
    msgs: [
      { us: true, text: 'May I read your bank and KYC records to verify you?' },
      { text: 'Yes, go ahead' },
      { us: true, text: 'PAN, address and bank verified' },
      { us: true, text: 'Your Key Fact Statement: ₹3,00,000 · 24 months · 21% a year' },
    ],
    note: { tag: 'KYC complete', title: 'One consented run', body: 'Account Aggregator and CKYC, before signing.' },
  },
  {
    msgs: [
      { text: 'EMI kab se shuru hogi?' },
      { us: true, text: 'Loan milne ke 30 din baad, har mahine 5 tareekh ko.' },
      { text: 'Pehle chukana ho to?' },
      { us: true, text: 'Ho sakta hai. 6 EMI ke baad, bina extra charge.' },
    ],
    note: { tag: 'Answered in Hindi', title: 'Asked at step 6, answered at step 6', body: 'No call to the branch.' },
  },
  {
    msgs: [
      { text: 'My GST is registered in my brother’s name' },
      { us: true, text: 'That needs a credit officer. I’m passing your file on now.' },
      { us: true, text: 'Rakesh from the Meerut branch will call you today.' },
    ],
    note: { tag: 'Handed off', title: 'File sent to Meerut branch', body: 'PAN, bank, GST note and this chat attached.' },
  },
]

function Chat({ msgs, note }: { msgs: Msg[]; note: NoteProps }) {
  const n = useCount(msgs.length + 1, 2)
  const next = msgs[n]
  return (
    <Fade>
      <div className="flex h-full flex-col gap-2 bg-gradient-to-b from-wash to-wash2 px-3.5 py-3.5">
        {msgs.slice(0, n).map((m) => (
          <Rise
            key={m.text}
            className={`max-w-[86%] rounded-2xl px-3 py-2 text-small leading-snug text-ink shadow-sm ${
              m.us ? 'ml-auto rounded-br-sm bg-green-w' : 'rounded-bl-sm bg-white'
            }`}
          >
            {m.text}
            {m.us && <CheckCheck className="ml-1.5 inline size-3 text-accent" />}
          </Rise>
        ))}
        {next && <Typing mine={!!next.us} />}
        <div className="mt-auto">{n > msgs.length && <Note {...note} />}</div>
      </div>
    </Fade>
  )
}

/* ── agentic workflow: the AI personal discussion ───────────────────── */

const CALLS: { lines: Msg[]; note?: NoteProps & { tone?: 'warn' } }[] = [
  {
    lines: [
      { us: true, text: 'Namaste Ramesh ji, I’m Saarthi. This takes about ten minutes.' },
      { text: 'Namaste. Shuru kijiye.' },
      { us: true, text: 'Tell me about the shop. How many years at this counter?' },
    ],
  },
  {
    lines: [
      { us: true, text: 'Your bank credits read ₹41,000 a month.' },
      { us: true, text: 'You said sales are ₹1.2 lakh. Where does the rest come in?' },
      { text: 'Most customers pay cash, sir.' },
    ],
    note: { tag: 'Probed', title: 'Cash sales vs bank credits', body: 'Answer kept with the question.' },
  },
  { lines: [] },
  {
    lines: [
      { us: true, text: 'The GST return shows ₹38 lakh for the year.' },
      { text: 'Some sales go in my brother’s firm.' },
    ],
    note: { tag: 'Escalated', title: 'GST turnover ≠ stated sales', body: 'Sent to the branch credit manager, with the reason.', tone: 'warn' },
  },
]

function Interview({ lines, note }: (typeof CALLS)[number]) {
  const n = useCount(lines.length + (note ? 1 : 0), 1)
  const still = useReducedMotion()
  const said = lines.slice(0, n).slice(-2)
  const talking = !lines[Math.min(n, lines.length) - 1]?.us
  return (
    <Fade>
      <div className="relative flex h-full flex-col bg-ink px-4 pb-4 pt-6">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-accent/30 to-ink" />
        <div className="relative flex flex-col items-center">
          <motion.span
            className="grid size-20 place-items-center rounded-full bg-accent text-white ring-4 ring-white/15"
            animate={still || talking ? {} : { scale: [1, 1.04, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
          >
            <Video className="size-8" strokeWidth={1.6} />
          </motion.span>
          <div className="mt-2.5 text-small font-semibold text-white">Saarthi · AI interviewer</div>
          <div className="flex items-center gap-1.5 font-mono text-label text-white/60">
            <span className="size-1.5 rounded-full bg-red" /> Recording · 04:12
          </div>
        </div>

        {/* the borrower's own tile */}
        <div className="relative mt-3 flex items-center gap-2 rounded-xl bg-white/10 px-2.5 py-2 text-white">
          <span className="size-7 shrink-0 rounded-lg bg-white/20" />
          <span className="min-w-0 flex-1 truncate text-small">Ramesh · Meerut</span>
          <span className="flex items-end gap-0.5">
            {[0, 1, 2, 3].map((k) => (
              <motion.span
                key={k}
                className="w-0.5 rounded-full bg-accent3"
                animate={still ? { height: 7 } : { height: talking ? [4, 12, 6, 10, 4] : 4 }}
                transition={{ duration: 1, repeat: Infinity, delay: k * 0.1 }}
              />
            ))}
          </span>
          <Mic className="size-3.5 text-white/70" />
        </div>

        <div className="relative mt-3 space-y-2">
          {said.map((l) => (
            <Rise key={l.text} className="rounded-xl bg-white/95 px-3 py-2 text-small leading-snug text-ink">
              <span className="mb-0.5 block font-mono text-label uppercase tracking-[0.12em] text-accent">{l.us ? 'Saarthi' : 'Borrower'}</span>
              {l.text}
            </Rise>
          ))}
        </div>

        <div className="relative mt-auto">{note && n > lines.length && <Note {...note} />}</div>
      </div>
    </Fade>
  )
}

const PD = [
  { k: 'Income', v: '₹1.2 lakh a month, stated' },
  { k: 'Banked', v: '₹41,000 a month, read' },
  { k: 'Obligations', v: 'One two-wheeler EMI' },
  { k: 'Premises', v: 'Owned · 3 photos' },
  { k: 'Visit', v: 'Meerut · 26 Oct, 10:42' },
]

function PdNote() {
  const n = useCount(PD.length + 1, 2)
  return (
    <Fade>
      <div className="flex h-full flex-col bg-wash2 px-3.5 py-3.5">
        <div className="text-small font-semibold">PD note · Ramesh Kumar</div>
        <div className="font-mono text-label text-hint">Written during the call</div>
        <ul className="mt-3 space-y-1.5">
          {PD.map((p, i) => (
            <li
              key={p.k}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-2 ring-1 transition-colors duration-300 ${i < n ? 'bg-white ring-line2' : 'bg-transparent ring-line2/60'}`}
            >
              <span className={`grid size-4 shrink-0 place-items-center rounded-full ${i < n ? 'bg-accent text-white' : 'bg-line2 text-white'}`}>
                <Check className="size-2.5" strokeWidth={3} />
              </span>
              <span className="w-[76px] shrink-0 font-mono text-label uppercase tracking-[0.08em] text-hint">{p.k}</span>
              <span className={`min-w-0 flex-1 truncate text-small ${i < n ? 'text-ink2' : 'text-hint'}`}>{p.v}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto">{n > PD.length && <Note tag="Ready" title="PD note filed" body="Before the officer is back at the branch." />}</div>
      </div>
    </Fade>
  )
}

/* ── actionable analytics ──────────────────────────────────────────── */

const PILLARS = [
  { label: 'Delinquency', weight: '30%', fill: 0.82 },
  { label: 'Momentum', weight: '20%', fill: 0.64 },
  { label: 'New business', weight: '15%', fill: 0.71 },
  { label: 'Concentration', weight: '15%', fill: 0.48 },
]

function Pqm() {
  const n = useCount(PILLARS.length, 1)
  const still = useReducedMotion()
  return (
    <Fade>
      <div className="px-4 py-3.5">
        <Head title="Portfolio Quality Index" meta="Oct 2026" />
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
                <span className={`w-[92px] shrink-0 truncate text-small ${i < n ? 'text-ink2' : 'text-hint'}`}>{p.label}</span>
                <Bar fill={i < n ? p.fill : 0} />
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
    </Fade>
  )
}

const OFFICERS = [
  { name: 'Anil · Meerut', files: 42, tat: '2.1 d', conv: 0.71 },
  { name: 'Sunita · Agra', files: 38, tat: '2.6 d', conv: 0.64 },
  { name: 'Imran · Aligarh', files: 35, tat: '4.8 d', conv: 0.41, slow: true },
  { name: 'Priya · Mathura', files: 29, tat: '1.9 d', conv: 0.69 },
]

function Officers() {
  const n = useCount(OFFICERS.length + 1, 2)
  return (
    <Fade>
      <div className="px-4 py-3.5">
        <Head title="Officer and branch performance" meta="This month" />
        <div className="mt-3 grid grid-cols-[1fr_44px_48px_88px] gap-x-2 font-mono text-label uppercase tracking-[0.08em] text-hint">
          <span>Officer</span>
          <span>Files</span>
          <span>TAT</span>
          <span>Approved</span>
        </div>
        <ul className="mt-1.5 space-y-1.5">
          {OFFICERS.map((o, i) => (
            <li
              key={o.name}
              className={`grid grid-cols-[1fr_44px_48px_88px] items-center gap-x-2 rounded-lg px-2 py-1.5 text-small transition-colors duration-300 ${
                i >= n ? 'text-hint' : o.slow && n > OFFICERS.length ? 'bg-amber-w text-ink' : 'text-ink2'
              }`}
            >
              <span className="truncate">{o.name}</span>
              <span className="tabular-nums">{o.files}</span>
              <span className={`tabular-nums ${o.slow && i < n ? 'font-semibold text-amber' : ''}`}>{o.tat}</span>
              <Bar fill={i < n ? o.conv : 0} />
            </li>
          ))}
        </ul>
        <div className="mt-3 min-h-[60px]">
          {n > OFFICERS.length && (
            <Rise className="rounded-lg bg-wash px-3 py-2 text-small leading-relaxed text-ink2">
              Aligarh files wait 2.7 days at document check. Coach that stage, not the month.
            </Rise>
          )}
        </div>
      </div>
    </Fade>
  )
}

const ALERTS = [
  { what: 'NACH bounced', who: 'A/c 4471 · ₹18,200', tone: 'bg-red', act: 'Call today' },
  { what: 'GST filing skipped', who: 'A/c 2209 · Q2', tone: 'bg-amber', act: 'Ask for it' },
  { what: 'Enquiry at another lender', who: 'A/c 1180', tone: 'bg-amber', act: 'Watch' },
  { what: 'EMI paid after 9 days', who: 'A/c 3307', tone: 'bg-amber', act: 'Call this week' },
]

function Warnings() {
  const n = useCount(ALERTS.length + 1, 2)
  return (
    <Fade>
      <div className="px-4 py-3.5">
        <Head title="Early warning" meta="Today, 7:00" />
        <ul className="mt-3 space-y-1.5">
          {ALERTS.map((a, i) => (
            <li
              key={a.who}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 ring-1 transition-opacity duration-300 ${i < n ? 'bg-white ring-line2' : 'opacity-30 ring-line2'}`}
            >
              <span className={`size-2 shrink-0 rounded-full ${a.tone}`} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-small font-semibold text-ink">{a.what}</span>
                <span className="block font-mono text-label text-hint">{a.who}</span>
              </span>
              <span className="shrink-0 rounded-full bg-wash2 px-2 py-0.5 font-mono text-label text-ink2">{a.act}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 min-h-[44px]">
          {n > ALERTS.length && (
            <Rise className="rounded-lg bg-ink px-3 py-2.5 text-small font-semibold text-white">
              4 accounts to call first, sorted by amount at risk
            </Rise>
          )}
        </div>
      </div>
    </Fade>
  )
}

const PACK = ['Roll-rates by bucket', 'Cohorts ageing badly', 'What changed since September', 'Branches to visit']

function Pack() {
  const n = useCount(PACK.length + 1, 1)
  return (
    <Fade>
      <div className="px-4 py-3.5">
        <Head title="Monthly review pack" meta="1 Nov 2026" />
        <ul className="mt-3 space-y-1.5">
          {PACK.map((p, i) => (
            <li key={p} className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 ring-1 transition-colors duration-300 ${i < n ? 'bg-white ring-line2' : 'ring-line2/60'}`}>
              <span className={`grid size-5 shrink-0 place-items-center rounded-full ${i < n ? 'bg-accent text-white' : 'bg-line2 text-white'}`}>
                <Check className="size-3" strokeWidth={3} />
              </span>
              <span className={`text-small ${i < n ? 'text-ink2' : 'text-hint'}`}>{p}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 min-h-[60px]">
          {n > PACK.length && (
            <Note tag="Sent" title="On the CRO’s desk, 7:00 on the 1st" body="Nobody assembled it." />
          )}
        </div>
      </div>
    </Fade>
  )
}

function Head({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <div className="text-small font-semibold">{title}</div>
      <span className="shrink-0 font-mono text-label text-hint">{meta}</span>
    </div>
  )
}

function Bar({ fill }: { fill: number }) {
  return (
    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-wash">
      <motion.span
        className="block h-1.5 rounded-full bg-accent"
        initial={false}
        animate={{ width: `${fill * 100}%` }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </span>
  )
}

/* ── custom agents: one build, shown at each row's stage ───────────── */

const BUILD = [
  { k: 'Reads', v: 'Ledger · NACH returns · promise-to-pay log' },
  { k: 'Decides', v: 'Who to call today, in what order' },
  { k: 'Writes', v: 'The call list, into the collections queue' },
  { k: 'Stops at', v: 'Any waiver, which stays with the manager' },
]

const PROBLEM = '“Nobody gets to the 1–30 bucket before it rolls. I want the calls made the day a payment breaks.”'

function Custom({ row }: { row: number }) {
  /* row 0 types the problem; row 1 assembles; rows 2 and 3 start assembled */
  const n = useCount(BUILD.length, row === 1 ? 0 : BUILD.length)
  const typed = useTyped(row === 0)
  return (
    <Fade>
      <div className="px-4 py-3.5">
        <div className="font-mono text-label uppercase tracking-[0.14em] text-hint">Your problem</div>
        <p className="mt-1.5 min-h-[60px] rounded-xl bg-wash px-3 py-2.5 text-small leading-snug text-ink">
          {PROBLEM.slice(0, typed)}
          {typed < PROBLEM.length && <span className="ml-0.5 inline-block h-3.5 w-px animate-pulse bg-ink align-middle" />}
        </p>

        <div className="mt-3.5 font-mono text-label uppercase tracking-[0.14em] text-hint">
          {row === 2 ? 'Inside your policy' : 'Assembled from parts'}
        </div>
        <ul className="mt-1.5 space-y-1.5">
          {BUILD.map((b, i) => {
            const on = row > 0 && i < n
            const lit = row === 2 && i === 3
            return (
              <li
                key={b.k}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 ring-1 transition-colors duration-300 ${
                  lit ? 'bg-amber-w ring-amber/40' : on ? 'bg-white ring-line2' : 'bg-wash2/60 ring-transparent'
                }`}
              >
                <span className={`grid size-5 shrink-0 place-items-center rounded-full ${on ? 'bg-accent text-white' : 'bg-line2 text-white'}`}>
                  <Check className="size-3" strokeWidth={3} />
                </span>
                <span className={`w-[68px] shrink-0 font-mono text-label uppercase tracking-[0.1em] ${on ? 'text-accent2' : 'text-hint'}`}>{b.k}</span>
                <span className={`min-w-0 flex-1 truncate text-small ${on ? 'text-ink2' : 'text-hint'}`}>{b.v}</span>
              </li>
            )
          })}
        </ul>

        <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-ink px-3.5 py-3 text-white" style={{ opacity: row === 3 || (row === 1 && n === BUILD.length) ? 1 : 0.25 }}>
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-label uppercase tracking-[0.12em] text-accent3">{row === 3 ? 'Shadow mode' : 'Agent ready'}</span>
            <span className="block text-small font-semibold leading-snug">
              {row === 3 ? 'Runs beside the desk, every call shown with its reason' : 'Bucket-1 recovery agent'}
            </span>
          </span>
          {row !== 3 && <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 font-mono text-label">Runs 7:00 daily</span>}
        </div>
      </div>
    </Fade>
  )
}

/** characters of the problem typed so far, three per tick, while `on` */
function useTyped(on: boolean) {
  const still = useReducedMotion()
  const [n, setN] = useState(on && !still ? 24 : PROBLEM.length)
  useEffect(() => {
    if (!on || still) return
    const id = window.setInterval(() => setN((x) => Math.min(x + 3, PROBLEM.length)), 40)
    return () => window.clearInterval(id)
  }, [on, still])
  return n
}

/* ── device frames ─────────────────────────────────────────────────── */

function Phone({ label, dark, children }: { label: string; dark?: boolean; children: React.ReactNode }) {
  return (
    <div className="relative w-[320px] max-w-full rounded-[2.8rem] bg-ink p-2.5 shadow-[0_50px_90px_-35px_rgba(13,22,20,0.8)] ring-1 ring-white/30">
      <div className="overflow-hidden rounded-[2.3rem] bg-white">
        <div className={`flex items-center justify-between px-5 pb-2 pt-3 ${dark ? 'bg-ink' : ''}`}>
          <span className={`font-mono text-label ${dark ? 'text-white/60' : 'text-hint'}`}>9:41</span>
          <span className="h-4 w-16 rounded-full bg-ink ring-1 ring-white/10" />
          <span className={`font-mono text-label ${dark ? 'text-white/60' : 'text-hint'}`}>5G</span>
        </div>
        <div className="flex items-center gap-2 border-b border-line2 bg-white px-4 py-2.5">
          <span className="grid size-6 place-items-center rounded-md bg-accent text-white">
            <span className="font-mono text-label">S</span>
          </span>
          <span className="truncate text-small font-semibold text-accent2">{label}</span>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-white px-2 py-0.5 ring-1 ring-line2">
            <span className="size-1.5 rounded-full bg-green" />
            <span className="font-mono text-label text-muted">Live</span>
          </span>
        </div>
        <div className="relative h-[410px]">
          <AnimatePresence initial={false}>{children}</AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function Browser({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="w-[460px] max-w-full overflow-hidden rounded-2xl bg-white shadow-[0_50px_90px_-35px_rgba(13,22,20,0.7)] ring-1 ring-ink/10">
      <div className="flex items-center gap-2 border-b border-line2 bg-wash2 px-3 py-2">
        <span className="flex gap-1">
          {['bg-red', 'bg-amber', 'bg-green'].map((c) => (
            <span key={c} className={`size-2 rounded-full ${c} opacity-70`} />
          ))}
        </span>
        <span className="mx-auto rounded-full bg-white px-3 py-0.5 font-mono text-label text-muted ring-1 ring-line2">{label}</span>
      </div>
      <div className="relative h-[380px]">
        <AnimatePresence initial={false}>{children}</AnimatePresence>
      </div>
    </div>
  )
}
