export type BmoMood = "idle" | "thinking" | "success" | "error" | "greeting";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
  tasks?: Task[];
}

export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  estimatedHours?: number;
  projectId?: string;
  createdAt: number;
  completedAt?: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "completed";
  createdAt: number;
  lastActive: number;
}

export interface SessionMemory {
  projectId: string;
  summary: string;
  lastActive: number;
}

export interface TimeBlock {
  start: Date;
  end: Date;
  duration: number;
  score: number;
}
