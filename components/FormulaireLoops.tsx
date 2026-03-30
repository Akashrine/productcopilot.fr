"use client";

import React, { useState } from "react";

type FormulaireLoopsProps = {
  centered?: boolean;
  source?: string;
  buttonText?: string;
};

export default function FormulaireLoops({
  centered = false,
  source = "landing-page",
  buttonText = "S'abonner",
}: FormulaireLoopsProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/loops/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Une erreur est survenue.");
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Impossible de s'inscrire pour le moment.");
    }
  };

  if (status === "success") {
    return (
      <div className={`py-4 text-[#E8FF8B] font-medium text-sm transition-all duration-500 ${centered ? "text-center" : ""}`}>
        C&apos;est noté. Bienvenue dans le système.
      </div>
    );
  }

  return (
    <div className={`w-full max-w-md ${centered ? "mx-auto" : ""}`}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="newsletter-email" className="sr-only">Adresse email</label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="ton@email.com"
          required
          className="flex-1 px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl text-[#F5F5F5] placeholder:text-[#666666] focus:outline-none focus:ring-2 focus:ring-[#E8FF8B]/20 focus:border-[#E8FF8B]/40 transition-all"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-glow px-6 py-3 bg-[#E8FF8B] text-[#0F0F0F] font-bold rounded-xl disabled:opacity-50 whitespace-nowrap"
        >
          {status === "loading" ? "..." : buttonText}
        </button>
      </form>
      {status === "error" && <p className="mt-2 text-red-400 text-sm">{errorMessage}</p>}
    </div>
  );
}
