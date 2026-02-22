package com.staybook.user_profile_service.traveler.dto;

import com.staybook.user_profile_service.traveler.entity.NotificationType;
import lombok.Data;

@Data
public class TravelerAdminNotificationRequest {
    private String email;
    private String title;
    private String message;
    private String from;
    private NotificationType type;
}
