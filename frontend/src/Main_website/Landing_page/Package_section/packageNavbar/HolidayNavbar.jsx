// HolidayNavbar.jsx
import React, { useState } from "react";
import "./HolidayNavbar.scss";
import { useNavigate } from "react-router-dom"; 
import {
  FaPlane,
  FaHotel,
  FaUmbrellaBeach,
  FaTrain,
  FaBus,
  FaTaxi,
} from "react-icons/fa";

const tabs = [
  "Search",
  "Honeymoon",
  "Visa Free Packages",
  "Group Tour Packages",
  "Last Minute Deals",
];

export default function HolidayNavbar() {
    const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Search");

  return (
    <div className="holiday-wrapper">
      {/* TOP ICON NAV */}


      {/* TAB NAV */}
      <div className="tab-nav">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab-item ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="tab-content">
        {activeTab === "Search" && (
          <div className="search-box">
            <div className="field">
              <span>From City</span>
              <strong>New Delhi</strong>
              <small>India</small>
            </div>
            <div className="field">
              <span>To City</span>
              <strong>Goa</strong>
            </div>
            <div className="field">
              <span>Departure</span>
              <strong>6 Feb, 2026</strong>
              <small>Friday</small>
            </div>
            <div className="field">
              <span>Guests</span>
              <strong>3 Adults</strong>
              <small>1 Room</small>
            </div>
            {/* <button className="search-btn">SEARCH</button> */}
          </div>
        )}

        {activeTab === "Honeymoon" && (
          <div className="dropdown">
            <div className="left">
              <h4>MakeMyTrip Honeymoon Packages</h4>
              <ul>
                <li>Maldives</li>
                <li>Bali</li>
                <li>Thailand</li>
                <li>Goa</li>
                <li>Kerala</li>
              </ul>
            </div>
            <div className="right">
              <div className="card">Trending</div>
              <div className="card">Bucket List</div>
              <div className="card">Trip Finder</div>
              <div className="card">View All</div>
            </div>
          </div>
        )}

        {activeTab === "Visa Free Packages" && (
          <div className="dropdown">
            <div className="left">
              <h4>Dream Destinations</h4>
              <ul>
                <li>Malaysia</li>
                <li>Hong Kong</li>
                <li>Bhutan</li>
                <li>Mauritius</li>
                <li>Seychelles</li>
              </ul>
            </div>
            <div className="right">
              <div className="card">Maldives</div>
              <div className="card">Thailand</div>
              <div className="card">Sri Lanka</div>
            </div>
          </div>
        )}

        {activeTab === "Group Tour Packages" && (
          <div className="dropdown">
            <div className="left">
              <h4>Expertly Planned Tours</h4>
              <ul>
                <li>Europe</li>
                <li>Japan</li>
                <li>Australia</li>
                <li>South Africa</li>
                <li>Singapore</li>
              </ul>
            </div>
            <div className="right">
              <div className="card">Domestic</div>
              <div className="card">Quick Fly</div>
              <div className="card">Bucket List</div>
              <div className="card">View All</div>
            </div>
          </div>
        )}

        {activeTab === "Last Minute Deals" && (
          <div className="dropdown">
            <div className="left">
              <h4>Best Trips, Last Minute</h4>
              <ul>
                <li>Goa</li>
                <li>Kerala</li>
                <li>Rajasthan</li>
                <li>Andaman</li>
                <li>North East</li>
              </ul>
            </div>
            <div className="right">
              <div className="card">Jet Set Easy</div>
              <div className="card">Mini Moon</div>
              <div className="card">Staycations</div>
              <div className="card">View All</div>
            </div>
          </div>
        )}
      </div>
       <button className="vh-search-btn" onClick={() => navigate("/tourpkge2")}>SEARCH</button>
    </div>
  );
}
