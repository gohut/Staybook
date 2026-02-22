package com.staybook.user_profile_service.traveler.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "travelers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Traveler {

    @Id
    private String id;

    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private LocalDate dob;
    private String nationality;
    private String avatarFileId;

    private String profileTier;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
