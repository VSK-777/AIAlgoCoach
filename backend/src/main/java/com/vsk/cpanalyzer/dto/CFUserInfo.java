package com.vsk.cpanalyzer.dto;

import lombok.Data;

@Data
public class CFUserInfo {
    private String handle;
    private Integer rating;
    private Integer maxRating;
    private String rank;
    private String maxRank;
    private String avatar;
}
