package com.vsk.cpanalyzer.model;

import jakarta.persistence.*;

import lombok.Data;

@Entity
@Data
@Table(name = "auth_users")
public class AuthUser {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    @Column(
            unique = true,
            nullable = false
    )
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;
}