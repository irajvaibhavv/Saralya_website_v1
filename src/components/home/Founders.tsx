import { Item, Stagger } from '../ui/Reveal'
import { FadeIn } from '../ui/Reveal'
import { Container, Section } from '../ui/Section'

/* The two people behind the platform, in the lead's own words. Company
   names here are employment history, not partners we claim — the rule
   against naming third parties is about logos and integration lists.

   TODO(Vikas): confirm the bios and the "200+ Indian financial
   institutions" line read the way you want them in public. */

type Founder = {
  initials: string
  role: string
  name: string
  meta: string
  /** the bio, split so the places can carry weight without dangerouslySetInnerHTML */
  bio: (string | { b: string })[]
  points: string[]
}

const FOUNDERS: Founder[] = [
  {
    initials: 'VC',
    role: 'Co-founder & CTO',
    name: 'Vikas Chaudhary',
    meta: 'IIT Delhi · 24+ years in banking technology',
    bio: [
      'Vikas has spent his career inside the engine room of Indian banking. Before Saralya, he led platform engineering at ',
      { b: 'Sopra Banking, Renovite' },
      ' and ',
      { b: 'FIS' },
      ', shipping core banking systems and payment switches across 200+ Indian banks — PSU, private and cooperative.',
    ],
    points: [
      'Has personally signed off on RBI inspection responses for Tier-1 and Tier-2 deployments',
      'Architects the platform stack, integration layer and compliance backbone',
      'Knows what a payment switch does at 2 AM on the night of a public holiday',
    ],
  },
  {
    initials: 'VG',
    role: 'Co-founder & CEO',
    name: 'Vishal Gupta',
    meta: 'Second-time founder · Banking + payments operator',
    bio: [
      'Vishal previously founded ',
      { b: 'OneStack' },
      ", building core banking systems and payment switches for cooperative banks and NBFCs. Earlier roles at Nando's India and Baxter Healthcare gave him the operating discipline to translate banking complexity into a product middle-layer NBFCs can actually buy.",
    ],
    points: [
      'Has written and filed RBI returns. Knows what an inspection observation costs in the next ALCO',
      'Owns product, GTM and customer relationships',
      'Believes the next ten years of Indian credit are written outside the metros',
    ],
  },
]

export function Founders() {
  return (
    <Section id="founders">
      <Container>
        <FadeIn className="grid gap-6 md:grid-cols-2 md:gap-12">
          <div>
            <div className="eyebrow">Founders</div>
            <h2 className="display mt-2 max-w-[16ch] text-h2">
              Banking-technology veterans, <span className="text-accent">not lending tourists.</span>
            </h2>
          </div>
          <p className="self-end text-lede leading-relaxed text-ink2">
            Saralya is built by people who have spent their careers inside Indian banking infrastructure — not founders who
            decided lending looks like an interesting wedge. Together, Vikas and Vishal have led platform decisions across more
            than 200 Indian financial institutions, including PSU banks, listed private banks, cooperative banks, RRBs and NBFCs.
          </p>
        </FadeIn>

        <Stagger className="mt-9 grid gap-4 md:grid-cols-2">
          {FOUNDERS.map((f) => (
            <Item key={f.name}>
              <article className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-line2 transition-shadow duration-300 hover:shadow-lg md:p-8">
                <div className="flex items-center gap-4">
                  <span className="display grid size-14 shrink-0 place-items-center rounded-full bg-ink text-body text-white">
                    {f.initials}
                  </span>
                  <div className="min-w-0">
                    <div className="eyebrow">{f.role}</div>
                    <div className="display mt-0.5 text-h3">{f.name}</div>
                    <div className="mt-0.5 text-small font-medium text-accent">{f.meta}</div>
                  </div>
                </div>

                <p className="mt-5 text-body leading-relaxed text-ink2">
                  {f.bio.map((part, i) =>
                    typeof part === 'string' ? part : (
                      <b key={i} className="font-semibold text-ink">
                        {part.b}
                      </b>
                    ),
                  )}
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                  {f.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-small leading-snug text-ink2">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Item>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
