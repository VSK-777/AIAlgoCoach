package com.vsk.cpanalyzer.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class AnalyticsDTO {
    private CFUserInfo userInfo;
    
    // Rating progression chart
    private List<CFRatingChange> ratingHistory;
    
    // Radar chart (Topic Strength)
    private Map<String, Integer> topicStrength;
    
    // Donut chart (Difficulty Distribution)
    private Map<String, Integer> difficultyDistribution;
    
    // Heatmap (Date -> submission count)
    private Map<String, Integer> activityHeatmap;
    
    // Additional Insights
    private Integer totalSubmissions;
    private Integer solvedProblems;
    private String strongestTopic;
    private String weakestTopic;
}
