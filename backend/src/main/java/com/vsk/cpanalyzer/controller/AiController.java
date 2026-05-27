package com.vsk.cpanalyzer.controller;

import com.vsk.cpanalyzer.service.AiMentorService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiMentorService aiMentorService;

    @GetMapping("/recommendations/{handle}")
    public ResponseEntity<AiResponse> getRecommendations(@PathVariable String handle) {
        String response = aiMentorService.generateRecommendations(handle);
        return ResponseEntity.ok(new AiResponse(response));
    }

    @PostMapping("/chat/{handle}")
    public ResponseEntity<AiResponse> chatWithMentor(@PathVariable String handle, @RequestBody ChatRequest request) {
        String response = aiMentorService.chatWithMentor(handle, request.getMessage());
        return ResponseEntity.ok(new AiResponse(response));
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