package com.inovacamp.core_api.application.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.inovacamp.core_api.application.dto.*;
import com.inovacamp.core_api.domain.entity.KycDocument;
import com.inovacamp.core_api.domain.entity.User;
import com.inovacamp.core_api.domain.enums.KycStatus;
import com.inovacamp.core_api.domain.enums.UploadStatus;
import com.inovacamp.core_api.domain.repository.KycDocumentRepository;
import com.inovacamp.core_api.domain.repository.UserRepository;
import com.inovacamp.core_api.domain.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final KycDocumentRepository kycDocumentRepository;
    private final AmazonS3 s3Client;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

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

    @Override
    public KycStatusResponse getKycStatus(UUID userId) {
        // 1. Busca o usuário pelo ID
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + userId));

        // 2. Monta e retorna o DTO de resposta
        return KycStatusResponse.builder()
                .userId(user.getId())
                .status(user.getKycStatus().name()) // .name() converte o enum para String (ex: "PENDING")
                .build();
    }
    @Override
    public KycUploadResponse requestKycUpload(UUID userId, KycUploadRequest request) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + userId));

        KycDocument document = KycDocument.builder()
                .user(user)
                .fileName(request.getFileName())
                .fileType(request.getFileType())
                .status(UploadStatus.PENDING_UPLOAD)
                .build();

        KycDocument savedDocument = kycDocumentRepository.save(document);

        // 1. Define o caminho do arquivo no bucket
        String key = savedDocument.getId() + "/" + request.getFileName();

        // 2. Define a expiração da URL (ex: 5 minutos)
        Date expiration = Date.from(Instant.now().plusSeconds(300));

        // 3. Gera a URL pré-assinada para o método PUT
        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(bucketName, key)
                        .withMethod(HttpMethod.PUT)
                        .withExpiration(expiration)
                        .withContentType(request.getFileType());



        // 3. Gera a URL com base na requisição detalhada
        URL presignedUrl = s3Client.generatePresignedUrl(generatePresignedUrlRequest);
        String publicUrl = presignedUrl.toString().replaceFirst("minio", "localhost");
        return KycUploadResponse.builder()
                .fileId(savedDocument.getId())
                .uploadUrl(publicUrl)
                .build();
    }
}