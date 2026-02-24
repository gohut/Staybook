package com.staybook.inventory_service.registration.service;

import com.staybook.inventory_service.registration.dto.HotelBookingPaymentRequest;
import com.staybook.inventory_service.registration.dto.HotelBookingRequest;
import com.staybook.inventory_service.registration.model.HotelBooking;
import com.staybook.inventory_service.registration.repository.HotelBookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class HotelBookingService {

    private final HotelBookingRepository bookingRepository;

    public HotelBooking createBooking(HotelBookingRequest request) {
        String bookingId = generateBookingId();
        double bookingAmount = request.getBookingAmount() != null ? request.getBookingAmount() : 0;
        double commission = bookingAmount * 0.1;

        HotelBooking booking = HotelBooking.builder()
                .bookingId(bookingId)
                .hotelName(request.getHotelName())
                .guestNames(request.getGuestNames())
                .guestEmail(request.getGuestEmail())
                .bookingAmount(bookingAmount)
                .checkInDate(request.getCheckInDate())
                .checkOutDate(request.getCheckOutDate())
                .adultCount(request.getAdultCount() != null ? request.getAdultCount() : 0)
                .childrenCount(request.getChildrenCount() != null ? request.getChildrenCount() : 0)
                .commission(commission)
                .paymentStatus(
                        request.getPaymentStatus() != null ? normalizeStatus(request.getPaymentStatus()) : "PENDING")
                .bookingStatus(
                        request.getBookingStatus() != null ? normalizeStatus(request.getBookingStatus()) : "CONFIRMED")
                .createdAt(LocalDateTime.now())
                .build();

        return bookingRepository.save(booking);
    }

    public HotelBooking getBooking(String bookingId) {
        return bookingRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));
    }

    public HotelBooking updatePaymentStatus(String bookingId, HotelBookingPaymentRequest request) {
        HotelBooking booking = getBooking(bookingId);
        String status = request.getPaymentStatus();
        if (status == null || status.isBlank()) {
            status = "PAID";
        }
        booking.setPaymentStatus(normalizeStatus(status));
        return bookingRepository.save(booking);
    }

    public HotelBooking updateBookingStatus(String bookingId, String paymentStatus, String bookingStatus) {
        HotelBooking booking = getBooking(bookingId);
        if (paymentStatus != null && !paymentStatus.isBlank()) {
            booking.setPaymentStatus(normalizeStatus(paymentStatus));
        }
        if (bookingStatus != null && !bookingStatus.isBlank()) {
            booking.setBookingStatus(normalizeStatus(bookingStatus));
        }
        return bookingRepository.save(booking);
    }

    public List<HotelBooking> listBookings() {
        return bookingRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    private String generateBookingId() {
        String shortId = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        String datePart = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        return "BK-" + datePart + "-" + shortId;
    }

    private String normalizeStatus(String value) {
        return value.trim().toUpperCase().replace(" ", "_").replace("-", "_");
    }
}
