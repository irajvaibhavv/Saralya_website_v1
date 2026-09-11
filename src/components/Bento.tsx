import { useEffect, useRef, useState } from 'react'
import { Reveal } from './Reveal'

function Sparkbars() {
  const [heights, setHeights] = useState<number[]>(() => Array.from({ length: 16 }, () => 30))
  const [hotFrom, setHotFrom] = useState(13)

  useEffect(() => {
    const refresh = () => {
      const peak = 13 + Math.floor(Math.random() * 3)
      setHotFrom(peak - 1)
      setHeights(Array.from({ length: 16 }, (_, i) => Math.max(20, 20 + (i / 16) * 44 + Math.random() * 26)))
    }
    refresh()
    const id = setInterval(refresh, 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="sparkbars">
      {heights.map((h, i) => (
        <i key={i} className={i >= hotFrom ? 'hot' : ''} style={{ height: `${h}%` }} />
      ))}
    </div>
  )
}

function UptimeRing() {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const [offset, setOffset] = useState(176)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setOffset(176 - 176 * 0.9995)
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="ring-wrap" ref={wrapRef}>
      <svg width="68" height="68" viewBox="0 0 68 68">
        <circle className="ring-bg" cx="34" cy="34" r="28" />
        <circle className="ring-fg" cx="34" cy="34" r="28" style={{ strokeDashoffset: offset }} />
      </svg>
    </div>
  )
}

export function Bento() {
  return (
    <section className="s">
      <div className="w">
        <Reveal className="sec-hd">
          <div className="sec-eye">At a glance</div>
          <h2 className="sec-h">
            The whole platform. <em>One screen.</em>
          </h2>
        </Reveal>
        <Reveal className="bento">
          <div className="bx b-w2 bx-dark">
            <div className="bx-lbl">Decision speed</div>
            <div className="bx-big">
              4.7<small style={{ fontSize: 20, fontWeight: 600, opacity: 0.6 }}>s</small>
            </div>
            <div className="bx-sub">Median API response, application to verdict</div>
            <Sparkbars />
          </div>
          <div className="bx">
            <div className="bx-lbl">STP rate</div>
            <div className="bx-big" style={{ color: 'var(--accent)' }}>
              62<small style={{ fontSize: 20 }}>%</small>
            </div>
            <div className="bx-sub">vs 20% manual</div>
          </div>
          <div className="bx bx-accent">
            <div className="bx-lbl">Uptime</div>
            <div className="bx-big">
              99.95<small style={{ fontSize: 18 }}>%</small>
            </div>
            <div className="bx-sub">Last 12 months</div>
            <UptimeRing />
          </div>
          <div className="bx">
            <div className="bx-lbl">Data residency</div>
            <div className="bx-t" style={{ marginTop: 8 }}>
              🇮🇳 India only
            </div>
            <div className="bx-d">ap-south-1 · inference never leaves</div>
          </div>
          <div className="bx b-w2 bx-dark">
            <div className="bx-lbl">One API call</div>
            <div className="bx-code">
              POST /v1/decide
              <br />
              <b>200 OK</b> · 4.7s
              <br />
              {'{ "decision": '}
              <b>"approve"</b>
              {', "score": '}
              <b>742</b>
              {' }'}
            </div>
          </div>
          <div className="bx">
            <div className="bx-lbl">Audit trail</div>
            <div className="bx-big" style={{ color: 'var(--accent)' }}>
              4
            </div>
            <div className="bx-sub">clicks to inspection-ready</div>
          </div>
          <div className="bx b-w2">
            <div className="bx-lbl">Plugs into</div>
            <div className="bx-logos">
              {['FinnOne', 'Lentra', 'CIBIL', 'GSTN', 'NACH', 'Digio', 'Account Aggregator', 'Any CBS'].map((l) => (
                <span className="bx-logo" key={l}>
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div className="bx b-w2">
            <div className="bx-lbl">Pricing</div>
            <div className="bx-t" style={{ marginTop: 6 }}>
              Pay per loan
            </div>
            <div className="bx-d">Zero CAPEX. No seat licences. No rip-and-replace.</div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
