package com.staybook.inventory_service.ptnr_application.service;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
@Service
@RequiredArgsConstructor
public class FileStorageService {
    private final GridFsTemplate gridFsTemplate;
    public String storeFile(MultipartFile file) throws IOException
    {
        String contentType = file.getContentType();

        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        // Allow PDFs and Images more flexibly
        if (!(contentType.contains("pdf") || contentType.startsWith("image/"))) {
            throw new IllegalArgumentException("Only PDF and Image files are allowed");
        }

        ObjectId fileId = gridFsTemplate.store(
                file.getInputStream(),
                file.getOriginalFilename(),
                contentType
        );

        return fileId.toHexString();
    }

}
