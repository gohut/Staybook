package com.staybook.user_profile_service.partner.repository;

import com.staybook.user_profile_service.partner.entity.HotelDetails;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface HotelDetailsRepository extends MongoRepository<HotelDetails, String> {

    Optional<HotelDetails> findByHotelId(String hotelId);
}
