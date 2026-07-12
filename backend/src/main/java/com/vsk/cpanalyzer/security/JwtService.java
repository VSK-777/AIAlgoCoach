package com.vsk.cpanalyzer.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.access-token-expiration}")
    private long jwtExpiration;

    @Value("${jwt.refresh-token-expiration}")
    private long refreshExpiration;

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return buildToken(new HashMap<>(), userDetails, refreshExpiration);
    }

    private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, long expiration) {
        com.auth0.jwt.JWTCreator.Builder builder = JWT.create()
                .withSubject(userDetails.getUsername())
                .withIssuedAt(new Date(System.currentTimeMillis()))
                .withExpiresAt(new Date(System.currentTimeMillis() + expiration));

        for (Map.Entry<String, Object> entry : extraClaims.entrySet()) {
            if (entry.getValue() instanceof String) builder.withClaim(entry.getKey(), (String) entry.getValue());
            else if (entry.getValue() instanceof Integer) builder.withClaim(entry.getKey(), (Integer) entry.getValue());
            else if (entry.getValue() instanceof Long) builder.withClaim(entry.getKey(), (Long) entry.getValue());
            else if (entry.getValue() instanceof Boolean) builder.withClaim(entry.getKey(), (Boolean) entry.getValue());
            else if (entry.getValue() instanceof Double) builder.withClaim(entry.getKey(), (Double) entry.getValue());
            else builder.withClaim(entry.getKey(), entry.getValue().toString());
        }

        return builder.sign(getAlgorithm());
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            final String username = extractUsername(token);
            return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiresAt();
    }

    private DecodedJWT extractAllClaims(String token) {
        JWTVerifier verifier = JWT.require(getAlgorithm()).build();
        return verifier.verify(token);
    }

    private Algorithm getAlgorithm() {
        byte[] keyBytes;
        try {
            keyBytes = Base64.getDecoder().decode(secretKey);
        } catch (IllegalArgumentException e) {
            keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        }
        return Algorithm.HMAC256(keyBytes);
    }
}
