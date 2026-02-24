import PPCard from "../Common/PPCard";
import PPTable from "../Common/PPTable";
import PPBadge from "../Common/PPBadge";
import "./CompletedTrips.scss";

const CompletedTrips = ({ bookings }) => {
  const completed = bookings.filter((booking) => booking.status === "Completed");
  const cancelled = bookings.filter((booking) => booking.status === "Cancelled");
  const totalExpected = bookings.reduce((sum, booking) => sum + booking.amount, 0);
  const actualRevenue = completed.reduce((sum, booking) => sum + booking.amount, 0);
  const refundRatio = totalExpected
    ? Math.round((cancelled.length / bookings.length) * 100)
    : 0;

  return (
    <div className="pp-page pp-completed">
      <div className="pp-grid-3">
        <PPCard title="Completed Departures" subtitle="All time">
          <h2>{completed.length}</h2>
        </PPCard>
        <PPCard title="Cancelled Bookings" subtitle="Last 30 days">
          <h2>{cancelled.length}</h2>
        </PPCard>
        <PPCard title="Refund Ratio" subtitle="Cancelled vs total">
          <h2>{refundRatio}%</h2>
        </PPCard>
      </div>

      <PPCard title="Revenue vs Expected" subtitle="Performance snapshot">
        <div className="pp-inline">
          <strong>Expected:</strong> Rs. {totalExpected.toLocaleString()}
          <strong>Actual:</strong> Rs. {actualRevenue.toLocaleString()}
        </div>
      </PPCard>

      <PPCard title="Completed Trips" subtitle="Repeat travelers and outcomes">
        <PPTable
          columns={[
            { key: "id", label: "Booking ID" },
            { key: "packageName", label: "Package" },
            { key: "leadTraveler", label: "Traveler" },
            { key: "departureDate", label: "Departure" },
            { key: "amount", label: "Amount" },
            { key: "status", label: "Status" },
          ]}
          rows={completed}
          emptyMessage="No completed departures yet."
          renderRow={(booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.packageName}</td>
              <td>{booking.leadTraveler}</td>
              <td>{booking.departureDate}</td>
              <td>Rs. {booking.amount.toLocaleString()}</td>
              <td>
                <PPBadge tone="success">Completed</PPBadge>
              </td>
            </tr>
          )}
        />
      </PPCard>

      <PPCard title="Cancelled / No-show Tracking" subtitle="Risk indicators">
        <PPTable
          columns={[
            { key: "id", label: "Booking ID" },
            { key: "packageName", label: "Package" },
            { key: "leadTraveler", label: "Traveler" },
            { key: "departureDate", label: "Departure" },
            { key: "status", label: "Status" },
          ]}
          rows={cancelled}
          emptyMessage="No cancellations recorded."
          renderRow={(booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.packageName}</td>
              <td>{booking.leadTraveler}</td>
              <td>{booking.departureDate}</td>
              <td>
                <PPBadge tone="danger">Cancelled</PPBadge>
              </td>
            </tr>
          )}
        />
      </PPCard>
    </div>
  );
};

export default CompletedTrips;
