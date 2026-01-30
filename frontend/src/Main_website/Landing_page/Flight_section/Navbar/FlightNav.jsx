// src/Components/Flights/FlightNav.jsx
import React from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import "./flightnav.scss";
import { useNavigate } from "react-router-dom";

export default function FlightNav() {
  const navigate = useNavigate();

  return (
    <div className="flight-nav-wrapper">
      <div className="trip-type">
        <label><input type="radio" defaultChecked /> One_Way</label>
        <label><input type="radio" /> Round_Trip</label>
        <label><input type="radio" /> Multi_City</label>
        <span className="trip-right-text">Book International and Domestic Flights</span>
      </div>

      <div className="flight-search-box">
        <div className="field from">
          <span className="label">From</span>
          <h3>New Delhi</h3>
          <p>DEL, Indira Gandhi International Airport</p>
        </div>

        <div className="swap">
          <FaExchangeAlt />
        </div>

        <div className="field to">
          <span className="label">To</span>
          <h3>Bengaluru</h3>
          <p>BLR, Bengaluru International Airport</p>
        </div>

        <div className="field date">
          <span className="label">Departure <MdKeyboardArrowDown /></span>
          <h3>28 Jan'26</h3>
          <p>Wednesday</p>
        </div>

        <div className="field date disabled">
          <span className="label">Return <MdKeyboardArrowDown /></span>
          <p>Tap to add a return date for bigger discounts</p>
        </div>

        <div className="field travellers">
          <span className="label">Travellers & Class <MdKeyboardArrowDown /></span>
          <h3>1 Traveller</h3>
          <p>Economy/Premium Economy</p>
        </div>
      </div>

      <div className="special-fares">
        <span className="title">SPECIAL FARES</span>
        <button className="active">Regular</button>
        <button>Travelling for work?</button>
        <button>Student</button>
        <button>Armed Forces</button>
        <button>Senior Citizen</button>
        <button>Doctor and Nurses</button>
        <button className="tracker">Flight Tracker</button>
      </div>
       <button className="vh-search-btn"  onClick={() => navigate("/flight1")} >SEARCH</button>

    </div>
  );
}
