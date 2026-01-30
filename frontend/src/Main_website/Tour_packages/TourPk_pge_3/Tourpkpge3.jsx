// Tourpkpge3.jsx
import React from "react";
import TopNavbar from "../../Top_Navbar/TopNavbar";
import SearchBar from "./Search_Bar/SearchBar";
import PackageGallery from "./Packag_Gallery/PackageGallery";
import DayPlanSection from "./Itenary/DayPlanSection";
import PriceAndOffers from "./Price_offeres/PriceAndOffers";
import "./Tourpkpge3.scss";

export default function Tourpkpge3() {
  return (
    <div className="tour-page">
      <TopNavbar />
      <SearchBar />

      <div className="tour-content">

        <div className="tour-left">
          <PackageGallery />
          <DayPlanSection />
        </div>

        <div className="tour-right">
          <PriceAndOffers />
        </div>
      </div>
    </div>
  );
}
