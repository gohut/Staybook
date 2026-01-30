// Hmstaypge2.jsx
import React from "react";
import TopNavbar from "../../Top_Navbar/TopNavbar";
import SearchHeader from "./SearchBar/SearchHeader";
import FilterSidebar from "./FilterBar/FilterSidebar";
import ResultsHeader from "./ResultHeader/ResultsHeader";
import PropertyCard from "./PropertyCard/PropertyCard";
import "./hmstaypge2.scss";

export default function Hmstaypge2() {
  return (
    <div className="hmstay-page">
      <TopNavbar />
      <SearchHeader />

      <div className="hmstay-body">
        <FilterSidebar />

        <div className="hmstay-content">
          <ResultsHeader />
          <PropertyCard />
        </div>
      </div>
    </div>
  );
}
