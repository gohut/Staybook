// CouponCr.jsx
import React, { useEffect, useMemo, useState } from "react";
import { FiX } from "react-icons/fi";
import "./CouponCr.scss";
import { createAdminCoupon } from "../../Api/admin/adminApi";

const CouponCr = ({ onClose, onCreated }) => {
  const [form, setForm] = useState({
    name: "",
    code: "",
    discountType: "PERCENTAGE",
    discountValue: "",
    generationCondition: "COST",
    costValue: "",
    validFrom: "",
    validTo: "",
    usageLimit: "",
    appliesTo: "ALL_HOTELS",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isLucky = form.generationCondition === "LUCKY";

  const generatedCode = useMemo(() => {
    if (!isLucky) return "";
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `LUCKY-${random}`;
  }, [isLucky]);

  useEffect(() => {
    if (isLucky) {
      setForm((prev) => ({ ...prev, code: generatedCode }));
    }
  }, [isLucky, generatedCode]);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Coupon name is required.");
      return;
    }
    if (!form.discountValue) {
      setError("Discount value is required.");
      return;
    }
    if (!form.validFrom || !form.validTo) {
      setError("Valid From and Valid To are required.");
      return;
    }
    if (form.generationCondition === "COST" && !form.costValue) {
      setError("Cost value is required for cost coupons.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        code: form.code.trim(),
        discountType: form.discountType,
        discountValue: Number(form.discountValue),
        generationCondition: form.generationCondition,
        costValue: form.costValue ? Number(form.costValue) : null,
        validFrom: form.validFrom,
        validTo: form.validTo,
        usageLimit: form.usageLimit ? Number(form.usageLimit) : null,
        appliesTo: form.appliesTo,
      };

      await createAdminCoupon(payload);
      setSuccess("Coupon created successfully.");
      onCreated?.();
    } catch (err) {
      setError(err?.message || "Failed to create coupon.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-head">
          <h2>Create New Coupon</h2>
          <FiX onClick={onClose} />
        </div>

        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}

        <div className="form-grid">
          <input
            placeholder="Coupon Name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
          <input
            placeholder="Coupon Code"
            value={form.code}
            onChange={(e) => updateField("code", e.target.value)}
            readOnly={isLucky}
          />
          <select
            value={form.discountType}
            onChange={(e) => updateField("discountType", e.target.value)}
          >
            <option value="PERCENTAGE">Percentage</option>
            <option value="FLAT">Flat</option>
          </select>
          <input
            type="number"
            placeholder="Discount Value"
            value={form.discountValue}
            onChange={(e) => updateField("discountValue", e.target.value)}
          />
          <select
            value={form.generationCondition}
            onChange={(e) => updateField("generationCondition", e.target.value)}
          >
            <option value="COST">Cost</option>
            <option value="LUCKY">Lucky</option>
            <option value="FIRST_TIME">First Time</option>
          </select>
          {form.generationCondition === "COST" && (
            <input
              type="number"
              placeholder="Cost Value"
              value={form.costValue}
              onChange={(e) => updateField("costValue", e.target.value)}
            />
          )}
          <input
            type="date"
            placeholder="Valid From"
            value={form.validFrom}
            onChange={(e) => updateField("validFrom", e.target.value)}
          />
          <input
            type="date"
            placeholder="Valid To"
            value={form.validTo}
            onChange={(e) => updateField("validTo", e.target.value)}
          />
          <input
            type="number"
            placeholder="Usage Limit"
            value={form.usageLimit}
            onChange={(e) => updateField("usageLimit", e.target.value)}
          />
          <select
            value={form.appliesTo}
            onChange={(e) => updateField("appliesTo", e.target.value)}
          >
            <option value="ALL_HOTELS">All Hotels</option>
          </select>
        </div>

        <div className="actions">
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="create" onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create Coupon"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponCr;
