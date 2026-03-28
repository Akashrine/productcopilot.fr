import { NextResponse } from "next/server";
import { gatedPrompts } from "@/lib/pack-prompts";

export async function GET(request: Request) {
  const unlockedHeader = request.headers.get("x-pack-unlocked");

  if (unlockedHeader !== "true") {
    return NextResponse.json({ error: "Accès restreint." }, { status: 403 });
  }

  return NextResponse.json({ prompts: gatedPrompts }, { status: 200 });
}
