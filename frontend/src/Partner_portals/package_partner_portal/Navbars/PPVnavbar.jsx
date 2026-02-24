import {
  FiHome,
  FiGrid,
  FiMap,
  FiTag,
  FiImage,
  FiBook,
  FiCheckCircle,
  FiPercent,
  FiBell,
  FiSettings,
} from "react-icons/fi";
import { HiOutlineBriefcase } from "react-icons/hi";
import "./PPVnavbar.scss";

const PPVnavbar = ({ active, setActive, role }) => {
  const isSubPartner = role === "SUB_PARTNER";
  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: <FiHome /> },
    { key: "packages", label: "Package Management", icon: <FiGrid /> },
    { key: "itinerary", label: "Itinerary Builder", icon: <FiMap /> },
    { key: "pricing", label: "Pricing & Offers", icon: <FiTag />, restricted: true },
    { key: "media", label: "Media Gallery", icon: <FiImage />, restricted: true },
    { key: "bookings", label: "Bookings", icon: <FiBook /> },
    { key: "completed", label: "Completed / Cancelled Trips", icon: <FiCheckCircle /> },
    { key: "coupons", label: "Coupons & Promotions", icon: <FiPercent />, restricted: true },
    { key: "notifications", label: "Notifications", icon: <FiBell /> },
    { key: "settings", label: "Settings", icon: <FiSettings /> },
  ];

  const filteredItems = isSubPartner
    ? navItems.filter((item) => !item.restricted)
    : navItems;

  const roleLabel = isSubPartner ? "Sub Partner" : "Full Partner";

  return (
    <aside className="ppv-navbar">
      <div className="ppv-logo">
        <div className="ppv-logo-icon">
          <HiOutlineBriefcase />
        </div>
        <div>
          <h3>StayBook</h3>
          <p>Package Partner Portal</p>
        </div>
      </div>

      <nav className="ppv-nav">
        {filteredItems.map((item) => (
          <div
            key={item.key}
            className={`ppv-link ${active === item.key ? "active" : ""}`}
            onClick={() => setActive(item.key)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="ppv-profile">
        <div className="ppv-avatar">SP</div>
        <div>
          <h4>Skyline Planners</h4>
          <p>Bengaluru, IN</p>
          <span>{roleLabel}</span>
        </div>
      </div>
    </aside>
  );
};

export default PPVnavbar;
