package com.staybook.user_profile_service.traveler.dto;

import com.staybook.user_profile_service.traveler.entity.BookingStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class TravelerBookingResponse {

    private String bookingId;

    private String hotelName;
    private String location;

    private LocalDate checkInDate;
    private LocalDate checkOutDate;

    private String roomType;

    private int guestsCount;
    private int nights;

    private BookingStatus status;

    private String imageUrl;
}
