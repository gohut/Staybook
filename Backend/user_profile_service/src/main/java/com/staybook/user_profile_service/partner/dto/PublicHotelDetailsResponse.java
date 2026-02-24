package com.staybook.user_profile_service.partner.dto;

import com.staybook.user_profile_service.partner.entity.Contact;
import com.staybook.user_profile_service.partner.entity.HotelPhoto;
import com.staybook.user_profile_service.partner.entity.Location;
import com.staybook.user_profile_service.partner.entity.Review;
import com.staybook.user_profile_service.partner.entity.RoomType;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PublicHotelDetailsResponse {

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

    private List<RoomType> roomTypes;
    private List<Review> reviews;
    private List<HotelPhoto> photos;
}
