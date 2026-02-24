package com.staybook.user_profile_service.admin.dto;

import lombok.Data;

@Data
public class SubPartnerRequest {
    private String email;
    private String parentAdminEmail;
    private String name;
}
