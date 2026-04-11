import type { Metadata } from "next";
import PackDiscovery from "../../components/PackDiscovery";

export const metadata: Metadata = {
  title: "Pack Discovery IA — Product Copilot",
  description:
    "10 prompts pour structurer votre cycle de discovery avec l'IA. 3 gratuits, 7 en accès newsletter.",
  alternates: {
    canonical: "https://productcopilot.fr/pack-discovery",
  },
  openGraph: {
    title: "Pack Discovery IA — Product Copilot",
    description:
      "10 prompts pour structurer votre cycle de discovery avec l'IA.",
    type: "website",
    locale: "fr_FR",
    url: "https://productcopilot.fr/pack-discovery",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pack Discovery IA — Product Copilot",
    description: "10 prompts pour structurer votre cycle de discovery avec l'IA. 3 gratuits, 7 en accès newsletter.",
  },
};

export default function PackDiscoveryPage() {
  return <PackDiscovery />;
}
