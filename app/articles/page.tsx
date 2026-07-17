import Link from 'next/link'

export const metadata = {
  title: 'Статьи | Профессор Сушков',
  description: 'Полезные статьи о хирургии, онкологии и гинекологии',
}

export default function ArticlesPage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px', lineHeight: 1.7 }}>
      <h1>Статьи</h1>
      <p>
        Здесь собраны материалы о современных методах лечения, диагностике и профилактике.
      </p>
      <ul>
        <li>Лапароскопическая хирургия</li>
        <li>Онкохирургия</li>
        <li>Гинекология</li>
      </ul>
      <Link href="/" style={{ color: '#0d9488', fontWeight: 600 }}>
        Вернуться на главную
      </Link>
    </main>
  )
}
