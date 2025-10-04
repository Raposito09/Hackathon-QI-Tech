package com.inovacamp.core_api.domain.enums;

/**
 * Representa os possíveis status do processo de verificação de identidade (Know Your Customer).
 */
public enum KycStatus {
    /**
     * O processo foi iniciado, mas ainda está pendente de análise ou envio de documentos.
     */
    PENDING,

    /**
     * A identidade do usuário foi verificada e aprovada.
     */
    APPROVED,

    /**
     * A verificação falhou ou foi rejeitada.
     */
    REJECTED
}