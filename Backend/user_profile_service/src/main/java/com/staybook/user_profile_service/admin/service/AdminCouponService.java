package com.staybook.user_profile_service.admin.service;

import com.staybook.user_profile_service.admin.dto.AdminCouponRequest;
import com.staybook.user_profile_service.admin.entity.AdminCoupon;
import com.staybook.user_profile_service.admin.repository.AdminCouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AdminCouponService {

    private final AdminCouponRepository repository;

    public List<AdminCoupon> listCoupons() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public AdminCoupon createCoupon(AdminCouponRequest request) {
        if (request.getName() == null || request.getName().isBlank()) {
            throw new IllegalArgumentException("Coupon name is required");
        }
        if (request.getDiscountType() == null || request.getDiscountType().isBlank()) {
            throw new IllegalArgumentException("Discount type is required");
        }
        if (request.getDiscountValue() == null) {
            throw new IllegalArgumentException("Discount value is required");
        }
        if (request.getGenerationCondition() == null || request.getGenerationCondition().isBlank()) {
            throw new IllegalArgumentException("Generation condition is required");
        }

        String generation = normalize(request.getGenerationCondition());
        if ("COST".equals(generation)) {
            if (request.getCostValue() == null || request.getCostValue() <= 0) {
                throw new IllegalArgumentException("Cost value is required for cost coupons");
            }
        }

        if (request.getValidFrom() == null || request.getValidTo() == null) {
            throw new IllegalArgumentException("Valid dates are required");
        }
        if (request.getValidTo().isBefore(request.getValidFrom())) {
            throw new IllegalArgumentException("Valid To must be after Valid From");
        }

        String code = request.getCode();
        if (code == null || code.isBlank()) {
            code = generateCode(generation);
        }
        code = code.trim().toUpperCase(Locale.ROOT);

        if (repository.findByCode(code).isPresent()) {
            throw new IllegalArgumentException("Coupon code already exists");
        }

        AdminCoupon coupon = AdminCoupon.builder()
                .name(request.getName().trim())
                .code(code)
                .discountType(normalize(request.getDiscountType()))
                .discountValue(request.getDiscountValue())
                .generationCondition(generation)
                .costValue(request.getCostValue())
                .validFrom(request.getValidFrom())
                .validTo(request.getValidTo())
                .usageLimit(request.getUsageLimit())
                .usageCount(0)
                .appliesTo(request.getAppliesTo() != null ? request.getAppliesTo() : "ALL_HOTELS")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return repository.save(coupon);
    }

    private String normalize(String value) {
        return value.trim().toUpperCase(Locale.ROOT).replace(" ", "_");
    }

    private String generateCode(String generation) {
        String prefix = switch (generation) {
            case "LUCKY" -> "LUCKY";
            case "FIRST_TIME" -> "FIRST";
            case "COST" -> "COST";
            default -> "COUPON";
        };
        String random = UUID.randomUUID().toString().substring(0, 6).toUpperCase(Locale.ROOT);
        return prefix + "-" + random;
    }
}
