import Link from 'next/link'

export const metadata = {
  title: 'Гайды | Профессор Сушков',
  description: 'Полезные руководства по подготовке к приёму и диагностике',
}

export default function GuidesPage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px', lineHeight: 1.7 }}>
      <h1>Гайды</h1>
      <p>Подборка материалов о подготовке к консультации, диагностике и реабилитации.</p>
      <Link href="/" style={{ color: '#0d9488', fontWeight: 600 }}>
        Вернуться на главную
      </Link>
    </main>
  )
}
