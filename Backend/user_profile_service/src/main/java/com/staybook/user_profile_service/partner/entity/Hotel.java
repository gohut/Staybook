package com.staybook.user_profile_service.partner.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "hotels")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Hotel {

    @Id
    private String id;

    private String partnerId;

    private String name;
    private Integer starRating;
    private String description;

    private Location location;
    private Contact contact;

    private String checkInTime;
    private String checkOutTime;

    private String status; // ACTIVE / INACTIVE / DRAFT

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
