package com.staybook.user_profile_service.traveler.repository;

import com.staybook.user_profile_service.traveler.entity.BookingStatus;
import com.staybook.user_profile_service.traveler.entity.TravelerBooking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TravelerBookingRepository extends MongoRepository<TravelerBooking, String> {

    Page<TravelerBooking> findByEmail(String email, Pageable pageable);

    Page<TravelerBooking> findByEmailAndStatus(String email,
                                               BookingStatus status,
                                               Pageable pageable);
}
