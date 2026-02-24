import { useMemo, useState } from "react";
import { FiCalendar, FiX } from "react-icons/fi";

const BookingsManagement = ({ bookings, searchQuery, tab }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredBookings = useMemo(() => {
    let list = bookings || [];
    if (statusFilter !== "All") {
      list = list.filter((booking) => booking.bookingStatus === statusFilter);
    }
    if (searchQuery?.trim()) {
      const needle = searchQuery.toLowerCase();
      list = list.filter((booking) =>
        [booking.id, booking.route, booking.flightId, booking.contact]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(needle))
      );
    }
    return list;
  }, [bookings, statusFilter, searchQuery]);

  if (tab === "passengers") {
    return (
      <div className="fp-card">
        <div className="fp-card-head">
          <div>
            <h3>Passenger List</h3>
            <p className="fp-muted">All passengers flying in the next 7 days.</p>
          </div>
          <div className="fp-filter">
            <label>Date Range</label>
            <button className="fp-secondary"><FiCalendar /> Next 7 Days</button>
          </div>
        </div>
        <div className="fp-table">
          <table>
            <thead>
              <tr>
                <th>Passenger</th>
                <th>Type</th>
                <th>Flight</th>
                <th>Route</th>
                <th>Seat</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.flatMap((booking) =>
                booking.passengerList.map((passenger, index) => (
                  <tr key={`${booking.id}-${index}`}>
                    <td>{passenger.name}</td>
                    <td>{passenger.type}</td>
                    <td>{booking.flightId}</td>
                    <td>{booking.route}</td>
                    <td>{booking.seats[index] || booking.seats[0]}</td>
                    <td>{booking.contact}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (tab === "checkin") {
    return (
      <div className="fp-card">
        <div className="fp-card-head">
          <div>
            <h3>Check-in Status</h3>
            <p className="fp-muted">Track passenger check-in progress.</p>
          </div>
        </div>
        <div className="fp-table">
          <table>
            <thead>
              <tr>
                <th>Booking Ref</th>
                <th>Route</th>
                <th>Passengers</th>
                <th>Checked-in</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.route}</td>
                  <td>{booking.passengers}</td>
                  <td>{booking.bookingStatus === "Checked-in" ? booking.passengers : 0}</td>
                  <td>
                    <span className={`fp-status ${booking.bookingStatus.toLowerCase().replace(" ", "-")}`}>
                      {booking.bookingStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="fp-card">
      <div className="fp-card-head">
        <div>
          <h3>Bookings Management</h3>
          <p className="fp-muted">Track bookings, payments, and passenger assignments.</p>
        </div>
        <div className="fp-filter">
          <label>Status</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>Confirmed</option>
            <option>On Hold</option>
            <option>Checked-in</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      <div className="fp-table">
        <table>
          <thead>
            <tr>
              <th>Booking Ref</th>
              <th>Flight ID</th>
              <th>Travel Date</th>
              <th>Passenger Count</th>
              <th>Seat Numbers</th>
              <th>Total Amount</th>
              <th>Payment Status</th>
              <th>Booking Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id} onClick={() => setSelectedBooking(booking)}>
                <td>{booking.id}</td>
                <td>{booking.flightId}</td>
                <td>{booking.travelDate}</td>
                <td>{booking.passengers}</td>
                <td>{booking.seats.join(", ")}</td>
                <td>₹{booking.amount}</td>
                <td>{booking.paymentStatus}</td>
                <td>
                  <span className={`fp-status ${booking.bookingStatus.toLowerCase().replace(" ", "-")}`}>
                    {booking.bookingStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedBooking && (
        <div className="fp-drawer">
          <div className="fp-drawer-panel">
            <button className="fp-drawer-close" onClick={() => setSelectedBooking(null)}>
              <FiX />
            </button>
            <h3>Booking Details</h3>
            <div className="fp-drawer-section">
              <h4>Passenger List</h4>
              {selectedBooking.passengerList.map((passenger, index) => (
                <div key={index} className="fp-row">
                  <span>{passenger.name}</span>
                  <span>{passenger.type}</span>
                  <span>Seat {selectedBooking.seats[index]}</span>
                </div>
              ))}
            </div>
            <div className="fp-drawer-section">
              <h4>Seats & Add-Ons</h4>
              <p>Seats: {selectedBooking.seats.join(", ")}</p>
              <p>Add-Ons: {selectedBooking.addOns.join(", ")}</p>
            </div>
            <div className="fp-drawer-section">
              <h4>Fare Breakdown</h4>
              <div className="fp-row"><span>Base Fare</span><strong>₹{selectedBooking.amount - 499}</strong></div>
              <div className="fp-row"><span>Taxes</span><strong>₹399</strong></div>
              <div className="fp-row"><span>Add-ons</span><strong>₹100</strong></div>
              <div className="fp-row total"><span>Total</span><strong>₹{selectedBooking.amount}</strong></div>
            </div>
            <div className="fp-drawer-section">
              <h4>Payment Info</h4>
              <p>Method: UPI</p>
              <p>Status: {selectedBooking.paymentStatus}</p>
              <p>Paid At: 10:42 AM</p>
            </div>
            <div className="fp-drawer-actions">
              <button className="fp-secondary">Cancel Booking</button>
              <button className="fp-primary">Issue Refund</button>
              <button className="fp-outline">Resend Ticket</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsManagement;
