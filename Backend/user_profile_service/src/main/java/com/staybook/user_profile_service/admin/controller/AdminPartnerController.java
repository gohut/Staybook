package com.staybook.user_profile_service.admin.controller;

import com.staybook.user_profile_service.admin.dto.SubPartnerRequest;
import com.staybook.user_profile_service.admin.service.AdminPartnerService;
import com.staybook.user_profile_service.common.ApiResponse;
import com.staybook.user_profile_service.partner.entity.Partner;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/sub-partners")
@RequiredArgsConstructor
public class AdminPartnerController {

    private final AdminPartnerService partnerService;

    @PostMapping
    public ApiResponse<Partner> createSubPartner(@RequestBody SubPartnerRequest request) {
        Partner partner = partnerService.createSubPartner(
                request.getEmail(),
                request.getParentAdminEmail(),
                request.getName()
        );

        return ApiResponse.<Partner>builder()
                .success(true)
                .message("Sub-partner created successfully")
                .data(partner)
                .build();
    }
}
