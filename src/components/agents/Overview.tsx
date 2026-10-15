import { Banknote, Building2, Database, Landmark, Receipt } from 'lucide-react'
import { AgentFlow, Limits } from './AgentFlow'
import { FadeIn } from '../ui/Reveal'
import { Container, Section, SectionHead } from '../ui/Section'

/* The generic agent, running on a loop before anyone has answered anything.
   Same component the wizard fills in at the end, so the payoff is visibly
   the same machine with their own labels on it. */

const SOURCES = [
  { label: 'CIBIL · Experian · CRIF', icon: Building2 },
  { label: 'Account Aggregator', icon: Database },
  { label: 'GSTN · MCA21', icon: Receipt },
  { label: 'CERSAI', icon: Landmark },
  { label: 'Your core', icon: Banknote },
]

const WORK = ['Reads the whole file at once', 'Checks it against your policy', 'Writes the reason for every call', 'Escalates what it may not decide']

const LIMITS = ['21-day SCN before any fraud tag', 'KFS on every digital loan', 'DPDP consent, row-level']

export function Overview() {
  return (
    <Section id="architecture">
      <Container>
        <SectionHead
          eyebrow="How an agent works"
          title={
            <>
              Your data goes in. A <span className="text-accent">decided file</span> comes out.
            </>
          }
          lede="An agent is not a chat window. It is what it may read, what it may do, the limits it cannot cross, and what lands on your desk in the morning."
        />
        <FadeIn className="rounded-3xl bg-bg p-6 ring-1 ring-line md:p-9">
          <AgentFlow
            sources={SOURCES}
            work={WORK}
            outcome={
              <div className="space-y-2.5">
                <div className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-line">
                  <div className="font-mono text-label uppercase tracking-[0.12em] text-hint">Decision</div>
                  <div className="mt-1 text-body font-semibold">Approve · STP</div>
                  <div className="mt-0.5 text-small text-muted">with the reasons attached</div>
                </div>
                <div className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-line">
                  <div className="font-mono text-label uppercase tracking-[0.12em] text-hint">Every morning</div>
                  <div className="mt-1 text-small text-ink2">What cleared, what needs you, what slipped</div>
                </div>
              </div>
            }
          />
          <Limits limits={LIMITS} />
        </FadeIn>
      </Container>
    </Section>
  )
}
