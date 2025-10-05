package com.inovacamp.core_api.application.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class MarketplaceResponse {
    private List<MarketplaceLoanResponse> loans;
}