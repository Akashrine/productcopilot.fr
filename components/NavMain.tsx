"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavVariant = "fixed" | "sticky";

type Props = {
  variant?: NavVariant;
  cta?: { label: string; href: string };
};

const NAV_LINKS = [
  { label: "Blog", href: "/blog" },
  { label: "Outils", href: "/outils" },
  { label: "Packs", href: "/packs" },
];

export default function NavMain({
  variant = "fixed",
  cta = { label: "Voir les outils", href: "/outils" },
}: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const posClass = variant === "fixed"
    ? "fixed top-0 inset-x-0 z-50"
    : "sticky top-0 z-50";

  return (
    <>
      <nav className={`${posClass} bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-white/5`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between px-5 sm:px-6 h-14">
          {/* Logo */}
          <Link href="/" className="text-sm font-bold tracking-tight hover:text-[#E8FF8B] transition-colors">
            Product Copilot
          </Link>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-6 text-sm text-[#A3A3A3]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-[#F5F5F5] transition-colors ${pathname === link.href || pathname.startsWith(link.href + "/") ? "text-[#F5F5F5]" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* CTA */}
            <Link
              href={cta.href}
              className="hidden sm:inline-flex text-xs font-semibold px-4 py-2 rounded-full bg-[#E8FF8B] text-[#0F0F0F] hover:opacity-90 transition-opacity"
            >
              {cta.label}
            </Link>

            {/* Mobile burger */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="sm:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-lg hover:bg-white/5 transition-colors"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
            >
              <span
                className={`block w-5 h-[1.5px] bg-[#F5F5F5] transition-all duration-200 origin-center ${open ? "rotate-45 translate-y-[6.5px]" : ""}`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-[#F5F5F5] transition-all duration-200 ${open ? "opacity-0 scale-x-0" : ""}`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-[#F5F5F5] transition-all duration-200 origin-center ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {open && (
        <div
          className="sm:hidden fixed inset-0 z-40 bg-[#0F0F0F]/95 backdrop-blur-xl pt-14 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation mobile"
        >
          <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-4 text-xl font-semibold tracking-tight border-b border-white/5 transition-colors ${pathname === link.href ? "text-[#E8FF8B]" : "text-[#F5F5F5] hover:text-[#E8FF8B]"}`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile CTA */}
            <div className="pt-6">
              <Link
                href={cta.href}
                className="btn-glow inline-flex w-full items-center justify-center px-6 py-4 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] font-bold text-base"
              >
                {cta.label}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
