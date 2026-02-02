// PHnavbar.jsx
import { FiSearch, FiBell, FiChevronDown } from "react-icons/fi";
import "./PHnavbar.scss";
import { useNavigate } from "react-router-dom";

const PHnavbar = () => {
    const navigate = useNavigate();
      const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <header className="ptr-ph-navbar">
      <div className="ptr-ph-left">
        <h1>Dashboard</h1>
      </div>

      <div className="ptr-ph-right">
        <div className="ptr-search-box">
          <FiSearch />
          <input type="text" placeholder="Search reservations..." />
        </div>

        <div className="ptr-icon-bell">
          <FiBell />
          <span className="ptr-badge">2</span>
        </div>
        <button onClick={handleLogout}>Log Out</button>  
        <div className="ptr-profile">
          <div className="ptr-avatar">PM</div>
          <div className="ptr-profile-info">
            <span className="ptr-name">Property Manager</span>
            <span className="ptr-email">manager@grandplaza.com</span>
          </div>
          <FiChevronDown />
        </div>
      </div>
    </header>
  );
};

export default PHnavbar;
