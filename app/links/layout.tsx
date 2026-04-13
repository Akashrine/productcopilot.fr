import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Copilot — Liens",
  robots: { index: false, follow: false },
};

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
