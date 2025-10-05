package com.inovacamp.core_api.application.service;

import com.inovacamp.core_api.application.dto.*;
import com.inovacamp.core_api.domain.entity.PixCharge;
import com.inovacamp.core_api.domain.entity.User;
import com.inovacamp.core_api.domain.entity.Withdrawal;
import com.inovacamp.core_api.domain.enums.PixChargeStatus;
import com.inovacamp.core_api.domain.enums.WithdrawalStatus;
import com.inovacamp.core_api.domain.repository.PixChargeRepository;
import com.inovacamp.core_api.domain.repository.UserRepository;
import com.inovacamp.core_api.domain.repository.WalletRepository;
import com.inovacamp.core_api.domain.repository.WithdrawalRepository;
import com.inovacamp.core_api.domain.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class WalletServiceImpl implements WalletService {

    private final WalletRepository walletRepository;
    private final PixChargeRepository pixChargeRepository;
    private final WithdrawalRepository withdrawalRepository;
    private final UserRepository userRepository; // <-- NOVA DEPENDÊNCIA

    private User getAuthenticatedUser() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Authenticated user not found in database"));
    }



    @Override
    public PixChargeResponse createPixCharge(UUID walletId, PixChargeRequest request) {
        var wallet = walletRepository.findById(walletId)
                .orElseThrow(() -> new RuntimeException("Wallet not found")); // Pode ser uma exceção customizada

        User currentUser = getAuthenticatedUser();
        if (!wallet.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("User does not have permission to access this wallet");
        }

        // 2. Compara o ID do dono da carteira com o ID do usuário autenticado
        if (!wallet.getUser().getId().equals(currentUser.getId())) {
            // 3. Se não forem os mesmos, lança uma exceção de Acesso Negado
            throw new AccessDeniedException("User does not have permission to access this wallet");
        }


        // Mock da geração do PIX - TODO
        String qrCodeMock = "00020126360014br.gov.bcb.pix0114" + UUID.randomUUID().toString().replace("-", "") + "5204000053039865802BR5913Nome Sobrenome6008BRASILIA62070503***6304E28B";
        LocalDateTime expiresAt = LocalDateTime.now().plusMinutes(30);

        PixCharge charge = PixCharge.builder()
                .wallet(wallet)
                .amount(request.getAmount())
                .status(PixChargeStatus.PENDING)
                .qrCodeContent(qrCodeMock)
                .expiresAt(expiresAt)
                .build();

        PixCharge savedCharge = pixChargeRepository.save(charge);

        return PixChargeResponse.builder()
                .chargeId(savedCharge.getId())
                .qrCode(savedCharge.getQrCodeContent())
                .expiresAt(savedCharge.getExpiresAt())
                .build();
    }

    @Override
    @Transactional // <-- Adicione esta anotação
    public void processPixCallback(UUID walletId, PixCallbackRequest request) {
        // 1. Encontra a cobrança pelo ID fornecido no corpo da requisição
        var charge = pixChargeRepository.findById(request.getChargeId())
                .orElseThrow(() -> new RuntimeException("Charge not found"));

        // 2. Validações de segurança e de negócio
        if (!charge.getWallet().getId().equals(walletId)) {
            throw new AccessDeniedException("This charge does not belong to the specified wallet");
        }
        if (charge.getStatus() != PixChargeStatus.PENDING) {
            throw new IllegalStateException("This charge is not pending payment");
        }
        if (!"PAID".equalsIgnoreCase(request.getStatus())) {
            // No nosso mock, só processamos o status "PAID"
            return;
        }

        // 3. Atualiza o status da cobrança
        charge.setStatus(PixChargeStatus.PAID);

        // 4. Credita o valor na carteira
        var wallet = charge.getWallet();
        wallet.setBalance(wallet.getBalance().add(charge.getAmount()));

        // 5. Salva as alterações no banco de dados
        // Graças ao @Transactional, o Spring garante que ambas as operações abaixo
        // ou funcionam, ou ambas falham, mantendo a consistência dos dados.
        walletRepository.save(wallet);
        pixChargeRepository.save(charge);
    }
    @Override
    @Transactional
    public WithdrawalResponse requestWithdrawal(UUID walletId, WithdrawalRequest request) {
        var wallet = walletRepository.findById(walletId)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));

        User currentUser = getAuthenticatedUser();
        if (!wallet.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("User does not have permission to access this wallet");
        }

        // 2. Verificação de Negócio (saldo suficiente)
        if (wallet.getBalance().compareTo(request.getAmount()) < 0) {
            throw new IllegalStateException("Insufficient funds for this withdrawal.");
        }

        // 3. Debita o valor da carteira imediatamente (reserva de fundos)
        wallet.setBalance(wallet.getBalance().subtract(request.getAmount()));
        walletRepository.save(wallet);

        // 4. Cria o registro da transação de saque
        Withdrawal withdrawal = Withdrawal.builder()
                .wallet(wallet)
                .amount(request.getAmount())
                .pixKey(request.getPixKey())
                .status(WithdrawalStatus.PENDING) // Status inicial
                .build();

        Withdrawal savedWithdrawal = withdrawalRepository.save(withdrawal);

        // TODO: Enviar a solicitação para um gateway de pagamento externo

        return WithdrawalResponse.builder()
                .withdrawalId(savedWithdrawal.getId())
                .status(savedWithdrawal.getStatus().name())
                .message("Withdrawal request received and is being processed.")
                .build();
    }
    @Override
    public WalletBalanceResponse getWalletBalance(UUID walletId) {
        var wallet = walletRepository.findById(walletId)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));

        User currentUser = getAuthenticatedUser();
        if (!wallet.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("User does not have permission to access this wallet");
        }

        return WalletBalanceResponse.builder()
                .walletId(wallet.getId())
                .balance(wallet.getBalance())
                .currency(wallet.getCurrency())
                .build();
    }
    @Override
    public List<TransactionResponse> getWalletTransactions(UUID walletId) {
        // Checagem de segurança (garante que a carteira existe e pertence ao usuário)
        // Reutilizamos a lógica do getWalletBalance para isso
        getWalletBalance(walletId);

        // 1. Busca os depósitos (Pix Charges)
        List<TransactionResponse> deposits = pixChargeRepository.findAllByWalletIdOrderByCreatedAtDesc(walletId)
                .stream()
                .map(charge -> TransactionResponse.builder()
                        .transactionId(charge.getId())
                        .type("DEPOSIT")
                        .amount(charge.getAmount())
                        .status(charge.getStatus().name())
                        .createdAt(charge.getCreatedAt())
                        .build())
                .toList();

        // 2. Busca os saques (Withdrawals)
        List<TransactionResponse> withdrawals = withdrawalRepository.findAllByWalletIdOrderByCreatedAtDesc(walletId)
                .stream()
                .map(withdrawal -> TransactionResponse.builder()
                        .transactionId(withdrawal.getId())
                        .type("WITHDRAWAL")
                        .amount(withdrawal.getAmount())
                        .status(withdrawal.getStatus().name())
                        .createdAt(withdrawal.getCreatedAt())
                        .build())
                .toList();

        // 3. Combina as duas listas e reordena por data
        return Stream.concat(deposits.stream(), withdrawals.stream())
                .sorted(Comparator.comparing(TransactionResponse::getCreatedAt).reversed())
                .toList();
    }
}