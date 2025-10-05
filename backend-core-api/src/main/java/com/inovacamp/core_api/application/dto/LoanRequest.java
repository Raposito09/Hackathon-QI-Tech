package com.inovacamp.core_api.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class LoanRequest {
    @NotNull
    @Positive(message = "O valor do empréstimo deve ser positivo.")
    private BigDecimal amount;

    @NotBlank(message = "O propósito não pode ser vazio.")
    private String purpose;

    @NotNull
    @Positive(message = "O prazo deve ser um número positivo de meses.")
    private Integer term; // Meses
}