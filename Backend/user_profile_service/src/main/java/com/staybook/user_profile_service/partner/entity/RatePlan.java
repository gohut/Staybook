package com.staybook.user_profile_service.partner.entity;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RatePlan {

    private String id;

    private String roomTypeId;

    private String planName;

    private Boolean breakfast;
    private Boolean lunch;
    private Boolean dinner;

    private Boolean isRefundable;

    private List<String> benefits;

    private Boolean isActive;
}
