package com.staybook.user_profile_service.traveler.dto;

import lombok.Data;

@Data
public class TravelerBookingPaymentRequest {

    private Double totalPaid;
    private String currency;
}
