import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from '../../content/site'
import { Container } from '../ui/Section'
import { Logo } from './Navbar'

const COLS = [
  {
    title: 'Product',
    links: [
      { label: 'Products', to: '/products' },
      { label: 'Live demo', to: '/demo' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Get a diagnostic', to: `mailto:${CONTACT_EMAIL}?subject=Free%20diagnostic` },
      { label: 'Book a demo', to: `mailto:${CONTACT_EMAIL}?subject=Demo%20request` },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/privacy' },
      { label: 'DPDP Notice', to: '/privacy' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative mt-10 border-t border-line/70 bg-bg2/60">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-body leading-relaxed text-muted">
              Lending infrastructure for under-banked India. Built in India, for India.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-5 inline-block font-mono text-small text-accent hover:underline">
              {CONTACT_EMAIL}
            </a>
            <div className="mt-1 font-mono text-small text-hint">Delhi NCR · India</div>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <div className="eyebrow mb-4">{c.title}</div>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.to.startsWith('mailto:') ? (
                      <a href={l.to} className="text-body text-ink2 hover:text-accent">
                        {l.label}
                      </a>
                    ) : (
                      <Link to={l.to} className="text-body text-ink2 hover:text-accent">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-line/70 pt-6 text-small text-hint md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} Saralya Technologies. Saralya is a technology infrastructure provider, not an
            RBI-regulated entity. Lending is conducted by our customer institutions under their own licences.
          </span>
          <span className="font-mono">Made in India</span>
        </div>
      </Container>
    </footer>
  )
}
