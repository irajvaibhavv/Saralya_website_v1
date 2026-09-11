import { Reveal } from './Reveal'

export function UpiComparison() {
  return (
    <section className="s s-line">
      <div className="w">
        <Reveal className="sec-hd">
          <div className="sec-eye">The whole idea</div>
          <h2 className="sec-h">
            Lending should feel <em>like a UPI tap.</em>
          </h2>
          <p className="sec-p">UPI made payments instant. We do the same for credit decisions.</p>
        </Reveal>
        <Reveal className="upi-grid">
          <div className="upi-col upi-old">
            <div className="upi-tag">The old way</div>
            <div className="upi-way">Weeks of back-and-forth</div>
            <div className="upi-steps">
              {[
                'Collect documents by email',
                'Re-key bureau & bank data',
                'Manual underwriting queue',
                'Committee review & sign-off',
                'Disbursement, eventually',
              ].map((s, i) => (
                <div className="upi-step" key={s}>
                  <div className="upi-step-ic">{i + 1}</div>
                  {s}
                </div>
              ))}
            </div>
            <div className="upi-time">⏱ 3–5 days average TAT</div>
          </div>
          <div className="upi-arrow">
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </div>
          <div className="upi-col upi-new">
            <div className="upi-tag">The Saralya way</div>
            <div className="upi-way">One API call</div>
            <div className="upi-steps">
              {[
                'Data auto-fetched & enriched',
                'Fin-LLM scores instantly',
                'Fraud & EWS auto-checked',
                'Reason-coded decision returned',
                'Audit trail written automatically',
              ].map((s) => (
                <div className="upi-step" key={s}>
                  <div className="upi-step-ic">✓</div>
                  {s}
                </div>
              ))}
            </div>
            <div className="upi-time">⚡ Under 5 minutes, straight-through</div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
