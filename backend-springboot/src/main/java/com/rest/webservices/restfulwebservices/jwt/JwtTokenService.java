package com.rest.webservices.restfulwebservices.jwt;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

//JwtTokenService - generate a signed JWT (JSON Web Token) after a successful authentication

@Service
public class JwtTokenService {
    
	// JwtEncoder handles signing and encoding of the JWT using the RSA private key
    private final JwtEncoder jwtEncoder;

 // Constructor-based dependency injection
    public JwtTokenService(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    //Generate a signed JWT token for an authenticated user
    public String generateToken(Authentication authentication) {

    	// Extract all authorities (roles/permissions) of the authenticated user
        var scope = authentication
                        .getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.joining(" "));

        // Define the claims (payload) of the JWT
        var claims = JwtClaimsSet.builder()
                        .issuer("self")
                        .issuedAt(Instant.now())
                        .expiresAt(Instant.now().plus(90, ChronoUnit.MINUTES))
                        .subject(authentication.getName())
                        .claim("scope", scope)
                        .build();

        // Encode and sign the JWT using the private RSA key, then return the token string
        return this.jwtEncoder
                .encode(JwtEncoderParameters.from(claims))
                .getTokenValue();
    }
}