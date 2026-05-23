import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task, TaskStatus, TaskPriority } from "@/lib/types";

interface TaskState {
  tasks: Task[];
  addTask: (title: string, priority?: TaskPriority, estimatedHours?: number, projectId?: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  removeTask: (id: string) => void;
  addTasksFromAI: (tasks: Array<{ title: string; priority: TaskPriority; estimatedHours?: number }>) => void;
  getTasksByStatus: (status: TaskStatus) => Task[];
  clearCompleted: () => void;
}

function generateId(): string {
  return `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (title, priority = "medium", estimatedHours, projectId) => {
        const task: Task = {
          id: generateId(),
          title,
          status: "todo",
          priority,
          estimatedHours,
          projectId,
          createdAt: Date.now(),
        };
        set((state) => ({ tasks: [...state.tasks, task] }));
      },

      updateTaskStatus: (id, status) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? { ...t, status, completedAt: status === "done" ? Date.now() : undefined }
              : t
          ),
        }));
      },

      removeTask: (id) => {
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
      },

      addTasksFromAI: (aiTasks) => {
        const newTasks: Task[] = aiTasks.map((t) => ({
          id: generateId(),
          title: t.title,
          status: "todo" as TaskStatus,
          priority: t.priority,
          estimatedHours: t.estimatedHours,
          createdAt: Date.now(),
        }));
        set((state) => ({ tasks: [...state.tasks, ...newTasks] }));
      },

      getTasksByStatus: (status) => {
        return get().tasks.filter((t) => t.status === status);
      },

      clearCompleted: () => {
        set((state) => ({ tasks: state.tasks.filter((t) => t.status !== "done") }));
      },
    }),
    { name: "bmo-tasks" }
  )
);
