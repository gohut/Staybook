// PartnerProgram.jsx
import React, { useEffect, useState } from "react";
import { FiUpload, FiCheck, FiEye, FiX, FiMapPin, FiCalendar } from "react-icons/fi";
import "./PartnerProgram.scss";
import { submitPartnerApplication, getPartnerApplicationStatus } from "../../Api/partnerApplication";
import { createNotification } from "../../Api/userProfile/userProfileApi";
const PartnerProgram = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    hotelName: "",
    ownerName: "",
    email: "",
    phone: "",
    location: "",
    registrationDate: "",
  });

  const [uploadedDocs, setUploadedDocs] = useState({
    businessLicense: null,
    idProof: null,
    taxRegistration: null,
  });

  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [submittedApplication, setSubmittedApplication] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const APPLICATION_ID_KEY = "partnerApplicationId";
  const APPLICATION_NAME_KEY = "partnerApplicationHotelName";
  const APPLICATION_DATE_KEY = "partnerApplicationDate";
  const APPROVAL_NOTICE_KEY = "partnerApplicationApprovedNotified";
  const SUBMIT_NOTICE_KEY = "partnerApplicationSubmittedNotified";

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setFormData((prev) => ({ ...prev, email: storedEmail }));
    }
  }, []);

  useEffect(() => {
    const loadExistingApplication = async () => {
      const existingId = localStorage.getItem(APPLICATION_ID_KEY);
      if (!existingId) return;

      setLoadingStatus(true);
      try {
        const statusResponse = await getPartnerApplicationStatus(existingId);
        const storedHotelName = localStorage.getItem(APPLICATION_NAME_KEY) || "Your Property";
        const storedDate = localStorage.getItem(APPLICATION_DATE_KEY) || new Date().toLocaleDateString();

        setSubmittedApplication({
          id: existingId,
          hotelName: storedHotelName,
          status: statusResponse.status,
          date: storedDate,
        });

        if (
          statusResponse.status === "APPROVED" &&
          !localStorage.getItem(APPROVAL_NOTICE_KEY)
        ) {
          try {
            await createNotification({
              title: "Partner Application Update",
              message: "Your Application has approved",
              from: "ADMIN",
              type: "SYSTEM",
            });
            localStorage.setItem(APPROVAL_NOTICE_KEY, "true");
          } catch (notificationError) {
            console.error(notificationError);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingStatus(false);
      }
    };

    loadExistingApplication();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (docType, file) => {
    if (file && file.type === 'application/pdf') {
      setUploadedDocs(prev => ({
        ...prev,
        [docType]: file
      }));
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => 
      file.type === 'image/jpeg' || file.type === 'image/png'
    );
    
    setUploadedPhotos(prev => [...prev, ...validFiles]);
  };

  const removePhoto = (index) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (
      !uploadedDocs.businessLicense ||
      !uploadedDocs.idProof ||
      !uploadedDocs.taxRegistration
    ) {
      alert("Please upload all required documents.");
      return;
    }

    if (uploadedPhotos.length === 0) {
      alert("Please upload at least one property photo.");
      return;
    }

    const data = new FormData();

    data.append("hotelName", formData.hotelName);
    data.append("ownerName", formData.ownerName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("location", formData.location);

    data.append("businessLicense", uploadedDocs.businessLicense);
    data.append("idProof", uploadedDocs.idProof);
    data.append("taxRegistration", uploadedDocs.taxRegistration);

    uploadedPhotos.forEach((photo) => {
      data.append("propertyPhotos", photo);
    });

    const response = await submitPartnerApplication(data);

    alert(
      `Application submitted successfully!\nApplication ID: ${response.applicationId}`
    );

    setSubmittedApplication({
      id: response.applicationId,
      hotelName: formData.hotelName,
      status: "PENDING",
      date: new Date().toLocaleDateString(),
    });

    localStorage.setItem(APPLICATION_ID_KEY, response.applicationId);
    localStorage.setItem(APPLICATION_NAME_KEY, formData.hotelName);
    localStorage.setItem(APPLICATION_DATE_KEY, new Date().toLocaleDateString());

    if (!localStorage.getItem(SUBMIT_NOTICE_KEY)) {
      try {
        await createNotification({
          title: "Partner Application Submitted",
          message: "your application was sent to the ADMIN successfully",
          from: "SYSTEM",
          type: "SYSTEM",
        });
        localStorage.setItem(SUBMIT_NOTICE_KEY, "true");
      } catch (notificationError) {
        console.error(notificationError);
      }
    }

    setShowForm(false);

  } catch (error) {
    console.error(error);
    alert(
      error.response?.data?.error ||
      "Something went wrong while submitting."
    );
  }
};

  if (!showForm) {
    return (
      <div className="partner-program">
        <div className="partner-header">
          <h2>Partner Program</h2>
          <p>Join our network of hotel partners and grow your business</p>
        </div>

        <div className="partner-content">
          <div className="partner-benefits">
            <h3>Why Partner with StayBook?</h3>
            <div className="benefits-grid">
              <div className="benefit-card">
                <h4>📈 Increased Visibility</h4>
                <p>Reach millions of travelers looking for accommodations</p>
              </div>
              <div className="benefit-card">
                <h4>💰 Competitive Commission</h4>
                <p>Fair commission rates with transparent pricing</p>
              </div>
              <div className="benefit-card">
                <h4>🛠 Easy Management</h4>
                <p>Simple dashboard for managing bookings and availability</p>
              </div>
              <div className="benefit-card">
                <h4>📞 24/7 Support</h4>
                <p>Dedicated support team to help you succeed</p>
              </div>
            </div>
          </div>

          <div className="partner-cta">
            <h3>Ready to Get Started?</h3>
            <p>Join hundreds of hotels already partnered with StayBook</p>
            <button className="send-application-btn" onClick={() => setShowForm(true)}>
              Send Application
            </button>
          </div>

          {loadingStatus && <p>Checking your application status...</p>}

          {submittedApplication && (
            <div className="application-status-card">
              <h3>My Application Status</h3>
              <div className="status-info-grid">
                <div className="status-item">
                  <label>Property Name</label>
                  <p>{submittedApplication.hotelName}</p>
                </div>
                <div className="status-item">
                  <label>Application ID</label>
                  <p>{submittedApplication.id}</p>
                </div>
                <div className="status-item">
                  <label>Submission Date</label>
                  <p>{submittedApplication.date}</p>
                </div>
                <div className="status-item">
                  <label>Current Status</label>
                  <span className={`status-badge ${submittedApplication.status.toLowerCase().replace('_', '-')}`}>
                    {submittedApplication.status}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="partner-program">
      <div className="partner-header">
        <h2>Hotel Property Registration</h2>
        <button className="back-btn" onClick={() => setShowForm(false)}>
          <FiX /> Back to Partner Program
        </button>
      </div>

      <form className="registration-form" onSubmit={handleSubmit}>
        {/* Property Details Section */}
        <div className="form-section">
          <h3>📌 Property Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Hotel Name *</label>
              <input
                type="text"
                name="hotelName"
                value={formData.hotelName}
                onChange={handleInputChange}
                required
                placeholder="Enter hotel name"
              />
            </div>

            <div className="form-group">
              <label>Owner/Manager Name *</label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleInputChange}
                required
                placeholder="Enter owner or manager name"
              />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter email address"
              />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="Enter phone number"
              />
            </div>

            <div className="form-group">
              <label>Location *</label>
              <div className="input-with-icon">
                <FiMapPin className="icon" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="City, State"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Registration Date *</label>
              <div className="input-with-icon">
                <FiCalendar className="icon" />
                <input
                  type="date"
                  name="registrationDate"
                  value={formData.registrationDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Uploaded Documents Section */}
        <div className="form-section">
          <h3>📄 Uploaded Documents</h3>
          <div className="documents-grid">
            {Object.entries({
              businessLicense: "Business License",
              idProof: "ID Proof",
              taxRegistration: "Tax Registration Document"
            }).map(([key, label]) => (
              <div key={key} className="document-upload">
                <label>{label} *</label>
                <div className="upload-area">
                  <input
                    type="file"
                    id={key}
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(key, e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor={key} className="upload-label">
                    <FiUpload />
                    <span>
                      {uploadedDocs[key] ? uploadedDocs[key].name : `Upload ${label} (PDF only)`}
                    </span>
                  </label>
                  {uploadedDocs[key] && (
                    <div className="file-success">
                      <FiCheck className="success-icon" />
                      <button type="button" className="view-btn">
                        <FiEye /> View
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Property Photos Section */}
        <div className="form-section">
          <h3>🖼 Property Photos</h3>
          <div className="photo-upload-section">
            <div className="upload-area">
              <input
                type="file"
                id="photos"
                multiple
                accept="image/jpeg,image/png"
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="photos" className="upload-label photos-label">
                <FiUpload />
                <span>Upload Property Photos (JPG, PNG)</span>
              </label>
            </div>

            {uploadedPhotos.length > 0 && (
              <div className="photos-grid">
                {uploadedPhotos.map((photo, index) => (
                  <div key={index} className="photo-item">
                    <img src={URL.createObjectURL(photo)} alt={`Property ${index + 1}`} />
                    <button
                      type="button"
                      className="remove-photo"
                      onClick={() => removePhoto(index)}
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default PartnerProgram;
