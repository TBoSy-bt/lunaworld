import { useEffect, useRef, useState } from 'react'

const SUBTITLES = [
  'твоя вселенная общения',
  'место для крепкой дружбы',
  'незабываемые игровые ночи',
  'тёплые разговоры под луной',
]

export default function Hero() {
  const [subIdx,    setSubIdx]    = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting,  setDeleting]  = useState(false)
  const [membersCount]            = useState(1_250)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* typewriter effect */
  useEffect(() => {
    const target = SUBTITLES[subIdx]

    if (!deleting && displayed.length < target.length) {
      timerRef.current = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60)
    } else if (!deleting && displayed.length === target.length) {
      timerRef.current = setTimeout(() => setDeleting(true), 2_500)
    } else if (deleting && displayed.length > 0) {
      timerRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setSubIdx(i => (i + 1) % SUBTITLES.length)
    }

    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [displayed, deleting, subIdx])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          poster="/assets/logo.jpg"
        >
          <source src="/assets/bg-video.mp4" type="video/mp4" />
        </video>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-luna-black/80 via-luna-black/40 to-luna-black/90" />
      </div>

      {/* Floating moon rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[600px] h-[600px] rounded-full border border-luna-lilac/5 animate-spin-slow" />
        <div className="absolute w-[450px] h-[450px] rounded-full border border-luna-lilac/8" style={{ animationDelay: '-7s' }} />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">

        {/* Logo with glow */}
        <div className="relative mb-8 animate-float">
          <div className="absolute inset-0 rounded-full blur-3xl bg-luna-violet/40 scale-150" />
          <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden
                          ring-4 ring-luna-lilac/50 animate-pulse-glow gradient-border shadow-luna-glow2">
            <img
              src="/assets/logo.jpg"
              alt="LunaWorld"
              className="w-full h-full object-cover scale-110"
            />
          </div>
          {/* Orbiting star */}
          <div
            className="absolute w-5 h-5 rounded-full bg-luna-pink/80 blur-sm animate-spin-slow"
            style={{ top: '10%', right: '-5%', animationDuration: '8s' }}
          />
          <div
            className="absolute w-3 h-3 rounded-full bg-luna-lilac/80 blur-sm"
            style={{ bottom: '15%', left: '-8%', animation: 'float 5s ease-in-out infinite' }}
          />
        </div>

        {/* Server name */}
        <h1 className="font-cinzel font-black text-5xl md:text-7xl lg:text-8xl tracking-widest mb-4">
          <span className="shimmer-text text-glow">LUNA</span>
          <span className="text-luna-star">WORLD</span>
        </h1>

        {/* Typewriter subtitle */}
        <p className="font-nunito text-xl md:text-2xl text-luna-lilac/80 mb-2 h-8">
          🌙 <span className="typewriter">{displayed}</span>
        </p>

        {/* Description */}
        <p className="font-nunito text-base md:text-lg text-luna-star/60 max-w-2xl mb-10 text-balance leading-relaxed">
          Здесь под мягким лунным светом рождаются крепкая дружба,<br className="hidden md:block" />
          тёплые разговоры и незабываемые игровые ночи. Заходи, будь собой и сияй ярче звёзд. 💜✨
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="https://discord.gg/nVaJgdgchY"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-btn text-white font-nunito text-base"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/>
            </svg>
            Вступить на сервер
          </a>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="glow-btn-outline font-nunito text-base"
          >
            Узнать больше
          </button>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-8 md:gap-16">
          {[
            { value: `${membersCount.toLocaleString()}+`, label: 'Участников' },
            { value: '24/7',                              label: 'Онлайн'     },
            { value: '100%',                             label: 'Уют'         },
          ].map(stat => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="font-cinzel font-bold text-2xl md:text-3xl shimmer-text">{stat.value}</span>
              <span className="font-nunito text-xs text-luna-star/50 tracking-widest uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
        <span className="font-nunito text-xs text-luna-star/40 tracking-widest uppercase">Scroll</span>
        <svg className="w-5 h-5 text-luna-lilac/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
