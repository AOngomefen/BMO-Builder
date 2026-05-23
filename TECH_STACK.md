# BMO Builder — Technology Stack

---

## Frontend

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **Next.js 14** (App Router) | Server components, API routes, Vercel-native |
| Language | **TypeScript** | Type safety across calendar data, task models, API contracts |
| Styling | **Tailwind CSS** | Fast iteration; supports BMO's playful visual language |
| Component Library | **shadcn/ui** | Unstyled Radix primitives — fully customizable for BMO theme |
| Icons | **Lucide React** | Clean, consistent |
| Animations | **Framer Motion** | BMO avatar states, message transitions, task completion |
| Syntax Highlighting | **Shiki** | Code block rendering in BMO responses |
| State | **Zustand** | Chat state, active project, task list — lightweight and clean |

### BMO Design System
- **Color palette:** BMO green (`#78BCA8`), dark teal, warm off-white, soft amber accents
- **Personality:** Rounded corners everywhere, friendly typography, subtle pixel-art nods
- **Font pairing:** Outfit (display/headings) + JetBrains Mono (code)
- **BMO avatar:** Simple SVG face with mood states — idle, thinking, success, error

---

## AI Layer

| Component | Choice | Rationale |
|---|---|---|
| Model | **Claude Sonnet 4** | Best for coding tasks, long-context reasoning, instruction following |
| SDK | **Anthropic TypeScript SDK** | Official, streaming, tool use |
| Streaming | **Vercel AI SDK** (`useChat`) | Handles streaming UX, works with Anthropic natively |
| Persona | Custom system prompt | BMO voice, project awareness, calendar context injection |
| Tool Use | Anthropic function calling | Calendar operations, task creation, plan storage |
| Code Execution | **e2b.dev** sandboxes | Safe isolated runner for snippet evaluation |

### BMO System Prompt Architecture

```
[Identity]
You are BMO, a personal build assistant based on the Adventure Time character.
You are loyal, helpful, direct, and occasionally cheerful.
You never give vague answers — always suggest a concrete next step.

[Context injected per request]
- Active project: {name, description, current phase}
- Today's calendar: {summarized events, free blocks}
- Current task list: {pending tasks with priority}
- Conversation history: {last N turns}

[Capabilities]
- Writing and reviewing code
- Breaking goals into structured task lists
- Scheduling tasks into calendar free blocks
- Answering questions about builds and technical decisions
```

---

## Calendar Integration

| Component | Choice | Rationale |
|---|---|---|
| Auth | **NextAuth.js v5** | Google OAuth, token refresh, session management |
| Google Calendar | **Google APIs Node.js Client** | Official SDK, event CRUD |
| Outlook (Phase 6) | **Microsoft Graph API** | M365 calendar support |
| Free block detection | Custom algorithm | Scans events, identifies gaps ≥ 45 min, scores by time of day |
| Calendar UI | Custom sidebar component | Today's agenda + available blocks, linked to task list |

### Free Block Detection Algorithm

```typescript
function findFreeBlocks(events: CalendarEvent[], window: DateRange): TimeBlock[] {
  // 1. Sort events by start time
  // 2. Walk the window in 15-min increments
  // 3. Flag any gap >= 45 minutes as a free block
  // 4. Score each block: morning > afternoon > evening (configurable)
  // 5. Return top N blocks ranked by score + proximity to now
}
```

### Task Scheduling Algorithm

```typescript
function scheduleTasks(tasks: Task[], freeBlocks: TimeBlock[]): ScheduledPlan {
  // 1. Score tasks by: priority, estimated effort, deadline proximity
  // 2. Match tasks to blocks by effort fit (don't put a 3hr task in a 1hr slot)
  // 3. Prefer morning blocks for deep work (coding, design)
  // 4. Prefer afternoon blocks for lightweight tasks (reviews, planning)
  // 5. Return matched pairs + overflow list for next available day
}
```

---

## Backend / API

| Layer | Choice | Rationale |
|---|---|---|
| API Routes | **Next.js Route Handlers** | Co-located, no separate server |
| Database | **Supabase** (Postgres) | Auth, storage, DB in one; great free tier |
| ORM | **Drizzle ORM** | TypeScript-native, lightweight |
| Storage schema | Projects, Tasks, Sessions, Notes | See schema below |

### Core Data Schema

```sql
-- Projects
projects (id, user_id, name, description, status, created_at)

-- Tasks
tasks (id, project_id, title, estimated_hours, priority, status,
       scheduled_start, scheduled_end, completed_at)

-- Session memory
sessions (id, user_id, project_id, summary, last_active)

-- Notes / decisions
notes (id, project_id, content, created_at)
```

---

## Infrastructure

| Component | Choice | Rationale |
|---|---|---|
| Hosting | **Vercel** | Zero-config Next.js, preview URLs per branch |
| Secrets | Vercel env vars | Per-environment, secure |
| Monitoring | **Sentry** | Error tracking |
| CI/CD | Vercel auto-deploy (GitHub) | Push-to-deploy |

---

## UI Layout — Key Screens

```
┌─────────────────────────────────────────────────────┐
│  🎮 BMO Builder            [Project ▾]  [Calendar]  │
├──────────────────┬──────────────────────────────────┤
│                  │                                  │
│  BMO AVATAR      │   Chat window                    │
│  [mood state]    │                                  │
│                  │   [BMO response + code]          │
│  TODAY           │   [Streaming tokens...]          │
│  ─────────────   │                                  │
│  9am  Standup    │   [Input bar]                    │
│  Free 10–12pm    │   "Ask BMO anything..."          │
│  2pm  Design     │                                  │
│                  │                                  │
│  TASKS           │                                  │
│  ─────────────   │                                  │
│  ☐ Auth route    │                                  │
│  ☐ Landing page  │                                  │
│  ✓ DB schema     │                                  │
│                  │                                  │
│  [+ Add task]    │                                  │
└──────────────────┴──────────────────────────────────┘
```
```
[open source - bmo expressions] https://www.figma.com/design/ZVywdnjp2yzqib8Za2xd58/BMO-Face-Templates-Assets--Community-?node-id=47-107&t=Qe4Xoai6EUsuPnS9-1
```

---

## Dependency Summary

```json
{
  "dependencies": {
    "next": "^14",
    "react": "^18",
    "typescript": "^5",
    "@anthropic-ai/sdk": "latest",
    "ai": "latest",
    "next-auth": "^5",
    "googleapis": "latest",
    "drizzle-orm": "latest",
    "@supabase/supabase-js": "latest",
    "zustand": "latest",
    "framer-motion": "latest",
    "tailwindcss": "^3",
    "shiki": "latest",
    "lucide-react": "latest",
    "@e2b/code-interpreter": "latest"
  }
}
```

---

## Development Commands

```bash
npm run dev          # Start local dev server
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript strict check
npm run db:push      # Push Drizzle schema to Supabase
npm run db:studio    # Open Drizzle Studio (DB browser)
```

---

*Stack version: May 2026 — BMO is always watching your calendar.*
