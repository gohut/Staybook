package com.staybook.user_profile_service.admin.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AdminCommissionDetailResponse {
    private String hotelId;
    private String hotelName;
    private String partnerId;
    private String partnerName;
    private String partnerEmail;
    private String category;

    private Double basicCommissionRate;
    private Double separateCommissionRate;
    private Double totalCommissionRate;
    private Double totalCommissionAmount;

    private List<AdminCommissionRoomResponse> rooms;
}
