package com.staybook.user_profile_service.admin.repository;

import com.staybook.user_profile_service.admin.entity.AdminCommission;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AdminCommissionRepository extends MongoRepository<AdminCommission, String> {

    Optional<AdminCommission> findByHotelId(String hotelId);
}
