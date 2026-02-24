package com.staybook.user_profile_service.admin.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "admin_coupons")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminCoupon {

    @Id
    private String id;

    private String name;
    private String code;
    private String discountType;
    private Double discountValue;

    private String generationCondition;
    private Double costValue;

    private LocalDate validFrom;
    private LocalDate validTo;
    private Integer usageLimit;
    private Integer usageCount;
    private String appliesTo;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
