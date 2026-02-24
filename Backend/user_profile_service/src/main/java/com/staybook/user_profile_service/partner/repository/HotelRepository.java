package com.staybook.user_profile_service.partner.repository;

import com.staybook.user_profile_service.partner.entity.Hotel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface HotelRepository extends MongoRepository<Hotel, String> {

    List<Hotel> findByPartnerId(String partnerId);
}
