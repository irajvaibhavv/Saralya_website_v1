import { Architecture } from '../components/Architecture'
import { Bento } from '../components/Bento'
import { Compliance } from '../components/Compliance'
import { Cta } from '../components/Cta'
import { Demo } from '../components/Demo'
import { DeployTimeline } from '../components/DeployTimeline'
import { Faq } from '../components/Faq'
import { Hero } from '../components/Hero'
import { Lifecycle } from '../components/Lifecycle'
import { LivePipeline } from '../components/LivePipeline'
import { Modules } from '../components/Modules'
import { Orbit } from '../components/Orbit'
import { Partners } from '../components/Partners'
import { Personas } from '../components/Personas'
import { Roi } from '../components/Roi'
import { StatsMarquee } from '../components/StatsMarquee'
import { UpiComparison } from '../components/UpiComparison'
import { Voices } from '../components/Voices'

export function Home() {
  return (
    <>
      <Hero />
      <StatsMarquee />
      <LivePipeline />
      <Bento />
      <Personas />
      <Demo />
      <UpiComparison />
      <Modules />
      <Orbit />
      <Roi />
      <Architecture />
      <Lifecycle />
      <Compliance />
      <DeployTimeline />
      <Voices />
      <Faq />
      <Partners />
      <Cta />
    </>
  )
}
