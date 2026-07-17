import Link from 'next/link'

export const metadata = {
  title: 'Политика конфиденциальности',
  description: 'Политика обработки персональных данных',
}

export default function PrivacyPolicyPage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px', lineHeight: 1.7 }}>
      <h1>Политика конфиденциальности</h1>
      <p>Мы уважительно относимся к персональным данным и используем их только для обработки запросов и записи на приём.</p>
      <Link href="/" style={{ color: '#0d9488', fontWeight: 600 }}>
        Вернуться на главную
      </Link>
    </main>
  )
}
