package com.inovacamp.core_api.application.controller;
import com.inovacamp.core_api.application.config.SecurityConfig;
import com.inovacamp.core_api.application.dto.*;
import com.inovacamp.core_api.domain.service.AuthenticationService;
import com.inovacamp.core_api.domain.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final UserService userService;
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public RegisterResponse registerUser(@RequestBody @Valid RegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse loginUser(@RequestBody @Valid LoginRequest request) {
        return authenticationService.login(request);
    }

    @PostMapping("/mfa/verify")
    public JwtAuthenticationResponse verifyMfa(@RequestBody @Valid MfaVerificationRequest request) {
        return authenticationService.verifyMfa(request);
    }

}