package com.staybook.user_profile_service.traveler.service;

import com.staybook.user_profile_service.traveler.dto.TravelerBookingResponse;
import com.staybook.user_profile_service.traveler.entity.BookingStatus;
import com.staybook.user_profile_service.traveler.entity.TravelerBooking;
import com.staybook.user_profile_service.traveler.repository.TravelerBookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
public class TravelerBookingService {

    private final TravelerBookingRepository bookingRepository;

    public Page<TravelerBookingResponse> getTrips(String email,
                                                  BookingStatus status,
                                                  Pageable pageable) {

        Page<TravelerBooking> bookings;

        if (status != null) {
            bookings = bookingRepository.findByEmailAndStatus(email, status, pageable);
        } else {
            bookings = bookingRepository.findByEmail(email, pageable);
        }

        return bookings.map(this::mapToResponse);
    }

    private TravelerBookingResponse mapToResponse(TravelerBooking booking) {

        return TravelerBookingResponse.builder()
                .bookingId(booking.getBookingId())
                .hotelName(booking.getHotelName())
                .location(booking.getLocation())
                .checkInDate(booking.getCheckInDate())
                .checkOutDate(booking.getCheckOutDate())
                .roomType(booking.getRoomType())
                .guestsCount(booking.getGuestsCount())
                .nights(booking.getNights())
                .status(booking.getStatus())
                .imageUrl(booking.getImageUrl())
                .build();
    }
}
