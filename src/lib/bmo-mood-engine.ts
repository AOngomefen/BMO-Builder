import { BmoMood, Task } from "./types";

export interface MoodContext {
  tasks: Task[];
  previousTaskCount?: number;
  previousDoneCount?: number;
}

export function computeTaskBasedMood(ctx: MoodContext): BmoMood {
  const total = ctx.tasks.length;
  const todo = ctx.tasks.filter((t) => t.status === "todo").length;
  const inProgress = ctx.tasks.filter((t) => t.status === "in_progress").length;
  const done = ctx.tasks.filter((t) => t.status === "done").length;
  const pending = todo + inProgress;

  const prevDone = ctx.previousDoneCount ?? 0;
  const justCompleted = done > prevDone;
  const allDone = total > 0 && pending === 0;

  if (allDone && total >= 3) {
    return "amazed";
  }

  if (justCompleted) {
    return "tired-happy";
  }

  if (pending >= 8) {
    return "talking-stressed";
  }

  if (pending >= 5) {
    return "talking-sad";
  }

  if (pending >= 3) {
    return "skeptical-stressed";
  }

  if (total === 0) {
    return "baseline-quiet-happy";
  }

  if (pending <= 2 && done > 0) {
    return "content";
  }

  return "baseline-quiet-happy";
}

export function getMoodForStreamingState(state: "streaming" | "submitted" | "ready" | "error"): BmoMood | null {
  switch (state) {
    case "streaming":
    case "submitted":
      return "talking-happy";
    case "error":
      return "talking-sad";
    default:
      return null;
  }
}

export function getMoodForUserMessage(tasks: Task[]): BmoMood {
  const pending = tasks.filter((t) => t.status !== "done").length;

  if (pending >= 5) {
    return "annoyed-skeptical";
  }

  return "baseline-quiet-happy";
}
