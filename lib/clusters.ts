export type ClusterStatus = "live" | "coming";

export type Cluster = {
  id: string;
  name: string;
  description: string;
  badgeClasses: string;
  tool: {
    label: string;
    href: string;
  } | null;
  pack: {
    label: string;
    price: string;
    href: string;
    status: ClusterStatus;
  } | null;
};

export const clusters: Cluster[] = [
  {
    id: "discovery",
    name: "Discovery",
    description: "De l'interview au PRD en 40 min.",
    badgeClasses: "text-emerald-400 bg-emerald-400/10",
    tool: {
      label: "10 prompts Discovery IA",
      href: "/pack-discovery",
    },
    pack: {
      label: "Pack Système Discovery",
      price: "49 €",
      href: "/pack-systeme-discovery",
      status: "live",
    },
  },
  {
    id: "prd",
    name: "PRD & Vibe Coding",
    description: "De l'idée au produit qui tourne.",
    badgeClasses: "text-blue-400 bg-blue-400/10",
    tool: {
      label: "Template PRD IA",
      href: "/outils/template-prd-ia",
    },
    pack: {
      label: "Pack Vibe Coding for PMs",
      price: "29 €",
      href: "/packs/vibe-coding-pm",
      status: "live",
    },
  },
  {
    id: "okrs",
    name: "OKRs",
    description: "Des OKRs qui mesurent l'impact.",
    badgeClasses: "text-purple-400 bg-purple-400/10",
    tool: null,
    pack: {
      label: "Pack OKRs",
      price: "29 €",
      href: "/packs/okrs",
      status: "coming",
    },
  },
  {
    id: "alignement",
    name: "Alignement",
    description: "Aligne produit, tech et business.",
    badgeClasses: "text-orange-400 bg-orange-400/10",
    tool: null,
    pack: {
      label: "Pack Alignement",
      price: "39 €",
      href: "/packs/alignement",
      status: "coming",
    },
  },
];
