package com.vsk.cpanalyzer.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vsk.cpanalyzer.dto.ErrorResponseDTO;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.Duration;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;

@Component
@RequiredArgsConstructor
public class AiRateLimitInterceptor implements HandlerInterceptor {

    private final ObjectMapper objectMapper;
    private final Cache<String, Bucket> cache = Caffeine.newBuilder()
            .expireAfterAccess(Duration.ofMinutes(10))
            .maximumSize(10000)
            .build();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String username = request.getUserPrincipal() != null ? request.getUserPrincipal().getName() : null;
        
        if (username == null) {
            return true; // Let security handle unauthenticated access
        }

        Bucket bucket = cache.get(username, this::createNewBucket);

        if (bucket.tryConsume(1)) {
            return true;
        } else {
            ErrorResponseDTO errorResponse = new ErrorResponseDTO(
                    "AI rate limit exceeded. Maximum 10 requests per minute.",
                    HttpStatus.TOO_MANY_REQUESTS.value(),
                    false
            );
            
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setContentType("application/json");
            response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
            return false;
        }
    }

    private Bucket createNewBucket(String key) {
        // 10 requests per minute
        Bandwidth limit = Bandwidth.classic(10, Refill.greedy(10, Duration.ofMinutes(1)));
        return Bucket.builder().addLimit(limit).build();
    }
}
