package com.staybook.user_profile_service.traveler.dto;

import com.staybook.user_profile_service.traveler.entity.VoucherStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class TravelerVoucherResponse {

    private String bookingId;

    private String hotelName;
    private String location;

    private LocalDate checkInDate;
    private LocalDate checkOutDate;

    private String roomType;
    private int guestsCount;

    private VoucherStatus status;
}
