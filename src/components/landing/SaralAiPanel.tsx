import { ArrowUp, Cpu, Lock, Plus, Table2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import type { Starter } from '../../content/saral-ai'
import { ACCEPT, ask, fileStarter, Mark, MicButton, useSpeech, type Role } from './SaralAiChat'

/* The opening view, centred in the full-page sheet: one hello and a
   composer. The questions live on the screen before this one, picked by
   seat, so this screen asks nothing and waits.

   TODO(Vikas): three public claims sit under the composer — the model is
   our own and trained on banking data, uploaded sheets come back as
   portfolio analysis, and files are encrypted in the lender's own tenant.
   Confirm all three before launch, and note that free-text ask() is still
   scripted until the model endpoint lands. */

/* Why ask here rather than a general assistant. */
const EDGE = [
  { icon: Cpu, title: 'Our own ML model', body: 'Trained for banking and lending data, not the open web.' },
  { icon: Table2, title: 'Bring your sheets', body: 'Drop a monthly MIS or collections sheet; get the portfolio read back.' },
  { icon: Lock, title: 'Encrypted with us', body: 'Stored in your own tenant, encrypted at rest.' },
]

export function SaralAiPanel({ onAsk, seat }: { onAsk: (s: Starter) => void; seat: Role | null }) {
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
    <div className="flex h-full flex-col justify-center overflow-y-auto py-10 text-ink">
      <div className="flex items-center gap-2.5">
        <span className="grid size-7 shrink-0 place-items-center rounded-md bg-accent text-white">
          <Mark className="text-body" />
        </span>
        <span className="font-mono text-label uppercase tracking-[0.14em] text-muted">Saral Saarthi</span>
        <span className="size-1.5 rounded-full bg-green animate-pulse-ring" />
      </div>

      <h2 className="display mt-5 max-w-[18ch] text-h2">
        Ask me anything<span className="text-accent">.</span>
      </h2>
      <p className="mt-3 max-w-[46ch] text-body leading-relaxed text-muted">
        {seat ? seat.hello : 'Credit risk, collections, RBI norms, compliance — or anything about our platform.'}
      </p>

      <form onSubmit={submit} className="mt-7 flex items-center gap-1.5 rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-line transition focus-within:ring-accent">
        <label aria-label="Add a file" title="Add a file" className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-xl text-muted hover:bg-wash hover:text-accent">
          <Plus className="size-4" />
          <input type="file" multiple accept={ACCEPT} className="sr-only" onChange={(e) => { attach(e.target.files); e.target.value = '' }} />
        </label>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={speech.listening ? 'Listening…' : 'Ask anything about lending…'}
          aria-label="Ask Saral AI"
          autoFocus
          className="min-w-0 flex-1 bg-transparent px-1.5 text-body outline-none placeholder:text-hint"
        />
        <MicButton speech={speech} />
        <button type="submit" aria-label="Send" className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-white transition-colors hover:bg-accent2">
          <ArrowUp className="size-4" />
        </button>
      </form>
      {/* what this answers that a general assistant cannot */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {EDGE.map((e) => {
          const Icon = e.icon
          return (
            <div key={e.title} className="rounded-2xl border border-line2 bg-white p-4">
              <span className="grid size-9 place-items-center rounded-lg bg-wash text-accent">
                <Icon className="size-4.5" strokeWidth={1.7} />
              </span>
              <div className="mt-3 text-small font-semibold leading-snug">{e.title}</div>
              <p className="mt-1 text-small leading-snug text-muted">{e.body}</p>
            </div>
          )
        })}
      </div>

      <p className="mt-4 text-small leading-relaxed text-hint">
        General information, not financial or legal advice.
      </p>
    </div>
  )
}
