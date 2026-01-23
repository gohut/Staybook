// ReviewPop.jsx
import React from "react";
import {
  FiX,
  FiCheckCircle,
  FiFileText,
  FiMapPin,
  FiXCircle,
  FiAlertTriangle,
} from "react-icons/fi";
import "./ReviewPop.css";

const ReviewPop = ({ onClose }) => {
  return (
    <div className="rp-overlay">
      <div className="rp-modal">
        <div className="rp-header">
          <div>
            <h2>Grand Plaza Hotel</h2>
            <p>Registration Review</p>
          </div>
          <FiX className="close" onClick={onClose} />
        </div>

        <h3>Property Details</h3>
        <div className="rp-card grid-2">
          <div>
            <label>Hotel Name</label>
            <strong>Grand Plaza Hotel</strong>

            <label>Email</label>
            <strong>john@grandplaza.com</strong>

            <label>Location</label>
            <strong>
              <FiMapPin /> New York, NY
            </strong>
          </div>

          <div>
            <label>Owner/Manager</label>
            <strong>John Smith</strong>

            <label>Phone</label>
            <strong>+1 234-567-8901</strong>

            <label>Registration Date</label>
            <strong>January 15, 2026</strong>
          </div>
        </div>

        <h3>Uploaded Documents</h3>
        {[
          ["Business License", "business_license.pdf"],
          ["ID Proof", "id_proof.pdf"],
          ["Tax Registration", "tax_registration.pdf"],
        ].map(([t, f]) => (
          <div className="doc-row" key={t}>
            <div>
              <FiFileText />
              <div>
                <strong>{t}</strong>
                <span>{f}</span>
              </div>
            </div>
            <div className="doc-actions">
              <FiCheckCircle className="ok" />
              <button>View</button>
            </div>
          </div>
        ))}

        <h3>Property Photos</h3>
        <div className="photos">
          {["Photo 1", "Photo 2", "Photo 3", "Photo 4"].map((p) => (
            <div className="photo-box" key={p}>
              {p}
            </div>
          ))}
        </div>

        <div className="rp-footer">
          <button className="reject">
            <FiXCircle /> Reject Registration
          </button>
          <button className="request">
            <FiAlertTriangle /> Request Documents
          </button>
          <button className="approve">
            <FiCheckCircle /> Approve Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPop;
