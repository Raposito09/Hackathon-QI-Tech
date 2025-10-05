package com.inovacamp.core_api.application.controller;

import com.inovacamp.core_api.application.dto.*;
import com.inovacamp.core_api.domain.service.WalletService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/wallets")
@RequiredArgsConstructor
public class WalletController {

    private final WalletService walletService;

    @PostMapping("/{id}/pix/charge")
    @ResponseStatus(HttpStatus.CREATED)
    @SecurityRequirement(name = "bearerAuth")
    public PixChargeResponse createPixCharge(
            @PathVariable UUID id,
            @Valid @RequestBody PixChargeRequest request
    ) {
        return walletService.createPixCharge(id, request);
    }

    @PostMapping("/{id}/pix/callback")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    // Nota: Webhooks reais usam outros métodos de segurança (ex: chaves secretas no header),
    // mas para nosso mock, vamos mantê-lo protegido pelo token do usuário.
    @SecurityRequirement(name = "bearerAuth")
    public void processPixCallback(
            @PathVariable UUID id,
            @Valid @RequestBody PixCallbackRequest request
    ) {
        walletService.processPixCallback(id, request);
    }

    @PostMapping("/{id}/withdraw")
    @ResponseStatus(HttpStatus.ACCEPTED) // 202 Accepted indica que a requisição foi aceita para processamento
    @SecurityRequirement(name = "bearerAuth")
    public WithdrawalResponse requestWithdrawal(
            @PathVariable UUID id,
            @Valid @RequestBody WithdrawalRequest request
    ) {
        return walletService.requestWithdrawal(id, request);
    }

    @GetMapping("/{id}/balance")
    @SecurityRequirement(name = "bearerAuth")
    public WalletBalanceResponse getWalletBalance(@PathVariable UUID id) {
        return walletService.getWalletBalance(id);
    }
    @GetMapping("/{id}/transactions")
    @SecurityRequirement(name = "bearerAuth")
    public List<TransactionResponse> getWalletTransactions(@PathVariable UUID id) {
        return walletService.getWalletTransactions(id);
    }
}