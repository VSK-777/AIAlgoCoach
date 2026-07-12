package com.vsk.cpanalyzer.service;

import com.vsk.cpanalyzer.dto.AdvancedAnalyticsDTO;
import com.vsk.cpanalyzer.dto.AnalyticsDTO;
import com.vsk.cpanalyzer.dto.CFSubmission;
import com.vsk.cpanalyzer.integration.CodeforcesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final CodeforcesService codeforcesService;

    @org.springframework.cache.annotation.Cacheable(value = "advancedAnalytics", key = "#handle")
    public AdvancedAnalyticsDTO getAdvancedAnalytics(String handle) {
        var submissions = codeforcesService.getUserSubmissions(handle);

        Map<String, Integer> languageDist = new HashMap<>();
        Map<String, Integer> verdictDist = new HashMap<>();
        Map<String, Integer> allTagsDist = new HashMap<>();
        
        int successful = 0;

        for (CFSubmission s : submissions) {
            String verdict = s.getVerdict() != null ? s.getVerdict() : "UNKNOWN";
            verdictDist.put(verdict, verdictDist.getOrDefault(verdict, 0) + 1);
            if ("OK".equals(verdict)) successful++;
            
            String lang = s.getProgrammingLanguage() != null ? s.getProgrammingLanguage() : "Unknown";
            String lowerLang = lang.toLowerCase();
            
            // Group similar languages for cleaner charts
            if (lowerLang.contains("c++") || lowerLang.contains("clang") || lowerLang.contains("g++")) lang = "C++";
            else if (lowerLang.contains("c11") || lowerLang.contains("gnu c") || lowerLang.contains("c89") || lowerLang.contains("c99")) lang = "C";
            else if (lowerLang.contains("java") && !lowerLang.contains("javascript")) lang = "Java";
            else if (lowerLang.contains("py") || lowerLang.contains("pypy")) lang = "Python";
            else if (lowerLang.contains("kotlin")) lang = "Kotlin";
            else if (lowerLang.contains("rust")) lang = "Rust";
            else if (lowerLang.contains("go")) lang = "Go";
            else if (lowerLang.contains("c#") || lowerLang.contains("c sharp")) lang = "C#";
            else if (lowerLang.contains("ruby")) lang = "Ruby";
            else if (lowerLang.contains("js") || lowerLang.contains("javascript") || lowerLang.contains("node")) lang = "JavaScript";
            else if (lowerLang.contains("pascal") || lowerLang.contains("delphi")) lang = "Pascal";
            else if (lowerLang.contains("text") || lowerLang.contains("mysterious")) lang = "Other";
            
            languageDist.put(lang, languageDist.getOrDefault(lang, 0) + 1);
            
            if ("OK".equals(verdict) && s.getProblem() != null && s.getProblem().getTags() != null) {
                for (String tag : s.getProblem().getTags()) {
                    allTagsDist.put(tag, allTagsDist.getOrDefault(tag, 0) + 1);
                }
            }
        }

        return AdvancedAnalyticsDTO.builder()
                .handle(handle)
                .totalSubmissions(submissions.size())
                .successfulSubmissions(successful)
                .successRate(submissions.isEmpty() ? 0 : Math.round(((double) successful / submissions.size() * 100) * 100.0) / 100.0)
                .languageDistribution(languageDist)
                .verdictDistribution(verdictDist)
                .allTagsDistribution(allTagsDist)
                .build();
    }

    @org.springframework.cache.annotation.Cacheable(value = "analytics", key = "#handle")
    public AnalyticsDTO getAnalyticsForHandle(String handle) {
        var userInfo = codeforcesService.getUserInfo(handle);
        var submissions = codeforcesService.getUserSubmissions(handle);
        var ratingHistory = codeforcesService.getUserRatingHistory(handle);

        var topicStrength = calculateTopicStrength(submissions);
        var diffDist = calculateDifficultyDistribution(submissions);
        var heatmap = calculateActivityHeatmap(submissions);

        String strongestTopic = "";
        int maxTopicCount = -1;
        String weakestTopic = "";
        int minTopicCount = Integer.MAX_VALUE;

        for (Map.Entry<String, Integer> entry : topicStrength.entrySet()) {
            if (entry.getValue() > maxTopicCount) {
                maxTopicCount = entry.getValue();
                strongestTopic = entry.getKey();
            }
            if (entry.getValue() < minTopicCount && entry.getValue() > 0) {
                minTopicCount = entry.getValue();
                weakestTopic = entry.getKey();
            }
        }

        long solvedCount = submissions.stream()
                .filter(s -> "OK".equals(s.getVerdict()))
                .map(s -> s.getProblem().getName())
                .distinct()
                .count();

        return AnalyticsDTO.builder()
                .userInfo(userInfo)
                .ratingHistory(ratingHistory)
                .topicStrength(topicStrength)
                .difficultyDistribution(diffDist)
                .activityHeatmap(heatmap)
                .totalSubmissions(submissions.size())
                .solvedProblems((int) solvedCount)
                .strongestTopic(strongestTopic)
                .weakestTopic(weakestTopic)
                .build();
    }

    private Map<String, Integer> calculateTopicStrength(List<CFSubmission> submissions) {
        Map<String, Integer> strength = new HashMap<>();
        String[] coreTopics = {"dp", "graphs", "math", "greedy", "trees", "data structures", "binary search"};
        for (String topic : coreTopics) {
            strength.put(topic, 0);
        }

        submissions.stream()
                .filter(s -> "OK".equals(s.getVerdict()))
                .forEach(s -> {
                    if (s.getProblem().getTags() != null) {
                        for (String tag : s.getProblem().getTags()) {
                            if (strength.containsKey(tag)) {
                                strength.put(tag, strength.get(tag) + 1);
                            }
                        }
                    }
                });
        return strength;
    }

    private Map<String, Integer> calculateDifficultyDistribution(List<CFSubmission> submissions) {
        Map<String, Integer> distribution = new HashMap<>();
        distribution.put("Easy", 0);
        distribution.put("Medium", 0);
        distribution.put("Hard", 0);

        submissions.stream()
                .filter(s -> "OK".equals(s.getVerdict()) && s.getProblem().getRating() != null)
                .map(s -> s.getProblem())
                .distinct()
                .forEach(p -> {
                    int rating = p.getRating();
                    if (rating <= 1200) {
                        distribution.put("Easy", distribution.get("Easy") + 1);
                    } else if (rating <= 1900) {
                        distribution.put("Medium", distribution.get("Medium") + 1);
                    } else {
                        distribution.put("Hard", distribution.get("Hard") + 1);
                    }
                });

        return distribution;
    }

    private Map<String, Integer> calculateActivityHeatmap(List<CFSubmission> submissions) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd").withZone(ZoneId.systemDefault());
        Map<String, Integer> heatmap = new HashMap<>();

        for (CFSubmission s : submissions) {
            Instant instant = Instant.ofEpochSecond(s.getCreationTimeSeconds());
            String dateStr = formatter.format(instant);
            heatmap.put(dateStr, heatmap.getOrDefault(dateStr, 0) + 1);
        }
        return heatmap;
    }
}
