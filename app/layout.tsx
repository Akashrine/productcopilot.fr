import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://productcopilot.fr"),
  title: "Product Copilot — Outils IA pour Product Managers",
  description: "Prompts, templates et workflows pour Product Managers. Pack Vibe Coding for PMs : 12 prompts chaînés pour passer de l'idée au produit. 29 €.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-945QXLGP50"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-945QXLGP50');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
