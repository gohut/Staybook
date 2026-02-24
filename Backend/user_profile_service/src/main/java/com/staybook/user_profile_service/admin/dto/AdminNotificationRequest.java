package com.staybook.user_profile_service.admin.dto;

import com.staybook.user_profile_service.traveler.entity.NotificationType;
import lombok.Data;

@Data
public class AdminNotificationRequest {
    private String title;
    private String message;
    private String from;
    private String fromRole;
    private NotificationType type;
}
