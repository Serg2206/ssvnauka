import { NextRequest, NextResponse } from "next/server";

const rateMap = new Map<string, number>();

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const now = Date.now();

  // Простая защита от флуда: не чаще 1 события в 2 секунды с одного IP
  if (rateMap.has(ip) && now - rateMap.get(ip)! < 2000) {
    return NextResponse.json({ error: "too many requests" }, { status: 429 });
  }
  rateMap.set(ip, now);

  const body = await req.json().catch(() => null);
  if (!body?.event) {
    return NextResponse.json({ error: "bad payload" }, { status: 400 });
  }

  const event = String(body.event).replace(/[^\w-]/g, "").slice(0, 60);
  const detail = String(body.detail ?? "").slice(0, 200);
  const ts = new Date().toISOString();

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return NextResponse.json({ error: "server not configured" }, { status: 500 });
  }

  const text = `🩺 *Прескрининг ssvnauka.com*\nСобытие: \`${event}\`\n${detail ? `Детали: ${detail}\n` : ""}Время: ${ts}\nIP: ${ip}`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
    }),
  }).catch(() => {});

  return NextResponse.json({ ok: true });
}
