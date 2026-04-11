"use client";

import { useState, useCallback, useEffect } from "react";
import { buildPRDPrompt, PROMPT_SPLIT_MARKER, type PRDInputs } from "@/lib/prd-prompt-template";

const UNLOCK_KEY = "prd_tool_unlocked";

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
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

type FieldProps = {
  id: string;
  label: string;
  placeholder: string;
  helper?: string;
  required?: boolean;
  rows?: number;
  value: string;
  onChange: (v: string) => void;
};

function Field({ id, label, placeholder, helper, required, rows, value, onChange }: FieldProps) {
  const sharedClass =
    "w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl text-[#F5F5F5] placeholder:text-[#666666] text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#E8FF8B]/20 focus:border-[#E8FF8B]/40 transition-all resize-none";

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-[#F5F5F5]">
        {label}
        {required && <span className="text-[#E8FF8B] ml-1">*</span>}
      </label>
      {rows ? (
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={sharedClass}
        />
      ) : (
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={sharedClass}
        />
      )}
      {helper && <p className="text-xs text-[#666666]">{helper}</p>}
    </div>
  );
}

export default function PRDGenerator() {
  const [inputs, setInputs] = useState<PRDInputs>({
    nomInitiative: "",
    probleme: "",
    contexteProduit: "",
    hypotheseSolution: "",
    metriqueCible: "",
    contraintes: "",
    okrConcerne: "",
  });

  const [prompt, setPrompt] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [subError, setSubError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUnlocked(localStorage.getItem(UNLOCK_KEY) === "1");
    }
  }, []);

  const set = (key: keyof PRDInputs) => (v: string) =>
    setInputs((prev) => ({ ...prev, [key]: v }));

  const requiredFilled =
    inputs.nomInitiative.trim() &&
    inputs.probleme.trim() &&
    inputs.contexteProduit.trim() &&
    inputs.metriqueCible.trim();

  const handleGenerate = () => {
    if (!requiredFilled) return;
    const built = buildPRDPrompt(inputs);
    setPrompt(built);
    // Plausible
    if (typeof window !== "undefined" && (window as any).plausible) {
      (window as any).plausible("prd_tool_generate");
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubStatus("loading");
    try {
      const res = await fetch("/api/subscribe-pack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "template-prd-ia" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erreur lors de l'inscription.");
      }
      localStorage.setItem(UNLOCK_KEY, "1");
      setUnlocked(true);
      setSubStatus("success");
      // Plausible
      if (typeof window !== "undefined" && (window as any).plausible) {
        (window as any).plausible("prd_tool_email");
      }
    } catch (err: any) {
      setSubStatus("error");
      setSubError(err.message || "Impossible de s'inscrire pour le moment.");
    }
  };

  const handleCopy = useCallback(() => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    // Plausible
    if (typeof window !== "undefined" && (window as any).plausible) {
      (window as any).plausible("prd_tool_copy");
    }
  }, [prompt]);

  // Split prompt for preview/gate
  const splitIdx = prompt?.indexOf(PROMPT_SPLIT_MARKER) ?? -1;
  const previewPart = splitIdx > -1 ? prompt!.slice(0, splitIdx).trimEnd() : prompt ?? "";
  const gatedPart = splitIdx > -1 ? prompt!.slice(splitIdx) : "";

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="card-glass p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field
            id="nom-initiative"
            label="Nom de l'initiative"
            placeholder="Ex: Refonte onboarding mobile"
            required
            value={inputs.nomInitiative}
            onChange={set("nomInitiative")}
          />
          <Field
            id="contexte-produit"
            label="Contexte produit"
            placeholder="Ex: App mobile B2C, 50k MAU, product-led growth"
            helper="Type de produit, taille de la base, modèle de croissance."
            required
            value={inputs.contexteProduit}
            onChange={set("contexteProduit")}
          />
        </div>

        <Field
          id="probleme"
          label="Quel problème utilisateur tu résous ?"
          placeholder="Ex: 62% des nouveaux utilisateurs abandonnent le onboarding avant l'étape 3"
          helper="Sois précis. Ajoute des données si tu en as."
          required
          rows={3}
          value={inputs.probleme}
          onChange={set("probleme")}
        />

        <Field
          id="hypothese-solution"
          label="Quelle solution tu envisages ?"
          placeholder="Ex: Réduire le onboarding de 5 étapes à 2 en supprimant la personnalisation"
          helper="La direction, pas le détail. Si tu ne sais pas encore, écris 'à explorer'."
          rows={3}
          value={inputs.hypotheseSolution ?? ""}
          onChange={set("hypotheseSolution")}
        />

        <Field
          id="metrique-cible"
          label="Quelle métrique tu veux bouger ?"
          placeholder="Ex: Taux de complétion onboarding, activation J+7"
          helper="Le KPI principal que cette initiative doit impacter."
          required
          value={inputs.metriqueCible}
          onChange={set("metriqueCible")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field
            id="contraintes"
            label="Contraintes connues"
            placeholder="Ex: Pas de refonte backend, deadline fin Q2"
            helper="Contraintes techniques, temporelles, business. Laisse vide si aucune."
            rows={2}
            value={inputs.contraintes ?? ""}
            onChange={set("contraintes")}
          />
          <Field
            id="okr-concerne"
            label="OKR ou objectif trimestriel concerné"
            placeholder="Ex: O: Améliorer l'activation / KR: +15pts onboarding"
            helper="Laisse vide si tu n'as pas d'OKRs formalisés."
            rows={2}
            value={inputs.okrConcerne ?? ""}
            onChange={set("okrConcerne")}
          />
        </div>

        <div className="pt-2">
          <button
            onClick={handleGenerate}
            disabled={!requiredFilled}
            className="btn-glow px-8 py-3.5 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] font-bold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Générer le prompt
          </button>
          <p className="mt-2 text-xs text-[#666666]">Champs marqués * obligatoires</p>
        </div>
      </div>

      {/* Output */}
      {prompt && (
        <div className="space-y-4 animate-in">
          <div className="card-glass overflow-hidden">
            <div className="px-5 py-3.5 border-b border-white/5 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#666666]">Ton prompt est prêt</span>
              {unlocked && (
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 text-[#A3A3A3] hover:text-[#F5F5F5] hover:border-white/20 transition-all"
                >
                  <CopyIcon />
                  {copied ? "Copié !" : "Copier"}
                </button>
              )}
            </div>

            {/* Preview part — always visible */}
            <div className="p-5">
              <div className="prompt-display">{previewPart}</div>
            </div>

            {/* Gated part */}
            {gatedPart && (
              <div className="relative">
                {unlocked ? (
                  <div className="px-5 pb-5">
                    <div className="prompt-display">{gatedPart}</div>
                  </div>
                ) : (
                  <>
                    {/* Blurred preview */}
                    <div className="px-5 pb-5 select-none pointer-events-none blur-sm opacity-60 max-h-48 overflow-hidden">
                      <div className="prompt-display">{gatedPart}</div>
                    </div>

                    {/* Email gate overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/90 to-transparent">
                      <div className="w-full max-w-sm px-6 py-6 text-center">
                        <p className="text-sm font-semibold mb-1">
                          Le prompt est personnalisé avec tes données.
                        </p>
                        <p className="text-xs text-[#A3A3A3] mb-5">
                          Entre ton email pour voir la structure complète.
                        </p>
                        {subStatus === "success" ? (
                          <p className="text-[#E8FF8B] text-sm font-medium">
                            C&apos;est noté. Prompt débloqué.
                          </p>
                        ) : (
                          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                            <input
                              type="email"
                              placeholder="ton@email.com"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              disabled={subStatus === "loading"}
                              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl text-[#F5F5F5] placeholder:text-[#666666] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8FF8B]/20 focus:border-[#E8FF8B]/40 transition-all"
                            />
                            <button
                              type="submit"
                              disabled={subStatus === "loading"}
                              className="btn-glow w-full px-6 py-3 bg-[#E8FF8B] text-[#0F0F0F] font-bold rounded-xl text-sm disabled:opacity-50"
                            >
                              {subStatus === "loading" ? "..." : "Voir le prompt complet"}
                            </button>
                            {subStatus === "error" && (
                              <p className="text-red-400 text-xs">{subError}</p>
                            )}
                          </form>
                        )}
                        <p className="mt-3 text-[10px] text-[#666666]">
                          Pas de spam. Tu peux te désinscrire à tout moment.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {unlocked && (
            <div className="card-glass p-5 border-l-2 border-[#E8FF8B]/40">
              <p className="text-xs font-semibold text-[#E8FF8B] mb-2">Comment utiliser ce prompt</p>
              <ol className="text-xs text-[#A3A3A3] space-y-1.5 list-decimal list-inside">
                <li>Copie le prompt ci-dessus</li>
                <li>Colle-le dans Claude, ChatGPT ou tout autre LLM</li>
                <li>Récupère ton PRD structuré en 7 sections, prêt à partager</li>
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
