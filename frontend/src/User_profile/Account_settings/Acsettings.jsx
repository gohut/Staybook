// Acsettings.jsx
import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiLock,
  FiMail,
  FiPhone,
  FiCalendar,
  FiGlobe,
  FiTrash2,
  FiSave,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import "./Acsettings.scss";
import { useNavigate } from "react-router-dom";
import {
  createProfile,
  getProfile,
  updateProfile,
} from "../../Api/userProfile/userProfileApi";

const ProfileDetails = ({
  profile,
  onChange,
  onSave,
  isSaving,
  saveError,
  saveMessage,
  onAvatarChange,
  profileExists,
}) => (
  
  <div className="as-card">
    <div className="as-grid">
      <div className="as-field">
        <label>First Name</label>
        <div className="as-input">
          <FiUser />
          <input
            name="firstName"
            value={profile.firstName}
            onChange={onChange}
            placeholder="Enter first name"
          />
        </div>
      </div>
      <div className="as-field">
        <label>Last Name</label>
        <div className="as-input">
          <FiUser />
          <input
            name="lastName"
            value={profile.lastName}
            onChange={onChange}
            placeholder="Enter last name"
          />
        </div>
      </div>
      <div className="as-field">
        <label>Email</label>
        <div className="as-input">
          <FiMail />
          <input
            name="email"
            value={profile.email}
            readOnly
            placeholder="Your email"
          />
        </div>
      </div>
      <div className="as-field">
        <label>Phone</label>
        <div className="as-input">
          <FiPhone />
          <input
            name="phone"
            value={profile.phone}
            onChange={onChange}
            placeholder="Enter phone number"
          />
        </div>
      </div>
      <div className="as-field">
        <label>Date of Birth</label>
        <div className="as-input">
          <FiCalendar />
          <input
            type="date"
            name="dob"
            value={profile.dob}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="as-field">
        <label>Nationality</label>
        <div className="as-input">
          <FiGlobe />
          <input
            name="nationality"
            value={profile.nationality}
            onChange={onChange}
            placeholder="Enter nationality"
          />
        </div>
      </div>
      {!profileExists && (
        <div className="as-field">
          <label>Profile Photo</label>
          <div className="as-input">
            <input type="file" accept="image/*" onChange={onAvatarChange} />
          </div>
        </div>
      )}
    </div>
    {saveError && <p style={{ color: "red" }}>{saveError}</p>}
    {saveMessage && <p style={{ color: "green" }}>{saveMessage}</p>}
    <button className="as-save" onClick={onSave} disabled={isSaving}>
      <FiSave /> {profileExists ? "Save Changes" : "Create Profile"}
    </button>
  </div>
);

const ChangePassword = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    // Implement API call here
    alert("Password updated successfully!");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="as-card">
      <div className="as-form-stack">
        <div className="as-field">
          <label>Current Password</label>
          <div className="as-input">
            <FiLock />
            <input
              type={showCurrent ? "text" : "password"}
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
            />
            <button className="as-eye" onClick={() => setShowCurrent(!showCurrent)}>
              {showCurrent ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div className="as-field">
          <label>New Password</label>
          <div className="as-input">
            <FiLock />
            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
            />
            <button className="as-eye" onClick={() => setShowNew(!showNew)}>
              {showNew ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div className="as-field">
          <label>Confirm New Password</label>
          <div className="as-input">
            <FiLock />
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
            />
          </div>
        </div>

        <button className="as-save" onClick={handleUpdate}>
          <FiSave /> Update Password
        </button>
      </div>
    </div>
  );
};

const DangerZone = ({handleLogout}) => (

  <div className="as-danger">
    <h3>Danger Zone</h3>
    <p>
      Once you delete your account, there is no going back. Please be certain.
    </p>
    <button className="as-delete" onClick={handleLogout}>
      <FiTrash2 /> Delete Account
    </button>
  </div>
);

const Acsettings = () => {
    const navigate = useNavigate();
  const [tab, setTab] = useState("profile");
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    nationality: "",
  });
  const [profileExists, setProfileExists] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saveError, setSaveError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    let isActive = true;
    const loadProfile = async () => {
      setLoadingProfile(true);
      setSaveError("");
      try {
        const data = await getProfile();
        if (!isActive) return;
        setProfileExists(true);
        setProfile({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || localStorage.getItem("userEmail") || "",
          phone: data.phone || "",
          dob: data.dob || "",
          nationality: data.nationality || "",
        });
      } catch (err) {
        if (!isActive) return;
        const message = err?.message || "Failed to load profile";
        if (message.toLowerCase().includes("profile not found")) {
          setProfileExists(false);
          setProfile((prev) => ({
            ...prev,
            email: localStorage.getItem("userEmail") || "",
          }));
        } else {
          setSaveError(message);
        }
      } finally {
        if (isActive) setLoadingProfile(false);
      }
    };

    loadProfile();

    return () => {
      isActive = false;
    };
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  const handleSaveProfile = async () => {
    setSaveError("");
    setSaveMessage("");

    if (
      !profile.firstName ||
      !profile.lastName ||
      !profile.phone ||
      !profile.dob ||
      !profile.nationality
    ) {
      setSaveError("Please fill in all profile details.");
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        dob: profile.dob,
        nationality: profile.nationality,
      };

      if (profileExists) {
        await updateProfile(payload);
        setSaveMessage("Profile updated successfully.");
      } else {
        await createProfile(payload, avatarFile);
        setProfileExists(true);
        setSaveMessage("Profile created successfully.");
      }
    } catch (err) {
      setSaveError(err?.message || "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };
      const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="as-wrap">
      <div className="as-head">
        <h2>Account Settings</h2>
        <p>Manage your account preferences and information</p>
      </div>

      <div className="as-tabs">
        <button
          className={tab === "profile" ? "active" : ""}
          onClick={() => setTab("profile")}
        >
          <FiUser /> Profile Details
        </button>
        <button 
          className={tab === "password" ? "active" : ""}
          onClick={() => setTab("password")}
        >
          <FiLock /> Change Password
        </button>
      </div>

      {tab === "profile" && loadingProfile && <p>Loading profile...</p>}
      {tab === "profile" && !loadingProfile && (
        <ProfileDetails
          profile={profile}
          onChange={handleProfileChange}
          onSave={handleSaveProfile}
          isSaving={isSaving}
          saveError={saveError}
          saveMessage={saveMessage}
          onAvatarChange={handleAvatarChange}
          profileExists={profileExists}
        />
      )}
      {tab === "password" && <ChangePassword />}
      <DangerZone handleLogout={handleLogout}/>
    </div>
  );
};

export default Acsettings;
