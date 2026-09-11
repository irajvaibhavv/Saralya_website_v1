import { Reveal } from './Reveal'

const ITEMS = [
  { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', name: 'RBI MD-FRM', desc: 'Fraud Risk Management · Jul 2024 · 21-day SCN workflow' },
  { d: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z|M14 2v6h6', name: 'DLD 2025', desc: 'Digital Lending Directions · LSP · CIMS · KFS' },
  { d: 'M12 6v6l4 2', circle: true, name: '90-day NPA', desc: 'Base-layer NBFC transition · Apr 2026 · pre-aligned' },
  { d: 'M7 11V7a5 5 0 0110 0v4', rect: true, name: 'DPDP Act 2023', desc: 'Notice · consent · purpose limits · right to erasure' },
  { d: 'M5 12l5 5L20 7', name: 'AES-256 + TLS 1.3', desc: 'Encrypted at rest & in transit · SSO · MFA' },
  { d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2|M9 14l2 2 4-4', name: 'Immutable audit', desc: 'Actor · timestamp · before/after · exportable' },
]

export function Compliance() {
  return (
    <section className="s comp-bg" id="compliance">
      <div className="w">
        <Reveal className="sec-hd">
          <div className="sec-eye" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Built for inspection
          </div>
          <h2 className="sec-h" style={{ color: 'white' }}>
            Compliance is <em>the architecture.</em>
          </h2>
          <p className="sec-p" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Aligned with RBI directions and the DPDP Act.
          </p>
        </Reveal>
        <Reveal className="comp-grid">
          {ITEMS.map((item) => (
            <div className="comp-card" key={item.name}>
              <div className="comp-ic">
                <svg viewBox="0 0 24 24">
                  {item.circle && <circle cx="12" cy="12" r="10" />}
                  {item.rect && <rect x="3" y="11" width="18" height="10" rx="2" />}
                  {item.d.split('|').map((d) => (
                    <path key={d} d={d} />
                  ))}
                </svg>
              </div>
              <div>
                <div className="comp-name">{item.name}</div>
                <div className="comp-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
