import { useReducedMotion } from 'motion/react'

/* The hero's ground: a chai vendor, a rider, an auto driver. The people
   NBFCs lend to (Pexels, free for commercial use). The grade leans cool and
   the scrim sits under the copy, not over the whole frame. */
export function HeroReel() {
  const still = useReducedMotion()
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 1080p on wide screens, 720p on phones; both start fetching at once so playback begins as soon as the first seconds are in */}
      <video
        poster="/video/borrowers-poster.jpg"
        autoPlay={!still}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 size-full object-cover [filter:contrast(1.06)_saturate(1.08)]"
      >
        <source src="/video/borrowers-720.mp4" media="(max-width: 1023px)" type="video/mp4" />
        <source src="/video/borrowers.mp4" type="video/mp4" />
      </video>
      {/* a cool cast so the frame reads as one palette with the panel */}
      <div className="absolute inset-0 bg-[#3a34a8] opacity-[0.05] mix-blend-color" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,0.4)_0%,rgba(10,10,11,0.1)_45%,rgba(10,10,11,0.7)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,11,0.58)_0%,rgba(10,10,11,0.5)_22%,rgba(10,10,11,0.4)_38%,rgba(10,10,11,0.3)_50%,rgba(10,10,11,0.2)_62%,rgba(10,10,11,0.12)_74%,rgba(10,10,11,0.08)_86%,rgba(10,10,11,0.14)_100%)]" />
      {/* the page below is white; the frame dissolves into it */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-white" />
    </div>
  )
}
