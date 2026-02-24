import { FiBell, FiMenu, FiSearch } from "react-icons/fi";
import "./FPHnavbar.scss";

const FPHnavbar = ({ title, searchQuery, onSearchChange, onToggleSidebar }) => {
  return (
    <header className="fp-header">
      <div className="fp-header-left">
        <button className="fp-menu" onClick={onToggleSidebar}>
          <FiMenu />
        </button>
        <div>
          <h1>{title}</h1>
          <p>Airline operations and revenue control center</p>
        </div>
      </div>

      <div className="fp-header-right">
        <div className="fp-search">
          <FiSearch />
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search flights, bookings, passengers..."
          />
        </div>
        <div className="fp-bell">
          <FiBell />
          <span className="fp-badge">5</span>
        </div>
        <div className="fp-user">
          <div className="fp-user-avatar">OM</div>
          <div>
            <span className="fp-user-name">Ops Manager</span>
            <span className="fp-user-role">StayBook Airlines</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default FPHnavbar;
