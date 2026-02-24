package com.staybook.user_profile_service.admin.dto;

import com.staybook.user_profile_service.traveler.entity.NotificationType;
import lombok.Data;

@Data
public class AdminMessageRequest {
    private String recipientType; // PARTNER or TRAVELER
    private String email;
    private String subject;
    private String content;
    private String from;
    private NotificationType type;
}
