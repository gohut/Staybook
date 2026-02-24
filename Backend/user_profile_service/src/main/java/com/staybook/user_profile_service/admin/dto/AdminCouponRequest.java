package com.staybook.user_profile_service.admin.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AdminCouponRequest {
    private String name;
    private String code;
    private String discountType;
    private Double discountValue;
    private String generationCondition;
    private Double costValue;
    private LocalDate validFrom;
    private LocalDate validTo;
    private Integer usageLimit;
    private String appliesTo;
}
