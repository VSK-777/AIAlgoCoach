package com.vsk.cpanalyzer.dto;

import lombok.Data;

@Data
public class CFRatingChange {
    private Integer contestId;
    private String contestName;
    private String handle;
    private Integer rank;
    private Long ratingUpdateTimeSeconds;
    private Integer oldRating;
    private Integer newRating;
}
