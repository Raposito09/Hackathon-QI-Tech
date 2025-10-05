package com.inovacamp.core_api.application.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class TransactionResponse {
    private UUID transactionId;
    private String type; // "DEPOSIT" or "WITHDRAWAL"
    private BigDecimal amount;
    private String status;
    private LocalDateTime createdAt;
}