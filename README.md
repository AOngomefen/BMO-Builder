# 🎮 BMO Builder

> *"I am BMO! I help you build things and remember stuff!"*

Your personal AI assistant for coding, planning, and making sure you actually do the things you said you'd do — built around the Adventure Time character BMO.

---

## What is BMO Builder?

BMO Builder is a personal AI agent designed to be your loyal sidekick for building projects and managing your life. It combines:

- **AI coding assistant** — write, debug, review, and explain code in plain language
- **Personal advisor** — help you think through decisions, plans, and priorities
- **Task & time organizer** — breaks your goals into tasks and schedules them around your real calendar
- **Calendar awareness** — reads your Google/Outlook calendar so BMO always knows what time you actually have

BMO isn't just a chatbot. It knows your projects, your schedule, and what you've been putting off.

---

## Core Features

### 🛠 Build Mode
- Generate boilerplate, components, and scripts from natural language
- Debug and explain code with clear, friendly output
- Review your work and suggest next steps
- "BMO, finish the auth route I started yesterday"

### 🗓 Plan Organizer
- Turn a vague idea into a structured task list
- Automatically schedule tasks into your available calendar slots
- Track what's done, what's in progress, and what you're avoiding
- Daily briefings: "Here's what you have today, here's what I think you should tackle first"

### ⏰ Time Delegation
- Connect Google Calendar or Outlook
- BMO identifies your free blocks and maps tasks to them
- Create, move, and manage calendar events from chat
- "Block me 2 hours tomorrow for the landing page, BMO"

### 💬 Personal Assistant
- Remember your ongoing projects and context across sessions
- Help you think through trade-offs and decisions
- Honest, friendly pushback when your plan doesn't make sense
- Keeps a running log of your builds and goals

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/bmo-builder
cd bmo-builder

# 2. Install dependencies
npm install

# 3. Set environment variables
cp .env.example .env
# Add your Anthropic API key and calendar OAuth credentials

# 4. Run the dev server
npm run dev
```

Open `http://localhost:3000` — BMO is ready.

---

## Environment Variables

```env
ANTHROPIC_API_KEY=your_key_here
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Project Status

Early-stage prototype — actively building.

- [x] Project scaffolding
- [x] Core chat UI
- [ ] Claude API + BMO persona prompt
- [ ] Google Calendar OAuth
- [ ] Task organizer + plan storage
- [ ] Calendar-aware scheduling
- [ ] Daily briefing feature
- [ ] Project memory across sessions
- [ ] Outlook support
- [ ] Mobile UI

---

## The BMO Vibe

BMO Builder takes personality cues from the Adventure Time character: helpful, a little silly, deeply loyal, and surprisingly wise. The assistant should feel like a companion, not a tool. Responses are friendly and direct. It celebrates your wins and gently nudges you when you're off track.

> *"You said you'd finish the dashboard by Friday. It's Thursday. Want me to block your evening?"*

---

## License

MIT — see `LICENSE` for details.

---

*Built with Claude (Anthropic), Next.js, and the belief that your personal assistant should have a face and a personality.*
