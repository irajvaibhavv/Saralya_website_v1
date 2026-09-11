import { Reveal } from './Reveal'
import { CheckIcon } from './icons'

export function Orbit() {
  return (
    <section className="s s-line">
      <div className="w">
        <div className="orbit-wrap">
          <Reveal>
            <div className="sec-eye" style={{ justifyContent: 'flex-start' }}>
              Ecosystem
            </div>
            <h2 className="sec-h" style={{ textAlign: 'left' }}>
              Plugs into <em>what you already run.</em>
            </h2>
            <p className="sec-p" style={{ textAlign: 'left', margin: 0 }}>
              A decision layer, not a rip-and-replace.
            </p>
            <div className="orbit-legend">
              <div className="oleg">
                <CheckIcon />
                Keep your CBS, LOS and LMS
              </div>
              <div className="oleg">
                <CheckIcon />
                Keep your bureau relationships
              </div>
              <div className="oleg">
                <CheckIcon />
                Keep your team and field officers
              </div>
            </div>
          </Reveal>
          <Reveal className="orbit">
            <div className="orbit-ring or-1"></div>
            <div className="orbit-ring or-2"></div>
            <div className="orbit-core">Saralya</div>
            <div className="orbit-spin">
              <div className="on-node" style={{ top: '-5%', left: '32%' }}>
                <span>Core LOS</span>FinnOne
              </div>
              <div className="on-node" style={{ top: '42%', right: '-14%' }}>
                <span>Bureau</span>CIBIL
              </div>
              <div className="on-node" style={{ bottom: '-5%', left: '34%' }}>
                <span>e-Sign</span>Digio
              </div>
              <div className="on-node" style={{ top: '42%', left: '-12%' }}>
                <span>Data</span>GSTN
              </div>
            </div>
            <div className="orbit-spin rev">
              <div className="on-node" style={{ top: '-8%', left: '38%' }}>
                <span>Origination</span>Lentra
              </div>
              <div className="on-node" style={{ bottom: '-8%', right: '20%' }}>
                <span>Payout</span>NACH
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
