const PARTNERS = ['Aye Finance', 'Paisalo', 'CSL Finance', 'FinnOne', 'Lentra', 'CIBIL', 'GSTN', 'Digio']

export function Partners() {
  return (
    <section className="partners s-line">
      <div className="w">
        <div className="partners-lbl">In production & integrated at</div>
        <div className="partner-row">
          {PARTNERS.map((p) => (
            <span className="partner" key={p}>
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
