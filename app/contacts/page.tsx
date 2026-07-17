import Link from 'next/link'

export const metadata = {
  title: 'Контакты | Профессор Сушков',
  description: 'Контактная информация медицинского центра MARIA',
}

export default function ContactsPage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px', lineHeight: 1.7 }}>
      <h1>Контакты</h1>
      <p>Свяжитесь с нами по телефону, Telegram или электронной почте.</p>
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
