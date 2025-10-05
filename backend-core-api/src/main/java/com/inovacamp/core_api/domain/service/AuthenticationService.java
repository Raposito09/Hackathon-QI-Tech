package com.inovacamp.core_api.domain.service;


import com.inovacamp.core_api.application.dto.JwtAuthenticationResponse;
import com.inovacamp.core_api.application.dto.LoginRequest;
import com.inovacamp.core_api.application.dto.LoginResponse;
import com.inovacamp.core_api.application.dto.MfaVerificationRequest;

public interface AuthenticationService {
    LoginResponse login(LoginRequest loginRequest);
    JwtAuthenticationResponse verifyMfa(MfaVerificationRequest verificationRequest);
}