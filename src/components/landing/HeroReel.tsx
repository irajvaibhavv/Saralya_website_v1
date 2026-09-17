import { useReducedMotion } from 'motion/react'

/* The hero's ground: a kirana owner, a rider, a market street. The people
   NBFCs lend to (Pexels, free for commercial use). The grade leans cool and
   the scrim sits under the copy, not over the whole frame. */
export function HeroReel() {
  const still = useReducedMotion()
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <video
        src="/video/borrowers.mp4"
        poster="/video/borrowers-poster.jpg"
        autoPlay={!still}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 size-full object-cover [filter:contrast(1.06)_saturate(1.08)]"
      />
      {/* a cool cast so the frame reads as one palette with the panel */}
      <div className="absolute inset-0 bg-[#3a34a8] opacity-[0.14] mix-blend-color" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,22,0.45)_0%,rgba(8,8,22,0.1)_45%,rgba(8,8,22,0.6)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,22,0.8)_0%,rgba(8,8,22,0.74)_20%,rgba(8,8,22,0.62)_35%,rgba(8,8,22,0.46)_48%,rgba(8,8,22,0.3)_60%,rgba(8,8,22,0.17)_72%,rgba(8,8,22,0.1)_84%,rgba(8,8,22,0.16)_100%)]" />
      {/* the page below is white; the frame dissolves into it */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-white" />
    </div>
  )
}
