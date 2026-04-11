export type PackStatus = "live" | "coming";

export type Pack = {
  slug: string;
  title: string;
  description: string;
  price: string;
  href: string;
  status: PackStatus;
};

export const packs: Pack[] = [
  {
    slug: "pack-systeme-discovery",
    title: "Pack Système Discovery",
    description:
      "Les prompts + templates Notion + workflow + cas réel annoté. De l'interview au PRD.",
    price: "49 €",
    href: "/pack-systeme-discovery",
    status: "live",
  },
  {
    slug: "pack-prd-ia",
    title: "Pack PRD + IA",
    description: "5 prompts, 3 templates Notion et un workflow step-by-step pour des PRDs clairs.",
    price: "39 €",
    href: "/packs/prd-ia",
    status: "coming",
  },
];
