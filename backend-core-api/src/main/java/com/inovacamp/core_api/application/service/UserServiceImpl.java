package com.inovacamp.core_api.application.service;

import com.inovacamp.core_api.application.dto.RegisterRequest;
import com.inovacamp.core_api.application.dto.RegisterResponse;
import com.inovacamp.core_api.domain.entity.User;
import com.inovacamp.core_api.domain.enums.KycStatus;
import com.inovacamp.core_api.domain.repository.UserRepository;
import com.inovacamp.core_api.domain.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public RegisterResponse register(RegisterRequest request) {
        // 1. Verificar se o e-mail já está em uso
        userRepository.findByEmail(request.getEmail()).ifPresent(user -> {
            throw new IllegalStateException("E-mail já cadastrado.");
        });

        // 2. Criptografar a senha
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        // 3. Criar a nova entidade User
        User newUser = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(hashedPassword)
                .kycStatus(KycStatus.PENDING) // Status inicial
                .build();

        // 4. Salvar o usuário no banco de dados
        User savedUser = userRepository.save(newUser);

        // 5. Retornar a resposta DTO
        return RegisterResponse.builder()
                .userId(savedUser.getId())
                .email(savedUser.getEmail())
                .message("User registered successfully. Please login.")
                .build();
    }
}