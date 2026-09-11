import { Reveal } from './Reveal'

const VOICES = [
  {
    quote:
      'The audit trail alone paid for itself. Inspection prep went from a two-week fire drill to a Monday afternoon.',
    initials: 'RM',
    color: 'var(--accent)',
    name: 'Rakesh M.',
    role: 'Chief Compliance Officer · NBFC-MFI',
  },
  {
    quote:
      'We kept our LOS, kept our team, kept our field officers. Saralya just took over the decisioning bit — and did it better.',
    initials: 'SP',
    color: 'var(--blue)',
    name: 'Shalini P.',
    role: 'Head of Credit · MSME NBFC',
  },
  {
    quote: 'First underwriting system where the model reasons in language my risk committee actually understands.',
    initials: 'AV',
    color: 'var(--purple)',
    name: 'Arjun V.',
    role: 'CTO · Digital lending platform',
  },
]

export function Voices() {
  return (
    <section className="s">
      <div className="w">
        <Reveal className="sec-hd">
          <div className="sec-eye">Operator voices</div>
          <h2 className="sec-h">
            What the credit floor <em>actually says.</em>
          </h2>
        </Reveal>
        <Reveal className="voices">
          {VOICES.map((v) => (
            <div className="voice" key={v.name}>
              <div className="voice-q">"</div>
              <div className="voice-b">{v.quote}</div>
              <div className="voice-a">
                <div className="voice-av" style={{ background: v.color }}>
                  {v.initials}
                </div>
                <div>
                  <div className="voice-n">{v.name}</div>
                  <div className="voice-r">{v.role}</div>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
