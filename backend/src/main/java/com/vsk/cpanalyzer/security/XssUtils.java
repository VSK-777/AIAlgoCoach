package com.vsk.cpanalyzer.security;

public class XssUtils {

    public static String sanitize(String value) {
        if (value == null) {
            return null;
        }
        // Basic sanitization: strip script tags and dangerous HTML characters
        value = value.replaceAll("(?i)<script.*?>.*?</script.*?>", "");
        value = value.replaceAll("(?i)<.*?javascript:.*?>.*?</.*?>", "");
        value = value.replaceAll("(?i)<.*?\\s+on.*?>.*?</.*?>", "");
        value = value.replace("<", "&lt;").replace(">", "&gt;");
        return value;
    }
}
