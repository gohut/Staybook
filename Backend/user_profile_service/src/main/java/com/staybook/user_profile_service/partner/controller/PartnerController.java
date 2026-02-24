package com.staybook.user_profile_service.partner.controller;

import com.staybook.user_profile_service.common.ApiResponse;
import com.staybook.user_profile_service.partner.dto.PartnerNotificationResponse;
import com.staybook.user_profile_service.partner.dto.PartnerUpdateRequest;
import com.staybook.user_profile_service.partner.entity.Partner;
import com.staybook.user_profile_service.partner.service.PartnerNotificationService;
import com.staybook.user_profile_service.partner.service.PartnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/partner")
@RequiredArgsConstructor
public class PartnerController {

    private final PartnerService partnerService;
    private final PartnerNotificationService notificationService;

    @GetMapping
    public ApiResponse<Partner> getPartner(Authentication authentication) {

        String email = authentication.getName();

        Partner partner = partnerService.getOrCreatePartner(email);

        return ApiResponse.<Partner>builder()
                .success(true)
                .message("Partner fetched successfully")
                .data(partner)
                .build();
    }

    @PutMapping
    public ApiResponse<Partner> updatePartner(Authentication authentication,
                                              @RequestBody PartnerUpdateRequest request) {

        String email = authentication.getName();

        Partner partner = partnerService.updatePartner(email, request);

        return ApiResponse.<Partner>builder()
                .success(true)
                .message("Partner updated successfully")
                .data(partner)
                .build();
    }

    @GetMapping("/notifications")
    public ApiResponse<Page<PartnerNotificationResponse>> getNotifications(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        String email = authentication.getName();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<PartnerNotificationResponse> notifications =
                notificationService.getNotifications(email, pageable);

        return ApiResponse.<Page<PartnerNotificationResponse>>builder()
                .success(true)
                .message("Notifications fetched successfully")
                .data(notifications)
                .build();
    }

    @GetMapping("/notifications/unread-count")
    public ApiResponse<Long> getUnreadCount(Authentication authentication) {
        String email = authentication.getName();
        long count = notificationService.getUnreadCount(email);

        return ApiResponse.<Long>builder()
                .success(true)
                .message("Unread count fetched successfully")
                .data(count)
                .build();
    }

    @PutMapping("/notifications/{id}/read")
    public ApiResponse<Void> markNotificationAsRead(Authentication authentication,
                                                    @PathVariable String id) {
        String email = authentication.getName();
        notificationService.markAsRead(email, id);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Notification marked as read")
                .data(null)
                .build();
    }
}
