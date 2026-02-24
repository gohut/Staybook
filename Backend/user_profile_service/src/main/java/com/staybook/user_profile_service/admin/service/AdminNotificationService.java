package com.staybook.user_profile_service.admin.service;

import com.staybook.user_profile_service.admin.dto.AdminNotificationRequest;
import com.staybook.user_profile_service.admin.entity.AdminNotification;
import com.staybook.user_profile_service.admin.repository.AdminNotificationRepository;
import com.staybook.user_profile_service.common.BusinessException;
import com.staybook.user_profile_service.traveler.entity.NotificationType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AdminNotificationService {

    private final AdminNotificationRepository repository;

    public Page<AdminNotification> getNotifications(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public long getUnreadCount() {
        return repository.countByIsReadFalse();
    }

    public AdminNotification createNotification(AdminNotificationRequest request) {
        NotificationType type = request.getType() != null ? request.getType() : NotificationType.INFO;

        AdminNotification notification = AdminNotification.builder()
                .title(request.getTitle() != null ? request.getTitle() : "New Request")
                .message(request.getMessage() != null ? request.getMessage() : "")
                .from(request.getFrom() != null ? request.getFrom() : "System")
                .fromRole(request.getFromRole())
                .type(type)
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .build();

        return repository.save(notification);
    }

    public void markAsRead(String id) {
        AdminNotification notification = repository.findById(id)
                .orElseThrow(() -> new BusinessException("Notification not found"));

        if (!notification.isRead()) {
            notification.setRead(true);
            repository.save(notification);
        }
    }
}
