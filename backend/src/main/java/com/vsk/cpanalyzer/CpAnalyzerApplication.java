package com.vsk.cpanalyzer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class CpAnalyzerApplication {

    public static void main(String[] args) {
        SpringApplication.run(CpAnalyzerApplication.class, args);
    }

}
