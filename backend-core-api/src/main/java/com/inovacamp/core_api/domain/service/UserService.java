package com.inovacamp.core_api.domain.service;

import com.inovacamp.core_api.application.dto.RegisterRequest;
import com.inovacamp.core_api.application.dto.RegisterResponse;

public interface UserService {
    RegisterResponse register(RegisterRequest registerRequest);
}