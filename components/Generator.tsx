'use client'

import { useState, useCallback } from 'react'
import type { ToolConfig } from '@/lib/tool-config'
import { buildPrompt } from '@/lib/prompts'

export default function Generator({ config }: { config: ToolConfig }) {
  const [input, setInput] = useState('')
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    if (!input.trim()) return
    const prompt = buildPrompt(config.slug, input.trim())
    if (prompt) {
      setGeneratedPrompt(prompt)
    }
  }

  const handleCopy = useCallback(() => {
    if (!generatedPrompt) return
    navigator.clipboard.writeText(generatedPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }, [generatedPrompt])

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={config.inputPlaceholder}
          maxLength={config.inputMaxLength}
          rows={6}
          className="w-full p-4 rounded-xl bg-[#141414] border border-[#1F1F1F] text-[#F5F5F5] placeholder-[#555] text-sm leading-relaxed resize-y focus:outline-none focus:border-[#E8FF8B]/40 transition-colors"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] text-[#555]">
            {input.length} / {config.inputMaxLength}
          </span>
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={!input.trim()}
        className="px-8 py-4 rounded-md bg-[#E8FF8B] text-[#0F0F0F] font-bold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Générer le prompt
      </button>

      {/* Generated prompt output */}
      {generatedPrompt && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">
              Ton prompt est prêt
            </h3>
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-xs font-bold bg-[#1F1F1F] border border-[#333] rounded-md hover:border-[#E8FF8B] hover:text-[#E8FF8B] transition-colors"
            >
              {copied ? 'Copié !' : 'Copier le prompt'}
            </button>
          </div>

          <div className="relative">
            <pre className="p-5 rounded-xl bg-[#141414] border border-[#1F1F1F] text-sm text-[#A3A3A3] whitespace-pre-wrap leading-relaxed max-h-[400px] overflow-y-auto">
              {generatedPrompt}
            </pre>
          </div>

          <div className="p-4 rounded-xl bg-[#E8FF8B]/5 border border-[#E8FF8B]/20 space-y-2">
            <p className="text-sm text-[#E8FF8B] font-semibold">
              Comment utiliser ce prompt
            </p>
            <ol className="text-xs text-[#A3A3A3] space-y-1.5 list-decimal list-inside">
              <li>Copie le prompt ci-dessus</li>
              <li>Colle-le dans Claude, ChatGPT ou tout autre LLM</li>
              <li>Récupère tes user stories structurées, prêtes pour ton backlog</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}
