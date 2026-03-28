import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.LOOPS_API_KEY;
  const mailingListId = process.env.LOOPS_PACK_LIST_ID;

  if (!apiKey || !mailingListId) {
    console.warn("[subscribe-pack] Missing LOOPS_API_KEY or LOOPS_PACK_LIST_ID");
    return NextResponse.json({ error: "Configuration manquante." }, { status: 500 });
  }

  let body: { email?: string; source?: string } = {};
  try {
    body = (await request.json()) as { email?: string; source?: string };
  } catch {
    return NextResponse.json({ error: "Payload invalide." }, { status: 400 });
  }

  const email = body.email?.trim();
  const source = body.source === "pack-systeme-interest" ? "pack-systeme-interest" : "pack-discovery";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
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
      console.warn(`[subscribe-pack] Loops response not OK (status=${loopsResponse.status})`);
      let msg = "Erreur lors de l'inscription.";
      try {
        const data = await loopsResponse.json();
        if (typeof data?.message === "string" && data.message.length > 0) msg = data.message;
      } catch {
        // keep fallback
      }
      return NextResponse.json({ error: msg }, { status: loopsResponse.status });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    console.warn("[subscribe-pack] Network error while calling Loops");
    return NextResponse.json(
      { error: "Impossible de contacter le service d'inscription." },
      { status: 502 },
    );
  }
}
