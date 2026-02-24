import React, { useEffect, useMemo, useState } from "react";
import {
  FiArrowLeft,
  FiEye,
  FiPercent,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import "./PartnerDetails.scss";
import {
  deletePartner,
  fetchCommissionDetails,
  fetchCommissionSummaries,
  fetchPartnerDetail,
  fetchPartners,
  updateCommission,
} from "../../Api/admin/adminApi";

const CATEGORIES = [
  { value: "hotel_partners", label: "Hotel Partners" },
  { value: "homestay_partners", label: "Homestay Partners" },
  { value: "packages_partner", label: "Packages Partner" },
  { value: "flight_partner", label: "Flight Partner" },
];

const formatCurrency = (value) => {
  const amount = Number(value) || 0;
  return `₹${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const PartnerDetails = ({ searchQuery = "" }) => {
  const [tab, setTab] = useState("commission");

  const [commissionCategory, setCommissionCategory] = useState(
    CATEGORIES[0].value
  );
  const [commissionRows, setCommissionRows] = useState([]);
  const [commissionLoading, setCommissionLoading] = useState(true);
  const [commissionError, setCommissionError] = useState("");

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  const [separateRate, setSeparateRate] = useState("");

  const [partnerCategory, setPartnerCategory] = useState(CATEGORIES[0].value);
  const [partners, setPartners] = useState([]);
  const [partnerLoading, setPartnerLoading] = useState(true);
  const [partnerError, setPartnerError] = useState("");
  const [partnerDetail, setPartnerDetail] = useState(null);
  const [partnerDetailLoading, setPartnerDetailLoading] = useState(false);

  const loadCommissions = async (category) => {
    setCommissionLoading(true);
    setCommissionError("");
    try {
      const data = await fetchCommissionSummaries(category);
      setCommissionRows(Array.isArray(data) ? data : []);
    } catch (err) {
      setCommissionError(err?.message || "Failed to load commissions.");
    } finally {
      setCommissionLoading(false);
    }
  };

  const loadPartners = async (category) => {
    setPartnerLoading(true);
    setPartnerError("");
    try {
      const data = await fetchPartners(category);
      setPartners(Array.isArray(data) ? data : []);
    } catch (err) {
      setPartnerError(err?.message || "Failed to load partners.");
    } finally {
      setPartnerLoading(false);
    }
  };

  useEffect(() => {
    loadCommissions(commissionCategory);
  }, [commissionCategory]);

  useEffect(() => {
    loadPartners(partnerCategory);
  }, [partnerCategory]);

  const filteredCommissions = useMemo(() => {
    if (!searchQuery.trim()) return commissionRows;
    const needle = searchQuery.toLowerCase();
    return commissionRows.filter((row) =>
      [row.hotelName, row.partnerName, row.partnerEmail]
        .filter(Boolean)
        .some((val) => val.toLowerCase().includes(needle))
    );
  }, [commissionRows, searchQuery]);

  const filteredPartners = useMemo(() => {
    if (!searchQuery.trim()) return partners;
    const needle = searchQuery.toLowerCase();
    return partners.filter((p) =>
      [p.name, p.email, p.role]
        .filter(Boolean)
        .some((val) => val.toLowerCase().includes(needle))
    );
  }, [partners, searchQuery]);

  const openCommissionDetails = async (hotelId) => {
    setSelectedHotel({ hotelId });
    setDetailLoading(true);
    setDetailError("");
    try {
      const data = await fetchCommissionDetails(hotelId);
      setSelectedHotel(data);
      setSeparateRate(
        data?.separateCommissionRate !== null &&
          data?.separateCommissionRate !== undefined
          ? data.separateCommissionRate
          : ""
      );
    } catch (err) {
      setDetailError(err?.message || "Failed to load details.");
    } finally {
      setDetailLoading(false);
    }
  };

  const closeCommissionDetails = () => {
    setSelectedHotel(null);
    setDetailError("");
    setSeparateRate("");
  };

  const applyCommissionUpdate = async () => {
    if (!selectedHotel) return;
    const nextRate = Number(separateRate);
    if (Number.isNaN(nextRate)) {
      setDetailError("Separate commission must be a number.");
      return;
    }

    setDetailLoading(true);
    setDetailError("");
    try {
      const updated = await updateCommission(selectedHotel.hotelId, nextRate);
      setSelectedHotel(updated);
      setSeparateRate(updated.separateCommissionRate ?? nextRate);
      await loadCommissions(commissionCategory);
      closeCommissionDetails();
    } catch (err) {
      setDetailError(err?.message || "Failed to update commission.");
    } finally {
      setDetailLoading(false);
    }
  };

  const inspectPartner = async (partnerId) => {
    setPartnerDetailLoading(true);
    setPartnerError("");
    try {
      const data = await fetchPartnerDetail(partnerId);
      setPartnerDetail(data);
    } catch (err) {
      setPartnerError(err?.message || "Failed to load partner details.");
    } finally {
      setPartnerDetailLoading(false);
    }
  };

  const handleRemovePartner = async () => {
    if (!partnerDetail?.partner?.id) return;
    const confirmed = window.confirm(
      `Remove partner ${partnerDetail.partner.name || ""}? This cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await deletePartner(partnerDetail.partner.id);
      setPartnerDetail(null);
      loadPartners(partnerCategory);
    } catch (err) {
      setPartnerError(err?.message || "Failed to remove partner.");
    }
  };

  const computedRooms = useMemo(() => {
    if (!selectedHotel) return [];
    const basic = Number(selectedHotel.basicCommissionRate) || 0;
    const separate = Number(separateRate) || 0;
    const totalRate = basic + separate;
    return (selectedHotel.rooms || []).map((room) => {
      const basePrice = Number(room.basePrice) || 0;
      const commissionAmount = (basePrice * totalRate) / 100;
      return { ...room, basePrice, commissionAmount };
    });
  }, [selectedHotel, separateRate]);

  const totalCommissionAmount = computedRooms.reduce(
    (sum, room) => sum + (room.commissionAmount || 0),
    0
  );

  return (
    <div className="pd-container">
      <div className="pd-head">
        <div>
          <h1>Partner Details</h1>
          <p>Review commission structures and partner onboarding details</p>
        </div>
        <div className="pd-tabs">
          <button
            className={tab === "commission" ? "active" : ""}
            onClick={() => setTab("commission")}
          >
            <FiPercent /> Commission
          </button>
          <button
            className={tab === "partners" ? "active" : ""}
            onClick={() => setTab("partners")}
          >
            <FiEye /> Partners
          </button>
        </div>
      </div>

      {tab === "commission" && (
        <div className="pd-card">
          <div className="pd-filter">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                className={commissionCategory === cat.value ? "active" : ""}
                onClick={() => setCommissionCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {commissionLoading ? (
            <p className="muted">Loading commissions...</p>
          ) : commissionError ? (
            <p className="muted error">{commissionError}</p>
          ) : filteredCommissions.length === 0 ? (
            <p className="muted">No commission records available.</p>
          ) : (
            <div className="pd-table">
              <table>
                <thead>
                  <tr>
                    <th>Hotel</th>
                    <th>Partner</th>
                    <th>Basic Commission</th>
                    <th>Separate Commission</th>
                    <th>Total Commission</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCommissions.map((row) => (
                    <tr
                      key={row.hotelId}
                      onClick={() => openCommissionDetails(row.hotelId)}
                    >
                      <td>
                        <strong>{row.hotelName || "-"}</strong>
                        <div className="muted">{row.category || "hotel_partners"}</div>
                      </td>
                      <td>
                        {row.partnerName || "-"}
                        <div className="muted">{row.partnerEmail || "-"}</div>
                      </td>
                      <td>{(row.basicCommissionRate || 0).toFixed(2)}%</td>
                      <td>{(row.separateCommissionRate || 0).toFixed(2)}%</td>
                      <td>{formatCurrency(row.totalCommissionAmount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === "partners" && (
        <div className="pd-card">
          {partnerDetail ? (
            <div className="pd-detail">
              <button className="back" onClick={() => setPartnerDetail(null)}>
                <FiArrowLeft /> Back to list
              </button>

              {partnerDetailLoading ? (
                <p className="muted">Loading partner details...</p>
              ) : (
                <div className="pd-detail-body">
                  <div className="pd-detail-card">
                    <h3>Partner Overview</h3>
                    <div className="pd-detail-grid">
                      <div>
                        <span>Name</span>
                        <strong>{partnerDetail.partner?.name || "-"}</strong>
                      </div>
                      <div>
                        <span>Email</span>
                        <strong>{partnerDetail.partner?.email || "-"}</strong>
                      </div>
                      <div>
                        <span>Role</span>
                        <strong>{partnerDetail.partner?.role || "-"}</strong>
                      </div>
                      <div>
                        <span>Commission Rate</span>
                        <strong>
                          {(partnerDetail.partner?.commissionPercentage || 0).toFixed(2)}%
                        </strong>
                      </div>
                      <div>
                        <span>Category</span>
                        <strong>{partnerDetail.partner?.partnerCategory || "hotel_partners"}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pd-detail-card">
                    <h3>Hotels Managed</h3>
                    {partnerDetail.hotels?.length ? (
                      <ul>
                        {partnerDetail.hotels.map((hotel) => (
                          <li key={hotel.id}>
                            <strong>{hotel.name}</strong>
                            <span>{hotel.location?.city || ""}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="muted">No hotels linked to this partner.</p>
                    )}
                  </div>

                  <div className="pd-actions">
                    <button className="danger" onClick={handleRemovePartner}>
                      <FiTrash2 /> Remove Partner
                    </button>
                  </div>
                </div>
              )}
              {partnerError && <p className="muted error">{partnerError}</p>}
            </div>
          ) : (
            <>
              <div className="pd-filter">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    className={partnerCategory === cat.value ? "active" : ""}
                    onClick={() => setPartnerCategory(cat.value)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {partnerLoading ? (
                <p className="muted">Loading partners...</p>
              ) : partnerError ? (
                <p className="muted error">{partnerError}</p>
              ) : filteredPartners.length === 0 ? (
                <p className="muted">No partners found.</p>
              ) : (
                <div className="pd-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Partner</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Commission</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPartners.map((partner) => (
                        <tr key={partner.id}>
                          <td>{partner.name || "-"}</td>
                          <td>{partner.email || "-"}</td>
                          <td>{partner.role || "-"}</td>
                          <td>{(partner.commissionPercentage || 0).toFixed(2)}%</td>
                          <td>
                            <button
                              className="inspect"
                              onClick={() => inspectPartner(partner.id)}
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {selectedHotel && (
        <div className="pd-modal">
          <div className="pd-modal-card">
            <button className="close" onClick={closeCommissionDetails}>
              <FiX />
            </button>
            {detailLoading ? (
              <p className="muted">Loading commission details...</p>
            ) : (
              <>
                <div className="pd-modal-head">
                  <h2>{selectedHotel.hotelName}</h2>
                  <p>
                    Partner: {selectedHotel.partnerName || "-"} ({
                      selectedHotel.partnerEmail || "-"
                    })
                  </p>
                </div>

                <div className="pd-commission-form">
                  <div>
                    <label>Separate Commission (%)</label>
                    <input
                      type="number"
                      value={separateRate}
                      onChange={(e) => setSeparateRate(e.target.value)}
                    />
                  </div>
                  <div className="note">
                    Basic commission: {(selectedHotel.basicCommissionRate || 0).toFixed(2)}%
                  </div>
                </div>

                {detailError && <p className="muted error">{detailError}</p>}

                <div className="pd-room-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Room Type</th>
                        <th>Base Price</th>
                        <th>Commission (?)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {computedRooms.map((room) => (
                        <tr key={room.roomTypeId || room.name}>
                          <td>{room.name || "-"}</td>
                          <td>{formatCurrency(room.basePrice)}</td>
                          <td>{formatCurrency(room.commissionAmount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="pd-total">
                    <span>Total Commission (est.)</span>
                    <strong>{formatCurrency(totalCommissionAmount)}</strong>
                  </div>
                </div>

                <div className="pd-modal-actions">
                  <button className="primary" onClick={applyCommissionUpdate}>
                    Apply Commission
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerDetails;
