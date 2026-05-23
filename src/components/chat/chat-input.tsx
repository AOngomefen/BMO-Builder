"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const QUICK_PROMPTS = [
  "Help me plan a new project",
  "What should I work on next?",
  "Review my task list",
  "Break this down into steps",
];

export default function ChatInput({ onSend, disabled, placeholder }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [showPrompts, setShowPrompts] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
    setShowPrompts(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative">
      {/* Quick prompts */}
      {showPrompts && !input && (
        <motion.div
          className="absolute bottom-full mb-2 left-0 right-0 flex flex-wrap gap-2 p-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => {
                setInput(prompt);
                setShowPrompts(false);
                textareaRef.current?.focus();
              }}
              className="px-3 py-1.5 text-xs rounded-full bg-bmo-green/10 text-bmo-teal
                         hover:bg-bmo-green/20 transition-colors border border-bmo-green/20"
            >
              {prompt}
            </button>
          ))}
        </motion.div>
      )}

      <div className="flex items-end gap-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-2 focus-within:border-bmo-green/50 focus-within:ring-2 focus-within:ring-bmo-green/20 transition-all">
        <button
          onClick={() => setShowPrompts(!showPrompts)}
          className="p-2 text-gray-400 hover:text-bmo-green transition-colors rounded-lg hover:bg-bmo-green/10"
          title="Quick prompts"
        >
          <Sparkles size={18} />
        </button>

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Ask BMO anything..."}
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none bg-transparent outline-none text-sm text-bmo-dark placeholder:text-gray-400 py-2 max-h-[120px]"
        />

        <button
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          className="p-2 rounded-xl bg-bmo-green text-white disabled:opacity-40 disabled:cursor-not-allowed
                     hover:bg-bmo-teal transition-colors"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
