import { NextResponse } from "next/server";

type SubscribePayload = {
  email?: string;
  source?: string;
};

export async function POST(request: Request) {
  const apiKey = process.env.LOOPS_API_KEY;
  const mailingListId = process.env.LOOPS_PACK_LIST_ID;

  if (!apiKey || !mailingListId) {
    console.warn("[loops/subscribe] Missing LOOPS_API_KEY or LOOPS_PACK_LIST_ID");
    return NextResponse.json(
      { message: "Configuration Loops manquante (LOOPS_API_KEY / LOOPS_PACK_LIST_ID)." },
      { status: 500 },
    );
  }

  let payload: SubscribePayload = {};
  try {
    payload = (await request.json()) as SubscribePayload;
  } catch {
    return NextResponse.json({ message: "Payload invalide." }, { status: 400 });
  }

  const email = payload.email?.trim();
  const source = payload.source?.trim() || "landing-page";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Email invalide." }, { status: 400 });
  }

  try {
    const loopsResponse = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        source,
        mailingLists: {
          [mailingListId]: true,
        },
      }),
    });

    if (!loopsResponse.ok) {
      console.warn(`[loops/subscribe] Loops response not OK (status=${loopsResponse.status})`);
      let loopsErrorMessage = "Erreur Loops.";
      try {
        const loopsData = await loopsResponse.json();
        if (typeof loopsData?.message === "string" && loopsData.message.length > 0) {
          loopsErrorMessage = loopsData.message;
        }
      } catch {
        // Keep fallback message when Loops payload is not JSON.
      }

      return NextResponse.json({ message: loopsErrorMessage }, { status: loopsResponse.status });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    console.warn("[loops/subscribe] Network error while calling Loops");
    return NextResponse.json(
      { message: "Impossible de contacter Loops pour le moment." },
      { status: 502 },
    );
  }
}
