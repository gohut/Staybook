package com.staybook.user_profile_service.admin.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "admin_settings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminSettings {

    @Id
    private String id;

    private Double defaultCommissionRate;
    private Double minCommissionRate;
    private Double maxCommissionRate;

    private String serviceFeeType;
    private Double serviceFeeValue;

    private Boolean autoApproveHotels;
    private Boolean requireTaxRegistration;
    private Boolean requireBusinessLicense;
    private Boolean requireEmailVerification;

    private Integer maxCouponUsagePerUser;
    private Boolean allowMultipleCouponsPerBooking;
    private Integer suspiciousActivityThreshold;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
