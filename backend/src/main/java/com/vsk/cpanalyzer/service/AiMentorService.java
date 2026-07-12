package com.vsk.cpanalyzer.service;

import com.vsk.cpanalyzer.dto.AnalyticsDTO;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AiMentorService {

    private static final Logger logger = LoggerFactory.getLogger(AiMentorService.class);

    private final ChatClient chatClient;
    private final AnalyticsService analyticsService;

    public AiMentorService(ChatClient.Builder builder, AnalyticsService analyticsService) {
        this.chatClient = builder.build();
        this.analyticsService = analyticsService;
    }

    @CircuitBreaker(name = "aiService", fallbackMethod = "generateRecommendationsFallback")
    @Retry(name = "aiService", fallbackMethod = "generateRecommendationsFallback")
    public String generateRecommendations(String handle) {
        AnalyticsDTO analytics = analyticsService.getAnalyticsForHandle(handle);
        
        String promptText = """
                You are an expert Competitive Programming Mentor (AIAlgoCoach).
                Analyze the following user's Codeforces statistics and provide a structured, actionable improvement plan.
                
                Handle: {handle}
                Current Rating: {rating}
                Total Solved: {solved}
                Strongest Topic: {strongest}
                Weakest Topic: {weakest}
                
                Provide:
                1. Strengths Analysis
                2. Weaknesses to focus on
                3. A 2-week daily practice plan
                4. Contest strategy for their rating level
                
                Keep the tone encouraging, professional, and highly analytical. Format using Markdown.
                """;
                
        return chatClient.prompt()
                .user(u -> u.text(promptText)
                        .param("handle", analytics.getUserInfo().getHandle())
                        .param("rating", analytics.getUserInfo().getRating() != null ? analytics.getUserInfo().getRating() : "Unrated")
                        .param("solved", analytics.getSolvedProblems())
                        .param("strongest", analytics.getStrongestTopic())
                        .param("weakest", analytics.getWeakestTopic()))
                .call()
                .content();
    }

    public String generateRecommendationsFallback(String handle, Throwable t) {
        logger.error("AI service fallback triggered for recommendations on handle: {}", handle, t);
        return "## AI Service Temporarily Unavailable\n\nOur AI mentor is currently experiencing high load. Please continue practicing your weakest topics and try again in a few minutes.";
    }

    @CircuitBreaker(name = "aiService", fallbackMethod = "chatWithMentorFallback")
    @Retry(name = "aiService", fallbackMethod = "chatWithMentorFallback")
    public String chatWithMentor(String handle, String message) {
        AnalyticsDTO analytics = analyticsService.getAnalyticsForHandle(handle);
        
        String systemContext = """
                You are AIAlgoCoach, an expert Competitive Programming Mentor.
                You are chatting with a user whose Codeforces handle is: {handle}.
                Their current rating is: {rating}. They have solved {solved} problems.
                Their strongest topic is {strongest} and weakest topic is {weakest}.
                Use this context to give highly personalized advice.
                """;
                
        return chatClient.prompt()
                .system(s -> s.text(systemContext)
                        .param("handle", analytics.getUserInfo().getHandle())
                        .param("rating", analytics.getUserInfo().getRating() != null ? analytics.getUserInfo().getRating() : "Unrated")
                        .param("solved", analytics.getSolvedProblems())
                        .param("strongest", analytics.getStrongestTopic())
                        .param("weakest", analytics.getWeakestTopic()))
                .user(message)
                .call()
                .content();
    }

    public String chatWithMentorFallback(String handle, String message, Throwable t) {
        logger.error("AI service fallback triggered for chat on handle: {}", handle, t);
        return "Our AI mentor is currently offline or overloaded. Please try again shortly.";
    }
}
