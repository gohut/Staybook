package com.staybook.user_profile_service.traveler.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.time.LocalDate;

@Data
public class TravelerRequest {

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @Size(min = 10, max = 15)
    private String phone;
    private LocalDate dob;
    private String nationality;
}
