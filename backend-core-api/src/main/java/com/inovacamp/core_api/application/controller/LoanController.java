package com.inovacamp.core_api.application.controller;

import com.inovacamp.core_api.application.dto.*;
import com.inovacamp.core_api.domain.service.LoanService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

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

    @PostMapping("/{loanId}/fund")
    @SecurityRequirement(name = "bearerAuth")
    public FundLoanResponse fundLoan(
            @PathVariable UUID loanId,
            @Valid @RequestBody FundLoanRequest request
    ) {
        return loanService.fundLoan(loanId, request);
    }

}