import "./BookingTopNavbar.css";
import logo from "../../../assets/logo.png";
import {
  FaPlane,
  FaHotel,
  FaHome,
  FaUmbrellaBeach,
  FaTrain,
  FaBus,
  FaTaxi,
} from "react-icons/fa";

export default function BookingTopNavbar() {
  return (
    <header className="btnb-wrap">
      <div className="btnb-inner">
        <div className="btnb-left">
          <img src={logo} alt="StayBook" className="btnb-logo" />
        </div>

        <nav className="btnb-tabs">
          <button className="btnb-tab">
            <FaPlane />
            <span>Flights</span>
          </button>

          <button className="btnb-tab">
            <FaHotel />
            <span>Hotels</span>
          </button>

          <button className="btnb-tab">
            <FaHome />
            <span>Homesta...</span>
          </button>

          <button className="btnb-tab active">
            <FaUmbrellaBeach />
            <span>Holiday ...</span>
          </button>

          <button className="btnb-tab">
            <FaTrain />
            <span>Trains</span>
          </button>

          <button className="btnb-tab">
            <FaBus />
            <span>Buses</span>
          </button>

          <button className="btnb-tab">
            <FaTaxi />
            <span>Cabs</span>
          </button>
        </nav>
      </div>
    </header>
  );
}