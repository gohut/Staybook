package com.staybook.user_profile_service.traveler.repository;

import com.staybook.user_profile_service.traveler.entity.TravelerVoucher;
import com.staybook.user_profile_service.traveler.entity.VoucherStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TravelerVoucherRepository extends MongoRepository<TravelerVoucher, String> {

    List<TravelerVoucher> findByEmail(String email);

    List<TravelerVoucher> findByEmailAndStatus(String email, VoucherStatus status);
}
