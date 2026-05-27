package com.vsk.cpanalyzer.repository;

import com.vsk.cpanalyzer.model.AuthUser;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthUserRepository
        extends JpaRepository<AuthUser, Long> {

    Optional<AuthUser> findByUsername(
            String username
    );
}