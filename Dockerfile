# Stage 1: Build React Frontend
FROM node:22-alpine AS frontend-build
WORKDIR /frontend

# Install dependencies first for caching
COPY frontend/package*.json ./
RUN npm install

# Build the React app
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Spring Boot Backend
FROM eclipse-temurin:21-jdk-alpine AS backend-build
WORKDIR /backend

# Cache maven dependencies
COPY backend/mvnw .
COPY backend/.mvn .mvn
COPY backend/pom.xml .
RUN chmod +x ./mvnw && sed -i 's/\r$//' ./mvnw
RUN ./mvnw dependency:go-offline

# Copy backend source
COPY backend/src src

# Copy compiled React frontend into Spring Boot's static resources folder
COPY --from=frontend-build /frontend/dist src/main/resources/static

# Build the final JAR
RUN ./mvnw package -DskipTests

# Stage 3: Run the Application
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=backend-build /backend/target/cpanalyzer-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-Dserver.port=${PORT:8080}", "-jar", "app.jar"]
