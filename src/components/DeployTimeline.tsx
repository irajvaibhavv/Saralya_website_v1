import { Reveal } from './Reveal'

const STEPS = [
  { num: '01', week: 'Week 1', title: 'Sandbox', desc: 'API keys issued, docs shared, test traffic flowing' },
  { num: '02', week: 'Week 2', title: 'Shadow mode', desc: 'Runs against live traffic, decisions logged not applied' },
  { num: '03', week: 'Week 3–4', title: 'Calibration', desc: 'Policy thresholds tuned to your risk appetite' },
  { num: '04', week: 'Week 5', title: 'Production', desc: 'Cut over on your timeline, one module at a time' },
]

export function DeployTimeline() {
  return (
    <section className="s s-line">
      <div className="w">
        <Reveal className="sec-hd">
          <div className="sec-eye">Go live</div>
          <h2 className="sec-h">
            Sandbox this week. <em>Production this month.</em>
          </h2>
        </Reveal>
        <Reveal className="deploy">
          {STEPS.map((s) => (
            <div className="dep" key={s.num}>
              <div className="dep-dot">{s.num}</div>
              <div className="dep-w">{s.week}</div>
              <div className="dep-t">{s.title}</div>
              <div className="dep-d">{s.desc}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
