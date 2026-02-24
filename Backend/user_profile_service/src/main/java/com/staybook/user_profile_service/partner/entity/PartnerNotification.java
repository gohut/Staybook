package com.staybook.user_profile_service.partner.entity;

import com.staybook.user_profile_service.traveler.entity.NotificationType;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "partner_notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PartnerNotification {

    @Id
    private String id;

    private String email;
    private String title;
    private String message;
    private String from;
    private NotificationType type;

    private boolean isRead;

    private LocalDateTime createdAt;
}
