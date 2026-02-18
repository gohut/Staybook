import { FaPlane, FaHotel, FaHome, FaUmbrellaBeach } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "./TopNavbar.scss";

const TopNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/flight1", icon: <FaPlane />, label: "Flights" },
    { path: "/hotel2", icon: <FaHotel />, label: "Hotels" },
    { path: "/hstaypge2", icon: <FaHome />, label: "Homestays" },
    { path: "/tourpkge2", icon: <FaUmbrellaBeach />, label: "Holiday Packages" }
  ];

  const getActiveClass = (path) => {
    const currentPath = location.pathname;
    
    // Check if current path starts with the nav item path
    if (path === "/flight1" && currentPath.startsWith("/flight")) {
      return "active";
    }
    if (path === "/hotel2" && currentPath.startsWith("/hotel")) {
      return "active";
    }
    if (path === "/hstaypge2" && currentPath.startsWith("/hstay")) {
      return "active";
    }
    if (path === "/tourpkge2" && currentPath.startsWith("/tour")) {
      return "active";
    }
    
    return currentPath === path ? "active" : "";
  };

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <div className="top-navbar">
      <div className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        STAY<span>BOOK</span>
      </div>

      <div className="nav-links">
        {navItems.map((item) => (
          <div
            key={item.path}
            className={getActiveClass(item.path)}
            onClick={() => handleNavClick(item.path)}
            style={{ cursor: "pointer" }}
          >
            {item.icon} {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopNavbar;
