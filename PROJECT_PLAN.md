# BMO Builder — Project Plan

## Vision

A personal AI sidekick that knows what you're building, when you're free, and what needs to happen next. BMO Builder should feel like the most organized, helpful version of a co-founder who lives in your browser — one with a cheerful green face and zero judgment about how many tabs you have open.

---

## North Star Goal

A user opens BMO Builder and within 5 minutes can:
1. Tell BMO what they're working on
2. Get a structured task list
3. Have those tasks scheduled into their real calendar
4. Ask a coding question and get a useful answer

---

## Phase 1 — Foundation (Weeks 1–2)

**Goal:** Working chat interface with BMO's personality and Claude under the hood.

### Deliverables
- Next.js 14 project scaffolded (App Router, TypeScript)
- Chat UI: message thread, streaming responses, code block rendering
- Claude API connected via Anthropic SDK + Vercel AI SDK
- BMO system prompt: persona, tone, capabilities defined
- Streaming response rendering
- Deployed to Vercel (dev URL)

### BMO Persona Prompt Notes
BMO should:
- Use "I" naturally, not robotically
- Be encouraging but not sycophantic
- Reference ongoing projects when relevant
- Occasionally use short BMO-isms ("Beep boop, got it!", "On it!")
- Never be vague — always suggest a concrete next step

### Success Criteria
- User can have a real coding conversation with BMO
- Responses feel like BMO, not like a generic chatbot

---

## Phase 2 — Calendar Integration (Weeks 3–4)

**Goal:** BMO knows your schedule and can reason about your time.

### Deliverables
- Google OAuth 2.0 sign-in (NextAuth.js v5)
- Read upcoming events for the next 7–14 days
- Calendar context injected into BMO's system prompt (summarized, not raw)
- Free block detection: identify slots ≥ 45 minutes
- Natural language schedule queries: "What does my week look like?"
- Basic event creation: "Block 2 hours tomorrow morning for the login page"
- Calendar sidebar: today's agenda + free blocks at a glance

### Success Criteria
- BMO can answer schedule-aware questions accurately
- At least one calendar event can be created from chat

---

## Phase 3 — Task & Plan Organizer (Weeks 5–6)

**Goal:** BMO can turn a vague goal into a structured, scheduled plan.

### Deliverables
- "Plan mode" — describe a project, get a task breakdown
- Task list UI: todo / in-progress / done status
- Tasks mapped to calendar free blocks automatically
- Persistent storage (Supabase) for plans and task state
- Plan revision: "I lost 2 days this week, reprioritize"
- Daily briefing: morning summary of today's tasks + agenda

### Success Criteria
- A full project plan generated and scheduled in under 2 minutes
- Task status persists across sessions

---

## Phase 4 — Project Memory (Weeks 7–8)

**Goal:** BMO remembers what you're working on between sessions.

### Deliverables
- Project profiles: name, description, current phase, linked tasks
- BMO surfaces relevant project context in responses automatically
- "Last session" summary on open: "Welcome back! You were working on the auth flow."
- Notes and decisions stored per project
- User can create multiple active projects and switch between them

### Success Criteria
- BMO can answer "where did I leave off on X?" accurately
- Context is maintained across at least 10 separate sessions

---

## Phase 5 — Code Agent Enhancements (Weeks 9–10)

**Goal:** Upgrade the coding side so BMO can handle real dev work.

### Deliverables
- File/code upload for review and debugging
- Code execution sandbox (e2b.dev) for snippet testing
- Multi-file context: paste multiple files for BMO to reason across
- Stack recommender: "What should I use to build X?"
- PR-style review: paste a diff, BMO gives structured feedback

### Success Criteria
- BMO can debug a real bug from pasted code
- Stack recommendations include rationale, not just a list

---

## Phase 6 — Polish & Beta (Weeks 11–12)

**Goal:** Usable by someone who didn't build it.

### Deliverables
- Onboarding flow: connect calendar, create first project, meet BMO
- Mobile-responsive UI
- Outlook / Microsoft 365 calendar support
- Settings: BMO tone, calendar accounts, notification preferences
- BMO avatar with simple mood states (thinking, done, error)
- Public beta link

---

## Risks & Mitigations

| Risk | Level | Mitigation |
|---|---|---|
| Google OAuth complexity | Medium | Use NextAuth.js v5 to abstract token lifecycle |
| Calendar context overloading tokens | Low | Summarize events before injecting; cap to 7-day window |
| Scope creep (it's fun to add features) | High | Ship each phase before opening the next one |
| BMO persona feeling forced | Medium | Tune system prompt iteratively; keep it subtle, not constant |
| Code sandbox security | High | Use e2b.dev isolated containers — never eval() directly |

---

## MVP Definition

BMO Builder MVP ships when a user can:
1. Sign in and connect Google Calendar
2. Create a project and get a task list from a natural language description
3. Have tasks auto-scheduled into available calendar slots
4. Ask BMO a coding question and get a genuinely useful answer
5. Return the next day and have BMO know where they left off

---

*Last updated: May 2026*
