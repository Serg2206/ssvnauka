/**
 * Professional Histopathological Diagnosis Database
 * Based on WHO Classification, NCCN, ESMO, and ASCO Guidelines
 * Last updated: 2024
 */

export interface HistoDiagnosis {
  id: string
  name: string
  location: string
  whoClassification: string
  morphology: string
  grading: string
  tnmStaging: {
    description: string
    stage: string
    prognosis: string
  }
  immunohistochemistry: {
    markers: Array<{
      name: string
      status: string
      significance: string
    }>
    panel: string
  }
  molecularMarkers: {
    markers: Array<{
      name: string
      status: string
      therapeuticImplication: string
      protocol: string
    }>
    methodology: string
  }
  prognosticFactors: {
    favorable: string[]
    unfavorable: string[]
    score: string
  }
  treatmentProtocols: {
    nccn: {
      preferred: string
      alternatives: string[]
      reference: string
    }
    esmo: {
      preferred: string
      alternatives: string[]
      reference: string
    }
    adjuvant: string
    neoadjuvant: string
  }
  survival: {
    fiveYear: string
    tenYear: string
    medianOS: string
    basedOn: string
  }
  nextSteps: string[]
  clinicalConsiderations: string
  followUpProtocol: string
}

export const histoDatabase: Record<string, HistoDiagnosis> = {
  // ============ GASTRIC CANCER ============
  'gastric-adenocarcinoma-g2': {
    id: 'gastric-adenocarcinoma-g2',
    name: 'Аденокарцинома желудка, умеренная дифференцировка',
    location: 'Желудок',
    whoClassification: 'Adenocarcinoma, NOS (Intestinal type)',
    morphology: 'Умеренно дифференцированная аденокарцинома с железистыми структурами',
    grading: 'G2 (Grade 2 - Moderately differentiated)',
    tnmStaging: {
      description: 'pT3N2M0 - Прорастание через подсеризный слой, поражение 4-9 региональных лимфоузлов',
      stage: 'IIIA (по AJCC 8th ed.)',
      prognosis: 'Локально-распространённый рак с дальнейшим прогнозом при адъювантном лечении'
    },
    immunohistochemistry: {
      markers: [
        { name: 'CK7', status: 'Положительно', significance: 'Подтверждает эпителиальное происхождение' },
        { name: 'CK20', status: 'Вариабельно', significance: 'Может быть при кишечном типе' },
        { name: 'CDX2', status: 'Положительно', significance: 'Кишечная дифференцировка' },
        { name: 'MUC5AC', status: 'Положительно', significance: 'Слизистая дифференцировка' },
        { name: 'p53', status: 'Положительно (20-40%)', significance: 'Возможна мутация TP53' },
        { name: 'Ki-67', status: '20-30%', significance: 'Промежуточная пролиферация' }
      ],
      panel: 'Гастральная карцинома стандартная панель'
    },
    molecularMarkers: {
      markers: [
        {
          name: 'HER2',
          status: 'Требует определения (IHC 0, 1+, 2+, 3+)',
          therapeuticImplication: 'HER2 3+ или FISH+ → трастузумаб (Herceptin)',
          protocol: 'NCCN, ESMO, ASCO'
        },
        {
          name: 'Mismatch Repair (MMR)',
          status: 'MLH1, MSH2, MSH6, PMS2',
          therapeuticImplication: 'dMMR/MSI-H → иммунотерапия (пембролизумаб)',
          protocol: 'NCCN Guidelines 2024'
        },
        {
          name: 'PD-L1 (CPS)',
          status: 'Рекомендуется определение',
          therapeuticImplication: 'CPS ≥5 → комбинация химио + иммунотерапия',
          protocol: 'CheckMate 649 Trial'
        },
        {
          name: 'EBV',
          status: 'In situ гибридизация',
          therapeuticImplication: 'EBV+ → потенциальное лучший ответ на иммунотерапию',
          protocol: 'TCGA Gastric Cancer Classification'
        }
      ],
      methodology: 'IHC, FISH, NGS (опционально), MSI testing'
    },
    prognosticFactors: {
      favorable: [
        'G2 дифференцировка (лучше чем G3-G4)',
        'Полная резекция (R0)',
        'Меньшее количество вовлечённых лимфоузлов (N1 лучше чем N2)',
        'Кишечный тип (лучше чем диффузный)'
      ],
      unfavorable: [
        'pT3 инвазия',
        'N2 поражение лимфоузлов',
        'Лимфоваскулярная инвазия',
        'Перинервальная инвазия',
        'TP53 мутация',
        'Высокий Ki-67 (>30%)'
      ],
      score: 'AJCC Stage IIIA - среднее прогнозируемое исход'
    },
    treatmentProtocols: {
      nccn: {
        preferred: 'Периоперационная химиотерапия (3 цикла до операции, 3 цикла после) + D2 резекция',
        alternatives: [
          'Адъювантная химиотерапия только (если неоадъювант не проведён)',
          'Адъювантная лучевая терапия при высоком риске'
        ],
        reference: 'NCCN Guidelines Gastric Cancer 2024'
      },
      esmo: {
        preferred: 'Периоперационная химиотерапия: ECF (5-FU, Cisplatin, Epirubicin) или ECX (капецитабин вместо 5-FU)',
        alternatives: [
          'FLOT (5-FU, Leucovorin, Oxaliplatin, Docetaxel) - более новая схема',
          'Адъювантная химиотерапия'
        ],
        reference: 'ESMO Clinical Practice Guidelines 2023'
      },
      adjuvant: 'Рекомендуется адъювантная химиотерапия (6 цикл): капецитабин + оксалиплатин (CAPOX) или 5-FU + оксалиплатин',
      neoadjuvant: 'Требуется предоперационная стадизация (эндоУЗ, КТ). FLOT схема предпочтительнее ECF для T3-4 N+ опухолей'
    },
    survival: {
      fiveYear: '50-60% (с адъювантным лечением)',
      tenYear: '40-50%',
      medianOS: '36-48 месяцев (с лечением)',
      basedOn: 'AJCC Cancer Statistics, MAGIC Trial, FLOT Trial'
    },
    nextSteps: [
      'Обсуждение слоев резекции и количества лимфоузлов (минимум 15 узлов)',
      'Консультация онколога для планирования адъювантной химиотерапии',
      'Определение HER2, MSI, PD-L1 статуса для рассмотрения целевого лечения',
      'Мультидисциплинарный консилиум (MDT)',
      'Оценка функционального статуса пациента перед химиотерапией'
    ],
    clinicalConsiderations: 'pT3N2M0 требует агрессивного лечения. Периоперационная химиотерапия улучшает выживаемость на 10-15%. Качество D2 лимфаденэктомии критично для прогноза. Оптимальное количество удалённых лимфоузлов - 25-30.',
    followUpProtocol: 'Каждые 3 месяца первый год, каждые 6 месяцев второй-третий год. КТ органов при симптомах. Эндоскопия по показаниям. Опцион: аугментированная иммунотерапия (пембролизумаб) при PD-L1+ и dMMR/MSI-H'
  },

  // ============ BREAST CANCER ============
  'breast-cancer-luminal-a': {
    id: 'breast-cancer-luminal-a',
    name: 'Инвазивная карцинома молочной железы, люминальный A подтип',
    location: 'Молочная железа',
    whoClassification: 'Invasive Carcinoma, NOS (Luminal A subtype by IHC)',
    morphology: 'Инвазивная карцинома с трубчатыми и железистыми структурами',
    grading: 'G1 (Grade 1 - Well differentiated)',
    tnmStaging: {
      description: 'pT2N1M0 - Опухоль 2-5 см, поражение 1-3 региональных лимфоузлов',
      stage: 'IIA (по AJCC 8th ed.)',
      prognosis: 'Ранняя стадия с хорошим потенциалом для управления гормональной терапией'
    },
    immunohistochemistry: {
      markers: [
        { name: 'ER (Estrogen Receptor)', status: 'Положительно (90%)', significance: 'Чувствителен к эстрогену' },
        { name: 'PR (Progesterone Receptor)', status: 'Положительно (75%)', significance: 'Чувствителен к прогестерону' },
        { name: 'HER2', status: 'Отрицательно', significance: 'Не требуется трастузумаб' },
        { name: 'Ki-67', status: '15% (низкий)', significance: 'Медленный рост, хороший прогноз' },
        { name: 'p53', status: 'Положительно в <5%', significance: 'Сохранённая функция p53' },
        { name: 'GATA3', status: 'Положительно', significance: 'Люминальная дифференцировка' }
      ],
      panel: 'Молочной железе карцинома - стандартная люминальная панель'
    },
    molecularMarkers: {
      markers: [
        {
          name: 'Oncotype DX (21-gene assay)',
          status: 'Рекомендуется для ER+, HER2-, лимфоузел-отрицательных или 1-3 узлов',
          therapeuticImplication: 'RS <26 (низкий риск) → эндокринотерапия; RS 26-100 (промежуточный-высокий) → рассмотрение химиотерапии',
          protocol: 'NCCN, ASCO'
        },
        {
          name: 'Luminal A subtype (PAM50)',
          status: 'Определено как люминальный A',
          therapeuticImplication: 'Лучший прогноз среди всех подтипов рака молочной железы',
          protocol: 'TCGA, METABRIC'
        },
        {
          name: 'PIK3CA mutations',
          status: 'Частые при люминальном A (15-20%)',
          therapeuticImplication: 'Возможные кандидаты для ингибиторов PI3K (альпелисиб)',
          protocol: 'SOLAR-1 Trial'
        },
        {
          name: 'BRCA1/2 mutations',
          status: 'Генетическое тестирование рекомендуется',
          therapeuticImplication: 'BRCA+ → PARP ингибиторы (олапариб, талазопариб) в метастатическом заболевании',
          protocol: 'NCCN Guidelines'
        }
      ],
      methodology: 'IHC, Oncotype DX assay, PAM50 classification, Genomic testing (если показано)'
    },
    prognosticFactors: {
      favorable: [
        'G1 дифференцировка',
        'ER+ PR+ - гормональная чувствительность',
        'HER2 отрицательный',
        'Ki-67 <15%',
        'T2N1M0 стадия',
        'Люминальный A подтип (лучший прогноз)'
      ],
      unfavorable: [
        'Размер опухоли T2 (может требовать химиотерапию если высокий Oncotype DX)',
        'Поражение лимфоузлов N1',
        'Возможные микрометастазы (требуют уточнения)'
      ],
      score: 'AJCC Stage IIA - благоприятный прогноз при адекватной терапии'
    },
    treatmentProtocols: {
      nccn: {
        preferred: 'Операция (широкое иссечение или мастэктомия) + Лучевая терапия + Гормональная терапия (ТАМ или АИ на 5-10 лет)',
        alternatives: [
          'Если Oncotype DX <26 и N0: только гормональная терапия',
          'Если Oncotype DX >25 или N1: рассмотрение парипилоба (CDK4/6 ингибитор) + гормональная терапия'
        ],
        reference: 'NCCN Guidelines Breast Cancer 2024'
      },
      esmo: {
        preferred: 'Хирургия (BCS или мастэктомия) → Лучевая терапия → Эндокринная терапия (ТАМ 5 лет в пременопаузе, АИ в постменопаузе)',
        alternatives: [
          'Предоперационная эндокринная терапия для опухолей >2 см',
          'Комбинация с CDK4/6 ингибитором при высоком риске рецидива'
        ],
        reference: 'ESMO Breast Cancer Guidelines 2023'
      },
      adjuvant: 'Рекомендуется гормональная терапия: тамоксифен 5-10 лет (пременопауза) или ингибитор ароматазы (летрозол, анастразол, экземестан) 5 лет (постменопауза). Рассмотрение добавления CDK4/6 ингибитора (палбоциклиб, рибоциклиб, абемациклиб) если высокий риск.',
      neoadjuvant: 'Может рассматриваться эндокринная терапия перед операцией для уменьшения размера опухоли, особенно если большой размер и нужно сохранение молочной железы'
    },
    survival: {
      fiveYear: '85-90%',
      tenYear: '80-85%',
      medianOS: 'Не достигнут (люминальный A имеет самый лучший прогноз)',
      basedOn: 'AJCC Cancer Statistics, EBCTCG Meta-analysis, SAPHIR Trial'
    },
    nextSteps: [
      'Консультация онколога маммолога',
      'Определение статуса BRCA1/2 (генетическое консультирование)',
      'Проведение Oncotype DX если не сделано',
      'Оценка менопаузального статуса для выбора гормональной терапии',
      'Мультидисциплинарный консилиум (хирург, онколог, радиотерапевт, генетик)'
    ],
    clinicalConsiderations: 'Люминальный A подтип имеет наиболее благоприятный прогноз среди всех подтипов рака молочной железы. N1 статус требует уточнения количества и расположения вовлечённых узлов. Гормональная терапия на 5-10 лет - основа лечения. Прерывистая гормональная терапия показала равную эффективность с непрерывной.',
    followUpProtocol: 'Клиническое обследование каждые 3-6 месяцев первые 3 года, затем ежегодно. Маммография ежегодно. МРИ молочной железы по показаниям. Мониторинг побочных эффектов гормональной терапии (тромбоз, остеопороз, вагинальная сухость).'
  },

  // ============ COLORECTAL CANCER ============
  'colorectal-adenocarcinoma-stage2': {
    id: 'colorectal-adenocarcinoma-stage2',
    name: 'Аденокарцинома толстой кишки, Стадия II',
    location: 'Ободочная кишка / Прямая кишка',
    whoClassification: 'Adenocarcinoma, NOS (Tubular or Tubulovillous)',
    morphology: 'Умеренно-дифференцированная аденокарцинома с трубчатыми структурами',
    grading: 'G2 (Grade 2)',
    tnmStaging: {
      description: 'pT4aN0M0 - Прорастание через висцеральную брюшину, лимфоузлы не поражены',
      stage: 'II (по AJCC 8th ed.) - рискованный Stage II',
      prognosis: 'Локально-распространённый рак без метастазов, потенциально излечимый'
    },
    immunohistochemistry: {
      markers: [
        { name: 'CK20', status: 'Положительно', significance: 'Кишечная дифференцировка' },
        { name: 'CK7', status: 'Отрицательно', significance: 'Исключает первичный рак из дыхательных путей' },
        { name: 'CDX2', status: 'Положительно', significance: 'Кишечная дифференцировка' },
        { name: 'p53', status: 'Положительно (50-80%)', significance: 'TP53 мутация' },
        { name: 'Ki-67', status: '30-50%', significance: 'Высокая пролиферация' },
        { name: 'PD-L1', status: 'Требует определения', significance: 'Иммунотерапевтический потенциал' }
      ],
      panel: 'Колоректальная аденокарцинома стандартная панель'
    },
    molecularMarkers: {
      markers: [
        {
          name: 'Mismatch Repair (MMR)',
          status: 'MLH1, MSH2, MSH6, PMS2 - требует проверки',
          therapeuticImplication: 'dMMR/MSI-H → иммунотерапия показана; pMMR/MSS → химиотерапия',
          protocol: 'NCCN Guidelines 2024'
        },
        {
          name: 'KRAS mutations',
          status: 'Частые (40-50% всех CRC)',
          therapeuticImplication: 'KRAS WT → EGFR ингибиторы (цетуксимаб, панитумумаб); KRAS mutant → не чувствителен к EGFR',
          protocol: 'NCCN, ASCO'
        },
        {
          name: 'BRAF mutations',
          status: 'Редкие (5-10%)',
          therapeuticImplication: 'BRAF V600E → вилтоквипан + мецамтретин (комбинация MEK + BRAF ингибиторов)',
          protocol: 'BEACON CRC Trial'
        },
        {
          name: 'Microsatellite Instability (MSI)',
          status: 'MSI-H (10-15% спорадических CRC) или MSS',
          therapeuticImplication: 'MSI-H → пембролизумаб или иприлимумаб (иммунотерапия) в адъювантном/метастатическом заболевании',
          protocol: 'CheckMate 142'
        }
      ],
      methodology: 'IHC (MMR, PD-L1), PCR (MSI), Sequencing (KRAS, BRAF)'
    },
    prognosticFactors: {
      favorable: [
        'N0 статус (нет поражения лимфоузлов)',
        'G2 дифференцировка (лучше чем G3)',
        'MSI-H статус (лучший прогноз)',
        'Полная резекция (R0)',
        'Меньше вовлечённых органов'
      ],
      unfavorable: [
        'T4 инвазия',
        'Лимфоваскулярная инвазия',
        'Перинервальная инвазия',
        'Высокий Ki-67 (>30%)',
        'pMMR/MSS статус',
        'Низкая дифференцировка'
      ],
      score: 'AJCC Stage II - промежуточный риск рецидива (20-30% без адъювантной терапии)'
    },
    treatmentProtocols: {
      nccn: {
        preferred: 'Хирургическая резекция (D2/D3) → Рассмотрение адъювантной химиотерапии (FOLFOX или CAPOX) для высокого риска',
        alternatives: [
          'Если высокий риск (T4, LVI, PNI): FOLFOX x 6-8 месяцев',
          'Если MSI-H: пембролизумаб (моноимунотерапия)'
        ],
        reference: 'NCCN Guidelines Colon Cancer 2024'
      },
      esmo: {
        preferred: 'Хирургия → Адъювантная химиотерапия FOLFOX (5-FU, Leucovorin, Oxaliplatin) x 6 месяцев при высоком риске',
        alternatives: [
          'CAPOX (капецитабин + оксалиплатин) - альтернатива FOLFOX',
          'Иммунотерапия если MSI-H'
        ],
        reference: 'ESMO Colorectal Cancer Guidelines 2023'
      },
      adjuvant: 'Рекомендуется FOLFOX x 6 месяцев для Stage II с высоким риском (T4, LVI, PNI, недостаточное количество лимфоузлов <12). Альтернатива: CAPOX. Если MSI-H: пембролизумаб 200 мг IV каждые 3 недели x 1 год.',
      neoadjuvant: 'Неоадъювантная химиорадиотерапия показана для рака прямой кишки (локально-продвинутые), но не для ободочной кишки'
    },
    survival: {
      fiveYear: '70-75% (без адъювантной терапии); 80-85% (с адъювантной)',
      tenYear: '60-65%',
      medianOS: '10-12 лет',
      basedOn: 'AJCC Cancer Statistics, QUASAR Trial, MOSAIC Trial'
    },
    nextSteps: [
      'Обсуждение с онкологом о необходимости адъювантной химиотерапии',
      'Определение MSI/dMMR статуса для рассмотрения иммунотерапии',
      'KRAS тестирование (если планируется назначение EGFR ингибиторов в будущем)',
      'Проверка адекватности лимфаденэктомии (минимум 12 лимфоузлов)',
      'Консультация проктолога (если рак прямой кишки) для оценки функциональных исходов'
    ],
    clinicalConsiderations: 'pT4aN0M0 - это high-grade Stage II с повышенным риском рецидива. Наличие висцеральной брюшины перфорации требует рассмотрения адъювантной химиотерапии. MSI-H статус кардинально меняет подход - иммунотерапия вместо химиотерапии. Оптимальное количество анализируемых лимфоузлов 25-30.',
    followUpProtocol: 'КТ органов брюшной полости и малого таза каждые 6 месяцев первые 2 года, затем ежегодно 5 лет. Колоноскопия через 1 год после операции, затем каждые 3 года. CEA каждые 3 месяца первый год (может помочь в раннем выявлении рецидива).'
  },

  // ============ MELANOMA ============
  'melanoma-intermediate-risk': {
    id: 'melanoma-intermediate-risk',
    name: 'Меланома кожи, промежуточный риск',
    location: 'Кожа',
    whoClassification: 'Cutaneous Melanoma, Superficial Spreading Type',
    morphology: 'Меланома с инвазией в дерму, атипичные меланоциты с высокой активностью',
    grading: 'Breslow depth 3.2 mm, Clark level IV-V',
    tnmStaging: {
      description: 'pT4aN0M0 (по AJCC 8th ed.) - Толщина >4 мм (T4a), без язвления или с язвлением, региональные лимфоузлы не поражены',
      stage: 'III (по AJCC классификации для кожной меланомы) - локально-распространённая меланома',
      prognosis: 'Промежуточный-высокий риск метастазирования в лимфоузлы, требует интенсивного мониторинга'
    },
    immunohistochemistry: {
      markers: [
        { name: 'S100', status: 'Положительно', significance: 'Неспецифичный маркер меланомы, высокая чувствительность' },
        { name: 'HMB-45', status: 'Положительно', significance: 'Специфичный маркер меланомы' },
        { name: 'Melan-A/MART-1', status: 'Положительно', significance: 'Маркер меланомы' },
        { name: 'SOX10', status: 'Положительно', significance: 'Нейрального гребня маркер, включая меланому' },
        { name: 'Ki-67', status: '30% (высокий)', significance: 'Высокая пролиферация, неблагоприятный фактор' },
        { name: 'p16', status: 'Отрицательно', significance: 'При CDKN2A инактивации - неблагоприятный прогноз' }
      ],
      panel: 'Меланома стандартная ИГХ панель'
    },
    molecularMarkers: {
      markers: [
        {
          name: 'BRAF V600E/V600K mutations',
          status: 'Частые (40-50% BRAF mutant меланом)',
          therapeuticImplication: 'BRAF V600E+ → Вилтоквипан + мецамтретин (BRAF/MEK ингибиторы) или дабрафениб + тремелимумаб',
          protocol: 'COMBI-v Trial, CombiME Trial'
        },
        {
          name: 'NRAS mutations',
          status: 'Альтернативный путь активации (15-25%)',
          therapeuticImplication: 'NRAS mutant → MEK ингибиторы (селуметиниб) или иммунотерапия',
          protocol: 'NEMO Trial'
        },
        {
          name: 'NF1 mutations',
          status: 'Встречаются (10-15%)',
          therapeuticImplication: 'NF1 wild-type с потерей функции → чувствительность к MEK ингибиторам',
          protocol: 'NRAS/NF1 mutant pathway'
        },
        {
          name: 'PD-L1 expression',
          status: 'Требует определения',
          therapeuticImplication: 'PD-L1+ → лучший ответ на анти-PD-1 иммунотерапию (пембролизумаб, ниволумаб)',
          protocol: 'CheckMate 067, KEYNOTE-001'
        }
      ],
      methodology: 'BRAF/NRAS/NF1 скрининг (обычно PCR/Sanger или NGS), PD-L1 IHC, генномные анализы'
    },
    prognosticFactors: {
      favorable: [
        'N0 статус (нет метастазов в лимфоузлы)',
        'Отсутствие язвления (улучшает прогноз на 10-15%)',
        'Низкий Ki-67 (<10%)',
        'Отсутствие митотических фигур',
        'Толщина <4 мм'
      ],
      unfavorable: [
        'Толщина 3.2 мм (T4)',
        'Язвление присутствует',
        'Высокий митотический индекс (>6/мм²)',
        'Ki-67 30% (очень высокий)',
        'Лимфоваскулярная инвазия',
        'Вертикальный рост фаза',
        'BRAF V600 mutant (может быть неблагоприятным в некоторых контекстах)',
        'p16 потеря экспрессии'
      ],
      score: 'AJCC Stage III (pT4aN0M0) - промежуточный-высокий риск, 40-50% вероятность рецидива за 5 лет'
    },
    treatmentProtocols: {
      nccn: {
        preferred: 'Широкое иссечение (2 см маржа при толщине >2 мм) → Сентинель лимфаденэктомия (рекомендуется) → Адъювантная иммунотерапия',
        alternatives: [
          'Если BRAF V600E+: вилтоквипан + мецамтретин (BRAF/MEK ингибиторы)',
          'Если NRAS mutant: селуметиниб (MEK ингибитор)',
          'Иммунотерапия: пембролизумаб x 1 год'
        ],
        reference: 'NCCN Guidelines Melanoma 2024'
      },
      esmo: {
        preferred: 'Хирургия → Сентинель биопсия лимфоузла → Адъювантная иммунотерапия пембролизумаб 200 мг IV каждые 3 недели x 1 год',
        alternatives: [
          'Высокодозная интерферон-альфа (в странах, где одобрен)',
          'Таргетная терапия при BRAF/NRAS mutations'
        ],
        reference: 'ESMO Melanoma Guidelines 2023'
      },
      adjuvant: 'Адъювантная иммунотерапия рекомендуется: пембролизумаб 200 мг IV Q3W x 12 месяцев или ниволумаб 480 мг IV Q4W x 12 месяцев. Альтернатива: вилтоквипан + мецамтретин (если BRAF V600E+). Интерферон-альфа x 1 год (старая опция, менее используется).',
      neoadjuvant: 'Нет стандартной неоадъювантной терапии для первичной меланомы, но может быть показана для локально-продвинутых или рецидивирующих опухолей'
    },
    survival: {
      fiveYear: '60-70% (с адъювантной иммунотерапией)',
      tenYear: '50-60%',
      medianOS: '8-10 лет',
      basedOn: 'AJCC Cancer Statistics, KEYNOTE-054 Trial, CheckMate 238'
    },
    nextSteps: [
      'Консультация онколога-дерматолога',
      'Проведение сентинель лимфаденэктомии (для уточнения стадии и прогноза)',
      'BRAF/NRAS/NF1 генотипирование для выбора таргетной терапии',
      'ПЭТ-КТ для исключения отдалённых метастазов',
      'Обсуждение адъювантной иммунотерапии vs таргетной терапии'
    ],
    clinicalConsiderations: 'pT4aN0 меланома требует сентинель биопсии лимфоузла - в 20-30% случаев обнаруживаются окультные метастазы, что меняет стадию на IIIB и стратегию лечения. Язвление (если присутствует) в толщине >4 мм значительно ухудшает прогноз. Адъювантная иммунотерапия улучшает RFS и OS на 30-40%. Молекулярные маркеры определяют выбор между иммуно- и таргетной терапией.',
    followUpProtocol: 'Клинический осмотр каждые 3 месяца первые 2 года, затем каждые 6 месяцев до 5 лет. КТ грудной клетки/живота/таза каждые 3-6 месяцев первые 2 года (по показаниям). ПЭТ-КТ при подозрении на рецидив. Обучение пациента самомониторингу кожи (фотография).'
  },

  // ============ LYMPHOMA - Hodgkin ============
  'hodgkin-lymphoma-ns': {
    id: 'hodgkin-lymphoma-ns',
    name: 'Лимфома Ходжкина, подтип - узелковый склероз',
    location: 'Лимфоидная ткань (лимфоузлы, средостение)',
    whoClassification: 'Classical Hodgkin Lymphoma, Nodular Sclerosis Subtype',
    morphology: 'Узелковые склеротические изменения, наличие клеток Рида-Штернберга и их вариантов среди воспалительного фона',
    grading: 'Не применима система грейдинга (как для других лимфом)',
    tnmStaging: {
      description: 'Стадия IIIA (по Котцвальда-Хоффа) - Поражение лимфоузлов ниже и выше диафрагмы, без органных поражений',
      stage: 'III (Early Favorable, Intermediate, или Advanced - требуется полная стадизация)',
      prognosis: 'Зависит от наличия других факторов риска (объём опухоли, ESR, возраст), но узелковый склероз имеет лучший прогноз чем другие подтипы'
    },
    immunohistochemistry: {
      markers: [
        { name: 'CD30', status: 'Положительно (строго)', significance: 'Маркер Рида-Штернберга клеток, характерен для ходжкинской лимфомы' },
        { name: 'CD15', status: 'Положительно', significance: 'Маркер Рида-Штернберга клеток' },
        { name: 'CD45', status: 'Отрицательно', significance: 'Лейкоцитарный антиген, отрицателен в ходжкинской лимфоме' },
        { name: 'CD20', status: 'Отрицательно или слабо', significance: 'B-клеточный маркер, обычно отрицателен' },
        { name: 'CD3', status: 'Отрицательно в опухолевых клетках', significance: 'T-клеточный маркер, реактивные T-клетки в фоне' },
        { name: 'EBV (EBER)', status: 'EBER In situ гибридизация', significance: 'ЭБВ+ может быть неблагоприятным фактором' },
        { name: 'PAX5', status: 'Слабо положительно', significance: 'Слабая B-клеточная дифференцировка' }
      ],
      panel: 'Лимфома Ходжкина классическая диагностическая панель'
    },
    molecularMarkers: {
      markers: [
        {
          name: 'EBV positivity (EBER ISH)',
          status: 'Определение рекомендуется',
          therapeuticImplication: 'EBV+ может быть ассоциирован с худшим прогнозом в некоторых популяциях',
          protocol: 'WHO 2016 Classification'
        },
        {
          name: 'Tumor microenvironment',
          status: 'Оценка воспалительного фона',
          therapeuticImplication: 'CD4+ T-клеточный фон может иметь прогностическое значение',
          protocol: 'Immunophenotyping'
        }
      ],
      methodology: 'Flow cytometry, IHC, EBER ISH'
    },
    prognosticFactors: {
      favorable: [
        'Узелковый склероз подтип (лучший чем другие)',
        'Молодой возраст (<30 лет)',
        'Ранняя стадия (I-II)',
        'Отсутствие B симптомов',
        'ESR <50',
        'Объём опухоли <10 см'
      ],
      unfavorable: [
        'Возраст >60 лет',
        'Продвинутая стадия (III-IV)',
        'Наличие B симптомов',
        'Высокий ESR',
        'Объём опухоли >10 см (bulky disease)',
        'EBV+ статус'
      ],
      score: 'International Prognostic Score (IPS) для Advanced HL - зависит от факторов риска'
    },
    treatmentProtocols: {
      nccn: {
        preferred: 'ABVD (Adriamycin, Bleomycin, Vinblastine, Dacarbazine) x 6 циклов → Оценка ответа ПЭТ-КТ → Возможная лучевая терапия при остаточном поражении',
        alternatives: [
          'Escalated BEACOPP для продвинутых (возраст <60)',
          'Stanford V (дозированная полихимиотерапия)',
          'BrECADD (Бренетумумаб ведотин + химиотерапия) для рецидива'
        ],
        reference: 'NCCN Guidelines Hodgkin Lymphoma 2024'
      },
      esmo: {
        preferred: 'ABVD x 6-8 циклов ± лучевая терапия медиастинального остатка',
        alternatives: [
          'PET-адаптированная химиотерапия (интенсификация при плохом ответе)',
          'Для молодых пациентов (возраст <60): Escalated BEACOPP или Stanford V',
          'Лучевая терапия для остаточных масс >2-3 см'
        ],
        reference: 'ESMO Hodgkin Lymphoma Guidelines 2023'
      },
      adjuvant: 'Лучевая терапия на область поражения (Involved-Field RT, 20-30 Gy) рекомендуется при остаточной болезни >1.5 см по ПЭТ-КТ',
      neoadjuvant: 'Интенсивность лечения зависит от прогностических факторов - стадия III может требовать более интенсивного лечения чем ранняя стадия'
    },
    survival: {
      fiveYear: '85-90% (для ранней стадии); 70-80% (для продвинутой)',
      tenYear: '80-85% (для ранней стадии); 60-70% (для продвинутой)',
      medianOS: 'Не достигнут',
      basedOn: 'AJCC Cancer Statistics, GHSG HD21 Trial, ECHELON-1 Trial'
    },
    nextSteps: [
      'Консультация гематолога-онколога',
      'Полная стадизация: ПЭТ-КТ (базовая), биохимия крови, LDH, ESR',
      'Оценка прогностических факторов (IPS score для продвинутого заболевания)',
      'Обсуждение схемы химиотерапии (ABVD vs более интенсивные)',
      'Консультация радиоонколога (возможность лучевой терапии)',
      'Обсуждение сохранения фертильности (особенно у молодых пациентов)'
    ],
    clinicalConsiderations: 'Лимфома Ходжкина (nodular sclerosis) имеет наиболее благоприятный прогноз среди всех подтипов - 5-летняя выживаемость >85%. Стадия IIIA требует полной оценки других факторов риска для определения интенсивности лечения. Стандартной является ABVD, но молодые пациенты с продвинутым заболеванием могут получить пользу от более интенсивного лечения (Escalated BEACOPP). ПЭТ-КТ адаптированное лечение показало улучшение результатов.',
    followUpProtocol: 'Клиническое обследование каждый месяц во время лечения. ПЭТ-КТ после 2 циклов (interim PET) для оценки ответа - плохой ответ требует интенсификации. ПЭТ-КТ в конце лечения. Последующее наблюдение: каждые 3 месяца первый год, каждые 6 месяцев второй год, затем ежегодно 5 лет. Мониторинг поздних побочных эффектов (кардиотоксичность, вторичные опухоли, легочный фиброз).'
  },

  // ============ OVARIAN CANCER ============
  'ovarian-cancer-hgsoc': {
    id: 'ovarian-cancer-hgsoc',
    name: 'Рак яичников, высокодифференцированная серозная аденокарцинома',
    location: 'Яичник',
    whoClassification: 'High-Grade Serous Carcinoma (HGSC)',
    morphology: 'Серозная аденокарцинома с высокой степенью атипии и архитектурной сложностью',
    grading: 'Grade 3 (High-Grade)',
    tnmStaging: {
      description: 'pT3cN1M0 - Микроскопическое поражение брюшины и парааортальных лимфоузлов',
      stage: 'IIIC1 (по AJCC 8th ed.) - распространённый рак яичников',
      prognosis: 'Продвинутая стадия, требует агрессивного лечения, но отзывчива на платину-содержащую химиотерапию'
    },
    immunohistochemistry: {
      markers: [
        { name: 'WT1', status: 'Положительно', significance: 'Маркер серозной дифференцировки' },
        { name: 'p53', status: 'Положительно (>50%)', significance: 'Практически 100% HGSC имеют TP53 мутацию' },
        { name: 'PAX8', status: 'Положительно', significance: 'Маркер müllerian-derived tumors' },
        { name: 'CK7', status: 'Положительно', significance: 'Эпителиальный маркер' },
        { name: 'CK20', status: 'Отрицательно', significance: 'Исключает кишечное происхождение' },
        { name: 'Ki-67', status: '40-50% (высокий)', significance: 'Высокая пролиферация, характерна для HGSC' },
        { name: 'PTEN', status: 'Потеря экспрессии (может быть)', significance: 'При наличии - ассоциировано с худшим прогнозом' }
      ],
      panel: 'Яичник серозная аденокарцинома панель'
    },
    molecularMarkers: {
      markers: [
        {
          name: 'TP53 mutations',
          status: 'Присутствуют в 95% HGSC',
          therapeuticImplication: 'Базовая молекулярная подпись HGSC, влияет на выбор лечения (e.g., PARP ингибиторы)',
          protocol: 'TCGA, EMBL-EBI'
        },
        {
          name: 'BRCA1/2 mutations',
          status: 'Герминальные: 5-10%; соматические: 3-5%',
          therapeuticImplication: 'BRCA+ → PARP ингибиторы (олапариб, рукапариб, нирапариб) в поддерживающей терапии',
          protocol: 'PARP Inhibitor Trials (SOLO-1, NOVA, Athena)'
        },
        {
          name: 'HRD (Homologous Recombination Deficiency) score',
          status: 'Требуется определение (если возможно)',
          therapeuticImplication: 'HRD+ или BRCA+ → PARP ингибиторы значительно улучшают PFS',
          protocol: 'MyChoice CDx / Genomic Health'
        },
        {
          name: 'PD-L1 expression',
          status: 'Рекомендуется определение',
          therapeuticImplication: 'PD-L1+ → может потребоваться иммунотерапия (атезолизумаб) + химиотерапия',
          protocol: 'PAOLA-1 Trial'
        }
      ],
      methodology: 'IHC (TP53, WT1, PD-L1), Sequencing (BRCA, TP53, LS genes), HRD score'
    },
    prognosticFactors: {
      favorable: [
        'BRCA+ статус (лучший ответ на платину, PARP ингибиторы)',
        'Полная резекция всех видимых поражений',
        'Ранняя оптимальная цитередукция',
        'Низкий уровень CA-125 после первого цикла',
        'Возраст <65 лет'
      ],
      unfavorable: [
        'BRCA отрицательный / дикий тип',
        'Субоптимальная цитередукция',
        'Высокий остаточный опухолевый объём',
        'Платина-резистентное заболевание',
        'Высокий CA-125 перед началом лечения'
      ],
      score: 'AJCC Stage IIIC1 - продвинутый рак с промежуточным прогнозом'
    },
    treatmentProtocols: {
      nccn: {
        preferred: 'Хирургическая цитередукция (оптимально <5 мм остаточного) → Платинум-содержащая химиотерапия (паклитаксел + карбоплатин) → PARP ингибиторы в поддерживающей терапии (если BRCA+ или HRD+)',
        alternatives: [
          'Неоадъювантная химиотерапия для пациентов неоперабельные на момент диагноза',
          'Комбинированная иммунотерапия (бевацизумаб + пембролизумаб) + химиотерапия'
        ],
        reference: 'NCCN Guidelines Ovarian Cancer 2024'
      },
      esmo: {
        preferred: 'Хирургия для диагноза и оценки спейда → Платина-содержащая химиотерапия → Поддерживающая терапия (PARP ингибиторы или бевацизумаб)',
        alternatives: [
          'Неоадъювантная химиотерапия',
          'Комбинированная иммунотерапия при MSI-H/dMMR'
        ],
        reference: 'ESMO Ovarian Cancer Guidelines 2023'
      },
      adjuvant: 'Поддерживающая терапия: PARP ингибиторы (олапариб, нирапариб, рукапариб) если BRCA+ или HRD+. Бевацизумаб в течение 15 месяцев при всех пациентах.',
      neoadjuvant: 'Неоадъювантная платинум-содержащая химиотерапия (3 цикла) для неоперабельных пациентов, затем интервальная цитередукция'
    },
    survival: {
      fiveYear: '35-40% (при полной резекции + адъювантная терапия)',
      tenYear: '20-25%',
      medianOS: '36-50 месяцев (с полной резекцией и лечением)',
      basedOn: 'AJCC Cancer Statistics, ICON7 Trial, SOLO-1 Trial'
    },
    nextSteps: [
      'Обсуждение с гинекологом-онкологом о циторедуктивной операции',
      'BRCA1/2 тестирование (герминальное и соматическое)',
      'HRD score определение для выбора PARP ингибиторов',
      'ПЭТ-КТ и МРИ малого таза для полной стадизации',
      'Консультация медицинского онколога для планирования химиотерапии',
      'Оценка функционального статуса (ECOG) перед лечением'
    ],
    clinicalConsiderations: 'HGSC - наиболее распространённый подтип рака яичников (70% случаев). Полная оптимальная цитередукция (остаток <5 мм) критична для прогноза. BRCA мутация и HRD статус определяют использование PARP ингибиторов, которые значительно улучшают выживаемость без болезни. Возможна платина-резистентность при рецидиве.',
    followUpProtocol: 'Клинический осмотр каждый месяц во время лечения. Измерение CA-125 и ингибиторов опухолевых маркеров каждый месяц. КТ органов брюшной полости и малого таза каждые 3 месяца первый год. ПЭТ-КТ при подозрении на рецидив. Долгосрочное наблюдение за нейротоксичностью и другими побочными эффектами платинум-содержащих препаратов.'
  }
}
