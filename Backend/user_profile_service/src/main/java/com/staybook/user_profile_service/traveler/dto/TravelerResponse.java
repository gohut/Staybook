package com.staybook.user_profile_service.traveler.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class TravelerResponse {

    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private LocalDate dob;
    private String nationality;
    private String avatarFileId;
    private String profileTier;
}
