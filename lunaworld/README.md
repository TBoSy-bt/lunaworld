# 🌙 LunaWorld — Discord Community Website

> Твоя вселенная общения, знакомств и игр.

**Сайт-визитка** для Discord-сервера LunaWorld. Красивый, современный, с анимациями и тёмной космической темой.

---

## 🛠 Стек технологий

| Слой       | Технология                        |
|------------|-----------------------------------|
| Frontend   | React 18 + TypeScript             |
| Стили      | Tailwind CSS v3                   |
| Сборка     | Vite 5                            |
| Бэкенд API | PHP 8.x                           |
| Хостинг    | Apache / Nginx + PHP              |

---

## 🚀 Установка и запуск

### Требования
- Node.js ≥ 18
- npm ≥ 9
- PHP ≥ 8.0 (для API)
- Apache/Nginx с mod_rewrite

### Локальная разработка

```bash
# 1. Клонировать репозиторий
git clone https://github.com/YOUR_USERNAME/lunaworld.git
cd lunaworld

# 2. Установить зависимости
npm install

# 3. Скопировать .env.example и заполнить переменные
cp .env.example .env

# 4. Запустить dev-сервер
npm run dev
# → http://localhost:3000
```

### Сборка для продакшена

```bash
npm run build
# Файлы появятся в папке /dist
```

Скопируй содержимое `/dist` и папку `/api` на хостинг.

---

## 📁 Структура проекта

```
lunaworld/
├── public/
│   └── assets/
│       ├── logo.jpg         ← Логотип сервера
│       └── bg-video.mp4     ← Фоновое видео для Hero
├── src/
│   ├── components/
│   │   ├── StarsCanvas.tsx  ← Анимированные звёзды
│   │   ├── Navbar.tsx       ← Навигация
│   │   ├── Hero.tsx         ← Главный экран
│   │   ├── About.tsx        ← О сервере
│   │   ├── Features.tsx     ← Возможности
│   │   ├── Rules.tsx        ← Правила (аккордеон)
│   │   ├── JoinSection.tsx  ← CTA «Вступить»
│   │   └── Footer.tsx       ← Подвал
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css            ← Tailwind + кастомные стили
├── api/
│   ├── config.php           ← Конфиг и хелперы
│   ├── contact.php          ← Форма обратной связи
│   └── members.php          ← Статистика сервера
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── .env.example
```

---

## ⚙️ PHP API

### `GET /api/members.php`
Возвращает статистику сервера. Если задан `DISCORD_BOT_TOKEN` и `DISCORD_GUILD_ID` — тянет живые данные с Discord.

**Response:**
```json
{
  "status": "success",
  "members": 1250,
  "online": 87,
  "name": "LunaWorld"
}
```

### `POST /api/contact.php`
Принимает сообщение через контактную форму, пересылает в Discord webhook.

**Request body:**
```json
{
  "name": "Имя",
  "email": "email@example.com",
  "message": "Текст сообщения"
}
```

---

## 🎨 Цветовая палитра

| Цвет          | HEX       | Использование        |
|---------------|-----------|----------------------|
| Luna Black    | `#030712` | Фон                  |
| Luna Deep     | `#060d26` | Карточки             |
| Luna Violet   | `#6d28d9` | Акценты              |
| Luna Lilac    | `#a855f7` | Ссылки, бордеры      |
| Luna Pink     | `#e879f9` | Градиент             |
| Luna Star     | `#f0e6ff` | Основной текст       |

---

## 🔑 Переменные окружения

Скопируй `.env.example` в `.env` и заполни:

```env
DISCORD_GUILD_ID=     # ID твоего Discord-сервера
DISCORD_BOT_TOKEN=    # Токен Discord-бота (для live stats)
DISCORD_WEBHOOK_URL=  # Webhook для получения сообщений формы
SITE_URL=             # URL сайта
ADMIN_EMAIL=          # Email для уведомлений
```

---

## 👑 Автор

Создано с 💜 для сообщества **LunaWorld**  
Управляющий: **TBoSy 💖 </>**

- Discord: [discord.gg/nVaJgdgchY](https://discord.gg/nVaJgdgchY)

---

*🌙 LunaWorld — место, куда хочется возвращаться снова и снова.*
