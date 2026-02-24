package com.staybook.user_profile_service.admin.controller;

import com.staybook.user_profile_service.admin.dto.AdminPartnerDetailResponse;
import com.staybook.user_profile_service.admin.service.AdminPartnerService;
import com.staybook.user_profile_service.common.ApiResponse;
import com.staybook.user_profile_service.partner.entity.Partner;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/partners")
@RequiredArgsConstructor
public class AdminPartnerManagementController {

    private final AdminPartnerService partnerService;

    @GetMapping
    public ApiResponse<List<Partner>> listPartners(@RequestParam(required = false) String category) {
        List<Partner> partners = partnerService.listPartners(category);

        return ApiResponse.<List<Partner>>builder()
                .success(true)
                .message("Partners fetched successfully")
                .data(partners)
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<AdminPartnerDetailResponse> getPartnerDetails(@PathVariable String id) {
        AdminPartnerDetailResponse response = partnerService.getPartnerDetails(id);

        return ApiResponse.<AdminPartnerDetailResponse>builder()
                .success(true)
                .message("Partner details fetched successfully")
                .data(response)
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deletePartner(@PathVariable String id) {
        partnerService.deletePartner(id);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Partner deleted successfully")
                .data(null)
                .build();
    }
}
