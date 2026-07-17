import Link from 'next/link'

export const metadata = {
  title: 'Отзывы | Профессор Сушков',
  description: 'Отзывы пациентов о лечении и консультациях',
}

export default function ReviewsPage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px', lineHeight: 1.7 }}>
      <h1>Отзывы пациентов</h1>
      <p>Ниже представлены реальные отзывы о работе профессора Сушкова и клиники MARIA.</p>
      <ul>
        <li>«Профессиональный подход и забота о пациенте.»</li>
        <li>«Чёткая диагностика и понятное объяснение лечения.»</li>
        <li>«Минимально инвазивная хирургия и быстрый восстановительный период.»</li>
      </ul>
      <Link href="/" style={{ color: '#0d9488', fontWeight: 600 }}>
        Вернуться на главную
      </Link>
    </main>
  )
}
