// PVnavbar.jsx  (DESIGN UPDATED ONLY)
import {
  FiHome,
  FiGrid,
  FiImage,
  FiCalendar,
  FiBook,
  FiCheckCircle,
  FiBell,
  FiSettings,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import "./PVnavbar.scss";

const PVnavbar = ({ active, setActive }) => {
  return (
    <aside className="pv-navbar">
      <div className="pv-logo">
        <div className="pv-logo-icon">
          <HiOutlineOfficeBuilding />
        </div>
        <div>
          <h3>StayBook</h3>
          <p>Partner Portal</p>
        </div>
      </div>

      <nav className="pv-nav">
        <div
          className={`pv-link ${active === "dashboard" ? "active" : ""}`}
          onClick={() => setActive("dashboard")}
        >
          <FiHome />
          <span>Dashboard</span>
        </div>

        <div
          className={`pv-link ${active === "property" ? "active" : ""}`}
          onClick={() => setActive("property")}
        >
          <FiGrid />
          <span>Property Management</span>
        </div>

        <div
          className={`pv-link ${active === "photos" ? "active" : ""}`}
          onClick={() => setActive("photos")}
        >
          <FiImage />
          <span>Photos & Media</span>
        </div>

        <div
          className={`pv-link ${active === "availability" ? "active" : ""}`}
          onClick={() => setActive("availability")}
        >
          <FiCalendar />
          <span>Availability & Pricing</span>
        </div>

        <div
          className={`pv-link ${active === "reservations" ? "active" : ""}`}
          onClick={() => setActive("reservations")}
        >
          <FiBook />
          <span>Reservations</span>
        </div>

        <div
          className={`pv-link ${active === "completed" ? "active" : ""}`}
          onClick={() => setActive("completed")}
        >
          <FiCheckCircle />
          <span>Completed & No-Shows</span>
        </div>

        <div
          className={`pv-link ${active === "notifications" ? "active" : ""}`}
          onClick={() => setActive("notifications")}
        >
          <FiBell />
          <span>Notifications</span>
        </div>

        <div className="pv-link">
          <FiSettings />
          <span>Settings</span>
        </div>
      </nav>

      <div className="pv-hotel">
        <div className="pv-avatar">GP</div>
        <div>
          <h4>Grand Plaza Hotel</h4>
          <p>Miami Beach, FL</p>
        </div>
      </div>
    </aside>
  );
};

export default PVnavbar;
