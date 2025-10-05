package com.inovacamp.core_api.application.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class PixChargeResponse {
    private UUID chargeId;
    private String qrCode;
    private LocalDateTime expiresAt;
}