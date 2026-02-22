package com.staybook.user_profile_service.traveler.service;

import com.staybook.user_profile_service.common.BusinessException;
import com.staybook.user_profile_service.traveler.dto.TravelerNotificationResponse;
import com.staybook.user_profile_service.traveler.dto.TravelerNotificationRequest;
import com.staybook.user_profile_service.traveler.entity.NotificationType;
import com.staybook.user_profile_service.traveler.entity.TravelerNotification;
import com.staybook.user_profile_service.traveler.repository.TravelerNotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TravelerNotificationService {

    private final TravelerNotificationRepository notificationRepository;

    public Page<TravelerNotificationResponse> getNotifications(String email,
                                                               Pageable pageable) {

        Page<TravelerNotification> notifications =
                notificationRepository.findByEmail(email, pageable);

        return notifications.map(this::mapToResponse);
    }

    public long getUnreadCount(String email) {
        return notificationRepository.countByEmailAndIsReadFalse(email);
    }

    public void markAsRead(String email, String notificationId) {

        TravelerNotification notification = notificationRepository
                .findById(notificationId)
                .orElseThrow(() -> new BusinessException("Notification not found"));

        if (!notification.getEmail().equals(email)) {
            throw new BusinessException("Unauthorized access");
        }

        notification.setRead(true);
        notificationRepository.save(notification);
    }

    public TravelerNotificationResponse createNotification(String email,
                                                           TravelerNotificationRequest request) {
        String from = request.getFrom() != null ? request.getFrom() : "SYSTEM";

        TravelerNotification notification = TravelerNotification.builder()
                .email(email)
                .title(request.getTitle())
                .message(request.getMessage())
                .from(from)
                .type(request.getType() != null ? request.getType() : NotificationType.INFO)
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);

        return mapToResponse(notification);
    }

    public TravelerNotificationResponse createNotificationForEmail(String email,
                                                                   String title,
                                                                   String message,
                                                                   String from,
                                                                   NotificationType type) {
        if (email == null || email.isBlank()) {
            throw new BusinessException("Email is required");
        }

        String resolvedFrom = (from == null || from.isBlank()) ? "SYSTEM" : from;
        NotificationType resolvedType = (type == null) ? NotificationType.INFO : type;

        TravelerNotification notification = TravelerNotification.builder()
                .email(email)
                .title(title)
                .message(message)
                .from(resolvedFrom)
                .type(resolvedType)
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);

        return mapToResponse(notification);
    }

    private TravelerNotificationResponse mapToResponse(TravelerNotification notification) {

        return TravelerNotificationResponse.builder()
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
