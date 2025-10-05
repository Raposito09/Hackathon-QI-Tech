package com.inovacamp.core_api.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class PixCallbackRequest {
    @NotNull
    private UUID chargeId;

    @NotBlank
    private String status; // Ex: "PAID"
}