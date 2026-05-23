"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BmoAvatar from "@/components/bmo-avatar";
import TaskList from "./task-list";
import ProjectSelector from "./project-selector";
import { useChatStore } from "@/store/chat-store";
import { useTaskStore } from "@/store/task-store";
import { PanelLeftClose, PanelLeft, Zap } from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { mood } = useChatStore();
  const { tasks } = useTaskStore();

  const todoCount = tasks.filter((t) => t.status === "todo").length;
  const inProgressCount = tasks.filter((t) => t.status === "in_progress").length;
  const doneCount = tasks.filter((t) => t.status === "done").length;

  if (collapsed) {
    return (
      <motion.div
        className="w-14 bg-white border-r border-gray-100 flex flex-col items-center py-4 gap-4"
        initial={{ width: 280 }}
        animate={{ width: 56 }}
        transition={{ duration: 0.2 }}
      >
        <button onClick={() => setCollapsed(false)} className="p-1 hover:bg-gray-100 rounded-lg">
          <PanelLeft size={18} className="text-gray-500" />
        </button>
        <div className="w-10 h-10">
          <BmoAvatar mood={mood} size={40} />
        </div>
        {(todoCount + inProgressCount) > 0 && (
          <div className="w-6 h-6 rounded-full bg-bmo-green/10 flex items-center justify-center">
            <span className="text-[10px] font-bold text-bmo-green">{todoCount + inProgressCount}</span>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-[280px] bg-white border-r border-gray-100 flex flex-col overflow-hidden"
      initial={{ width: 56 }}
      animate={{ width: 280 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-bmo-green" />
            <h1 className="text-sm font-bold text-bmo-dark">BMO Builder</h1>
          </div>
          <button onClick={() => setCollapsed(true)} className="p-1 hover:bg-gray-100 rounded-lg">
            <PanelLeftClose size={16} className="text-gray-400" />
          </button>
        </div>

        {/* BMO Avatar */}
        <div className="flex justify-center py-2">
          <BmoAvatar mood={mood} size={80} />
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-4 mt-2">
          <div className="text-center">
            <div className="text-lg font-bold text-bmo-dark">{todoCount}</div>
            <div className="text-[10px] text-gray-400">To Do</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-bmo-amber">{inProgressCount}</div>
            <div className="text-[10px] text-gray-400">Active</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-bmo-green">{doneCount}</div>
            <div className="text-[10px] text-gray-400">Done</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <ProjectSelector />
        <TaskList />
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100 text-center">
        <p className="text-[10px] text-gray-400">
          Powered by Claude + Next.js
        </p>
      </div>
    </motion.div>
  );
}
