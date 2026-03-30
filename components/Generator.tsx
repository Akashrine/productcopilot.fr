"use client";

import { useState, useCallback } from "react";
import type { ToolConfig } from "@/lib/tool-config";
import { buildPrompt } from "@/lib/prompts";

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
      <path d="M9 9h9v11H9zM6 15H5a1 1 0 01-1-1V5a1 1 0 011-1h9a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Generator({ config }: { config: ToolConfig }) {
  const [input, setInput] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!input.trim()) return;
    const prompt = buildPrompt(config.slug, input.trim());
    if (prompt) setGeneratedPrompt(prompt);
  };

  const handleCopy = useCallback(() => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [generatedPrompt]);

  const charPct = Math.round((input.length / config.inputMaxLength) * 100);

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="card-glass overflow-hidden">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={config.inputPlaceholder}
          maxLength={config.inputMaxLength}
          rows={6}
          className="w-full p-5 bg-transparent text-[#F5F5F5] placeholder-text-tertiary text-sm leading-relaxed resize-y focus:outline-none"
        />
        <div className="flex items-center justify-between px-5 pb-3">
          <span className={`text-[10px] ${charPct > 90 ? "text-red-400" : "text-[#666666]"}`}>
            {input.length} / {config.inputMaxLength}
          </span>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={!input.trim()}
        className="btn-glow px-8 py-3.5 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] font-bold disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Générer le prompt
      </button>

      {/* Output */}
      {generatedPrompt && (
        <div className="space-y-4 animate-in">
          <div className="card-glass overflow-hidden">
            <div className="px-5 py-3.5 border-b border-white/5 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#666666]">Ton prompt est prêt</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 text-[#A3A3A3] hover:text-[#F5F5F5] hover:border-white/20 transition-all"
              >
                <CopyIcon />
                {copied ? "Copié !" : "Copier"}
              </button>
            </div>
            <div className="p-5 max-h-[400px] overflow-y-auto">
              <div className="prompt-display">{generatedPrompt}</div>
            </div>
          </div>

          <div className="card-glass p-5 border-l-2 border-[#E8FF8B]/40">
            <p className="text-xs font-semibold text-[#E8FF8B] mb-2">Comment utiliser ce prompt</p>
            <ol className="text-xs text-[#A3A3A3] space-y-1.5 list-decimal list-inside">
              <li>Copie le prompt ci-dessus</li>
              <li>Colle-le dans Claude, ChatGPT ou tout autre LLM</li>
              <li>Récupère tes user stories structurées, prêtes pour ton backlog</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
