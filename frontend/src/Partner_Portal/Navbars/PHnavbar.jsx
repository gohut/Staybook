// PHnavbar.jsx
import { FiSearch, FiBell, FiChevronDown } from "react-icons/fi";
import "./PHnavbar.scss";

const PHnavbar = () => {
  return (
    <header className="ph-navbar">
      <div className="ph-left">
        <h1>Dashboard</h1>
      </div>

      <div className="ph-right">
        <div className="search-box">
          <FiSearch />
          <input type="text" placeholder="Search reservations..." />
        </div>

        <div className="icon-bell">
          <FiBell />
          <span className="badge">2</span>
        </div>

        <div className="profile">
          <div className="avatar">PM</div>
          <div className="profile-info">
            <span className="name">Property Manager</span>
            <span className="email">manager@grandplaza.com</span>
          </div>
          <FiChevronDown />
        </div>
      </div>
    </header>
  );
};

export default PHnavbar;
