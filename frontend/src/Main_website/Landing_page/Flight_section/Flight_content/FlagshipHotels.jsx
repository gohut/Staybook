// FlagshipHotels.jsx
import React from "react";
import { FaClipboardList, FaUtensils, FaPlane } from "react-icons/fa";
import "./FlagshipHotels.css";
import img1 from  "../../../../assets/Flight/place1.jpg"
export default function FlagshipHotels() {
  return (
    <div className="flagship-section">
      <div className="flagship-top">
        <h2>Flagship Hotel<br />Stores on<br />MakeMyTrip</h2>

        <div className="hotel-cards">
          <div className="hotel-card">
            <img src={img1} alt="" />
            <span>Wyndham Hotels & Resorts</span>
          </div>
          <div className="hotel-card">
            <img src={img1} alt="" />
            <span>Sterling Hotels & Resorts</span>
          </div>
          <div className="hotel-card">
            <img src={img1} alt="" />
            <span>Hyatt Hotels</span>
          </div>
          <div className="hotel-card">
            <img src={img1} alt="" />
            <span>Royal Orchid Hotels</span>
          </div>
        </div>
      </div>

      <div className="info-cards">
        <div className="info-card">
          <FaClipboardList />
          <p>
            Check out our Indian Travel Trends Report 2023-24 is out now. Read on
            for top travel insights.
          </p>
        </div>

        <div className="info-card">
          <FaUtensils />
          <p>
            Finding Indian Food just got easier! Use newly launched filters to
            find Indian food during International travel
          </p>
        </div>

        <div className="info-card">
          <FaPlane />
          <p>
            Planning to book an international flight?
            <span> Check Travel Guidelines</span>
          </p>
        </div>
      </div>
    </div>
  );
}
