import React, { useState } from "react";
import "./hotelregistration.css";
import ReviewPop from "./ReviewPop";
const rows = [
  {
    hotel: "Grand Plaza Hotel",
    location: "New York, NY",
    owner: "John Smith",
    email: "john@grandplaza.com",
    date: "Jan 15, 2026",
    docs: "Complete",
    status: "Pending",
  },
  {
    hotel: "Ocean View Resort",
    location: "Miami, FL",
    owner: "Sarah Johnson",
    email: "sarah@oceanview.com",
    date: "Jan 14, 2026",
    docs: "Incomplete",
    status: "Pending",
  },
  {
    hotel: "City Center Suites",
    location: "Chicago, IL",
    owner: "Michael Chen",
    email: "michael@citycentersuite.com",
    date: "Jan 13, 2026",
    docs: "Complete",
    status: "Approved",
  },
  {
    hotel: "Mountain Lodge",
    location: "Denver, CO",
    owner: "Emily Rodriguez",
    email: "emily@mountainlodge.com",
    date: "Jan 12, 2026",
    docs: "Complete",
    status: "Pending",
  },
  {
    hotel: "Lakeside Inn",
    location: "Seattle, WA",
    owner: "David Martinez",
    email: "david@lakesideinn.com",
    date: "Jan 11, 2026",
    docs: "Complete",
    status: "Rejected",
  },
  {
    hotel: "Downtown Boutique Hotel",
    location: "San Francisco, CA",
    owner: "Lisa Anderson",
    email: "lisa@downtownboutique.com",
    date: "Jan 16, 2026",
    docs: "Complete",
    status: "Pending",
  },
];

const HotelRegistration = () => {
     const [open, setOpen] = useState(false);
  return (
    <div className="hr-container">
      <h1>Hotel Registration Verification</h1>
      <p className="subtitle">
        Approve or reject new hotel partner registrations
      </p>

      <div className="stats-row">
        <div className="stat-card">
          <h2>23</h2>
          <span>Pending Review</span>
        </div>
        <div className="stat-card">
          <h2>1,247</h2>
          <span>Total Approved</span>
        </div>
        <div className="stat-card">
          <h2>8</h2>
          <span>Incomplete Docs</span>
        </div>
        <div className="stat-card">
          <h2>92%</h2>
          <span>Approval Rate</span>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Hotel Name</th>
              <th>Owner / Manager</th>
              <th>Registration Date</th>
              <th>Documents</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>
                  <strong>{r.hotel}</strong>
                  <div className="muted">{r.location}</div>
                </td>
                <td>
                  {r.owner}
                  <div className="muted">{r.email}</div>
                </td>
                <td>{r.date}</td>
                <td>
                  <span className={`pill ${r.docs.toLowerCase()}`}>
                    {r.docs}
                  </span>
                </td>
                <td>
                  <span className={`pill ${r.status.toLowerCase()}`}>
                    {r.status}
                  </span>
                </td>
                <td>
                  <button className="review-btn" onClick={() => setOpen(true)}>
                      Review
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       {open && <ReviewPop onClose={() => setOpen(false)} />}
    </div>
  );
};

export default HotelRegistration;
