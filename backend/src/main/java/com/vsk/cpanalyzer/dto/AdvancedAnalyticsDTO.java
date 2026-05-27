package com.vsk.cpanalyzer.dto;

import lombok.Builder;
import lombok.Data;
import java.util.Map;

@Data
@Builder
public class AdvancedAnalyticsDTO {
    private String handle;
    private int totalSubmissions;
    private int successfulSubmissions;
    private double successRate;
    
    // Programming language distribution (e.g. C++: 50, Java: 30)
    private Map<String, Integer> languageDistribution;
    
    // Verdict distribution (OK, WRONG_ANSWER, TIME_LIMIT_EXCEEDED, etc.)
    private Map<String, Integer> verdictDistribution;
    
    // Tags distribution (all tags, not just the core ones from the radar)
    private Map<String, Integer> allTagsDistribution;
}
