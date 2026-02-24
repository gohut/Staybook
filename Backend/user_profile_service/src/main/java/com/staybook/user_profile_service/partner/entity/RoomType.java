package com.staybook.user_profile_service.partner.entity;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomType {

    private String id;

    private String name;
    private String bedType;
    private Integer maxGuests;
    private Integer roomSizeSqFt;
    private Integer totalRooms;

    private List<String> amenities;

    private Double basePrice;
    private String currency;

    private Boolean isActive;
}
