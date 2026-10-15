import { useReducedMotion } from 'motion/react'

/* The hero's ground: a Punjabi high street — a sweet shop, a dhaba, a
   shuttered unit — the kind of borrower an NBFC actually books (Pexels,
   free for commercial use).

   A static wide shot rather than a moving camera: the copy sits still over
   it instead of fighting a pan, and the shuttered unit on the left gives
   the headline somewhere quiet to land. Ten seconds, which is also when
   Saral Saarthi takes over. Scrims are neutral (#0a0a0b, not the blue-black
   ink token) and the side gradient stops short of the middle. */
export function HeroReel() {
  const still = useReducedMotion()
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 1080p on wide screens, 720p on phones; both start fetching at once so playback begins as soon as the first seconds are in */}
      <video
        poster="/video/shop-poster.jpg"
        autoPlay={!still}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 size-full object-cover"
      >
        <source src="/video/shop-720.mp4" media="(max-width: 1023px)" type="video/mp4" />
        <source src="/video/shop.mp4" type="video/mp4" />
      </video>
      {/* only as much shade as the copy needs, and none through the middle */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,0.22)_0%,rgba(10,10,11,0)_40%,rgba(10,10,11,0.45)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,11,0.4)_0%,rgba(10,10,11,0.22)_30%,rgba(10,10,11,0.06)_55%,rgba(10,10,11,0)_75%)]" />
      {/* the page below is white; the frame dissolves into it */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-white" />
    </div>
  )
}
