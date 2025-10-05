package com.inovacamp.core_api.application.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MfaVerificationRequest {

    @NotBlank(message = "O e-mail não pode ser vazio.")
    @Email(message = "Formato de e-mail inválido.")
    private String email;

    @NotBlank(message = "O código MFA não pode ser vazio.")
    private String mfaCode;
}