package com.vsk.cpanalyzer.service;

import com.vsk.cpanalyzer.dto.AuthResponse;
import com.vsk.cpanalyzer.dto.LoginRequest;
import com.vsk.cpanalyzer.dto.RegisterRequest;
import com.vsk.cpanalyzer.dto.TokenRefreshRequest;
import com.vsk.cpanalyzer.model.Role;
import com.vsk.cpanalyzer.model.User;
import com.vsk.cpanalyzer.repository.UserRepository;
import com.vsk.cpanalyzer.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        var user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .codeforcesHandle(request.getCodeforcesHandle())
                .role(Role.USER)
                .build();
        
        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        return AuthResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .username(user.getUsername())
                .codeforcesHandle(user.getCodeforcesHandle())
                .build();
    }

    public AuthResponse authenticate(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow();
                
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