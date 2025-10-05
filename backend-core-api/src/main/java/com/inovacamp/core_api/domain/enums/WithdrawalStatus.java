package com.inovacamp.core_api.domain.enums;

public enum WithdrawalStatus {
    PENDING,      // A solicitação foi criada, mas ainda não foi processada.
    PROCESSING,   // A transferência está em andamento com o gateway de pagamento.
    COMPLETED,    // O dinheiro foi enviado com sucesso para a chave PIX de destino.
    FAILED        // A transferência falhou.
}