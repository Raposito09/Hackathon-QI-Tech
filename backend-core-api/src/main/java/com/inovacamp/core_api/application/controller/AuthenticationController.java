package com.inovacamp.core_api.application.controller;
import com.inovacamp.core_api.application.dto.RegisterRequest;
import com.inovacamp.core_api.application.dto.RegisterResponse;
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

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public RegisterResponse registerUser(@RequestBody @Valid RegisterRequest request) {
        return userService.register(request);
    }

}