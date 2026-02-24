import { useState } from "react";
import { FiUserPlus, FiLock } from "react-icons/fi";
import PPCard from "../Common/PPCard";
import PPTable from "../Common/PPTable";
import PPBadge from "../Common/PPBadge";
import "./PackagePartnerSettings.scss";

const PackagePartnerSettings = ({ readOnly }) => {
  const [partners, setPartners] = useState([
    {
      id: "SP-01",
      name: "Asha Verma",
      email: "asha@skyline.in",
      role: "Sub Partner",
      access: "Bookings-only",
    },
    {
      id: "SP-02",
      name: "Karan Mehta",
      email: "karan@skyline.in",
      role: "Sub Partner",
      access: "Read-only",
    },
  ]);

  const [newPartner, setNewPartner] = useState({
    name: "",
    email: "",
    access: "Read-only",
  });

  const handleAddPartner = (event) => {
    event.preventDefault();
    setPartners((prev) => [
      ...prev,
      {
        id: `SP-${Date.now()}`,
        name: newPartner.name,
        email: newPartner.email,
        role: "Sub Partner",
        access: newPartner.access,
      },
    ]);
    setNewPartner({ name: "", email: "", access: "Read-only" });
  };

  return (
    <div className="pp-page pp-settings">
      {readOnly && (
        <div className="pp-banner">
          Limited settings access enabled for Sub Partner role.
        </div>
      )}

      <div className="pp-grid-2">
        <PPCard title="Agency Profile" subtitle="Basic information">
          <div className="pp-form-grid">
            <div className="pp-field">
              <label>Agency Name</label>
              <input defaultValue="Skyline Planners" disabled={readOnly} />
            </div>
            <div className="pp-field">
              <label>City</label>
              <input defaultValue="Bengaluru" disabled={readOnly} />
            </div>
            <div className="pp-field">
              <label>Contact Email</label>
              <input defaultValue="planner@staybook.com" disabled={readOnly} />
            </div>
            <div className="pp-field">
              <label>Contact Phone</label>
              <input defaultValue="+91 98765 43210" disabled={readOnly} />
            </div>
          </div>
        </PPCard>

        <PPCard title="GST & Bank Details" subtitle="Settlement profile">
          <div className="pp-form-grid">
            <div className="pp-field">
              <label>GST Number</label>
              <input defaultValue="29ABCDE1234F1Z5" disabled={readOnly} />
            </div>
            <div className="pp-field">
              <label>Bank Name</label>
              <input defaultValue="StayBank" disabled={readOnly} />
            </div>
            <div className="pp-field">
              <label>Account Number</label>
              <input defaultValue="XXXX-3244" disabled={readOnly} />
            </div>
            <div className="pp-field">
              <label>Settlement Preference</label>
              <select disabled={readOnly}>
                <option>Weekly</option>
                <option>Bi-weekly</option>
                <option>Monthly</option>
              </select>
            </div>
          </div>
        </PPCard>
      </div>

      <div className="pp-grid-2">
        <PPCard title="Security" subtitle="Password & access">
          <div className="pp-stack">
            <div className="pp-field">
              <label>Change Password</label>
              <input type="password" placeholder="New password" disabled={readOnly} />
            </div>
            <button type="button" className="pp-btn pp-btn-secondary" disabled={readOnly}>
              <FiLock /> Update Password
            </button>
          </div>
        </PPCard>

        <PPCard title="Role Management" subtitle="Add sub-partners">
          <form onSubmit={handleAddPartner} className="pp-stack">
            <div className="pp-field">
              <label>Sub Partner Name</label>
              <input
                value={newPartner.name}
                onChange={(event) =>
                  setNewPartner((prev) => ({ ...prev, name: event.target.value }))
                }
                disabled={readOnly}
              />
            </div>
            <div className="pp-field">
              <label>Email</label>
              <input
                value={newPartner.email}
                onChange={(event) =>
                  setNewPartner((prev) => ({ ...prev, email: event.target.value }))
                }
                disabled={readOnly}
              />
            </div>
            <div className="pp-field">
              <label>Permissions</label>
              <select
                value={newPartner.access}
                onChange={(event) =>
                  setNewPartner((prev) => ({ ...prev, access: event.target.value }))
                }
                disabled={readOnly}
              >
                <option>Read-only</option>
                <option>Bookings-only</option>
                <option>Pricing-only</option>
              </select>
            </div>
            <button type="submit" className="pp-btn pp-btn-primary" disabled={readOnly}>
              <FiUserPlus /> Add Sub Partner
            </button>
          </form>
        </PPCard>
      </div>

      <PPCard title="Sub Partner Access Matrix" subtitle="Role based capabilities">
        <PPTable
          columns={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "role", label: "Role" },
            { key: "access", label: "Access Level" },
            { key: "status", label: "Status" },
          ]}
          rows={partners}
          emptyMessage="No sub partners added yet."
          renderRow={(partner) => (
            <tr key={partner.id}>
              <td>{partner.name}</td>
              <td>{partner.email}</td>
              <td>
                <PPBadge tone="info">{partner.role}</PPBadge>
              </td>
              <td>{partner.access}</td>
              <td>
                <PPBadge tone="success">Active</PPBadge>
              </td>
            </tr>
          )}
        />
      </PPCard>
    </div>
  );
};

export default PackagePartnerSettings;
