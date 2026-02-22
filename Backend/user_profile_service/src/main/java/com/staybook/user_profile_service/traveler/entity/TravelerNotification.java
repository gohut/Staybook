package com.staybook.user_profile_service.traveler.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "traveler_notifications")
@CompoundIndex(name = "email_createdAt_index",
        def = "{'email': 1, 'createdAt': -1}")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TravelerNotification {

    @Id
    private String id;

    private String email;

    private String title;
    private String message;

    private String from; // system / hotel / admin

    private NotificationType type;

    private boolean isRead;

    private LocalDateTime createdAt;
}
