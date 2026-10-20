import { ArrowUp, Cpu, GraduationCap, Landmark, Lock, Plus, Table2, User, Users } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { ROLES, type Starter } from '../../content/saral-ai'
import { ACCEPT, ask, fileStarter, Mark, MicButton, useSpeech, type Role } from './SaralAiChat'

/* The opening view, centred in the full-page sheet: who you are, a
   composer, and the questions that seat asks. Asking who you are on a
   screen of its own only added a page between the visitor and the box,
   so it lives here: no seat picked, no questions.

   TODO(Vikas): three claims sit under the heading as labels — our own
   credit ML model, sheets come back as analytics, data encrypted in the
   lender's own tenant. Confirm all three before launch, and note that
   free-text ask() is still scripted until the model endpoint lands. */

/* One icon per seat, by id. */
const SEAT_ICONS: Record<string, typeof User> = {
  nbfc: Landmark,
  borrower: User,
  dsa: Users,
  learn: GraduationCap,
}

/* Why ask here rather than a general assistant. */
const EDGE = [
  { icon: Cpu, title: 'Credit ML model', body: 'Anonymised Indian banking data, tuned on RBI directions' },
  { icon: Table2, title: 'Sheets in, analytics out', body: 'Drop your files and get the analytics back' },
  { icon: Lock, title: 'Your data is encrypted', body: 'Masked at rest — only you see your files' },
]

export function SaralAiPanel({
  onAsk,
  seat,
  onSeat,
}: {
  onAsk: (s: Starter) => void
  seat: Role | null
  onSeat: (r: Role | null) => void
}) {
  const [q, setQ] = useState('')
  const speech = useSpeech(setQ)

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
    <div className="flex h-full w-full flex-col justify-center gap-4 overflow-hidden py-5 text-left text-ink [@media(min-height:800px)]:gap-6">
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-white">
          <Mark className="text-lede" />
        </span>
        <span className="font-mono text-label uppercase tracking-[0.14em] text-muted">Saral Saarthi</span>
        <span className="size-1.5 rounded-full bg-green animate-pulse-ring" />
      </div>

      <h2 className="display relative text-h2 [@media(min-height:800px)]:text-display">
        AI Desk for lenders<span className="text-accent">.</span>
      </h2>
      <p className="relative -mt-1 text-lede leading-relaxed text-muted">Your lending intelligence, in one secure workspace.</p>
      {/* what this answers that a general assistant cannot: three labels,
          nothing moving */}
      <div className="relative grid w-full gap-2.5 sm:grid-cols-3">
        {EDGE.map((e) => (
          <div
            key={e.title}
            className="flex items-start gap-2.5 rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 px-3 py-2.5 ring-1 ring-accent/20"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-white/80 text-accent shadow-sm">
              <e.icon className="size-3.5" strokeWidth={1.8} />
            </span>
            <span className="min-w-0">
              <span className="block text-small font-semibold leading-snug text-accent2">{e.title}</span>
              <span className="mt-0.5 block text-label leading-snug text-ink2">{e.body}</span>
            </span>
          </div>
        ))}
      </div>

      {/* the ask block, left-aligned under the heading: who you are, the
          box, and the questions that seat asks */}
      <div className="relative w-full">
        <span className="font-mono text-label uppercase tracking-[0.14em] text-hint">I am…</span>
        <div role="group" aria-label="I am a" className="mt-2.5 flex flex-wrap gap-2.5">
          {ROLES.map((r) => {
            const on = seat?.id === r.id
            const Icon = SEAT_ICONS[r.id] ?? User
            return (
              <button
                key={r.id}
                type="button"
                aria-pressed={on}
                onClick={() => onSeat(on ? null : r)}
                className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 font-mono text-small uppercase tracking-[0.06em] transition ${on ? 'bg-accent text-white' : 'bg-white text-ink2 ring-1 ring-line hover:text-ink hover:ring-accent/50'}`}
              >
                <Icon className="size-4" strokeWidth={1.8} />
                {r.label}
              </button>
            )
          })}
        </div>

        <form onSubmit={submit} className="mt-3 flex items-center gap-2 rounded-3xl bg-white p-2 shadow-sm ring-1 ring-line transition focus-within:ring-accent">
          <label aria-label="Add a file" title="Add a file" className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-2xl text-muted hover:bg-wash hover:text-accent">
            <Plus className="size-5" />
            <input type="file" multiple accept={ACCEPT} className="sr-only" onChange={(e) => { attach(e.target.files); e.target.value = '' }} />
          </label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={speech.listening ? 'Listening…' : 'Ask anything about lending…'}
            aria-label="Ask Saral AI"
            autoFocus
            className="min-w-0 flex-1 bg-transparent px-2 text-body outline-none placeholder:text-hint"
          />
          <MicButton speech={speech} />
          <button type="submit" aria-label="Send" className="grid size-10 shrink-0 place-items-center rounded-2xl bg-accent text-white transition-colors hover:bg-accent2">
            <ArrowUp className="size-5" />
          </button>
        </form>

        {/* nothing until a seat is picked; then the questions that seat asks */}
        {seat && (
          <>
            <span className="mt-4 block font-mono text-label uppercase tracking-[0.14em] text-hint">Or try</span>
            <div className="mt-2 grid items-stretch gap-2.5 sm:grid-cols-3">
              {seat.qs.slice(0, 3).map((s) => (
                <button
                  key={s.q}
                  type="button"
                  onClick={() => onAsk(s)}
                  className="flex h-full flex-col justify-between rounded-2xl border border-line2 bg-white px-4 py-3 text-left transition hover:border-accent/40"
                >
                  <span className="block text-small leading-snug text-ink">{s.q}</span>
                  <span className="mt-2 block font-mono text-label uppercase tracking-[0.12em] text-accent">Ask this &#8594;</span>
                </button>
              ))}
            </div>
          </>
        )}

        <p className="mt-4 border-t border-line pt-3 text-label leading-relaxed text-hint">
          General information, not financial or legal advice. Saralya is a technology provider, not a lender. Don’t share Aadhaar, PAN or passwords.
        </p>
      </div>
    </div>
  )
}
