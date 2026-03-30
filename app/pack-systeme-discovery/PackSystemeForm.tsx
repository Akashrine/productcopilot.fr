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
      if (!response.ok) throw new Error(data?.error || "Impossible de s'inscrire.");
      setStatus("success");
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error?.message || "Une erreur est survenue.");
    }
  };

  if (status === "success") {
    return (
      <div className="card-glass p-5 space-y-2 text-center animate-in">
        <p className="text-[#E8FF8B] font-semibold text-sm">
          Tu seras prévenu(e) dès le lancement du Pack Système.
        </p>
        <p className="text-xs text-[#A3A3A3]">
          En attendant,{" "}
          <Link href="/pack-discovery" className="text-[#E8FF8B] underline underline-offset-2 hover:opacity-90">
            explore les 10 prompts gratuits
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
        <label htmlFor="pack-systeme-email" className="sr-only">Adresse email</label>
        <input
          id="pack-systeme-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ton@email.com"
          className="flex-1 px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl text-[#F5F5F5] placeholder:text-[#666666] focus:outline-none focus:ring-2 focus:ring-[#E8FF8B]/20 focus:border-[#E8FF8B]/40 transition-all"
        />
        <button
          type="submit"
          disabled={!emailIsValid || status === "loading"}
          className="btn-glow px-6 py-3 bg-[#E8FF8B] text-[#0F0F0F] font-bold rounded-xl disabled:opacity-50 whitespace-nowrap"
        >
          {status === "loading" ? "..." : "Être prévenu"}
        </button>
      </form>
      {status === "error" && <p className="mt-3 text-sm text-red-400 text-center">{errorMessage}</p>}
    </div>
  );
}
