// Flightpge1.jsx  ✅ UPDATED (TopNavbar fixed at TOP like the image)
import React from "react";
import FlightsSearchBar from "./FlightsSearchBar";
import FlightsFiltersAndHeader from "./FlightsFiltersAndHeader";
import FlightsFiltersSidebar from "./FlightsFiltersSidebar";
import FlightsResultsList from "./FlightsResultsList";
import FlightsTimeAirlinesFilters from "./FlightsTimeAirlinesFilters";
import TopNavbar from "../../Top_Navbar/TopNavbar";
import "./Flightpge1.css";

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
