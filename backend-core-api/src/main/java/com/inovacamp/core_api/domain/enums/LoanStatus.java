package com.inovacamp.core_api.domain.enums;

public enum LoanStatus {
    PENDING_FUNDING, // Aguardando financiamento por investidores.
    FUNDED,          // Totalmente financiado.
    ACTIVE,          // Dinheiro transferido, empréstimo ativo e em pagamento.
    PAID_OFF,        // Totalmente pago.
    DEFAULTED        // Inadimplente.
}