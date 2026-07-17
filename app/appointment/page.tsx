import Link from 'next/link'

export const metadata = {
  title: 'Запись на приём | Профессор Сушков',
  description: 'Запись на консультацию к профессору Сушкову',
}

export default function AppointmentPage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px', lineHeight: 1.7 }}>
      <h1>Запись на приём</h1>
      <p>
        Для записи на консультацию свяжитесь с нами по телефону или через мессенджеры.
        Мы подберём удобное время и подготовим необходимую информацию.
      </p>
      <ul>
        <li>Телефон: +380 67 570 79 49</li>
        <li>Telegram: @SSVPROFF_MEDICAL</li>
        <li>Email: ssvproff@gmail.com</li>
      </ul>
      <Link href="/" style={{ color: '#0d9488', fontWeight: 600 }}>
        Вернуться на главную
      </Link>
    </main>
  )
}
