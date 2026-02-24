package com.staybook.user_profile_service.admin.entity;

import com.staybook.user_profile_service.traveler.entity.NotificationType;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "admin_notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminNotification {

    @Id
    private String id;

    private String title;
    private String message;
    private String from;
    private String fromRole;
    private NotificationType type;

    private boolean isRead;

    private LocalDateTime createdAt;
}
