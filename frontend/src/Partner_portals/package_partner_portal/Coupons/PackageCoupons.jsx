import { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import PPCard from "../Common/PPCard";
import PPTable from "../Common/PPTable";
import PPModal from "../Common/PPModal";
import PPBadge from "../Common/PPBadge";
import "./PackageCoupons.scss";

const emptyCoupon = {
  id: "",
  code: "",
  type: "Percentage",
  value: 0,
  minBooking: 0,
  validTill: "",
  usageLimit: 0,
  usedCount: 0,
  status: "Active",
};

const PackageCoupons = ({ coupons, onSave, onDelete, readOnly }) => {
  const [form, setForm] = useState(emptyCoupon);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(form);
    setForm(emptyCoupon);
  };

  return (
    <div className="pp-page pp-coupons">
      {readOnly && (
        <div className="pp-banner">
          Coupon creation is restricted for Sub Partner roles.
        </div>
      )}

      <PPCard title="Create Coupon" subtitle="Launch promotions for packages">
        <form className="pp-form-grid" onSubmit={handleSubmit}>
          <div className="pp-field">
            <label>Coupon Code</label>
            <input
              value={form.code}
              onChange={(event) => setForm((prev) => ({ ...prev, code: event.target.value }))}
              disabled={readOnly}
              required
            />
          </div>
          <div className="pp-field">
            <label>Discount Type</label>
            <select
              value={form.type}
              onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
              disabled={readOnly}
            >
              <option value="Flat">Flat</option>
              <option value="Percentage">Percentage</option>
            </select>
          </div>
          <div className="pp-field">
            <label>Value</label>
            <input
              type="number"
              value={form.value}
              onChange={(event) => setForm((prev) => ({ ...prev, value: Number(event.target.value) }))}
              disabled={readOnly}
            />
          </div>
          <div className="pp-field">
            <label>Minimum Booking (Rs.)</label>
            <input
              type="number"
              value={form.minBooking}
              onChange={(event) => setForm((prev) => ({ ...prev, minBooking: Number(event.target.value) }))}
              disabled={readOnly}
            />
          </div>
          <div className="pp-field">
            <label>Validity</label>
            <input
              type="date"
              value={form.validTill}
              onChange={(event) => setForm((prev) => ({ ...prev, validTill: event.target.value }))}
              disabled={readOnly}
            />
          </div>
          <div className="pp-field">
            <label>Usage Limit</label>
            <input
              type="number"
              value={form.usageLimit}
              onChange={(event) => setForm((prev) => ({ ...prev, usageLimit: Number(event.target.value) }))}
              disabled={readOnly}
            />
          </div>
          <div className="pp-inline">
            <button type="submit" className="pp-btn pp-btn-primary" disabled={readOnly}>
              <FiPlus /> Save Coupon
            </button>
          </div>
        </form>
      </PPCard>

      <PPCard title="Coupons List" subtitle="Active and expired promotions">
        <PPTable
          columns={[
            { key: "code", label: "Code" },
            { key: "type", label: "Type" },
            { key: "value", label: "Value" },
            { key: "minBooking", label: "Minimum" },
            { key: "validTill", label: "Valid Till" },
            { key: "usage", label: "Usage" },
            { key: "status", label: "Status" },
            { key: "actions", label: "Actions", align: "right" },
          ]}
          rows={coupons}
          emptyMessage="No coupons created yet."
          renderRow={(coupon) => (
            <tr key={coupon.id}>
              <td>{coupon.code}</td>
              <td>{coupon.type}</td>
              <td>{coupon.type === "Percentage" ? `${coupon.value}%` : `Rs. ${coupon.value}`}</td>
              <td>Rs. {coupon.minBooking}</td>
              <td>{coupon.validTill}</td>
              <td>{coupon.usedCount}/{coupon.usageLimit}</td>
              <td>
                <PPBadge tone={coupon.status === "Active" ? "success" : "warning"}>
                  {coupon.status}
                </PPBadge>
              </td>
              <td>
                <div className="pp-actions">
                  <button
                    type="button"
                    className="pp-btn pp-btn-ghost"
                    onClick={() => setConfirmDelete(coupon)}
                    disabled={readOnly}
                  >
                    <FiTrash2 /> Remove
                  </button>
                </div>
              </td>
            </tr>
          )}
        />
      </PPCard>

      {confirmDelete && (
        <PPModal
          title="Remove Coupon"
          onClose={() => setConfirmDelete(null)}
          actions={
            <>
              <button
                type="button"
                className="pp-btn pp-btn-ghost"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="pp-btn pp-btn-danger"
                onClick={() => {
                  onDelete(confirmDelete.id);
                  setConfirmDelete(null);
                }}
              >
                Remove
              </button>
            </>
          }
        >
          Delete coupon <strong>{confirmDelete.code}</strong>?
        </PPModal>
      )}
    </div>
  );
};

export default PackageCoupons;
