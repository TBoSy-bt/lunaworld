import { useEffect, useRef, useState } from 'react'

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, inView }
}

const VALUES = [
  { emoji: '🌟', title: 'Ценят каждого',    desc: 'Каждый участник важен. Здесь нет «лишних» — только семья.' },
  { emoji: '💬', title: 'Тепло и уважение', desc: 'Общение с теплотой и уважением — наш главный принцип.' },
  { emoji: '🎮', title: 'Играем вместе',    desc: 'Игровые ночи, совместные приключения и новые впечатления.' },
  { emoji: '🔒', title: 'Порядок без строгости', desc: 'Правила есть, но они созданы для комфорта, не для ограничений.' },
]

export default function About() {
  const { ref, inView } = useInView()

  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      {/* Section glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[600px] h-[600px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(59,15,158,0.15) 0%, transparent 70%)' }} />

      <div ref={ref} className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-nunito text-luna-lilac/60 tracking-[0.3em] uppercase text-sm mb-3">Наша история</p>
          <h2 className="section-title text-4xl md:text-5xl text-luna-star mb-6">
            Что такое <span className="shimmer-text">LunaWorld</span>?
          </h2>
          <div className="luna-divider"><span>🌙</span></div>
        </div>

        {/* Main card with video/image */}
        <div className={`grid md:grid-cols-2 gap-10 items-center mb-20 transition-all duration-700 delay-200
          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Image side */}
          <div className="relative group">
            <div className="absolute inset-0 rounded-2xl blur-2xl bg-luna-violet/20 group-hover:bg-luna-violet/30 transition-colors" />
            <div className="relative rounded-2xl overflow-hidden gradient-border">
              <img
                src="/assets/logo.jpg"
                alt="LunaWorld Community"
                className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luna-black/80 via-transparent to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="font-nunito font-semibold text-white text-sm">Сервер онлайн</span>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="flex flex-col gap-6">
            <p className="font-nunito text-lg text-luna-star/80 leading-relaxed">
              <span className="text-luna-lilac font-semibold">LunaWorld</span> — это не просто Discord-сервер.
              Это пространство, где каждый чувствует себя как дома.
            </p>
            <p className="font-nunito text-luna-star/60 leading-relaxed">
              Мы создали это место, чтобы каждый из вас чувствовал себя здесь как дома.
              Здесь нет места токсичности, оскорблениям или безразличию.
              Мы — одна большая семья, объединённая общими интересами, уважением и стремлением к лучшему.
            </p>
            <p className="font-nunito text-luna-star/60 leading-relaxed">
              Мы здесь, чтобы поддерживать друг друга, делиться эмоциями и создавать лучшие воспоминания.
              Давайте сделаем LunaWorld местом, куда хочется возвращаться снова и снова. 🌙
            </p>
            <p className="font-nunito text-luna-lilac/70 italic font-medium">
              — С любовью, Управляющий LunaWorld
            </p>
          </div>
        </div>

        {/* Values grid */}
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-400
          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="glass-card p-6 flex flex-col gap-4"
              style={{ transitionDelay: `${i * 100 + 400}ms` }}
            >
              <div className="text-4xl">{v.emoji}</div>
              <h3 className="font-cinzel font-semibold text-luna-star">{v.title}</h3>
              <p className="font-nunito text-sm text-luna-star/55 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom quote */}
        <div className={`mt-16 text-center transition-all duration-700 delay-600
          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <blockquote className="font-cinzel text-xl md:text-2xl text-luna-lilac/80 italic max-w-3xl mx-auto">
            "Вместе мы построим нечто по-настоящему особенное. 🌙"
          </blockquote>
        </div>
      </div>
    </section>
  )
}
