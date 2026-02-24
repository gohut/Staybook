import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PartnerSettings.scss";
import { getPartnerProfile, updatePartnerProfile } from "../../Api/partner/partnerApi";
import { changePasswordApi } from "../../Api/authApi";
import { createAdminNotification } from "../../Api/userProfile/userProfileApi";

const ADMIN_EMAIL = "admin@staybook.com";

const PartnerSettings = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");
  const isSubPartner = role === "SUB_PARTNER";
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordStatus, setPasswordStatus] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);
  const [requestForm, setRequestForm] = useState({
    name: "",
    email: "",
    role: "PARTNER",
  });
  const [requestStatus, setRequestStatus] = useState("");
  const [requestError, setRequestError] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getPartnerProfile();
        setProfile({
          name: data?.name || "",
          email: data?.email || "",
          phone: data?.phone || "",
          role: data?.role || "HOTEL_ADMIN",
        });
      } catch (err) {
        setError(err.message || "Failed to load partner profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    setStatus("");
    setError("");
    try {
      const updated = await updatePartnerProfile({
        name: profile.name,
        phone: profile.phone,
        role: profile.role,
      });
      setProfile((prev) => ({
        ...prev,
        name: updated?.name || prev.name,
        phone: updated?.phone || prev.phone,
        role: updated?.role || prev.role,
      }));
      setStatus("Settings updated successfully.");
    } catch (err) {
      setError(err.message || "Failed to update settings");
    }
  };

  const handlePasswordChange = (field, value) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdatePassword = async () => {
    setPasswordStatus("");
    setPasswordError("");

    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      setPasswordError("Please fill in all password fields.");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    try {
      const message = await changePasswordApi(
        passwordForm.currentPassword,
        passwordForm.newPassword
      );
      setPasswordStatus(message || "Password updated successfully.");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setPasswordError(err.message || "Failed to update password");
    }
  };

  const handleRequestChange = (field, value) => {
    setRequestForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRequestAdmin = async () => {
    setRequestError("");
    setRequestStatus("");
    if (!requestForm.email || !requestForm.name) {
      setRequestError("Please provide name and email.");
      return;
    }
    setRequestLoading(true);
    try {
      await createAdminNotification({
        email: ADMIN_EMAIL,
        title: "Partner User Request",
        message: `Request to add user: ${requestForm.name} (${requestForm.email}) as ${requestForm.role}.`,
        from: profile?.email || "PARTNER",
        type: "ALERT",
      });
      setRequestStatus("Request sent to admin.");
      setShowAddUser(false);
      setRequestForm({ name: "", email: "", role: "PARTNER" });
    } catch (err) {
      setRequestError(err.message || "Failed to send request.");
    } finally {
      setRequestLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="partner-settings-page">
      <div className="page-head">
        <div>
          <h2>Settings</h2>
          <p>Manage your partner profile and security</p>
        </div>
      </div>

      <section className="settings-card">
        <div className="settings-card-head">
          <div>
            <h3>Partner Details</h3>
            <p>Update your contact info and role</p>
          </div>
          <button
            className="settings-primary-btn"
            onClick={handleSaveProfile}
            disabled={loading || isSubPartner}
          >
            Save Changes
          </button>
        </div>

        {loading && <p className="settings-muted">Loading profile...</p>}
        {error && <p className="settings-error">{error}</p>}
        {isSubPartner && (
          <p className="settings-muted">Sub-partner accounts have read-only access.</p>
        )}
        {status && <p className="settings-success">{status}</p>}

        <div className="settings-grid">
          <label className="settings-field">
            <span>Name</span>
            <input
              value={profile.name}
              onChange={(e) => handleProfileChange("name", e.target.value)}
              disabled={isSubPartner}
              placeholder="Partner name"
            />
          </label>

          <label className="settings-field">
            <span>Email (locked)</span>
            <input value={profile.email} disabled />
          </label>

          <label className="settings-field">
            <span>Phone</span>
            <input
              value={profile.phone}
              onChange={(e) => handleProfileChange("phone", e.target.value)}
              disabled={isSubPartner}
              placeholder="Phone number"
            />
          </label>

          <label className="settings-field">
            <span>Role</span>
            <input
              value={profile.role}
              onChange={(e) => handleProfileChange("role", e.target.value)}
              disabled={isSubPartner}
              placeholder="Role"
            />
          </label>
        </div>
      </section>

      {!isSubPartner && (
        <section className="settings-card">
          <div className="settings-card-head">
            <div>
              <h3>Add New User</h3>
              <p>Send a request to admin for partner users</p>
            </div>
            <button
              className="settings-primary-btn"
              onClick={() => setShowAddUser(true)}
            >
              Add New User
            </button>
          </div>

          {requestError && <p className="settings-error">{requestError}</p>}
          {requestStatus && <p className="settings-success">{requestStatus}</p>}
        </section>
      )}

      <section className="settings-card">
        <div className="settings-card-head">
          <div>
            <h3>Change Password</h3>
            <p>Use your current password to set a new one</p>
          </div>
          <button className="settings-primary-btn" onClick={handleUpdatePassword}>
            Update Password
          </button>
        </div>

        {passwordError && <p className="settings-error">{passwordError}</p>}
        {passwordStatus && <p className="settings-success">{passwordStatus}</p>}

        <div className="settings-grid">
          <label className="settings-field">
            <span>Current Password</span>
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                handlePasswordChange("currentPassword", e.target.value)
              }
              placeholder="Current password"
            />
          </label>

          <label className="settings-field">
            <span>New Password</span>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) =>
                handlePasswordChange("newPassword", e.target.value)
              }
              placeholder="New password"
            />
          </label>

          <label className="settings-field">
            <span>Confirm New Password</span>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                handlePasswordChange("confirmPassword", e.target.value)
              }
              placeholder="Confirm new password"
            />
          </label>
        </div>
      </section>

      <section className="settings-card">
        <div className="settings-card-head">
          <div>
            <h3>Session</h3>
            <p>Sign out from the partner portal</p>
          </div>
          <button className="settings-primary-btn logout" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </section>

      {showAddUser && (
        <div className="settings-modal">
          <div className="settings-modal-content">
            <div className="settings-modal-head">
              <div>
                <h3>Add New User</h3>
                <p>Request admin to create a partner user</p>
              </div>
              <button className="modal-close" onClick={() => setShowAddUser(false)}>
                ✕
              </button>
            </div>

            <div className="settings-grid">
              <label className="settings-field">
                <span>Name</span>
                <input
                  value={requestForm.name}
                  onChange={(e) => handleRequestChange("name", e.target.value)}
                  placeholder="Full name"
                />
              </label>
              <label className="settings-field">
                <span>Email</span>
                <input
                  type="email"
                  value={requestForm.email}
                  onChange={(e) => handleRequestChange("email", e.target.value)}
                  placeholder="user@email.com"
                />
              </label>
              <label className="settings-field">
                <span>Role</span>
                <select
                  value={requestForm.role}
                  onChange={(e) => handleRequestChange("role", e.target.value)}
                >
                  <option value="PARTNER">Partner</option>
                  <option value="SUB_PARTNER">Sub Partner</option>
                </select>
              </label>
            </div>

            {requestError && <p className="settings-error">{requestError}</p>}

            <div className="settings-modal-actions">
              <button
                className="settings-secondary-btn"
                onClick={() => setShowAddUser(false)}
              >
                Cancel
              </button>
              <button
                className="settings-primary-btn"
                onClick={handleRequestAdmin}
                disabled={requestLoading}
              >
                {requestLoading ? "Requesting..." : "Request Admin"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerSettings;
