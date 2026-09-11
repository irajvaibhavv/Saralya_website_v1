import { ButtonLink } from '../ui/Button'
import { Counter, FadeIn, Item, Stagger } from '../ui/Motion'
import { Container, Section } from '../ui/Section'

/* "4+ decades of experience. 200+ banks of pedigree." — founder-approved line. */

const STATS = [
  { n: 4, suffix: '+', label: 'Decades of banking-technology experience' },
  { n: 200, suffix: '+', label: 'Indian banks & NBFCs shipped to' },
  { n: 6, suffix: '', label: 'Composable modules, one stack' },
  { n: 600, suffix: '+', label: 'RBI & DPDP checks mapped' },
]

export function Pedigree() {
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <FadeIn>
            <div className="eyebrow mb-4 flex items-center gap-3">
              <span className="h-px w-6 bg-accent" />
              Who's behind it
            </div>
            <h2 className="display text-[clamp(30px,4.4vw,50px)]">
              4+ decades of experience.
              <br />
              <span className="text-accent">200+ banks of pedigree.</span>
            </h2>
            <p className="mt-5 max-w-md text-[16px] text-muted">
              Built by operators who shipped core banking and payment switches across PSU, private and cooperative
              banks — not lending tourists.
            </p>
            <div className="mt-7">
              <ButtonLink to="/about" variant="ghost" arrow>
                Meet the founders
              </ButtonLink>
            </div>
          </FadeIn>

          <Stagger className="grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <Item key={s.label}>
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <div className="display text-[clamp(38px,5vw,56px)] text-ink">
                    <Counter to={s.n} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-[13.5px] text-muted">{s.label}</div>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  )
}
