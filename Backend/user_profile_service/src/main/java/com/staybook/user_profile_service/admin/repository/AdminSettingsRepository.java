package com.staybook.user_profile_service.admin.repository;

import com.staybook.user_profile_service.admin.entity.AdminSettings;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdminSettingsRepository extends MongoRepository<AdminSettings, String> {
}
