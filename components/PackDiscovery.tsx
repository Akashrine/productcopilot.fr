"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { freePrompts, promptNavItems, type PromptItem } from "@/lib/pack-prompts";

/* ─── Icons ─── */

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

function CopyIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
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

function CheckCircle() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-[#E8FF8B] shrink-0" aria-hidden="true">
      <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Analytics ─── */

type TrackingPayload = Record<string, string | number | boolean>;

function trackEvent(eventName: string, payload: TrackingPayload = {}) {
  if (typeof window === "undefined") return;
  const event = { event: eventName, ...payload };
  const dataLayer = (window as any).dataLayer;
  if (Array.isArray(dataLayer)) dataLayer.push(event);
}

/* ─── Phase labels for sidebar grouping ─── */

const phaseBreaks: Record<number, string> = {
  0: "Phase 1 — Extraction",
  2: "Phase 2 — Analyse & Décision",
  6: "Phase 3 — Exécution & Pilotage",
};

/* ─── Component ─── */

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
    const timer = window.setInterval(() => setCooldownSeconds((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => window.clearInterval(timer);
  }, [cooldownSeconds]);

  useEffect(() => {
    const fetchGated = async () => {
      if (!isUnlocked || gatedPrompts.length > 0 || isLoadingGatedPrompts) return;
      setIsLoadingGatedPrompts(true);
      setGatedPromptsError("");
      try {
        const res = await fetch("/api/pack-prompts", { headers: { "x-pack-unlocked": "true" } });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || "Impossible de charger les prompts verrouillés.");
        setGatedPrompts(data.prompts || []);
      } catch (err: any) {
        setGatedPromptsError(err?.message || "Erreur de chargement.");
      } finally {
        setIsLoadingGatedPrompts(false);
      }
    };
    void fetchGated();
  }, [isUnlocked, gatedPrompts.length, isLoadingGatedPrompts]);

  const prompts = useMemo(() => [...freePrompts, ...gatedPrompts], [gatedPrompts]);
  const activeData = prompts[activePrompt];
  const activeNavItem = promptNavItems[activePrompt];
  const isLocked = !!activeNavItem?.gated && !isUnlocked;

  const unlockedCount = useMemo(
    () => promptNavItems.filter((p) => !p.gated || isUnlocked).length,
    [isUnlocked],
  );

  // Auto-scroll to unlock form when clicking a locked prompt
  useEffect(() => {
    if (isLocked) {
      const timer = window.setTimeout(() => {
        document.getElementById("unlock-section")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
      return () => window.clearTimeout(timer);
    }
  }, [activePrompt, isLocked]);

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
      const res = await fetch("/api/subscribe-pack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Impossible de débloquer le pack.");

      window.localStorage.setItem("pack_unlocked", "true");
      setIsUnlocked(true);
      setSubmitStatus("success");
      setShowUnlockConfirmation(true);
      setActivePrompt(3);
      trackEvent("pack_unlock_success", { source: "pack-discovery" });
    } catch (err: any) {
      const msg = err?.message || "Une erreur est survenue.";
      setSubmitStatus("error");
      setErrorMessage(msg);
      setCooldownSeconds(10);
      trackEvent("pack_unlock_error", { source: "pack-discovery", reason: msg });
    }
  };

  /* ─── Progress bar width ─── */
  const progressPct = `${Math.round((unlockedCount / promptNavItems.length) * 100)}%`;

  return (
    <>
      <div className={`min-h-screen bg-[#0F0F0F] text-[#F5F5F5] ${isUnlocked ? "pb-20" : ""}`}>
        {/* Nav */}
        <nav className="sticky top-0 z-40 bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-6 h-14">
            <Link href="/" className="text-sm font-bold tracking-tight">
              Product Copilot
            </Link>
            <span className="text-xs text-[#666666]">
              {unlockedCount}/{promptNavItems.length} prompts
            </span>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 md:py-12 flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* ── Sidebar ── */}
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-20 space-y-1">
              {/* Progress */}
              <div className="card-glass p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-[#A3A3A3]">Progression</p>
                  <p className="text-xs text-[#666666]">{unlockedCount}/{promptNavItems.length}</p>
                </div>
                <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-[#E8FF8B] transition-all duration-500" style={{ width: progressPct }} />
                </div>
              </div>

              {/* Prompt list */}
              {promptNavItems.map((prompt, index) => {
                const locked = prompt.gated && !isUnlocked;
                const isActive = index === activePrompt;
                const phaseLabel = phaseBreaks[index];

                return (
                  <div key={prompt.id}>
                    {phaseLabel && (
                      <p className="text-[10px] uppercase tracking-widest text-[#666666] px-3 pt-4 pb-1.5">
                        {phaseLabel}
                      </p>
                    )}
                    <button
                      onClick={() => setActivePrompt(index)}
                      className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all text-sm ${
                        isActive
                          ? "bg-white/[0.06] border-l-2 border-[#E8FF8B] text-[#F5F5F5]"
                          : "border-l-2 border-transparent text-[#A3A3A3] hover:bg-white/[0.03] hover:text-[#F5F5F5]"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-bold ${
                          isActive
                            ? "bg-[#E8FF8B]/15 text-[#E8FF8B]"
                            : "bg-white/5 text-[#666666]"
                        }`}
                      >
                        {prompt.id}
                      </span>
                      <span className="truncate flex-1 font-medium">{prompt.title}</span>
                      {locked && <LockIcon className="w-3.5 h-3.5 text-[#666666]" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* ── Content ── */}
          <main className="flex-1 min-w-0">
            {showUnlockConfirmation && (
              <div className="mb-6 card-glass p-4 border-l-2 border-[#E8FF8B] animate-in">
                <p className="text-sm text-[#A3A3A3]">
                  <span className="text-[#E8FF8B] font-semibold">Accès débloqué </span>
                  — Les 7 séquences supplémentaires sont disponibles.
                </p>
              </div>
            )}

            {isLocked ? (
              /* ── Unlock form ── */
              <div id="unlock-section" className="max-w-xl mx-auto mt-8 md:mt-20 animate-in">
                <div className="card-glass p-8 md:p-10 text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#0F0F0F] border border-[#E8FF8B]/20 flex items-center justify-center text-[#E8FF8B] mb-6" style={{ animation: "pulse-glow 3s infinite" }}>
                    <LockIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Débloquer les 7 prompts suivants</h3>
                  <p className="text-[#A3A3A3] text-sm mb-8">
                    Accès gratuit. Inscris-toi à la newsletter Product Copilot.
                  </p>

                  {submitStatus === "success" ? (
                    <p className="text-[#E8FF8B] font-medium">
                      Accès débloqué. Les 10 prompts sont disponibles.
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
                        className="flex-1 px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl text-[#F5F5F5] placeholder:text-[#666666] focus:outline-none focus:ring-2 focus:ring-[#E8FF8B]/20 focus:border-[#E8FF8B]/40 transition-all"
                      />
                      <button
                        type="submit"
                        disabled={submitDisabled}
                        className="btn-glow px-6 py-3 bg-[#E8FF8B] text-[#0F0F0F] font-bold rounded-xl disabled:opacity-50 whitespace-nowrap"
                      >
                        {submitStatus === "loading"
                          ? "..."
                          : cooldownSeconds > 0
                            ? `Réessayer (${cooldownSeconds}s)`
                            : "Débloquer"}
                      </button>
                    </form>
                  )}
                  {submitStatus === "error" && <p className="mt-3 text-sm text-red-400">{errorMessage}</p>}
                  <p className="mt-4 text-xs text-[#666666]">Pas de spam. Désinscription en 1 clic.</p>
                </div>
              </div>
            ) : isLoadingGatedPrompts && activePrompt > 2 && !activeData ? (
              <div className="max-w-xl mx-auto mt-16 card-glass p-8 text-center text-[#A3A3A3] animate-in">
                Chargement des séquences verrouillées...
              </div>
            ) : gatedPromptsError && activePrompt > 2 && !activeData ? (
              <div className="max-w-xl mx-auto mt-16 card-glass p-8 text-center text-red-400 animate-in">
                {gatedPromptsError}
              </div>
            ) : activeData ? (
              /* ── Prompt display ── */
              <div className="max-w-3xl animate-in">
                <span className="text-[10px] uppercase tracking-widest text-[#E8FF8B]/70 font-bold">
                  {activeData.phase}
                </span>
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight mt-1 mb-3">
                  {activeData.title}
                </h1>
                <p className="text-[#A3A3A3] leading-relaxed mb-8">{activeData.usage}</p>

                {/* Prompt content */}
                <section className="card-glass overflow-hidden mb-6">
                  <div className="px-5 py-3.5 border-b border-white/5 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#666666] uppercase tracking-wider">
                      Prompt
                    </span>
                    <button
                      onClick={() => copyToClipboard(activeData.prompt, activeData.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 text-[#A3A3A3] hover:text-[#F5F5F5] hover:border-white/20 transition-all"
                    >
                      <CopyIcon />
                      {copiedPromptId === activeData.id ? "Copié !" : "Copier"}
                    </button>
                  </div>
                  <div className="p-5 md:p-7">
                    <div className="prompt-display">
                      {activeData.prompt}
                    </div>
                  </div>
                </section>

                {/* Variables */}
                {activeData.variables.length > 0 && (
                  <section className="card-glass overflow-hidden mb-6">
                    <div className="px-5 py-3.5 border-b border-white/5">
                      <span className="text-xs font-semibold text-[#666666] uppercase tracking-wider">
                        Variables à compléter
                      </span>
                    </div>
                    <div className="divide-y divide-white/5">
                      {activeData.variables.map((v) => (
                        <div key={v.name} className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#E8FF8B]/10 text-[#E8FF8B] text-xs font-semibold shrink-0">
                            {v.name}
                          </span>
                          <span className="text-sm text-[#A3A3A3]">{v.desc}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Pro tip */}
                <section className="card-glass p-5 border-l-2 border-[#E8FF8B]/40 mb-6">
                  <p className="text-sm text-[#A3A3A3]">
                    <span className="text-[#E8FF8B] font-semibold">Pro tip </span>
                    {activeData.tip}
                  </p>
                </section>
              </div>
            ) : null}
          </main>
        </div>
      </div>

      {/* ── Bottom bar (unlocked users) ── */}
      {isUnlocked && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-[#141414]/80 backdrop-blur-xl border-t border-white/5 px-5 py-3" role="complementary">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-sm">
            <p className="text-[#A3A3A3]">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E8FF8B] animate-pulse mr-2" />
              Pack Système Discovery (templates, workflow, exemples réels) arrive bientôt.
            </p>
            <Link href="/pack-systeme-discovery" className="text-[#E8FF8B] text-xs font-semibold hover:underline underline-offset-2 shrink-0">
              En savoir plus
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
