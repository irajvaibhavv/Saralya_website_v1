import { Benefits } from '../components/home/Benefits'
import { BoardReview } from '../components/home/BoardReview'
import { Hero } from '../components/home/Hero'
import { HowItWorks } from '../components/home/HowItWorks'
import { IntegrationsMarquee } from '../components/home/IntegrationsMarquee'
import { ModulesPreview } from '../components/home/ModulesPreview'
import { Pedigree } from '../components/home/Pedigree'
import { ReadinessCheck } from '../components/home/ReadinessCheck'
import { RunYourNumbers } from '../components/home/RunYourNumbers'
import { UpiAnalogy } from '../components/home/UpiAnalogy'
import { Cta } from '../components/layout/Cta'
import { Container } from '../components/ui/Section'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

export function Home() {
  return (
    <>
      <Hero />
      <RunYourNumbers />
      <IntegrationsMarquee />
      <Photo />
      <HowItWorks />
      <UpiAnalogy />
      <ModulesPreview />
      <BoardReview />
      <ReadinessCheck />
      <Benefits />
      <Pedigree />
      <Cta />
    </>
  )
}

/* Full-bleed photo with slow parallax. */
function Photo() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  return (
    <div ref={ref} className="relative mt-6 h-[60vh] overflow-hidden">
      <motion.img src="/img/market.jpg" alt="" loading="lazy" decoding="async" style={{ y }} className="absolute inset-0 h-[124%] w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-transparent" />
      <Container className="absolute inset-x-0 bottom-12 text-white">
        <h2 className="display max-w-3xl text-[clamp(32px,5vw,64px)]">
          For the institutions that lend to <span className="text-accent3">under-banked</span> India.
        </h2>
      </Container>
    </div>
  )
}
