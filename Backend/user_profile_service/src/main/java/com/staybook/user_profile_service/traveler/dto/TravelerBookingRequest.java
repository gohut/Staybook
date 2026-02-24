package com.staybook.user_profile_service.traveler.dto;

import com.staybook.user_profile_service.traveler.entity.BookingStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TravelerBookingRequest {

    private String bookingId;
    private String hotelName;
    private String location;
    private String roomType;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Integer guestsCount;
    private Integer nights;
    private Double totalPaid;
    private String currency;
    private BookingStatus status;
    private String imageUrl;
}
