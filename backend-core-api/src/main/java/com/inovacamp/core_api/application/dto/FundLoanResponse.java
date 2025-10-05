package com.inovacamp.core_api.application.dto;

import lombok.Builder;
import lombok.Data;
import java.util.UUID;

@Data
@Builder
public class FundLoanResponse {
    private UUID transactionId;
    private UUID loanId;
    private String status;
    private String message;
}