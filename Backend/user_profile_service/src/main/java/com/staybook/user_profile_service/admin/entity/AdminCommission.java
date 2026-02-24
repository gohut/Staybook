package com.staybook.user_profile_service.admin.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "admin_commissions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminCommission {

    @Id
    private String id;

    private String hotelId;
    private String partnerId;
    private String category;

    private Double separateCommissionRate;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
