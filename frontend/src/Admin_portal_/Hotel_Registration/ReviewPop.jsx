// ReviewPop.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  FiX,
  FiCheckCircle,
  FiFileText,
  FiMapPin,
  FiXCircle,
  FiAlertTriangle,
} from "react-icons/fi";
import "./ReviewPop.scss";
import {
  approvePartnerApplication,
  getPartnerApplicationFileUrl,
  rejectPartnerApplication,
  reviewPartnerApplication,
} from "../../Api/partnerApplication";
import { createAdminNotification } from "../../Api/userProfile/userProfileApi";

const ReviewPop = ({ application, onClose, onStatusChange, onApproved }) => {
  const [current, setCurrent] = useState(application);
  const [actionLoading, setActionLoading] = useState("");
  const [statusNote, setStatusNote] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setCurrent(application);
    setError("");
    setStatusNote("");
  }, [application]);

  useEffect(() => {
    const moveToReview = async () => {
      if (!application || application.status !== "PENDING") return;
      setStatusNote("Moving application to UNDER_REVIEW...");
      try {
        const updated = await reviewPartnerApplication(application.id);
        setCurrent(updated);
        onStatusChange?.(updated);
      } catch (err) {
        setError(err?.message || "Failed to move to review.");
      } finally {
        setStatusNote("");
      }
    };

    moveToReview();
  }, [application?.id]);

  const documents = useMemo(
    () => [
      { label: "Business License", fileId: current?.businessLicenseFileId },
      { label: "ID Proof", fileId: current?.idProofFileId },
      { label: "Tax Registration", fileId: current?.taxRegistrationFileId },
    ],
    [current]
  );

  const openFile = (fileId) => {
    if (!fileId) return;
    const url = getPartnerApplicationFileUrl(fileId);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleApprove = async () => {
    if (!current) return;
    setActionLoading("approve");
    setError("");
    try {
      let updated = current;
      if (updated.status === "PENDING") {
        updated = await reviewPartnerApplication(updated.id);
        setCurrent(updated);
        onStatusChange?.(updated);
      }
      updated = await approvePartnerApplication(updated.id);
      setCurrent(updated);
      onStatusChange?.(updated);
      onApproved?.(updated);
      onClose();
      try {
        await createAdminNotification({
          email: current.email,
          title: "Partner Application Approved",
          message: `Your application for ${current.hotelName} has been approved.`,
          from: "ADMIN",
          type: "SYSTEM",
        });
      } catch (notifyError) {
        console.warn("Approval notification failed", notifyError);
      }
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Approval failed.");
    } finally {
      setActionLoading("");
    }
  };

  const handleReject = async () => {
    if (!current) return;
    setActionLoading("reject");
    setError("");
    try {
      let updated = current;
      if (updated.status === "PENDING") {
        updated = await reviewPartnerApplication(updated.id);
        setCurrent(updated);
        onStatusChange?.(updated);
      }
      updated = await rejectPartnerApplication(updated.id);
      setCurrent(updated);
      onStatusChange?.(updated);
      onClose();
      try {
        await createAdminNotification({
          email: current.email,
          title: "Partner Application Rejected",
          message: `Your application for ${current.hotelName} was rejected. Please review and resubmit.`,
          from: "ADMIN",
          type: "SYSTEM",
        });
      } catch (notifyError) {
        console.warn("Rejection notification failed", notifyError);
      }
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Rejection failed.");
    } finally {
      setActionLoading("");
    }
  };

  const handleRequestDocs = async () => {
    if (!current) return;
    setActionLoading("request");
    setError("");
    try {
      onClose();
      await createAdminNotification({
        email: current.email,
        title: "Additional Documents Required",
        message: `Please upload the missing documents for ${current.hotelName}.`,
        from: "ADMIN",
        type: "ALERT",
      });
    } catch (err) {
      setError(err?.message || "Failed to send request.");
    } finally {
      setActionLoading("");
    }
  };

  const isFinal = current?.status === "APPROVED" || current?.status === "REJECTED";

  return (
    <div className="rp-overlay">
      <div className="rp-modal">
        <div className="rp-header">
          <div>
            <h2>{current?.hotelName || "Hotel Application"}</h2>
            <p>Registration Review</p>
          </div>
          <FiX className="close" onClick={onClose} />
        </div>

        {statusNote && <p className="rp-status">{statusNote}</p>}
        {error && <p className="rp-error">{error}</p>}

        <h3>Property Details</h3>
        <div className="rp-card grid-2">
          <div>
            <label>Hotel Name</label>
            <strong>{current?.hotelName || "-"}</strong>

            <label>Email</label>
            <strong>{current?.email || "-"}</strong>

            <label>Location</label>
            <strong>
              <FiMapPin /> {current?.location || "-"}
            </strong>
          </div>

          <div>
            <label>Owner/Manager</label>
            <strong>{current?.ownerName || "-"}</strong>

            <label>Phone</label>
            <strong>{current?.phone || "-"}</strong>

            <label>Registration Date</label>
            <strong>
              {current?.regDate
                ? new Date(current.regDate).toLocaleDateString()
                : "-"}
            </strong>
          </div>
        </div>

        <h3>Uploaded Documents</h3>
        {documents.map((doc) => (
          <div className="doc-row" key={doc.label}>
            <div>
              <FiFileText />
              <div>
                <strong>{doc.label}</strong>
                <span>{doc.fileId ? "Uploaded" : "Missing"}</span>
              </div>
            </div>
            <div className="doc-actions">
              {doc.fileId ? (
                <>
                  <FiCheckCircle className="ok" />
                  <button onClick={() => openFile(doc.fileId)}>View</button>
                </>
              ) : (
                <span className="missing">Not uploaded</span>
              )}
            </div>
          </div>
        ))}

        <h3>Property Photos</h3>
        <div className="photos">
          {current?.propertyPhotoFileIds?.length ? (
            current.propertyPhotoFileIds.map((id, index) => (
              <div className="photo-box" key={id}>
                <img
                  src={getPartnerApplicationFileUrl(id)}
                  alt={`Property ${index + 1}`}
                />
              </div>
            ))
          ) : (
            <div className="photo-box empty">No photos uploaded</div>
          )}
        </div>

        <div className="rp-footer">
          <button
            className="reject"
            onClick={handleReject}
            disabled={Boolean(actionLoading) || isFinal}
          >
            <FiXCircle /> Reject Registration
          </button>
          <button
            className="request"
            onClick={handleRequestDocs}
            disabled={Boolean(actionLoading) || isFinal}
          >
            <FiAlertTriangle /> Request Documents
          </button>
          <button
            className="approve"
            onClick={handleApprove}
            disabled={Boolean(actionLoading) || isFinal}
          >
            <FiCheckCircle /> Approve Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPop;
