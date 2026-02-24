package com.staybook.user_profile_service.admin.repository;

import com.staybook.user_profile_service.admin.entity.AdminCoupon;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AdminCouponRepository extends MongoRepository<AdminCoupon, String> {
    Optional<AdminCoupon> findByCode(String code);
}
