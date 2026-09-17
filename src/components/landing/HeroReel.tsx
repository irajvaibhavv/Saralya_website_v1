import { motion, useReducedMotion } from 'motion/react'

/* The hero's ground: a kirana owner, a rider, a market street. The people
   NBFCs lend to (Pexels, free for commercial use). The scrim carries the
   weight so white type and the panel read on every frame. */
export function HeroReel({ dim = false }: { dim?: boolean }) {
  const still = useReducedMotion()
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.video
        src="/video/borrowers.mp4"
        poster="/video/borrowers-poster.jpg"
        autoPlay={!still}
        muted
        loop
        playsInline
        preload="metadata"
        animate={{ filter: dim ? 'blur(8px) saturate(0.7)' : 'blur(0px) saturate(0.85)', scale: dim ? 1.06 : 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 size-full object-cover"
      />
      {/* indigo-leaning dark: heaviest on the left under the copy and at the foot under the metrics */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,24,0.7)_0%,rgba(10,10,24,0.45)_40%,rgba(10,10,24,0.9)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,24,0.85)_0%,rgba(10,10,24,0.55)_40%,rgba(10,10,24,0.25)_70%,rgba(10,10,24,0.4)_100%)]" />
      <motion.div animate={{ opacity: dim ? 0.5 : 0 }} transition={{ duration: 0.7 }} className="absolute inset-0 bg-[#0a0a18]" />
      {/* the page below is white; the reel dissolves into it rather than stopping on a line */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-white" />
    </div>
  )
}
