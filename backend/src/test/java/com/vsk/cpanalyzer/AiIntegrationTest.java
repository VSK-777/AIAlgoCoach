package com.vsk.cpanalyzer;

import com.vsk.cpanalyzer.service.AiMentorService;
import com.vsk.cpanalyzer.controller.AiController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@ActiveProfiles("test")
@TestPropertySource(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;MODE=PostgreSQL",
    "spring.datasource.driverClassName=org.h2.Driver",
    "spring.datasource.username=sa",
    "spring.datasource.password=password",
    "spring.jpa.database-platform=org.hibernate.dialect.H2Dialect",
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "jwt.secret=mock-secret-key-that-is-at-least-256-bits-long-for-hmac",
    "spring.ai.openai.api-key=mock-groq-api-key",
    "spring.ai.openai.base-url=https://api.groq.com/openai/v1"
})
public class AiIntegrationTest {

    @org.springframework.boot.test.context.TestConfiguration
    static class Config {
        @org.springframework.context.annotation.Bean
        public com.fasterxml.jackson.databind.ObjectMapper objectMapper() {
            return new com.fasterxml.jackson.databind.ObjectMapper();
        }
    }

    @Autowired
    private AiMentorService aiMentorService;

    @Autowired
    private AiController aiController;

    @Test
    void testAiContextLoads() {
        // Evidence that Spring AI 2.0 configuration binds successfully and controllers/services load.
        assertThat(aiMentorService).isNotNull();
        assertThat(aiController).isNotNull();
    }
}
