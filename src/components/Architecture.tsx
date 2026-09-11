import { Reveal } from './Reveal'

const ROWS = [
  {
    layerClass: 'l1',
    d: 'M3 21h18M3 10h18M3 7l9-4 9 4',
    label: 'Integration',
    chips: ['FinnOne', 'Lentra', 'Any CBS', 'Bureau APIs', 'GST portal', 'Account Aggregator'],
  },
  {
    layerClass: 'l2',
    d: 'M12 2v10l7 3.5',
    circle: true,
    label: 'API gateway',
    chips: ['REST', 'Webhooks', 'SSO / MFA', 'RBAC', 'Maker-checker'],
  },
  {
    layerClass: 'l3',
    d: 'M12 1v4M12 19v4M1 12h4M19 12h4',
    circle: true,
    circleR: 3,
    label: 'Fin-LLM',
    chips: ['BFSI-trained', 'Indian inference', 'RBI-tuned', 'Anonymised'],
  },
  {
    layerClass: 'l4',
    rects: true,
    label: 'Modules',
    chips: ['Origination', 'Fraud', 'EWS', 'Collections', 'DLD', 'MIS'],
  },
  {
    layerClass: 'l5',
    d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    label: 'Security',
    chips: ['AES-256', 'TLS 1.3', 'Field masking', 'Immutable logs', 'SOC 2 (in progress)'],
  },
]

export function Architecture() {
  return (
    <section className="s s-line" id="arch">
      <div className="w">
        <Reveal className="sec-hd">
          <div className="sec-eye">Platform architecture</div>
          <h2 className="sec-h">
            Built in layers. <em>Deployed in days.</em>
          </h2>
          <p className="sec-p">Each layer independently deployable and auditable.</p>
        </Reveal>
        <Reveal className="arch-wrap">
          <div className="arch">
            {ROWS.map((row) => (
              <div className="arch-row" key={row.label}>
                <div className={`arch-label ${row.layerClass}`}>
                  <svg viewBox="0 0 24 24">
                    {row.rects ? (
                      <>
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                      </>
                    ) : row.circle ? (
                      <>
                        <circle cx="12" cy="12" r={row.circleR ?? 10} />
                        <path d={row.d} />
                      </>
                    ) : (
                      <path d={row.d} />
                    )}
                  </svg>
                  {row.label}
                </div>
                <div className="arch-chips">
                  {row.chips.map((c) => (
                    <span className="chip" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
