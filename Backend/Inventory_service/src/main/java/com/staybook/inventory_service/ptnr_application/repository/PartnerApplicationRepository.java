package com.staybook.inventory_service.ptnr_application.repository;
import com.staybook.inventory_service.ptnr_application.model.PartnerApplication;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface PartnerApplicationRepository extends MongoRepository<PartnerApplication, String> {
}
