package com.vsk.cpanalyzer.security;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class LoginAttemptService {

    private final int MAX_ATTEMPT = 5;
    private final int LOCK_TIME_MINUTES = 15;

    private final ConcurrentHashMap<String, Integer> attemptsCache = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, LocalDateTime> lockCache = new ConcurrentHashMap<>();

    public void loginSucceeded(String key) {
        attemptsCache.remove(key);
        lockCache.remove(key);
    }

    public void loginFailed(String key) {
        if (isBlocked(key)) {
            return;
        }
        
        int attempts = attemptsCache.getOrDefault(key, 0);
        attempts++;
        attemptsCache.put(key, attempts);

        if (attempts >= MAX_ATTEMPT) {
            lockCache.put(key, LocalDateTime.now().plusMinutes(LOCK_TIME_MINUTES));
        }
    }

    public boolean isBlocked(String key) {
        if (!lockCache.containsKey(key)) {
            return false;
        }

        LocalDateTime lockTime = lockCache.get(key);
        if (lockTime.isBefore(LocalDateTime.now())) {
            // Lock expired
            attemptsCache.remove(key);
            lockCache.remove(key);
            return false;
        }
        return true;
    }
}
