import { AboutSection } from '../components/home/About'
import { Benefits } from '../components/home/Benefits'
import { DemoSection } from '../components/home/Demo'
import { MonthlyReview } from '../components/home/MonthlyReview'
import { Hero } from '../components/home/Hero'
import { HowItWorks } from '../components/home/HowItWorks'
import { ProductsSection } from '../components/home/Products'
import { TechnologySection } from '../components/home/Technology'
import { TrackRecord } from '../components/home/TrackRecord'
import { InspectionReadiness } from '../components/home/InspectionReadiness'
import { UpiAnalogy } from '../components/home/UpiAnalogy'
import { ClosingCta } from '../components/layout/ClosingCta'
import { Container } from '../components/ui/Section'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

export function Home() {
  return (
    <>
      <Hero />
      <Photo />
      <HowItWorks />
      <UpiAnalogy />
      <ProductsSection />
      <DemoSection />
      <TechnologySection />
      <MonthlyReview />
      <InspectionReadiness />
      <Benefits />
      <AboutSection />
      <TrackRecord />
      <ClosingCta />
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
