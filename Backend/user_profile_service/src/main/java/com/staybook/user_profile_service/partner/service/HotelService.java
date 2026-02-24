package com.staybook.user_profile_service.partner.service;

import com.staybook.user_profile_service.common.BusinessException;
import com.staybook.user_profile_service.partner.dto.HotelRequest;
import com.staybook.user_profile_service.partner.entity.*;
import com.staybook.user_profile_service.partner.repository.HotelDetailsRepository;
import com.staybook.user_profile_service.partner.repository.HotelRepository;
import com.staybook.user_profile_service.partner.repository.PartnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HotelService {

    private final HotelRepository hotelRepository;
    private final HotelDetailsRepository hotelDetailsRepository;
    private final PartnerRepository partnerRepository;
    private final PartnerService partnerService;

    public Hotel createHotel(String authUserId, HotelRequest request) {

        Partner partner = partnerService.getOrCreatePartner(authUserId);

        Hotel hotel = Hotel.builder()
                .partnerId(partner.getId())
                .name(request.getName())
                .starRating(request.getStarRating())
                .description(request.getDescription())
                .location(buildLocation(request))
                .contact(buildContact(request))
                .checkInTime(request.getCheckInTime())
                .checkOutTime(request.getCheckOutTime())
                .status("DRAFT")
                .createdAt(LocalDateTime.now())
                .build();

        Hotel savedHotel = hotelRepository.save(hotel);

        // Add hotelId to partner
        partner.getHotelIds().add(savedHotel.getId());
        partner.setUpdatedAt(LocalDateTime.now());
        partnerRepository.save(partner);

        // Auto create empty HotelDetails document
        HotelDetails hotelDetails = HotelDetails.builder()
                .hotelId(savedHotel.getId())
                .roomTypes(new ArrayList<>())
                .ratePlans(new ArrayList<>())
                .reviews(new ArrayList<>())
                .photos(new ArrayList<>())
                .build();

        hotelDetailsRepository.save(hotelDetails);

        return savedHotel;
    }

    public Hotel getHotelById(String hotelId) {
        return hotelRepository.findById(hotelId)
                .orElseThrow(() -> new BusinessException("Hotel not found"));
    }

    public List<Hotel> getHotelsForPartner(String authUserId) {
        Partner partner = partnerService.getOrCreatePartner(authUserId);
        return hotelRepository.findByPartnerId(partner.getId());
    }

    public Hotel updateHotel(String authUserId, String hotelId, HotelRequest request) {
        Partner partner = partnerService.getOrCreatePartner(authUserId);
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new BusinessException("Hotel not found"));

        if (!hotel.getPartnerId().equals(partner.getId())) {
            throw new BusinessException("Unauthorized access");
        }

        if (request.getName() != null) {
            hotel.setName(request.getName());
        }
        if (request.getStarRating() != null) {
            hotel.setStarRating(request.getStarRating());
        }
        if (request.getDescription() != null) {
            hotel.setDescription(request.getDescription());
        }
        if (request.getCheckInTime() != null) {
            hotel.setCheckInTime(request.getCheckInTime());
        }
        if (request.getCheckOutTime() != null) {
            hotel.setCheckOutTime(request.getCheckOutTime());
        }

        hotel.setLocation(mergeLocation(hotel.getLocation(), request));
        hotel.setContact(mergeContact(hotel.getContact(), request));
        hotel.setUpdatedAt(LocalDateTime.now());

        return hotelRepository.save(hotel);
    }

    private Location buildLocation(HotelRequest request) {
        return Location.builder()
                .address(request.getAddress())
                .city(request.getCity())
                .state(request.getState())
                .country(request.getCountry())
                .pincode(request.getPincode())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .build();
    }

    private Contact buildContact(HotelRequest request) {
        return Contact.builder()
                .phone(request.getPhone())
                .email(request.getEmail())
                .build();
    }

    private Location mergeLocation(Location existing, HotelRequest request) {
        Location location = existing != null ? existing : new Location();
        if (request.getAddress() != null) {
            location.setAddress(request.getAddress());
        }
        if (request.getCity() != null) {
            location.setCity(request.getCity());
        }
        if (request.getState() != null) {
            location.setState(request.getState());
        }
        if (request.getCountry() != null) {
            location.setCountry(request.getCountry());
        }
        if (request.getPincode() != null) {
            location.setPincode(request.getPincode());
        }
        if (request.getLatitude() != null) {
            location.setLatitude(request.getLatitude());
        }
        if (request.getLongitude() != null) {
            location.setLongitude(request.getLongitude());
        }
        return location;
    }

    private Contact mergeContact(Contact existing, HotelRequest request) {
        Contact contact = existing != null ? existing : new Contact();
        if (request.getPhone() != null) {
            contact.setPhone(request.getPhone());
        }
        if (request.getEmail() != null) {
            contact.setEmail(request.getEmail());
        }
        return contact;
    }
}
