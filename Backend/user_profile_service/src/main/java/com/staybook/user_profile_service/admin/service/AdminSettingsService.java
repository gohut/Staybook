package com.staybook.user_profile_service.admin.service;

import com.staybook.user_profile_service.admin.dto.AdminSettingsRequest;
import com.staybook.user_profile_service.admin.entity.AdminSettings;
import com.staybook.user_profile_service.admin.repository.AdminSettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AdminSettingsService {

    private static final String SETTINGS_ID = "GLOBAL";
    private final AdminSettingsRepository repository;

    public AdminSettings getSettings() {
        return repository.findById(SETTINGS_ID)
                .orElseGet(this::createDefaults);
    }

    public AdminSettings updateSettings(AdminSettingsRequest request) {
        AdminSettings settings = repository.findById(SETTINGS_ID)
                .orElseGet(this::createDefaults);

        if (request.getDefaultCommissionRate() != null) {
            settings.setDefaultCommissionRate(request.getDefaultCommissionRate());
        }
        if (request.getMinCommissionRate() != null) {
            settings.setMinCommissionRate(request.getMinCommissionRate());
        }
        if (request.getMaxCommissionRate() != null) {
            settings.setMaxCommissionRate(request.getMaxCommissionRate());
        }
        if (request.getServiceFeeType() != null && !request.getServiceFeeType().isBlank()) {
            settings.setServiceFeeType(request.getServiceFeeType().trim());
        }
        if (request.getServiceFeeValue() != null) {
            settings.setServiceFeeValue(request.getServiceFeeValue());
        }
        if (request.getAutoApproveHotels() != null) {
            settings.setAutoApproveHotels(request.getAutoApproveHotels());
        }
        if (request.getRequireTaxRegistration() != null) {
            settings.setRequireTaxRegistration(request.getRequireTaxRegistration());
        }
        if (request.getRequireBusinessLicense() != null) {
            settings.setRequireBusinessLicense(request.getRequireBusinessLicense());
        }
        if (request.getRequireEmailVerification() != null) {
            settings.setRequireEmailVerification(request.getRequireEmailVerification());
        }
        if (request.getMaxCouponUsagePerUser() != null) {
            settings.setMaxCouponUsagePerUser(request.getMaxCouponUsagePerUser());
        }
        if (request.getAllowMultipleCouponsPerBooking() != null) {
            settings.setAllowMultipleCouponsPerBooking(request.getAllowMultipleCouponsPerBooking());
        }
        if (request.getSuspiciousActivityThreshold() != null) {
            settings.setSuspiciousActivityThreshold(request.getSuspiciousActivityThreshold());
        }

        settings.setUpdatedAt(LocalDateTime.now());

        return repository.save(settings);
    }

    private AdminSettings createDefaults() {
        AdminSettings defaults = AdminSettings.builder()
                .id(SETTINGS_ID)
                .defaultCommissionRate(15.0)
                .minCommissionRate(10.0)
                .maxCommissionRate(25.0)
                .serviceFeeType("PERCENTAGE")
                .serviceFeeValue(2.5)
                .autoApproveHotels(false)
                .requireTaxRegistration(true)
                .requireBusinessLicense(true)
                .requireEmailVerification(true)
                .maxCouponUsagePerUser(3)
                .allowMultipleCouponsPerBooking(false)
                .suspiciousActivityThreshold(5)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return repository.save(defaults);
    }
}
