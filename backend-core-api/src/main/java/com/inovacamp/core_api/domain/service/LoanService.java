package com.inovacamp.core_api.domain.service;

import com.inovacamp.core_api.application.dto.*;

import java.util.UUID;

public interface LoanService {
    LoanResponse createLoanRequest(LoanRequest request);
    MarketplaceResponse getMarketplaceLoans();
    FundLoanResponse fundLoan(UUID loanId, FundLoanRequest request);
}