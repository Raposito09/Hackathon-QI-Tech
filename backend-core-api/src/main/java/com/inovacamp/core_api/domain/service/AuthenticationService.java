package com.inovacamp.core_api.domain.service;


import com.inovacamp.core_api.application.dto.LoginRequest;
import com.inovacamp.core_api.application.dto.LoginResponse;

public interface AuthenticationService {
    LoginResponse login(LoginRequest loginRequest);
}