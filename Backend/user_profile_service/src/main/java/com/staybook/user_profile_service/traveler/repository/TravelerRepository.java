package com.staybook.user_profile_service.traveler.repository;

import com.staybook.user_profile_service.traveler.entity.Traveler;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TravelerRepository extends MongoRepository<Traveler, String> {

    Optional<Traveler> findByEmail(String email);

    boolean existsByEmail(String email);
}
