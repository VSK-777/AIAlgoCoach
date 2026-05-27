package com.vsk.cpanalyzer.service;

import com.vsk.cpanalyzer.dto.AnalyticsDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiMentorService {

    private final ChatClient chatClient;
    private final AnalyticsService analyticsService;

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
                
        PromptTemplate template = new PromptTemplate(promptText);
        template.add("handle", analytics.getUserInfo().getHandle());
        template.add("rating", analytics.getUserInfo().getRating() != null ? analytics.getUserInfo().getRating() : "Unrated");
        template.add("solved", analytics.getSolvedProblems());
        template.add("strongest", analytics.getStrongestTopic());
        template.add("weakest", analytics.getWeakestTopic());
        
        return chatClient.prompt(template.create()).call().content();
    }

    public String chatWithMentor(String handle, String message) {
        AnalyticsDTO analytics = analyticsService.getAnalyticsForHandle(handle);
        
        String systemContext = """
                You are AIAlgoCoach, an expert Competitive Programming Mentor.
                You are chatting with a user whose Codeforces handle is: %s.
                Their current rating is: %s. They have solved %d problems.
                Their strongest topic is %s and weakest topic is %s.
                Use this context to give highly personalized advice.
                """.formatted(
                        analytics.getUserInfo().getHandle(),
                        analytics.getUserInfo().getRating(),
                        analytics.getSolvedProblems(),
                        analytics.getStrongestTopic(),
                        analytics.getWeakestTopic()
                );
                
        return chatClient.prompt()
                .system(systemContext)
                .user(message)
                .call()
                .content();
    }
}
