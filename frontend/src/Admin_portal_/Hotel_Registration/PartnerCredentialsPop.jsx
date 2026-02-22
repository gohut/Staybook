import React, { useState } from "react";
import { FiLock, FiMail, FiSend, FiX } from "react-icons/fi";
import "./PartnerCredentialsPop.scss";
import { registerApi } from "../../Api/authApi";
import { createAdminNotification } from "../../Api/userProfile/userProfileApi";

const PartnerCredentialsPop = ({ application, onClose, onSent }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!application?.email) {
      setError("Missing partner email.");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const name = application?.ownerName || application?.hotelName || "Partner";
      await registerApi(name, application.email, password, "PARTNER");

      let notifyFailed = false;
      try {
        await createAdminNotification({
          email: application.email,
          title: "Partner Account Created",
          message: `Your partner account is ready. Email: ${application.email} Password: ${password}`,
          from: "ADMIN",
          type: "SYSTEM",
        });
      } catch (notifyError) {
        notifyFailed = true;
        console.warn("Partner notification failed", notifyError);
      }

      if (notifyFailed) {
        setError("Partner account created, but notification failed.");
        setSuccess("");
      } else {
        setSuccess("Partner credentials sent to the user.");
        onSent?.();
      }
    } catch (err) {
      setError(err?.message || "Failed to create partner account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pcp-overlay">
      <div className="pcp-modal">
        <div className="pcp-header">
          <div>
            <h2>Create Partner Login</h2>
            <p>Send credentials to the approved hotel partner</p>
          </div>
          <FiX className="close" onClick={onClose} />
        </div>

        {error && <p className="pcp-error">{error}</p>}
        {success && <p className="pcp-success">{success}</p>}

        <form className="pcp-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <div className="pcp-input">
            <FiMail />
            <input type="email" value={application?.email || ""} readOnly />
          </div>

          <label>New Password</label>
          <div className="pcp-input">
            <FiLock />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <label>Confirm Password</label>
          <div className="pcp-input">
            <FiLock />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
          </div>

          <div className="pcp-actions">
            <button type="button" className="ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              <FiSend /> Send To Partner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartnerCredentialsPop;
