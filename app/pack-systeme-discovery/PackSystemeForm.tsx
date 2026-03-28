"use client";

import Link from "next/link";
import { useState } from "react";

export default function PackSystemeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailIsValid || status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/subscribe-pack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "pack-systeme-interest" }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || "Impossible de s'inscrire pour le moment.");
      }

      setStatus("success");
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error?.message || "Une erreur est survenue.");
    }
  };

  if (status === "success") {
    return (
      <div className="p-6 rounded-xl border border-[#E8FF8B]/30 bg-[#141414] space-y-3">
        <p className="text-[#E8FF8B] font-semibold">
          Tu seras prévenu(e) dès le lancement du Pack Système.
        </p>
        <p className="text-sm text-[#A3A3A3]">
          En attendant, explore les 10 prompts gratuits :{" "}
          <Link href="/pack-discovery" className="text-[#E8FF8B] underline underline-offset-2 hover:opacity-90">
            Voir les prompts
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
      <label htmlFor="pack-systeme-email" className="sr-only">Adresse email</label>
      <input
        id="pack-systeme-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ton@email.com"
        className="flex-1 px-4 py-3 bg-[#141414] border border-[#1F1F1F] rounded-md text-[#F5F5F5] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#E8FF8B]/60"
      />
      <button
        type="submit"
        disabled={!emailIsValid || status === "loading"}
        className="px-6 py-3 bg-[#E8FF8B] text-[#0F0F0F] font-bold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap"
      >
        {status === "loading" ? "..." : "Être prévenu du lancement"}
      </button>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-400 sm:col-span-2">{errorMessage}</p>
      )}
    </form>
  );
}
