package com.staybook.user_profile_service.traveler.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "traveler_bookings")
@CompoundIndex(name = "email_status_index",
        def = "{'email': 1, 'status': 1}")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TravelerBooking {

    @Id
    private String id;

    private String email; // link to traveler

    private String bookingId;

    private String hotelName;
    private String location;
    private String roomType;

    private LocalDate checkInDate;
    private LocalDate checkOutDate;

    private int guestsCount;
    private int nights;

    private double totalPaid;
    private String currency;

    private BookingStatus status;

    private String imageUrl;

    private LocalDateTime createdAt;
}
