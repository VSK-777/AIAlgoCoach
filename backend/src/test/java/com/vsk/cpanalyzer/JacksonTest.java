package com.vsk.cpanalyzer;

import org.junit.jupiter.api.Test;
import tools.jackson.databind.ObjectMapper;

public class JacksonTest {

    @Test
    public void testJackson() {
        System.out.println(ObjectMapper.class.getName());
    }
}
