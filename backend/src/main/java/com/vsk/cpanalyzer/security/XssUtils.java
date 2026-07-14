package com.vsk.cpanalyzer.security;

import org.owasp.html.PolicyFactory;
import org.owasp.html.Sanitizers;

public class XssUtils {

    private static final PolicyFactory POLICY = Sanitizers.FORMATTING.and(Sanitizers.LINKS).and(Sanitizers.BLOCKS);

    public static String sanitize(String value) {
        if (value == null) {
            return null;
        }
        return POLICY.sanitize(value);
    }
}
