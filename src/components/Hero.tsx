import { useEffect, useState } from 'react'

const ROTATOR_ITEMS = ['4.7 seconds.', 'one API call.', 'a single tap.', 'the time of a UPI payment.']

const HERO_STEPS = [
  { name: 'Application received', desc: 'Partner LSP · web journey', time: '0:00' },
  { name: 'Data enrichment', desc: 'CIBIL · GST · bank statement', time: '0:48' },
  { name: 'Risk model scored', desc: 'Fin-LLM v0.6 · policy engine', time: '1:52' },
  { name: 'Underwriting', desc: 'Maker-checker · auto path', time: '2:34' },
  { name: 'Decision & disbursement', desc: 'Sanction · e-agreement · NACH', time: '4:12' },
]

function useRotator(items: string[], intervalMs = 2600) {
  const [idx, setIdx] = useState(0)
  const [outIdx, setOutIdx] = useState<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prev) => {
        setOutIdx(prev)
        setTimeout(() => setOutIdx(null), 600)
        return (prev + 1) % items.length
      })
    }, intervalMs)
    return () => clearInterval(interval)
  }, [items.length, intervalMs])

  return { idx, outIdx }
}

type StepStatus = 'done' | 'now' | 'pending'

function useHeroStepLoop() {
  const [statuses, setStatuses] = useState<StepStatus[]>(['done', 'now', 'pending', 'pending', 'pending'])
  const [times, setTimes] = useState<string[]>(['0:00', '…', '—', '—', '—'])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStatuses(HERO_STEPS.map(() => 'done'))
      setTimes(HERO_STEPS.map((s) => s.time))
      return
    }

    const timers: number[] = []

    const play = () => {
      setStatuses(['done', 'now', 'pending', 'pending', 'pending'])
      setTimes(['0:00', '…', '—', '—', '—'])

      HERO_STEPS.forEach((_, i) => {
        if (i < 2) return
        const id = window.setTimeout(() => {
          setStatuses((prev) => {
            const next = [...prev]
            next[i - 1] = 'done'
            next[i] = 'now'
            return next
          })
          setTimes((prev) => {
            const next = [...prev]
            next[i - 1] = HERO_STEPS[i - 1].time
            next[i] = '…'
            return next
          })
        }, (i - 1) * 950)
        timers.push(id)
      })

      const lastId = window.setTimeout(
        () => {
          setStatuses((prev) => {
            const next = [...prev]
            next[HERO_STEPS.length - 1] = 'done'
            return next
          })
          setTimes((prev) => {
            const next = [...prev]
            next[HERO_STEPS.length - 1] = HERO_STEPS[HERO_STEPS.length - 1].time
            return next
          })
        },
        HERO_STEPS.length * 950,
      )
      timers.push(lastId)
    }

    const startId = window.setTimeout(() => {
      play()
      const intervalId = window.setInterval(play, (HERO_STEPS.length + 3) * 950)
      timers.push(intervalId)
    }, 900)
    timers.push(startId)

    return () => timers.forEach((id) => {
      clearTimeout(id)
      clearInterval(id)
    })
  }, [])

  return { statuses, times }
}

function useLiveCounter(start: number, min: number, max: number, intervalMs: number) {
  const [n, setN] = useState(start)
  useEffect(() => {
    const id = setInterval(() => {
      setN((prev) => prev + min + Math.floor(Math.random() * (max - min + 1)))
    }, intervalMs)
    return () => clearInterval(id)
  }, [min, max, intervalMs])
  return n
}

export function Hero() {
  const { idx, outIdx } = useRotator(ROTATOR_ITEMS)
  const { statuses, times } = useHeroStepLoop()
  const decisionsToday = useLiveCounter(12847, 1, 3, 2400)

  return (
    <section className="hero" id="top">
      <div className="w">
        <div className="hero-split">
          <div>
            <div className="hero-pill">
              <span className="live">LIVE</span>
              <span className="counter">{decisionsToday.toLocaleString('en-IN')} decisions today</span>
            </div>
            <h1 className="hero-h1">
              Loan decisions in
              <span className="hero-line2">
                <span className="rot">
                  {ROTATOR_ITEMS.map((text, i) => (
                    <span key={text} className={i === idx ? 'on' : i === outIdx ? 'out' : ''}>
                      {text}
                    </span>
                  ))}
                </span>
              </span>
            </h1>
            <p className="hero-sub">
              Saralya is the decision layer India's NBFCs run on. Plug in once — score, flag, approve and report, all
              through one endpoint.
            </p>
            <div className="hero-btns">
              <button className="hero-cta">Try a live decision &rarr;</button>
              <button className="hero-cta2">Book demo</button>
            </div>
            <div className="hero-meta">
              <div>
                <div className="hm-n">&lt; 5 min</div>
                <div className="hm-l">STP approval</div>
              </div>
              <div>
                <div className="hm-n">₹10,000Cr+</div>
                <div className="hm-l">Loans enabled</div>
              </div>
              <div>
                <div className="hm-n">99.95%</div>
                <div className="hm-l">Uptime</div>
              </div>
              <div>
                <div className="hm-n">25+</div>
                <div className="hm-l">NBFC partners</div>
              </div>
            </div>
          </div>

          <div className="hcard-wrap">
            <div className="hcard-ghost g2"></div>
            <div className="hcard-ghost"></div>
            <div className="hchip c1">
              <i></i>Trained on Indian BFSI data
            </div>
            <div className="hchip c2">
              <i></i>Inference stays in India
            </div>
            <div className="hchip c3">
              <i></i>RBI + DPDP aligned
            </div>
            <div className="hcard">
              <div className="hc-top">
                <span className="hc-live">
                  <span className="pulse-dot"></span>Live decision
                </span>
                <span>APP-2841</span>
              </div>
              <div className="hc-amt">
                <span className="r">₹</span>4,50,000
              </div>
              <div className="hc-meta">MSME · Working capital · 36 mo · Coimbatore</div>
              <div className="hc-steps">
                {HERO_STEPS.map((step, i) => (
                  <div key={step.name} className={`hstep ${statuses[i] !== 'pending' ? statuses[i] : ''}`.trim()}>
                    <span className="hs-dot">✓</span>
                    <div>
                      <div className="hs-n">{step.name}</div>
                      <div className="hs-d">{step.desc}</div>
                    </div>
                    <span className="hs-t">{times[i]}</span>
                  </div>
                ))}
              </div>
              <div className="hc-foot">
                <span>SLA · straight-through</span>
                <span>
                  <b>&lt; 5 min</b> end-to-end
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
