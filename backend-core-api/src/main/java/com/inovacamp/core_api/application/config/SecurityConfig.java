package com.inovacamp.core_api.application.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Desabilita o CSRF, pois usaremos JWT (stateless)
                .csrf(AbstractHttpConfigurer::disable)
                // 2. Define as regras de autorização
                .authorizeHttpRequests(authorize -> authorize
                        // Permite acesso público a todos endpoints que começam com /auth
                        .requestMatchers("/auth/**").permitAll()
                        // Exige autenticação para qualquer outra requisição
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}
