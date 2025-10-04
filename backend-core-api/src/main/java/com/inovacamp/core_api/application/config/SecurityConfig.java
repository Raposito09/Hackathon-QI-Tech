package com.inovacamp.core_api.application.config;

import com.inovacamp.core_api.domain.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        System.out.println(">>> CRIANDO BEAN: SecurityFilterChain");
        http
                // Desabilita CSRF pois a API é stateless
                .csrf(AbstractHttpConfigurer::disable)

                // Define a política de sessão como STATELESS
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Define as regras de autorização para os endpoints
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(
                                "/auth/**",
                                "/v3/api-docs/**",
                                "swagger-ui/**",
                                "swagger-ui.html",
                                "/error"
                        ).permitAll()
                        .anyRequest().authenticated()
                )

                // AS LINHAS FALTANTES ESTÃO AQUI:
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        System.out.println(">>> CRIANDO BEAN: AuthenticationManager");
        return configuration.getAuthenticationManager();

    }

    @Bean
    public UserDetailsService userDetailsService(UserRepository userRepository) {
        System.out.println(">>> CRIANDO BEAN: UserDetailsService");
        return username -> userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
    }

}
