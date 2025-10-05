package com.inovacamp.core_api.application.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class PixChargeRequest {
    @NotNull
    @Positive(message = "O valor deve ser positivo.")
    private BigDecimal amount;
}