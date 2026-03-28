import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased flex flex-col items-center justify-center px-6">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center">
        Page introuvable
      </h1>
      <p className="text-[#A3A3A3] text-center max-w-md mb-10">
        Cette page n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 rounded-md bg-[#E8FF8B] text-[#0F0F0F] font-bold hover:opacity-90 transition-opacity"
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
