## Archived
Этот репозиторий архивирован. Контент и функционал перенесены в [surgical-research-platform-mvp](https://github.com/Serg2206/surgical-research-platform-mvp) и [ssvnauka.com](https://github.com/Serg2206/ssvnauka.com).

---


# SSVproff - Хирургическая образовательная платформа

![SSVproff Platform](public/og-image.png)

## 🏥 О проекте

SSVproff (ssvnauka.com) - это профессиональная образовательная платформа, посвященная хирургическим техникам и медицинскому образованию. Платформа предоставляет доступ к курируемой коллекции из 51 видеоматериала от ведущих медицинских учреждений мира.

## ✨ Основные возможности

- 📚 **9 специализированных категорий** хирургического контента
- 🎥 **51 профессиональное видео** от Harvard, Stanford, Johns Hopkins, Mayo Clinic, Cleveland Clinic
- 🇷🇺 **Полная русская локализация** с медицинской терминологией
- 💾 **PostgreSQL база данных** с Prisma ORM
- 🎨 **Современный дизайн** с Tailwind CSS и Shadcn/UI
- 📱 **Адаптивная верстка** для всех устройств
- ⚡ **Высокая производительность** благодаря Next.js 14

## 📋 Категории контента

1. ⚔️ **Хирургические техники** (4 видео)
2. 🔬 **Лапароскопические процедуры** (8 видео)
3. 👨‍⚕️ **Обучение хирургов** (9 видео)
4. 🔧 **Медицинские инструменты** (4 видео)
5. 🏥 **Операционные методы** (4 видео)
6. 🫀 **Анатомия для хирургов** (4 видео)
7. 🥽 **Симуляция и обучение** (5 видео)
8. 📹 **Эндоскопические техники** (6 видео)
9. 🤖 **Минимально инвазивная хирургия** (7 видео)

## 🛠 Технологический стек

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI, Framer Motion
- **Database**: PostgreSQL с Prisma ORM
- **Deployment**: Vercel-ready
- **Package Manager**: Yarn

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 18+
- Yarn
- PostgreSQL

### Установка

```bash
# Клонировать репозиторий
git clone https://github.com/Serg2206/ssvnauka.git
cd ssvnauka

# Установить зависимости
yarn install

# Настроить переменные окружения
cp .env.example .env
# Отредактируйте .env и добавьте DATABASE_URL

# Применить миграции базы данных
yarn prisma migrate dev

# Заполнить базу данных начальными данными
yarn prisma db seed

# Запустить dev сервер
yarn dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 📁 Структура проекта

```
ssvnauka/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── categories/        # Страница всех категорий
│   ├── category/[slug]/   # Страницы отдельных категорий
│   └── page.tsx           # Главная страница
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Секции главной страницы
│   └── ui/                # UI компоненты (Shadcn)
├── data/                  # JSON с видеокаталогом
├── lib/                   # Утилиты и типы
├── prisma/                # Схема базы данных
├── public/                # Статические файлы
└── scripts/               # Seed скрипты
```

## 🗄️ База данных

Схема базы данных включает:

- **Category** - Хирургические категории
- **Video** - Видеоматериалы
- **RelatedVideo** - Связи между видео
- **ContactSubmission** - Обращения через форму контактов

### Prisma команды

```bash
# Создать миграцию
yarn prisma migrate dev

# Применить миграции
yarn prisma migrate deploy

# Открыть Prisma Studio
yarn prisma studio

# Заполнить базу данных
yarn prisma db seed
```

## 🌐 Деплой

### Vercel (Рекомендуется)

[![Deploy with Vercel](https://i.ytimg.com/vi/lAJ6LyvW_cw/hqdefault.jpg)

### Переменные окружения

```env
DATABASE_URL="postgresql://user:password@localhost:5432/ssvnauka"
```

## 📝 Скрипты

```bash
yarn dev          # Запустить dev сервер
yarn build        # Собрать для production
yarn start        # Запустить production сервер
yarn lint         # Проверить код
yarn prisma studio # Открыть Prisma Studio
```

## 🤝 Вклад в проект

Проект разработан для SSVproff платформы. Для предложений и вопросов свяжитесь через форму на сайте.

## 📄 Лицензия

© 2024 SSVproff. Все права защищены.

## 📧 Контакты

- **Сайт**: [ssvnauka.com](http://ssvnauka.com)
- **GitHub**: [Serg2206/ssvnauka](https://github.com/Serg2206/ssvnauka)

---

Разработано с ❤️ для хирургического сообщества
