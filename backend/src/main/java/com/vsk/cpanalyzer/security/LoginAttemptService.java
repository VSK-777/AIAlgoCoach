package com.vsk.cpanalyzer.security;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
public class LoginAttemptService {

    private final int MAX_ATTEMPT = 5;
    private final int LOCK_TIME_MINUTES = 15;

    private final Cache<String, Integer> attemptsCache = Caffeine.newBuilder()
            .expireAfterWrite(Duration.ofHours(1))
            .maximumSize(10000)
            .build();

    private final Cache<String, LocalDateTime> lockCache = Caffeine.newBuilder()
            .expireAfterWrite(Duration.ofMinutes(LOCK_TIME_MINUTES))
            .maximumSize(10000)
            .build();

    public void loginSucceeded(String key) {
        attemptsCache.invalidate(key);
        lockCache.invalidate(key);
    }

    public void loginFailed(String key) {
        if (isBlocked(key)) {
            return;
        }
        
        Integer attempts = attemptsCache.getIfPresent(key);
        if (attempts == null) {
            attempts = 0;
        }
        attempts++;
        attemptsCache.put(key, attempts);

        if (attempts >= MAX_ATTEMPT) {
            lockCache.put(key, LocalDateTime.now().plusMinutes(LOCK_TIME_MINUTES));
        }
    }

    public boolean isBlocked(String key) {
        LocalDateTime lockTime = lockCache.getIfPresent(key);
        if (lockTime == null) {
            return false;
        }

        if (lockTime.isBefore(LocalDateTime.now())) {
            attemptsCache.invalidate(key);
            lockCache.invalidate(key);
            return false;
        }
        return true;
    }
}
