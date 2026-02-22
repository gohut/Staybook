import React, { useEffect, useMemo, useState } from "react";
import "./hotelregistration.scss";
import ReviewPop from "./ReviewPop";
import {
  listPartnerApplications,
} from "../../Api/partnerApplication";
import PartnerCredentialsPop from "./PartnerCredentialsPop";

const isDocsComplete = (app) => {
  return Boolean(
    app?.businessLicenseFileId &&
      app?.idProofFileId &&
      app?.taxRegistrationFileId &&
      Array.isArray(app?.propertyPhotoFileIds) &&
      app.propertyPhotoFileIds.length > 0
  );
};

const HotelRegistration = () => {
  const [open, setOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showCredentials, setShowCredentials] = useState(false);
  const [approvedApplication, setApprovedApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadApplications = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await listPartnerApplications();
      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.message || "Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const stats = useMemo(() => {
    const total = applications.length;
    const pending = applications.filter((app) =>
      ["PENDING", "UNDER_REVIEW"].includes(app.status)
    ).length;
    const approved = applications.filter((app) => app.status === "APPROVED")
      .length;
    const incomplete = applications.filter((app) => !isDocsComplete(app)).length;
    const approvalRate = total > 0 ? Math.round((approved / total) * 100) : 0;

    return { pending, approved, incomplete, approvalRate };
  }, [applications]);

  const handleReviewClick = (app) => {
    setSelectedApplication(app);
    setOpen(true);
  };

  const handleStatusChange = (updated) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === updated.id ? updated : app))
    );
    if (selectedApplication?.id === updated.id) {
      setSelectedApplication(updated);
    }
  };

  const handleApproved = (updated) => {
    setApprovedApplication(updated);
    setShowCredentials(true);
  };

  return (
    <div className="hr-container">
      <h1>Hotel Registration Verification</h1>
      <p className="subtitle">
        Approve or reject new hotel partner registrations
      </p>

      <div className="stats-row">
        <div className="stat-card">
          <h2>{stats.pending}</h2>
          <span>Pending Review</span>
        </div>
        <div className="stat-card">
          <h2>{stats.approved}</h2>
          <span>Total Approved</span>
        </div>
        <div className="stat-card">
          <h2>{stats.incomplete}</h2>
          <span>Incomplete Docs</span>
        </div>
        <div className="stat-card">
          <h2>{stats.approvalRate}%</h2>
          <span>Approval Rate</span>
        </div>
      </div>

      <div className="table-card">
        {loading ? (
          <p className="muted">Loading applications...</p>
        ) : error ? (
          <p className="muted">{error}</p>
        ) : applications.length === 0 ? (
          <p className="muted">No applications found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Hotel Name</th>
                <th>Owner / Manager</th>
                <th>Registration Date</th>
                <th>Documents</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => {
                const docsComplete = isDocsComplete(app);
                return (
                  <tr key={app.id}>
                    <td>
                      <strong>{app.hotelName}</strong>
                      <div className="muted">{app.location}</div>
                    </td>
                    <td>
                      {app.ownerName}
                      <div className="muted">{app.email}</div>
                    </td>
                    <td>
                      {app.regDate
                        ? new Date(app.regDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      <span
                        className={`pill ${
                          docsComplete ? "complete" : "incomplete"
                        }`}
                      >
                        {docsComplete ? "Complete" : "Incomplete"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`pill ${app.status
                          ?.toLowerCase()
                          .replace("_", "-")}`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="review-btn"
                        onClick={() => handleReviewClick(app)}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {open && selectedApplication && (
        <ReviewPop
          application={selectedApplication}
          onClose={() => setOpen(false)}
          onStatusChange={handleStatusChange}
          onApproved={handleApproved}
        />
      )}
      {showCredentials && approvedApplication && (
        <PartnerCredentialsPop
          application={approvedApplication}
          onClose={() => {
            setShowCredentials(false);
            setApprovedApplication(null);
          }}
          onSent={() => {
            setShowCredentials(false);
            setApprovedApplication(null);
          }}
        />
      )}
    </div>
  );
};

export default HotelRegistration;
