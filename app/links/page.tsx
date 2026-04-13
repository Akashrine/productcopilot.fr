"use client";

import Link from "next/link";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function track(linkName: string) {
  window.gtag?.("event", "links_click", { link_name: linkName });
}

const LINKS = [
  {
    href: "/packs/vibe-coding-pm",
    label: "Pack Vibe Coding for PMs — 29 €",
    name: "pack",
    accent: true,
  },
  {
    href: "/outils/template-prd-ia",
    label: "Template PRD IA — Gratuit",
    name: "template-prd",
    accent: false,
  },
  {
    href: "/pack-discovery",
    label: "10 Prompts Discovery — Gratuit",
    name: "discovery",
    accent: false,
  },
  {
    href: "/blog",
    label: "Le blog",
    name: "blog",
    accent: false,
  },
];

export default function LinksPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased flex items-center justify-center px-6">
      <div className="w-full max-w-[400px] py-12">

        {/* Logo */}
        <p className="text-lg font-bold text-center text-gradient-lime mb-8">
          Product Copilot
        </p>

        {/* Links */}
        <div className="flex flex-col gap-3">
          {LINKS.map(({ href, label, name, accent }) => (
            <Link
              key={name}
              href={href}
              onClick={() => track(name)}
              className={
                accent
                  ? "block w-full py-4 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] text-sm font-bold text-center hover:opacity-90 transition-opacity"
                  : "block w-full py-4 rounded-xl border border-white/10 text-[#F5F5F5] text-sm font-semibold text-center hover:border-white/20 transition-colors"
              }
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Bottom */}
        <p className="text-xs text-[#666666] text-center mt-8">
          productcopilot.fr
        </p>
      </div>
    </main>
  );
}
