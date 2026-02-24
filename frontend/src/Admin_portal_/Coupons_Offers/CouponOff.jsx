// CouponOff.jsx
import React, { useEffect, useMemo, useState } from "react";
import { FiTag, FiPlus } from "react-icons/fi";
import "./CouponOff.scss";
import { fetchAdminCoupons } from "../../Api/admin/adminApi";

const CouponOff = ({ onCreate, refreshKey, searchQuery = "" }) => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCoupons = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchAdminCoupons();
        setCoupons(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err?.message || "Failed to load coupons.");
      } finally {
        setLoading(false);
      }
    };

    loadCoupons();
  }, [refreshKey]);

  const filteredCoupons = useMemo(() => {
    if (!searchQuery.trim()) return coupons;
    const needle = searchQuery.toLowerCase();
    return coupons.filter((coupon) =>
      [coupon.name, coupon.code, coupon.description]
        .filter(Boolean)
        .some((val) => val.toLowerCase().includes(needle))
    );
  }, [coupons, searchQuery]);

  const stats = useMemo(() => {
    const totalCoupons = filteredCoupons.length;
    const today = new Date();
    const activeCoupons = filteredCoupons.filter((c) => {
      const from = c.validFrom ? new Date(c.validFrom) : null;
      const to = c.validTo ? new Date(c.validTo) : null;
      return (!from || from <= today) && (!to || to >= today);
    }).length;
    const totalUsage = filteredCoupons.reduce((sum, c) => sum + (c.usageCount || 0), 0);
    const totalDiscount = filteredCoupons.reduce((sum, c) => {
      const count = c.usageCount || 0;
      const value = c.discountValue || 0;
      return sum + count * value;
    }, 0);

    return { totalCoupons, activeCoupons, totalUsage, totalDiscount };
  }, [filteredCoupons]);

  const formatDiscount = (coupon) => {
    if (!coupon) return "-";
    return coupon.discountType === "PERCENTAGE"
      ? `${coupon.discountValue || 0}%`
      : `₹${(coupon.discountValue || 0).toFixed(2)}`;
  };

  const formatCondition = (value) => {
    if (!value) return "-";
    return value
      .toString()
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="co-container">
      <div className="co-head">
        <div>
          <h1>Coupons & Offers Management</h1>
          <p>Create and manage promotional offers</p>
        </div>
        <button className="create-btn" onClick={onCreate}>
          <FiPlus /> Create Coupon
        </button>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <h2>{stats.totalCoupons}</h2>
          <span>Total Coupons</span>
        </div>
        <div className="stat-card green">
          <h2>{stats.activeCoupons}</h2>
          <span>Active Coupons</span>
        </div>
        <div className="stat-card">
          <h2>{stats.totalUsage}</h2>
          <span>Total Usage</span>
        </div>
        <div className="stat-card">
          <h2>₹{stats.totalDiscount.toFixed(2)}</h2>
          <span>Total Discount Given</span>
        </div>
      </div>

      <div className="coupon-grid">
        {loading ? (
          <p className="muted">Loading coupons...</p>
        ) : error ? (
          <p className="muted">{error}</p>
        ) : filteredCoupons.length === 0 ? (
          <p className="muted">No coupons available.</p>
        ) : (
          filteredCoupons.map((coupon) => {
            const today = new Date();
            const from = coupon.validFrom ? new Date(coupon.validFrom) : null;
            const to = coupon.validTo ? new Date(coupon.validTo) : null;
            const isActive =
              (!from || from <= today) && (!to || to >= today);
            return (
              <div className="coupon-card" key={coupon.id}>
                <FiTag className="icon" />
                <h3>{coupon.name}</h3>
                <span className="code">{coupon.code}</span>
                <span className={`pill ${isActive ? "active" : "inactive"}`}>
                  {isActive ? "Active" : "Inactive"}
                </span>
                <div className="meta">
                  <p>Discount: {formatDiscount(coupon)}</p>
                  <p>Condition: {formatCondition(coupon.generationCondition)}</p>
                  {coupon.generationCondition === "COST" && (
                    <p>Cost: ₹{coupon.costValue || 0}</p>
                  )}
                  <p>
                    Usage: {coupon.usageCount || 0} /{" "}
                    {coupon.usageLimit || "∞"}
                  </p>
                  <p>
                    Valid Until:{" "}
                    {coupon.validTo
                      ? new Date(coupon.validTo).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CouponOff;
