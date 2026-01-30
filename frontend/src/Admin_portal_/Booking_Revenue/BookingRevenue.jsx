// BookingsRevenue.jsx
import React from "react";
import "./bookingrevenue.scss";

const data = [
  {
    id: "BK10234",
    hotel: "Grand Plaza Hotel",
    date: "1/20/2026 - 1/23/2026",
    guest: "Robert Williams",
    amount: 450,
    commission: 67.5,
    payStatus: "Paid",
    bookStatus: "Confirmed",
  },
  {
    id: "BK10235",
    hotel: "Ocean View Resort",
    date: "1/18/2026 - 1/22/2026",
    guest: "Jennifer Brown",
    amount: 890,
    commission: 133.5,
    payStatus: "Paid",
    bookStatus: "Confirmed",
  },
  {
    id: "BK10236",
    hotel: "City Center Suites",
    date: "1/15/2026 - 1/17/2026",
    guest: "Michael Davis",
    amount: 320,
    commission: 48,
    payStatus: "Settled",
    bookStatus: "Completed",
  },
  {
    id: "BK10237",
    hotel: "Mountain Lodge",
    date: "1/25/2026 - 1/28/2026",
    guest: "Sarah Wilson",
    amount: 670,
    commission: 100.5,
    payStatus: "Pending",
    bookStatus: "Confirmed",
  },
  {
    id: "BK10238",
    hotel: "Beachside Inn",
    date: "1/12/2026 - 1/14/2026",
    guest: "David Martinez",
    amount: 540,
    commission: 81,
    payStatus: "Settled",
    bookStatus: "Completed",
  },
  {
    id: "BK10239",
    hotel: "Downtown Boutique Hotel",
    date: "1/22/2026 - 1/25/2026",
    guest: "Emily Taylor",
    amount: 780,
    commission: 117,
    payStatus: "Paid",
    bookStatus: "Confirmed",
  },
];

const BookingRevenue = () => {
  return (
    <div className="br-container">
      <h1>Bookings & Commission Revenue</h1>
      <p className="subtitle">Track platform transactions and earnings</p>

      <div className="stats-row">
        <div className="stat-card">
          <span>Total Bookings</span>
          <h2>6</h2>
          <small className="green">+24.1% vs last month</small>
        </div>
        <div className="stat-card">
          <span>Total Revenue</span>
          <h2>$3,650</h2>
          <small>Booking value</small>
        </div>
        <div className="stat-card">
          <span>Commission Earned</span>
          <h2>$547.50</h2>
          <small className="green">+18.9% vs last month</small>
        </div>
        <div className="stat-card">
          <span>Pending Payouts</span>
          <h2>$100.50</h2>
          <small>Awaiting settlement</small>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Hotel Name</th>
              <th>Guest Name</th>
              <th>Booking Amount</th>
              <th>Commission</th>
              <th>Payment Status</th>
              <th>Booking Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>
                  <strong>{d.hotel}</strong>
                  <div className="muted">{d.date}</div>
                </td>
                <td>{d.guest}</td>
                <td>${d.amount}</td>
                <td>${d.commission.toFixed(2)}</td>
                <td>
                  <span className={`pill ${d.payStatus.toLowerCase()}`}>
                    {d.payStatus}
                  </span>
                </td>
                <td>
                  <span className={`pill ${d.bookStatus.toLowerCase()}`}>
                    {d.bookStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingRevenue;
