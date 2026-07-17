import Link from 'next/link'

export const metadata = {
  title: 'О центре | Профессор Сушков',
  description: 'Информация о медицинском центре MARIA и профессоре Сушкове',
}

export default function AboutPage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px', lineHeight: 1.7 }}>
      <h1>О центре</h1>
      <p>
        MARIA Medical Center — медицинский центр, где работают специалисты по хирургии,
        онкологии и гинекологии. Мы делаем упор на точную диагностику, современную
        лапароскопию и персональный подход к каждому пациенту.
      </p>
      <p>
        Профессор Сушков Сергей Валентинович — врач с более чем 40-летним опытом,
        который ведёт консультации, диагностику и хирургическое лечение.
      </p>
      <Link href="/" style={{ color: '#0d9488', fontWeight: 600 }}>
        Вернуться на главную
      </Link>
    </main>
  )
}
