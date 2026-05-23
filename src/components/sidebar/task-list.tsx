"use client";

import { useTaskStore } from "@/store/task-store";
import { TaskStatus, TaskPriority } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Clock,
  Trash2,
  Plus,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const PRIORITY_COLORS: Record<TaskPriority, string> = {
  high: "text-red-400",
  medium: "text-bmo-amber",
  low: "text-gray-400",
};

const STATUS_ICONS: Record<TaskStatus, typeof Circle> = {
  todo: Circle,
  in_progress: Clock,
  done: CheckCircle2,
};

function TaskItem({
  id,
  title,
  status,
  priority,
}: {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
}) {
  const { updateTaskStatus, removeTask } = useTaskStore();
  const Icon = STATUS_ICONS[status];

  const nextStatus: Record<TaskStatus, TaskStatus> = {
    todo: "in_progress",
    in_progress: "done",
    done: "todo",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className={`group flex items-start gap-2 p-2 rounded-lg hover:bg-bmo-green/5 transition-colors
        ${status === "done" ? "opacity-60" : ""}`}
    >
      <button
        onClick={() => updateTaskStatus(id, nextStatus[status])}
        className="mt-0.5 flex-shrink-0"
      >
        <Icon
          size={16}
          className={
            status === "done"
              ? "text-bmo-green"
              : status === "in_progress"
              ? "text-bmo-amber"
              : "text-gray-400"
          }
        />
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`text-xs leading-relaxed ${
            status === "done" ? "line-through text-gray-400" : "text-bmo-dark"
          }`}
        >
          {title}
        </p>
        <span className={`text-[10px] ${PRIORITY_COLORS[priority]}`}>
          {priority}
        </span>
      </div>

      <button
        onClick={() => removeTask(id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
      >
        <Trash2 size={12} className="text-gray-400 hover:text-red-400" />
      </button>
    </motion.div>
  );
}

export default function TaskList() {
  const { tasks, addTask, clearCompleted } = useTaskStore();
  const [newTask, setNewTask] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress");
  const doneTasks = tasks.filter((t) => t.status === "done");

  const handleAdd = () => {
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask("");
      setIsAdding(false);
    }
  };

  const sections = [
    { key: "in_progress", label: "In Progress", tasks: inProgressTasks, color: "text-bmo-amber" },
    { key: "todo", label: "To Do", tasks: todoTasks, color: "text-gray-500" },
    { key: "done", label: "Done", tasks: doneTasks, color: "text-bmo-green" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Tasks
        </h3>
        <div className="flex gap-1">
          {doneTasks.length > 0 && (
            <button
              onClick={clearCompleted}
              className="text-[10px] text-gray-400 hover:text-red-400 transition-colors"
            >
              Clear done
            </button>
          )}
          <button
            onClick={() => setIsAdding(true)}
            className="p-1 rounded-md hover:bg-bmo-green/10 transition-colors"
          >
            <Plus size={14} className="text-bmo-green" />
          </button>
        </div>
      </div>

      {/* Add task input */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex gap-1">
              <input
                autoFocus
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAdd();
                  if (e.key === "Escape") setIsAdding(false);
                }}
                placeholder="New task..."
                className="flex-1 text-xs px-2 py-1.5 rounded-lg border border-gray-200 outline-none focus:border-bmo-green/50"
              />
              <button
                onClick={handleAdd}
                className="px-2 py-1 text-xs bg-bmo-green text-white rounded-lg hover:bg-bmo-teal"
              >
                Add
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {tasks.length === 0 && (
        <p className="text-xs text-gray-400 text-center py-4">
          No tasks yet. Ask BMO to help plan something!
        </p>
      )}

      {/* Task sections */}
      {sections.map(
        (section) =>
          section.tasks.length > 0 && (
            <div key={section.key}>
              <button
                onClick={() =>
                  setCollapsed((p) => ({ ...p, [section.key]: !p[section.key] }))
                }
                className={`flex items-center gap-1 text-[10px] font-medium ${section.color} mb-1`}
              >
                {collapsed[section.key] ? (
                  <ChevronRight size={10} />
                ) : (
                  <ChevronDown size={10} />
                )}
                {section.label} ({section.tasks.length})
              </button>

              <AnimatePresence>
                {!collapsed[section.key] &&
                  section.tasks.map((task) => (
                    <TaskItem key={task.id} {...task} />
                  ))}
              </AnimatePresence>
            </div>
          )
      )}
    </div>
  );
}
