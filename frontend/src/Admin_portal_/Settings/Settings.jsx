// Settings.jsx
import React from "react";
import {
  FiDollarSign,
  FiShield,
  FiAlertTriangle,
  FiUsers,
} from "react-icons/fi";
import "./settings.scss";

const Settings = () => {
  return (
    <div className="st-container">
      <h1>System Settings</h1>
      <p className="subtitle">Configure platform-wide settings and policies</p>

      {/* Commission */}
      <div className="card">
        <div className="card-head">
          <FiDollarSign />
          <div>
            <h3>Commission & Revenue Settings</h3>
            <p>Configure default commission rates and service fees</p>
          </div>
        </div>

        <div className="grid-3">
          <div>
            <label>Default Commission Rate</label>
            <input type="number" defaultValue="15" />
          </div>
          <div>
            <label>Minimum Commission Rate (%)</label>
            <input type="number" defaultValue="10" />
          </div>
          <div>
            <label>Maximum Commission Rate (%)</label>
            <input type="number" defaultValue="25" />
          </div>
        </div>

        <div className="grid-2">
          <div>
            <label>Platform Service Fee Type</label>
            <select>
              <option>Percentage</option>
              <option>Flat</option>
            </select>
          </div>
          <div>
            <label>Service Fee Value (%)</label>
            <input type="number" defaultValue="2.5" />
          </div>
        </div>
      </div>

      {/* Hotel Verification */}
      <div className="card">
        <div className="card-head">
          <FiShield />
          <div>
            <h3>Hotel Verification Rules</h3>
            <p>Configure hotel registration and verification requirements</p>
          </div>
        </div>

        {[
          "Auto-Approve Hotels",
          "Require Tax Registration",
          "Require Business License",
          "Require Email Verification",
        ].map((t) => (
          <div className="toggle-row" key={t}>
            <span>{t}</span>
            <label className="switch">
              <input type="checkbox" defaultChecked={t !== "Auto-Approve Hotels"} />
              <span className="slider" />
            </label>
          </div>
        ))}
      </div>

      {/* Coupon Abuse */}
      <div className="card">
        <div className="card-head">
          <FiAlertTriangle />
          <div>
            <h3>Coupon Abuse Prevention</h3>
            <p>Configure rules to prevent coupon misuse</p>
          </div>
        </div>

        <div className="grid-2">
          <div>
            <label>Max Coupon Usage Per User</label>
            <input type="number" defaultValue="3" />
          </div>
          <div>
            <label>Suspicious Activity Threshold</label>
            <input type="number" defaultValue="5" />
          </div>
        </div>

        <div className="toggle-row">
          <span>Allow Multiple Coupons Per Booking</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider" />
          </label>
        </div>
      </div>

      {/* Admin Roles */}
      <div className="card">
        <div className="card-head">
          <FiUsers />
          <div>
            <h3>Admin Role Management</h3>
            <p>Manage admin users and their permissions</p>
          </div>
        </div>

        <div className="admin-row">
          <div>
            <strong>Admin User</strong>
            <p>admin@staybook.com</p>
          </div>
          <span className="badge blue">Super Admin</span>
        </div>

        <div className="admin-row">
          <div>
            <strong>Support Manager</strong>
            <p>support@staybook.com</p>
          </div>
          <span className="badge green">Manager</span>
        </div>

        <div className="add-admin">+ Add New Admin User</div>
      </div>

      <div className="actions">
        <button className="outline">Reset to Defaults</button>
        <button className="primary">Save Settings</button>
      </div>
    </div>
  );
};

export default Settings;
