import { useMotionValueEvent, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { CONTACT_EMAIL } from '../../content/site'
import { ButtonLink } from '../ui/Button'
import { FadeIn } from '../ui/Motion'
import { Container, Section } from '../ui/Section'

/* First thing a CRO/CEO can *do* on the site: move three sliders and see what
   the change is worth on their own book. Every number below is derived from
   their inputs — nothing is claimed about other lenders. */

const PER_LOAN = 75 // ₹/loan, mid-point of the pay-per-loan band

function crore(n: number) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(n < 1e8 ? 1 : 0)} Cr`
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(n < 1e6 ? 1 : 0)} L`
  return `₹${Math.round(n).toLocaleString('en-IN')}`
}
const count = (n: number) => Math.round(n).toLocaleString('en-IN')

export function RunYourNumbers() {
  const [loans, setLoans] = useState(5000)
  const [ticket, setTicket] = useState(200000)
  const [tat, setTat] = useState(5)

  const disbursal = loans * ticket
  const unlocked = (disbursal * tat) / 30 // value no longer stuck in the queue
  const cost = loans * PER_LOAN

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
                <Slider label="Turnaround today" value={tat} min={1} max={21} step={1} display={`${tat} ${tat === 1 ? 'day' : 'days'}`} onChange={setTat} />
              </div>
            </div>

            {/* outputs */}
            <div className="bg-wash2 p-7 md:p-9">
              <div className="grid gap-4 sm:grid-cols-2">
                <Tile label="Decision time" value="Under 5 min" note={`Down from ${tat} ${tat === 1 ? 'day' : 'days'}`} big />
                <Tile label="Monthly disbursal" value={<Roll to={disbursal} format={crore} />} note={`${count(loans)} loans`} />
                <Tile label="No longer stuck in queue" value={<Roll to={unlocked} format={crore} />} note="Value released each month" accent />
                <Tile label="Platform cost" value={<Roll to={cost} format={crore} />} note={`₹${PER_LOAN}/loan · no capex`} />
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <ButtonLink to={`mailto:${CONTACT_EMAIL}?subject=Portfolio%20diagnostic`} variant="ink" arrow>
                  Model my portfolio
                </ButtonLink>
                <p className="font-mono text-[11px] text-hint">Indicative — your inputs, our pricing.</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
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
