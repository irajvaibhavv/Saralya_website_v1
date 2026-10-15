import { AgentFlow, AgentFrame, type Rail, type Stage } from './AgentFlow'
import { FadeIn } from '../ui/Reveal'
import { Container, Section, SectionHead } from '../ui/Section'

/* The generic agent, running before anyone has answered anything. The same
   diagram the wizard rebuilds at the end, so the payoff is visibly the same
   machine with the visitor's own labels on it. */

const RAILS: Rail[] = [
  { label: 'CIBIL · Experian · CRIF', icon: 'bureau' },
  { label: 'Account Aggregator', icon: 'data' },
  { label: 'GSTN · MCA21', icon: 'doc' },
  { label: 'CERSAI', icon: 'shield' },
  { label: 'Your core', icon: 'core' },
]

/* rim names: short by necessity, a sentence will not fit on the loop */
const STAGES: Stage[] = [
  { title: 'Collector', sub: 'one pull, not five tabs' },
  { title: 'Policy engine', sub: 'your matrix, your cut-offs' },
  { title: 'Reason writer', sub: 'reason codes, not a number' },
  { title: 'Escalator', sub: 'what it may not decide' },
]

const OUTCOME: Stage = { title: 'Approve · STP', sub: 'sanctioned with the KFS attached' }

/* Deliberately not percentages: the founders have struck unverifiable
   numbers before, and these would be the first thing a CTO checks. */
const METRICS = [
  { label: 'Decision', value: 'Minutes' },
  { label: 'Rails, one consent', value: '9 types' },
  { label: 'Reason codes', value: 'Every call' },
]

export function Overview() {
  return (
    <Section id="architecture">
      <Container>
        <SectionHead
          title={
            <>
              Your data goes in. A <span className="text-accent">decided file</span> comes out.
            </>
          }
        />
        <FadeIn>
          <AgentFrame badge="Saralya agent">
            <AgentFlow rails={RAILS} stages={STAGES} outcome={OUTCOME} metrics={METRICS} loopLabel="Credit decision" />
          </AgentFrame>
        </FadeIn>
      </Container>
    </Section>
  )
}
