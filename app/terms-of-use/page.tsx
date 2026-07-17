import Link from 'next/link'

export const metadata = {
  title: 'Условия использования',
  description: 'Условия использования сайта',
}

export default function TermsOfUsePage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px', lineHeight: 1.7 }}>
      <h1>Условия использования</h1>
      <p>Использование сайта предполагает согласие с правилами и условиями, описанными здесь.</p>
      <Link href="/" style={{ color: '#0d9488', fontWeight: 600 }}>
        Вернуться на главную
      </Link>
    </main>
  )
}
