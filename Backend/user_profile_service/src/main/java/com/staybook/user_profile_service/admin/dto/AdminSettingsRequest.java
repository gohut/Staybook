package com.staybook.user_profile_service.admin.dto;

import lombok.Data;

@Data
public class AdminSettingsRequest {
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
}
