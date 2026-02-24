package com.staybook.inventory_service.registration.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "hotel_booking")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotelBooking {

    @Id
    private String id;

    private String bookingId;
    private String hotelName;
    private List<String> guestNames;
    private String guestEmail;
    private Double bookingAmount;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private int adultCount;
    private int childrenCount;
    private Double commission;
    private String paymentStatus;
    private String bookingStatus;
    private LocalDateTime createdAt;
}
