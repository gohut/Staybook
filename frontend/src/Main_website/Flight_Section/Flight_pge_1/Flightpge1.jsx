import React from "react";
import FlightsHeaderTabs from "./FlightsSearchBar";
import FlightsSearchBar from "./FlightsSearchBar";
import FlightsFiltersAndHeader from "./FlightsFiltersAndHeader";
import FlightsFiltersSidebar from "./FlightsFiltersSidebar";
import FlightsResultsList from "./FlightsResultsList";
import FlightsAdBanner from "./FlightsAdBanner";
import FlightsTimeAirlinesFilters from "./FlightsTimeAirlinesFilters";          


import "./Flightpge1.css";

export default function Flightpge1() {
  return (
    <>
    
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
    </>
  );
}