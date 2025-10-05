package com.inovacamp.core_api.application.dto;

import lombok.Builder;
import lombok.Data;
import java.util.UUID;

@Data
@Builder
public class KycUploadResponse {
    private String uploadUrl;
    private UUID fileId;
}