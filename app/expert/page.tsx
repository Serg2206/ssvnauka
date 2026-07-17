import Link from 'next/link'

export const metadata = {
  title: 'Профессор Сушков | Экспертная страница',
  description: 'Биография, опыт и достижения профессора Сергея Сушкова',
}

export default function ExpertPage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px', lineHeight: 1.7 }}>
      <h1>Профессор Сушков Сергей Валентинович</h1>
      <p>Доктор медицинских наук, профессор, хирург-онколог с более чем 40-летним опытом.</p>
      <p>Ведёт диагностику, консультации и хирургическое лечение в MARIA Medical Center.</p>
      <Link href="/" style={{ color: '#0d9488', fontWeight: 600 }}>
        Вернуться на главную
      </Link>
    </main>
  )
}
