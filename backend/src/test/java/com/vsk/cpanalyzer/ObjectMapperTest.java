package com.vsk.cpanalyzer;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

@SpringBootTest
public class ObjectMapperTest {

    @Autowired
    private ApplicationContext context;

    @Test
    public void printObjectMappers() {
        String[] beanNames = context.getBeanNamesForType(Object.class);
        boolean found = false;
        for (String name : beanNames) {
            Object bean = context.getBean(name);
            if (bean.getClass().getName().contains("ObjectMapper")) {
                System.out.println("FOUND MAPPER BEAN: " + name + " -> " + bean.getClass().getName());
                found = true;
            }
        }
        if (!found) {
            System.out.println("NO OBJECTMAPPER BEAN FOUND IN CONTEXT");
        }
    }
}
