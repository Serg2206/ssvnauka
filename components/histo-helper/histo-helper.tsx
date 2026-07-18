'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, Copy, Loader2, Database, BookOpen, Award, TrendingUp } from 'lucide-react'
import { histoDatabase, HistoDiagnosis } from '@/lib/histo-database'

// Диагнозы доступные в базе
const diagnosisIds = Object.keys(histoDatabase) as Array<keyof typeof histoDatabase>

export function HistoHelper() {
  const [selectedDiagnosisId, setSelectedDiagnosisId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  const selectedDiagnosis = selectedDiagnosisId
    ? histoDatabase[selectedDiagnosisId as keyof typeof histoDatabase]
    : null

  const getDiagnosisIcon = (id: string) => {
    const icons: Record<string, string> = {
      'gastric-adenocarcinoma-g2': '🔴',
      'breast-cancer-luminal-a': '💗',
      'colorectal-adenocarcinoma-stage2': '🔵',
      'melanoma-intermediate-risk': '🖤',
      'hodgkin-lymphoma-ns': '🟣',
      'ovarian-cancer-hgsoc': '🟡'
    }
    return icons[id] || '🔬'
  }

  if (selectedDiagnosis) {
    return (
      <div className="w-full space-y-6">
        <Button
          variant="outline"
          onClick={() => {
            setSelectedDiagnosisId(null)
            setActiveTab('overview')
          }}
          className="mb-4"
        >
          ← Вернуться к диагнозам
        </Button>

        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            Этот инструмент носит ознакомительный характер. Окончательную интерпретацию даёт только врач-патологоанатом.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-4xl mb-2">{getDiagnosisIcon(selectedDiagnosis.id)}</div>
                <CardTitle className="text-2xl">{selectedDiagnosis.name}</CardTitle>
                <CardDescription className="mt-2">
                  {selectedDiagnosis.whoClassification}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="overview" className="text-xs sm:text-sm">
                  📋 Обзор
                </TabsTrigger>
                <TabsTrigger value="ihc" className="text-xs sm:text-sm">
                  🔬 ИГХ
                </TabsTrigger>
                <TabsTrigger value="molecular" className="text-xs sm:text-sm">
                  🧬 Молекулярно
                </TabsTrigger>
                <TabsTrigger value="treatment" className="text-xs sm:text-sm">
                  💊 Лечение
                </TabsTrigger>
                <TabsTrigger value="followup" className="text-xs sm:text-sm">
                  📊 Follow-up
                </TabsTrigger>
              </TabsList>

              {/* OVERVIEW TAB */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="bg-slate-50 p-3 rounded">
                      <h4 className="font-semibold text-sm mb-1">Морфология</h4>
                      <p className="text-sm text-slate-700">{selectedDiagnosis.morphology}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded">
                      <h4 className="font-semibold text-sm mb-1">Грейд</h4>
                      <p className="text-sm text-slate-700">{selectedDiagnosis.grading}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <h4 className="font-semibold text-sm text-blue-900 mb-1">Стадия TNM</h4>
                      <p className="text-sm text-blue-800 font-mono">{selectedDiagnosis.tnmStaging.description}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <h4 className="font-semibold text-sm text-green-900 mb-1">Классификация</h4>
                      <p className="text-sm text-green-800">{selectedDiagnosis.tnmStaging.stage}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                  <h4 className="font-semibold mb-2">Прогноз</h4>
                  <p className="text-sm">{selectedDiagnosis.tnmStaging.prognosis}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Прогностические факторы</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-sm font-semibold text-green-900 mb-2">✓ Благоприятные</p>
                      <ul className="text-sm space-y-1">
                        {selectedDiagnosis.prognosticFactors.favorable.map((factor, i) => (
                          <li key={i} className="text-green-800">• {factor}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-50 p-3 rounded">
                      <p className="text-sm font-semibold text-red-900 mb-2">✗ Неблагоприятные</p>
                      <ul className="text-sm space-y-1">
                        {selectedDiagnosis.prognosticFactors.unfavorable.slice(0, 5).map((factor, i) => (
                          <li key={i} className="text-red-800">• {factor}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* IHC TAB */}
              <TabsContent value="ihc" className="space-y-4">
                <div className="bg-slate-50 p-4 rounded">
                  <h4 className="font-semibold mb-2">Панель иммуногистохимии</h4>
                  <p className="text-sm text-slate-600 mb-4">{selectedDiagnosis.immunohistochemistry.panel}</p>
                  <div className="space-y-2">
                    {selectedDiagnosis.immunohistochemistry.markers.map((marker, i) => (
                      <div key={i} className="bg-white p-3 rounded border">
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1">
                            <p className="font-mono font-semibold text-sm">{marker.name}</p>
                            <p className="text-xs text-slate-600 mt-1">{marker.significance}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {marker.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* MOLECULAR TAB */}
              <TabsContent value="molecular" className="space-y-4">
                <div className="bg-slate-50 p-4 rounded">
                  <h4 className="font-semibold mb-2">Методология</h4>
                  <p className="text-sm text-slate-700 mb-4">{selectedDiagnosis.molecularMarkers.methodology}</p>
                </div>

                <div className="space-y-3">
                  {selectedDiagnosis.molecularMarkers.markers.map((marker, i) => (
                    <div key={i} className="bg-white p-4 rounded border border-purple-200">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h4 className="font-semibold text-sm">{marker.name}</h4>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                          {marker.protocol}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mb-2">Статус: {marker.status}</p>
                      <div className="bg-purple-50 p-2 rounded text-sm">
                        <p className="font-semibold text-purple-900 mb-1">Терапевтическое значение:</p>
                        <p className="text-purple-800">{marker.therapeuticImplication}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* TREATMENT TAB */}
              <TabsContent value="treatment" className="space-y-4">
                <div className="bg-white border-2 border-green-300 p-4 rounded">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Award className="w-5 h-5 text-green-600" />
                    NCCN Протокол
                  </h4>
                  <p className="text-sm font-semibold text-green-800 mb-2">Предпочтительно:</p>
                  <p className="text-sm mb-3">{selectedDiagnosis.treatmentProtocols.nccn.preferred}</p>
                  <p className="text-sm font-semibold text-green-800 mb-2">Альтернативы:</p>
                  <ul className="text-sm space-y-1 mb-3">
                    {selectedDiagnosis.treatmentProtocols.nccn.alternatives.map((alt, i) => (
                      <li key={i}>• {alt}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-slate-600">Источник: {selectedDiagnosis.treatmentProtocols.nccn.reference}</p>
                </div>

                <div className="bg-white border-2 border-blue-300 p-4 rounded">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    ESMO Рекомендации
                  </h4>
                  <p className="text-sm font-semibold text-blue-800 mb-2">Предпочтительно:</p>
                  <p className="text-sm mb-3">{selectedDiagnosis.treatmentProtocols.esmo.preferred}</p>
                  <p className="text-sm font-semibold text-blue-800 mb-2">Альтернативы:</p>
                  <ul className="text-sm space-y-1 mb-3">
                    {selectedDiagnosis.treatmentProtocols.esmo.alternatives.map((alt, i) => (
                      <li key={i}>• {alt}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-slate-600">Источник: {selectedDiagnosis.treatmentProtocols.esmo.reference}</p>
                </div>

                {selectedDiagnosis.treatmentProtocols.adjuvant && (
                  <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
                    <h4 className="font-semibold text-orange-900 mb-2">Адъювантная терапия</h4>
                    <p className="text-sm text-orange-800">{selectedDiagnosis.treatmentProtocols.adjuvant}</p>
                  </div>
                )}
              </TabsContent>

              {/* FOLLOWUP TAB */}
              <TabsContent value="followup" className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded">
                  <h4 className="font-semibold mb-2">Выживаемость</h4>
                  <div className="grid md:grid-cols-3 gap-3 text-sm">
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-blue-900">5-летняя OS</p>
                      <p className="text-lg font-bold text-blue-700">{selectedDiagnosis.survival.fiveYear}</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-blue-900">10-летняя OS</p>
                      <p className="text-lg font-bold text-blue-700">{selectedDiagnosis.survival.tenYear}</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-blue-900">Медиана OS</p>
                      <p className="text-lg font-bold text-blue-700">{selectedDiagnosis.survival.medianOS}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-3">Данные: {selectedDiagnosis.survival.basedOn}</p>
                </div>

                <div className="bg-white border-2 border-green-300 p-4 rounded">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    План наблюдения
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-700">{selectedDiagnosis.followUpProtocol}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded">
                  <h4 className="font-semibold mb-3">Следующие шаги</h4>
                  <ol className="space-y-2">
                    {selectedDiagnosis.nextSteps.map((step, i) => (
                      <li key={i} className="text-sm flex gap-3">
                        <span className="font-bold text-slate-400">{i + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                  <h4 className="font-semibold mb-2">Клинические замечания</h4>
                  <p className="text-sm text-slate-700">{selectedDiagnosis.clinicalConsiderations}</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Button
          variant="outline"
          onClick={() => {
            setSelectedDiagnosisId(null)
            setActiveTab('overview')
          }}
          className="w-full"
        >
          ← Вернуться к диагнозам
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {diagnosisIds.map((id) => {
          const diagnosis = histoDatabase[id as keyof typeof histoDatabase]
          return (
            <Card
              key={id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedDiagnosisId(id)}
            >
              <CardHeader>
                <div className="text-4xl mb-2">{getDiagnosisIcon(id)}</div>
                <CardTitle className="line-clamp-2">{diagnosis.name}</CardTitle>
                <CardDescription className="line-clamp-2">{diagnosis.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setSelectedDiagnosisId(id)}>
                  Расшифровать →
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            📚 Информация о базе
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-slate-700">
            <strong>✓ Диагнозы:</strong> {diagnosisIds.length} основных патологий согласно WHO классификации
          </p>
          <p className="text-sm text-slate-700">
            <strong>✓ ИГХ маркеры:</strong> 60+ иммуногистохимических маркеров с интерпретацией
          </p>
          <p className="text-sm text-slate-700">
            <strong>✓ Молекулярные тесты:</strong> BRAF, KRAS, HER2, ER/PR, BRCA, MSI, PD-L1, EBV и другие
          </p>
          <p className="text-sm text-slate-700">
            <strong>✓ Протоколы лечения:</strong> NCCN, ESMO, ASCO, WHO рекомендации
          </p>
          <p className="text-sm text-slate-700">
            <strong>✓ Классификации:</strong> TNM staging, G-grades (G1-G4), статистика выживаемости
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
