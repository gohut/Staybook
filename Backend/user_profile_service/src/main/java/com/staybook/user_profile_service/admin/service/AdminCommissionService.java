package com.staybook.user_profile_service.admin.service;

import com.staybook.user_profile_service.admin.dto.AdminCommissionDetailResponse;
import com.staybook.user_profile_service.admin.dto.AdminCommissionRoomResponse;
import com.staybook.user_profile_service.admin.dto.AdminCommissionSummaryResponse;
import com.staybook.user_profile_service.admin.dto.AdminCommissionUpdateRequest;
import com.staybook.user_profile_service.admin.entity.AdminCommission;
import com.staybook.user_profile_service.admin.entity.AdminSettings;
import com.staybook.user_profile_service.admin.repository.AdminCommissionRepository;
import com.staybook.user_profile_service.common.BusinessException;
import com.staybook.user_profile_service.partner.entity.Hotel;
import com.staybook.user_profile_service.partner.entity.HotelDetails;
import com.staybook.user_profile_service.partner.entity.Partner;
import com.staybook.user_profile_service.partner.entity.RoomType;
import com.staybook.user_profile_service.partner.repository.HotelDetailsRepository;
import com.staybook.user_profile_service.partner.repository.HotelRepository;
import com.staybook.user_profile_service.partner.repository.PartnerRepository;
import com.staybook.user_profile_service.partner.service.PartnerNotificationService;
import com.staybook.user_profile_service.traveler.entity.NotificationType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminCommissionService {

    private static final String DEFAULT_CATEGORY = "hotel_partners";

    private final AdminCommissionRepository commissionRepository;
    private final HotelRepository hotelRepository;
    private final HotelDetailsRepository hotelDetailsRepository;
    private final PartnerRepository partnerRepository;
    private final AdminSettingsService settingsService;
    private final PartnerNotificationService partnerNotificationService;

    public List<AdminCommissionSummaryResponse> getCommissionSummaries(String category) {
        double basicCommission = resolveBasicCommissionRate();
        List<AdminCommissionSummaryResponse> summaries = new ArrayList<>();

        List<Hotel> hotels = hotelRepository.findAll();
        for (Hotel hotel : hotels) {
            Partner partner = resolvePartner(hotel.getPartnerId());
            String resolvedCategory = resolveCategory(partner);

            if (category != null && !category.isBlank()
                    && !resolvedCategory.equalsIgnoreCase(category.trim())) {
                continue;
            }

            AdminCommission commission = resolveCommission(hotel, partner, resolvedCategory);
            double separateCommission = valueOrZero(commission.getSeparateCommissionRate());
            double totalRate = basicCommission + separateCommission;
            double totalCommissionAmount = computeTotalCommissionAmount(hotel.getId(), totalRate);

            summaries.add(AdminCommissionSummaryResponse.builder()
                    .hotelId(hotel.getId())
                    .hotelName(hotel.getName())
                    .partnerId(partner != null ? partner.getId() : null)
                    .partnerName(partner != null ? partner.getName() : "-")
                    .partnerEmail(partner != null ? partner.getEmail() : "-")
                    .category(resolvedCategory)
                    .basicCommissionRate(basicCommission)
                    .separateCommissionRate(separateCommission)
                    .totalCommissionAmount(totalCommissionAmount)
                    .build());
        }

        return summaries;
    }

    public AdminCommissionDetailResponse getCommissionDetails(String hotelId) {
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new BusinessException("Hotel not found"));
        Partner partner = resolvePartner(hotel.getPartnerId());
        String category = resolveCategory(partner);

        AdminCommission commission = resolveCommission(hotel, partner, category);
        double basicCommission = resolveBasicCommissionRate();
        double separateCommission = valueOrZero(commission.getSeparateCommissionRate());
        double totalRate = basicCommission + separateCommission;

        List<AdminCommissionRoomResponse> rooms = buildRoomResponses(hotel.getId(), totalRate);
        double totalCommissionAmount = rooms.stream()
                .mapToDouble(room -> valueOrZero(room.getCommissionAmount()))
                .sum();

        return AdminCommissionDetailResponse.builder()
                .hotelId(hotel.getId())
                .hotelName(hotel.getName())
                .partnerId(partner != null ? partner.getId() : null)
                .partnerName(partner != null ? partner.getName() : "-")
                .partnerEmail(partner != null ? partner.getEmail() : "-")
                .category(category)
                .basicCommissionRate(basicCommission)
                .separateCommissionRate(separateCommission)
                .totalCommissionRate(totalRate)
                .totalCommissionAmount(totalCommissionAmount)
                .rooms(rooms)
                .build();
    }

    public AdminCommissionDetailResponse updateSeparateCommission(String hotelId, AdminCommissionUpdateRequest request) {
        if (request.getSeparateCommissionRate() == null) {
            throw new IllegalArgumentException("Separate commission rate is required");
        }

        double newSeparateRate = request.getSeparateCommissionRate();
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new BusinessException("Hotel not found"));
        Partner partner = resolvePartner(hotel.getPartnerId());
        String category = resolveCategory(partner);

        AdminCommission commission = resolveCommission(hotel, partner, category);
        double previousSeparateRate = valueOrZero(commission.getSeparateCommissionRate());

        commission.setSeparateCommissionRate(newSeparateRate);
        commission.setUpdatedAt(LocalDateTime.now());
        commission.setPartnerId(partner != null ? partner.getId() : commission.getPartnerId());
        commission.setCategory(category);
        commissionRepository.save(commission);

        double basicCommission = resolveBasicCommissionRate();
        double totalRate = basicCommission + newSeparateRate;

        if (partner != null) {
            partner.setCommissionPercentage(totalRate);
            if (partner.getPartnerCategory() == null || partner.getPartnerCategory().isBlank()) {
                partner.setPartnerCategory(category);
            }
            partnerRepository.save(partner);

            String changeWord = "updated";
            if (newSeparateRate > previousSeparateRate) {
                changeWord = "increased";
            } else if (newSeparateRate < previousSeparateRate) {
                changeWord = "decreased";
            }

            String message = String.format(
                    "Your commission rate was %s to %.2f%% (Basic %.2f%% + Separate %.2f%%).",
                    changeWord,
                    totalRate,
                    basicCommission,
                    newSeparateRate
            );

            if (partner.getEmail() != null && !partner.getEmail().isBlank()) {
                partnerNotificationService.createNotificationForEmail(
                        partner.getEmail(),
                        "Commission Update",
                        message,
                        "StayBook Admin",
                        NotificationType.SYSTEM
                );
            }
        }

        return getCommissionDetails(hotelId);
    }

    private AdminCommission resolveCommission(Hotel hotel, Partner partner, String category) {
        Optional<AdminCommission> existing = commissionRepository.findByHotelId(hotel.getId());
        if (existing.isPresent()) {
            AdminCommission commission = existing.get();
            boolean changed = false;
            if (commission.getPartnerId() == null && partner != null) {
                commission.setPartnerId(partner.getId());
                changed = true;
            }
            if (commission.getCategory() == null || commission.getCategory().isBlank()) {
                commission.setCategory(category);
                changed = true;
            }
            if (changed) {
                commissionRepository.save(commission);
            }
            return commission;
        }

        AdminCommission commission = AdminCommission.builder()
                .hotelId(hotel.getId())
                .partnerId(partner != null ? partner.getId() : null)
                .category(category)
                .separateCommissionRate(0.0)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return commissionRepository.save(commission);
    }

    private List<AdminCommissionRoomResponse> buildRoomResponses(String hotelId, double totalRate) {
        Optional<HotelDetails> detailsOpt = hotelDetailsRepository.findByHotelId(hotelId);
        if (detailsOpt.isEmpty() || detailsOpt.get().getRoomTypes() == null) {
            return new ArrayList<>();
        }

        List<AdminCommissionRoomResponse> rooms = new ArrayList<>();
        for (RoomType room : detailsOpt.get().getRoomTypes()) {
            double basePrice = valueOrZero(room.getBasePrice());
            double commissionAmount = basePrice * totalRate / 100.0;
            rooms.add(AdminCommissionRoomResponse.builder()
                    .roomTypeId(room.getId())
                    .name(room.getName())
                    .basePrice(basePrice)
                    .commissionAmount(commissionAmount)
                    .build());
        }

        return rooms;
    }

    private double computeTotalCommissionAmount(String hotelId, double totalRate) {
        List<AdminCommissionRoomResponse> rooms = buildRoomResponses(hotelId, totalRate);
        return rooms.stream().mapToDouble(room -> valueOrZero(room.getCommissionAmount())).sum();
    }

    private double resolveBasicCommissionRate() {
        AdminSettings settings = settingsService.getSettings();
        return settings.getDefaultCommissionRate() != null ? settings.getDefaultCommissionRate() : 0.0;
    }

    private Partner resolvePartner(String partnerId) {
        if (partnerId == null || partnerId.isBlank()) {
            return null;
        }
        return partnerRepository.findById(partnerId).orElse(null);
    }

    private String resolveCategory(Partner partner) {
        if (partner == null) {
            return DEFAULT_CATEGORY;
        }
        if (partner.getPartnerCategory() == null || partner.getPartnerCategory().isBlank()) {
            return DEFAULT_CATEGORY;
        }
        return partner.getPartnerCategory();
    }

    private double valueOrZero(Double value) {
        return value == null ? 0.0 : value;
    }
}
