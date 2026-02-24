package com.staybook.user_profile_service.admin.controller;

import com.staybook.user_profile_service.admin.dto.AdminSettingsRequest;
import com.staybook.user_profile_service.admin.entity.AdminSettings;
import com.staybook.user_profile_service.admin.service.AdminSettingsService;
import com.staybook.user_profile_service.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/settings")
@RequiredArgsConstructor
public class AdminSettingsController {

    private final AdminSettingsService settingsService;

    @GetMapping
    public ApiResponse<AdminSettings> getSettings() {
        return ApiResponse.<AdminSettings>builder()
                .success(true)
                .message("Settings fetched successfully")
                .data(settingsService.getSettings())
                .build();
    }

    @PutMapping
    public ApiResponse<AdminSettings> updateSettings(@RequestBody AdminSettingsRequest request) {
        return ApiResponse.<AdminSettings>builder()
                .success(true)
                .message("Settings updated successfully")
                .data(settingsService.updateSettings(request))
                .build();
    }
}
