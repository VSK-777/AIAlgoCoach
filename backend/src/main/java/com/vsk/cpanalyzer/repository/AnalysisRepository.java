package com.vsk.cpanalyzer.repository;

import com.vsk.cpanalyzer.model.Analysis;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnalysisRepository
        extends JpaRepository<Analysis, Long> {

    Optional<Analysis> findByHandle(
            String handle
    );
}