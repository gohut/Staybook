package com.staybook.inventory_service.registration.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class HotelBookingRequest {

    private String hotelName;
    private List<String> guestNames;
    private String guestEmail;
    private Double bookingAmount;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Integer adultCount;
    private Integer childrenCount;
    private String paymentStatus;
    private String bookingStatus;
}
