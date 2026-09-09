# 🤖 Coding Cira — Sparks Curiosity ✨

> A modern, interactive, and gamified coding platform designed to make learning programming fun, rewarding, and engaging for students!

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Google Gemini](https://img.shields.io/badge/Google%20GenAI-Gemini%20API-orange?style=for-the-badge&logo=google)](https://ai.google.dev/)

---

## 🌟 Features

### 1. 📖 Study Notes ("Learn" Mode)
- In-depth, beginner-friendly concept explanations for every track.
- Code reference blocks and key takeaways.
- **Reading Timer**: Encourages focused reading with a countdown timer.
- **Coin Rewards**: Claim bonus coins upon finishing study sessions.

### 2. ⚡ Hands-On Coding Challenges ("Practice" Mode)
- Bite-sized interactive code editor / fill-in exercises.
- **Live Terminal Simulation**: Realistic terminal output (e.g., `$ gcc`, `$ g++`, `$ python3`) simulating compile and execution outputs.
- Celebratory victory confetti and badge awards on completion.

### 3. 🤖 Tutor Cira (AI Assistant)
- Real-time AI tutor powered by **Google Gemini** (`@google/genai`).
- Socratic learning methodology: gives gentle hints and conceptual analogies rather than direct answers.
- Quick prompt chips for fast help: *"💡 Give me a hint"*, *"👶 Explain simply"*, etc.
- Seamless offline heuristic engine when no API key is present.

### 4. 🪙 Gamification & Audio Feedback
- **Persistent State**: Coins, streaks, badges, and progress saved in `localStorage`.
- **Synthesized 8-Bit Web Audio**: Pure Web Audio API sound effects (coin dings, fanfare, clicks, errors) without external MP3 dependencies.
- **Achievement Badges**: Master of C, C++ Architect, Snake Charmer, and AI Pioneer.

### 5. 🚀 Future Roadmap ("Coming Soon")
- Upcoming courses in **Java**, **JavaScript**, **Rust**, **SQL & Databases**, and **Advanced AI Models**.
- Interactive status notifications.

---

## 🗺️ Learning Tracks

| Track | Route | Concepts Covered | Badges Unlocked |
| :--- | :--- | :--- | :--- |
| **Basics of C** | `/levels/c` | `printf` formatted I/O, `int` variables, `if` conditionals | 🚀 Master of C |
| **Basics of C++** | `/levels/cpp` | `std::cout` streams, OOP `class` blueprints, method calls `.` | 🏛️ C++ Architect |
| **Python Basics** | `/levels/python` | Clean `print()`, list iterations `for`, functions `def` | 🐍 Snake Charmer |
| **Basics of AI** | `/levels/ai` | Prompt engineering, training datasets, neural network weights | 🧠 AI Pioneer |

---

## 🛠️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Sauravkm217/Coding-Cira.git
cd Coding-Cira
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables (Optional)
Create a `.env.local` file in the project root:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(If omitted, Tutor Cira will seamlessly operate in intelligent offline mode!)*

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
Coding-Cira/
├── app/
│   ├── api/chat/route.ts      # Google Gemini API AI Tutor endpoint
│   ├── learn/[track]/page.tsx # Study notes & reading timer
│   ├── levels/                # Interactive track challenges (c, cpp, python, ai)
│   ├── globals.css            # Duolingo-style theme, animations, terminal styles
│   ├── layout.tsx             # Root layout with GamificationProvider & Navbar
│   └── page.tsx               # Main dashboard with tracks & roadmap
├── components/
│   ├── AiTutor.tsx            # Floating AI tutor chat interface
│   ├── Confetti.tsx           # Celebration confetti animation
│   ├── GamificationContext.tsx# Persistent game state & Web Audio synthesizer
│   └── Navbar.tsx             # Top navigation with live stats & settings
├── data/
│   ├── notes.ts               # Track study notes content
│   └── roadmap.ts             # Upcoming courses & features
├── .env.example               # Example environment variable template
└── tsconfig.json              # TypeScript configuration
```

---

## 📜 License
ISC © Sauravkm217
