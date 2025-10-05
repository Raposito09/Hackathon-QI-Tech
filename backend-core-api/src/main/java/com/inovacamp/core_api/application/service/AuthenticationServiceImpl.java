package com.inovacamp.core_api.application.service;

import com.inovacamp.core_api.application.dto.JwtAuthenticationResponse;
import com.inovacamp.core_api.application.dto.LoginRequest;
import com.inovacamp.core_api.application.dto.LoginResponse;
import com.inovacamp.core_api.application.dto.MfaVerificationRequest;
import com.inovacamp.core_api.domain.repository.UserRepository;
import com.inovacamp.core_api.domain.service.AuthenticationService;
import com.inovacamp.core_api.domain.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Override
    public LoginResponse login(LoginRequest request) {
        // 1. Cria um objeto de autenticação com as credenciais fornecidas
        var authenticationToken = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());

        // 2. O Spring Security processa a autenticação
        // Se as credenciais estiverem erradas, ele lançará uma exceção (ex: BadCredentialsException)
        // que será tratada globalmente, resultando em um erro 401 ou 403.
        authenticationManager.authenticate(authenticationToken);

        // 3. Se a autenticação for bem-sucedida, retornamos a resposta definida no contrato.
        // A lógica de gerar o JWT virá aqui no futuro.
        return LoginResponse.builder()
                .mfaRequired(true)
                .message("Please verify with your MFA code.")
                .build();
    }
    @Override
    public JwtAuthenticationResponse verifyMfa(MfaVerificationRequest request) {
        // 1. Encontrar o usuário no banco de dados
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // 2. Validar o código MFA
        // TODO: Implementar a validação real do código TOTP (Time-based One-Time Password)
        // Por enquanto, vamos apenas simular que qualquer código é válido.
        if (request.getMfaCode().isBlank()) { // Simples checagem de exemplo
            throw new IllegalArgumentException("MFA code cannot be empty");
        }

        // 3. Gerar os tokens JWT
        var accessToken = jwtService.generateAccessToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        // 4. Retornar a resposta com os tokens
        return JwtAuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
}