package com.staybook.inventory_service.ptnr_application.service;

import com.staybook.inventory_service.ptnr_application.model.ApplicationStatus;
import com.staybook.inventory_service.ptnr_application.model.PartnerApplication;
import com.staybook.inventory_service.ptnr_application.repository.PartnerApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PartnerApplicationService {

    private final PartnerApplicationRepository repository;
    private final FileStorageService fileStorageService;

    public PartnerApplication submitApplication(
            String hotelName,
            String ownerName,
            String email,
            String phone,
            String location,
            MultipartFile businessLicense,
            MultipartFile idProof,
            MultipartFile taxRegistration,
            List<MultipartFile> propertyPhotos
    ) throws IOException {

        if (businessLicense == null || businessLicense.isEmpty()) {
            throw new IllegalArgumentException("Business License is required");
        }

        if (idProof == null || idProof.isEmpty()) {
            throw new IllegalArgumentException("ID Proof is required");
        }

        if (taxRegistration == null || taxRegistration.isEmpty()) {
            throw new IllegalArgumentException("Tax Registration document is required");
        }

        if (hotelName == null || hotelName.isBlank()) {
            throw new IllegalArgumentException("Hotel name is required");
        }

        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email");
        }

        // Store PDFs
        String businessLicenseId = fileStorageService.storeFile(businessLicense);
        String idProofId = fileStorageService.storeFile(idProof);
        String taxId = fileStorageService.storeFile(taxRegistration);

        // Store images
        List<String> photoIds = new ArrayList<>();
        if (propertyPhotos != null) {
            for (MultipartFile photo : propertyPhotos) {
                photoIds.add(fileStorageService.storeFile(photo));
            }
        }

        PartnerApplication application = PartnerApplication.builder()
                .hotelName(hotelName)
                .ownerName(ownerName)
                .email(email)
                .phone(phone)
                .location(location)
                .regDate(LocalDate.now())
                .status(ApplicationStatus.PENDING)
                .businessLicenseFileId(businessLicenseId)
                .idProofFileId(idProofId)
                .taxRegistrationFileId(taxId)
                .propertyPhotoFileIds(photoIds)
                .build();

        return repository.save(application);
    }

    public PartnerApplication moveToUnderReview(String id) {
        PartnerApplication app = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Application not found"));

        if (app.getStatus() != ApplicationStatus.PENDING) {
            throw new IllegalArgumentException("Only PENDING applications can move to UNDER_REVIEW");
        }

        app.setStatus(ApplicationStatus.UNDER_REVIEW);
        return repository.save(app);
    }

    public PartnerApplication approveApplication(String id) {
        PartnerApplication app = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Application not found"));

        if (app.getStatus() != ApplicationStatus.UNDER_REVIEW) {
            throw new IllegalArgumentException("Application must be UNDER_REVIEW to approve");
        }

        app.setStatus(ApplicationStatus.APPROVED);
        return repository.save(app);
    }

    public PartnerApplication rejectApplication(String id) {
        PartnerApplication app = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Application not found"));

        if (app.getStatus() != ApplicationStatus.UNDER_REVIEW) {
            throw new IllegalArgumentException("Application must be UNDER_REVIEW to reject");
        }

        app.setStatus(ApplicationStatus.REJECTED);
        return repository.save(app);
    }
}
