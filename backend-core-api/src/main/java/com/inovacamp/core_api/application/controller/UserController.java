package com.inovacamp.core_api.application.controller;

import com.inovacamp.core_api.application.dto.KycStatusResponse;
import com.inovacamp.core_api.application.dto.KycUploadRequest;
import com.inovacamp.core_api.application.dto.KycUploadResponse;
import com.inovacamp.core_api.domain.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}/kyc/status")
    @SecurityRequirement(name = "bearerAuth") // <-- Diz ao Swagger que este endpoint é protegido
    public KycStatusResponse getKycStatus(@PathVariable UUID id) {
        return userService.getKycStatus(id);
    }

    @PostMapping("/{id}/kyc/upload")
    @SecurityRequirement(name = "bearerAuth")
    public KycUploadResponse requestKycUpload(
            @PathVariable UUID id,
            @Valid @RequestBody KycUploadRequest request
    ) {
        return userService.requestKycUpload(id, request);
    }
}