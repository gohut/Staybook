package com.staybook.user_profile_service.admin.dto;

import com.staybook.user_profile_service.partner.entity.Hotel;
import com.staybook.user_profile_service.partner.entity.Partner;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AdminPartnerDetailResponse {
    private Partner partner;
    private List<Hotel> hotels;
}
