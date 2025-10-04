package com.inovacamp.core_api.application.service;

import com.inovacamp.core_api.application.dto.LoginRequest;
import com.inovacamp.core_api.application.dto.LoginResponse;
import com.inovacamp.core_api.domain.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationManager authenticationManager;

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
}