import { useEffect, useRef, useState } from 'react'

function useInView(threshold = 0.1) {
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

const RULE_SECTIONS = [
  {
    id: 1,
    emoji: '📜',
    title: 'Основные правила',
    color: 'from-violet-500/20 to-purple-900/10',
    border: 'border-violet-500/30',
    items: [
      'Запрещено токсичное/неадекватное поведение, оскорбления, переход на личности.',
      'Запрещено оскорбление проекта, администрации, руководства.',
      'Никаких межнациональных и политических споров.',
      'Запрещена реклама чего-либо без согласования с администрацией.',
      'Запрещён флуд, спам, злоупотребление пингом.',
      'Запрещено распространение NSFW-контента и пропаганда запрещённых организаций.',
      'Запрещено мошенничество и нанесение ущерба проекту.',
      'Незнание правил не освобождает от ответственности.',
    ],
  },
  {
    id: 2,
    emoji: '🎙️',
    title: 'Голосовой чат',
    color: 'from-blue-500/20 to-indigo-900/10',
    border: 'border-blue-500/30',
    items: [
      'Запрещено воспроизведение звуков (музыки) в микрофон в общих каналах.',
      'Шумы в микрофоне нежелательны — рекомендуется Push-To-Talk.',
      'Запрещено использование программ, сильно меняющих голос.',
      'Запрещено издание громких звуков в микрофон.',
      'В приватных голосовых каналах правила мягче — исключение для грубых нарушений.',
    ],
  },
  {
    id: 3,
    emoji: '👤',
    title: 'Ники и аватарки',
    color: 'from-pink-500/20 to-rose-900/10',
    border: 'border-pink-500/30',
    items: [
      'Нельзя использовать ники/аватарки, совпадающие с администрацией.',
      'Запрещены оскорбительные никнеймы (мат, оскорбления, реклама, пропаганда).',
      'Запрещены ники типа: User, Admin, Moderator, NickName и т.д.',
      'Бессмысленный набор символов не допускается.',
      'Администратор вправе потребовать смены ника или аватарки.',
    ],
  },
  {
    id: 4,
    emoji: '🔗',
    title: 'Каналы и ссылки',
    color: 'from-emerald-500/20 to-teal-900/10',
    border: 'border-emerald-500/30',
    items: [
      'Запрещена реклама без согласования с администратором.',
      'Не допускается спам-рассылка в личных сообщениях.',
      'Запрещена публикация ссылок на донат-сайты без разрешения.',
      'Общение только в каналах, предназначенных для этого.',
    ],
  },
  {
    id: 5,
    emoji: '⚖️',
    title: 'Ответственность',
    color: 'from-yellow-500/20 to-amber-900/10',
    border: 'border-yellow-500/30',
    items: [
      'Все участники равны перед правилами вне зависимости от роли.',
      'Мат разрешён, но без злоупотребления.',
      'Запрещено злоупотребление Caps Lock и жёсткий троллинг.',
      'Повторные нарушения влекут ужесточение наказания.',
      'Обход блокировки: наказание на оба аккаунта с удвоением срока.',
      'Администратор вправе отказать в доступе без объяснения причин.',
    ],
  },
]

export default function Rules() {
  const { ref, inView } = useInView()
  const [openId, setOpenId] = useState<number | null>(1)

  return (
    <section id="rules" className="relative py-28 px-6">
      {/* BG glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none opacity-10"
           style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)' }} />

      <div ref={ref} className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-nunito text-luna-lilac/60 tracking-[0.3em] uppercase text-sm mb-3">Порядок в семье</p>
          <h2 className="section-title text-4xl md:text-5xl text-luna-star mb-6">
            Правила <span className="shimmer-text">LunaWorld</span>
          </h2>
          <div className="luna-divider"><span>📜</span></div>
          <p className="font-nunito text-luna-star/50 mt-6 max-w-xl mx-auto">
            Постарайтесь придерживаться этих простых правил. Помните: все участники LunaWorld — это одна большая семья. 💜
          </p>
        </div>

        {/* Accordion */}
        <div className={`flex flex-col gap-4 transition-all duration-700 delay-200
          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {RULE_SECTIONS.map((section, i) => {
            const isOpen = openId === section.id
            return (
              <div
                key={section.id}
                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${section.border}
                  bg-gradient-to-br ${section.color}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Accordion header */}
                <button
                  onClick={() => setOpenId(isOpen ? null : section.id)}
                  className="w-full flex items-center justify-between px-6 py-5 gap-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{section.emoji}</span>
                    <span className="font-cinzel font-semibold text-luna-star text-left">
                      {section.id}. {section.title}
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-luna-lilac flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Accordion body */}
                <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[600px] pb-6' : 'max-h-0'}`}>
                  <ul className="px-6 flex flex-col gap-3">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="mt-1 w-5 h-5 rounded-full bg-luna-lilac/20 border border-luna-lilac/30
                                         flex items-center justify-center text-xs font-cinzel text-luna-lilac flex-shrink-0">
                          {j + 1}
                        </span>
                        <span className="font-nunito text-sm text-luna-star/70 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer note */}
        <div className={`mt-10 glass-card p-6 text-center transition-all duration-700 delay-500
          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-nunito text-luna-star/60 text-sm leading-relaxed">
            💡 На сервере запрещены любые формы оскорблений, угроз и разжигания ненависти.<br />
            Будьте вежливы и уважайте друг друга.<br />
            <span className="text-luna-lilac font-semibold">LunaWorld — это ваш дом, берегите его!</span>
          </p>
        </div>
      </div>
    </section>
  )
}
