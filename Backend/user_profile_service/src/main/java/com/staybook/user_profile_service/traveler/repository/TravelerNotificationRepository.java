package com.staybook.user_profile_service.traveler.repository;

import com.staybook.user_profile_service.traveler.entity.TravelerNotification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TravelerNotificationRepository extends MongoRepository<TravelerNotification, String> {

    Page<TravelerNotification> findByEmail(String email, Pageable pageable);

    long countByEmailAndIsReadFalse(String email);
}
