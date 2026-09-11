import { useEffect, useState } from 'react'
import { Reveal } from './Reveal'

const APPLICANTS = [
  { initials: 'RK', color: '#c034e8', name: 'R. Kumar', meta: '₹4.2L · MSME' },
  { initials: 'SS', color: '#5b3df5', name: 'S. Sharma', meta: '₹8L · Retail' },
  { initials: 'MP', color: '#e08700', name: 'M. Patel', meta: '₹2.8L · MSME' },
  { initials: 'AR', color: '#e0435c', name: 'A. Reddy', meta: '₹5.5L · Wk cap' },
]

const BRAIN_CELLS = [
  { label: 'Score', d: 'M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z' },
  { label: 'Fraud', d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  { label: 'EWS', d: 'M12 9v4M12 17h.01M4 20h16L12 4z' },
  { label: 'Collect', d: 'M22 12h-4l-3 9L9 3l-3 9H2' },
  { label: 'DLD', d: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' },
  { label: 'Report', d: 'M18 20V10M12 20V4M6 20v-6' },
]

function useLiveLane(start: number, chance: number, step: number, intervalMs: number) {
  const [n, setN] = useState(start)
  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() > 1 - chance) setN((prev) => prev + step)
    }, intervalMs)
    return () => clearInterval(id)
  }, [chance, step, intervalMs])
  return n
}

export function LivePipeline() {
  const [approved, setApproved] = useState(1247)
  const flagged = useLiveLane(86, 0.3, 1, 3000)
  const rejected = useLiveLane(92, 0.2, 1, 3000)

  useEffect(() => {
    const id = setInterval(() => {
      setApproved((prev) => prev + Math.floor(Math.random() * 3))
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="s">
      <div className="w">
        <Reveal className="sec-hd">
          <div className="sec-eye">Live pipeline</div>
          <h2 className="sec-h">
            Applications in. <em>Decisions out.</em>
          </h2>
        </Reveal>
        <Reveal className="machine">
          <div className="machine-hd">
            <span>Saralya · live pipeline</span>
            <span className="machine-live">
              <span className="pulse-dot"></span> Processing
            </span>
          </div>
          <div className="flow-3">
            <div className="queue">
              <div className="queue-lbl">Applications in &rarr;</div>
              {APPLICANTS.map((a) => (
                <div className="app-card" key={a.name}>
                  <div className="app-av" style={{ background: a.color }}>
                    {a.initials}
                  </div>
                  <div>
                    <div className="app-name">{a.name}</div>
                    <div className="app-meta">{a.meta}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="brain">
              <div>
                <div className="brain-lbl">Saralya Fin-LLM v0.6</div>
                <div className="brain-name">The lending brain</div>
                <div className="brain-tag">Indian BFSI data · Inference inside India</div>
              </div>
              <div className="brain-grid">
                {BRAIN_CELLS.map((c) => (
                  <div className="brain-cell" key={c.label}>
                    <svg viewBox="0 0 24 24">
                      <path d={c.d} />
                    </svg>
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>
              <div className="brain-foot">REST API · Webhooks · Modular · Pay per loan</div>
            </div>
            <div className="lanes">
              <div className="queue-lbl">&larr; Decisions out</div>
              <div className="lane lane-g">
                <div>
                  <div className="lane-lbl">Approved</div>
                  <div className="lane-val">{approved.toLocaleString('en-IN')}</div>
                </div>
              </div>
              <div className="lane lane-a">
                <div>
                  <div className="lane-lbl">Flagged</div>
                  <div className="lane-val">{flagged}</div>
                </div>
              </div>
              <div className="lane lane-r">
                <div>
                  <div className="lane-lbl">Rejected</div>
                  <div className="lane-val">{rejected}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="machine-ticker">
            <span>
              avg decision <b>4.7s</b>
            </span>
            <span>
              audit <b>immutable</b>
            </span>
            <span>
              compliance <b>rbi + dpdp</b>
            </span>
            <span>
              pricing <b>per loan</b>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
