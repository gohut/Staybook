// TourPkpge2.jsx
import React from "react";
import TopNavbar from "../../Top_Navbar/TopNavbar";
import HeaderSearch from "./Header_search/HeaderSearch";
import FiltersSidebar2 from "./Filter_sidebar/FiltersSidebar2";
import PackageCard from "./Package_card/PackageCard";
import "./TourPkpge2.scss";

export default function TourPkpge2() {
  return (
    <div className="tour-page">
      <TopNavbar />

      <div className="header-search-wrapper">
        <HeaderSearch />
      </div>

      <div className="tour-content">
        {/* LEFT FILTERS */}
        <FiltersSidebar2 />

        {/* RIGHT CONTENT */}
        <div className="packages-area">
          <div className="packages-tabs">ALL PACKAGES (24)</div>

          <div className="packages-grid">
            <PackageCard />
            <PackageCard />
          </div>
        </div>
      </div>
    </div>
  );
}
