# AIAlgoCoach Backend API ⚙️

The backend architecture is built to be robust, secure, and highly scalable. It aggregates public data from Codeforces and bridges it with modern LLMs.

## 🛠️ Core Technologies

- **Spring Boot 3.5.x:** The core framework.
- **Java 21:** Utilizing modern features and LTS stability.
- **Spring Security 6:** Implementing a stateless, filter-chain-based security architecture.
- **JWT (JSON Web Tokens):** Secure session management with short-lived access tokens and long-lived refresh tokens.
- **Spring AI:** Abstraction layer used to seamlessly communicate with Groq's blazing-fast inference endpoints for Llama 3.
- **Spring Data JPA:** Hibernate-backed ORM for secure PostgreSQL transactions via Neon.

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
- **Password Protection:** Passwords are never stored in plaintext; they are salted and hashed using `BCryptPasswordEncoder`.
- **CORS Protection:** Cross-Origin Resource Sharing is strictly limited to the configured frontend domain via the `FRONTEND_URL` environment variable.
