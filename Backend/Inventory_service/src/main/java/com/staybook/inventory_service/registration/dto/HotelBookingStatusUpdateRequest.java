package com.staybook.inventory_service.registration.dto;

import lombok.Data;

@Data
public class HotelBookingStatusUpdateRequest {
    private String paymentStatus;
    private String bookingStatus;
}
