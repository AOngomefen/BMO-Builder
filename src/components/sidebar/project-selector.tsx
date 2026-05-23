"use client";

import { useProjectStore } from "@/store/project-store";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, Plus, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function ProjectSelector() {
  const { projects, activeProjectId, addProject, setActiveProject } = useProjectStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const activeProject = projects.find((p) => p.id === activeProjectId);

  const handleCreate = () => {
    if (name.trim()) {
      addProject(name.trim(), description.trim());
      setName("");
      setDescription("");
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        Project
      </h3>

      {/* Selector button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 p-2 rounded-lg bg-bmo-green/5 hover:bg-bmo-green/10 transition-colors text-left"
      >
        <FolderOpen size={14} className="text-bmo-green flex-shrink-0" />
        <span className="text-xs text-bmo-dark truncate flex-1">
          {activeProject?.name || "No project selected"}
        </span>
        <ChevronDown size={12} className="text-gray-400" />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => {
                    setActiveProject(project.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2 text-xs hover:bg-bmo-green/5 transition-colors
                    ${project.id === activeProjectId ? "bg-bmo-green/10 text-bmo-teal" : "text-bmo-dark"}`}
                >
                  <div className="font-medium">{project.name}</div>
                  {project.description && (
                    <div className="text-gray-400 truncate">{project.description}</div>
                  )}
                </button>
              ))}

              <button
                onClick={() => {
                  setIsCreating(true);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 p-2 text-xs text-bmo-green hover:bg-bmo-green/5 border-t border-gray-100"
              >
                <Plus size={12} />
                New Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create project form */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 p-2 border border-bmo-green/20 rounded-lg bg-bmo-green/5">
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Project name"
                className="w-full text-xs px-2 py-1.5 rounded-md border border-gray-200 outline-none focus:border-bmo-green/50"
              />
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description"
                className="w-full text-xs px-2 py-1.5 rounded-md border border-gray-200 outline-none focus:border-bmo-green/50"
              />
              <div className="flex gap-1">
                <button
                  onClick={handleCreate}
                  className="flex-1 text-xs py-1 bg-bmo-green text-white rounded-md hover:bg-bmo-teal"
                >
                  Create
                </button>
                <button
                  onClick={() => setIsCreating(false)}
                  className="flex-1 text-xs py-1 text-gray-500 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
