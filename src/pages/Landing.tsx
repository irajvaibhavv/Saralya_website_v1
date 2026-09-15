import { motion } from 'motion/react'
import { SaralAiChat } from '../components/landing/SaralAiChat'
import { VideoReel } from '../components/landing/VideoReel'
import { ButtonLink } from '../components/ui/Button'

/* The front door: copy on the left, Saral AI on the right. Everything else
   lives at /home. */

const EASE = [0.22, 1, 0.36, 1] as const

export function Landing() {
  return (
    <div className="relative bg-[radial-gradient(ellipse_70%_60%_at_0%_0%,#ebeafa_0%,transparent_60%),radial-gradient(ellipse_60%_60%_at_100%_100%,#ffe9d9_0%,transparent_60%),radial-gradient(ellipse_50%_50%_at_10%_100%,#dff6ec_0%,transparent_60%)]">
    <div className="mx-auto grid w-full max-w-[1240px] items-center gap-10 px-5 py-10 sm:px-8 lg:h-[calc(100svh-64px)] lg:min-h-[560px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12 lg:px-10 lg:py-6">
      <div className="min-w-0">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="eyebrow inline-flex items-center gap-2 rounded-full bg-wash px-3 py-1.5 text-accent">
          <span className="size-1.5 rounded-full bg-accent" /> Lending intelligence for India
        </motion.div>
        <h1 className="display mt-4 text-[clamp(32px,min(3.4vw,5.2vh),52px)]">
          {['Get answers to your', 'lending questions.'].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.55, ease: EASE, delay: 0.1 + i * 0.1 }} className={`block ${i === 1 ? 'text-accent' : ''}`}>
                {line}
              </motion.span>
            </span>
          ))}
        </h1>


        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE, delay: 0.55 }} className="mt-6 rounded-[20px] bg-white/70 p-1.5 ring-1 ring-white">
          <VideoReel />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-6 flex flex-wrap gap-3">
          <ButtonLink to="/home" variant="ink" arrow>
            Explore Saralya
          </ButtonLink>
          <ButtonLink to="/demo" variant="ghost">
            Try the live demo
          </ButtonLink>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.3 }} className="h-[600px] lg:h-full lg:min-h-0">
        <SaralAiChat />
      </motion.div>
    </div>
    </div>
  )
}
