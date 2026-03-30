import { buildFullPrompt as buildUserStoriesPrompt } from './user-stories'

const PROMPT_BUILDERS: Record<string, (input: string) => string> = {
  'user-stories': buildUserStoriesPrompt,
}

export function buildPrompt(toolSlug: string, input: string): string | null {
  const builder = PROMPT_BUILDERS[toolSlug]
  if (!builder) return null
  return builder(input)
}
