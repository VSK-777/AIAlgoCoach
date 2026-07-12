package com.vsk.cpanalyzer.controller;

import com.vsk.cpanalyzer.service.AiMentorService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private static final Logger logger = LoggerFactory.getLogger(AiController.class);
    private final AiMentorService aiMentorService;

    @GetMapping("/recommendations/{handle}")
    public ResponseEntity<AiResponse> getRecommendations(@PathVariable String handle) {
        try {
            String response = aiMentorService.generateRecommendations(handle);
            return ResponseEntity.ok(new AiResponse(response));
        } catch (Exception e) {
            logger.error("AI workflow failed", e);
            return ResponseEntity.status(500).body(new AiResponse("AI service is temporarily unavailable. Please try again later."));
        }
    }

    @PostMapping("/chat/{handle}")
    public ResponseEntity<AiResponse> chatWithMentor(@PathVariable String handle, @RequestBody ChatRequest request) {
        try {
            String response = aiMentorService.chatWithMentor(handle, request.getMessage());
            return ResponseEntity.ok(new AiResponse(response));
        } catch (Exception e) {
            logger.error("AI workflow failed", e);
            return ResponseEntity.status(500).body(new AiResponse("AI service is temporarily unavailable. Please try again later."));
        }
    }

    @Data
    public static class AiResponse {
        private final String content;
    }

    @Data
    public static class ChatRequest {
        private String message;
    }
}