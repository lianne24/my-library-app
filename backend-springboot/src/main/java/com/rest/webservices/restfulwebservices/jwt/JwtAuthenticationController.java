package com.rest.webservices.restfulwebservices.jwt;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// JwtAuthenticationController - expose a REST endpoint (/authenticate) to verify user credentials

@RestController
public class JwtAuthenticationController {
    
	// Service responsible for generating signed JWT tokens
    private final JwtTokenService tokenService;
    
    // AuthenticationManager validates the username and password
    private final AuthenticationManager authenticationManager;

 // Constructor-based dependency injection for required services
    public JwtAuthenticationController(JwtTokenService tokenService, 
            AuthenticationManager authenticationManager) {
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
    }

    //Accept a JSON body containing username and password and authenticate using Spring Security’s AuthenticationManager
    //If successful, creates a JWT using JwtTokenService and returns it wrapped in JwtTokenResponse
    @PostMapping("/authenticate")
    public ResponseEntity<JwtTokenResponse> generateToken(
            @RequestBody JwtTokenRequest jwtTokenRequest) {
        
    	// Create an authentication token using the provided username and password
        var authenticationToken = 
                new UsernamePasswordAuthenticationToken(
                        jwtTokenRequest.username(), 
                        jwtTokenRequest.password());
        
        // Perform authentication — will throw exception if invalid credentials
        var authentication = 
                authenticationManager.authenticate(authenticationToken);
        
        // Generate a signed JWT using the authenticated user's details
        var token = tokenService.generateToken(authentication);
        
        // Return HTTP 200 (OK) with the generated token
        return ResponseEntity.ok(new JwtTokenResponse(token));
    }
}

