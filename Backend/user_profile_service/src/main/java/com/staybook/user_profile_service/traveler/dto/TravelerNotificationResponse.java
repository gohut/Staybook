package com.staybook.user_profile_service.traveler.dto;

import com.staybook.user_profile_service.traveler.entity.NotificationType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class TravelerNotificationResponse {

    private String id;
    private String title;
    private String message;
    private String from;
    private NotificationType type;
    private boolean isRead;
    private LocalDateTime createdAt;
}
