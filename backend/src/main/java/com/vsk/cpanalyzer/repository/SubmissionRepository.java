package com.vsk.cpanalyzer.repository;

import com.vsk.cpanalyzer.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmissionRepository
        extends JpaRepository<Submission, Long> {
}