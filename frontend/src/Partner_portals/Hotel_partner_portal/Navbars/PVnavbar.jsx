// PVnavbar.jsx  (DESIGN UPDATED ONLY)
import {
  FiHome,
  FiGrid,
  FiImage,
  FiStar,
  FiCalendar,
  FiBook,
  FiCheckCircle,
  FiBell,
  FiSettings,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import "./PVnavbar.scss";

const PVnavbar = ({ active, setActive, role }) => {
  const isSubPartner = role === "SUB_PARTNER";
  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: <FiHome /> },
    { key: "property", label: "Property Management", icon: <FiGrid /> },
    { key: "photos", label: "Photos & Media", icon: <FiImage /> },
    { key: "reviews", label: "Reviews", icon: <FiStar /> },
    { key: "availability", label: "Availability & Pricing", icon: <FiCalendar /> },
    { key: "reservations", label: "Reservations", icon: <FiBook /> },
    { key: "completed", label: "Completed & No-Shows", icon: <FiCheckCircle /> },
    { key: "notifications", label: "Notifications", icon: <FiBell /> },
    { key: "settings", label: "Settings", icon: <FiSettings /> },
  ];

  const filteredItems = isSubPartner
    ? navItems.filter((item) =>
        ["property", "reservations", "settings"].includes(item.key)
      )
    : navItems;

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
        {filteredItems.map((item) => (
          <div
            key={item.key}
            className={`pv-link ${active === item.key ? "active" : ""}`}
            onClick={() => setActive(item.key)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
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
