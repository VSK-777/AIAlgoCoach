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
- **Java 21+** (OpenJDK or Oracle)
- **Node.js 18+** & NPM
- **MySQL 8.0+**
- **Groq API Key** (Get one at [console.groq.com](https://console.groq.com))

---

## 🛠️ Phase 1: Database Initialization

AIAlgoCoach uses MySQL for persistent user storage.

1. Open your MySQL CLI or preferred GUI (e.g., MySQL Workbench).
2. Execute the following to provision the database:
   ```sql
   CREATE DATABASE IF NOT EXISTS cpanalyzer;
   ```
3. The Spring Boot backend expects the default credentials (`root` / `root`). If your production database uses different credentials, you will inject them via Environment Variables in Phase 2.

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

### Production Deployment (Docker / VPS)
To deploy the backend to a production server (like AWS EC2, DigitalOcean, or Heroku):
1. Package the application into an executable JAR:
   ```bash
   ./mvnw clean package -DskipTests
   ```
2. Run the compiled JAR, injecting production credentials via environment variables:
   ```bash
   export SPRING_DATASOURCE_URL=jdbc:mysql://prod-db-host:3306/cpanalyzer
   export SPRING_DATASOURCE_USERNAME=prod_user
   export SPRING_DATASOURCE_PASSWORD=prod_secure_password
   export JWT_SECRET=your_long_secure_jwt_secret_key
   export SPRING_AI_OPENAI_API_KEY=your_groq_api_key
   
   java -jar target/cpanalyzer-0.0.1-SNAPSHOT.jar
   ```

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

### Production Deployment (Vercel, Netlify, Nginx)
1. Configure your API base URL. If your backend is deployed at `https://api.aialgocoach.com`, update `src/api/axiosConfig.js`:
   ```javascript
   baseURL: 'https://api.aialgocoach.com/api'
   ```
2. Build the static assets:
   ```bash
   npm run build
   ```
3. The `dist/` directory will be generated. Upload these static files to your CDN, Vercel, Netlify, or serve them via Nginx. If using Nginx, ensure you configure URL rewriting for React Router:
   ```nginx
   location / {
        # This is CRITICAL for React Router to work!
        try_files $uri $uri/ /index.html;
    }
   ```

*For deeper frontend configurations, read [frontend/HELP.md](./frontend/HELP.md).*

---

## 👨‍💻 About the Developer

**VAJJHA SAI KRISHNA**  
*Computer Science Engineering Student & Aspiring Java Full Stack Developer with AI Integration*

Passionate about developing futuristic AI assistants, scalable software systems, and modern full-stack applications using professional software engineering principles. Focused on building scalable AI-powered full-stack applications and futuristic intelligent systems.

- **Current Focus:** Full Stack Java Development, AI Engineering, Spring Boot Microservices, React Development, and Intelligent AI Systems.
- **Skills:** Java, Spring Boot, React, REST APIs, MySQL, JWT Authentication, Microservices, AI Integration, LangChain4j, Gemini API, Groq API, and Data Structures & Algorithms.
