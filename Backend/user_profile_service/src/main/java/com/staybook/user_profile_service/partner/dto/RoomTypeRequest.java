package com.staybook.user_profile_service.partner.dto;

import lombok.Data;

import java.util.List;

@Data
public class RoomTypeRequest {

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
