import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText, type ModelMessage } from "ai";
import { buildSystemPrompt } from "@/lib/bmo-system-prompt";
import { Task, Project } from "@/lib/types";

export const runtime = "edge";

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "ANTHROPIC_API_KEY not configured. Add it to your .env.local file.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const body = await req.json();
  const { messages: rawMessages, tasks = [], activeProject = null } = body as {
    messages: Array<{ role: string; content: string }>;
    tasks: Task[];
    activeProject: Project | null;
  };

  const systemPrompt = buildSystemPrompt({ tasks, activeProject });

  const anthropic = createAnthropic({ apiKey });

  const messages: ModelMessage[] = rawMessages.map((m) => ({
    role: m.role as "user" | "assistant",
    content: m.content,
  }));

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system: systemPrompt,
    messages,
  });

  return result.toUIMessageStreamResponse();
}
