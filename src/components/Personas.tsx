import { useState } from 'react'
import { Reveal } from './Reveal'

type PersonaKey = 'uw' | 'risk' | 'coll' | 'cto' | 'comp'

const TABS: { key: PersonaKey; label: string; path: string[] }[] = [
  {
    key: 'uw',
    label: 'Underwriter',
    path: ['M9 11l3 3L22 4', 'M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11'],
  },
  { key: 'risk', label: 'Risk / CRO', path: ['M3 3v18h18', 'M7 14l4-4 4 4 5-5'] },
  {
    key: 'coll',
    label: 'Collections',
    path: ['M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72'],
  },
  { key: 'cto', label: 'CTO / Tech', path: ['M16 18l6-6-6-6M8 6l-6 6 6 6'] },
  {
    key: 'comp',
    label: 'Compliance',
    path: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'],
  },
]

const PANELS: Record<
  PersonaKey,
  {
    badgeBg: string
    badgeColor: string
    badge: string
    pain: string
    title: string
    desc: string
    feats: string[]
    mock: { title: string; rows: { k: string; v: string; cls?: string; bar?: { pct: number; color: string } }[] }
  }
> = {
  uw: {
    badgeBg: 'var(--wash)',
    badgeColor: 'var(--accent)',
    badge: 'For underwriters',
    pain: 'Today: chasing documents all day',
    title: 'Every file lands scored, enriched, decision-ready.',
    desc: 'Everything pulled, analysed, and reason-coded before it reaches you.',
    feats: [
      'Bureau, GST & bank statement pre-fetched',
      'Reason codes in plain language',
      'STP-eligible files auto-cleared',
    ],
    mock: {
      title: 'underwriter · APP-2841',
      rows: [
        { k: 'credit_score', v: '742 · Prime', cls: 'g' },
        { k: 'stp_eligible', v: 'true', cls: 'g' },
        { k: 'gst_health', v: 'Regular filer', cls: 'g' },
        { k: 'bank_avg_balance', v: '₹1.4L' },
        { k: 'recommendation', v: 'Approve · ₹4.2L', cls: 'g' },
      ],
    },
  },
  risk: {
    badgeBg: 'var(--blue-w)',
    badgeColor: 'var(--blue)',
    badge: 'For risk & CROs',
    pain: "Today: you see drift when it's already a default",
    title: 'Catch the slide before SMA-0 becomes SMA-2.',
    desc: 'Cohort drift surfaced days early — not a post-mortem after quarter close.',
    feats: [
      'Day-1 anomaly tagging across the book',
      'Cohort heatmaps vs peer median',
      'Auto-allocation to RCU triage',
    ],
    mock: {
      title: 'risk · portfolio EWS',
      rows: [
        { k: 'SMA-0 → SMA-1 drift', v: '4.2%', cls: 'a' },
        { k: 'North zone · vintage 18mo', v: '', bar: { pct: 68, color: 'var(--amber)' } },
        { k: 'flagged_accounts', v: '38 · auto-allocated', cls: 'a' },
        { k: 'peer_median', v: "2.1% · you're above", cls: 'g' },
      ],
    },
  },
  coll: {
    badgeBg: 'var(--amber-w)',
    badgeColor: 'var(--amber)',
    badge: 'For collections heads',
    pain: 'Today: your team calls everyone, in no order',
    title: 'Know who to call first — and exactly why.',
    desc: 'Accounts ranked by recoverability, routed to the right officer, tracked live.',
    feats: [
      'Recoverability-ranked call lists',
      'Field-officer efficacy scoring',
      'Remediation workflow triggers',
    ],
    mock: {
      title: 'collections · this month',
      rows: [
        { k: 'field_officer_efficacy', v: '81%', cls: 'g' },
        { k: 'recovered · 30 days', v: '', bar: { pct: 66, color: 'var(--accent)' } },
        { k: 'amount_recovered', v: '₹1.42 Cr', cls: 'g' },
        { k: 'priority_queue', v: '142 accounts ranked' },
      ],
    },
  },
  cto: {
    badgeBg: 'var(--purple-w)',
    badgeColor: 'var(--purple)',
    badge: 'For CTOs & tech leads',
    pain: 'Today: every vendor wants a rip-and-replace',
    title: 'One API. Keep your entire stack.',
    desc: 'A decision layer, not a core swap. Sandbox this week, production on your timeline.',
    feats: ['REST + webhooks, no rip-replace', 'Inference stays inside India', 'Sandbox in week one'],
    mock: {
      title: 'POST /v1/decide',
      rows: [
        { k: 'status', v: '200 OK · 4.7s', cls: 'g' },
        { k: 'decision', v: '"approve"', cls: 'g' },
        { k: 'score', v: '742' },
        { k: 'region', v: 'ap-south-1', cls: 'g' },
        { k: 'audit_id', v: 'immutable · logged' },
      ],
    },
  },
  comp: {
    badgeBg: 'var(--wash)',
    badgeColor: 'var(--accent)',
    badge: 'For compliance officers',
    pain: 'Today: inspection prep is a two-week fire drill',
    title: 'Inspection-ready in four clicks.',
    desc: 'Immutable trail on every decision. MD-FRM, DLD and DPDP enforced natively.',
    feats: [
      'Immutable, exportable audit trail',
      'MD-FRM 21-day SCN enforced',
      'Board pack generated on demand',
    ],
    mock: {
      title: 'compliance · Q3 FY26',
      rows: [
        { k: 'MD-FRM · 21-day SCN', v: 'Enforced', cls: 'g' },
        { k: 'DLD 2025 · KFS', v: 'Enforced', cls: 'g' },
        { k: '90-day NPA · Apr 26', v: 'Pre-aligned', cls: 'g' },
        { k: 'DPDP · consent', v: 'Enforced', cls: 'g' },
      ],
    },
  },
}

export function Personas() {
  const [active, setActive] = useState<PersonaKey>('uw')
  const panel = PANELS[active]

  return (
    <section className="s persona-bg" id="persona">
      <div className="w">
        <Reveal className="sec-hd">
          <div className="sec-eye">What's in it for you</div>
          <h2 className="sec-h">
            Pick your seat. <em>See your win.</em>
          </h2>
          <p className="sec-p">A different superpower for every seat on the credit floor.</p>
        </Reveal>

        <Reveal className="persona-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`ptab ${active === tab.key ? 'on' : ''}`.trim()}
              onClick={() => setActive(tab.key)}
            >
              <svg viewBox="0 0 24 24">
                {tab.path.map((d) => (
                  <path key={d} d={d} />
                ))}
              </svg>
              {tab.label}
            </button>
          ))}
        </Reveal>

        <div className="persona-panel">
          <div className="pcontent on">
            <div className="persona-card">
              <div className="persona-left">
                <span className="persona-badge" style={{ background: panel.badgeBg, color: panel.badgeColor }}>
                  {panel.badge}
                </span>
                <div className="persona-pain">{panel.pain}</div>
                <div className="persona-title">{panel.title}</div>
                <div className="persona-desc">{panel.desc}</div>
                <div className="persona-feats">
                  {panel.feats.map((f) => (
                    <div className="persona-feat" key={f}>
                      <svg viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="persona-right">
                <div className="pr-mock">
                  <div className="mock-win">
                    <div className="mock-bar">
                      <span className="mock-dot" style={{ background: 'var(--red)' }}></span>
                      <span className="mock-dot" style={{ background: 'var(--amber)' }}></span>
                      <span className="mock-dot" style={{ background: '#c4b5fd' }}></span>
                      <span className="mock-title">{panel.mock.title}</span>
                    </div>
                    <div className="mock-body">
                      {panel.mock.rows.map((row) =>
                        row.bar ? (
                          <div className="mock-row" style={{ display: 'block' }} key={row.k}>
                            <span className="mock-k">{row.k}</span>
                            <div className="mock-bar-viz">
                              <div
                                className="mock-bar-fill"
                                style={{ width: `${row.bar.pct}%`, background: row.bar.color }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="mock-row" key={row.k}>
                            <span className="mock-k">{row.k}</span>
                            <span className={`mock-v ${row.cls ?? ''}`.trim()}>{row.v}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
