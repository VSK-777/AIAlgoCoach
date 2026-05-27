package com.vsk.cpanalyzer.model;

import jakarta.persistence.*;

import lombok.Data;

@Entity
@Data
@Table(name = "analysis")
public class Analysis {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @Column(nullable = false)
    private String handle;

    private String strongestTopic;

    private String weakestTopic;

    private String personality;

    private String consistencyLevel;

    private Integer averageDifficulty;

    private String predictedLevel;
}