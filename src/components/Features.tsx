import { useEffect, useRef, useState } from 'react'

function useInView(threshold = 0.15) {
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

const FEATURES = [
  {
    icon: '💬',
    title: 'Живое общение',
    desc: 'Текстовые каналы для любых тем — музыка, игры, мемы, флуд, серьёзные разговоры. Здесь всегда есть с кем поговорить.',
    gradient: 'from-violet-600/30 to-purple-900/20',
    border: 'border-violet-500/30',
  },
  {
    icon: '🎙️',
    title: 'Войс-румы',
    desc: 'Уютные голосовые каналы для общения, игр и прослушивания музыки. Приватные комнаты только для тебя и друзей.',
    gradient: 'from-blue-600/30 to-indigo-900/20',
    border: 'border-blue-500/30',
  },
  {
    icon: '🎮',
    title: 'Игровые ночи',
    desc: 'Совместные игровые сессии, турниры и просто весёлые вечера. Найди тиммейтов и напарников по интересам.',
    gradient: 'from-pink-600/30 to-rose-900/20',
    border: 'border-pink-500/30',
  },
  {
    icon: '🎵',
    title: 'Музыкальный канал',
    desc: 'Слушай музыку вместе с сообществом. Специальные музыкальные каналы и приватные комнаты для меломанов.',
    gradient: 'from-emerald-600/30 to-teal-900/20',
    border: 'border-emerald-500/30',
  },
  {
    icon: '👑',
    title: 'VIP-привилегии',
    desc: 'Особый статус и доступ к закрытым каналам, эксклюзивному контенту и уникальным возможностям для избранных.',
    gradient: 'from-yellow-600/30 to-amber-900/20',
    border: 'border-yellow-500/30',
  },
  {
    icon: '🌙',
    title: 'Уютная атмосфера',
    desc: 'Никакой токсичности. Только тепло, уважение и настоящая дружба под мягким лунным светом LunaWorld.',
    gradient: 'from-luna-purple/30 to-luna-indigo/20',
    border: 'border-luna-lilac/30',
  },
]

const CHANNELS = [
  { name: '📢  анонсы',          desc: 'Важные новости сервера' },
  { name: '💬  общение',         desc: 'Основной чат для всех'  },
  { name: '🎵  музыка',          desc: 'Слушаем вместе'         },
  { name: '🎮  игровые-чаты',    desc: 'Найти тиммейтов'        },
  { name: '🌙  приват',          desc: 'Личные комнаты'         },
  { name: '🔊  Общение [VC]',    desc: 'Голосовой чат'          },
]

export default function Features() {
  const { ref, inView } = useInView()

  return (
    <section id="features" className="relative py-28 px-6">
      {/* bg decoration */}
      <div className="absolute right-0 top-20 w-96 h-96 rounded-full pointer-events-none opacity-10"
           style={{ background: 'radial-gradient(circle, #6d28d9 0%, transparent 70%)' }} />

      <div ref={ref} className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-nunito text-luna-lilac/60 tracking-[0.3em] uppercase text-sm mb-3">Возможности сервера</p>
          <h2 className="section-title text-4xl md:text-5xl text-luna-star mb-6">
            Всё, что тебе <span className="shimmer-text">нужно</span>
          </h2>
          <div className="luna-divider"><span>✨</span></div>
        </div>

        {/* Feature cards */}
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 transition-all duration-700 delay-100
          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`glass-card p-7 flex flex-col gap-4 bg-gradient-to-br ${f.gradient} border ${f.border}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="text-5xl">{f.icon}</div>
              <h3 className="font-cinzel font-bold text-lg text-luna-star">{f.title}</h3>
              <p className="font-nunito text-sm text-luna-star/60 leading-relaxed flex-1">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Channel list panel */}
        <div className={`transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="font-cinzel text-2xl text-center text-luna-star mb-8">
            Популярные каналы
          </h3>

          <div className="glass-card p-6 max-w-2xl mx-auto">
            {/* Discord-style sidebar */}
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-luna-lilac/40">
                <img src="/assets/logo.jpg" alt="LunaWorld" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-cinzel font-bold text-luna-star text-sm">LunaWorld</p>
                <p className="font-nunito text-xs text-luna-star/40">Discord-сервер</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="font-nunito text-xs text-green-400">Online</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              {CHANNELS.map((ch, i) => (
                <div
                  key={ch.name}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg
                    hover:bg-white/5 transition-colors cursor-default group`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="font-nunito text-sm text-luna-star/70 group-hover:text-luna-lilac transition-colors">
                    {ch.name}
                  </span>
                  <span className="font-nunito text-xs text-luna-star/30">{ch.desc}</span>
                </div>
              ))}
            </div>

            <a
              href="https://discord.gg/nVaJgdgchY"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-xl
                         bg-[#5865F2] hover:bg-[#4752C4] transition-colors font-nunito font-semibold text-white text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/>
              </svg>
              Открыть в Discord
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
