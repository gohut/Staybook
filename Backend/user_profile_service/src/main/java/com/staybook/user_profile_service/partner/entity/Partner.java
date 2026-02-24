package com.staybook.user_profile_service.partner.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "partners")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Partner {

    @Id
    private String id;

    private String email; // This is JWT subject from auth-service

    private String name;
    private String phone;

    private String role; // HOTEL_ADMIN

    private String parentAdminEmail;

    private String partnerCategory; // hotel_partners, homestay_partners, packages_partner, flight_partner

    private Double commissionPercentage; // basic + separate commission

    private List<String> hotelIds;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
