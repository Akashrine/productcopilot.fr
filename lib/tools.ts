export type Tool = {
  slug: string;
  title: string;
  description: string;
  href: string;
};

export const tools: Tool[] = [
  {
    slug: "pack-discovery",
    title: "10 prompts Discovery IA",
    description: "Un système de prompts chaîné de l'interview au PRD en 40 min.",
    href: "/pack-discovery",
  },
  {
    slug: "template-prd-ia",
    title: "Template PRD IA",
    description: "7 questions, un PRD structuré en 5 min.",
    href: "/outils/template-prd-ia",
  },
  {
    slug: "user-stories",
    title: "Générateur de User Stories",
    description: "Feature en entrée, user stories structurées en sortie.",
    href: "/tools/user-stories",
  },
];
