package com.staybook.user_profile_service.partner.entity;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    private String id;

    private String userId;
    private String bookingId;

    private Double rating;

    private Double cleanliness;
    private Double hospitality;
    private Double location;
    private Double valueForMoney;

    private String reviewTitle;
    private String reviewText;
    private String travelMonth;

    private String roomTypeId;

    private LocalDateTime createdAt;
}
