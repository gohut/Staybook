// Flightpge1.jsx  ✅ UPDATED (TopNavbar fixed at TOP like the image)
import React from "react";

import TopNavbar from "../../Top_Navbar/TopNavbar";
import  FlightsSearchBar from "./Search_bar/FlightsSearchBar";
import  FlightsFiltersAndHeader from "./FilterAndHeader/FlightsFiltersAndHeader";
import  FlightsFiltersSidebar from "./FilterSidebar/FlightsFiltersSidebar";
import  FlightsTimeAirlinesFilters from "./TimesAirlineFilter/FlightsTimeAirlinesFilters";
import  FlightsResultsList from "./ResultList/FlightsResultsList";

import "./Flightpge1.scss";

export default function Flightpge1() {
  return (
    <>
      {/* ✅ TopNavbar fixed at top */}
      <div className="fp1-topnav-fixed">
        <TopNavbar />
      </div>

      {/* ✅ push everything below navbar */}
      <div className="fp1-content">
        <FlightsSearchBar />
        <FlightsFiltersAndHeader />

        <section className="fp1-grid">
          <div className="fp1-left">
            <FlightsFiltersSidebar />
            <FlightsTimeAirlinesFilters />
          </div>

          <div className="fp1-right">
            <FlightsResultsList />
          </div>
        </section>
      </div>
    </>
  );
}
