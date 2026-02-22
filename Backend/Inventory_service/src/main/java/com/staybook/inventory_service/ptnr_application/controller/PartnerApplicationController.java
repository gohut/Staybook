package com.staybook.inventory_service.ptnr_application.controller;

import com.staybook.inventory_service.ptnr_application.model.ApplicationStatus;
import com.staybook.inventory_service.ptnr_application.model.PartnerApplication;
import com.staybook.inventory_service.ptnr_application.repository.PartnerApplicationRepository;
import com.staybook.inventory_service.ptnr_application.service.PartnerApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/partner-applications")
@RequiredArgsConstructor
public class PartnerApplicationController {

    private final PartnerApplicationRepository repository;
    private final PartnerApplicationService applicationService;
    private final GridFsTemplate gridFsTemplate;

    @GetMapping
    public List<PartnerApplication> list(@RequestParam(required = false) ApplicationStatus status) {

        if (status != null) {
            return repository.findByStatusOrderByRegDateDesc(status);
        }

        return repository.findAll(Sort.by(Sort.Direction.DESC, "regDate"));
    }

    @GetMapping("/{id}")
    public PartnerApplication getById(@PathVariable String id) {

        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Application not found"));
    }

    @PutMapping("/{id}/review")
    public PartnerApplication review(@PathVariable String id) {
        return applicationService.moveToUnderReview(id);
    }

    @PutMapping("/{id}/approve")
    public PartnerApplication approve(@PathVariable String id) {
        return applicationService.approveApplication(id);
    }

    @PutMapping("/{id}/reject")
    public PartnerApplication reject(@PathVariable String id) {
        return applicationService.rejectApplication(id);
    }

    @GetMapping("/file/{fileId}")
    public ResponseEntity<byte[]> getFile(@PathVariable String fileId) throws IOException {

        var file = gridFsTemplate.findOne(Query.query(Criteria.where("_id").is(fileId)));
        if (file == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found");
        }

        GridFsResource resource = gridFsTemplate.getResource(file);
        String contentType = resource.getContentType();
        if (contentType == null || contentType.isBlank()) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, contentType)
                .body(resource.getInputStream().readAllBytes());
    }
}
