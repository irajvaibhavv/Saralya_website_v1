import { Benefits } from '../components/home/Benefits'
import { Hero } from '../components/home/Hero'
import { HowItWorks } from '../components/home/HowItWorks'
import { IntegrationsMarquee } from '../components/home/IntegrationsMarquee'
import { ModulesPreview } from '../components/home/ModulesPreview'
import { Pedigree } from '../components/home/Pedigree'
import { UpiAnalogy } from '../components/home/UpiAnalogy'
import { Cta } from '../components/layout/Cta'

export function Home() {
  return (
    <>
      <Hero />
      <IntegrationsMarquee />
      <HowItWorks />
      <UpiAnalogy />
      <ModulesPreview />
      <Benefits />
      <Pedigree />
      <Cta />
    </>
  )
}
