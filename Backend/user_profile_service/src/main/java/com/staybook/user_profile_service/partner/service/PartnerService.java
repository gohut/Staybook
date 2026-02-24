package com.staybook.user_profile_service.partner.service;

import com.staybook.user_profile_service.admin.dto.AdminNotificationRequest;
import com.staybook.user_profile_service.admin.service.AdminNotificationService;
import com.staybook.user_profile_service.common.BusinessException;
import com.staybook.user_profile_service.partner.dto.PartnerUpdateRequest;
import com.staybook.user_profile_service.partner.entity.Partner;
import com.staybook.user_profile_service.partner.repository.PartnerRepository;
import com.staybook.user_profile_service.traveler.entity.NotificationType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class PartnerService {

    private final PartnerRepository partnerRepository;
    private final AdminNotificationService adminNotificationService;
    private static final String DEFAULT_PARTNER_CATEGORY = "hotel_partners";
    private static final double DEFAULT_COMMISSION_PERCENTAGE = 15.0;

    public Partner getOrCreatePartner(String email) {

        return partnerRepository.findByEmail(email)
                .orElseGet(() -> {

                    Partner newPartner = Partner.builder()
                            .email(email)
                            .name("New Partner")
                            .phone("")
                            .role("HOTEL_ADMIN")
                            .partnerCategory(DEFAULT_PARTNER_CATEGORY)
                            .commissionPercentage(DEFAULT_COMMISSION_PERCENTAGE)
                            .hotelIds(new ArrayList<>())
                            .createdAt(LocalDateTime.now())
                            .build();

                    Partner savedPartner = partnerRepository.save(newPartner);

                    AdminNotificationRequest notification = new AdminNotificationRequest();
                    notification.setTitle("New Partner Request");
                    notification.setMessage(
                            String.format("Partner %s (%s) created a new profile request.",
                                    savedPartner.getName(), savedPartner.getEmail())
                    );
                    notification.setFrom(savedPartner.getEmail());
                    notification.setFromRole("PARTNER");
                    notification.setType(NotificationType.INFO);
                    adminNotificationService.createNotification(notification);

                    return savedPartner;
                });
    }

    public Partner getPartner(String email) {
        return partnerRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("Partner not found"));
    }

    public Partner updatePartner(String email, PartnerUpdateRequest request) {
        Partner partner = partnerRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("Partner not found"));

        if (request.getName() != null && !request.getName().isBlank()) {
            partner.setName(request.getName());
        }
        if (request.getPhone() != null) {
            partner.setPhone(request.getPhone());
        }
        if (request.getRole() != null && !request.getRole().isBlank()) {
            partner.setRole(request.getRole());
        }

        partner.setUpdatedAt(LocalDateTime.now());

        if (partner.getPartnerCategory() == null || partner.getPartnerCategory().isBlank()) {
            partner.setPartnerCategory(DEFAULT_PARTNER_CATEGORY);
        }
        if (partner.getCommissionPercentage() == null) {
            partner.setCommissionPercentage(DEFAULT_COMMISSION_PERCENTAGE);
        }

        return partnerRepository.save(partner);
    }
}
