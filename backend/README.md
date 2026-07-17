# AIAlgoCoach Backend API ⚙️

<div align="center">
  <h2>🌟 Live Demo: <a href="https://ai-algo-coach.vercel.app/" target="_blank">https://ai-algo-coach.vercel.app/</a> 🌟</h2>
</div>

The backend architecture is built to be robust, secure, and highly scalable. It aggregates public data from Codeforces and bridges it with modern LLMs.

## 🚀 Capabilities

- **Codeforces Data Aggregation:** Fetches thousands of user submissions asynchronously and aggregates them into statistical models (heatmaps, topic distributions).
- **Prompt Engineering Engine:** Serializes massive amounts of structured user analytics into highly-optimized Markdown structures to feed into LLMs for perfect context.
- **Groq LLM Integration:** Uses the Spring AI Framework to interact with Groq's high-speed inference engine (`llama-3.1-8b-instant`), acting as a dynamic algorithm coach.
- **Stateless JWT Security:** Generates short-lived access tokens and long-lived refresh tokens, eliminating server-side session memory.
- **Strict Exception Handling:** Ensures stack traces are never exposed to the frontend, gracefully failing while logging structured JSON payloads locally on AWS CloudWatch.

## 🛠️ Core Technologies

- **Spring Boot 4.1.x:** The core framework.
- **Java 25 LTS:** Utilizing modern features and LTS stability.
- **Spring Security 7.x:** Implementing a stateless, filter-chain-based security architecture.
- **JWT (JSON Web Tokens):** Secure session management with short-lived access tokens and long-lived refresh tokens.
- **Spring AI:** Abstraction layer used to seamlessly communicate with Groq's blazing-fast inference endpoints for Llama 3.
- **Spring Data JPA:** Hibernate-backed ORM for secure PostgreSQL transactions via Neon.
- **Flyway:** Automated database schema migrations ensuring production-safe rollouts.
- **Caffeine Cache:** High-performance, low-latency caching engine utilized for robust rate limiting.

## 📁 Architectural Layout

```
src/main/java/com/vsk/cpanalyzer/
├── config/         # CORS configurations, Bean definitions, Security filter chains
├── controller/     # RESTful boundaries (Auth, Analytics, AI)
├── dto/            # Immutable Data Transfer Objects for Codeforces API mapping
├── integration/    # RestTemplate wrappers for external services
├── model/          # JPA Entities mapping to PostgreSQL tables
├── repository/     # JpaRepository interfaces
├── security/       # JWT Generation, Validation, and Authentication Filters
└── service/        # Core business logic
```

## 🧠 Business Logic Deep Dive

### 1. The Analytics Engine (`AnalyticsService`)
When a user requests their dashboard, the backend makes multiple asynchronous calls to the Codeforces API. It fetches their profile, full submission history (which can be thousands of records), and rating changes. The service then aggregates this raw data:
- It smartly groups raw compiler strings (e.g., `GNU C11`, `Clang++20`) into base languages.
- It parses epoch timestamps to build the heatmap grid.
- It calculates win/loss ratios based on Codeforces verdicts (`OK`, `TIME_LIMIT_EXCEEDED`).

### 2. The AI Mentor (`AiMentorService`)
This service acts as the bridge between the Analytics Engine and the LLM. 
- When generating a roadmap, it stringifies the user's `AnalyticsDTO` and injects it into a strict system prompt, forcing the LLM to provide tailored advice.
- When chatting, it maintains a sliding-window conversational memory alongside the user's live analytics.

## 🔒 Security Posture

- **Stateless Authentication:** No session state is held on the server. All requests must carry a valid `Authorization: Bearer <token>` header.
- **Password Protection:** Passwords are never stored in plaintext; they are salted and hashed using `BCryptPasswordEncoder` (Strength: 12).
- **CORS Protection:** Cross-Origin Resource Sharing is strictly limited to the configured frontend domain via the `FRONTEND_URL` environment variable.
- **Rate Limiting (Bucket4j + Caffeine):** Interceptors restrict AI endpoints (10 requests/min per user) and IP-based filters lock out brute-force login attempts (5 fails / 15 minutes) using high-speed eviction caches.
- **Data Integrity & XSS:** All user inputs are sanitized against Cross-Site Scripting (XSS) using the `OWASP Java HTML Sanitizer` before hitting the PostgreSQL database.
- **Security Headers:** Enforced `Content-Security-Policy`, `X-Frame-Options` (DENY), and masked generic server errors to prevent information disclosure.

---

<div align="center">
  <p>Part of the <b>AIAlgoCoach</b> Platform.</p>
  <a href="../README.md">Return to Root Directory</a>
</div>
