package com.staybook.user_profile_service.traveler.service;

import com.staybook.user_profile_service.traveler.dto.TravelerBookingResponse;
import com.staybook.user_profile_service.traveler.dto.TravelerBookingRequest;
import com.staybook.user_profile_service.traveler.dto.TravelerBookingPaymentRequest;
import com.staybook.user_profile_service.traveler.entity.BookingStatus;
import com.staybook.user_profile_service.traveler.entity.TravelerBooking;
import com.staybook.user_profile_service.traveler.repository.TravelerBookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

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

    public TravelerBookingResponse createBooking(String email, TravelerBookingRequest request) {

        TravelerBooking booking = TravelerBooking.builder()
                .email(email)
                .bookingId(request.getBookingId())
                .hotelName(request.getHotelName())
                .location(request.getLocation())
                .roomType(request.getRoomType())
                .checkInDate(request.getCheckInDate())
                .checkOutDate(request.getCheckOutDate())
                .guestsCount(request.getGuestsCount() != null ? request.getGuestsCount() : 0)
                .nights(request.getNights() != null ? request.getNights() : 0)
                .totalPaid(request.getTotalPaid() != null ? request.getTotalPaid() : 0)
                .currency(request.getCurrency() != null ? request.getCurrency() : "INR")
                .status(request.getStatus() != null ? request.getStatus() : BookingStatus.CONFIRMED)
                .imageUrl(request.getImageUrl())
                .createdAt(LocalDateTime.now())
                .build();

        bookingRepository.save(booking);
        return mapToResponse(booking);
    }

    public TravelerBookingResponse updatePayment(String email,
                                                 String bookingId,
                                                 TravelerBookingPaymentRequest request) {

        TravelerBooking booking = bookingRepository.findByEmailAndBookingId(email, bookingId)
                .orElseThrow(() -> new com.staybook.user_profile_service.common.BusinessException("Booking not found"));

        if (request.getTotalPaid() != null) {
            booking.setTotalPaid(request.getTotalPaid());
        }
        if (request.getCurrency() != null && !request.getCurrency().isBlank()) {
            booking.setCurrency(request.getCurrency());
        }
        if (booking.getStatus() == BookingStatus.PENDING) {
            booking.setStatus(BookingStatus.CONFIRMED);
        }

        bookingRepository.save(booking);
        return mapToResponse(booking);
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
