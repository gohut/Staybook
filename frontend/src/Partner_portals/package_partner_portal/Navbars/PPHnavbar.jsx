import { FiSearch, FiBell, FiChevronDown } from "react-icons/fi";
import "./PPHnavbar.scss";

const PPHnavbar = ({ title, searchQuery, onSearchChange, role }) => {
  const roleLabel = role === "SUB_PARTNER" ? "Sub Partner" : "Full Partner";

  return (
    <header className="pph-navbar">
      <div className="pph-left">
        <h1>{title}</h1>
      </div>

      <div className="pph-right">
        <div className="pph-search">
          <FiSearch />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search packages or bookings..."
          />
        </div>

        <div className="pph-bell">
          <FiBell />
          <span className="pph-badge">5</span>
        </div>

        <div className="pph-profile">
          <div className="pph-avatar">SP</div>
          <div>
            <span className="pph-name">Staybook Partner</span>
            <span className="pph-email">planner@staybook.com</span>
            <span className="pph-role">{roleLabel}</span>
          </div>
          <FiChevronDown />
        </div>
      </div>
    </header>
  );
};

export default PPHnavbar;
