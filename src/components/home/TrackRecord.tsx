import { Counter, FadeIn, Item, Stagger } from '../ui/Reveal'
import { Container, Section } from '../ui/Section'

/* "4+ decades of experience. 200+ banks of pedigree.": founder-approved line. */

const STATS = [
  { n: 4, suffix: '+', label: 'Decades of banking-technology experience' },
  { n: 200, suffix: '+', label: 'Indian banks & NBFCs shipped to' },
  { n: 6, suffix: '', label: 'Composable modules, one stack' },
  { n: 600, suffix: '+', label: 'RBI & DPDP checks mapped' },
]

export function TrackRecord() {
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <FadeIn>
            <div className="eyebrow mb-3">Who's behind it</div>
            <h2 className="display text-h2">
              4+ decades of experience.
              <br />
              200+ banks of pedigree.
            </h2>
            <p className="mt-5 max-w-md text-lede text-muted">
              Banking-technology veterans, not lending tourists.
            </p>
          </FadeIn>

          <Stagger className="grid grid-cols-2 gap-x-8">
            {STATS.map((s) => (
              <Item key={s.label} className="border-t border-line py-6">
                <div className="display text-h2">
                  <Counter to={s.n} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-small text-muted">{s.label}</div>
              </Item>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  )
}
