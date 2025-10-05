package com.inovacamp.core_api.application.service;

import com.inovacamp.core_api.application.dto.*;
import com.inovacamp.core_api.domain.entity.Loan;
import com.inovacamp.core_api.domain.entity.LoanFunding;
import com.inovacamp.core_api.domain.entity.User;
import com.inovacamp.core_api.domain.enums.LoanStatus;
import com.inovacamp.core_api.domain.repository.LoanFundingRepository;
import com.inovacamp.core_api.domain.repository.LoanRepository;
import com.inovacamp.core_api.domain.repository.UserRepository;
import com.inovacamp.core_api.domain.repository.WalletRepository;
import com.inovacamp.core_api.domain.service.LoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LoanServiceImpl implements LoanService {

    private final LoanRepository loanRepository;
    private final UserRepository userRepository;
    private final WalletRepository walletRepository; // <-- Nova dependência
    private final LoanFundingRepository loanFundingRepository;

    @Override
    public LoanResponse createLoanRequest(LoanRequest request) {
        // Pega o usuário autenticado que está fazendo a solicitação
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        // 3. Busca a entidade User completa no banco de dados

        User borrower = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Authenticated user not found in database"));

        Loan newLoan = Loan.builder()
                .borrower(borrower)
                .amount(request.getAmount())
                .purpose(request.getPurpose())
                .term(request.getTerm())
                .status(LoanStatus.PENDING_FUNDING) // Status inicial
                .build();

        Loan savedLoan = loanRepository.save(newLoan);

        return LoanResponse.builder()
                .loanId(savedLoan.getId())
                .status(savedLoan.getStatus().name())
                .createdAt(savedLoan.getCreatedAt())
                .build();
    }
    @Override
    public MarketplaceResponse getMarketplaceLoans() {
        // 1. Busca no banco todos os empréstimos aguardando financiamento
        List<Loan> pendingLoans = loanRepository.findAllByStatus(LoanStatus.PENDING_FUNDING);

        // 2. Mapeia as entidades para o DTO de resposta
        List<MarketplaceLoanResponse> loanResponses = pendingLoans.stream()
                .map(loan -> {
                    // Lógica de mock para o risco
                    String risk = "HIGH";
                    Integer score = loan.getBorrower().getCreditScore();
                    if (score != null) {
                        if (score > 750) risk = "LOW";
                        else if (score > 600) risk = "MEDIUM";
                    }

                    return MarketplaceLoanResponse.builder()
                            .loanId(loan.getId())
                            .amount(loan.getAmount())
                            .term(loan.getTerm())
                            .purpose(loan.getPurpose())
                            .userCreditScore(score)
                            .estimatedRisk(risk)
                            .build();
                })
                .toList();

        return MarketplaceResponse.builder()
                .loans(loanResponses)
                .build();
    }

    @Override
    @Transactional
    public FundLoanResponse fundLoan(UUID loanId, FundLoanRequest request) {
        // 1. Pega o usuário logado (o Investidor)
        String investorEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User investor = userRepository.findByEmail(investorEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Investor not found"));

        // 2. Encontra o empréstimo e seu Tomador
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));
        User borrower = loan.getBorrower();

        // 3. Validações de Negócio e Segurança
        if (loan.getStatus() != LoanStatus.PENDING_FUNDING) {
            throw new IllegalStateException("Loan is not pending funding.");
        }
        if (investor.getId().equals(borrower.getId())) {
            throw new IllegalArgumentException("Users cannot fund their own loans.");
        }
        // Por simplicidade, vamos assumir financiamento total
        if (loan.getAmount().compareTo(request.getAmount()) != 0) {
            throw new IllegalArgumentException("Funding amount must match the loan amount.");
        }

        // 4. Encontra as carteiras do Investidor e do Tomador
        var investorWallet = walletRepository.findByUserId(investor.getId())
                .orElseThrow(() -> new RuntimeException("Investor wallet not found"));
        var borrowerWallet = walletRepository.findByUserId(borrower.getId())
                .orElseThrow(() -> new RuntimeException("Borrower wallet not found"));

        // 5. Executa a transação P2P
        if (investorWallet.getBalance().compareTo(request.getAmount()) < 0) {
            throw new IllegalStateException("Investor has insufficient funds.");
        }

        // Debita do investidor
        investorWallet.setBalance(investorWallet.getBalance().subtract(request.getAmount()));
        // Credita ao tomador
        borrowerWallet.setBalance(borrowerWallet.getBalance().add(request.getAmount()));

        // 6. Atualiza o status do empréstimo
        loan.setStatus(LoanStatus.FUNDED);

        // 7. Cria um registro da transação
        LoanFunding funding = LoanFunding.builder()
                .loan(loan).investor(investor).amount(request.getAmount()).build();

        // 8. Salva tudo no banco (o @Transactional garante a atomicidade)
        walletRepository.save(investorWallet);
        walletRepository.save(borrowerWallet);
        loanRepository.save(loan);
        LoanFunding savedFunding = loanFundingRepository.save(funding);

        return FundLoanResponse.builder()
                .transactionId(savedFunding.getId())
                .loanId(loanId)
                .status(loan.getStatus().name())
                .message("Loan successfully funded.")
                .build();
    }
}