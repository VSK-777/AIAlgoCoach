# AIAlgoCoach 🚀

<div align="center">
  <img src="https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java"/>
  <img src="https://img.shields.io/badge/Spring_Boot-3.5-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot"/>
  <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render"/>
</div>

<br />

AIAlgoCoach is a full-stack AI-powered Competitive Programming Analytics and Mentoring Platform. Inspired by LeetCode, Codeforces visualizers, and premium SaaS dashboards, it provides deep analytics and personalized AI mentorship to accelerate algorithmic problem-solving skills.

---

## 📚 Project Documentation

To dive into the specific codebases, please navigate to the respective documentation files below:

* 🟢 **[Frontend Documentation (React/Vite) ➔](./frontend/README.md)**
* 🔵 **[Backend Documentation (Spring Boot/Java) ➔](./backend/README.md)**
* 🚀 **[Master Setup & Deployment Guide ➔](./HELP.md)**

---

## 🎯 Project Goals

Built as a strong student developer portfolio project to demonstrate professional software engineering standards:
* Clean GitHub repository
* Proper README
* Good project structure
* Working deployment
* Modern tech stack
* Clear documentation

---

## 🌟 Platform Highlights

### 📊 Comprehensive Dashboard
- **Rating Progression:** Visualize your Codeforces rating history over time.
- **Topic Mastery:** Identify your strengths across core subjects (DP, Graphs, Math) using dynamic radar charts.
- **Difficulty Distribution:** Break down your solved problems by Codeforces rating tiers (Easy, Medium, Hard).
- **Activity Heatmap:** A pixel-perfect, GitHub-style contribution graph mapping your daily submission frequency.

### 📈 Advanced Analytics
- **Global Success Rate:** Track your overall submission acceptance rate.
- **Language Preferences:** Discover your most utilized programming languages with smart-grouping.
- **Verdict Distribution:** Analyze your error trends (WA, TLE, MLE) via interactive bar charts.
- **Comprehensive Tag Mastery:** A deep dive into your top 15 most frequently solved algorithmic tags.

### 🧠 AI Mentorship Engine
- **Automated Roadmaps:** Leverages **Groq's Llama 3 70B** to generate personalized practice strategies by analyzing your weakest topics.
- **Context-Aware Chat:** Engage with an interactive AI mentor that retains your live Codeforces analytics as conversational memory.

### 🔒 Enterprise-Grade Security
- **Rate Limiting & Anti-Brute Force:** Dynamic API quotas via Bucket4j, and strict IP-based lockouts protecting authentication endpoints.
- **Hardened Infrastructure:** Custom Content-Security-Policy (CSP), strict XSS sanitization, and BCrypt level-12 password hashing.

---

## 🏗️ Architecture (Decoupled Full-Stack)

AIAlgoCoach uses a **Decoupled Deployment Architecture**. The React frontend is independently deployed on **Vercel**, while the Spring Boot backend runs as a Dockerized service on **Render**, connected to a managed **Neon PostgreSQL** database.

```mermaid
graph LR
    A[React/Vite on Vercel] <-->|REST + JWT| B(Spring Boot on Render)
    B <-->|Aggregates Data| C[Codeforces Public API]
    B <-->|Mentorship Prompts| D[Groq AI / Llama 3]
    B <-->|Persists Users| E[(Neon PostgreSQL)]
```

### Components
1. **[Backend API](./backend/README.md):** Java 21 & Spring Boot, Dockerized and deployed on Render. Powers the data aggregation engine, Security (JWT/BCrypt), and Spring AI integrations.
2. **[Frontend SPA](./frontend/README.md):** React & Vite, deployed on Vercel. Features a premium glassmorphism aesthetic, responsive Tailwind layouts, and Recharts data visualizations.
3. **Database:** Neon PostgreSQL (serverless, managed).

---

## 🚀 Deployment & Getting Started

If you are a developer looking to build, test, or deploy this application, please refer to the primary setup guide:

👉 **[Read the Master Setup & Deployment Guide (HELP.md)](./HELP.md)**

---

## 👨‍💻 About the Developer

**VAJJHA SAI KRISHNA**  
*Computer Science Engineering Student & Aspiring Java Full Stack Developer with AI Integration*

Passionate about developing futuristic AI assistants, scalable software systems, and modern full-stack applications using professional software engineering principles. Focused on building scalable AI-powered full-stack applications and futuristic intelligent systems.

- **Current Focus:** Full Stack Java Development, AI Engineering, Spring Boot Microservices, React Development, and Intelligent AI Systems.
- **Skills:** Java, Spring Boot, React, REST APIs, PostgreSQL, JWT Authentication, Docker, AI Integration, Groq API, Vercel, Render, and Data Structures & Algorithms.
