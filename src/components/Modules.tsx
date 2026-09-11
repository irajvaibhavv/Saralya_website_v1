import { Reveal } from './Reveal'
import { ArrowRightIcon } from './icons'

const MODULES = [
  {
    num: '01',
    iconClass: 'mod-ic-1',
    d: 'M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z',
    tag: 'Origination',
    name: 'Credit Origination',
    desc: 'Straight-through processing under 5 minutes with peer-benchmarked scoring.',
    pills: ['STP < 5 min', 'Peer benchmark', 'Auto-path'],
  },
  {
    num: '02',
    iconClass: 'mod-ic-2',
    d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    tag: 'Fraud',
    name: 'Fraud Risk (MD-FRM)',
    desc: 'RBI MD-FRM Jul 2024 aligned, with 21-day Show-Cause Notice workflow built in.',
    pills: ['RBI-aligned', '21-day SCN', 'Auto-flag'],
  },
  {
    num: '03',
    iconClass: 'mod-ic-3',
    d: 'M12 9v4M12 17h.01M4 20h16L12 4z',
    tag: 'Risk',
    name: 'Early Warning System',
    desc: 'Day-1 anomaly tagging across cohorts by geography, vintage, and ticket size.',
    pills: ['Day-1 alerts', 'Cohort drift', 'RCU triage'],
  },
  {
    num: '04',
    iconClass: 'mod-ic-4',
    d: 'M22 12h-4l-3 9L9 3l-3 9H2',
    tag: 'Collections',
    name: 'Collections Intelligence',
    desc: 'Recoverability-ranked call lists, field-officer efficacy, remediation triggers.',
    pills: ['Priority queue', 'Field scoring', 'Auto-route'],
  },
  {
    num: '05',
    iconClass: 'mod-ic-5',
    d: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z|M14 2v6h6',
    tag: 'Compliance',
    name: 'Digital Lending 2025',
    desc: 'LSP contracts, CIMS registration, KFS delivery, and fund-flow rules by default.',
    pills: ['DLD 2025', 'KFS delivery', 'Fund-flow'],
  },
  {
    num: '06',
    iconClass: 'mod-ic-6',
    d: 'M18 20V10M12 20V4M6 20v-6',
    tag: 'Analytics',
    name: 'Reporting & MIS',
    desc: 'Board packs and RBI filings, inspection-ready in four clicks with immutable logs.',
    pills: ['4-click audit', 'Board packs', 'Immutable'],
  },
]

export function Modules() {
  return (
    <section className="s">
      <div className="w">
        <Reveal className="sec-hd">
          <div className="sec-eye">Product modules</div>
          <h2 className="sec-h">
            Pick what you need. <em>Ignore the rest.</em>
          </h2>
          <p className="sec-p">Six modules, one API. No forced bundle.</p>
        </Reveal>
        <Reveal className="mod-grid">
          {MODULES.map((m) => (
            <div className="mod-card" key={m.num}>
              <div className="mod-header">
                <span className="mod-num">{m.num}</span>
                <div className={`mod-ic ${m.iconClass}`}>
                  <svg viewBox="0 0 24 24">
                    {m.d.split('|').map((d) => (
                      <path key={d} d={d} />
                    ))}
                  </svg>
                </div>
                <div className="mod-tag">{m.tag}</div>
              </div>
              <div className="mod-body">
                <div className="mod-name">{m.name}</div>
                <div className="mod-desc">{m.desc}</div>
                <div className="mod-pills">
                  {m.pills.map((p) => (
                    <span className="mod-pill" key={p}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mod-arrow">
                <ArrowRightIcon />
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
