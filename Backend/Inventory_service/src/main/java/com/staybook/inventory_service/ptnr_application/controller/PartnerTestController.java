package com.staybook.inventory_service.ptnr_application.controller;

import com.staybook.inventory_service.ptnr_application.model.ApplicationStatus;
import com.staybook.inventory_service.ptnr_application.model.PartnerApplication;
import com.staybook.inventory_service.ptnr_application.repository.PartnerApplicationRepository;
import com.staybook.inventory_service.ptnr_application.service.FileStorageService;
import com.staybook.inventory_service.ptnr_application.service.PartnerApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class PartnerTestController {

    private final PartnerApplicationRepository repository;
    private final MongoTemplate mongoTemplate;
    private final FileStorageService fileStorageService;
    private final PartnerApplicationService partnerApplicationService;

    @PostMapping("/create")
    public String create() {
        System.out.println("Connected DB: " + mongoTemplate.getDb().getName());

        PartnerApplication application = PartnerApplication.builder()
                .hotelName("Test Hotel")
                .ownerName("Gowtham")
                .email("gowtham@test.com")
                .phone("99999599999")
                .location("Chennai")
                .regDate(LocalDate.now())
                .status(ApplicationStatus.PENDING)
                .build();

        repository.save(application);

        return "Creation successful";
    }

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        String fileId = fileStorageService.storeFile(file);
        return "File uploaded" + fileId;
    }

    @PostMapping("/submit")
    public Map<String, Object> submitApplication(
            @RequestParam String hotelName,
            @RequestParam String ownerName,
            @RequestParam String email,
            @RequestParam String phone,
            @RequestParam String location,
            @RequestParam MultipartFile businessLicense,
            @RequestParam MultipartFile idProof,
            @RequestParam MultipartFile taxRegistration,
            @RequestParam(required = false) List<MultipartFile> propertyPhotos
    ) throws IOException {

        PartnerApplication savedApplication =
                partnerApplicationService.submitApplication(
                        hotelName,
                        ownerName,
                        email,
                        phone,
                        location,
                        businessLicense,
                        idProof,
                        taxRegistration,
                        propertyPhotos
                );

        return Map.of(
                "success", true,
                "message", "Application submitted successfully",
                "applicationId", savedApplication.getId()
        );
    }

    @GetMapping("/status/{id}")
    public Map<String, Object> getStatus(@PathVariable String id) {

        PartnerApplication application = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Application not found"));

        return Map.of(
                "success", true,
                "applicationId", id,
                "status", application.getStatus()
        );
    }

    @PutMapping("/review/{id}")
    public Map<String, Object> review(@PathVariable String id) {
        PartnerApplication app = partnerApplicationService.moveToUnderReview(id);

        return Map.of(
                "success", true,
                "status", app.getStatus()
        );
    }

    @PutMapping("/approve/{id}")
    public Map<String, Object> approve(@PathVariable String id) {
        PartnerApplication app = partnerApplicationService.approveApplication(id);

        return Map.of(
                "success", true,
                "status", app.getStatus()
        );
    }

        @PutMapping("/reject/{id}")
    public Map<String, Object> reject(@PathVariable String id) {
        PartnerApplication app = partnerApplicationService.rejectApplication(id);

        return Map.of(
                "success", true,
                "status", app.getStatus()
        );
    }
}
