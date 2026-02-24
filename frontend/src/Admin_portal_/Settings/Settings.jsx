// Settings.jsx
import React, { useEffect, useState } from "react";
import {
  FiShield,
  FiAlertTriangle,
  FiUsers,
} from "react-icons/fi";
import "./settings.scss";
import {
  fetchAdminSettings,
  updateAdminSettings,
  createSubPartner,
} from "../../Api/admin/adminApi";
import { registerApi } from "../../Api/authApi";

const defaultSettings = {
  defaultCommissionRate: 15,
  minCommissionRate: 10,
  maxCommissionRate: 25,
  serviceFeeType: "PERCENTAGE",
  serviceFeeValue: 2.5,
  autoApproveHotels: false,
  requireTaxRegistration: true,
  requireBusinessLicense: true,
  requireEmailVerification: true,
  maxCouponUsagePerUser: 3,
  allowMultipleCouponsPerBooking: false,
  suspiciousActivityThreshold: 5,
};

const Settings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "ADMIN",
    parentAdminEmail: "",
  });
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState("");
  const [userSuccess, setUserSuccess] = useState("");
  const [showSendMail, setShowSendMail] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchAdminSettings();
        setSettings({
          ...defaultSettings,
          ...data,
        });
      } catch (err) {
        setError(err?.message || "Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const payload = {
        defaultCommissionRate: Number(settings.defaultCommissionRate),
        minCommissionRate: Number(settings.minCommissionRate),
        maxCommissionRate: Number(settings.maxCommissionRate),
        serviceFeeType: settings.serviceFeeType,
        serviceFeeValue: Number(settings.serviceFeeValue),
        autoApproveHotels: Boolean(settings.autoApproveHotels),
        requireTaxRegistration: Boolean(settings.requireTaxRegistration),
        requireBusinessLicense: Boolean(settings.requireBusinessLicense),
        requireEmailVerification: Boolean(settings.requireEmailVerification),
        maxCouponUsagePerUser: Number(settings.maxCouponUsagePerUser),
        allowMultipleCouponsPerBooking: Boolean(
          settings.allowMultipleCouponsPerBooking
        ),
        suspiciousActivityThreshold: Number(settings.suspiciousActivityThreshold),
      };

      await updateAdminSettings(payload);
      setSuccess("Settings saved successfully.");
    } catch (err) {
      setError(err?.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(defaultSettings);
  };

  const updateUserForm = (key, value) => {
    setUserForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreateUser = async () => {
    setUserError("");
    setUserSuccess("");
    setShowSendMail(false);

    if (!userForm.email.trim()) {
      setUserError("Email is required.");
      return;
    }
    if (!userForm.password || userForm.password.length < 6) {
      setUserError("Password must be at least 6 characters.");
      return;
    }
    if (userForm.password !== userForm.confirmPassword) {
      setUserError("Passwords do not match.");
      return;
    }
    if (userForm.role === "SUB_PARTNER" && !userForm.parentAdminEmail.trim()) {
      setUserError("Partner admin email is required for sub-partners.");
      return;
    }

    setUserLoading(true);
    try {
      const name = userForm.email.split("@")[0];
      await registerApi(name, userForm.email.trim(), userForm.password, userForm.role);

      if (userForm.role === "SUB_PARTNER") {
        await createSubPartner({
          email: userForm.email.trim(),
          parentAdminEmail: userForm.parentAdminEmail.trim(),
          name,
        });
      }

      setUserSuccess("User created successfully.");
      setShowSendMail(true);
    } catch (err) {
      setUserError(err?.message || "Failed to create user.");
    } finally {
      setUserLoading(false);
    }
  };

  return (
    <div className="adm-st-container">
      <h1>System Settings</h1>
      <p className="subtitle">Configure platform-wide settings and policies</p>

      {error && <p className="adm-st-error">{error}</p>}
      {success && <p className="adm-st-success">{success}</p>}

      {/* Hotel Verification */}
      <div className="adm-st-card">
        <div className="adm-st-card-head">
          <FiShield />
          <div>
            <h3>Hotel Verification Rules</h3>
            <p>Configure hotel registration and verification requirements</p>
          </div>
        </div>

        <div className="adm-st-toggle-row">
          <span>Auto-Approve Hotels</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.autoApproveHotels}
              onChange={(e) =>
                updateSetting("autoApproveHotels", e.target.checked)
              }
            />
            <span className="slider" />
          </label>
        </div>
        <div className="adm-st-toggle-row">
          <span>Require Tax Registration</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.requireTaxRegistration}
              onChange={(e) =>
                updateSetting("requireTaxRegistration", e.target.checked)
              }
            />
            <span className="slider" />
          </label>
        </div>
        <div className="adm-st-toggle-row">
          <span>Require Business License</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.requireBusinessLicense}
              onChange={(e) =>
                updateSetting("requireBusinessLicense", e.target.checked)
              }
            />
            <span className="slider" />
          </label>
        </div>
        <div className="adm-st-toggle-row">
          <span>Require Email Verification</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.requireEmailVerification}
              onChange={(e) =>
                updateSetting("requireEmailVerification", e.target.checked)
              }
            />
            <span className="slider" />
          </label>
        </div>
      </div>

      {/* Coupon Abuse */}
      <div className="adm-st-card">
        <div className="adm-st-card-head">
          <FiAlertTriangle />
          <div>
            <h3>Coupon Abuse Prevention</h3>
            <p>Configure rules to prevent coupon misuse</p>
          </div>
        </div>

        <div className="adm-st-grid-2">
          <div>
            <label>Max Coupon Usage Per User</label>
            <input
              type="number"
              value={settings.maxCouponUsagePerUser}
              onChange={(e) =>
                updateSetting("maxCouponUsagePerUser", e.target.value)
              }
            />
          </div>
          <div>
            <label>Suspicious Activity Threshold</label>
            <input
              type="number"
              value={settings.suspiciousActivityThreshold}
              onChange={(e) =>
                updateSetting("suspiciousActivityThreshold", e.target.value)
              }
            />
          </div>
        </div>

        <div className="adm-st-toggle-row">
          <span>Allow Multiple Coupons Per Booking</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.allowMultipleCouponsPerBooking}
              onChange={(e) =>
                updateSetting("allowMultipleCouponsPerBooking", e.target.checked)
              }
            />
            <span className="slider" />
          </label>
        </div>
      </div>

      {/* Create User */}
      <div className="adm-st-card">
        <div className="adm-st-card-head">
          <FiUsers />
          <div>
            <h3>Create User</h3>
            <p>Create new users and assign roles</p>
          </div>
        </div>

        {userError && <p className="adm-st-error">{userError}</p>}
        {userSuccess && <p className="adm-st-success">{userSuccess}</p>}

        <div className="adm-st-grid-2">
          <div>
            <label>User Gmail</label>
            <input
              type="email"
              value={userForm.email}
              onChange={(e) => updateUserForm("email", e.target.value)}
            />
          </div>
          <div>
            <label>Role</label>
            <select
              value={userForm.role}
              onChange={(e) => updateUserForm("role", e.target.value)}
            >
              <option value="ADMIN">Admin</option>
              <option value="TRAVELER">Traveler</option>
              <option value="PARTNER">Partner</option>
              <option value="SUB_PARTNER">Sub Partner</option>
            </select>
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={userForm.password}
              onChange={(e) => updateUserForm("password", e.target.value)}
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              value={userForm.confirmPassword}
              onChange={(e) =>
                updateUserForm("confirmPassword", e.target.value)
              }
            />
          </div>
          {userForm.role === "SUB_PARTNER" && (
            <div className="adm-st-span">
              <label>Partner Admin Email</label>
              <input
                type="email"
                value={userForm.parentAdminEmail}
                onChange={(e) =>
                  updateUserForm("parentAdminEmail", e.target.value)
                }
              />
            </div>
          )}
        </div>

        <div className="adm-st-user-actions">
          <button
            className="adm-st-primary"
            onClick={handleCreateUser}
            disabled={userLoading}
          >
            {userLoading ? "Creating..." : "Create"}
          </button>
          {showSendMail && (
            <button className="adm-st-outline">Send To Mail</button>
          )}
        </div>
      </div>

      <div className="adm-st-actions">
        <button className="adm-st-outline" onClick={handleReset}>
          Reset to Defaults
        </button>
        <button
          className="adm-st-primary"
          onClick={handleSave}
          disabled={saving || loading}
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
};

export default Settings;
