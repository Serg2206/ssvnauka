import Link from 'next/link'

export const metadata = {
  title: 'Cookie Policy',
  description: 'Информация о cookie-файлах на сайте',
}

export default function CookiePolicyPage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px', lineHeight: 1.7 }}>
      <h1>Cookie Policy</h1>
      <p>Сайт использует cookies для улучшения работы и аналитики.</p>
      <Link href="/" style={{ color: '#0d9488', fontWeight: 600 }}>
        Вернуться на главную
      </Link>
    </main>
  )
}
