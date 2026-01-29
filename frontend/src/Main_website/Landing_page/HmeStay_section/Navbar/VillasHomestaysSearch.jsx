// VillasHomestaysSearch.jsx
import React from "react";
import {
  FaPlane,
  FaHotel,
  FaHome,
  FaUmbrellaBeach,
  FaTrain,
  FaBus,
  FaTaxi,
  FaMapMarkedAlt,
  FaPassport,
  FaShip,
  FaMoneyBillWave,
  FaShieldAlt,
  FaChevronDown,
} from "react-icons/fa";
import "./VillasHomestaysSearch.css";

export default function VillasHomestaysSearch() {
  return (
    <div className="vh-wrapper">


      <p className="vh-subtitle">
        Book your ideal Homestay - Villas, Apartments & more.
      </p>

      <div className="vh-searchbox">
        <div className="vh-field large">
          <label>City, Property Name Or Location</label>
          <h3>Goa, India</h3>
          <span>India</span>
        </div>

        <div className="vh-field">
          <label>
            Check-In <FaChevronDown />
          </label>
          <p>Select Date</p>
        </div>

        <div className="vh-field">
          <label>
            Check-Out <FaChevronDown />
          </label>
          <p>Select Date</p>
        </div>

        <div className="vh-field">
          <label>
            Guests <FaChevronDown />
          </label>
          <p>Add Adults & Children</p>
        </div>

        <div className="vh-field">
          <label>
            Price Per Night <FaChevronDown />
          </label>
          <p>₹0-₹1500, ₹1500-₹2500...</p>
        </div>
      </div>

      {/* <button className="vh-search-btn">SEARCH</button>
 */}

    </div>
  );
}
