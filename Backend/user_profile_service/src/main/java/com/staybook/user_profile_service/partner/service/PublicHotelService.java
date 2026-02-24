package com.staybook.user_profile_service.partner.service;

import com.staybook.user_profile_service.common.BusinessException;
import com.staybook.user_profile_service.partner.dto.PublicHotelDetailsResponse;
import com.staybook.user_profile_service.partner.dto.PublicHotelSummaryResponse;
import com.staybook.user_profile_service.partner.entity.Hotel;
import com.staybook.user_profile_service.partner.entity.HotelDetails;
import com.staybook.user_profile_service.partner.entity.HotelPhoto;
import com.staybook.user_profile_service.partner.entity.Review;
import com.staybook.user_profile_service.partner.entity.RoomType;
import com.staybook.user_profile_service.partner.repository.HotelDetailsRepository;
import com.staybook.user_profile_service.partner.repository.HotelPhotoRepository;
import com.staybook.user_profile_service.partner.repository.HotelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PublicHotelService {

    private final HotelRepository hotelRepository;
    private final HotelDetailsRepository hotelDetailsRepository;
    private final HotelPhotoRepository hotelPhotoRepository;

    public List<PublicHotelSummaryResponse> listHotels() {
        return hotelRepository.findAll()
                .stream()
                .map(this::mapSummary)
                .toList();
    }

    public PublicHotelDetailsResponse getHotelDetails(String hotelId) {
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new BusinessException("Hotel not found"));

        HotelDetails details = hotelDetailsRepository.findByHotelId(hotelId).orElse(null);
        RatingSummary ratingSummary = buildRatingSummary(details);
        PriceSummary priceSummary = buildPriceSummary(details);
        List<HotelPhoto> photos = hotelPhotoRepository.findByHotelId(hotelId);

        return PublicHotelDetailsResponse.builder()
                .id(hotel.getId())
                .name(hotel.getName())
                .starRating(hotel.getStarRating())
                .description(hotel.getDescription())
                .location(hotel.getLocation())
                .contact(hotel.getContact())
                .checkInTime(hotel.getCheckInTime())
                .checkOutTime(hotel.getCheckOutTime())
                .status(hotel.getStatus())
                .minPrice(priceSummary.minPrice())
                .currency(priceSummary.currency())
                .averageRating(ratingSummary.averageRating())
                .reviewCount(ratingSummary.reviewCount())
                .roomTypes(details != null ? details.getRoomTypes() : List.of())
                .reviews(details != null ? details.getReviews() : List.of())
                .photos(photos)
                .build();
    }

    public List<HotelPhoto> listPhotos(String hotelId, String roomTypeId) {
        List<HotelPhoto> photos;
        if (roomTypeId != null && !roomTypeId.isBlank()) {
            photos = hotelPhotoRepository.findByRoomTypeId(roomTypeId);
        } else {
            photos = hotelPhotoRepository.findByHotelId(hotelId);
        }
        return photos.stream()
                .filter(photo -> hotelId.equals(photo.getHotelId()))
                .toList();
    }

    private PublicHotelSummaryResponse mapSummary(Hotel hotel) {
        HotelDetails details = hotelDetailsRepository.findByHotelId(hotel.getId()).orElse(null);
        RatingSummary ratingSummary = buildRatingSummary(details);
        PriceSummary priceSummary = buildPriceSummary(details);
        String heroFileId = resolveHeroPhoto(hotel.getId());

        return PublicHotelSummaryResponse.builder()
                .id(hotel.getId())
                .name(hotel.getName())
                .starRating(hotel.getStarRating())
                .description(hotel.getDescription())
                .location(hotel.getLocation())
                .contact(hotel.getContact())
                .checkInTime(hotel.getCheckInTime())
                .checkOutTime(hotel.getCheckOutTime())
                .status(hotel.getStatus())
                .minPrice(priceSummary.minPrice())
                .currency(priceSummary.currency())
                .averageRating(ratingSummary.averageRating())
                .reviewCount(ratingSummary.reviewCount())
                .heroPhotoFileId(heroFileId)
                .build();
    }

    private String resolveHeroPhoto(String hotelId) {
        List<HotelPhoto> photos = hotelPhotoRepository.findByHotelId(hotelId);
        Optional<HotelPhoto> primary = photos.stream()
                .filter(photo -> Boolean.TRUE.equals(photo.getIsPrimary()))
                .findFirst();
        if (primary.isPresent()) {
            return primary.get().getFileId();
        }
        return photos.isEmpty() ? null : photos.get(0).getFileId();
    }

    private RatingSummary buildRatingSummary(HotelDetails details) {
        if (details == null || details.getReviews() == null || details.getReviews().isEmpty()) {
            return new RatingSummary(0.0, 0L);
        }

        List<Review> reviews = details.getReviews();
        double sum = reviews.stream()
                .map(Review::getRating)
                .filter(rating -> rating != null)
                .mapToDouble(Double::doubleValue)
                .sum();
        long count = reviews.stream().filter(rating -> rating.getRating() != null).count();
        if (count == 0) {
            return new RatingSummary(0.0, 0L);
        }
        return new RatingSummary(sum / count, count);
    }

    private PriceSummary buildPriceSummary(HotelDetails details) {
        if (details == null || details.getRoomTypes() == null || details.getRoomTypes().isEmpty()) {
            return new PriceSummary(null, null);
        }

        return details.getRoomTypes().stream()
                .filter(room -> room.getBasePrice() != null)
                .min(Comparator.comparingDouble(RoomType::getBasePrice))
                .map(room -> new PriceSummary(room.getBasePrice(), room.getCurrency()))
                .orElse(new PriceSummary(null, null));
    }

    private record RatingSummary(Double averageRating, Long reviewCount) {}

    private record PriceSummary(Double minPrice, String currency) {}
}
