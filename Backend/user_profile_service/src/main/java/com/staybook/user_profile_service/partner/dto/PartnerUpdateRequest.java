package com.staybook.user_profile_service.partner.dto;

import lombok.Data;

@Data
public class PartnerUpdateRequest {

    private String name;
    private String phone;
    private String role;
}
