package com.staybook.user_profile_service.admin.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminCommissionRoomResponse {
    private String roomTypeId;
    private String name;
    private Double basePrice;
    private Double commissionAmount;
}
