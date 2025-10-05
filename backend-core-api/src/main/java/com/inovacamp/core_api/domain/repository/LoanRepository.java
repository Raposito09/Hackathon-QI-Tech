package com.inovacamp.core_api.domain.repository;

import com.inovacamp.core_api.domain.entity.Loan;
import com.inovacamp.core_api.domain.enums.LoanStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LoanRepository extends JpaRepository<Loan, UUID> {
    List<Loan> findAllByStatus(LoanStatus status);
}