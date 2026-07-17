package com.vsk.cpanalyzer;

import com.vsk.cpanalyzer.dto.LoginRequest;
import com.vsk.cpanalyzer.dto.RegisterRequest;
import com.vsk.cpanalyzer.dto.AuthResponse;
import com.vsk.cpanalyzer.model.User;
import com.vsk.cpanalyzer.repository.UserRepository;
import com.vsk.cpanalyzer.service.AuthService;
import com.vsk.cpanalyzer.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@TestPropertySource(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;MODE=PostgreSQL",
    "spring.datasource.driverClassName=org.h2.Driver",
    "spring.datasource.username=sa",
    "spring.datasource.password=password",
    "spring.jpa.database-platform=org.hibernate.dialect.H2Dialect",
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "jwt.secret=mock-secret-key-that-is-at-least-256-bits-long-for-hmac",
    "jwt.access-token-expiration=3600000",
    "jwt.refresh-token-expiration=86400000"
})
public class JwtAuthIntegrationTest {

    @org.springframework.boot.test.context.TestConfiguration
    static class Config {
        @org.springframework.context.annotation.Bean
        public tools.jackson.databind.ObjectMapper objectMapper() {
            return new tools.jackson.databind.ObjectMapper();
        }
    }

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @Test
    void testAuthenticationFlow() {
        // 1. Register
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setUsername("testuser_jwt");
        registerRequest.setPassword("password123");
        registerRequest.setCodeforcesHandle("tourist");

        AuthResponse registerResult = authService.register(registerRequest);
        
        assertThat(registerResult).isNotNull();
        assertThat(registerResult.getAccessToken()).isNotNull();
        assertThat(registerResult.getRefreshToken()).isNotNull();

        // Verify the user exists in DB
        User savedUser = userRepository.findByUsername("testuser_jwt").orElseThrow();
        assertThat(savedUser.getCodeforcesHandle()).isEqualTo("tourist");

        // 2. Validate Token natively via Auth0 Java JWT (done inside JwtService)
        boolean isAccessTokenValid = jwtService.isTokenValid(registerResult.getAccessToken(), savedUser);
        assertThat(isAccessTokenValid).isTrue();

        // 3. Login
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("testuser_jwt");
        loginRequest.setPassword("password123");

        AuthResponse loginResult = authService.authenticate(loginRequest, "127.0.0.1");
        assertThat(loginResult).isNotNull();
        assertThat(loginResult.getAccessToken()).isNotNull();
        
        // 4. Refresh Token Logic Verification
        boolean isRefreshTokenValid = jwtService.isTokenValid(loginResult.getRefreshToken(), savedUser);
        assertThat(isRefreshTokenValid).isTrue();
    }
}
