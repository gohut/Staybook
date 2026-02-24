package com.staybook.user_profile_service.partner.dto;

import com.staybook.user_profile_service.partner.entity.Contact;
import com.staybook.user_profile_service.partner.entity.Location;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PublicHotelSummaryResponse {

    private String id;
    private String name;
    private Integer starRating;
    private String description;
    private Location location;
    private Contact contact;
    private String checkInTime;
    private String checkOutTime;
    private String status;

    private Double minPrice;
    private String currency;
    private Double averageRating;
    private Long reviewCount;
    private String heroPhotoFileId;
}
