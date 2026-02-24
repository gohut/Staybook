package com.staybook.user_profile_service.partner.entity;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Location {

    private String address;
    private String city;
    private String state;
    private String country;
    private String pincode;

    private Double latitude;
    private Double longitude;
}
