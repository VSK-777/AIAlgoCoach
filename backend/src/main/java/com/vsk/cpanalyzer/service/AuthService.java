package com.vsk.cpanalyzer.service;

import com.vsk.cpanalyzer.dto.AuthResponse;
import com.vsk.cpanalyzer.dto.LoginRequest;
import com.vsk.cpanalyzer.dto.RegisterRequest;
import com.vsk.cpanalyzer.dto.TokenRefreshRequest;
import com.vsk.cpanalyzer.model.Role;
import com.vsk.cpanalyzer.model.User;
import com.vsk.cpanalyzer.repository.UserRepository;
import com.vsk.cpanalyzer.security.JwtService;
import com.vsk.cpanalyzer.security.LoginAttemptService;
import com.vsk.cpanalyzer.security.XssUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final LoginAttemptService loginAttemptService;

    public AuthResponse register(RegisterRequest request) {
        logger.info("[DIAG] Step 1: register() entered");
        
        String safeUsername = XssUtils.sanitize(request.getUsername().trim());
        String safeHandle = XssUtils.sanitize(request.getCodeforcesHandle());
        logger.info("[DIAG] Step 2: XSS sanitized. username='{}', handle='{}'", safeUsername, safeHandle);

        if (userRepository.existsByUsername(safeUsername)) {
            logger.info("[DIAG] Step 3: username already exists, throwing");
            throw new RuntimeException("Registration failed: Invalid details");
        }
        logger.info("[DIAG] Step 3: existsByUsername passed (no duplicate)");

        logger.info("[DIAG] Step 4: encoding password");
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        logger.info("[DIAG] Step 4: password encoded successfully");

        var user = User.builder()
                .username(safeUsername)
                .password(encodedPassword)
                .codeforcesHandle(safeHandle)
                .role(Role.USER)
                .build();
        logger.info("[DIAG] Step 5: User entity built");
        
        logger.info("[DIAG] Step 6: calling userRepository.save()");
        userRepository.save(user);
        logger.info("[DIAG] Step 6: userRepository.save() completed successfully");

        logger.info("[DIAG] Step 7: generating JWT tokens");
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        logger.info("[DIAG] Step 7: JWT tokens generated successfully");

        return AuthResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .username(user.getUsername())
                .codeforcesHandle(user.getCodeforcesHandle())
                .build();
    }

    public AuthResponse authenticate(LoginRequest request, String ipAddress) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (Exception e) {
            logger.error("Authentication failed", e);
            loginAttemptService.loginFailed(ipAddress);
            throw new RuntimeException("Invalid username or password");
        }
        
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));
                
        loginAttemptService.loginSucceeded(ipAddress);

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        return AuthResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .username(user.getUsername())
                .codeforcesHandle(user.getCodeforcesHandle())
                .build();
    }

    public AuthResponse refreshToken(TokenRefreshRequest request) {
        String refreshToken = request.getRefreshToken();
        String username = jwtService.extractUsername(refreshToken);
        
        if (username != null) {
            var user = userRepository.findByUsername(username).orElseThrow();
            
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                return AuthResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .username(user.getUsername())
                        .codeforcesHandle(user.getCodeforcesHandle())
                        .build();
            }
        }
        throw new RuntimeException("Invalid refresh token");
    }
}