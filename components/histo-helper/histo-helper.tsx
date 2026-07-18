'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, Copy, Loader2 } from 'lucide-react'

interface HistoCase {
  id: string
  name: string
  icon: string
  description: string
  original: string
  result: string
}

const cases: HistoCase[] = [
  {
    id: 'stomach',
    name: 'Аденокарцинома желудка',
    icon: '🔴',
    description: 'Умеренная дифференцировка, G2, pT3N2M0',
    original: 'Аденокарцинома желудка, G2, pT3N2M0, края резекции R0',
    result: `
      <h4 class="font-bold mt-4 mb-2">Основные находки:</h4>
      <ul class="list-disc list-inside space-y-1 mb-4">
        <li>Тип опухоли: Аденокарцинома желудка</li>
        <li>Степень дифференцировки: G2 (умеренная)</li>
        <li>Глубина вторжения: pT3 (через все слои)</li>
        <li>Поражение лимфоузлов: N2 (4-9 узлов)</li>
        <li>Метастазы: M0 (отсутствуют)</li>
      </ul>

      <h4 class="font-bold mt-4 mb-2">Диагноз простыми словами:</h4>
      <p class="mb-4">Выявлена злокачественная опухоль желудка средней степени агрессивности. Опухоль прошла через все слои стенки желудка и распространилась на региональные лимфоузлы. Отдалённых метастазов не обнаружено.</p>

      <h4 class="font-bold mt-4 mb-2">Прогноз и стадия:</h4>
      <p class="mb-4"><strong>Стадия IIIA:</strong> местно-распространённый рак желудка. 5-летняя выживаемость без лечения 15-20%, с адъювантной химиотерапией 50-60%.</p>

      <h4 class="font-bold mt-4 mb-2">Лечебные последствия:</h4>
      <p class="mb-4">Требуется системная химиотерапия (схема платина + фторурацил). Может быть показана неоадъювантная химиотерапия перед операцией.</p>

      <h4 class="font-bold mt-4 mb-2">Наблюдение и мониторинг:</h4>
      <p>КТ контроль каждые 3-6 месяцев, маркёры опухоли (CEA, CA 19-9), эндоскопия через 6-12 месяцев.</p>
    `
  },
  {
    id: 'breast',
    name: 'Рак молочной железы',
    icon: '💗',
    description: 'Люминальный A, ER+, HER2-, G1',
    original: 'Инвазивная карцинома молочной железы, G1, pT2N1M0, ER+90%, PR+75%, HER2-, Ki-67 15%',
    result: `
      <h4 class="font-bold mt-4 mb-2">Основные находки:</h4>
      <ul class="list-disc list-inside space-y-1 mb-4">
        <li>Тип опухоли: Инвазивная карцинома молочной железы</li>
        <li>Подтип: Люминальный A (гормон-чувствительный)</li>
        <li>ER статус: положительный (ER+90%)</li>
        <li>HER2 статус: отрицательный</li>
        <li>Ki-67: 15% (низкая пролиферация)</li>
      </ul>

      <h4 class="font-bold mt-4 mb-2">Диагноз простыми словами:</h4>
      <p class="mb-4">Рак молочной железы низкой степени агрессивности, гормон-чувствительный тип. Опухоль растёт медленно и хорошо отвечает на гормональную терапию.</p>

      <h4 class="font-bold mt-4 mb-2">Прогноз и стадия:</h4>
      <p class="mb-4"><strong>Стадия IIA:</strong> ранний рак с благоприятным прогнозом. 5-летняя выживаемость 85-90% с гормональной терапией.</p>

      <h4 class="font-bold mt-4 mb-2">Лечебные последствия:</h4>
      <p class="mb-4">Рекомендуется гормональная терапия (тамоксифен или ингибиторы ароматазы) на 5-10 лет. Может требоваться лучевая терапия.</p>

      <h4 class="font-bold mt-4 mb-2">Наблюдение:</h4>
      <p>Клинический осмотр каждые 3-6 месяцев, маммография ежегодно.</p>
    `
  },
  {
    id: 'colon',
    name: 'Рак толстой кишки',
    icon: '🔵',
    description: 'Стадия II, T4aN0M0, MSI отрицательна',
    original: 'Аденокарцинома толстой кишки, G2, pT4aN0M0, края R0, MSI отрицательна',
    result: `
      <h4 class="font-bold mt-4 mb-2">Основные находки:</h4>
      <ul class="list-disc list-inside space-y-1 mb-4">
        <li>Локализация: Толстая кишка (ободочная кишка)</li>
        <li>Тип опухоли: Аденокарцинома</li>
        <li>Глубина вторжения: pT4a (прорастание в серозу)</li>
        <li>Поражение лимфоузлов: N0 (не поражены)</li>
        <li>Молекулярный статус: MSI отрицательна (стандартный риск)</li>
      </ul>

      <h4 class="font-bold mt-4 mb-2">Диагноз простыми словами:</h4>
      <p class="mb-4">Рак толстой кишки с прорастанием через стенку кишечника. Лимфоузлы не поражены, что является благоприятным признаком.</p>

      <h4 class="font-bold mt-4 mb-2">Прогноз и стадия:</h4>
      <p class="mb-4"><strong>Стадия II:</strong> местно-распространённый рак без поражения лимфоузлов. 5-летняя выживаемость 70-75% без лечения, 80-85% с адъювантной химиотерапией.</p>

      <h4 class="font-bold mt-4 mb-2">Лечебные последствия:</h4>
      <p class="mb-4">Рекомендуется адъювантная химиотерапия (FOLFOX или другие схемы на основе оксалиплатина).</p>

      <h4 class="font-bold mt-4 mb-2">Наблюдение:</h4>
      <p>Уровень CEA каждые 3 месяца, КТ органов брюшной полости каждые 6 месяцев.</p>
    `
  },
  {
    id: 'melanoma',
    name: 'Меланома',
    icon: '🖤',
    description: 'Промежуточный риск, глубина 3.2 мм',
    original: 'Меланома кожи, Толщина по Бреслоу 3.2 мм, митозы 8/10 пл, изъязвление присутствует, S100+, HMB-45+, Ki-67 30%',
    result: `
      <h4 class="font-bold mt-4 mb-2">Основные находки:</h4>
      <ul class="list-disc list-inside space-y-1 mb-4">
        <li>Диагноз: Меланома кожи</li>
        <li>Толщина по Бреслоу: 3.2 мм (промежуточно-высокий риск)</li>
        <li>Митотический индекс: 8/10 полей зрения (высокий)</li>
        <li>Изъязвление: присутствует (неблагоприятный фактор)</li>
        <li>Ki-67: 30% (быстро растущая опухоль)</li>
      </ul>

      <h4 class="font-bold mt-4 mb-2">Диагноз простыми словами:</h4>
      <p class="mb-4">Меланома с промежуточной/высокой степенью риска. Требуется расширенное обследование для исключения метастазов в лимфоузлы.</p>

      <h4 class="font-bold mt-4 mb-2">Прогноз и стадия:</h4>
      <p class="mb-4"><strong>Стадия IIIA-IIIB:</strong> вероятное поражение региональных лимфоузлов. 5-летняя выживаемость 40-60%.</p>

      <h4 class="font-bold mt-4 mb-2">Лечебные последствия:</h4>
      <p class="mb-4">Необходима сентинельная биопсия лимфоузла. При позитивных лимфоузлах показана адъювантная иммунотерапия.</p>

      <h4 class="font-bold mt-4 mb-2">Наблюдение:</h4>
      <p>Клинический осмотр каждые 3 месяца, КТ каждые 3-6 месяцев, ПЭТ-КТ по показаниям.</p>
    `
  },
  {
    id: 'gist',
    name: 'ГИСТ желудка',
    icon: '⚪',
    description: 'c-KIT+, CD34+, мутация KIT экзон 11',
    original: 'Гастроинтестинальная стромальная опухоль (ГИСТ) желудка, 5х4 см, c-KIT (CD117)+, CD34+, мутация KIT экзон 11, митозы 3/50 пл',
    result: `
      <h4 class="font-bold mt-4 mb-2">Основные находки:</h4>
      <ul class="list-disc list-inside space-y-1 mb-4">
        <li>Локализация: Желудок</li>
        <li>Диагноз: Гастроинтестинальная стромальная опухоль (ГИСТ)</li>
        <li>Размер: 5х4 см (пограничный размер)</li>
        <li>Ключевой маркер: c-KIT (CD117)+ (определяющий маркер)</li>
        <li>Молекулярный тип: Мутация KIT экзон 11 (чувствительна к иматинибу)</li>
      </ul>

      <h4 class="font-bold mt-4 mb-2">Диагноз простыми словами:</h4>
      <p class="mb-4">Редкая опухоль желудка с мутацией, чувствительной к целевому препарату иматиниб (Гливек).</p>

      <h4 class="font-bold mt-4 mb-2">Прогноз и стадия:</h4>
      <p class="mb-4"><strong>Промежуточный риск:</strong> с таргетной терапией прогноз значительно улучшается. 5-летняя выживаемость с иматинибом >90%.</p>

      <h4 class="font-bold mt-4 mb-2">Лечебные последствия:</h4>
      <p class="mb-4">Хирургическое удаление опухоли + адъювантный иматиниб 3 года.</p>

      <h4 class="font-bold mt-4 mb-2">Наблюдение:</h4>
      <p>КТ органов брюшной полости каждые 3-6 месяцев в течение 5 лет, контроль переносимости иматиниба.</p>
    `
  },
  {
    id: 'hodgkin',
    name: 'Лимфома Ходжкина',
    icon: '🟣',
    description: 'Классическая, CD30+, EBV+',
    original: 'Классическая лимфома Ходжкина, клетки Рида-Штернберга обнаружены, CD30+, CD15+, CD45-, CD3-, CD20-, EBER+',
    result: `
      <h4 class="font-bold mt-4 mb-2">Основные находки:</h4>
      <ul class="list-disc list-inside space-y-1 mb-4">
        <li>Диагноз: Классическая лимфома Ходжкина</li>
        <li>Характерные клетки: Клетки Рида-Штернберга обнаружены</li>
        <li>Иммунофенотип: CD30+, CD15+, CD45-, CD3-, CD20-</li>
        <li>ЭБВ статус: EBER+ (вирус Эпштейна-Барр присутствует)</li>
        <li>Фон: Реактивные T-клетки преобладают</li>
      </ul>

      <h4 class="font-bold mt-4 mb-2">Диагноз простыми словами:</h4>
      <p class="mb-4">Лимфома Ходжкина классического типа. Это злокачественное заболевание лимфатической системы с лучшим прогнозом чем неходжкинские лимфомы.</p>

      <h4 class="font-bold mt-4 mb-2">Прогноз и стадия:</h4>
      <p class="mb-4"><strong>Стадия определяется по распределению поражённых областей (I-IV):</strong> В развитых странах 5-летняя выживаемость >90%.</p>

      <h4 class="font-bold mt-4 mb-2">Лечебные последствия:</h4>
      <p class="mb-4">Требуется полисхемотерапия (ABVD или современные PET-адаптированные схемы). Лучевая терапия в зависимости от стадии.</p>

      <h4 class="font-bold mt-4 mb-2">Наблюдение:</h4>
      <p>ПЭТ-КТ для оценки ответа после 2-4 циклов, контроль анализов крови, долгосрочное наблюдение.</p>
    `
  }
]

export function HistoHelper() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  const handleAnalyze = async (caseId: string) => {
    const selectedCaseData = cases.find(c => c.id === caseId)
    if (!selectedCaseData) return

    // Demo mode - show pre-calculated result
    setSelectedCase(caseId)
    setResult(selectedCaseData.result)
  }

  const resetView = () => {
    setSelectedCase(null)
    setResult('')
    setApiKey('')
  }

  return (
    <div className="w-full space-y-6">
      {!selectedCase ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((case_) => (
              <Card
                key={case_.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleAnalyze(case_.id)}
              >
                <CardHeader>
                  <div className="text-4xl mb-2">{case_.icon}</div>
                  <CardTitle className="line-clamp-2">{case_.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{case_.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => handleAnalyze(case_.id)}>
                    Расшифровать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💡 Полная версия с AI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700">
                Для анализа собственных гистологических заключений вам нужен OpenAI API ключ.
              </p>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="Введите OpenAI API ключ"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md text-sm"
                />
                <Button variant="outline" size="sm">
                  Сохранить
                </Button>
              </div>
              <p className="text-xs text-gray-600">
                Ключ сохраняется только в вашем браузере и не отправляется никуда
              </p>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="space-y-4">
          <Button variant="outline" onClick={resetView}>
            ← Вернуться к примерам
          </Button>

          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              Этот инструмент носит ознакомительный характер. Окончательную интерпретацию результатов даёт только лечащий врач-патологоанатом или онколог.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader className="bg-green-50 border-b">
              <CardTitle className="text-green-900">✓ Расшифровка готова</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: result }}
              />
            </CardContent>
          </Card>

          <Button
            onClick={resetView}
            variant="outline"
            className="w-full"
          >
            Вернуться к примерам
          </Button>
        </div>
      )}
    </div>
  )
}
