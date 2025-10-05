package com.inovacamp.core_api.application.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class FundLoanRequest {
    @NotNull
    @Positive
    private BigDecimal amount;
}