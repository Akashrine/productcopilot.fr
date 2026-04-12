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
    slug: "vibe-coding-pm",
    title: "Pack Vibe Coding for PMs",
    description: "12 prompts. 4 phases. De l'idée au produit qui tourne.",
    price: "29 €",
    href: "/packs/vibe-coding-pm",
    status: "live",
  },
];
