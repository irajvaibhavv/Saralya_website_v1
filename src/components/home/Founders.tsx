import { Check } from 'lucide-react'
import { FadeIn, Item, Stagger } from '../ui/Reveal'
import { Container, Section } from '../ui/Section'

/* The two people behind the platform, in the lead's own words. Company
   names here are employment history, not partners we claim — the rule
   against naming third parties is about logos and integration lists.

   TODO(Vikas): confirm the bios and the "200+ Indian financial
   institutions" line read the way you want them in public. */

/* One card runs on the brand green, the other on petrol — both brand
   colours, so nothing here reads as a pass/warn/fail status. */
type Tone = {
  card: string
  bloom: string
  avatar: string
  eyebrow: string
  meta: string
  tick: string
  rule: string
}

const MINT: Tone = {
  card: 'bg-wash2 ring-accent/30',
  bloom: 'bg-accent/15',
  avatar: 'bg-accent',
  eyebrow: 'text-accent2',
  meta: 'text-accent2',
  tick: 'text-accent',
  rule: 'border-accent/20',
}

const PETROL: Tone = {
  card: 'bg-lav-w ring-lav',
  bloom: 'bg-lav/40',
  avatar: 'bg-lav2',
  eyebrow: 'text-petrol',
  meta: 'text-petrol',
  tick: 'text-petrol',
  rule: 'border-petrol/20',
}

type Founder = {
  tone: Tone
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
    tone: MINT,
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
    tone: PETROL,
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
        <FadeIn>
          <div className="eyebrow flex items-center gap-2.5">
            <span aria-hidden className="size-2 bg-lime" />
            Founders
          </div>
          <h2 className="display mt-2 max-w-[22ch] text-h2">
            Banking-technology veterans,{' '}
            <span className="font-hero font-normal italic text-accent">not lending tourists</span>.
          </h2>
        </FadeIn>

        <Stagger className="mt-9 grid gap-4 md:grid-cols-2">
          {FOUNDERS.map((f) => (
            <Item key={f.name}>
              <article
                className={`relative flex h-full flex-col overflow-hidden p-7 ring-1 transition-colors duration-300 md:p-8 ${f.tone.card}`}
              >
                <span aria-hidden className={`pointer-events-none absolute -right-20 -top-24 size-56 rounded-full blur-3xl ${f.tone.bloom}`} />

                <div className="relative flex items-center gap-4">
                  <span className={`display grid size-14 shrink-0 place-items-center text-body text-white ${f.tone.avatar}`}>
                    {f.initials}
                  </span>
                  <div className="min-w-0">
                    <div className={`font-mono text-label uppercase tracking-[0.16em] ${f.tone.eyebrow}`}>{f.role}</div>
                    <div className="display mt-0.5 text-h3">{f.name}</div>
                    <div className={`mt-0.5 text-small font-medium ${f.tone.meta}`}>{f.meta}</div>
                  </div>
                </div>

                <p className="relative mt-5 text-body leading-relaxed text-ink2">
                  {f.bio.map((part, i) =>
                    typeof part === 'string' ? part : (
                      <b key={i} className="font-semibold text-ink">
                        {part.b}
                      </b>
                    ),
                  )}
                </p>

                <ul className={`relative mt-6 space-y-2.5 border-t pt-5 ${f.tone.rule}`}>
                  {f.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-small leading-snug text-ink2">
                      <Check aria-hidden className={`mt-0.5 size-4 shrink-0 ${f.tone.tick}`} strokeWidth={2.4} />
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
