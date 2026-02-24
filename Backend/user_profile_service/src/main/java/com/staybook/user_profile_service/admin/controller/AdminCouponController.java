package com.staybook.user_profile_service.admin.controller;

import com.staybook.user_profile_service.admin.dto.AdminCouponRequest;
import com.staybook.user_profile_service.admin.entity.AdminCoupon;
import com.staybook.user_profile_service.admin.service.AdminCouponService;
import com.staybook.user_profile_service.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/coupons")
@RequiredArgsConstructor
public class AdminCouponController {

    private final AdminCouponService couponService;

    @GetMapping
    public ApiResponse<List<AdminCoupon>> listCoupons() {
        return ApiResponse.<List<AdminCoupon>>builder()
                .success(true)
                .message("Coupons fetched successfully")
                .data(couponService.listCoupons())
                .build();
    }

    @PostMapping
    public ApiResponse<AdminCoupon> createCoupon(@RequestBody AdminCouponRequest request) {
        AdminCoupon coupon = couponService.createCoupon(request);
        return ApiResponse.<AdminCoupon>builder()
                .success(true)
                .message("Coupon created successfully")
                .data(coupon)
                .build();
    }
}
