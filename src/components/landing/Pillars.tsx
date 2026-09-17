import { Item, Stagger } from '../ui/Reveal'
import { Container } from '../ui/Section'

/* Two claims that answer the two questions a CTO or compliance head asks
   before typing anything into Saral. */
const PILLARS = [
  {
    eyebrow: 'BFSI trained model',
    title: 'Trained on BFSI data.',
    body: 'Credit policy, collections practice, RBI circulars and NBFC filings. Not the open internet.',
  },
  {
    eyebrow: 'Data security and privacy',
    title: 'Private by default.',
    body: 'Nothing you type leaves your browser or trains any external model. Your files stay yours.',
  },
]

export function Pillars() {
  return (
    <section className="border-t border-line py-14 md:py-20">
      <Container>
        <Stagger className="grid gap-10 md:grid-cols-2 md:gap-16" gap={0.1}>
          {PILLARS.map((p) => (
            <Item key={p.title}>
              <div className="eyebrow text-accent">{p.eyebrow}</div>
              <h2 className="display mt-4 text-[clamp(28px,3.4vw,42px)]">{p.title}</h2>
              <p className="mt-3 max-w-[44ch] text-[16px] leading-relaxed text-muted">{p.body}</p>
            </Item>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
