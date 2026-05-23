"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden my-2 bg-[#0d1117] border border-bmo-dark/20">
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-gray-700/50">
        <span className="text-xs text-gray-400 font-mono">{language || "code"}</span>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-white transition-colors p-1 rounded"
          aria-label="Copy code"
        >
          {copied ? <Check size={14} className="text-bmo-green" /> : <Copy size={14} />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-gray-200 font-mono leading-relaxed">{code}</code>
      </pre>
    </div>
  );
}
