// This route is no longer used.
// The Generator component now builds prompts client-side for copy/paste into Claude or ChatGPT.
// Kept as placeholder. Will be replaced by actual API integration when needed.

import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    { error: 'Cette route n\'est plus active. Utilise le générateur de prompts sur /tools/user-stories.' },
    { status: 410 }
  )
}
