package com.staybook.user_profile_service.traveler.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "traveler_vouchers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TravelerVoucher {

    @Id
    private String id;

    private String email;

    private String bookingId;

    private String hotelName;
    private String location;
    private String roomType;

    private LocalDate checkInDate;
    private LocalDate checkOutDate;

    private int guestsCount;

    private VoucherStatus status;
}
