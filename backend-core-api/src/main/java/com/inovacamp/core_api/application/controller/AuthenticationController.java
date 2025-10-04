package com.inovacamp.core_api.application.controller;
import com.inovacamp.core_api.application.dto.LoginRequest;
import com.inovacamp.core_api.application.dto.LoginResponse;
import com.inovacamp.core_api.application.dto.RegisterRequest;
import com.inovacamp.core_api.application.dto.RegisterResponse;
import com.inovacamp.core_api.domain.service.AuthenticationService;
import com.inovacamp.core_api.domain.service.UserService;
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


}