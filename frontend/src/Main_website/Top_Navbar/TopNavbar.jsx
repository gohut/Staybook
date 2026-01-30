import { FaPlane, FaHotel, FaHome, FaUmbrellaBeach, FaTrain, FaBus, FaTaxi } from "react-icons/fa";
import "./TopNavbar.scss";

const TopNavbar = () => {
  return (
    <div className="top-navbar">
      <div className="logo">STAY<span>BOOK</span></div>

      <div className="nav-links">
        <div><FaPlane /> Flights</div>
        <div><FaHotel /> Hotels</div>
        <div><FaHome /> Homestays</div>
        <div className="active"><FaUmbrellaBeach /> Holiday Packages</div>
        <div><FaTrain /> Trains</div>
        <div><FaBus /> Buses</div>
        <div><FaTaxi /> Cabs</div>
      </div>
    </div>
  );
};

export default TopNavbar;
