import { useEffect } from 'react'
import { Reveal } from './Reveal'
import { useReveal } from '../hooks/useReveal'
import { useState } from 'react'

const STEPS = [
  { n: 1, node: 'n-blue', time: 't-blue', d: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z|M14 2v6h6', name: 'Intake', desc: 'Data auto-fetch', timeLabel: 'Instant' },
  { n: 2, node: 'n-green', time: 't-green', d: 'M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z', name: 'Score', desc: 'Fin-LLM engine', timeLabel: '< 5 min' },
  { n: 3, node: 'n-amber', time: 't-amber', d: 'M12 9v4M12 17h.01M4 20h16L12 4z', name: 'Flag', desc: 'EWS + fraud', timeLabel: 'Day-1' },
  { n: 4, node: 'n-green', time: 't-green', d: 'M20 6L9 17l-5-5', name: 'Decide', desc: 'STP or maker-checker', timeLabel: 'Minutes' },
  { n: 5, node: 'n-red', time: 't-red', d: 'M22 12h-4l-3 9L9 3l-3 9H2', name: 'Monitor', desc: 'Collections', timeLabel: 'Ongoing' },
  { n: 6, node: 'n-blue', time: 't-blue', d: 'M18 20V10M12 20V4M6 20v-6', name: 'Report', desc: 'Board & RBI packs', timeLabel: '4 clicks' },
]

export function Lifecycle() {
  const wrapRef = useReveal<HTMLDivElement>()
  const [fillWidth, setFillWidth] = useState('0%')

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFillWidth('100%')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [wrapRef])

  return (
    <section className="s">
      <div className="w">
        <Reveal className="sec-hd">
          <div className="sec-eye">Loan lifecycle</div>
          <h2 className="sec-h">
            Every stage. <em>One platform.</em>
          </h2>
          <p className="sec-p">Application to board pack.</p>
        </Reveal>
        <div className="lc-wrap reveal" ref={wrapRef}>
          <div className="lc-line">
            <div className="lc-line-fill" style={{ width: fillWidth }}></div>
          </div>
          <div className="lc-track">
            {STEPS.map((s) => (
              <div className="lc-step" key={s.n}>
                <div className={`lc-node ${s.node}`}>
                  <span className="lc-badge">{s.n}</span>
                  <svg viewBox="0 0 24 24">
                    {s.d.split('|').map((d) => (
                      <path key={d} d={d} />
                    ))}
                  </svg>
                </div>
                <div className="lc-name">{s.name}</div>
                <div className="lc-desc">{s.desc}</div>
                <span className={`lc-time ${s.time}`}>{s.timeLabel}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
