// Tourpkpge4.jsx
import React from "react";
import TopNavbar from "../../Top_Navbar/TopNavbar";
import TravellerDetails from "../../Flight_Section/Flight_pge_2/TravellerDetails";
import PackageAddOns from "./Package_addons/PackageAddOns";
import FareSummary from "./Fair_summary/FareSummary";
import "./Tourpkpge4.css";

export default function Tourpkpge4() {
  return (
    <>
      <TopNavbar />
      <div className="tour-layout">
        <div className="tour-left">
          <TravellerDetails />
          <PackageAddOns />
        </div>

        <div className="tour-right">
          <FareSummary />
        </div>
      </div>
    </>
  );
}
