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

const STAGES: Stage[] = [
  { title: 'Reads the file whole', sub: 'one pull, not five tabs' },
  { title: 'Scores against your policy', sub: 'your matrix, your cut-offs' },
  { title: 'Writes every reason', sub: 'reason codes, not a number' },
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
          eyebrow="How an agent works"
          title={
            <>
              Your data goes in. A <span className="text-accent">decided file</span> comes out.
            </>
          }
          lede="An agent is not a chat window. It is what it may read, what it may do, the limits it cannot cross, and what lands on your desk in the morning."
        />
        <FadeIn>
          <AgentFrame badge="Saralya agent">
            <AgentFlow rails={RAILS} stages={STAGES} outcome={OUTCOME} metrics={METRICS} />
          </AgentFrame>
        </FadeIn>
      </Container>
    </Section>
  )
}
