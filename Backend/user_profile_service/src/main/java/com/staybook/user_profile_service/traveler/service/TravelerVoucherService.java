package com.staybook.user_profile_service.traveler.service;

import com.staybook.user_profile_service.traveler.dto.TravelerVoucherResponse;
import com.staybook.user_profile_service.traveler.entity.TravelerVoucher;
import com.staybook.user_profile_service.traveler.entity.VoucherStatus;
import com.staybook.user_profile_service.traveler.repository.TravelerVoucherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TravelerVoucherService {

    private final TravelerVoucherRepository voucherRepository;

    public List<TravelerVoucherResponse> getVouchers(String email, VoucherStatus status) {

        List<TravelerVoucher> vouchers;

        if (status != null) {
            vouchers = voucherRepository.findByEmailAndStatus(email, status);
        } else {
            vouchers = voucherRepository.findByEmail(email);
        }

        return vouchers.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private TravelerVoucherResponse mapToResponse(TravelerVoucher voucher) {

        return TravelerVoucherResponse.builder()
                .bookingId(voucher.getBookingId())
                .hotelName(voucher.getHotelName())
                .location(voucher.getLocation())
                .checkInDate(voucher.getCheckInDate())
                .checkOutDate(voucher.getCheckOutDate())
                .roomType(voucher.getRoomType())
                .guestsCount(voucher.getGuestsCount())
                .status(voucher.getStatus())
                .build();
    }
}
