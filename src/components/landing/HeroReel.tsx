import { useReducedMotion } from 'motion/react'

/* The hero's ground: New Delhi from above at dusk — an arterial road lit
   up through dense rooftops (Pexels, free for commercial use).

   Scale rather than a single shopfront: this is the market, not one
   borrower. It is already dark and warm, so the scrims are lighter than
   they were over daylight footage — enough to hold the copy, not enough to
   flatten the street lights. `/video/shop.mp4` is the shopfront cut if we
   want to go back to one trader. */
export function HeroReel() {
  const still = useReducedMotion()
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 1080p on wide screens, 720p on phones; both start fetching at once so playback begins as soon as the first seconds are in */}
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
      {/* only as much shade as the copy needs, and none through the middle */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,0.18)_0%,rgba(10,10,11,0)_42%,rgba(10,10,11,0.38)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,11,0.34)_0%,rgba(10,10,11,0.18)_30%,rgba(10,10,11,0.04)_55%,rgba(10,10,11,0)_75%)]" />
      {/* the page below is white; the frame dissolves into it */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-white" />
    </div>
  )
}
