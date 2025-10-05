package com.inovacamp.core_api.application.controller;

import com.inovacamp.core_api.application.dto.LoanRequest;
import com.inovacamp.core_api.application.dto.LoanResponse;
import com.inovacamp.core_api.application.dto.MarketplaceResponse;
import com.inovacamp.core_api.domain.service.LoanService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/loans")
@RequiredArgsConstructor
public class LoanController {

    private final LoanService loanService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @SecurityRequirement(name = "bearerAuth")
    public LoanResponse createLoanRequest(@Valid @RequestBody LoanRequest request) {
        return loanService.createLoanRequest(request);
    }

    @GetMapping
    @SecurityRequirement(name = "bearerAuth")
    public MarketplaceResponse getMarketplaceLoans() {
        return loanService.getMarketplaceLoans();
    }


}