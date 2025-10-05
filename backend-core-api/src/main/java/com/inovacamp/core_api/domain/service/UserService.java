package com.inovacamp.core_api.domain.service;

import com.inovacamp.core_api.application.dto.*;

import java.util.UUID;

public interface UserService {
    RegisterResponse register(RegisterRequest registerRequest);
    KycStatusResponse getKycStatus(UUID userId);
    KycUploadResponse requestKycUpload(UUID userId, KycUploadRequest request);
}