import {
  BarChart3,
  Banknote,
  Building2,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Gauge,
  GraduationCap,
  Landmark,
  ListChecks,
  Lock,
  Paperclip,
  Plus,
  Scale,
  ShieldCheck,
  Sparkles,
  User,
  Users,
} from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ask, Mark, type Role } from '../components/landing/SaralAiChat'
import { ROLES, type Starter } from '../content/saral-ai'
import { GUARDS, TOOLS, WORKSPACE } from '../content/saralya-ai'
import { CONTACT_EMAIL } from '../content/site'

/* Saralya AI is the surface behind the landing chat: the same Saarthi, with
   a conversation list, the tools, and room to read a long answer. Signing in
   from the landing lands here.

   No account exists yet, so there is no session to keep: conversations live
   in this browser and the account buttons write to the founders. The tools
   are doors, not runs — each one waits on the model endpoint. */

const KEY = 'saralya-ai-chats'
const LIMIT = 4000

type Turn = { q: string; a: string }
type Chat = { id: string; at: number; turns: Turn[] }

const read = (): Chat[] => {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    return Array.isArray(raw) ? (raw as Chat[]) : []
  } catch {
    return []
  }
}
const write = (c: Chat[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(c.slice(0, 40)))
  } catch {
    /* private window, or storage full: the session still works, it just
       does not outlive the tab */
  }
}

const SEAT_ICONS: Record<string, typeof User> = { nbfc: Landmark, borrower: User, dsa: Users, learn: GraduationCap }
const TOOL_ICONS = {
  emi: Banknote,
  compare: Scale,
  checklist: ListChecks,
  statement: Landmark,
  readiness: Gauge,
  memo: FileText,
  portfolio: BarChart3,
  policy: FileCheck2,
} as const
const GUARD_ICONS = { spark: Sparkles, bank: Building2, shield: ShieldCheck } as const

const account = (subject: string) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`

export function SaralyaAi() {
  const [tab, setTab] = useState<'ask' | 'tools'>('ask')
  const [seat, setSeat] = useState<Role | null>(null)
  const [chats, setChats] = useState<Chat[]>([])
  const [open, setOpen] = useState<string | null>(null)
  const [q, setQ] = useState('')
  const [thinking, setThinking] = useState(false)
  const thread = useRef<HTMLDivElement>(null)

  useEffect(() => setChats(read()), [])
  useEffect(() => {
    thread.current?.scrollTo({ top: thread.current.scrollHeight, behavior: 'smooth' })
  }, [open, chats, thinking])

  const current = chats.find((c) => c.id === open) ?? null

  /* One answer, into the open conversation or into a new one. */
  const say = (turn: Turn) => {
    /* one id for both the store and the open conversation: two Date.now()
       calls can land in different milliseconds and split the thread */
    const id = open ?? String(Date.now())
    setChats((prev) => {
      const was = prev.find((c) => c.id === id)
      const next: Chat = { id, at: Date.now(), turns: [...(was?.turns ?? []), turn] }
      const out = [next, ...prev.filter((c) => c.id !== id)]
      write(out)
      return out
    })
    setOpen(id)
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const text = q.trim()
    if (!text || thinking) return
    setQ('')
    setThinking(true)
    const a = await ask(text)
    setThinking(false)
    say({ q: text, a })
  }

  const starter = (s: Starter) => say({ q: s.q, a: s.a })

  const fresh = () => {
    setOpen(null)
    setQ('')
  }

  return (
    <div className="min-h-[100svh] bg-bg text-ink">
      <TopBar tab={tab} onTab={setTab} />

      <div className="mx-auto flex w-full max-w-[1500px] gap-0">
        <Sidebar chats={chats} open={open} onOpen={(id) => { setOpen(id); setTab('ask') }} onFresh={fresh} />

        <main className="min-w-0 flex-1 px-5 py-7 md:px-8">
          {tab === 'tools' ? (
            <Tools />
          ) : current ? (
            <div ref={thread} className="mx-auto w-full max-w-[760px]">
              {current.turns.map((t, i) => (
                <div key={i} className="mb-7">
                  <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-accent px-4 py-2.5 text-small text-white">{t.q}</div>
                  <div className="mt-4 flex gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent text-white">
                      <Mark className="text-body" />
                    </span>
                    <p className="max-w-[46rem] whitespace-pre-line text-small leading-relaxed text-ink2">{t.a}</p>
                  </div>
                </div>
              ))}
              {thinking && <p className="text-body text-hint">Saarthi is reading…</p>}
              <Composer q={q} onQ={setQ} onSubmit={submit} busy={thinking} />
            </div>
          ) : (
            <Ask
              seat={seat}
              onSeat={setSeat}
              q={q}
              onQ={setQ}
              onSubmit={submit}
              busy={thinking}
              onStarter={starter}
              onTools={() => setTab('tools')}
            />
          )}
        </main>
      </div>
    </div>
  )
}

function TopBar({ tab, onTab }: { tab: string; onTab: (t: 'ask' | 'tools') => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1500px] items-center gap-6 px-5 py-3 md:px-6">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-lede font-semibold tracking-tight">
            Saralya
            <span className="rounded-md bg-accent px-1.5 py-0.5 font-mono text-label uppercase tracking-[0.1em] text-white">AI</span>
          </span>
          <Link to="/" className="hidden font-mono text-label uppercase tracking-[0.12em] text-muted hover:text-accent sm:block">
            ← saralya.in
          </Link>
        </div>

        <nav className="mx-auto flex items-center gap-1">
          {(['ask', 'tools'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onTab(t)}
              className={`rounded-full px-4 py-2 text-small font-semibold capitalize transition ${tab === t ? 'bg-wash text-accent' : 'text-muted hover:text-ink'}`}
            >
              {t}
            </button>
          ))}
          <span className="hidden rounded-full px-4 py-2 text-small font-semibold text-hint md:block" title="Next on the list">
            Workspace
          </span>
        </nav>

        <div className="flex items-center gap-2">
          <a href={account('Saralya AI account')} className="hidden text-small font-semibold text-muted hover:text-accent sm:block">
            Sign in
          </a>
          <a
            href={account('Demo request')}
            className="rounded-full px-4 py-2 text-small font-semibold text-ink ring-1 ring-line transition hover:ring-accent"
          >
            Book a demo
          </a>
        </div>
      </div>
    </header>
  )
}

function Sidebar({
  chats,
  open,
  onOpen,
  onFresh,
}: {
  chats: Chat[]
  open: string | null
  onOpen: (id: string) => void
  onFresh: () => void
}) {
  return (
    <aside className="hidden w-[248px] shrink-0 flex-col justify-between border-r border-line px-3.5 py-5 lg:flex">
      <div>
        <button
          type="button"
          onClick={onFresh}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-small font-semibold text-white transition-colors hover:bg-accent2"
        >
          <Plus className="size-4" /> New conversation
        </button>

        <div className="mt-7 font-mono text-label uppercase tracking-[0.14em] text-hint">On this browser</div>
        <ul className="mt-3 space-y-1">
          {chats.length === 0 && <li className="px-2 py-2 text-small text-hint">Nothing yet. Ask something.</li>}
          {chats.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => onOpen(c.id)}
                className={`w-full truncate rounded-lg px-2.5 py-2 text-left text-small transition ${open === c.id ? 'bg-wash text-accent' : 'text-ink2 hover:bg-wash2'}`}
              >
                {c.turns[0]?.q ?? 'Conversation'}
                <span className="mt-0.5 block font-mono text-label text-hint">
                  {new Date(c.at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl bg-ink p-4 text-white">
        <div className="font-mono text-label uppercase tracking-[0.14em] text-accent3">Keep them</div>
        <p className="mt-2 text-small leading-relaxed text-white/70">
          These live on this browser only. Ask us for an account and they follow you.
        </p>
        <a
          href={account('Saralya AI account')}
          className="mt-4 block rounded-xl bg-accent px-4 py-2.5 text-center text-small font-semibold text-white transition-colors hover:bg-accent2"
        >
          Ask for an account
        </a>
      </div>
    </aside>
  )
}

function Ask({
  seat,
  onSeat,
  q,
  onQ,
  onSubmit,
  busy,
  onStarter,
  onTools,
}: {
  seat: Role | null
  onSeat: (r: Role | null) => void
  q: string
  onQ: (s: string) => void
  onSubmit: (e: FormEvent) => void
  busy: boolean
  onStarter: (s: Starter) => void
  onTools: () => void
}) {
  return (
    <div className="mx-auto w-full max-w-[880px]">
      <div className="flex items-center gap-2.5">
        <span className="size-1.5 rounded-full bg-green animate-pulse-ring" />
        <span className="font-mono text-label uppercase tracking-[0.14em] text-muted">Saralya AI · Free</span>
      </div>

      <h1 className="display mt-3.5 max-w-[26ch] text-h3 md:text-h2">
        Ask anything about <span className="text-accent">lending</span>. Get the answer an underwriter would give
      </h1>
      <p className="mt-2.5 text-body leading-relaxed text-muted">
        India’s lending copilot, for borrowers, businesses and the people who lend to them.
      </p>

      <div role="group" aria-label="I am a" className="mt-6">
        <span className="font-mono text-label uppercase tracking-[0.14em] text-hint">I am…</span>
        <div className="mt-2.5 flex flex-wrap gap-2.5">
          {ROLES.map((r) => {
            const on = seat?.id === r.id
            const Icon = SEAT_ICONS[r.id] ?? User
            return (
              <button
                key={r.id}
                type="button"
                aria-pressed={on}
                onClick={() => onSeat(on ? null : r)}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-small font-semibold transition ${on ? 'bg-accent text-white' : 'bg-white text-ink ring-1 ring-line hover:ring-accent/50'}`}
              >
                <Icon className="size-4" strokeWidth={1.8} />
                {r.label}
              </button>
            )
          })}
        </div>
        {seat && <p className="mt-2.5 text-small text-muted">{seat.asks}</p>}
      </div>

      <div className="mt-6 flex gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent text-white">
          <Mark className="text-body" />
        </span>
        <p className="max-w-[72ch] text-small leading-relaxed text-ink2">
          {seat?.hello ?? 'Ask me about a loan, a credit score, a policy, or a portfolio, whatever your side of the table.'}
        </p>
      </div>

      <Composer q={q} onQ={onQ} onSubmit={onSubmit} busy={busy} />

      {seat && (
        <section className="mt-10">
          <div className="font-mono text-label uppercase tracking-[0.14em] text-hint">Asked by people like you</div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {seat.qs.slice(0, 4).map((s) => (
              <button
                key={s.q}
                type="button"
                onClick={() => onStarter(s)}
                className="rounded-xl border border-line2 bg-white px-4 py-3.5 text-left transition hover:border-accent/40"
              >
                <span className="block text-small leading-snug text-ink">{s.q}</span>
                <span className="mt-2.5 block font-mono text-label uppercase tracking-[0.12em] text-accent">Ask this →</span>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10 border-t border-line pt-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-label uppercase tracking-[0.14em] text-hint">Beyond answers</div>
            <h2 className="display mt-1.5 text-h3">What Saralya AI can do</h2>
            <p className="mt-2 max-w-[60ch] text-small leading-relaxed text-muted">
              Calculators anyone can use, and reports that open with an account, each built the way a lender reads a file.
            </p>
          </div>
          <button type="button" onClick={onTools} className="text-small font-semibold text-accent hover:underline">
            All tools →
          </button>
        </div>
        <ToolGrid limit={4} />
      </section>

      <Guards />
    </div>
  )
}

function Composer({ q, onQ, onSubmit, busy }: { q: string; onQ: (s: string) => void; onSubmit: (e: FormEvent) => void; busy: boolean }) {
  return (
    <>
      <form onSubmit={onSubmit} className="mt-5 rounded-2xl bg-white p-3.5 ring-1 ring-line transition focus-within:ring-accent">
        <textarea
          value={q}
          onChange={(e) => onQ(e.target.value.slice(0, LIMIT))}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              onSubmit(e)
            }
          }}
          rows={2}
          aria-label="Ask Saralya AI"
          placeholder="e.g. My salary is ₹65,000 with a ₹9,000 EMI. How much home loan can I get?"
          className="w-full resize-none bg-transparent text-body outline-none placeholder:text-hint"
        />
        <div className="mt-3 flex items-center justify-between gap-4 border-t border-line2 pt-3">
          <span className="flex items-center gap-1.5 text-small text-hint" title="Files open with an account">
            <Paperclip className="size-4" /> Attach
            <Lock className="size-3" />
          </span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-label text-hint">
              {q.length} / {LIMIT}
            </span>
            <button
              type="submit"
              disabled={!q.trim() || busy}
              className="rounded-xl bg-accent px-5 py-2.5 text-small font-semibold text-white transition-colors hover:bg-accent2 disabled:bg-line disabled:text-hint"
            >
              {busy ? 'Reading…' : 'Ask ↑'}
            </button>
          </div>
        </div>
      </form>
      <div className="mt-2.5 flex flex-wrap justify-between gap-2 font-mono text-label text-hint">
        <span>Enter to ask · Shift+Enter for a new line</span>
        <span>Free today: about 4 answers · no sign-up needed</span>
      </div>
    </>
  )
}

function Tools() {
  return (
    <div className="mx-auto w-full max-w-[880px]">
      <div className="font-mono text-label uppercase tracking-[0.14em] text-hint">Beyond answers</div>
      <h1 className="display mt-1.5 text-h3 md:text-h2">What Saralya AI can do</h1>
      <p className="mt-2.5 max-w-[62ch] text-body leading-relaxed text-muted">
        Calculators anyone can use, and reports that open with an account, each built the way a lender reads a file.
      </p>
      <ToolGrid />
      <Guards />
    </div>
  )
}

function ToolGrid({ limit }: { limit?: number }) {
  return (
    <>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {TOOLS.slice(0, limit ?? TOOLS.length).map((t) => {
          const Icon = TOOL_ICONS[t.icon]
          return (
            <a
              key={t.id}
              href={account(`Saralya AI · ${t.name}`)}
              className="group flex flex-col rounded-xl border border-line2 bg-white p-4 transition hover:border-accent/40"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-wash text-accent">
                  <Icon className="size-4" strokeWidth={1.7} />
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 font-mono text-label uppercase tracking-[0.1em] ${t.gate === 'free' ? 'bg-green-w text-green' : 'bg-wash text-muted'}`}
                >
                  {t.gate === 'free' ? 'Free' : 'Account'}
                </span>
              </div>
              <div className="mt-3.5 text-small font-semibold leading-snug">{t.name}</div>
              <p className="mt-1 text-small leading-relaxed text-muted">{t.body}</p>
              <span className="mt-4 font-mono text-label uppercase tracking-[0.1em] text-hint">{t.note}</span>
            </a>
          )
        })}
      </div>

      <a
        href={account('Saralya LMS workspace')}
        className="mt-3 flex flex-wrap items-center gap-4 rounded-xl border border-line2 bg-white px-5 py-4 transition hover:border-accent/40"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-ink text-white">
          <FileSpreadsheet className="size-4" strokeWidth={1.7} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-mono text-label uppercase tracking-[0.14em] text-hint">{WORKSPACE.eyebrow}</div>
          <div className="mt-1.5 text-small font-semibold">{WORKSPACE.title}</div>
          <p className="mt-1 text-small leading-relaxed text-muted">{WORKSPACE.body}</p>
        </div>
        <span className="text-small font-semibold text-accent">{WORKSPACE.cta} →</span>
      </a>
    </>
  )
}

function Guards() {
  return (
    <section className="mt-10 grid gap-5 border-t border-line pt-7 md:grid-cols-3">
      {GUARDS.map((g) => {
        const Icon = GUARD_ICONS[g.icon as keyof typeof GUARD_ICONS]
        return (
          <div key={g.title} className="flex gap-3">
            <Icon className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.8} />
            <div>
              <div className="text-small font-semibold">{g.title}</div>
              <p className="mt-1 text-small leading-relaxed text-muted">{g.body}</p>
            </div>
          </div>
        )
      })}
    </section>
  )
}
