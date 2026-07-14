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

# 📸 Preview

### Guided Reflection

<p align="center">
<img src="assets/screenshots/home.png" width="850">
</p>

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

# 📈 Future Improvements

- User authentication
- Cloud database support
- Weekly progress reports
- Visual analytics dashboard
- Multi-goal tracking
- Calendar integration
- Email reminders
- Habit streaks
- Voice interaction

---

# 👩‍💻 About This Project

FutureSelfAI was built as a learning project to explore how modern AI models can be combined with traditional full-stack development to create practical, user-focused applications.

Rather than acting as a simple chatbot, the goal was to build an AI agent capable of remembering previous reflections, recognizing patterns, and generating structured, actionable guidance that evolves over time.

This project reflects my growing interest in Artificial Intelligence, backend development, and building technology that is both technically interesting and genuinely useful.

---

© 2026 Reshma Sri Murakonda
