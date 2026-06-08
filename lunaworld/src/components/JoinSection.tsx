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

const STEPS = [
  { num: '01', text: 'Перейди по ссылке приглашения' },
  { num: '02', text: 'Прими правила сервера' },
  { num: '03', text: 'Проведи 7 дней — стань полноправным участником семьи 🌙' },
]

export default function JoinSection() {
  const { ref, inView } = useInView()

  return (
    <section id="join" className="relative py-28 px-6 overflow-hidden">
      {/* Huge glow orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[900px] h-[900px] rounded-full opacity-20"
             style={{ background: 'radial-gradient(circle, #6d28d9 0%, #3b0f9e 40%, transparent 70%)' }} />
      </div>

      <div ref={ref} className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-nunito text-luna-lilac/60 tracking-[0.3em] uppercase text-sm mb-3">Присоединяйся</p>
          <h2 className="section-title text-4xl md:text-5xl lg:text-6xl text-luna-star mb-6">
            Начни свою<br />
            <span className="shimmer-text text-glow">историю</span> здесь
          </h2>
          <div className="luna-divider"><span>🌙</span></div>
        </div>

        {/* Steps */}
        <div className={`grid md:grid-cols-3 gap-8 mb-16 transition-all duration-700 delay-200
          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {STEPS.map((step, i) => (
            <div key={step.num} className="relative flex flex-col items-center text-center gap-4">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] right-[-40%] h-px
                                bg-gradient-to-r from-luna-lilac/40 to-transparent" />
              )}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-luna-violet to-luna-purple
                              flex items-center justify-center font-cinzel font-bold text-xl text-white
                              shadow-luna-glow ring-2 ring-luna-lilac/30">
                {step.num}
              </div>
              <p className="font-nunito text-luna-star/70 text-sm leading-relaxed max-w-[180px]">{step.text}</p>
            </div>
          ))}
        </div>

        {/* Big invite card */}
        <div className={`glass-card p-8 md:p-12 text-center gradient-border transition-all duration-700 delay-400
          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          <div className="relative inline-block mb-8 animate-float">
            <div className="absolute inset-0 rounded-full blur-3xl bg-luna-violet/40 scale-150" />
            <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-luna-lilac/50 animate-pulse-glow">
              <img src="/assets/logo.jpg" alt="LunaWorld" className="w-full h-full object-cover" />
            </div>
          </div>

          <h3 className="font-cinzel font-bold text-3xl text-luna-star mb-3">
            Добро пожаловать<br />в <span className="shimmer-text">LunaWorld</span>!
          </h3>
          <p className="font-nunito text-luna-star/60 max-w-lg mx-auto mb-10 leading-relaxed">
            🌙 LunaWorld — твоя вселенная общения, знакомств и игр.
            Заходи, будь собой и сияй ярче звёзд. Твоя история начинается здесь. 💜✨
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://discord.gg/nVaJgdgchY"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn text-white font-nunito text-lg px-10 py-5"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/>
              </svg>
              Вступить сейчас — бесплатно
            </a>
          </div>

          <p className="mt-6 font-nunito text-xs text-luna-star/30">
            Нажав кнопку, ты перейдёшь на Discord и примешь приглашение на сервер LunaWorld
          </p>
        </div>

        {/* Newcomer info */}
        <div className={`mt-8 glass-card p-6 border border-luna-lilac/20 transition-all duration-700 delay-600
          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-start gap-4">
            <span className="text-3xl flex-shrink-0">🌙</span>
            <div>
              <h4 className="font-cinzel font-semibold text-luna-star mb-2">Как снять роль «Новичок»?</h4>
              <p className="font-nunito text-sm text-luna-star/60 leading-relaxed">
                При вступлении ты получишь роль «Новичок». Просто пробудь на сервере{' '}
                <span className="text-luna-lilac font-semibold">7 дней</span> — после этого администратор автоматически
                снимет её. Никаких заявок, никаких лишних действий.
                Добро пожаловать в семью! 💜
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
