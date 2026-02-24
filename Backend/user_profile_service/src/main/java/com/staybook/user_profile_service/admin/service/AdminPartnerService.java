package com.staybook.user_profile_service.admin.service;

import com.staybook.user_profile_service.admin.dto.AdminPartnerDetailResponse;
import com.staybook.user_profile_service.common.BusinessException;
import com.staybook.user_profile_service.partner.entity.Hotel;
import com.staybook.user_profile_service.partner.entity.Partner;
import com.staybook.user_profile_service.partner.repository.HotelRepository;
import com.staybook.user_profile_service.partner.repository.PartnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminPartnerService {

    private final PartnerRepository partnerRepository;
    private final HotelRepository hotelRepository;
    private static final String DEFAULT_PARTNER_CATEGORY = "hotel_partners";
    private static final double DEFAULT_COMMISSION_PERCENTAGE = 15.0;

    public Partner createSubPartner(String email, String parentAdminEmail, String name) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("Sub-partner email is required");
        }
        if (parentAdminEmail == null || parentAdminEmail.isBlank()) {
            throw new IllegalArgumentException("Partner admin email is required");
        }

        if (partnerRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Partner user already exists");
        }

        String derivedName = name;
        if (derivedName == null || derivedName.isBlank()) {
            derivedName = email.split("@")[0];
        }

        Partner partner = Partner.builder()
                .email(email.trim())
                .name(derivedName)
                .phone("")
                .role("SUB_PARTNER")
                .parentAdminEmail(parentAdminEmail.trim())
                .partnerCategory(DEFAULT_PARTNER_CATEGORY)
                .commissionPercentage(DEFAULT_COMMISSION_PERCENTAGE)
                .hotelIds(new ArrayList<>())
                .createdAt(LocalDateTime.now())
                .build();

        return partnerRepository.save(partner);
    }

    public List<Partner> listPartners(String category) {
        if (category == null || category.isBlank()) {
            return partnerRepository.findAll();
        }

        String trimmedCategory = category.trim();
        List<Partner> partners = partnerRepository.findByPartnerCategory(trimmedCategory);
        if (!partners.isEmpty()) {
            return partners;
        }

        String normalized = trimmedCategory.toLowerCase();
        if (!normalized.equals(trimmedCategory)) {
            partners = partnerRepository.findByPartnerCategory(normalized);
            if (!partners.isEmpty()) {
                return partners;
            }
        }

        List<Partner> allPartners = partnerRepository.findAll();
        return allPartners.stream()
                .filter(partner -> {
                    String partnerCategory = partner.getPartnerCategory();
                    return partnerCategory != null && partnerCategory.equalsIgnoreCase(trimmedCategory);
                })
                .toList();
    }

    public AdminPartnerDetailResponse getPartnerDetails(String partnerId) {
        Partner partner = partnerRepository.findById(partnerId)
                .orElseThrow(() -> new BusinessException("Partner not found"));
        List<Hotel> hotels = (partner.getId() != null)
                ? hotelRepository.findByPartnerId(partner.getId())
                : Collections.emptyList();

        return AdminPartnerDetailResponse.builder()
                .partner(partner)
                .hotels(hotels)
                .build();
    }

    public void deletePartner(String partnerId) {
        Partner partner = partnerRepository.findById(partnerId)
                .orElseThrow(() -> new BusinessException("Partner not found"));
        partnerRepository.delete(partner);
    }
}
