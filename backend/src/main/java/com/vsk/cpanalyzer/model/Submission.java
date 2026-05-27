package com.vsk.cpanalyzer.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "submissions")
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String problemName;

    private Integer rating;

    private String verdict;

    private String topic;

    private String handle;
}