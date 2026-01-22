// Acsettings.jsx
import React, { useState } from "react";
import {
  FiUser,
  FiLock,
  FiBell,
  FiUsers,
  FiMail,
  FiPhone,
  FiCalendar,
  FiGlobe,
  FiTrash2,
  FiSave,
} from "react-icons/fi";
import "./Acsettings.css";

const ProfileDetails = () => (
  <div className="as-card">
    <div className="as-grid">
      <div className="as-field">
        <label>First Name</label>
        <div className="as-input">
          <FiUser />
          <input defaultValue="John" />
        </div>
      </div>
      <div className="as-field">
        <label>Last Name</label>
        <div className="as-input">
          <FiUser />
          <input defaultValue="Doe" />
        </div>
      </div>
      <div className="as-field">
        <label>Email</label>
        <div className="as-input">
          <FiMail />
          <input defaultValue="john.doe@email.com" />
        </div>
      </div>
      <div className="as-field">
        <label>Phone</label>
        <div className="as-input">
          <FiPhone />
          <input defaultValue="+1 (555) 123-4567" />
        </div>
      </div>
      <div className="as-field">
        <label>Date of Birth</label>
        <div className="as-input">
          <FiCalendar />
          <input defaultValue="15-05-1990" />
        </div>
      </div>
      <div className="as-field">
        <label>Nationality</label>
        <div className="as-input">
          <FiGlobe />
          <input defaultValue="United States" />
        </div>
      </div>
    </div>
    <button className="as-save">
      <FiSave /> Save Changes
    </button>
  </div>
);

const DangerZone = () => (
  <div className="as-danger">
    <h3>Danger Zone</h3>
    <p>
      Once you delete your account, there is no going back. Please be certain.
    </p>
    <button className="as-delete">
      <FiTrash2 /> Delete Account
    </button>
  </div>
);

const Acsettings = () => {
  const [tab, setTab] = useState("profile");

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
        <button onClick={() => setTab("password")}>
          <FiLock /> Change Password
        </button>
        <button onClick={() => setTab("notify")}>
          <FiBell /> Notifications
        </button>
        <button onClick={() => setTab("traveler")}>
          <FiUsers /> Saved Travelers
        </button>
      </div>

      {tab === "profile" && <ProfileDetails />}
      <DangerZone />
    </div>
  );
};

export default Acsettings;
