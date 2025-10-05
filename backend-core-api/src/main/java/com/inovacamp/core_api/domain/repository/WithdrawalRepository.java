package com.inovacamp.core_api.domain.repository;

import com.inovacamp.core_api.domain.entity.Withdrawal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface WithdrawalRepository extends JpaRepository<Withdrawal, UUID> {
    List<Withdrawal> findAllByWalletIdOrderByCreatedAtDesc(UUID walletId);
}