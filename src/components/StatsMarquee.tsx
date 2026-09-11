const STATS = [
  { num: '25+', label: 'NBFC partners' },
  { num: '500+', label: 'LSP partners' },
  { num: '₹10,000Cr+', label: 'Loan value enabled' },
  { num: '5M+', label: 'Applications processed' },
  { num: '99.95%', label: 'Uptime' },
]

function StatRow({ keyPrefix }: { keyPrefix: string }) {
  return (
    <>
      {STATS.map((s) => (
        <div key={`${keyPrefix}-${s.label}`} style={{ display: 'contents' }}>
          <div className="stat-item">
            <span className="stat-num">{s.num}</span>
            <span className="stat-lbl">{s.label}</span>
          </div>
          <div className="stat-sep">·</div>
        </div>
      ))}
    </>
  )
}

export function StatsMarquee() {
  return (
    <div className="stats-strip">
      <div className="stats-track">
        <StatRow keyPrefix="a" />
        <StatRow keyPrefix="b" />
      </div>
    </div>
  )
}
