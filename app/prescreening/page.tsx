"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface Question {
  key: string;
  label: string;
  q: string;
  options: { text: string; value: string }[];
}

interface ExpertOption {
  key: string;
  icon: string;
  title: string;
  who: string;
  text: string;
  format: string;
}

const expertOptions: ExpertOption[] = [
  {
    key: "second-opinion",
    icon: "🧩",
    title: "Второе мнение по сложному случаю",
    who: "Пациенты и коллеги-хирурги",
    text: "Независимая оценка диагноза, тактики лечения и объёма операции на основании вашей медицинской документации — выписок, протоколов, снимков КТ/МРТ. Письменное профессорское заключение.",
    format: "Очно — 2000 ₴ · онлайн и заочно — стоимость обсуждается индивидуально",
  },
  {
    key: "science",
    icon: "📚",
    title: "Научное рецензирование и редактирование",
    who: "Исследователи, аспиранты, кафедры",
    text: "Рецензирование статей перед подачей в журнал, научное редактирование диссертаций и монографий, помощь с систематическими обзорами, докладами и презентациями для конгрессов.",
    format: "Стоимость и сроки — по email, зависят от объёма работы",
  },
  {
    key: "tourism",
    icon: "✈️",
    title: "Медицинский туризм за рубежом",
    who: "Пациенты и семьи",
    text: "Подбор ведущих специалистов и клиник (Германия, Израиль, Австрия, Польша, Турция и другие страны), перевод и подготовка медицинской документации, сопровождение переписки с иностранной клиникой.",
    format: "Индивидуальный расчёт после анализа ситуации",
  },
  {
    key: "academic",
    icon: "🎓",
    title: "Академическое сотрудничество",
    who: "Кафедры, университеты, ассоциации",
    text: "Совместная научная работа, авторские лекционные курсы, программы последипломного образования, курсы медицинского усовершенствования на 18–108 академических часов — очно и онлайн.",
    format: "Условия сотрудничества согласовываются индивидуально",
  },
  {
    key: "ai",
    icon: "🤖",
    title: "AI и цифровая медицина",
    who: "Клиницисты и разработчики",
    text: "Консультации по внедрению AI-инструментов в клиническую практику: диагностика по КТ/МРТ, предиктивные модели рисков, автоматизация документации. Разработка ПО под задачи конкретной клиники или кафедры.",
    format: "Обсуждение и оценка объёма работ — индивидуально",
  },
];

const questions: Question[] = [
  {
    key: "concern",
    label: "Шаг 1 из 3",
    q: "Что вас беспокоит?",
    options: [
      { text: "Боль в животе / подозрение на хирургическую патологию", value: "surgical" },
      { text: "Онкологический вопрос (образование, подозрительные анализы, наблюдение)", value: "oncology" },
      { text: "Миома матки / гинекологическая проблема", value: "gyneco" },
      { text: "Не уверен(а), нужна консультация для уточнения", value: "unsure" },
    ],
  },
  {
    key: "duration",
    label: "Шаг 2 из 3",
    q: "Как давно это беспокоит или было обнаружено?",
    options: [
      { text: "Менее недели, симптомы нарастают", value: "acute" },
      { text: "От недели до месяца", value: "recent" },
      { text: "Больше месяца, стабильно", value: "chronic" },
      { text: "Случайная находка на УЗИ/КТ, симптомов нет", value: "incidental" },
    ],
  },
  {
    key: "docs",
    label: "Шаг 3 из 3",
    q: "У вас есть результаты обследований (УЗИ, КТ, анализы) на руках?",
    options: [
      { text: "Да, есть свежие (менее 3 месяцев)", value: "fresh" },
      { text: "Есть, но старые", value: "old" },
      { text: "Нет, ничего не делал(а)", value: "none" },
    ],
  },
];

type Branch = "patient" | "expert" | null;
type Urgency = "urgent" | "soon" | "routine";

async function logClick(event: string, detail: string) {
  try {
    await fetch("/api/log-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, detail, ts: Date.now() }),
    });
  } catch {
    // тихое падение — не ломаем UX
  }
}

function ECGDivider() {
  return (
    <svg className="w-full h-5 my-5 opacity-55" viewBox="0 0 400 20" preserveAspectRatio="none">
      <path
        d="M0,10 L140,10 L155,10 L165,2 L175,18 L185,4 L195,10 L400,10"
        fill="none"
        stroke="#123832"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PrescreeningPage() {
  const [branch, setBranch] = useState<Branch>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [expertChoice, setExpertChoice] = useState<string | null>(null);

  const handleBranchSelect = useCallback(
    (b: Branch) => {
      setBranch(b);
      if (b === "patient") setStep(0);
      logClick("branch_selected", b || "unknown");
    },
    []
  );

  const handleExpertSelect = useCallback((key: string) => {
    setExpertChoice(key);
    logClick("expert_selected", key);
  }, []);

  const handleAnswer = useCallback(
    (key: string, value: string) => {
      setAnswers((prev) => ({ ...prev, [key]: value }));
      setStep((s) => s + 1);
      logClick("question_answered", `${key}:${value}`);
    },
    []
  );

  const handleBack = useCallback(() => {
    if (step > 0) {
      setStep((s) => s - 1);
    } else {
      setBranch(null);
      setAnswers({});
    }
  }, [step]);

  const handleRestart = useCallback(() => {
    setBranch(null);
    setStep(0);
    setAnswers({});
    setExpertChoice(null);
  }, []);

  const assessUrgency = useCallback((): Urgency => {
    const { concern, duration } = answers;
    if (duration === "acute" && concern === "surgical") return "urgent";
    if (concern === "oncology" && (duration === "acute" || duration === "incidental")) return "urgent";
    if (duration === "recent") return "soon";
    return "routine";
  }, [answers]);

  const urgencyMap: Record<Urgency, { badge: string; cls: string; text: string }> = {
    urgent: {
      badge: "Рекомендуем не откладывать",
      cls: "bg-red-50 text-red-700",
      text: "По вашим ответам ситуация может требовать оперативной оценки. Рекомендуем записаться на очную или онлайн-консультацию в ближайшие 1–3 дня.",
    },
    soon: {
      badge: "Плановая консультация в ближайшие дни",
      cls: "bg-amber-50 text-amber-700",
      text: "Ситуация не выглядит экстренной, но откладывать надолго не стоит. Оптимально записаться в течение недели.",
    },
    routine: {
      badge: "Плановая консультация",
      cls: "bg-emerald-50 text-emerald-700",
      text: "По вашим ответам это плановый случай. Консультация поможет уточнить диагноз и определить дальнейшую тактику без спешки.",
    },
  };

  const concernLabel: Record<string, string> = {
    surgical: "хирургической патологии",
    oncology: "онкологическому вопросу",
    gyneco: "миоме матки",
    unsure: "вашему случаю",
  };

  const renderEntry = () => (
    <>
      <h2 className="font-serif text-xl font-semibold text-emerald-900 mb-5">Кто вы?</h2>
      <div className="flex flex-col gap-2.5">
        <button
          onClick={() => handleBranchSelect("patient")}
          className="text-left px-4 py-3.5 border border-stone-200 bg-white rounded-xl text-sm text-emerald-950 transition hover:border-emerald-700 hover:bg-emerald-50/50 active:scale-[0.99]"
        >
          <strong className="text-base block mb-0.5">Я пациент</strong>
          <span className="text-stone-500 text-[13px]">Есть жалобы или планирую лечение/операцию</span>
        </button>
        <button
          onClick={() => handleBranchSelect("expert")}
          className="text-left px-4 py-3.5 border border-stone-200 bg-white rounded-xl text-sm text-emerald-950 transition hover:border-emerald-700 hover:bg-emerald-50/50 active:scale-[0.99]"
        >
          <strong className="text-base block mb-0.5">Я врач / исследователь / учреждение</strong>
          <span className="text-stone-500 text-[13px]">Второе мнение, рецензирование, медтуризм, сотрудничество, AI</span>
        </button>
      </div>
      <ECGDivider />
    </>
  );

  const renderExpertMenu = () => (
    <>
      <button
        onClick={() => setBranch(null)}
        className="mb-3.5 text-stone-500 text-[13px] hover:text-emerald-800 transition"
      >
        ← Назад
      </button>
      <h2 className="font-serif text-xl font-semibold text-emerald-900 mb-5">Экспертные услуги профессора Сушкова</h2>
      <div className="flex flex-col gap-2.5">
        {expertOptions.map((o) => (
          <button
            key={o.key}
            onClick={() => handleExpertSelect(o.key)}
            className="text-left px-4 py-3.5 border border-stone-200 bg-white rounded-xl text-sm text-emerald-950 transition hover:border-emerald-700 hover:bg-emerald-50/50 active:scale-[0.99]"
          >
            <span className="text-lg mr-1">{o.icon}</span>
            <strong className="text-base">{o.title}</strong>
            <br />
            <span className="text-stone-500 text-[13px]">{o.who}</span>
          </button>
        ))}
      </div>
      <ECGDivider />
    </>
  );

  const renderExpertResult = () => {
    const o = expertOptions.find((x) => x.key === expertChoice);
    if (!o) return null;
    return (
      <>
        <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-50 text-emerald-700 mb-4">
          {o.who}
        </span>
        <h2 className="font-serif text-[21px] text-emerald-900 mb-2.5 leading-snug">
          {o.icon} {o.title}
        </h2>
        <p className="text-[15px] text-stone-600 leading-relaxed mb-5">{o.text}</p>
        <ECGDivider />
        <div className="px-4 py-4 bg-stone-50 rounded-xl mb-5">
          <span className="text-[13px] text-stone-500">{o.format}</span>
        </div>
        <a
          href={`mailto:ssvproff@gmail.com?subject=${encodeURIComponent(o.title)}`}
          className="block text-center px-4 py-4 bg-emerald-900 text-white rounded-xl font-semibold mb-2.5 transition hover:bg-emerald-800"
          onClick={() => logClick("cta_email", o.key)}
        >
          Написать на email
        </a>
        <a
          href="https://t.me/SSVPROFF_MEDICAL"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center px-4 py-4 bg-white text-emerald-900 border border-emerald-900 rounded-xl font-semibold mb-2.5 transition hover:bg-emerald-50"
          onClick={() => logClick("cta_telegram", o.key)}
        >
          Telegram-бот
        </a>
        <a
          href="https://ssvnauka.com/expert/"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center px-4 py-4 bg-white text-emerald-900 border border-emerald-900 rounded-xl font-semibold mb-2.5 transition hover:bg-emerald-50"
          onClick={() => logClick("cta_website", o.key)}
        >
          Подробнее на сайте
        </a>
        <p className="text-xs text-stone-500 text-center mt-4 leading-relaxed">
          Ответ в течение 24 часов. Формат работы (очно / онлайн / заочно) согласуется индивидуально.
        </p>
        <button
          onClick={() => setExpertChoice(null)}
          className="block text-center mt-3.5 text-[13px] text-stone-500 underline bg-transparent border-none cursor-pointer"
        >
          ← Другие направления
        </button>
      </>
    );
  };

  const renderPatientStep = () => {
    const q = questions[step];
    return (
      <>
        <div className="flex gap-1.5 mb-1">
          {questions.map((_, i) => (
            <span
              key={i}
              className={`h-[3px] flex-1 rounded-sm transition-colors ${
                i <= step ? "bg-emerald-900" : "bg-stone-200"
              }`}
            />
          ))}
        </div>
        <div className="text-xs text-stone-500 mb-5">{q.label}</div>
        <h2 className="font-serif text-[19px] font-semibold text-emerald-900 mb-5 leading-snug">{q.q}</h2>
        <div className="flex flex-col gap-2.5">
          {q.options.map((o) => (
            <button
              key={o.value}
              onClick={() => handleAnswer(q.key, o.value)}
              className="text-left px-4 py-3.5 border border-stone-200 bg-white rounded-xl text-[15px] text-emerald-950 transition hover:border-emerald-700 hover:bg-emerald-50/50 active:scale-[0.99]"
            >
              {o.text}
            </button>
          ))}
        </div>
        <ECGDivider />
        <button
          onClick={handleBack}
          className="mt-5 text-stone-500 text-[13px] hover:text-emerald-800 transition bg-transparent border-none cursor-pointer"
        >
          ← Назад
        </button>
      </>
    );
  };

  const renderPatientResult = () => {
    const urgency = assessUrgency();
    const { concern, docs } = answers;
    const r = urgencyMap[urgency];

    const docsNote =
      docs === "none"
        ? " Возьмите с собой (или на онлайн-консультацию) любые имеющиеся медицинские документы — при их отсутствии врач определит, какие обследования нужны."
        : " Возьмите результаты обследований с собой — это ускорит консультацию.";

    return (
      <>
        <span className={`inline-block px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-4 ${r.cls}`}>
          {r.badge}
        </span>
        <h2 className="font-serif text-[21px] text-emerald-900 mb-2.5 leading-snug">
          Рекомендация по {concernLabel[concern] || "вашему случаю"}
        </h2>
        <p className="text-[15px] text-stone-600 leading-relaxed mb-5">
          {r.text}
          {docsNote}
        </p>
        <ECGDivider />
        <div className="flex items-baseline gap-2 px-4 py-4 bg-stone-50 rounded-xl mb-5">
          <span className="font-serif text-[26px] font-bold text-emerald-900">2000 ₴</span>
          <span className="text-[13px] text-stone-500">стоимость консультации (~$50), 40+ лет опыта, доктор мед. наук</span>
        </div>
        <a
          href="https://t.me/SSVPROFF_MEDICAL"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center px-4 py-4 bg-emerald-900 text-white rounded-xl font-semibold mb-2.5 transition hover:bg-emerald-800"
          onClick={() => logClick("cta_telegram_patient", urgency)}
        >
          Записаться через Telegram-бот
        </a>
        <a
          href="tel:+380675707949"
          className="block text-center px-4 py-4 bg-white text-emerald-900 border border-emerald-900 rounded-xl font-semibold mb-2.5 transition hover:bg-emerald-50"
          onClick={() => logClick("cta_phone_patient", urgency)}
        >
          Позвонить: +380 67 570 79 49
        </a>
        <a
          href="https://ssvnauka.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center px-4 py-4 bg-white text-emerald-900 border border-emerald-900 rounded-xl font-semibold mb-2.5 transition hover:bg-emerald-50"
          onClick={() => logClick("cta_website_patient", urgency)}
        >
          Записаться на сайте ssvnauka.com
        </a>
        <p className="text-xs text-stone-500 text-center mt-4 leading-relaxed">
          Это предварительная оценка срочности, а не диагноз. Окончательное решение принимается врачом на консультации.
        </p>
        <button
          onClick={handleRestart}
          className="block text-center mt-3.5 text-[13px] text-stone-500 underline bg-transparent border-none cursor-pointer"
        >
          Пройти заново
        </button>
      </>
    );
  };

  const renderContent = () => {
    if (branch === null) return renderEntry();
    if (branch === "expert") {
      if (expertChoice) return renderExpertResult();
      return renderExpertMenu();
    }
    if (step < questions.length) return renderPatientStep();
    return renderPatientResult();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF8F3] flex justify-center px-4 py-8">
        <div className="w-full max-w-xl">
          <div className="text-center mb-5">
            <div className="text-xs font-bold tracking-[0.14em] uppercase text-[#B8923F] mb-1">
              МЦ MARIA · Харьков
            </div>
            <h1 className="font-serif text-[22px] font-semibold text-[#123832] leading-tight">
              Прескрининг перед консультацией
            </h1>
          </div>
          <div className="bg-white border border-[#E4DFD3] rounded-[14px] p-7 sm:p-8 shadow-sm">
            {renderContent()}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
