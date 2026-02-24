package com.staybook.user_profile_service.partner.service;

import com.staybook.user_profile_service.common.BusinessException;
import com.staybook.user_profile_service.partner.dto.PartnerNotificationResponse;
import com.staybook.user_profile_service.partner.entity.PartnerNotification;
import com.staybook.user_profile_service.partner.repository.PartnerNotificationRepository;
import com.staybook.user_profile_service.traveler.entity.NotificationType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PartnerNotificationService {

    private final PartnerNotificationRepository notificationRepository;

    public Page<PartnerNotificationResponse> getNotifications(String email, Pageable pageable) {
        return notificationRepository.findByEmail(email, pageable)
                .map(this::mapToResponse);
    }

    public long getUnreadCount(String email) {
        return notificationRepository.countByEmailAndIsReadFalse(email);
    }

    public void markAsRead(String email, String notificationId) {
        PartnerNotification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new BusinessException("Notification not found"));

        if (!notification.getEmail().equals(email)) {
            throw new BusinessException("Unauthorized access to notification");
        }

        if (!notification.isRead()) {
            notification.setRead(true);
            notificationRepository.save(notification);
        }
    }

    public PartnerNotificationResponse createNotificationForEmail(String email,
                                                                  String title,
                                                                  String message,
                                                                  String from,
                                                                  NotificationType type) {
        NotificationType resolvedType = (type == null) ? NotificationType.INFO : type;

        PartnerNotification notification = PartnerNotification.builder()
                .email(email)
                .title(title)
                .message(message)
                .from(from)
                .type(resolvedType)
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);

        return mapToResponse(notification);
    }

    private PartnerNotificationResponse mapToResponse(PartnerNotification notification) {
        return PartnerNotificationResponse.builder()
                .id(notification.getId())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .from(notification.getFrom())
                .type(notification.getType())
                .isRead(notification.isRead())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}
