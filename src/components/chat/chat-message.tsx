"use client";

import { motion } from "framer-motion";
import BmoAvatar from "@/components/bmo-avatar";
import CodeBlock from "./code-block";
import { User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

interface ParsedSegment {
  type: "text" | "code" | "bmo-tasks";
  content: string;
  language?: string;
}

function parseContent(content: string): ParsedSegment[] {
  const segments: ParsedSegment[] = [];
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", content: content.slice(lastIndex, match.index) });
    }

    const lang = match[1];
    const code = match[2].trim();

    if (lang === "bmo-tasks") {
      segments.push({ type: "bmo-tasks", content: code });
    } else {
      segments.push({ type: "code", content: code, language: lang || undefined });
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    segments.push({ type: "text", content: content.slice(lastIndex) });
  }

  return segments;
}

function TextSegment({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="prose prose-sm max-w-none">
      {lines.map((line, i) => {
        if (line.startsWith("### ")) {
          return <h3 key={i} className="text-sm font-semibold text-bmo-dark mt-3 mb-1">{line.slice(4)}</h3>;
        }
        if (line.startsWith("## ")) {
          return <h2 key={i} className="text-base font-bold text-bmo-dark mt-3 mb-1">{line.slice(3)}</h2>;
        }
        if (line.startsWith("- ") || line.startsWith("* ")) {
          return (
            <div key={i} className="flex gap-2 ml-2">
              <span className="text-bmo-green font-bold">-</span>
              <span>{renderInlineFormatting(line.slice(2))}</span>
            </div>
          );
        }
        if (/^\d+\.\s/.test(line)) {
          const num = line.match(/^(\d+)\.\s/)?.[1];
          return (
            <div key={i} className="flex gap-2 ml-2">
              <span className="text-bmo-green font-bold">{num}.</span>
              <span>{renderInlineFormatting(line.replace(/^\d+\.\s/, ""))}</span>
            </div>
          );
        }
        if (line.trim() === "") {
          return <div key={i} className="h-2" />;
        }
        return <p key={i} className="leading-relaxed">{renderInlineFormatting(line)}</p>;
      })}
    </div>
  );
}

function renderInlineFormatting(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="px-1.5 py-0.5 bg-bmo-dark/10 rounded text-sm font-mono text-bmo-teal">
          {part.slice(1, -1)}
        </code>
      );
    }
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((bp, j) => {
      if (bp.startsWith("**") && bp.endsWith("**")) {
        return <strong key={`${i}-${j}`}>{bp.slice(2, -2)}</strong>;
      }
      return bp;
    });
  });
}

export default function ChatMessage({ role, content, isStreaming }: ChatMessageProps) {
  const isUser = role === "user";
  const segments = parseContent(content);

  return (
    <motion.div
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} mb-4`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 mt-1">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-bmo-amber/20 flex items-center justify-center">
            <User size={16} className="text-bmo-amber" />
          </div>
        ) : (
          <div className="w-8 h-8">
            <BmoAvatar mood={isStreaming ? "thinking" : "idle"} size={32} />
          </div>
        )}
      </div>

      {/* Message bubble */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-bmo-green text-white rounded-tr-sm"
            : "bg-white border border-gray-200 text-bmo-dark rounded-tl-sm shadow-sm"
        }`}
      >
        {segments.map((segment, i) => {
          if (segment.type === "code") {
            return <CodeBlock key={i} code={segment.content} language={segment.language} />;
          }
          if (segment.type === "bmo-tasks") {
            return null; // Tasks are extracted and shown in sidebar
          }
          return <TextSegment key={i} text={segment.content} />;
        })}
        {isStreaming && (
          <motion.span
            className="inline-block w-2 h-4 bg-bmo-green/60 rounded-sm ml-1"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
}
