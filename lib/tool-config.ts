export interface ToolConfig {
  slug: string
  name: string
  description: string
  headline: string
  inputPlaceholder: string
  inputMaxLength: number
  outputType: 'json' | 'markdown'
  isActive: boolean
}

export const TOOL_CONFIGS: Record<string, ToolConfig> = {
  'user-stories': {
    slug: 'user-stories',
    name: 'Générateur de User Stories',
    description: 'Transforme une description de feature en user stories structurées avec critères d\'acceptation.',
    headline: 'Transforme tes features en user stories prêtes pour le sprint',
    inputPlaceholder: 'Décris ta feature ici...\n\nExemple : Les utilisateurs doivent pouvoir filtrer les résultats de recherche par date, fourchette de prix et catégorie. Le filtre doit se mettre à jour en temps réel sans recharger la page.',
    inputMaxLength: 3000,
    outputType: 'json',
    isActive: true,
  },
}

export function getToolConfig(slug: string): ToolConfig | null {
  return TOOL_CONFIGS[slug] ?? null
}
