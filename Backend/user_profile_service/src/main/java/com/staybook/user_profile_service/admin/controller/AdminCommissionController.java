package com.staybook.user_profile_service.admin.controller;

import com.staybook.user_profile_service.admin.dto.AdminCommissionDetailResponse;
import com.staybook.user_profile_service.admin.dto.AdminCommissionSummaryResponse;
import com.staybook.user_profile_service.admin.dto.AdminCommissionUpdateRequest;
import com.staybook.user_profile_service.admin.service.AdminCommissionService;
import com.staybook.user_profile_service.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/commissions")
@RequiredArgsConstructor
public class AdminCommissionController {

    private final AdminCommissionService commissionService;

    @GetMapping
    public ApiResponse<List<AdminCommissionSummaryResponse>> getCommissions(
            @RequestParam(required = false) String category) {
        List<AdminCommissionSummaryResponse> response = commissionService.getCommissionSummaries(category);

        return ApiResponse.<List<AdminCommissionSummaryResponse>>builder()
                .success(true)
                .message("Commissions fetched successfully")
                .data(response)
                .build();
    }

    @GetMapping("/{hotelId}")
    public ApiResponse<AdminCommissionDetailResponse> getCommissionDetails(@PathVariable String hotelId) {
        AdminCommissionDetailResponse response = commissionService.getCommissionDetails(hotelId);

        return ApiResponse.<AdminCommissionDetailResponse>builder()
                .success(true)
                .message("Commission details fetched successfully")
                .data(response)
                .build();
    }

    @PutMapping("/{hotelId}")
    public ApiResponse<AdminCommissionDetailResponse> updateCommission(
            @PathVariable String hotelId,
            @RequestBody AdminCommissionUpdateRequest request) {
        AdminCommissionDetailResponse response = commissionService.updateSeparateCommission(hotelId, request);

        return ApiResponse.<AdminCommissionDetailResponse>builder()
                .success(true)
                .message("Commission updated successfully")
                .data(response)
                .build();
    }
}
