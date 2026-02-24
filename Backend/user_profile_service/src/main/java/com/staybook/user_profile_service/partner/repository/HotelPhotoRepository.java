package com.staybook.user_profile_service.partner.repository;

import com.staybook.user_profile_service.partner.entity.HotelPhoto;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface HotelPhotoRepository extends MongoRepository<HotelPhoto, String> {

    List<HotelPhoto> findByHotelId(String hotelId);

    List<HotelPhoto> findByRoomTypeId(String roomTypeId);
}
