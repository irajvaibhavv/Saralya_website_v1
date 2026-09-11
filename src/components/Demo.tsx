import { useEffect, useRef, useState } from 'react'
import { Reveal } from './Reveal'

const LOAD_STEPS = [
  'Fetching CIBIL bureau report…',
  'Pulling GST filing history…',
  'Analysing 6 months of bank statements…',
  'Running Saralya Fin-LLM risk model…',
  'Checking fraud & EWS signals…',
]

const BANDS = [
  { key: 'Risk band', value: 'Prime', color: 'var(--accent)', pct: 82 },
  { key: 'GST health', value: 'Regular filer', color: 'var(--accent)', pct: 88 },
  { key: 'Bank behaviour', value: 'Moderate', color: 'var(--amber)', pct: 64 },
]

type Phase = 'empty' | 'loading' | 'report'

export function Demo() {
  const [phase, setPhase] = useState<Phase>('empty')
  const [activeStep, setActiveStep] = useState(-1)
  const [doneSteps, setDoneSteps] = useState<Set<number>>(new Set())
  const [gaugeNum, setGaugeNum] = useState(0)
  const [gaugeOffset, setGaugeOffset] = useState(340)
  const [bandWidths, setBandWidths] = useState<number[]>([0, 0, 0])
  const rafRef = useRef<number>(0)

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  const run = () => {
    setPhase('loading')
    setDoneSteps(new Set())
    setActiveStep(0)
    setGaugeNum(0)
    setGaugeOffset(340)
    setBandWidths([0, 0, 0])

    let i = 0
    const advance = () => {
      if (i > 0) setDoneSteps((prev) => new Set(prev).add(i - 1))
      if (i < LOAD_STEPS.length) {
        setActiveStep(i)
        i++
        setTimeout(advance, 620)
      } else {
        setTimeout(() => {
          setPhase('report')
          const pct = 742 / 850
          requestAnimationFrame(() => setGaugeOffset(340 - 340 * pct))
          const t0 = performance.now()
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / 1200)
            const e = 1 - Math.pow(1 - p, 3)
            setGaugeNum(Math.round(742 * e))
            if (p < 1) rafRef.current = requestAnimationFrame(tick)
          }
          rafRef.current = requestAnimationFrame(tick)
          setTimeout(() => setBandWidths(BANDS.map((b) => b.pct)), 100)
        }, 500)
      }
    }
    advance()
  }

  return (
    <section className="s demo-bg" id="demo">
      <div className="w">
        <Reveal className="sec-hd">
          <div className="sec-eye">Try it yourself</div>
          <h2 className="sec-h">
            Run a live decision. <em>Watch the report build.</em>
          </h2>
          <p className="sec-p">Enter an application. Watch the report build in real time.</p>
        </Reveal>

        <Reveal className="demo-shell">
          <div className="demo-grid">
            <div className="demo-form">
              <div className="demo-form-hd">New application</div>
              <div className="demo-form-sub">Sample data pre-loaded.</div>
              <div className="demo-field">
                <label>Applicant name</label>
                <input type="text" defaultValue="Rahul Kumar" />
              </div>
              <div className="demo-field">
                <label>Loan amount (₹)</label>
                <input type="text" defaultValue="4,20,000" />
              </div>
              <div className="demo-field">
                <label>Product type</label>
                <select defaultValue="MSME · Working capital">
                  <option>MSME · Working capital</option>
                  <option>Retail · Personal loan</option>
                  <option>SME · Term loan</option>
                  <option>Micro · Business loan</option>
                </select>
              </div>
              <div className="demo-field">
                <label>City</label>
                <input type="text" defaultValue="Coimbatore" />
              </div>
              <button className="demo-run" onClick={run}>
                <svg viewBox="0 0 24 24">
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
                Run decision
              </button>
            </div>

            <div className="demo-out">
              {phase === 'empty' && (
                <div className="demo-empty">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M9 9h6M9 13h6M9 17h4" />
                  </svg>
                  <div className="demo-empty-t">No decision yet</div>
                  <div className="demo-empty-s">Hit "Run decision" to fetch and score this application.</div>
                </div>
              )}

              <div className={`demo-loading ${phase === 'loading' ? 'show' : ''}`.trim()}>
                {LOAD_STEPS.map((label, i) => {
                  const status = doneSteps.has(i) ? 'done' : activeStep === i ? 'active' : ''
                  return (
                    <div className={`load-step ${status}`.trim()} key={label}>
                      <div className="load-ic">
                        {status === 'done' ? (
                          <svg viewBox="0 0 24 24">
                            <path d="M5 12l5 5L20 7" />
                          </svg>
                        ) : (
                          <div className="spinner"></div>
                        )}
                      </div>
                      <div>{label}</div>
                    </div>
                  )
                })}
              </div>

              <div className={`demo-report ${phase === 'report' ? 'show' : ''}`.trim()}>
                <div className="report-hd">
                  <div className="report-verdict rv-approve">
                    <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, stroke: 'currentColor', strokeWidth: 3, fill: 'none' }}>
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Approve · STP
                  </div>
                  <div className="report-app">
                    APP-2841
                    <br />
                    decided in 4.7s
                  </div>
                </div>
                <div className="report-top">
                  <div className="gauge">
                    <svg width="130" height="130" viewBox="0 0 130 130">
                      <defs>
                        <linearGradient id="gg" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stopColor="#7f63ff" />
                          <stop offset="1" stopColor="#c034e8" />
                        </linearGradient>
                      </defs>
                      <circle className="gauge-track" cx="65" cy="65" r="54"></circle>
                      <circle className="gauge-fill" cx="65" cy="65" r="54" style={{ strokeDashoffset: gaugeOffset }}></circle>
                    </svg>
                    <div className="gauge-center">
                      <div className="gauge-num">{gaugeNum}</div>
                      <div className="gauge-lbl">Credit score</div>
                    </div>
                  </div>
                  <div className="report-bands">
                    {BANDS.map((b, i) => (
                      <div className="rband" key={b.key}>
                        <div className="rband-hd">
                          <span className="rband-k">{b.key}</span>
                          <span className="rband-v" style={{ color: b.color }}>
                            {b.value}
                          </span>
                        </div>
                        <div className="rband-bar">
                          <div className="rband-fill" style={{ background: b.color, width: `${bandWidths[i]}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="report-flags">
                  <div className="report-flags-t">Signals checked</div>
                  <div className="flag-row flag-ok">
                    <svg viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    No fraud markers · identity verified
                  </div>
                  <div className="flag-row flag-ok">
                    <svg viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    No EWS drift · cohort stable
                  </div>
                  <div className="flag-row flag-warn">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 9v4M12 17h.01M4 20h16L12 4z" />
                    </svg>
                    DPD 30 once, 14 months ago · non-blocking
                  </div>
                </div>
                <div className="report-foot">
                  <span>
                    vs peer median: <b>+18% approval confidence</b>
                  </span>
                  <span>
                    RBI + DPDP <b>aligned</b>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
