package com.inovacamp.core_api.application.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
public class WalletBalanceResponse {
    private UUID walletId;
    private BigDecimal balance;
    private String currency;
}