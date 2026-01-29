import React from "react";
import {
  FaPlane,
  FaHotel,
  FaHome,
  FaUmbrellaBeach,
  FaTrain,
  FaBus,
  FaTaxi,
} from "react-icons/fa";
import "./navbar.css";
import bgimg from "../../../assets/bgimg.png";
import logo from "../../../assets/logo.png";
import { MdKeyboardArrowDown } from "react-icons/md";
import HotelNav from "../Hotel_section/Navbar_Cont/HotelNav";
import FlightNav from "../Flight_section/Navbar/FlightNav";
import VillasHomestaysSearch from "../HmeStay_section/Navbar/VillasHomestaysSearch";
import HolidayNavbar from "../Package_section/packageNavbar/HolidayNavbar"
const Navbar = ({ onLoginClick, activeTab, setActiveTab }) => {



  const navItems = [
    { name: "Flights", icon: <FaPlane /> },
    { name: "Hotels", icon: <FaHotel /> },
    { name: "Villas & Homestays", icon: <FaHome /> },
    { name: "Holiday Packages", icon: <FaUmbrellaBeach /> },

  ];

  return (
    <nav className="navbar">
            <div className="nav-items-container">
        <div className="nav-items">
          {navItems.map((item) => (
            <div
              key={item.name}
              className={`nav-item ${activeTab === item.name ? "active" : ""}`}
              onClick={() => setActiveTab(item.name)}
            >
              <div className="nav-icon">{item.icon}</div>
              <span className="nav-text">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <img src={bgimg} alt="StayABook Logo" />
        </div>

        {/* Login Button */}
      </div>
      <div className="lo-goin-cont">
        <div className="logo-img">
          <img src={logo} alt="" />
        </div>
        <button className="login-button" onClick={onLoginClick}>Login</button>
      </div>
      {activeTab === "Hotels" && <HotelNav />}
      {activeTab === "Flights" && <FlightNav />}
      {activeTab === "Villas & Homestays" && <VillasHomestaysSearch />}
      {activeTab === "Holiday Packages" && <HolidayNavbar />}
      {/* Navigation Items */}

    </nav>
  );
};

export default Navbar;
