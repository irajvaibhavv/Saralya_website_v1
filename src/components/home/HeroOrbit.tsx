import { Check, Fingerprint } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

/* Hero visual: data rails orbit a single "tap" button; pulses stream inward and
   every few seconds a tap fires and a sanction pops out. Pure CSS/motion. */

const RINGS = [
  { r: 25, dur: 36, dir: 1, nodes: [{ a: 20, l: 'CKYC' }, { a: 200, l: 'GSTN' }] },
  { r: 37, dur: 52, dir: -1, nodes: [{ a: 80, l: 'CIBIL' }, { a: 260, l: 'Account Aggregator' }] },
  { r: 49, dur: 70, dir: 1, nodes: [{ a: 140, l: 'NPCI · NACH' }, { a: 320, l: 'MCA21' }] },
]
const PULSES = [15, 75, 135, 195, 255, 315]

export function HeroOrbit() {
  const reduce = useReducedMotion()
  const [fire, setFire] = useState(false)

  // tap → sanction loop
  useEffect(() => {
    if (reduce) return
    let on: number
    const id = window.setInterval(() => {
      setFire(true)
      on = window.setTimeout(() => setFire(false), 2600)
    }, 5200)
    return () => {
      clearInterval(id)
      clearTimeout(on)
    }
  }, [reduce])

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[300px] select-none [container-type:inline-size] sm:max-w-[460px]">
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
          {ring.nodes.map((n) => (
            <div
              key={n.l}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `rotate(${n.a}deg) translateY(-${ring.r}cqw)` }}
            >
              {/* counter-rotate so the label stays upright */}
              <motion.div
                style={{ x: '-50%', y: '-50%' }}
                animate={{ rotate: -360 * ring.dir }}
                transition={{ duration: ring.dur, repeat: Infinity, ease: 'linear' }}
                className="absolute"
              >
                <motion.div
                  animate={{ rotate: -n.a }}
                  className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white p-1.5 text-[12px] font-semibold text-ink2 shadow-md sm:px-3"
                >
                  <span className="size-1.5 rounded-full bg-accent" />
                  <span className="hidden sm:inline">{n.l}</span>
                </motion.div>
              </motion.div>
            </div>
          ))}
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
        <motion.div
          animate={fire ? { scale: [1, 0.92, 1.04, 1] } : { scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative grid size-20 place-items-center rounded-full bg-gradient-to-br from-accent3 via-accent to-purple text-white shadow-glow sm:size-24 md:size-28"
        >
          <AnimatePresence mode="wait" initial={false}>
            {fire ? (
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
        </motion.div>
        <div className="absolute inset-x-0 -bottom-7 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {fire ? 'Sanctioned' : 'One tap'}
        </div>
      </div>

      {/* sanction pop */}
      <AnimatePresence>
        {fire && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            className="absolute left-1/2 top-[8%] -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-[12px] font-bold text-white shadow-lg sm:top-[14%] sm:text-[13px]"
          >
            ₹4,50,000 sanctioned <span className="ml-1 font-mono text-[11px] font-medium text-[#c4b5fd]">4m 12s</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
