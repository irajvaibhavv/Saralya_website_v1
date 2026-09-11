import { useEffect, useState } from 'react'
import { Reveal } from './Reveal'

const inr = (n: number) => Math.round(n).toLocaleString('en-IN')

export function Roi() {
  const [vol, setVol] = useState(10000)
  const [stp, setStp] = useState(20)
  const [tat, setTat] = useState(36)
  const [ticket, setTicket] = useState(3.5)
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    setFlash(true)
    const id = setTimeout(() => setFlash(false), 350)
    return () => clearTimeout(id)
  }, [vol, stp, tat, ticket])

  const target = Math.min(65, stp + (65 - stp) * 0.62)
  const add = vol * ((target - stp) / 100)
  const newTat = Math.max(0.15, tat * 0.09)
  const hours = add * 0.35 + vol * 0.06
  const book = (add * ticket * 12) / 100

  return (
    <section className="s demo-bg">
      <div className="w">
        <Reveal className="sec-hd">
          <div className="sec-eye">Try the math</div>
          <h2 className="sec-h">
            What Saralya does <em>to your book.</em>
          </h2>
          <p className="sec-p">Move the sliders. Numbers update live.</p>
        </Reveal>
        <Reveal className="roi-shell">
          <div className="roi-in">
            <div className="roi-hd">Your portfolio today</div>
            <div className="rf">
              <div className="rf-top">
                <span className="rf-l">Monthly applications</span>
                <span className="rf-v">{inr(vol)}</span>
              </div>
              <input
                type="range"
                min={500}
                max={100000}
                step={500}
                value={vol}
                onChange={(e) => setVol(+e.target.value)}
              />
            </div>
            <div className="rf">
              <div className="rf-top">
                <span className="rf-l">Current STP rate</span>
                <span className="rf-v">
                  {stp}
                  <small>%</small>
                </span>
              </div>
              <input type="range" min={0} max={60} step={1} value={stp} onChange={(e) => setStp(+e.target.value)} />
            </div>
            <div className="rf">
              <div className="rf-top">
                <span className="rf-l">Current average TAT</span>
                <span className="rf-v">
                  {tat}
                  <small>hrs</small>
                </span>
              </div>
              <input type="range" min={4} max={120} step={1} value={tat} onChange={(e) => setTat(+e.target.value)} />
            </div>
            <div className="rf" style={{ marginBottom: 0 }}>
              <div className="rf-top">
                <span className="rf-l">Average ticket size</span>
                <span className="rf-v">
                  ₹{ticket.toFixed(2)}
                  <small>L</small>
                </span>
              </div>
              <input
                type="range"
                min={0.25}
                max={25}
                step={0.25}
                value={ticket}
                onChange={(e) => setTicket(+e.target.value)}
              />
            </div>
          </div>
          <div className="roi-out">
            <div className="roi-out-hd">With Saralya</div>
            <div className={`rm ${flash ? 'flash' : ''}`.trim()}>
              <div className="rm-l">Extra STP files / month</div>
              <div className="rm-n">+{inr(add)}</div>
            </div>
            <div className={`rm ${flash ? 'flash' : ''}`.trim()}>
              <div className="rm-l">New average TAT</div>
              <div className="rm-n">
                {newTat.toFixed(1)}
                <small>hrs</small>
              </div>
            </div>
            <div className={`rm ${flash ? 'flash' : ''}`.trim()}>
              <div className="rm-l">Ops-hours saved / month</div>
              <div className="rm-n">
                {inr(hours)}
                <small>hrs</small>
              </div>
            </div>
            <div className={`rm ${flash ? 'flash' : ''}`.trim()}>
              <div className="rm-l">Incremental book / year</div>
              <div className="rm-n">
                ₹{inr(book)}
                <small>Cr</small>
              </div>
            </div>
            <div className="roi-note">Directional estimate · your mileage will vary</div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
