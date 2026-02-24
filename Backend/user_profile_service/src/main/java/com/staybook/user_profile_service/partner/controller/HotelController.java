package com.staybook.user_profile_service.partner.controller;

import com.staybook.user_profile_service.common.ApiResponse;
import com.staybook.user_profile_service.common.BusinessException;
import com.staybook.user_profile_service.partner.dto.HotelRequest;
import com.staybook.user_profile_service.partner.dto.RoomTypeRequest;
import com.staybook.user_profile_service.partner.entity.Hotel;
import com.staybook.user_profile_service.partner.entity.HotelDetails;
import com.staybook.user_profile_service.partner.entity.HotelPhoto;
import com.staybook.user_profile_service.partner.entity.RoomType;
import com.staybook.user_profile_service.partner.repository.HotelPhotoRepository;
import com.staybook.user_profile_service.partner.service.HotelDetailsService;
import com.staybook.user_profile_service.partner.service.HotelService;
import com.staybook.user_profile_service.partner.service.PhotoStorageService;
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

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/partner/hotels")
@RequiredArgsConstructor
public class HotelController {

    private final HotelService hotelService;
    private final HotelDetailsService hotelDetailsService;
    private final HotelPhotoRepository hotelPhotoRepository;
    private final PhotoStorageService photoStorageService;
    private final GridFsTemplate gridFsTemplate;

    @PostMapping
    public ApiResponse<Hotel> createHotel(Authentication authentication,
                                          @RequestBody HotelRequest request) {

        String authUserId = authentication.getName();

        Hotel hotel = hotelService.createHotel(authUserId, request);

        return ApiResponse.<Hotel>builder()
                .success(true)
                .message("Hotel created successfully")
                .data(hotel)
                .build();
    }

    @GetMapping
    public ApiResponse<List<Hotel>> listHotels(Authentication authentication) {

        String authUserId = authentication.getName();

        List<Hotel> hotels = hotelService.getHotelsForPartner(authUserId);

        return ApiResponse.<List<Hotel>>builder()
                .success(true)
                .message("Hotels fetched successfully")
                .data(hotels)
                .build();
    }

    @GetMapping("/{hotelId}")
    public ApiResponse<Hotel> getHotel(@PathVariable String hotelId) {

        Hotel hotel = hotelService.getHotelById(hotelId);

        return ApiResponse.<Hotel>builder()
                .success(true)
                .message("Hotel fetched successfully")
                .data(hotel)
                .build();
    }

    @PutMapping("/{hotelId}")
    public ApiResponse<Hotel> updateHotel(Authentication authentication,
                                          @PathVariable String hotelId,
                                          @RequestBody HotelRequest request) {

        String authUserId = authentication.getName();
        Hotel hotel = hotelService.updateHotel(authUserId, hotelId, request);

        return ApiResponse.<Hotel>builder()
                .success(true)
                .message("Hotel updated successfully")
                .data(hotel)
                .build();
    }

    @GetMapping("/{hotelId}/details")
    public ApiResponse<HotelDetails> getHotelDetails(Authentication authentication,
                                                     @PathVariable String hotelId) {

        String authUserId = authentication.getName();
        HotelDetails details = hotelDetailsService.getDetails(authUserId, hotelId);

        return ApiResponse.<HotelDetails>builder()
                .success(true)
                .message("Hotel details fetched successfully")
                .data(details)
                .build();
    }

    @PostMapping("/{hotelId}/room-types")
    public ApiResponse<RoomType> addRoomType(Authentication authentication,
                                             @PathVariable String hotelId,
                                             @RequestBody RoomTypeRequest request) {

        String authUserId = authentication.getName();
        RoomType roomType = hotelDetailsService.addRoomType(authUserId, hotelId, request);

        return ApiResponse.<RoomType>builder()
                .success(true)
                .message("Room type added successfully")
                .data(roomType)
                .build();
    }

    @PutMapping("/{hotelId}/room-types/{roomTypeId}")
    public ApiResponse<RoomType> updateRoomType(Authentication authentication,
                                                @PathVariable String hotelId,
                                                @PathVariable String roomTypeId,
                                                @RequestBody RoomTypeRequest request) {

        String authUserId = authentication.getName();
        RoomType roomType =
                hotelDetailsService.updateRoomType(authUserId, hotelId, roomTypeId, request);

        return ApiResponse.<RoomType>builder()
                .success(true)
                .message("Room type updated successfully")
                .data(roomType)
                .build();
    }

    @DeleteMapping("/{hotelId}/room-types/{roomTypeId}")
    public ApiResponse<Void> deleteRoomType(Authentication authentication,
                                            @PathVariable String hotelId,
                                            @PathVariable String roomTypeId) {

        String authUserId = authentication.getName();
        hotelDetailsService.deleteRoomType(authUserId, hotelId, roomTypeId);

        return ApiResponse.<Void>builder()
                .success(true)
                .message("Room type deleted successfully")
                .data(null)
                .build();
    }

    @PostMapping("/{hotelId}/photos")
    public ApiResponse<HotelPhoto> uploadPhoto(Authentication authentication,
                                               @PathVariable String hotelId,
                                               @RequestParam MultipartFile file,
                                               @RequestParam String type,
                                               @RequestParam(required = false) String roomTypeId,
                                               @RequestParam(required = false) Boolean isPrimary) throws IOException {

        String authUserId = authentication.getName();
        hotelDetailsService.getDetails(authUserId, hotelId);

        String fileId = photoStorageService.storeFile(file);

        HotelPhoto photo = HotelPhoto.builder()
                .hotelId(hotelId)
                .roomTypeId(roomTypeId)
                .fileId(fileId)
                .type(type)
                .isPrimary(isPrimary != null ? isPrimary : Boolean.FALSE)
                .uploadedAt(LocalDateTime.now())
                .build();

        hotelPhotoRepository.save(photo);

        return ApiResponse.<HotelPhoto>builder()
                .success(true)
                .message("Photo uploaded")
                .data(photo)
                .build();
    }

    @GetMapping("/{hotelId}/photos")
    public ApiResponse<List<HotelPhoto>> listPhotos(Authentication authentication,
                                                    @PathVariable String hotelId,
                                                    @RequestParam(required = false) String roomTypeId) {

        String authUserId = authentication.getName();
        hotelDetailsService.getDetails(authUserId, hotelId);

        List<HotelPhoto> photos;
        if (roomTypeId != null && !roomTypeId.isBlank()) {
            photos = hotelPhotoRepository.findByRoomTypeId(roomTypeId)
                    .stream()
                    .filter(photo -> hotelId.equals(photo.getHotelId()))
                    .toList();
        } else {
            photos = hotelPhotoRepository.findByHotelId(hotelId);
        }

        return ApiResponse.<List<HotelPhoto>>builder()
                .success(true)
                .message("Photos fetched successfully")
                .data(photos)
                .build();
    }

    @GetMapping("/photos/{fileId}")
    public ResponseEntity<byte[]> getPhoto(@PathVariable String fileId) throws IOException {

        var file = gridFsTemplate.findOne(Query.query(Criteria.where("_id").is(fileId)));
        if (file == null) {
            throw new BusinessException("Photo not found");
        }

        GridFsResource resource = gridFsTemplate.getResource(file);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, resource.getContentType())
                .body(resource.getInputStream().readAllBytes());
    }
}
