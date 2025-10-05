package com.inovacamp.core_api.domain.service;

import com.inovacamp.core_api.application.dto.*;

import java.util.List;
import java.util.UUID;

public interface WalletService {
    PixChargeResponse createPixCharge(UUID walletId, PixChargeRequest request);
    void processPixCallback(UUID walletId, PixCallbackRequest request);
    WithdrawalResponse requestWithdrawal(UUID walletId, WithdrawalRequest request);
    WalletBalanceResponse getWalletBalance(UUID walletId);
    List<TransactionResponse> getWalletTransactions(UUID walletId);
}