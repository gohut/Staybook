package com.staybook.user_profile_service.partner.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "hotel_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotelDetails {

    @Id
    private String id;

    private String hotelId;

    private List<RoomType> roomTypes;
    private List<RatePlan> ratePlans;
    private List<Review> reviews;
    private List<HotelPhoto> photos;
}
