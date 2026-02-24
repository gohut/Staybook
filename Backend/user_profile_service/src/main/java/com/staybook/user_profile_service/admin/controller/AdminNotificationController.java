package com.staybook.user_profile_service.admin.controller;

import com.staybook.user_profile_service.admin.dto.AdminNotificationRequest;
import com.staybook.user_profile_service.admin.entity.AdminNotification;
import com.staybook.user_profile_service.admin.service.AdminNotificationService;
import com.staybook.user_profile_service.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/notifications")
@RequiredArgsConstructor
public class AdminNotificationController {

    private final AdminNotificationService notificationService;

    @GetMapping
    public ApiResponse<Page<AdminNotification>> getNotifications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<AdminNotification> notifications = notificationService.getNotifications(pageable);

        return ApiResponse.<Page<AdminNotification>>builder()
                .success(true)
                .message("Notifications fetched successfully")
                .data(notifications)
                .build();
    }

    @PostMapping
    public ApiResponse<AdminNotification> createNotification(@RequestBody AdminNotificationRequest request) {
        AdminNotification notification = notificationService.createNotification(request);

        return ApiResponse.<AdminNotification>builder()
                .success(true)
                .message("Notification created successfully")
                .data(notification)
                .build();
    }

    @GetMapping("/unread-count")
    public ApiResponse<Long> getUnreadCount() {
        long count = notificationService.getUnreadCount();

        return ApiResponse.<Long>builder()
                .success(true)
                .message("Unread count fetched successfully")
                .data(count)
                .build();
    }

    @PutMapping("/{id}/read")
    public ApiResponse<Void> markAsRead(@PathVariable String id) {
        notificationService.markAsRead(id);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Notification marked as read")
                .data(null)
                .build();
    }
}
