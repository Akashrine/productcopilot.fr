"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { freePrompts, promptNavItems, type PromptItem } from "@/lib/pack-prompts";

function LockIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M7 10V8a5 5 0 0110 0v2m-9 0h8a2 2 0 012 2v7a2 2 0 01-2 2H8a2 2 0 01-2-2v-7a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M9 9h9v11H9zM6 15H5a1 1 0 01-1-1V5a1 1 0 011-1h9a1 1 0 011 1v1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type TrackingPayload = Record<string, string | number | boolean>;

function trackEvent(eventName: string, payload: TrackingPayload = {}) {
  if (typeof window === "undefined") return;

  const event = { event: eventName, ...payload };
  const dataLayer = (window as any).dataLayer;

  if (Array.isArray(dataLayer)) {
    dataLayer.push(event);
  } else {
    console.info("[tracking]", eventName, payload);
  }
}

export default function PackDiscovery() {
  const [activePrompt, setActivePrompt] = useState(0);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showUnlockConfirmation, setShowUnlockConfirmation] = useState(false);
  const [gatedPrompts, setGatedPrompts] = useState<PromptItem[]>([]);
  const [gatedPromptsError, setGatedPromptsError] = useState("");
  const [isLoadingGatedPrompts, setIsLoadingGatedPrompts] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  useEffect(() => {
    const unlocked = window.localStorage.getItem("pack_unlocked") === "true";
    setIsUnlocked(unlocked);
    if (unlocked) setActivePrompt((prev) => (prev < 3 ? 3 : prev));
  }, []);

  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const timer = window.setInterval(() => {
      setCooldownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [cooldownSeconds]);

  useEffect(() => {
    const fetchGatedPrompts = async () => {
      if (!isUnlocked || gatedPrompts.length > 0 || isLoadingGatedPrompts) return;

      setIsLoadingGatedPrompts(true);
      setGatedPromptsError("");
      try {
        const response = await fetch("/api/pack-prompts", {
          headers: { "x-pack-unlocked": "true" },
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(data?.error || "Impossible de charger les prompts verrouilles.");
        }

        setGatedPrompts(data.prompts || []);
      } catch (error: any) {
        setGatedPromptsError(error?.message || "Erreur de chargement des prompts verrouilles.");
      } finally {
        setIsLoadingGatedPrompts(false);
      }
    };

    void fetchGatedPrompts();
  }, [isUnlocked, gatedPrompts.length, isLoadingGatedPrompts]);

  const prompts = useMemo(() => [...freePrompts, ...gatedPrompts], [gatedPrompts]);
  const activeData = prompts[activePrompt];
  const activeNavItem = promptNavItems[activePrompt];
  const isLocked = !!activeNavItem?.gated && !isUnlocked;

  const unlockedCount = useMemo(
    () => promptNavItems.filter((prompt) => !prompt.gated || isUnlocked).length,
    [isUnlocked],
  );

  const copyToClipboard = async (text: string, promptId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPromptId(promptId);
      window.setTimeout(() => setCopiedPromptId(null), 1500);
    } catch {
      setCopiedPromptId(null);
    }
  };

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const submitDisabled = submitStatus === "loading" || !emailIsValid || cooldownSeconds > 0;

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitDisabled) return;

    setSubmitStatus("loading");
    setErrorMessage("");
    trackEvent("pack_unlock_attempt", { source: "pack-discovery" });

    try {
      const response = await fetch("/api/subscribe-pack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || "Impossible de debloquer le pack pour le moment.");
      }

      window.localStorage.setItem("pack_unlocked", "true");
      setIsUnlocked(true);
      setSubmitStatus("success");
      setShowUnlockConfirmation(true);
      setActivePrompt(3);
      trackEvent("pack_unlock_success", { source: "pack-discovery" });
    } catch (error: any) {
      const message = error?.message || "Une erreur est survenue.";
      setSubmitStatus("error");
      setErrorMessage(message);
      setCooldownSeconds(10);
      trackEvent("pack_unlock_error", { source: "pack-discovery", reason: message });
    }
  };

  return (
    <>
      <div
        className={`min-h-screen bg-[#0F0F0F] text-[#F5F5F5] ${isUnlocked ? "pb-24 md:pb-20" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10 md:py-14 flex flex-col lg:flex-row gap-8 md:gap-12">
        <nav className="lg:w-80 shrink-0">
          <div className="lg:sticky lg:top-24 space-y-2">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-[#A3A3A3] hover:text-[#E8FF8B] transition-colors mb-4"
            >
              &larr; Retour
            </Link>
            <div className="p-4 rounded-xl bg-[#141414] border border-[#1F1F1F] mb-4">
              <p className="text-[10px] uppercase tracking-widest text-[#E8FF8B] font-bold mb-2">
                Progression
              </p>
              <p className="text-xs text-[#A3A3A3]">
                {unlockedCount} / {promptNavItems.length} prompts accessibles
              </p>
            </div>

            <p className="text-[10px] uppercase tracking-widest text-[#A3A3A3] px-2 pb-1">
              Workflow discovery
            </p>
            {promptNavItems.map((prompt, index) => {
              const promptLocked = prompt.gated && !isUnlocked;
              const isActive = index === activePrompt;

              return (
                <button
                  key={prompt.id}
                  onClick={() => setActivePrompt(index)}
                  className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-lg border transition-all ${
                    isActive
                      ? "bg-[#E8FF8B] text-[#0F0F0F] border-[#E8FF8B]"
                      : "bg-[#141414] border-[#1F1F1F] text-[#F5F5F5] hover:border-white/20"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${
                      isActive
                        ? "bg-[#0F0F0F]/10"
                        : "bg-[#0F0F0F] border border-[#1F1F1F] text-[#A3A3A3]"
                    }`}
                  >
                    {prompt.id}
                  </span>
                  <span className="text-sm font-semibold truncate flex-1">{prompt.title}</span>
                  {promptLocked && (
                    <span className={isActive ? "text-[#0F0F0F]" : "text-[#A3A3A3]"}>
                      <LockIcon className="w-4 h-4" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        <main className="flex-1">
          {showUnlockConfirmation && (
            <div className="mb-6 rounded-xl border border-[#E8FF8B]/30 bg-[#141414] p-4 border-l-4 border-l-[#E8FF8B]">
              <p className="text-sm text-[#D4D4D4]">
                <span className="text-[#E8FF8B] font-bold">Acces debloque : </span>
                Les 7 sequences supplementaires sont disponibles. Un email de confirmation a ete envoye.
              </p>
            </div>
          )}

          {isLocked ? (
            <div className="max-w-2xl mx-auto mt-8 md:mt-16">
              <div className="p-8 md:p-10 rounded-2xl bg-[#141414] border border-[#1F1F1F] text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#0F0F0F] border border-[#1F1F1F] flex items-center justify-center text-[#E8FF8B] mb-5">
                  <LockIcon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Débloquez les 7 séquences suivantes</h3>
                <p className="text-[#A3A3A3] mb-8">
                  Accès gratuit. Inscrivez-vous à la newsletter Product Copilot.
                </p>

                {submitStatus === "success" ? (
                  <p className="text-[#E8FF8B] font-medium">
                    Accès débloqué. Les 10 prompts sont maintenant disponibles.
                  </p>
                ) : (
                  <form onSubmit={handleUnlock} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                    <label htmlFor="pack-unlock-email" className="sr-only">Adresse email</label>
                    <input
                      id="pack-unlock-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ton@email.com"
                      className="flex-1 px-4 py-3 bg-[#0F0F0F] border border-[#1F1F1F] rounded-md text-[#F5F5F5] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#E8FF8B]/60"
                    />
                    <button
                      type="submit"
                      disabled={submitDisabled}
                      className="px-6 py-3 bg-[#E8FF8B] text-[#0F0F0F] font-bold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap"
                    >
                      {submitStatus === "loading"
                        ? "..."
                        : cooldownSeconds > 0
                          ? `Réessayer (${cooldownSeconds}s)`
                          : "Débloquer le pack"}
                    </button>
                  </form>
                )}
                {submitStatus === "error" && (
                  <p className="mt-3 text-sm text-red-400">{errorMessage}</p>
                )}
              </div>
            </div>
          ) : isLoadingGatedPrompts && activePrompt > 2 && !activeData ? (
            <div className="max-w-2xl mx-auto mt-8 md:mt-16 p-8 rounded-2xl bg-[#141414] border border-[#1F1F1F] text-center text-[#A3A3A3]">
              Chargement des sequences verrouillees...
            </div>
          ) : gatedPromptsError && activePrompt > 2 && !activeData ? (
            <div className="max-w-2xl mx-auto mt-8 md:mt-16 p-8 rounded-2xl bg-[#141414] border border-[#1F1F1F] text-center text-red-400">
              {gatedPromptsError}
            </div>
          ) : activeData ? (
            <div className="max-w-4xl">
              <span className="text-[11px] uppercase tracking-widest text-[#E8FF8B] font-bold">
                {activeData.phase}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-2 mb-4">
                {activeData.title}
              </h1>
              <p className="text-[#A3A3A3] text-lg leading-relaxed mb-8">{activeData.usage}</p>

              <section className="bg-[#141414] border border-[#1F1F1F] rounded-2xl overflow-hidden mb-6">
                <div className="px-5 py-4 border-b border-[#1F1F1F] flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-widest text-[#A3A3A3] font-bold">
                    Prompt
                  </span>
                  <button
                    onClick={() => copyToClipboard(activeData.prompt, activeData.id)}
                    className="px-3 py-1.5 rounded-md border border-[#1F1F1F] text-sm text-[#F5F5F5] hover:border-white/20 transition-colors inline-flex items-center gap-2"
                  >
                    <CopyIcon className="w-4 h-4" />
                    {copiedPromptId === activeData.id ? "Copié" : "Copier"}
                  </button>
                </div>
                <div className="p-5 md:p-7">
                  <pre className="text-sm md:text-[15px] font-mono whitespace-pre-wrap leading-relaxed text-[#D4D4D4]">
                    {activeData.prompt}
                  </pre>
                </div>
              </section>

              {activeData.variables.length > 0 && (
                <section className="bg-[#141414] border border-[#1F1F1F] rounded-2xl overflow-hidden mb-6">
                  <div className="px-5 py-4 border-b border-[#1F1F1F]">
                    <span className="text-[11px] uppercase tracking-widest text-[#A3A3A3] font-bold">
                      Variables à compléter
                    </span>
                  </div>
                  <div className="p-5">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-[#A3A3A3]">
                          <th className="text-left pb-3 font-semibold">Variable</th>
                          <th className="text-left pb-3 font-semibold">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeData.variables.map((variable) => (
                          <tr key={variable.name} className="border-t border-[#1F1F1F]">
                            <td className="py-3 pr-4 font-mono text-[#E8FF8B]">{variable.name}</td>
                            <td className="py-3 text-[#A3A3A3]">{variable.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              <section className="mb-6 rounded-xl border border-[#E8FF8B]/30 bg-[#141414] p-5 border-l-4 border-l-[#E8FF8B]">
                <p className="text-sm text-[#D4D4D4]">
                  <span className="text-[#E8FF8B] font-bold">Pro tip : </span>
                  {activeData.tip}
                </p>
              </section>

              <section className="rounded-2xl border border-[#1F1F1F] bg-[#141414] p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Besoin d'un diagnostic discovery ?</h3>
                  <p className="text-[#A3A3A3] text-sm leading-relaxed">
                    On analyse vos entretiens et vos hypotheses ensemble pendant une session de coaching 1:1.
                  </p>
                </div>
                <a
                  href="https://app.lemcal.com/@productcopilot/decouverte"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#E8FF8B] text-[#0F0F0F] font-bold hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Réserver un créneau
                </a>
              </section>
            </div>
          ) : null}
        </main>
        </div>
      </div>
      {isUnlocked && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/5 bg-[#141414] px-5 py-3.5 md:py-4"
          role="complementary"
          aria-label="Pack Systeme Discovery"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 text-sm text-[#A3A3A3]">
            <p className="leading-snug">
              Pack Système Discovery (templates, workflow, exemples réels) arrive bientôt. Tu seras prévenu par email.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
