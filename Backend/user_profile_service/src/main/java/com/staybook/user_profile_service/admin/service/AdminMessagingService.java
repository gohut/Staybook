package com.staybook.user_profile_service.admin.service;

import com.staybook.user_profile_service.admin.dto.AdminMessageRequest;
import com.staybook.user_profile_service.partner.service.PartnerNotificationService;
import com.staybook.user_profile_service.traveler.entity.NotificationType;
import com.staybook.user_profile_service.traveler.service.TravelerNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminMessagingService {

    private final TravelerNotificationService travelerNotificationService;
    private final PartnerNotificationService partnerNotificationService;

    public void sendMessage(AdminMessageRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new IllegalArgumentException("Recipient email is required");
        }
        if (request.getRecipientType() == null || request.getRecipientType().isBlank()) {
            throw new IllegalArgumentException("Recipient type is required");
        }

        String title = request.getSubject() != null ? request.getSubject() : "Message from Admin";
        String message = request.getContent() != null ? request.getContent() : "";
        String from = request.getFrom() != null ? request.getFrom() : "StayBook Admin";
        NotificationType type = request.getType() != null ? request.getType() : NotificationType.INFO;

        String recipientType = request.getRecipientType().trim().toUpperCase();
        if ("TRAVELER".equals(recipientType)) {
            travelerNotificationService.createNotificationForEmail(
                    request.getEmail().trim(),
                    title,
                    message,
                    from,
                    type
            );
            return;
        }

        if ("PARTNER".equals(recipientType)) {
            partnerNotificationService.createNotificationForEmail(
                    request.getEmail().trim(),
                    title,
                    message,
                    from,
                    type
            );
            return;
        }

        throw new IllegalArgumentException("Unsupported recipient type: " + request.getRecipientType());
    }
}
