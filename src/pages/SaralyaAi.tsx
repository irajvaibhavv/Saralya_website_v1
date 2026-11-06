import {
  Activity,
  ArrowRight,
  BarChart3,
  Banknote,
  FileCheck2,
  FileText,
  Gauge,
  Landmark,
  ListChecks,
  Loader2,
  Lock,
  PanelLeft,
  Paperclip,
  Plus,
  AlertTriangle,
  EyeOff,
  Scale,
  UploadCloud,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useEffectEvent, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Mark, type Role } from '../components/landing/SaralAiChat'
import { SaralAiPanel } from '../components/landing/SaralAiPanel'
import { ACCEPT, ask, fileStarter } from '../lib/chat'
import type { Starter } from '../content/chat'
import { GUARDS, TOOLS } from '../content/workspace'
import { CONTACT_EMAIL } from '../content/site'

/* /saralya-ai workspace: conversation list, tools and room for long answers. No
   accounts exist yet: conversations are stored in localStorage and account
   buttons open email. Tools wait on the model endpoint. */

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
    /* storage unavailable (private window or quota): the session still works,
       it just isn't saved */
  }
}

const TOOL_ICONS = {
  emi: Banknote,
  compare: Scale,
  checklist: ListChecks,
  statement: Landmark,
  readiness: Gauge,
  memo: FileText,
  portfolio: BarChart3,
  policy: FileCheck2,
  sna: Activity,
} as const
const GUARD_META = [
  { icon: AlertTriangle },
  { icon: Scale },
  { icon: EyeOff },
] as const

const account = (subject: string) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`

export function SaralyaAi() {
  const [tab, setTab] = useState<'ask' | 'tools'>('ask')
  const [seat, setSeat] = useState<Role | null>(null)
  const [chats, setChats] = useState<Chat[]>(read)
  const [open, setOpen] = useState<string | null>(null)
  const [q, setQ] = useState('')
  const [thinking, setThinking] = useState(false)
  const [revealKey, setRevealKey] = useState<string | null>(null)
  const [sidebar, setSidebar] = useState(true)
  const thread = useRef<HTMLDivElement>(null)

  useEffect(() => {
    thread.current?.scrollTo({ top: thread.current.scrollHeight, behavior: 'smooth' })
  }, [open, chats, thinking, revealKey])

  const current = chats.find((c) => c.id === open) ?? null

  /* Add an answer to the open conversation, or start a new one, and mark that
     turn to type itself out in the thread instead of appearing all at once. */
  const say = (turn: Turn) => {
    /* one id for both state updates: two Date.now() calls can differ and split
       the thread */
    const id = open ?? String(Date.now())
    let idx = 0
    setChats((prev) => {
      const was = prev.find((c) => c.id === id)
      idx = was?.turns.length ?? 0
      const next: Chat = { id, at: Date.now(), turns: [...(was?.turns ?? []), turn] }
      const out = [next, ...prev.filter((c) => c.id !== id)]
      write(out)
      return out
    })
    setOpen(id)
    setRevealKey(`${id}-${idx}`)
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

  /* attached or dropped files open (or continue) a conversation */
  const attach = (list: FileList | null) => {
    const s = list && fileStarter(list)
    if (!s) return
    setTab('ask')
    say(s)
  }
  const onDrop = useEffectEvent(attach)

  /* page-wide drag and drop */
  const [dragging, setDragging] = useState(false)
  useEffect(() => {
    let depth = 0
    const has = (e: DragEvent) => [...(e.dataTransfer?.types ?? [])].includes('Files')
    const enter = (e: DragEvent) => { if (has(e)) { depth++; setDragging(true) } }
    const leave = (e: DragEvent) => { if (has(e) && --depth <= 0) { depth = 0; setDragging(false) } }
    const over = (e: DragEvent) => { if (has(e)) e.preventDefault() }
    const drop = (e: DragEvent) => {
      if (!has(e)) return
      e.preventDefault()
      depth = 0
      setDragging(false)
      onDrop(e.dataTransfer!.files)
    }
    window.addEventListener('dragenter', enter)
    window.addEventListener('dragleave', leave)
    window.addEventListener('dragover', over)
    window.addEventListener('drop', drop)
    return () => {
      window.removeEventListener('dragenter', enter)
      window.removeEventListener('dragleave', leave)
      window.removeEventListener('dragover', over)
      window.removeEventListener('drop', drop)
    }
  }, [])

  const fresh = () => {
    setOpen(null)
    setQ('')
  }

  return (
    <div className="flex h-[100svh] flex-col overflow-hidden bg-bg text-ink">
      <TopBar tab={tab} onTab={setTab} sidebar={sidebar} onSidebar={() => setSidebar((v) => !v)} />
      {dragging && (
        <div className="pointer-events-none fixed inset-0 z-50 grid place-items-center bg-ink/40 p-6 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-white/70 bg-white/10 px-12 py-10 text-center text-white">
            <UploadCloud className="size-10" strokeWidth={1.6} />
            <div className="text-h3 font-semibold tracking-tight">Drop to attach</div>
            <div className="text-body text-white/75">MIS sheets, bank statements, policy documents.</div>
          </div>
        </div>
      )}

      <div className="relative mx-auto flex w-full min-h-0 max-w-[93.75rem] flex-1 gap-0">
        {sidebar && tab !== 'tools' && <Sidebar chats={chats} open={open} onOpen={(id) => { setOpen(id); setTab('ask') }} onFresh={fresh} />}

        <main className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          {/* background grid, matching the landing Saarthi stage */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #0d1614 1px, transparent 1px), linear-gradient(to bottom, #0d1614 1px, transparent 1px)',
                backgroundSize: '96px 96px',
              }}
            />
            {current ? (
              <>
                <div className="absolute -left-48 top-10 size-96 rounded-full bg-accent/8" />
                <div className="absolute -right-32 top-40 size-[22rem] rounded-full bg-accent/6" />
                <div className="absolute bottom-10 left-1/3 size-72 rounded-full bg-lav/10" />
                <Cross className="absolute left-[22%] top-8 size-3 text-ink/20" />
                <Cross className="absolute left-[55%] top-36 size-3 text-ink/20" />
                <Cross className="absolute right-[18%] top-8 size-3 text-ink/20" />
                <Cross className="absolute bottom-24 left-[12%] size-3 text-ink/20" />
                <Dots className="absolute bottom-16 left-[8%]" />
                <Dots className="absolute right-[6%] top-[55%]" />
              </>
            ) : (
              <div className="absolute -right-52 -top-56 size-[26rem] rounded-full border-[0.875rem] border-lav/15" />
            )}
          </div>
          {tab === 'tools' ? (
            <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto px-5 py-7 md:px-8">
              <Tools />
            </div>
          ) : current ? (
            <>
              <div ref={thread} data-lenis-prevent className="relative min-h-0 flex-1 overflow-y-auto px-5 pt-9 md:px-8">
                <div className="relative mx-auto w-full max-w-[52rem] pb-6">
                  {/* timeline rule connecting every agent turn, flat per the shapes convention */}
                  <div aria-hidden className="absolute bottom-10 left-[1.125rem] top-10 w-px bg-line2" />
                  {current.turns.map((t, i) => (
                    <div key={i} className="relative mb-8 space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                        className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-tr-md bg-accent px-5 py-3 text-body text-white"
                      >
                        {t.q}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 30, delay: 0.08 }}
                        className="flex items-start gap-4"
                      >
                        <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full bg-lav-w text-lav2 ring-2 ring-lav/50">
                          <Mark className="text-body" />
                        </span>
                        <div className="min-w-0 max-w-[85%] rounded-2xl rounded-tl-md bg-white px-5 py-4 text-body leading-relaxed text-ink2 shadow-[0_1px_2px_rgba(13,22,20,0.04)] ring-1 ring-line">
                          <p className="whitespace-pre-line">
                            {revealKey === `${current.id}-${i}` ? (
                              <Typewriter
                                text={t.a}
                                onTick={() => thread.current?.scrollTo({ top: thread.current.scrollHeight, behavior: 'auto' })}
                              />
                            ) : (
                              t.a
                            )}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                  {thinking && (
                    <div className="relative flex items-start gap-4">
                      <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full bg-lav-w text-lav2 ring-2 ring-lav/50">
                        <Mark className="text-body" />
                      </span>
                      <div className="flex items-center gap-2 rounded-2xl rounded-tl-md bg-white px-5 py-4 text-body text-hint ring-1 ring-line">
                        <span className="flex gap-1">
                          <span className="size-1.5 animate-bounce rounded-full bg-accent/40" style={{ animationDelay: '0ms' }} />
                          <span className="size-1.5 animate-bounce rounded-full bg-accent/70" style={{ animationDelay: '150ms' }} />
                          <span className="size-1.5 animate-bounce rounded-full bg-accent" style={{ animationDelay: '300ms' }} />
                        </span>
                        Thinking about your question…
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="border-t border-line bg-bg/90 px-5 pb-6 pt-5 backdrop-blur md:px-8">
                <div className="mx-auto w-full max-w-[52rem]">
                  <Composer q={q} onQ={setQ} onSubmit={submit} busy={thinking} onFiles={attach} />
                </div>
              </div>
            </>
          ) : (
            <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto px-5 py-7 md:px-8">
              <Ask seat={seat} onSeat={setSeat} onStarter={starter} onTools={() => setTab('tools')} />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function TopBar({
  tab,
  onTab,
  sidebar,
  onSidebar,
}: {
  tab: string
  onTab: (t: 'ask' | 'tools') => void
  sidebar: boolean
  onSidebar: () => void
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[93.75rem] items-center gap-6 px-5 py-3 md:px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onSidebar}
            title={sidebar ? 'Hide sidebar' : 'Show sidebar'}
            aria-pressed={sidebar}
            className="hidden size-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-wash hover:text-accent lg:grid"
          >
            <PanelLeft className="size-4" strokeWidth={1.8} />
          </button>
          <span className="flex items-center gap-2 text-lede font-semibold tracking-tight">
            <span className="grid size-7 place-items-center bg-accent text-white">
              <Mark className="text-small" />
            </span>
            Saral Saarthi
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
              className={`px-4 py-2 font-mono text-small uppercase tracking-[0.08em] transition ${tab === t ? 'bg-ink text-lime' : 'text-muted hover:text-ink'}`}
            >
              {t}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={account('Saralya AI account')} className="hidden text-small font-semibold text-muted hover:text-accent sm:block">
            Sign in
          </a>
          <a
            href={account('Demo request')}
            className="px-4 py-2 font-mono text-small uppercase tracking-[0.08em] text-ink ring-1 ring-line transition hover:ring-accent"
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
  const today = new Date().toDateString()
  const groups: [string, Chat[]][] = [
    ['Today', chats.filter((c) => new Date(c.at).toDateString() === today)],
    ['Earlier', chats.filter((c) => new Date(c.at).toDateString() !== today)],
  ].filter(([, list]) => list.length > 0) as [string, Chat[]][]

  return (
    <aside data-lenis-prevent className="hidden w-[15.5rem] shrink-0 flex-col justify-between overflow-y-auto border-r border-line px-3.5 py-5 lg:flex">
      <div>
        <button
          type="button"
          onClick={onFresh}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-small font-semibold text-white transition-colors hover:bg-accent2"
        >
          <Plus className="size-4" /> New conversation
        </button>

        {chats.length === 0 && <p className="mt-7 px-2.5 text-small text-hint">Nothing yet. Ask something.</p>}
        {groups.map(([label, list]) => (
          <div key={label} className="mt-7">
            <div className="font-mono text-label uppercase tracking-[0.14em] text-hint">{label}</div>
            <ul className="mt-3 space-y-1">
              {list.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => onOpen(c.id)}
                    className={`w-full truncate rounded-xl px-2.5 py-2 text-left text-small transition ${open === c.id ? 'bg-wash text-accent' : 'text-ink2 hover:bg-wash2'}`}
                  >
                    {c.turns[0]?.q ?? 'Conversation'}
                    <span className="mt-0.5 flex items-center gap-1 font-mono text-label text-hint">
                      {label === 'Today' ? 'Today' : new Date(c.at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                      <Lock className="size-2.5" /> preview
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-ink p-4 text-white">
        <div className="font-mono text-label uppercase tracking-[0.14em] text-accent3">Keep them</div>
        <p className="mt-2 text-small leading-relaxed text-white/70">
          Your current chat will not be saved. Make a free account to save history of chat.
        </p>
        <a
          href={account('Saralya AI account')}
          className="mt-4 block rounded-full bg-accent px-4 py-2.5 text-center text-small font-semibold text-white transition-colors hover:bg-accent2"
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
  onStarter,
  onTools,
}: {
  seat: Role | null
  onSeat: (r: Role | null) => void
  onStarter: (s: Starter) => void
  onTools: () => void
}) {
  return (
    <div className="relative mx-auto w-full max-w-[74rem]">
      <SaralAiPanel onAsk={onStarter} seat={seat} onSeat={onSeat} />

      <section className="mt-10 border-t border-line pt-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="display text-h3">What Saral Saarthi can do</h2>
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

function Cross({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden>
      <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

function Dots({ className }: { className?: string }) {
  return (
    <div className={`${className} grid grid-cols-5 gap-1.5`} aria-hidden>
      {Array.from({ length: 25 }).map((_, i) => (
        <span key={i} className="size-0.5 rounded-full bg-ink/20" />
      ))}
    </div>
  )
}

/* Reveals `text` a few characters at a time so an answer that already exists
   reads like it is arriving live, ChatGPT-style. */
function Typewriter({ text, onTick }: { text: string; onTick?: () => void }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    setN(0)
    const step = Math.max(1, Math.round(text.length / 160))
    const id = setInterval(() => {
      setN((v) => {
        const next = v + step
        if (next >= text.length) clearInterval(id)
        return Math.min(next, text.length)
      })
    }, 30)
    return () => clearInterval(id)
  }, [text])
  useEffect(() => { onTick?.() })
  const done = n >= text.length
  return (
    <>
      {text.slice(0, n)}
      {!done && <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-ink2" />}
    </>
  )
}

function Composer({ q, onQ, onSubmit, busy, onFiles }: { q: string; onQ: (s: string) => void; onSubmit: (e: FormEvent) => void; busy: boolean; onFiles: (list: FileList | null) => void }) {
  const picker = useRef<HTMLInputElement>(null)
  return (
    <>
      <form onSubmit={onSubmit} className="rounded-[1.5rem] bg-white p-3.5 ring-2 ring-line2 transition focus-within:ring-accent">
        <textarea
          value={q}
          onChange={(e) => onQ(e.target.value.slice(0, LIMIT))}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              onSubmit(e)
            }
          }}
          rows={1}
          aria-label="Ask a follow-up"
          placeholder="Ask a follow-up…"
          className="w-full resize-none bg-transparent text-body outline-none placeholder:text-hint"
        />
        <div className="mt-2.5 flex items-center justify-between gap-4 border-t border-line2 pt-2.5">
          <button
            type="button"
            onClick={() => picker.current?.click()}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-small text-muted transition-colors hover:bg-wash hover:text-accent"
          >
            <Paperclip className="size-4" /> Attach
          </button>
          <input
            ref={picker}
            type="file"
            multiple
            accept={ACCEPT}
            hidden
            onChange={(e) => {
              onFiles(e.target.files)
              e.target.value = ''
            }}
          />
          <div className="flex items-center gap-3">
            <span className="font-mono text-label text-hint">
              {q.length} / {LIMIT}
            </span>
            <button
              type="submit"
              disabled={!q.trim() || busy}
              className="rounded-full bg-accent px-5 py-2.5 text-small font-semibold text-white transition-colors hover:bg-accent2 disabled:bg-line disabled:text-hint"
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
    <div className="relative mx-auto w-full max-w-[74rem]">
      <div className="font-mono text-label uppercase tracking-[0.14em] text-hint">Tools</div>
      <h1 className="display mt-1.5 text-h2 md:text-h1">Underwriting, monitoring and CAM tools for NBFCs.</h1>
      <p className="mt-4 max-w-[46rem] text-body leading-relaxed text-muted">
        Bank statements, CAM drafts, SMA signals and portfolio monitoring. First run free; a free account saves history and uses tokens.
      </p>
      <ToolCards />
      <Guards />
    </div>
  )
}

function ToolCards() {
  return (
    <div className="mt-12 border-t border-line">
      {TOOLS.map((t, i) => {
        const Icon = TOOL_ICONS[t.icon]
        return (
          <a
            key={t.id}
            href={account(`Saralya AI · ${t.name}`)}
            className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-line py-7 transition hover:bg-wash md:grid-cols-[4rem_1fr_auto_auto] md:gap-9 md:py-8"
          >
            <span className="font-mono text-h3 text-line2 transition-colors group-hover:text-accent">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <h3 className="display text-h3 text-ink">{t.name}</h3>
              <p className="mt-1.5 max-w-[42rem] text-body leading-relaxed text-muted">{t.body}</p>
            </div>
            <div className="hidden items-center gap-6 md:flex">
              <Icon className="size-6 text-accent" strokeWidth={1.7} />
              <span className="inline-flex items-center gap-1.5 font-mono text-label uppercase tracking-[0.1em] text-muted">
                {t.gate === 'account' && <Lock className="size-2.5" strokeWidth={2} />}
                {t.gate === 'free' ? 'Free' : 'Free account'}
              </span>
            </div>
            <span className="grid size-10 place-items-center text-accent transition-transform group-hover:translate-x-1">
              <ArrowRight className="size-5" strokeWidth={1.8} />
            </span>
          </a>
        )
      })}
    </div>
  )
}


function ToolGrid({ limit }: { limit?: number }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [ripple, setRipple] = useState<{ id: string; x: number; y: number; k: number } | null>(null)

  const trigger = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    const r = e.currentTarget.getBoundingClientRect()
    setRipple({ id, x: e.clientX - r.left, y: e.clientY - r.top, k: Date.now() })
    setLoadingId(id)
    setTimeout(() => {
      setLoadingId(null)
      setOpenId((prev) => (prev === id ? null : id))
    }, 380)
  }

  return (
    <div className="mt-6 space-y-3">
      {TOOLS.slice(0, limit ?? TOOLS.length).map((t) => {
        const Icon = TOOL_ICONS[t.icon]
        const open = openId === t.id
        const loading = loadingId === t.id
        return (
          <motion.div
            key={t.id}
            layout
            transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
            className={`group relative overflow-hidden rounded-2xl border transition-[box-shadow,border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_18px_36px_-18px_rgba(0,95,75,0.35),0_0_0_4px_rgba(0,95,75,0.05)] ${open ? 'border-accent/40 bg-green-w shadow-[0_18px_36px_-18px_rgba(0,95,75,0.35),0_0_0_4px_rgba(0,95,75,0.05)]' : 'border-line2 bg-white'}`}
          >
            <button
              type="button"
              onClick={(e) => trigger(e, t.id)}
              aria-expanded={open}
              className="relative flex w-full items-center gap-4 px-4 py-4 text-left"
            >
              {ripple?.id === t.id && (
                <motion.span
                  key={ripple.k}
                  aria-hidden
                  className="pointer-events-none absolute size-5 rounded-full bg-accent/25"
                  style={{ left: ripple.x - 10, top: ripple.y - 10 }}
                  initial={{ scale: 0, opacity: 0.55 }}
                  animate={{ scale: 40, opacity: 0 }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                />
              )}
              <span className="relative grid size-10 shrink-0 place-items-center rounded-xl bg-wash text-accent transition-colors group-hover:bg-white">
                <Icon className="size-4" strokeWidth={1.7} />
              </span>
              <div className="relative flex min-w-0 flex-1 items-baseline gap-3">
                <span className="text-small font-semibold text-ink">{t.name}</span>
                <span className="truncate text-small text-muted">{t.body}</span>
              </div>
              <span
                className={`relative hidden rounded-full px-2.5 py-1 font-mono text-label uppercase tracking-[0.1em] md:block ${t.gate === 'free' ? 'bg-green-w text-green' : 'bg-wash text-muted'}`}
              >
                {t.gate === 'free' ? 'Free' : 'Account'}
              </span>
              <span className="relative grid size-6 shrink-0 place-items-center text-accent">
                <AnimatePresence mode="wait" initial={false}>
                  {loading ? (
                    <motion.span
                      key="spin"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Loader2 className="size-4 animate-spin" strokeWidth={2} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="arrow"
                      initial={{ opacity: 0, rotate: open ? 0 : -90 }}
                      animate={{ opacity: 1, rotate: open ? 90 : 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.18 }}
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      <ArrowRight className="size-4" strokeWidth={2} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="drawer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ height: { duration: 0.32, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.22 } }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 border-t border-accent/15 bg-white/60 px-4 py-4">
                    <div className="font-mono text-label uppercase tracking-[0.14em] text-hint">What you get</div>
                    <p className="text-small leading-relaxed text-ink2">{t.body}</p>
                    <ul className="grid gap-1.5 text-small text-muted sm:grid-cols-3">
                      <li className="flex items-center gap-2"><span className="size-1 rounded-full bg-accent" /> {t.gate === 'free' ? 'No account needed' : 'Opens with a free account'}</li>
                      <li className="flex items-center gap-2"><span className="size-1 rounded-full bg-accent" /> {t.note}</li>
                      <li className="flex items-center gap-2"><span className="size-1 rounded-full bg-accent" /> Private, stays on this browser</li>
                    </ul>
                    <a
                      href={account(`Saralya AI · ${t.name}`)}
                      className="mt-1 inline-flex items-center gap-1.5 text-small font-semibold text-accent hover:underline"
                    >
                      Open {t.name} <ArrowRight className="size-3.5" strokeWidth={2} />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

function Guards() {
  return (
    <section className="mt-10">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-hint">
        {GUARDS.map((g, i) => {
          const { icon: Icon } = GUARD_META[i]
          return (
            <div key={g.title} className="flex items-center gap-2">
              <Icon className="size-3 shrink-0" strokeWidth={1.6} />
              <span className="text-label leading-tight">{g.title}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
