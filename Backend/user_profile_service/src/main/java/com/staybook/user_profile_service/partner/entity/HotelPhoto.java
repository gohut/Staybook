package com.staybook.user_profile_service.partner.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "hotel_photos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotelPhoto {

    @Id
    private String id;

    private String hotelId;
    private String roomTypeId; // nullable

    private String fileId; // GridFS file reference

    private String type; // HOTEL / ROOM / DINING / POOL

    private Boolean isPrimary;

    private LocalDateTime uploadedAt;
}
