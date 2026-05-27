package com.vsk.cpanalyzer.controller;

import com.vsk.cpanalyzer.dto.AnalyticsDTO;
import com.vsk.cpanalyzer.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/{handle}")
    public ResponseEntity<AnalyticsDTO> getAnalytics(@PathVariable String handle) {
        return ResponseEntity.ok(analyticsService.getAnalyticsForHandle(handle));
    }

    @GetMapping("/advanced/{handle}")
    public ResponseEntity<com.vsk.cpanalyzer.dto.AdvancedAnalyticsDTO> getAdvancedAnalytics(@PathVariable String handle) {
        return ResponseEntity.ok(analyticsService.getAdvancedAnalytics(handle));
    }
}
