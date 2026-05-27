package com.vsk.cpanalyzer.dto;

import lombok.Data;
import java.util.List;

@Data
public class CFSubmission {
    private Long id;
    private Long creationTimeSeconds;
    private String verdict;
    private String programmingLanguage;
    private CFProblem problem;
    
    @Data
    public static class CFProblem {
        private Integer contestId;
        private String index;
        private String name;
        private Integer rating;
        private List<String> tags;
    }
}
