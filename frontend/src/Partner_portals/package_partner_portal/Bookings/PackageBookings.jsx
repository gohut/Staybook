import { useMemo, useState, useEffect } from "react";
import { FiFilter, FiEye, FiDownload, FiCheckCircle, FiXCircle } from "react-icons/fi";
import PPCard from "../Common/PPCard";
import PPTable from "../Common/PPTable";
import PPBadge from "../Common/PPBadge";
import PPModal from "../Common/PPModal";
import PPSkeleton from "../Common/PPSkeleton";
import "./PackageBookings.scss";

const PackageBookings = ({ bookings, searchQuery, onStatusChange }) => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [localQuery, setLocalQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [bookings]);

  const filtered = useMemo(() => {
    const query = `${searchQuery} ${localQuery}`.toLowerCase();
    return bookings.filter((booking) => {
      const matchesQuery =
        booking.packageName.toLowerCase().includes(query) ||
        booking.leadTraveler.toLowerCase().includes(query) ||
        booking.id.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "All" || booking.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [bookings, searchQuery, localQuery, statusFilter]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, localQuery, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const revenueSummary = filtered.reduce((sum, booking) => sum + booking.amount, 0);

  return (
    <div className="pp-page pp-bookings">
      <div className="pp-bookings-toolbar">
        <div>
          <h2 className="pp-section-title">Bookings Management</h2>
          <p className="pp-muted">Monitor traveler activity and payment status.</p>
        </div>
        <div className="pp-inline">
          <div className="pp-bookings-filter">
            <FiFilter />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              {[
                "All",
                "Pending",
                "Confirmed",
                "Cancelled",
                "Completed",
              ].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <input
            className="pp-bookings-search"
            placeholder="Search booking or traveler..."
            value={localQuery}
            onChange={(event) => setLocalQuery(event.target.value)}
          />
          <button type="button" className="pp-btn pp-btn-ghost">
            <FiDownload /> Export CSV
          </button>
        </div>
      </div>

      <PPCard title="Revenue Summary" subtitle="Filtered bookings">
        <div className="pp-inline">
          <strong>Rs. {revenueSummary.toLocaleString()}</strong>
          <span className="pp-muted">Total value of filtered bookings</span>
        </div>
      </PPCard>

      <PPCard title="All Bookings" subtitle="Live booking feed">
        {loading ? (
          <PPSkeleton rows={5} />
        ) : (
          <PPTable
            columns={[
              { key: "id", label: "Booking ID" },
              { key: "packageName", label: "Package" },
              { key: "departureDate", label: "Departure" },
              { key: "travelers", label: "Travelers" },
              { key: "leadTraveler", label: "Lead Traveler" },
              { key: "status", label: "Status" },
              { key: "paymentStatus", label: "Payment" },
              { key: "amount", label: "Amount" },
              { key: "actions", label: "Actions", align: "right" },
            ]}
            rows={paged}
            emptyMessage="No bookings available."
            renderRow={(booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.packageName}</td>
                <td>{booking.departureDate}</td>
                <td>{booking.travelers}</td>
                <td>{booking.leadTraveler}</td>
                <td>
                  <PPBadge
                    tone={
                      booking.status === "Confirmed"
                        ? "success"
                        : booking.status === "Pending"
                        ? "warning"
                        : booking.status === "Cancelled"
                        ? "danger"
                        : "default"
                    }
                  >
                    {booking.status}
                  </PPBadge>
                </td>
                <td>
                  <PPBadge tone={booking.paymentStatus === "Paid" ? "success" : "warning"}>
                    {booking.paymentStatus}
                  </PPBadge>
                </td>
                <td>Rs. {booking.amount.toLocaleString()}</td>
                <td>
                  <div className="pp-actions">
                    <button
                      type="button"
                      className="pp-btn pp-btn-ghost"
                      onClick={() => setSelected(booking)}
                    >
                      <FiEye /> View
                    </button>
                    <button
                      type="button"
                      className="pp-btn pp-btn-ghost"
                      onClick={() => onStatusChange(booking.id, "Confirmed")}
                    >
                      <FiCheckCircle /> Confirm
                    </button>
                    <button
                      type="button"
                      className="pp-btn pp-btn-ghost"
                      onClick={() => onStatusChange(booking.id, "Cancelled")}
                    >
                      <FiXCircle /> Cancel
                    </button>
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

      {selected && (
        <PPModal
          title={`Booking Details - ${selected.id}`}
          variant="drawer"
          onClose={() => setSelected(null)}
          actions={
            <button
              type="button"
              className="pp-btn pp-btn-primary"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          }
        >
          <div className="pp-stack">
            <div>
              <strong>Package:</strong> {selected.packageName}
            </div>
            <div>
              <strong>Travelers:</strong> {selected.travelers} - Lead {selected.leadTraveler}
            </div>
            <div>
              <strong>Add-ons:</strong> {selected.addOns.join(", ")}
            </div>
            <div>
              <strong>Coupon:</strong> {selected.coupon}
            </div>
            <div>
              <strong>Fare Breakdown:</strong>
              <ul className="pp-fare">
                <li>Base: Rs. {selected.fare.base.toLocaleString()}</li>
                <li>Discount: Rs. {selected.fare.discount.toLocaleString()}</li>
                <li>Taxes: Rs. {selected.fare.taxes.toLocaleString()}</li>
                <li>Total: Rs. {selected.fare.total.toLocaleString()}</li>
              </ul>
            </div>
            <div>
              <strong>Special Requests:</strong> {selected.specialRequests}
            </div>
          </div>
        </PPModal>
      )}
    </div>
  );
};

export default PackageBookings;
