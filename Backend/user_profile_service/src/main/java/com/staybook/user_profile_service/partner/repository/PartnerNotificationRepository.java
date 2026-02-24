package com.staybook.user_profile_service.partner.repository;

import com.staybook.user_profile_service.partner.entity.PartnerNotification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PartnerNotificationRepository extends MongoRepository<PartnerNotification, String> {

    Page<PartnerNotification> findByEmail(String email, Pageable pageable);

    long countByEmailAndIsReadFalse(String email);
}
