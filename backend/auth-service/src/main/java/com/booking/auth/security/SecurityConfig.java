package com.booking.auth.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // ✅ allow register & login APIs
                .requestMatchers("/auth/**").permitAll()

                // allow H2 database console
                .requestMatchers("/h2-console/**").permitAll()

                // allow everything else for now
                .anyRequest().permitAll()
            );

        // needed for H2 console frame
        http.headers(headers -> headers.frameOptions(frame -> frame.disable()));

        return http.build();
    }
}
