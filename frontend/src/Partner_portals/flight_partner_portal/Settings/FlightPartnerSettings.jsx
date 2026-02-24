import { useEffect, useState } from "react";

const FlightPartnerSettings = ({ tab }) => {
  const [activeTab, setActiveTab] = useState(tab || "profile");

  useEffect(() => {
    if (tab) setActiveTab(tab);
  }, [tab]);

  return (
    <div className="fp-card">
      <div className="fp-card-head">
        <div>
          <h3>Settings</h3>
          <p className="fp-muted">Manage airline profile, roles, and API access.</p>
        </div>
        <div className="fp-tab-row">
          <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>Airline Profile</button>
          <button className={activeTab === "roles" ? "active" : ""} onClick={() => setActiveTab("roles")}>Users & Roles</button>
          <button className={activeTab === "api" ? "active" : ""} onClick={() => setActiveTab("api")}>API Keys</button>
        </div>
      </div>

      {activeTab === "profile" && (
        <div className="fp-form">
          <div className="fp-form-grid">
            <div>
              <label>Airline Name</label>
              <input defaultValue="StayBook Airlines" />
            </div>
            <div>
              <label>Headquarters</label>
              <input defaultValue="New Delhi" />
            </div>
            <div>
              <label>Operations Email</label>
              <input defaultValue="ops@staybookair.com" />
            </div>
            <div>
              <label>Support Phone</label>
              <input defaultValue="+91 98765 43210" />
            </div>
          </div>
          <div className="fp-form-actions">
            <button className="fp-primary">Save Changes</button>
          </div>
        </div>
      )}

      {activeTab === "roles" && (
        <div className="fp-table">
          <table>
            <thead>
              <tr>
                <th>Role</th>
                <th>Flights</th>
                <th>Bookings</th>
                <th>Pricing</th>
                <th>Payments</th>
                <th>Settings</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Admin</td>
                <td>Full</td>
                <td>Full</td>
                <td>Full</td>
                <td>Full</td>
                <td>Full</td>
              </tr>
              <tr>
                <td>Airline Manager</td>
                <td>Full</td>
                <td>Full</td>
                <td>Edit</td>
                <td>View</td>
                <td>View</td>
              </tr>
              <tr>
                <td>Operations Agent</td>
                <td>Edit</td>
                <td>View</td>
                <td>View</td>
                <td>None</td>
                <td>None</td>
              </tr>
              <tr>
                <td>Finance</td>
                <td>View</td>
                <td>View</td>
                <td>View</td>
                <td>Full</td>
                <td>None</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "api" && (
        <div className="fp-card-grid">
          <div className="fp-policy-card">
            <h4>Production Key</h4>
            <p>Key: sk_live_************</p>
            <p>Last rotated: 14 days ago</p>
            <button className="fp-secondary">Rotate Key</button>
          </div>
          <div className="fp-policy-card">
            <h4>Sandbox Key</h4>
            <p>Key: sk_test_************</p>
            <p>Environment: Staging</p>
            <button className="fp-secondary">Generate Key</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightPartnerSettings;
