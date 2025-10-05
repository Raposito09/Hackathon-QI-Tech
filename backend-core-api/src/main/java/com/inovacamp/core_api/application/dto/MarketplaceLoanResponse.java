package com.inovacamp.core_api.application.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
public class MarketplaceLoanResponse {
    private UUID loanId;
    private BigDecimal amount;
    private Integer term;
    private String purpose;
    private Integer userCreditScore;
    private String estimatedRisk; // "LOW", "MEDIUM", "HIGH"
}