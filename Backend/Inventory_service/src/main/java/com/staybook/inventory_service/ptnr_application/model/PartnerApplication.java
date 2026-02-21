package com.staybook.inventory_service.ptnr_application.model;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "partner_applications")
public class PartnerApplication {

  @Id
  private String id;

  private String hotelName;
  private String ownerName;
  private String email;
  private String phone;
  private String location;
  private LocalDate regDate;
  private ApplicationStatus status;

  // File references
  private String businessLicenseFileId;
  private String idProofFileId;
  private String taxRegistrationFileId;
  private List<String> propertyPhotoFileIds;
}
