package com.staybook.user_profile_service.partner.repository;

import com.staybook.user_profile_service.partner.entity.Partner;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface PartnerRepository extends MongoRepository<Partner, String> {

    Optional<Partner> findByEmail(String email);

    List<Partner> findByPartnerCategory(String partnerCategory);
}
