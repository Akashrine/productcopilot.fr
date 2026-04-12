import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.LOOPS_API_KEY;

  if (!apiKey) {
    console.warn("[subscribe-pack] Missing LOOPS_API_KEY");
    return NextResponse.json({ error: "Configuration manquante." }, { status: 500 });
  }

  let body: { email?: string; source?: string } = {};
  try {
    body = (await request.json()) as { email?: string; source?: string };
  } catch {
    return NextResponse.json({ error: "Payload invalide." }, { status: 400 });
  }

  const email = body.email?.trim();
  const source = body.source?.trim();

  if (!email || !source) {
    return NextResponse.json({ error: "Email et source requis." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const loopsResponse = await fetch("https://app.loops.so/api/v1/events/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        eventName: "tool_signup",
        eventProperties: { source },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!loopsResponse.ok) {
      const data = await loopsResponse.json().catch(() => ({}));
      console.warn(`[subscribe-pack] Loops error (status=${loopsResponse.status})`, data);
      return NextResponse.json({ error: "Erreur lors de l'inscription." }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    clearTimeout(timeoutId);
    if ((err as Error).name === "AbortError") {
      console.warn("[subscribe-pack] Loops request timed out");
    } else {
      console.warn("[subscribe-pack] Network error", err);
    }
    return NextResponse.json({ error: "Erreur lors de l'inscription." }, { status: 500 });
  }
}
