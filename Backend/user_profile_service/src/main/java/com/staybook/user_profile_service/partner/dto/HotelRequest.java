package com.staybook.user_profile_service.partner.dto;

import lombok.Data;

@Data
public class HotelRequest {

    private String name;
    private Integer starRating;
    private String description;

    private String address;
    private String city;
    private String state;
    private String country;
    private String pincode;

    private Double latitude;
    private Double longitude;

    private String phone;
    private String email;

    private String checkInTime;
    private String checkOutTime;
}
