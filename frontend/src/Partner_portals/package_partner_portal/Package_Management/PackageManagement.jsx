import { useMemo, useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCopy,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import PPCard from "../Common/PPCard";
import PPTable from "../Common/PPTable";
import PPModal from "../Common/PPModal";
import PPBadge from "../Common/PPBadge";
import PPSkeleton from "../Common/PPSkeleton";
import "./PackageManagement.scss";

const emptyForm = {
  id: "",
  title: "",
  destination: "",
  duration: "",
  departureCity: "",
  hotelCategory: "",
  meals: "",
  activitiesCount: 0,
  freebies: "",
  basePrice: 0,
  totalPrice: 0,
  emi: "",
  tags: "",
  overview: "",
  cancellationPolicy: "",
  refundPolicy: "",
  inclusions: "",
  exclusions: "",
  status: "Draft",
  visibility: false,
  totalBookings: 0,
  revenue: 0,
};

const PackageManagement = ({
  packages,
  searchQuery,
  readOnly,
  onSave,
  onDelete,
  onDuplicate,
  onStatusChange,
}) => {
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [packages]);

  const filtered = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return packages.filter((pkg) => {
      const matchesQuery =
        pkg.title.toLowerCase().includes(query) ||
        pkg.destination.toLowerCase().includes(query);
      const matchesFilter = filter === "All" || pkg.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [packages, searchQuery, filter]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleEdit = (pkg) => {
    setForm({
      ...pkg,
      freebies: pkg.freebies?.join(", ") || "",
      tags: pkg.tags?.join(", ") || "",
    });
    setEditingId(pkg.id);
    setShowForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = {
      ...form,
      id: editingId || form.id || "",
      freebies: form.freebies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      tags: form.tags
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };
    onSave(next);
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleCreate = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const handleVisibility = (pkg) => {
    onStatusChange(pkg.id, pkg.status);
    onSave({ ...pkg, visibility: !pkg.visibility });
  };

  return (
    <div className="pp-page pp-package">
      {readOnly && (
        <div className="pp-banner">
          Sub Partner access is read-only. Editing and pricing controls are
          disabled.
        </div>
      )}

      <div className="pp-package-toolbar">
        <h2 className="pp-section-title">Package Management</h2>
        <div className="pp-inline">
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            {["All", "Draft", "Published", "Disabled", "Archived"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="pp-btn pp-btn-primary"
            onClick={handleCreate}
            disabled={readOnly}
          >
            <FiPlus /> Create Package
          </button>
        </div>
      </div>

      {showForm && (
        <PPCard
          title={editingId ? "Edit Package" : "Create New Package"}
          subtitle="Complete package details and publish or save as draft"
        >
          <form className="pp-package-form" onSubmit={handleSubmit}>
            <div className="pp-form-grid">
              <div className="pp-field">
                <label>Package Title</label>
                <input
                  value={form.title}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, title: event.target.value }))
                  }
                  disabled={readOnly}
                  required
                />
              </div>
              <div className="pp-field">
                <label>Destination</label>
                <input
                  value={form.destination}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      destination: event.target.value,
                    }))
                  }
                  disabled={readOnly}
                  required
                />
              </div>
              <div className="pp-field">
                <label>Duration (Nights/Days)</label>
                <input
                  value={form.duration}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, duration: event.target.value }))
                  }
                  disabled={readOnly}
                  required
                />
              </div>
              <div className="pp-field">
                <label>Departure City</label>
                <input
                  value={form.departureCity}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      departureCity: event.target.value,
                    }))
                  }
                  disabled={readOnly}
                />
              </div>
              <div className="pp-field">
                <label>Hotel Category</label>
                <input
                  value={form.hotelCategory}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      hotelCategory: event.target.value,
                    }))
                  }
                  disabled={readOnly}
                />
              </div>
              <div className="pp-field">
                <label>Meals Included</label>
                <input
                  value={form.meals}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, meals: event.target.value }))
                  }
                  disabled={readOnly}
                />
              </div>
              <div className="pp-field">
                <label>Activities Count</label>
                <input
                  type="number"
                  value={form.activitiesCount}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      activitiesCount: Number(event.target.value),
                    }))
                  }
                  disabled={readOnly}
                />
              </div>
              <div className="pp-field">
                <label>Freebies</label>
                <input
                  value={form.freebies}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, freebies: event.target.value }))
                  }
                  disabled={readOnly}
                />
              </div>
              <div className="pp-field">
                <label>Base Price Per Person (Rs.)</label>
                <input
                  type="number"
                  value={form.basePrice}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      basePrice: Number(event.target.value),
                    }))
                  }
                  disabled={readOnly}
                />
              </div>
              <div className="pp-field">
                <label>Total Price (Rs.)</label>
                <input
                  type="number"
                  value={form.totalPrice}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      totalPrice: Number(event.target.value),
                    }))
                  }
                  disabled={readOnly}
                />
              </div>
              <div className="pp-field">
                <label>EMI Option</label>
                <input
                  value={form.emi}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, emi: event.target.value }))
                  }
                  disabled={readOnly}
                />
              </div>
              <div className="pp-field">
                <label>Tags</label>
                <input
                  value={form.tags}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, tags: event.target.value }))
                  }
                  disabled={readOnly}
                />
              </div>
            </div>
            <div className="pp-form-grid">
              <div className="pp-field">
                <label>Overview Description</label>
                <textarea
                  rows="3"
                  value={form.overview}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, overview: event.target.value }))
                  }
                  disabled={readOnly}
                />
              </div>
              <div className="pp-field">
                <label>Cancellation Policy</label>
                <textarea
                  rows="3"
                  value={form.cancellationPolicy}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      cancellationPolicy: event.target.value,
                    }))
                  }
                  disabled={readOnly}
                />
              </div>
              <div className="pp-field">
                <label>Refund Policy</label>
                <textarea
                  rows="3"
                  value={form.refundPolicy}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      refundPolicy: event.target.value,
                    }))
                  }
                  disabled={readOnly}
                />
              </div>
              <div className="pp-field">
                <label>Inclusions</label>
                <textarea
                  rows="3"
                  value={form.inclusions}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      inclusions: event.target.value,
                    }))
                  }
                  disabled={readOnly}
                />
              </div>
              <div className="pp-field">
                <label>Exclusions</label>
                <textarea
                  rows="3"
                  value={form.exclusions}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      exclusions: event.target.value,
                    }))
                  }
                  disabled={readOnly}
                />
              </div>
            </div>
            <div className="pp-inline">
              <div className="pp-field">
                <label>Status</label>
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, status: event.target.value }))
                  }
                  disabled={readOnly}
                >
                  {["Draft", "Published", "Disabled", "Archived"].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pp-inline">
                <input
                  type="checkbox"
                  checked={form.visibility}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      visibility: event.target.checked,
                    }))
                  }
                  disabled={readOnly}
                />
                <span className="pp-muted">Visible to users</span>
              </div>
            </div>
            <div className="pp-inline">
              <button type="submit" className="pp-btn pp-btn-primary" disabled={readOnly}>
                {editingId ? "Update Package" : "Save Package"}
              </button>
              <button
                type="button"
                className="pp-btn pp-btn-ghost"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </PPCard>
      )}

      <PPCard title="Package Listing" subtitle="Manage visibility and actions">
        {loading ? (
          <PPSkeleton rows={5} />
        ) : (
          <PPTable
            columns={[
              { key: "title", label: "Package Name" },
              { key: "destination", label: "Destination" },
              { key: "duration", label: "Duration" },
              { key: "basePrice", label: "Price Per Person" },
              { key: "status", label: "Status" },
              { key: "totalBookings", label: "Bookings" },
              { key: "revenue", label: "Revenue" },
              { key: "actions", label: "Actions", align: "right" },
            ]}
            rows={paged}
            emptyMessage="No packages found for the current filters."
            renderRow={(pkg) => (
              <tr key={pkg.id}>
                <td>
                  <div className="pp-name">
                    <strong>{pkg.title}</strong>
                    <span>{pkg.hotelCategory}</span>
                  </div>
                </td>
                <td>{pkg.destination}</td>
                <td>{pkg.duration}</td>
                <td>Rs. {pkg.basePrice.toLocaleString()}</td>
                <td>
                  <PPBadge
                    tone={
                      pkg.status === "Published"
                        ? "success"
                        : pkg.status === "Draft"
                        ? "warning"
                        : pkg.status === "Disabled"
                        ? "danger"
                        : "default"
                    }
                  >
                    {pkg.status}
                  </PPBadge>
                </td>
                <td>{pkg.totalBookings}</td>
                <td>Rs. {pkg.revenue.toLocaleString()}</td>
                <td>
                  <div className="pp-actions">
                    <button
                      type="button"
                      className="pp-btn pp-btn-ghost"
                      onClick={() => handleVisibility(pkg)}
                      disabled={readOnly}
                    >
                      {pkg.visibility ? <FiEye /> : <FiEyeOff />}
                    </button>
                    <button
                      type="button"
                      className="pp-btn pp-btn-ghost"
                      onClick={() => handleEdit(pkg)}
                      disabled={readOnly}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      type="button"
                      className="pp-btn pp-btn-ghost"
                      onClick={() => onDuplicate(pkg)}
                      disabled={readOnly}
                    >
                      <FiCopy />
                    </button>
                    <button
                      type="button"
                      className="pp-btn pp-btn-ghost"
                      onClick={() => setConfirmDelete(pkg)}
                      disabled={readOnly}
                    >
                      <FiTrash2 />
                    </button>
                    <select
                      value={pkg.status}
                      onChange={(event) =>
                        onStatusChange(pkg.id, event.target.value)
                      }
                      disabled={readOnly}
                    >
                      {["Draft", "Published", "Disabled", "Archived"].map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
            )}
          />
        )}
        <div className="pp-pagination">
          <button
            type="button"
            className="pp-btn pp-btn-ghost"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="pp-muted">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            className="pp-btn pp-btn-ghost"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </PPCard>

      {confirmDelete && (
        <PPModal
          title="Remove Package"
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
          Are you sure you want to remove <strong>{confirmDelete.title}</strong>?
        </PPModal>
      )}
    </div>
  );
};

export default PackageManagement;
