package com.staybook.user_profile_service.partner.controller;

import com.staybook.user_profile_service.common.ApiResponse;
import com.staybook.user_profile_service.common.BusinessException;
import com.staybook.user_profile_service.partner.dto.PublicHotelDetailsResponse;
import com.staybook.user_profile_service.partner.dto.PublicHotelSummaryResponse;
import com.staybook.user_profile_service.partner.entity.HotelPhoto;
import com.staybook.user_profile_service.partner.service.PublicHotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/public/hotels")
@RequiredArgsConstructor
public class PublicHotelController {

    private final PublicHotelService publicHotelService;
    private final GridFsTemplate gridFsTemplate;

    @GetMapping
    public ApiResponse<List<PublicHotelSummaryResponse>> listHotels() {
        List<PublicHotelSummaryResponse> hotels = publicHotelService.listHotels();
        return ApiResponse.<List<PublicHotelSummaryResponse>>builder()
                .success(true)
                .message("Hotels fetched successfully")
                .data(hotels)
                .build();
    }

    @GetMapping("/{hotelId}")
    public ApiResponse<PublicHotelDetailsResponse> getHotel(@PathVariable String hotelId) {
        PublicHotelDetailsResponse details = publicHotelService.getHotelDetails(hotelId);
        return ApiResponse.<PublicHotelDetailsResponse>builder()
                .success(true)
                .message("Hotel details fetched successfully")
                .data(details)
                .build();
    }

    @GetMapping("/{hotelId}/photos")
    public ApiResponse<List<HotelPhoto>> listPhotos(@PathVariable String hotelId,
                                                    @RequestParam(required = false) String roomTypeId) {
        List<HotelPhoto> photos = publicHotelService.listPhotos(hotelId, roomTypeId);
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
