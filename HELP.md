# Master Setup & Deployment Guide

This document provides exhaustive instructions for setting up AIAlgoCoach for local development and preparing it for deployment.

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

## 📋 System Prerequisites

Ensure the following runtimes and services are available on your host machine:
- **Java 25+** (OpenJDK or Oracle)
- **Node.js 20+** & NPM
- **PostgreSQL** (local instance for development, or use a Neon serverless database)
- **Groq API Key** (Get one at [console.groq.com](https://console.groq.com))

---

## 🛠️ Phase 1: Database Setup

AIAlgoCoach uses PostgreSQL for persistent user storage.

### Option A: Local PostgreSQL
1. Install PostgreSQL locally and start the service.
2. Create the database:
   ```sql
   CREATE DATABASE cpanalyzer;
   ```
3. Set the environment variables before running the backend:
   ```bash
   export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/cpanalyzer
   export DB_USERNAME=postgres
   export DB_PASSWORD=your_local_password
   ```

### Option B: Neon PostgreSQL (Recommended for Production)
1. Create a free database at [neon.tech](https://neon.tech).
2. Copy the JDBC connection string from your Neon dashboard.
3. Set it as `SPRING_DATASOURCE_URL` in your Render environment variables.

---

## ⚙️ Phase 2: Backend Development & Production

The backend is a Spring Boot application using Maven.

### Local Development
1. Navigate to the backend directory: `cd backend`
2. Start the server using the Maven Wrapper:
   ```bash
   # Windows
   .\mvnw spring-boot:run -Dspring-boot.run.arguments="--spring.ai.openai.api-key=YOUR_GROQ_KEY"
   
   # Unix/Mac
   ./mvnw spring-boot:run -Dspring-boot.run.arguments="--spring.ai.openai.api-key=YOUR_GROQ_KEY"
   ```
3. The API will be exposed at `http://localhost:8080/api`.

### Production Deployment (Docker on Render)
The backend is containerized using Docker and deployed on Render.

1. The `Dockerfile` in the `backend/` directory handles the entire build process.
2. On Render, create a **Web Service** pointing to the `backend/Dockerfile`.
3. Configure the following environment variables on the Render dashboard:

| Variable | Description |
|---|---|
| `SPRING_DATASOURCE_URL` | Neon PostgreSQL JDBC connection URL |
| `DB_USERNAME` | Neon PostgreSQL username |
| `DB_PASSWORD` | Neon PostgreSQL password |
| `JWT_SECRET` | Secure 256-bit secret for JWT signing |
| `GROQ_API_KEY` | Groq AI API key |
| `FRONTEND_URL` | Your Vercel frontend URL (e.g., `https://aialgocoach.vercel.app`) |

*For deeper backend configurations, read [backend/HELP.md](./backend/HELP.md).*

---

## 🎨 Phase 3: Frontend Development & Production

The frontend is a React Single Page Application (SPA) bundled by Vite.

### Local Development
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Hot-Module Replacement (HMR) dev server:
   ```bash
   npm run dev
   ```
4. Access the UI at `http://localhost:5173`.

### Production Deployment (Vercel)
1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Set the **Root Directory** to `frontend`.
4. Set the **Build Command** to `npm run build`.
5. Set the **Output Directory** to `dist`.
6. Add the environment variable `VITE_API_URL` pointing to your Render backend (e.g., `https://aialgocoach-backend.onrender.com/api`).
7. Deploy!

*For deeper frontend configurations, read [frontend/HELP.md](./frontend/HELP.md).*

---

## 👨‍💻 About the Developer

**VAJJHA SAI KRISHNA**  
*Computer Science Engineering Student & Aspiring Java Full Stack Developer with AI Integration*

Passionate about developing futuristic AI assistants, scalable software systems, and modern full-stack applications using professional software engineering principles. Focused on building scalable AI-powered full-stack applications and futuristic intelligent systems.

- **Current Focus:** Full Stack Java Development, AI Engineering, Spring Boot Microservices, React Development, and Intelligent AI Systems.
- **Skills:** Java, Spring Boot, React, REST APIs, PostgreSQL, JWT Authentication, Docker, AI Integration, Groq API, Vercel, Render, and Data Structures & Algorithms.
