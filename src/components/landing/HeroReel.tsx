import { useReducedMotion } from 'motion/react'

/* Hero background video: aerial New Delhi at dusk (Pexels, free for commercial
   use). Scrims are kept light: just enough contrast for the headline. */
export function HeroReel() {
  const still = useReducedMotion()
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 1080p on desktop, 720p below 1024px */}
      <video
        poster="/video/city-poster.jpg"
        autoPlay={!still}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 size-full object-cover"
      >
        <source src="/video/city-720.mp4" media="(max-width: 1023px)" type="video/mp4" />
        <source src="/video/city.mp4" type="video/mp4" />
      </video>
      {/* edge scrims for headline contrast */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,0.18)_0%,rgba(10,10,11,0)_42%,rgba(10,10,11,0.38)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,11,0.34)_0%,rgba(10,10,11,0.18)_30%,rgba(10,10,11,0.04)_55%,rgba(10,10,11,0)_75%)]" />
      {/* fade into the section below */}
      <div className="absolute inset-x-0 bottom-0 h-5 bg-gradient-to-b from-transparent to-white" />
    </div>
  )
}
