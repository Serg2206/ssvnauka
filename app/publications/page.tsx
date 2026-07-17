import Link from 'next/link'

export const metadata = {
  title: 'Публикации | Профессор Сушков',
  description: 'Научные публикации и достижения профессора',
}

export default function PublicationsPage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px', lineHeight: 1.7 }}>
      <h1>Публикации</h1>
      <p>Научные работы и материалы профессора доступны для ознакомления.</p>
      <Link href="/" style={{ color: '#0d9488', fontWeight: 600 }}>
        Вернуться на главную
      </Link>
    </main>
  )
}
