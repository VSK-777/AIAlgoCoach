# Use Alpine Linux for a lightweight build and runtime
FROM eclipse-temurin:25-jdk-alpine AS build
WORKDIR /app

# Copy the maven wrapper and pom file to cache dependencies
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Grant execution rights to wrapper, fix potential CRLF line-ending issues on Windows, and download dependencies (offline cache)
RUN chmod +x ./mvnw && sed -i 's/\r$//' ./mvnw
RUN ./mvnw dependency:go-offline

# Copy the actual source code and build the JAR
COPY src src
RUN ./mvnw package -DskipTests

# Run stage
FROM amazoncorretto:25-alpine
WORKDIR /app

# Enterprise Security: Run as non-root user
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

COPY --from=build /app/target/cpanalyzer-0.0.1-SNAPSHOT.jar app.jar

# Render dynamic port binding (Render injects PORT env variable)
EXPOSE 8080

# Enterprise Performance: Container-aware JVM options
ENV JAVA_OPTS="-XX:MaxRAMPercentage=50.0 -XX:+UseSerialGC -Xss256k -XX:MaxMetaspaceSize=160m -XX:ReservedCodeCacheSize=64m -XX:+ExitOnOutOfMemoryError"

ENTRYPOINT sh -c "java $JAVA_OPTS -Dserver.port=${PORT:-8080} -jar app.jar"
