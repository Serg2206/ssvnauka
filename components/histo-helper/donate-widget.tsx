'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Copy, CheckCircle2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function DonateWidget() {
  const [copied, setCopied] = useState<string | null>(null)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)

  const donateOptions = [
    { amount: 100, label: '100 грн', description: 'Чашка кофе' },
    { amount: 250, label: '250 грн', description: 'Обед' },
    { amount: 500, label: '500 грн', description: 'Большая поддержка' },
    { amount: 1000, label: '1000 грн', description: 'Консультация' },
  ]

  const paymentMethods = [
    {
      name: 'Приватбанк (P2P)',
      icon: '🇺🇦',
      details: '+380 67 570 7949',
      holder: 'Сергей Сушков',
      color: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-300'
    },
    {
      name: 'PayPal',
      icon: '🌐',
      details: 'ssvproff@gmail.com',
      holder: 'International',
      color: 'from-amber-50 to-amber-100',
      borderColor: 'border-amber-300'
    },
    {
      name: 'Криптовалюта',
      icon: '₿',
      details: 'По запросу',
      holder: 'Bitcoin / Ethereum',
      color: 'from-orange-50 to-orange-100',
      borderColor: 'border-orange-300'
    }
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="w-full space-y-6">
      {/* Main Donate Card */}
      <Card className="bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 border-2 border-red-200 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                Поддержите развитие инструмента
              </CardTitle>
              <CardDescription className="text-sm mt-2">
                Этот инструмент разработан для врачей с целью повышения качества диагностики.
                Ваша поддержка помогает улучшать базу знаний и добавлять новые функции.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Amount Selection */}
          <div>
            <p className="text-sm font-semibold text-slate-900 mb-3">Выберите сумму поддержки:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {donateOptions.map((option) => (
                <button
                  key={option.amount}
                  onClick={() => setSelectedAmount(option.amount)}
                  className={`p-3 rounded-lg border-2 transition-all cursor-pointer text-center ${
                    selectedAmount === option.amount
                      ? 'border-red-500 bg-white shadow-md'
                      : 'border-red-200 bg-white hover:border-red-400'
                  }`}
                >
                  <div className="font-bold text-red-600">{option.label}</div>
                  <div className="text-xs text-slate-600 mt-1">{option.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white p-4 rounded-lg border border-red-200 space-y-3">
            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-base font-semibold"
              onClick={() => {
                if (selectedAmount) {
                  alert(`Вы выбрали ${selectedAmount} грн. Используйте один из способов поддержки ниже.`)
                }
              }}
            >
              <Heart className="w-5 h-5 mr-2 fill-white" />
              Пожертвовать {selectedAmount || '...'} грн
            </Button>

            <p className="text-xs text-slate-600 text-center">
              💡 После выбора суммы используйте один из способов оплаты ниже
            </p>
          </div>

          {/* Info Box */}
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 text-sm">
              ✅ Все средства идут напрямую на развитие инструмента и не требуют регистрации ФОП
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <div>
        <h3 className="text-lg font-bold mb-4 text-slate-900">💳 Способы поддержки:</h3>

        <div className="grid md:grid-cols-3 gap-4">
          {paymentMethods.map((method) => (
            <Card
              key={method.name}
              className={`bg-gradient-to-br ${method.color} border-2 ${method.borderColor} overflow-hidden hover:shadow-lg transition-shadow`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{method.icon}</span>
                  <div>
                    <CardTitle className="text-base">{method.name}</CardTitle>
                    <CardDescription className="text-xs">{method.holder}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="bg-white bg-opacity-70 p-3 rounded font-mono text-sm font-semibold break-all">
                  {method.details}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => copyToClipboard(method.details)}
                >
                  {copied === method.details ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                      Скопировано!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Скопировать
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <Card className="bg-slate-50 border-slate-200">
        <CardHeader>
          <CardTitle className="text-base">📋 Пошаговая инструкция</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="font-bold text-red-600 min-w-[24px]">1.</span>
              <span>Выберите сумму пожертвования в карточке выше</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-red-600 min-w-[24px]">2.</span>
              <span>Выберите удобный способ платежа (Приватбанк, PayPal, Крипто)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-red-600 min-w-[24px]">3.</span>
              <span>Нажмите кнопку "Скопировать" и используйте скопированные данные для перевода</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-red-600 min-w-[24px]">4.</span>
              <span>После перевода напишите мне в Telegram (@SSVPROFF_MEDICAL) для подтверждения</span>
            </li>
          </ol>

          <div className="mt-4 pt-4 border-t border-slate-300">
            <p className="text-xs text-slate-600">
              <strong>Вопросы?</strong> Свяжитесь со мной:<br/>
              📞 +380 67 570 7949 (WhatsApp, Telegram)<br/>
              📧 ssvproff@gmail.com<br/>
              🔗 @SSVPROFF_MEDICAL (Telegram)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tax Notice */}
      <Alert className="border-blue-200 bg-blue-50">
        <AlertDescription className="text-blue-800 text-xs">
          ℹ️ Пожертвования от граждан физических лиц не облагаются налогом согласно Налоговому кодексу Украины.
          Регулярные пожертвования в развитие медицинского инструмента считаются благотворительностью.
        </AlertDescription>
      </Alert>
    </div>
  )
}
