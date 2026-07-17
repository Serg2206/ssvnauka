import Link from 'next/link'

export const metadata = {
  title: 'Медицинский дисклеймер',
  description: 'Информация о медицинском предупреждении и ограничениях',
}

export default function MedicalDisclaimerPage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px', lineHeight: 1.7 }}>
      <h1>Медицинский дисклеймер</h1>
      <p>Информация на сайте носит ознакомительный характер и не заменяет консультацию врача.</p>
      <Link href="/" style={{ color: '#0d9488', fontWeight: 600 }}>
        Вернуться на главную
      </Link>
    </main>
  )
}
