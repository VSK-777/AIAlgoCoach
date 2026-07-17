package com.vsk.cpanalyzer;

import com.vsk.cpanalyzer.security.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = JwtService.class)
public class JwtServiceTest {

    @Autowired
    private JwtService jwtService;

    @Test
    public void testContextLoads() {
        System.out.println("JwtService loaded successfully!");
    }
}
