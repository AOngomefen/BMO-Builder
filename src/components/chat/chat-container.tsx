"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ChatMessage from "./chat-message";
import ChatInput from "./chat-input";
import { useChatStore } from "@/store/chat-store";
import { useTaskStore } from "@/store/task-store";
import { useProjectStore } from "@/store/project-store";
import { TaskPriority } from "@/lib/types";
import { motion } from "framer-motion";
import BmoAvatar from "@/components/bmo-avatar";
import { computeTaskBasedMood } from "@/lib/bmo-mood-engine";

function getTextContent(parts: Array<{ type: string; text?: string }>): string {
  return parts
    .filter((p) => p.type === "text" && p.text)
    .map((p) => p.text)
    .join("");
}

function extractBmoTasks(content: string): Array<{ title: string; priority: TaskPriority; estimatedHours?: number }> | null {
  const match = content.match(/```bmo-tasks\n([\s\S]*?)```/);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

export default function ChatContainer() {
  const { setMood, setStreaming } = useChatStore();
  const { addTasksFromAI, tasks } = useTaskStore();
  const { getActiveProject } = useProjectStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [processedIds, setProcessedIds] = useState<Set<string>>(new Set());
  const prevDoneCountRef = useRef(0);

  const transport = new DefaultChatTransport({
    api: "/api/chat",
    body: {
      tasks,
      activeProject: getActiveProject(),
    },
  });

  const { messages, status, sendMessage } = useChat({
    transport,
    onError: () => {
      setMood("talking-sad");
      setStreaming(false);
      setTimeout(() => {
        const mood = computeTaskBasedMood({ tasks, previousDoneCount: prevDoneCountRef.current });
        setMood(mood);
      }, 3000);
    },
  });

  const isActive = status === "streaming" || status === "submitted";

  useEffect(() => {
    if (status === "streaming") {
      setMood("talking-happy");
      setStreaming(true);
    } else if (status === "ready") {
      setStreaming(false);
      const lastMsg = messages[messages.length - 1];
      if (lastMsg && lastMsg.role === "assistant" && !processedIds.has(lastMsg.id)) {
        setMood("content");
        const text = getTextContent(lastMsg.parts);
        const aiTasks = extractBmoTasks(text);
        if (aiTasks && aiTasks.length > 0) {
          addTasksFromAI(aiTasks);
        }
        setProcessedIds((prev) => new Set(prev).add(lastMsg.id));

        setTimeout(() => {
          const doneCount = tasks.filter((t) => t.status === "done").length;
          const mood = computeTaskBasedMood({ tasks, previousDoneCount: prevDoneCountRef.current });
          prevDoneCountRef.current = doneCount;
          setMood(mood);
        }, 2000);
      }
    }
  }, [status, messages, processedIds, setMood, setStreaming, addTasksFromAI, tasks]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const doneCount = tasks.filter((t) => t.status === "done").length;
    const mood = computeTaskBasedMood({
      tasks,
      previousDoneCount: prevDoneCountRef.current,
    });
    prevDoneCountRef.current = doneCount;
    if (!isActive) {
      setMood(mood);
    }
  }, [tasks, isActive, setMood]);

  const handleSend = useCallback(
    (text: string) => {
      sendMessage({ text });
    },
    [sendMessage]
  );

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {!hasMessages && (
          <motion.div
            className="flex flex-col items-center justify-center h-full gap-4 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BmoAvatar mood="baseline-quiet-happy" size={140} />
            <div className="space-y-2 max-w-md">
              <h2 className="text-2xl font-bold text-bmo-dark">
                Hey! I&apos;m BMO!
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                I&apos;m your personal build assistant. Tell me what you&apos;re working on
                and I&apos;ll help you plan, build, and stay on track. Beep boop!
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {[
                  "I need to build a landing page",
                  "Help me plan my week",
                  "Debug my React component",
                  "What should I work on?",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="px-3 py-2 text-xs rounded-xl bg-bmo-green/10 text-bmo-teal
                               hover:bg-bmo-green/20 border border-bmo-green/20 transition-all
                               hover:scale-105"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {messages.map((m) => {
          const text = getTextContent(m.parts);
          const isStreamingMsg =
            isActive &&
            m.id === messages[messages.length - 1]?.id &&
            m.role === "assistant";

          return (
            <ChatMessage
              key={m.id}
              role={m.role as "user" | "assistant"}
              content={text}
              isStreaming={isStreamingMsg}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-100 p-4 bg-white/80 backdrop-blur-sm">
        <ChatInput
          onSend={handleSend}
          disabled={isActive}
          placeholder={isActive ? "BMO is thinking..." : "Ask BMO anything..."}
        />
      </div>
    </div>
  );
}
