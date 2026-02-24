// Vnavbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"
import {
  MdDashboard,
  MdHotel,
  MdBarChart,
  MdLocalOffer,
  MdDescription,
  MdSettings,
  MdPeople,
  MdMailOutline,
  MdLogout,
} from "react-icons/md";
import "./Vnavbar.scss";

const Vnavbar = ({ active, setActive }) => {
  const s = 25;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <aside className="v-navbar">
      <div>
        <div  className="vnav-logo"> <img src={logo} alt="" /></div>
        <p className="subtitle">Admin Operations</p>
      </div>

      <nav>
        <a className={active === "dashboard" ? "active" : ""} onClick={() => setActive("dashboard")}>
          <MdDashboard size={s} /> Admin Dashboard
        </a>

        <a className={active === "hotels" ? "active" : ""} onClick={() => setActive("hotels")}>
          <MdHotel size={s} /> Hotel Registrations
        </a>

        <a className={active === "revenue" ? "active" : ""} onClick={() => setActive("revenue")}>
          <MdBarChart size={s} /> Bookings & Revenue
        </a>

        <a className={active === "coupons" ? "active" : ""} onClick={() => setActive("coupons")}>
          <MdLocalOffer size={s} /> Coupons & Offers
        </a>

        <a className={active === "reports" ? "active" : ""} onClick={() => setActive("reports")}>
          <MdDescription size={s} /> Reports
        </a>

        <a className={active === "partnerDetails" ? "active" : ""} onClick={() => setActive("partnerDetails")}>
          <MdPeople size={s} /> Partner Details
        </a>

        <a className={active === "settings" ? "active" : ""} onClick={() => setActive("settings")}>
          <MdSettings size={s} /> Settings
        </a>

        <a className={active === "messages" ? "active" : ""} onClick={() => setActive("messages")}>
          <MdMailOutline size={s} /> Messages
        </a>

        <button type="button" className="vnav-logout" onClick={handleLogout}>
          <MdLogout size={s} /> Log Out
        </button>
      </nav>

      <div className="footer">© 2026 StayBook Admin</div>
    </aside>
  );
};

export default Vnavbar;
