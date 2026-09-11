import { Reveal } from './Reveal'

const FAQS = [
  {
    q: 'Is Saralya an RBI-regulated entity?',
    a: 'No. Saralya is a technology infrastructure provider. Lending is conducted by our customer institutions under their own licences.',
  },
  {
    q: 'Do we have to rip out FinnOne or our CBS?',
    a: 'No. Saralya plugs in via REST APIs and webhooks. Most deployments keep the LOS and CBS entirely untouched.',
  },
  {
    q: 'Where does customer data live?',
    a: 'Entirely inside India — AWS Mumbai (ap-south-1). Workspace-isolated per customer. AES-256 at rest, TLS 1.3 in transit, DPDP-aligned with row-level erasure.',
  },
  {
    q: 'How is this different from a general-purpose LLM?',
    a: 'Trained on anonymised Indian banking data and tuned on RBI Master Directions. It reasons in bureau tradelines and GST filing cadence, not generic web text.',
  },
  {
    q: 'Who owns the model outputs and audit trail?',
    a: 'You do. Every decision, score and reason code is yours — exportable and portable. If you leave, the audit history goes with you.',
  },
]

export function Faq() {
  return (
    <section className="s s-line">
      <div className="w">
        <Reveal className="sec-hd">
          <div className="sec-eye">Straight answers</div>
          <h2 className="sec-h">
            Questions we hear <em>every week.</em>
          </h2>
        </Reveal>
        <Reveal className="faq-wrap">
          {FAQS.map((f) => (
            <details className="faq" key={f.q}>
              <summary>{f.q}</summary>
              <div className="faq-b">{f.a}</div>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
