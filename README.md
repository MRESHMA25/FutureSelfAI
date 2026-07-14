# FutureSelfAI 🤖

FutureSelfAI is an AI-powered reflection and planning agent designed to help users take small, consistent steps toward their goals.

Instead of overwhelming users with long questionnaires, FutureSelfAI guides them through a short interactive check-in, identifies common challenges, and generates a personalized action plan using Google's Gemini API.

The project combines a clean user experience with practical AI integration, focusing on making self-reflection simple, actionable, and engaging.

---

# ✨ Features

- Guided 3-step reflection process
- Personalized AI-generated action plans
- Interactive 7-day goal tracker
- Reflection history with persistent memory
- Progress tracking between check-ins
- Goal-specific challenge recommendations
- Responsive interface for desktop and mobile
- Secure backend API integration
- SQLite-based local memory
- Copyable reflection summaries

---

# 🛠️ Tech Stack

### Frontend

- HTML
- CSS
- JavaScript

### Backend

- Python
- Flask

### AI

- Google Gemini API

### Database

- SQLite

### Other

- REST API
- JSON
- Local Storage
- Python Dotenv

---

# 🧠 How It Works

1. Choose a goal category.
2. Select the challenges you're currently facing.
3. Choose the qualities you'd like your future self to have.
4. FutureSelfAI analyzes your inputs using Gemini.
5. The agent generates:
   - Mindset score
   - Current pattern
   - Personalized insights
   - Three immediate actions
   - Interactive 7-day action plan
6. Each reflection is stored locally, allowing the agent to recognize patterns and adapt future responses.

---

# 🏗️ Architecture

```
User
   │
   ▼
Interactive Wizard
   │
   ▼
JavaScript
   │
   ▼
Flask Backend
   │
   ▼
Gemini API
   │
   ▼
Structured JSON Response
   │
   ▼
SQLite Memory
   │
   ▼
Interactive Dashboard
```

---

# 🚀 Project Highlights

This project allowed me to explore:

- Prompt engineering
- AI-assisted application development
- Full-stack web development
- Flask API development
- Gemini API integration
- Database design with SQLite
- State management
- Responsive UI/UX design
- Secure API key management
- Building an AI agent with persistent memory

---

# 🔒 Security

- API keys are stored using environment variables.
- Sensitive files are excluded from GitHub using `.gitignore`.
- Gemini API requests are processed entirely on the backend.
- User input is validated before being sent to the AI model.

---

# 🚀 Development Journey

FutureSelfAI was developed iteratively, with each phase introducing new capabilities while improving both the user experience and the underlying AI architecture.

### Phase 1 · AI Reflection Assistant

The project began as a simple AI-powered reflection tool.

**Completed**

- Designed a responsive Flask web application
- Integrated Google's Gemini API
- Created a secure backend API architecture
- Generated personalized AI reflections
- Managed API keys using environment variables
- Implemented frontend-backend communication using Fetch API

---

### Phase 2 · Guided User Experience

After testing the first version, I redesigned the interface to reduce user effort and make the experience more intuitive.

**Completed**

- Replaced long text forms with a guided three-step workflow
- Added goal-specific recommendations
- Introduced interactive selection cards and chips
- Generated structured AI responses instead of long paragraphs
- Built a responsive dashboard with summary cards
- Created an interactive seven-day action plan
- Added loading states, validation, and improved user feedback

---

### Phase 3 · AI Agent

The final phase transformed the application from a reflection tool into an AI agent with memory and adaptive recommendations.

**Completed**

- Added persistent reflection memory using SQLite
- Stored previous reflections locally
- Enabled the AI to reference recent user history
- Added mindset scoring and progress tracking
- Built reflection history with browser-based user identification
- Added clear-history functionality
- Created reusable backend services for future expansion

---

### Future Roadmap

Future versions will continue expanding the agent with additional capabilities.

**Planned**

- User authentication
- Cloud database support
- Cross-device synchronization
- Goal analytics and visual progress tracking
- Calendar integration
- Habit streaks
- Reminder notifications
- Multi-goal planning
- Voice interaction
- Exportable progress reports

---

FutureSelfAI continues to evolve as I explore AI engineering, full-stack development, and practical ways of combining large language models with structured software systems.

© 2026 Reshma Sri Murakonda
