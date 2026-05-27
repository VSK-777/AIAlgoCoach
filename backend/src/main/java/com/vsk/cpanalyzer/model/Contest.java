package com.vsk.cpanalyzer.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "contests")
public class Contest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String contestName;

    private Integer oldRating;

    private Integer newRating;

    @Column(name = "contest_rank")
    private Integer rank;

    private String handle;
}