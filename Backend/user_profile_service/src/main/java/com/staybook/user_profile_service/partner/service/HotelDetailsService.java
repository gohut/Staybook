package com.staybook.user_profile_service.partner.service;

import com.staybook.user_profile_service.common.BusinessException;
import com.staybook.user_profile_service.partner.dto.RoomTypeRequest;
import com.staybook.user_profile_service.partner.entity.Hotel;
import com.staybook.user_profile_service.partner.entity.HotelDetails;
import com.staybook.user_profile_service.partner.entity.Partner;
import com.staybook.user_profile_service.partner.entity.RoomType;
import com.staybook.user_profile_service.partner.repository.HotelDetailsRepository;
import com.staybook.user_profile_service.partner.repository.HotelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class HotelDetailsService {

    private final HotelDetailsRepository hotelDetailsRepository;
    private final HotelRepository hotelRepository;
    private final PartnerService partnerService;

    public HotelDetails getDetails(String authUserId, String hotelId) {
        validateAccess(authUserId, hotelId);
        return getOrCreateDetails(hotelId);
    }

    public RoomType addRoomType(String authUserId, String hotelId, RoomTypeRequest request) {
        HotelDetails details = getDetails(authUserId, hotelId);
        List<RoomType> roomTypes = ensureRoomTypes(details);

        RoomType roomType = RoomType.builder()
                .id(UUID.randomUUID().toString())
                .name(request.getName())
                .bedType(request.getBedType())
                .maxGuests(request.getMaxGuests())
                .roomSizeSqFt(request.getRoomSizeSqFt())
                .totalRooms(request.getTotalRooms())
                .amenities(request.getAmenities())
                .basePrice(request.getBasePrice())
                .currency(request.getCurrency())
                .isActive(request.getIsActive() != null ? request.getIsActive() : Boolean.TRUE)
                .build();

        roomTypes.add(roomType);
        details.setRoomTypes(roomTypes);
        hotelDetailsRepository.save(details);

        return roomType;
    }

    public RoomType updateRoomType(String authUserId,
                                   String hotelId,
                                   String roomTypeId,
                                   RoomTypeRequest request) {
        HotelDetails details = getDetails(authUserId, hotelId);
        List<RoomType> roomTypes = ensureRoomTypes(details);

        RoomType roomType = roomTypes.stream()
                .filter(rt -> rt.getId() != null && rt.getId().equals(roomTypeId))
                .findFirst()
                .orElseThrow(() -> new BusinessException("Room type not found"));

        if (request.getName() != null) {
            roomType.setName(request.getName());
        }
        if (request.getBedType() != null) {
            roomType.setBedType(request.getBedType());
        }
        if (request.getMaxGuests() != null) {
            roomType.setMaxGuests(request.getMaxGuests());
        }
        if (request.getRoomSizeSqFt() != null) {
            roomType.setRoomSizeSqFt(request.getRoomSizeSqFt());
        }
        if (request.getTotalRooms() != null) {
            roomType.setTotalRooms(request.getTotalRooms());
        }
        if (request.getAmenities() != null) {
            roomType.setAmenities(request.getAmenities());
        }
        if (request.getBasePrice() != null) {
            roomType.setBasePrice(request.getBasePrice());
        }
        if (request.getCurrency() != null) {
            roomType.setCurrency(request.getCurrency());
        }
        if (request.getIsActive() != null) {
            roomType.setIsActive(request.getIsActive());
        }

        hotelDetailsRepository.save(details);
        return roomType;
    }

    public void deleteRoomType(String authUserId, String hotelId, String roomTypeId) {
        HotelDetails details = getDetails(authUserId, hotelId);
        List<RoomType> roomTypes = ensureRoomTypes(details);

        boolean removed = roomTypes.removeIf(rt -> rt.getId() != null && rt.getId().equals(roomTypeId));
        if (!removed) {
            throw new BusinessException("Room type not found");
        }

        details.setRoomTypes(roomTypes);
        hotelDetailsRepository.save(details);
    }

    private void validateAccess(String authUserId, String hotelId) {
        Partner partner = partnerService.getOrCreatePartner(authUserId);
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new BusinessException("Hotel not found"));

        if (!hotel.getPartnerId().equals(partner.getId())) {
            throw new BusinessException("Unauthorized access");
        }
    }

    private HotelDetails getOrCreateDetails(String hotelId) {
        return hotelDetailsRepository.findByHotelId(hotelId)
                .orElseGet(() -> hotelDetailsRepository.save(
                        HotelDetails.builder()
                                .hotelId(hotelId)
                                .roomTypes(new ArrayList<>())
                                .ratePlans(new ArrayList<>())
                                .reviews(new ArrayList<>())
                                .photos(new ArrayList<>())
                                .build()
                ));
    }

    private List<RoomType> ensureRoomTypes(HotelDetails details) {
        if (details.getRoomTypes() == null) {
            details.setRoomTypes(new ArrayList<>());
        }
        return details.getRoomTypes();
    }
}
