import { create } from "zustand";
import { BmoMood } from "@/lib/types";

interface ChatState {
  mood: BmoMood;
  isStreaming: boolean;
  sessionStarted: number;
  setMood: (mood: BmoMood) => void;
  setStreaming: (streaming: boolean) => void;
}

export const useChatStore = create<ChatState>()((set) => ({
  mood: "greeting",
  isStreaming: false,
  sessionStarted: Date.now(),

  setMood: (mood) => set({ mood }),
  setStreaming: (isStreaming) => set({ isStreaming }),
}));
