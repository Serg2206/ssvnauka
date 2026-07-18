import { HistoHelper } from '@/components/histo-helper/histo-helper'
import { DonateWidget } from '@/components/histo-helper/donate-widget'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata = {
  title: 'Гистологический AI-помощник | SSVproff',
  description: 'Профессиональный инструмент для расшифровки гистологических и гисто-химических заключений. Примеры расшифровок с использованием AI.',
  keywords: 'гистология, расшифровка заключений, патология, онкология, иммуногистохимия, гистохимия',
}

export default function HistoHelperPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              🔬 Гистологический AI-помощник
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-2">
              Профессиональный инструмент для расшифровки гистологических и гисто-химических заключений
            </p>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Prof. Sushkov - Medical Center MARIA
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <HistoHelper />
          </div>

          {/* Info Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-xl font-bold mb-3 text-slate-900">📚 Как это работает</h3>
              <ol className="space-y-2 text-slate-700">
                <li><strong>1.</strong> Выберите пример расшифровки из карточек</li>
                <li><strong>2.</strong> AI анализирует гистологическое заключение</li>
                <li><strong>3.</strong> Получите подробное объяснение простыми словами</li>
                <li><strong>4.</strong> Узнайте прогноз и рекомендации по лечению</li>
              </ol>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 shadow border border-blue-200">
              <h3 className="text-xl font-bold mb-3 text-blue-900">⚠️ Важное примечание</h3>
              <p className="text-blue-800">
                Этот инструмент носит ознакомительный характер. Окончательную интерпретацию результатов гистологических исследований даёт только квалифицированный врач-патологоанатом или онколог.
              </p>
            </div>
          </div>

          {/* Database Section */}
          <div className="bg-white rounded-lg p-6 shadow mb-8">
            <h3 className="text-2xl font-bold mb-4 text-slate-900">🗂️ База знаний</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-slate-50 rounded">
                <h4 className="font-bold text-slate-900 mb-2">📊 60+ маркеров ИГХ</h4>
                <p className="text-sm text-slate-600">Полная база иммуногистохимических маркеров с интерпретацией</p>
              </div>
              <div className="p-4 bg-slate-50 rounded">
                <h4 className="font-bold text-slate-900 mb-2">🎨 12 гистохимических окрасок</h4>
                <p className="text-sm text-slate-600">PAS, трихром, Берлинская лазурь, Ziehl-Neelsen и другие</p>
              </div>
              <div className="p-4 bg-slate-50 rounded">
                <h4 className="font-bold text-slate-900 mb-2">🔬 Классификации</h4>
                <p className="text-sm text-slate-600">TNM staging, G-grades (G1-G4), ER/PR/HER2 статусы</p>
              </div>
            </div>
          </div>

          {/* Examples Grid */}
          <div className="bg-white rounded-lg p-6 shadow mb-12">
            <h3 className="text-2xl font-bold mb-4 text-slate-900">📋 Примеры диагнозов</h3>
            <p className="text-slate-600 mb-6">
              В инструменте содержатся примеры расшифровок для следующих патологий:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-2xl">🔴</span>
                <div>
                  <strong>Аденокарцинома желудка</strong>
                  <p className="text-slate-600">G2, pT3N2M0, Стадия IIIA</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-2xl">💗</span>
                <div>
                  <strong>Рак молочной железы</strong>
                  <p className="text-slate-600">Люминальный A, ER+, благоприятный прогноз</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-2xl">🔵</span>
                <div>
                  <strong>Рак толстой кишки</strong>
                  <p className="text-slate-600">T4aN0M0, Стадия II</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-2xl">🖤</span>
                <div>
                  <strong>Меланома</strong>
                  <p className="text-slate-600">Толщина 3.2 мм, промежуточный-высокий риск</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-2xl">⚪</span>
                <div>
                  <strong>ГИСТ желудка</strong>
                  <p className="text-slate-600">c-KIT+, мутация KIT экзон 11</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-2xl">🟣</span>
                <div>
                  <strong>Лимфома Ходжкина</strong>
                  <p className="text-slate-600">Классическая, CD30+, EBV+</p>
                </div>
              </div>
            </div>
          </div>

          {/* Donate Section */}
          <div id="donate" className="mb-12">
            <DonateWidget />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
