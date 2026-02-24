package com.staybook.user_profile_service.admin.controller;

import com.staybook.user_profile_service.admin.dto.AdminMessageRequest;
import com.staybook.user_profile_service.admin.service.AdminMessagingService;
import com.staybook.user_profile_service.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/messages")
@RequiredArgsConstructor
public class AdminMessagingController {

    private final AdminMessagingService messagingService;

    @PostMapping
    public ApiResponse<Void> sendMessage(@RequestBody AdminMessageRequest request) {
        messagingService.sendMessage(request);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Message sent successfully")
                .data(null)
                .build();
    }
}
