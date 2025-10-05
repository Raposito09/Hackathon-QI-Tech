package com.inovacamp.core_api.domain.repository;

import com.inovacamp.core_api.domain.entity.LoanFunding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface LoanFundingRepository extends JpaRepository<LoanFunding, UUID> {
}