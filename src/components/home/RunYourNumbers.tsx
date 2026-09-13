import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useSpring } from 'motion/react'
import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { CONTACT_EMAIL } from '../../content/site'
import { Button } from '../ui/Button'
import { FadeIn } from '../ui/Motion'
import { Container, Section } from '../ui/Section'

/* First thing a CRO/CEO can *do* on the site: move three sliders and see what
   the change is worth on their own book. Every number below is derived from
   their inputs — nothing is claimed about other lenders. */

const PER_LOAN = 75 // ₹/loan, mid-point of the pay-per-loan band
// TODO: founders to confirm or replace before launch — see CLAUDE.md open content flags.
const PEER_TAT_DAYS = 7

function crore(n: number) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(n < 1e8 ? 1 : 0)} Cr`
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(n < 1e6 ? 1 : 0)} L`
  return `₹${Math.round(n).toLocaleString('en-IN')}`
}
const count = (n: number) => Math.round(n).toLocaleString('en-IN')
const days = (n: number) => `${n} ${n === 1 ? 'day' : 'days'}`

export function RunYourNumbers() {
  const [loans, setLoans] = useState(5000)
  const [ticket, setTicket] = useState(200000)
  const [tat, setTat] = useState(5)
  const [open, setOpen] = useState(false)

  const disbursal = loans * ticket
  const unlocked = (disbursal * tat) / 30 // value no longer stuck in the queue
  const cost = loans * PER_LOAN
  const model = { loans, ticket, tat, disbursal, unlocked, cost }

  return (
    <Section tight id="numbers">
      <Container>
        <FadeIn className="overflow-hidden rounded-[32px] bg-white shadow-lg">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            {/* inputs */}
            <div className="border-b border-line p-7 md:p-9 lg:border-b-0 lg:border-r">
              <div className="eyebrow mb-3 flex items-center gap-3">
                For the CRO <span className="h-px w-6 bg-accent" />
              </div>
              <h2 className="display text-[clamp(26px,3.2vw,36px)]">Run your own book.</h2>
              <div className="mt-8 space-y-7">
                <Slider label="Loans decided / month" value={loans} min={250} max={50000} step={250} display={count(loans)} onChange={setLoans} />
                <Slider label="Average ticket" value={ticket} min={25000} max={2500000} step={25000} display={crore(ticket)} onChange={setTicket} />
                <Slider label="Turnaround today" value={tat} min={1} max={21} step={1} display={days(tat)} onChange={setTat} />
              </div>

              <div className="mt-8 rounded-2xl bg-wash2 p-5">
                <div className="space-y-3">
                  <Gauge label={`You — ${days(tat)}`} pct={tat / 21} tone="bg-ink" />
                  <Gauge label={`Median NBFC — ${PEER_TAT_DAYS} days`} pct={PEER_TAT_DAYS / 21} tone="bg-line2" />
                  <Gauge label="With Saralya — under 5 min" pct={0.02} tone="bg-accent" />
                </div>
                <p className="mt-4 text-[13px] text-muted">
                  {tat <= PEER_TAT_DAYS
                    ? `Ahead of the median — and still ${days(tat)} behind minutes.`
                    : `${tat - PEER_TAT_DAYS} days slower than the median.`}
                </p>
              </div>
            </div>

            {/* outputs */}
            <div className="flex flex-col bg-wash2 p-7 md:p-9">
              <div className="grid gap-4 sm:grid-cols-2">
                <Tile label="Decision time" value="Under 5 min" note={`Down from ${days(tat)}`} big />
                <Tile label="Monthly disbursal" value={<Roll to={disbursal} format={crore} />} note={`${count(loans)} loans`} />
                <Tile label="No longer stuck in queue" value={<Roll to={unlocked} format={crore} />} note="Value released each month" accent />
                <Tile label="Platform cost" value={<Roll to={cost} format={crore} />} note={`₹${PER_LOAN}/loan · no capex`} />
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-4 lg:mt-auto lg:pt-7">
                <Button variant="ink" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
                  Model my portfolio
                  <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className="size-4" />
                  </motion.span>
                </Button>
                <p className="font-mono text-[11px] text-hint">Indicative — your inputs, our pricing.</p>
              </div>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="model"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden border-t border-line"
              >
                <Model {...model} />
              </motion.div>
            )}
          </AnimatePresence>
        </FadeIn>
      </Container>
    </Section>
  )
}

type ModelProps = {
  loans: number
  ticket: number
  tat: number
  disbursal: number
  unlocked: number
  cost: number
}

/* Twelve months at the current run-rate, then a way to have it sent over. */
function Model(p: ModelProps) {
  const months = Array.from({ length: 12 }, (_, i) => (i + 1) * p.unlocked)
  const peak = months[11]
  const summary = [
    ['Decisions', count(p.loans * 12)],
    ['Disbursal', crore(p.disbursal * 12)],
    ['Value released', crore(p.unlocked * 12)],
    ['Platform cost', crore(p.cost * 12)],
  ] as const

  return (
    <div className="grid gap-10 p-7 md:p-9 lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        <div className="eyebrow mb-5 flex items-center gap-3">
          Twelve months <span className="h-px w-6 bg-accent" />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {summary.map(([k, v]) => (
            <div key={k}>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-hint">{k}</div>
              <div className="mt-1 text-[21px] font-extrabold tracking-[-0.03em] tabular-nums">{v}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex h-[150px] items-end gap-1.5">
          {months.map((v, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-accent3/40 to-accent"
              initial={{ height: 0 }}
              animate={{ height: `${(v / peak) * 100}%` }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10.5px] uppercase tracking-[0.12em] text-hint">
          <span>Month 1</span>
          <span className="hidden sm:inline">Cumulative value released</span>
          <span>Month 12</span>
        </div>
        <p className="mt-4 text-[13px] text-muted">
          At the current run-rate — {count(p.loans)} loans a month at {crore(p.ticket)}, turnaround cut from {days(p.tat)} to minutes. No growth
          assumed.
        </p>
      </div>

      <Capture {...p} />
    </div>
  )
}

/** Hands the modelled numbers to the mail app of the visitor, addressed to Saralya. */
function Capture(p: ModelProps) {
  const [name, setName] = useState('')
  const [org, setOrg] = useState('')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const body = [
      `Name: ${name}`,
      `Institution: ${org}`,
      `Email: ${email}`,
      '',
      'My inputs',
      `Loans decided / month: ${count(p.loans)}`,
      `Average ticket: ${crore(p.ticket)}`,
      `Turnaround today: ${days(p.tat)}`,
      '',
      'Modelled over 12 months',
      `Decisions: ${count(p.loans * 12)}`,
      `Disbursal: ${crore(p.disbursal * 12)}`,
      `Value released: ${crore(p.unlocked * 12)}`,
      `Platform cost: ${crore(p.cost * 12)}`,
      '',
      'Please send me this model.',
    ].join('\n')
    const subject = `Portfolio model — ${org || name}`
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <form onSubmit={submit} className="rounded-2xl bg-wash2 p-6">
      <div className="text-[17px] font-extrabold tracking-[-0.02em]">Want this on your letterhead?</div>
      <p className="mt-1 text-[13.5px] text-muted">We send the modelled pack and walk you through it.</p>
      <div className="mt-5 space-y-3">
        <Field label="Name" value={name} onChange={setName} autoComplete="name" />
        <Field label="Institution" value={org} onChange={setOrg} autoComplete="organization" />
        <Field label="Work email" value={email} onChange={setEmail} type="email" autoComplete="email" />
      </div>
      <Button type="submit" variant="ink" className="mt-5 w-full" arrow>
        Send me this model
      </Button>
      <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-hint">
        {sent ? 'Opening your mail app — hit send' : 'Opens your mail app · nothing stored here'}
      </p>
    </form>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  autoComplete,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  autoComplete?: string
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-hint">{label}</span>
      <input
        required
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl bg-white px-4 py-2.5 text-[14px] shadow-sm outline-none ring-accent/40 transition focus:ring-2"
      />
    </label>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  onChange: (n: number) => void
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-hint">{label}</span>
        <span className="text-[20px] font-extrabold tracking-[-0.02em] tabular-nums">{display}</span>
      </div>
      <input
        type="range"
        aria-label={label}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full cursor-pointer accent-accent"
      />
    </div>
  )
}

function Tile({
  label,
  value,
  note,
  accent,
  big,
}: {
  label: string
  value: React.ReactNode
  note: string
  accent?: boolean
  big?: boolean
}) {
  return (
    <div className={`rounded-2xl p-5 ${accent ? 'bg-ink text-white' : 'bg-white shadow-sm'}`}>
      <div className={`font-mono text-[10.5px] uppercase tracking-[0.12em] ${accent ? 'text-[#c4b5fd]' : 'text-hint'}`}>{label}</div>
      <div className={`mt-2 font-extrabold tracking-[-0.03em] tabular-nums ${big ? 'text-[26px] text-accent' : 'text-[28px]'}`}>{value}</div>
      <div className={`mt-1 text-[13px] ${accent ? 'text-white/70' : 'text-muted'}`}>{note}</div>
    </div>
  )
}

/** One row of the turnaround comparison. */
function Gauge({ label, pct, tone }: { label: string; pct: number; tone: string }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3 font-mono text-[11px]">
        <span className="text-ink2">{label}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white">
        <motion.div
          className={`h-full rounded-full ${tone}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(pct * 100, 2)}%` }}
          transition={{ type: 'spring', stiffness: 160, damping: 24 }}
        />
      </div>
    </div>
  )
}

/** Spring-rolls to `to` whenever the sliders move. */
function Roll({ to, format }: { to: number; format: (n: number) => string }) {
  const reduce = useReducedMotion()
  const spring = useSpring(to, { stiffness: 170, damping: 26 })
  const [shown, setShown] = useState(to)
  useMotionValueEvent(spring, 'change', (v) => setShown(v))
  useEffect(() => {
    spring.set(to)
  }, [to, spring])
  return <>{format(reduce ? to : shown)}</>
}
