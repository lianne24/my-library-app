package com.rest.webservices.restfulwebservices.authentication;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;


//AuthenticationSecurityConfig - defines a basic Spring Security configuration for the REST API

//@Configuration
public class BasicAuthenticationSecurityConfig {

	// SecurityFilterChain Bean - configures how HTTP requests are secured and authenticated
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
		
		httpSecurity
			.authorizeHttpRequests(
					auth -> 
						auth
						.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Allow all OPTIONS requests
						.anyRequest().authenticated()) // Require authentication for *all* incoming HTTP requests
						.httpBasic(Customizer.withDefaults()) // Enable HTTP Basic Authentication
						.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Configure the session management to be STATELESS
						.csrf().disable(); // Disable CSRF protection
					
		return httpSecurity.build(); // Build and return the configured security filter chain
	}
	
	// Define a single source of truth for valid credentials 
	// In-memory user that will be replaced with proper UserDetailsService that queries from DB
	
    @Bean
    public UserDetailsService userDetailsService() {

    	// Create and store one in-memory user with role USER
        UserDetails user = User.builder()
                .username("lianne24")   // only username Spring will accept
                .password("lia")        // only password Spring will accept
                .roles("USER")
                .build();

        return new InMemoryUserDetailsManager(user);
    }
    
    // Specify passwords are stored and compared as plain text (only for development)
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        // Only for development ease
        return NoOpPasswordEncoder.getInstance();
    }
		
}
