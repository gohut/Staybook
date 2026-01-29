// ExperienceAirlines.jsx
import React from "react";
import "./ExperienceAirlines.css";
import img2 from  "../../../../assets/Flight/image1.png"
export default function ExperienceAirlines() {
  return (
    <div className="airline-section">
      <h2>Experience Flying with our Airline Partners</h2>

      <div className="airline-cards">
        <div className="airline-card">
          <span>AirAsia</span>
          <img src={img2} alt="AirAsia" />
        </div>

        <div className="airline-card">
          <span>Etihad Airways</span>
          <img src={img2} alt="Etihad" />
        </div>

        <div className="airline-card">
          <span>Malaysia Airlines</span>
          <img src={img2} alt="Malaysia" />
        </div>
      </div>
    </div>
  );
}
