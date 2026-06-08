export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5 py-12 px-6">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px
                      bg-gradient-to-r from-transparent via-luna-lilac/40 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-luna-lilac/40">
                <img src="/assets/logo.jpg" alt="LunaWorld" className="w-full h-full object-cover" />
              </div>
              <span className="font-cinzel font-bold text-lg tracking-widest shimmer-text">LunaWorld</span>
            </div>
            <p className="font-nunito text-sm text-luna-star/50 leading-relaxed">
              🌙 Твоя вселенная общения, знакомств и игр. Заходи, будь собой и сияй ярче звёзд.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-nunito text-xs text-green-400/80">Сервер онлайн 24/7</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-cinzel font-semibold text-luna-star mb-4 text-sm tracking-widest uppercase">Навигация</h4>
            <ul className="flex flex-col gap-2">
              {[
                ['Главная',     '#hero'    ],
                ['О нас',       '#about'   ],
                ['Возможности', '#features'],
                ['Правила',     '#rules'   ],
                ['Вступить',    '#join'    ],
              ].map(([label, href]) => (
                <li key={href}>
                  <button
                    onClick={() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })}
                    className="font-nunito text-sm text-luna-star/50 hover:text-luna-lilac transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / socials */}
          <div>
            <h4 className="font-cinzel font-semibold text-luna-star mb-4 text-sm tracking-widest uppercase">Контакты</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://discord.gg/nVaJgdgchY"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-nunito text-sm text-luna-star/50 hover:text-luna-lilac transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#5865F2]/20 border border-[#5865F2]/30
                                flex items-center justify-center group-hover:bg-[#5865F2]/40 transition-colors">
                  <svg className="w-4 h-4 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/>
                  </svg>
                </div>
                Discord — discord.gg/nVaJgdgchY
              </a>
              <div className="flex items-center gap-3 font-nunito text-sm text-luna-star/50">
                <div className="w-8 h-8 rounded-lg bg-luna-lilac/10 border border-luna-lilac/20
                                flex items-center justify-center">
                  <span className="text-xs">👑</span>
                </div>
                Управляющий: <span className="text-luna-lilac font-semibold">TBoSy 💖 &lt;/&gt;</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-nunito text-xs text-luna-star/30">
            © {year} LunaWorld Discord Community. Все права защищены.
          </p>
          <p className="font-nunito text-xs text-luna-star/20">
            Сделано с <span className="text-luna-lilac">💜</span> для нашей семьи
          </p>
        </div>
      </div>
    </footer>
  )
}
