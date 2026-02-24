package com.staybook.inventory_service.registration.repository;

import com.staybook.inventory_service.registration.model.HotelBooking;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface HotelBookingRepository extends MongoRepository<HotelBooking, String> {

    Optional<HotelBooking> findByBookingId(String bookingId);
}
