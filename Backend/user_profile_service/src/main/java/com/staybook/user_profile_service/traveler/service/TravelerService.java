package com.staybook.user_profile_service.traveler.service;

import com.staybook.user_profile_service.common.BusinessException;
import com.staybook.user_profile_service.common.FileStorageService;
import com.staybook.user_profile_service.traveler.dto.TravelerRequest;
import com.staybook.user_profile_service.traveler.dto.TravelerResponse;
import com.staybook.user_profile_service.traveler.entity.Traveler;
import com.staybook.user_profile_service.traveler.repository.TravelerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TravelerService {

    private final TravelerRepository travelerRepository;
    private final FileStorageService fileStorageService;

    public TravelerResponse createProfile(String email,
                                          TravelerRequest request,
                                          MultipartFile avatar) throws IOException {

        if (travelerRepository.existsByEmail(email)) {
            throw new BusinessException("Profile already exists");
        }

        String fileId = null;

        if (avatar != null && !avatar.isEmpty()) {
            fileId = fileStorageService.storeFile(avatar);
        }

        Traveler traveler = Traveler.builder()
                .email(email)
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phone(request.getPhone())
                .dob(request.getDob())
                .nationality(request.getNationality())
                .avatarFileId(fileId)
                .profileTier("SILVER")
                .createdAt(LocalDateTime.now())
                .build();

        travelerRepository.save(traveler);

        return mapToResponse(traveler);
    }

    public TravelerResponse getProfile(String email) {

        Traveler traveler = travelerRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("Profile not found"));

        return mapToResponse(traveler);
    }

    public TravelerResponse updateProfile(String email, TravelerRequest request) {

        Traveler traveler = travelerRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("Profile not found"));

        traveler.setFirstName(request.getFirstName());
        traveler.setLastName(request.getLastName());
        traveler.setPhone(request.getPhone());
        traveler.setDob(request.getDob());
        traveler.setNationality(request.getNationality());
        traveler.setUpdatedAt(LocalDateTime.now());

        travelerRepository.save(traveler);

        return mapToResponse(traveler);
    }

    private TravelerResponse mapToResponse(Traveler traveler) {
        return TravelerResponse.builder()
                .email(traveler.getEmail())
                .firstName(traveler.getFirstName())
                .lastName(traveler.getLastName())
                .phone(traveler.getPhone())
                .dob(traveler.getDob())
                .nationality(traveler.getNationality())
                .avatarFileId(traveler.getAvatarFileId())
                .profileTier(traveler.getProfileTier())
                .build();
    }
}
