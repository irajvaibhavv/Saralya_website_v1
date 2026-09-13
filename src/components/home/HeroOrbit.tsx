import { Check, Fingerprint } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

/* Hero visual: pick a ticket and a sector, tap the button, and the data rails
   clear one by one until the sanction pops. Runs itself until someone taps. */

const RINGS = [
  { r: 25, dur: 36, dir: 1, nodes: [{ a: 20, l: 'CKYC', s: 0 }, { a: 200, l: 'GSTN', s: 2 }] },
  { r: 37, dur: 52, dir: -1, nodes: [{ a: 80, l: 'CIBIL', s: 1 }, { a: 260, l: 'Account Aggregator', s: 3 }] },
  { r: 49, dur: 70, dir: 1, nodes: [{ a: 140, l: 'NPCI · NACH', s: 5 }, { a: 320, l: 'MCA21', s: 4 }] },
]
const PULSES = [15, 75, 135, 195, 255, 315]
const STEPS = 6
const STEP_MS = 240

const TICKETS = [
  { l: '₹2 L', amt: '2,00,000' },
  { l: '₹10 L', amt: '10,00,000' },
  { l: '₹50 L', amt: '50,00,000' },
]
const SECTORS = [
  { l: 'Retail', t: '2m 31s' },
  { l: 'MSME', t: '4m 12s' },
  { l: 'LAP', t: '4m 55s' },
]

export function HeroOrbit() {
  const reduce = useReducedMotion()
  const [ticket, setTicket] = useState(0)
  const [sector, setSector] = useState(1)
  // 0 = idle, 1..STEPS = rails clearing, > STEPS = sanctioned
  const [step, setStep] = useState(0)
  const timers = useRef<number[]>([])

  const run = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    if (reduce) {
      setStep(STEPS + 1)
      timers.current.push(window.setTimeout(() => setStep(0), 2600))
      return
    }
    for (let i = 1; i <= STEPS + 1; i++) {
      timers.current.push(window.setTimeout(() => setStep(i), i * STEP_MS))
    }
    timers.current.push(window.setTimeout(() => setStep(0), STEPS * STEP_MS + 2800))
  }, [reduce])

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(run, 6400)
    return () => {
      clearInterval(id)
      timers.current.forEach(clearTimeout)
    }
  }, [reduce, run])

  const done = step > STEPS

  return (
    <div className="mx-auto w-full max-w-[300px] sm:max-w-[460px]">
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
        <Pills label="Ticket size" options={TICKETS.map((t) => t.l)} value={ticket} onChange={setTicket} />
        <Pills label="Sector" options={SECTORS.map((s) => s.l)} value={sector} onChange={setSector} />
      </div>

      <div className="relative aspect-square w-full select-none [container-type:inline-size]">
        {/* soft glow */}
        <div className="absolute inset-[18%] rounded-full bg-accent3/25 blur-[70px]" />

        {/* rings with orbiting nodes */}
        {RINGS.map((ring) => (
          <motion.div
            key={ring.r}
            className="absolute left-1/2 top-1/2 rounded-full border border-ink/[0.08]"
            style={{ width: `${ring.r * 2}%`, height: `${ring.r * 2}%`, x: '-50%', y: '-50%' }}
            animate={{ rotate: 360 * ring.dir }}
            transition={{ duration: ring.dur, repeat: Infinity, ease: 'linear' }}
          >
            {ring.nodes.map((n) => {
              const cleared = step > n.s
              return (
                <div key={n.l} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${n.a}deg) translateY(-${ring.r}cqw)` }}>
                  {/* counter-rotate so the label stays upright */}
                  <motion.div
                    style={{ x: '-50%', y: '-50%' }}
                    animate={{ rotate: -360 * ring.dir }}
                    transition={{ duration: ring.dur, repeat: Infinity, ease: 'linear' }}
                    className="absolute"
                  >
                    <motion.div
                      animate={{ rotate: -n.a, scale: cleared ? 1.06 : 1 }}
                      className={`flex items-center gap-1.5 whitespace-nowrap rounded-full p-1.5 text-[12px] font-semibold shadow-md transition-colors duration-200 sm:px-3 ${
                        cleared ? 'bg-green text-white' : 'bg-white text-ink2'
                      }`}
                    >
                      {cleared ? <Check className="size-3" strokeWidth={3.5} /> : <span className="size-1.5 rounded-full bg-accent" />}
                      <span className="hidden sm:inline">{n.l}</span>
                    </motion.div>
                  </motion.div>
                </div>
              )
            })}
          </motion.div>
        ))}

        {/* inward pulses */}
        {PULSES.map((a, i) => (
          <div key={a} className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transform: `rotate(${a}deg)` }}>
            <motion.span
              className="absolute size-2 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(91,61,245,0.55)]"
              style={{ x: '-50%', y: '-50%' }}
              animate={{ top: ['-46cqw', '-9cqw'], opacity: [0, 1, 1, 0], scale: [0.6, 1, 1, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.45, ease: 'easeIn', times: [0, 0.15, 0.85, 1] }}
            />
          </div>
        ))}

        {/* centre tap button */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[0, 1].map((k) => (
            <motion.span
              key={k}
              className="absolute inset-0 rounded-full border-2 border-accent"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, delay: k * 1.3, ease: 'easeOut' }}
            />
          ))}
          <motion.button
            type="button"
            aria-label="Run a decision"
            onClick={run}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            animate={done ? { scale: [1, 0.92, 1.04, 1] } : { scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative grid size-20 cursor-pointer place-items-center rounded-full bg-gradient-to-br from-accent3 via-accent to-purple text-white shadow-glow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40 sm:size-24 md:size-28"
          >
            <AnimatePresence mode="wait" initial={false}>
              {done ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                >
                  <Check className="size-11 md:size-12" strokeWidth={3} />
                </motion.span>
              ) : (
                <motion.span key="fp" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }}>
                  <Fingerprint className="size-11 md:size-12" strokeWidth={1.8} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <div className="absolute inset-x-0 -bottom-7 whitespace-nowrap text-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            {done ? 'Sanctioned' : step > 0 ? `Checking ${step}/${STEPS}` : 'Tap to decide'}
          </div>
        </div>

        {/* sanction pop */}
        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              className="absolute left-1/2 top-[8%] -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-[12px] font-bold text-white shadow-lg sm:top-[14%] sm:text-[13px]"
            >
              ₹{TICKETS[ticket].amt} sanctioned{' '}
              <span className="ml-1 font-mono text-[11px] font-medium text-[#c4b5fd]">{SECTORS[sector].t}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/** Small segmented control used for the ticket and sector choices. */
function Pills({ label, options, value, onChange }: { label: string; options: string[]; value: number; onChange: (i: number) => void }) {
  return (
    <div role="group" aria-label={label} className="isolate flex items-center gap-0.5 rounded-full bg-white p-1 shadow-sm">
      {options.map((o, i) => (
        <button
          key={o}
          type="button"
          aria-pressed={i === value}
          onClick={() => onChange(i)}
          className={`relative rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${i === value ? 'text-white' : 'text-muted hover:text-ink'}`}
        >
          {i === value && (
            <motion.span
              layoutId={`pill-${label}`}
              className="absolute inset-0 rounded-full bg-accent"
              transition={{ type: 'spring', stiffness: 400, damping: 34 }}
            />
          )}
          <span className="relative">{o}</span>
        </button>
      ))}
    </div>
  )
}
