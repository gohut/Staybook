package com.staybook.inventory_service.registration.controller;

import com.staybook.inventory_service.registration.dto.HotelBookingPaymentRequest;
import com.staybook.inventory_service.registration.dto.HotelBookingRequest;
import com.staybook.inventory_service.registration.dto.HotelBookingStatusUpdateRequest;
import com.staybook.inventory_service.registration.model.HotelBooking;
import com.staybook.inventory_service.registration.service.HotelBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class HotelBookingController {

    private final HotelBookingService bookingService;

    @PostMapping
    public HotelBooking create(@RequestBody HotelBookingRequest request) {
        return bookingService.createBooking(request);
    }

    @GetMapping
    public List<HotelBooking> listBookings() {
        return bookingService.listBookings();
    }

    @GetMapping("/{bookingId}")
    public HotelBooking getBooking(@PathVariable String bookingId) {
        return bookingService.getBooking(bookingId);
    }

    @PutMapping("/{bookingId}/payment")
    public HotelBooking updatePayment(@PathVariable String bookingId,
                                      @RequestBody HotelBookingPaymentRequest request) {
        return bookingService.updatePaymentStatus(bookingId, request);
    }

    @PutMapping("/{bookingId}/status")
    public HotelBooking updateStatus(@PathVariable String bookingId,
                                     @RequestBody HotelBookingStatusUpdateRequest request) {
        return bookingService.updateBookingStatus(
                bookingId,
                request.getPaymentStatus(),
                request.getBookingStatus()
        );
    }
}
