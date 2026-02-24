package com.staybook.user_profile_service.admin.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminCommissionSummaryResponse {
    private String hotelId;
    private String hotelName;
    private String partnerId;
    private String partnerName;
    private String partnerEmail;
    private String category;

    private Double basicCommissionRate;
    private Double separateCommissionRate;
    private Double totalCommissionAmount;
}
