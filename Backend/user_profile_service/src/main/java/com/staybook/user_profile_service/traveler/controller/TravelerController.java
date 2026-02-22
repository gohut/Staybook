package com.staybook.user_profile_service.traveler.controller;

import com.staybook.user_profile_service.common.ApiResponse;
import com.staybook.user_profile_service.traveler.dto.TravelerRequest;
import com.staybook.user_profile_service.traveler.dto.TravelerResponse;
import com.staybook.user_profile_service.traveler.dto.TravelerBookingResponse;
import com.staybook.user_profile_service.traveler.dto.TravelerNotificationResponse;
import com.staybook.user_profile_service.traveler.dto.TravelerNotificationRequest;
import com.staybook.user_profile_service.traveler.dto.TravelerAdminNotificationRequest;
import com.staybook.user_profile_service.traveler.dto.TravelerVoucherResponse;
import com.staybook.user_profile_service.traveler.entity.BookingStatus;
import com.staybook.user_profile_service.traveler.entity.VoucherStatus;
import com.staybook.user_profile_service.traveler.service.TravelerBookingService;
import com.staybook.user_profile_service.traveler.service.TravelerNotificationService;
import com.staybook.user_profile_service.traveler.service.TravelerService;
import com.staybook.user_profile_service.traveler.service.TravelerVoucherService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.io.IOException;
import java.time.LocalDate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@RestController
@RequestMapping("/api/traveler")
@RequiredArgsConstructor
public class TravelerController {

    private final TravelerService travelerService;
    private final TravelerBookingService bookingService;
    private final TravelerNotificationService notificationService;
    private final TravelerVoucherService voucherService;
    private final GridFsTemplate gridFsTemplate;

    @PostMapping(consumes = "multipart/form-data")
    public ApiResponse<TravelerResponse> createProfile(Authentication authentication,
                                                       @RequestParam String firstName,
                                                       @RequestParam String lastName,
                                                       @RequestParam String phone,
                                                       @RequestParam String dob,
                                                       @RequestParam String nationality,
                                                       @RequestParam(value = "avatar", required = false) MultipartFile avatar
    ) throws IOException {

        String email = authentication.getName();

        TravelerRequest request = new TravelerRequest();
        request.setFirstName(firstName);
        request.setLastName(lastName);
        request.setPhone(phone);
        request.setDob(LocalDate.parse(dob));
        request.setNationality(nationality);

        TravelerResponse response =
                travelerService.createProfile(email, request, avatar);

        return ApiResponse.<TravelerResponse>builder()
                .success(true)
                .message("Profile created successfully")
                .data(response)
                .build();
    }

    @GetMapping
    public ApiResponse<TravelerResponse> getProfile(Authentication authentication) {

        String email = authentication.getName();
        TravelerResponse response = travelerService.getProfile(email);

        return ApiResponse.<TravelerResponse>builder()
                .success(true)
                .message("Profile fetched successfully")
                .data(response)
                .build();
    }

    @PutMapping
    public ApiResponse<TravelerResponse> updateProfile(Authentication authentication,
                                                       @RequestBody TravelerRequest request) {

        String email = authentication.getName();
        TravelerResponse response = travelerService.updateProfile(email, request);

        return ApiResponse.<TravelerResponse>builder()
                .success(true)
                .message("Profile updated successfully")
                .data(response)
                .build();
    }

    @GetMapping("/trips")
    public ApiResponse<Page<TravelerBookingResponse>> getTrips(
            Authentication authentication,
            @RequestParam(required = false) BookingStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        String email = authentication.getName();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<TravelerBookingResponse> trips =
                bookingService.getTrips(email, status, pageable);

        return ApiResponse.<Page<TravelerBookingResponse>>builder()
                .success(true)
                .message("Trips fetched successfully")
                .data(trips)
                .build();
    }

    @GetMapping("/notifications")
    public ApiResponse<Page<TravelerNotificationResponse>> getNotifications(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        String email = authentication.getName();
        Pageable pageable =
                PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<TravelerNotificationResponse> notifications =
                notificationService.getNotifications(email, pageable);

        return ApiResponse.<Page<TravelerNotificationResponse>>builder()
                .success(true)
                .message("Notifications fetched successfully")
                .data(notifications)
                .build();
    }

    @PostMapping("/notifications")
    public ApiResponse<TravelerNotificationResponse> createNotification(
            Authentication authentication,
            @RequestBody TravelerNotificationRequest request) {

        String email = authentication.getName();
        TravelerNotificationResponse response =
                notificationService.createNotification(email, request);

        return ApiResponse.<TravelerNotificationResponse>builder()
                .success(true)
                .message("Notification created successfully")
                .data(response)
                .build();
    }

    @PostMapping("/admin/notifications")
    public ApiResponse<Void> createAdminNotification(
            @RequestBody TravelerAdminNotificationRequest request) {

        notificationService.createNotificationForEmail(
                request.getEmail(),
                request.getTitle(),
                request.getMessage(),
                request.getFrom(),
                request.getType()
        );

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Notification created successfully")
                .data(null)
                .build();
    }

    @GetMapping("/notifications/unread-count")
    public ApiResponse<Long> getUnreadCount(Authentication authentication) {

        String email = authentication.getName();
        long count = notificationService.getUnreadCount(email);

        return ApiResponse.<Long>builder()
                .success(true)
                .message("Unread count fetched successfully")
                .data(count)
                .build();
    }

    @PutMapping("/notifications/{id}/read")
    public ApiResponse<Void> markNotificationAsRead(Authentication authentication,
                                                    @PathVariable String id) {

        String email = authentication.getName();
        notificationService.markAsRead(email, id);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Notification marked as read")
                .data(null)
                .build();
    }

    @GetMapping("/vouchers")
    public ApiResponse<List<TravelerVoucherResponse>> getVouchers(Authentication authentication,
                                                                  @RequestParam(required = false) VoucherStatus status) {

        String email = authentication.getName();
        List<TravelerVoucherResponse> vouchers = voucherService.getVouchers(email, status);

        return ApiResponse.<List<TravelerVoucherResponse>>builder()
                .success(true)
                .message("Vouchers fetched successfully")
                .data(vouchers)
                .build();
    }

    @GetMapping("/avatar/{fileId}")
    public ResponseEntity<byte[]> getAvatar(@PathVariable String fileId)
            throws IOException {

        GridFsResource resource = gridFsTemplate
                .getResource(
                        gridFsTemplate.findOne(
                                Query.query(Criteria.where("_id").is(fileId))
                        )
                );

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE,
                        resource.getContentType())
                .body(resource.getInputStream().readAllBytes());
    }
}
