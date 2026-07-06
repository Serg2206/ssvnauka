"use client";

import Link from "next/link";

export default function ExpertBanner() {
  return (
    <div className="max-w-3xl mx-auto mb-7 bg-[#F6F4EE] border border-[#E4DFD3] border-l-4 border-l-[#B8923F] rounded-xl p-5">
      <div className="text-sm text-[#1B2B26] leading-relaxed mb-3">
        <strong className="block mb-1">Не уверены, какая услуга вам нужна?</strong>
        Пройдите короткий маршрутизатор — за 30 секунд подберём подходящий формат:
        консультация, второе мнение, рецензирование, медтуризм или сотрудничество.
      </div>
      <Link
        href="/prescreening"
        className="inline-block bg-[#123832] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition hover:bg-[#1F5148]"
      >
        Пройти маршрутизатор →
      </Link>
    </div>
  );
}
