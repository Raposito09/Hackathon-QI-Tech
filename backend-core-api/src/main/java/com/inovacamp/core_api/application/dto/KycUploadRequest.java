package com.inovacamp.core_api.application.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class KycUploadRequest {
    @NotBlank
    private String fileName;
    @NotBlank
    private String fileType;
}