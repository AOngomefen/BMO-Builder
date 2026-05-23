import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Project } from "@/lib/types";

interface ProjectState {
  projects: Project[];
  activeProjectId: string | null;
  addProject: (name: string, description: string) => void;
  setActiveProject: (id: string | null) => void;
  getActiveProject: () => Project | null;
  updateProject: (id: string, updates: Partial<Project>) => void;
}

function generateId(): string {
  return `proj-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: [],
      activeProjectId: null,

      addProject: (name, description) => {
        const project: Project = {
          id: generateId(),
          name,
          description,
          status: "active",
          createdAt: Date.now(),
          lastActive: Date.now(),
        };
        set((state) => ({
          projects: [...state.projects, project],
          activeProjectId: project.id,
        }));
      },

      setActiveProject: (id) => {
        set({ activeProjectId: id });
        if (id) {
          set((state) => ({
            projects: state.projects.map((p) =>
              p.id === id ? { ...p, lastActive: Date.now() } : p
            ),
          }));
        }
      },

      getActiveProject: () => {
        const state = get();
        return state.projects.find((p) => p.id === state.activeProjectId) ?? null;
      },

      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }));
      },
    }),
    { name: "bmo-projects" }
  )
);
