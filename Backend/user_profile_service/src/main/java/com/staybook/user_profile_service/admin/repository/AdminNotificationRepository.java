package com.staybook.user_profile_service.admin.repository;

import com.staybook.user_profile_service.admin.entity.AdminNotification;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdminNotificationRepository extends MongoRepository<AdminNotification, String> {

    long countByIsReadFalse();
}
