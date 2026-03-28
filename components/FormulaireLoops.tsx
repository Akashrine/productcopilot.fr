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
  buttonText = "Recevoir la newsletter",
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
        headers: {
          "Content-Type": "application/json",
        },
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
      <div
        className={`py-4 text-[#E8FF8B] font-medium transition-all duration-500 animate-pulse ${
          centered ? "text-center" : ""
        }`}
      >
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
          className="flex-1 px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-md text-[#F5F5F5] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#E8FF8B]/50 transition-all"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 bg-[#E8FF8B] text-[#0F0F0F] font-semibold rounded-md hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 whitespace-nowrap"
        >
          {status === "loading" ? "..." : buttonText}
        </button>
      </form>
      {status === "error" && <p className="mt-2 text-red-400 text-sm">{errorMessage}</p>}
    </div>
  );
}
