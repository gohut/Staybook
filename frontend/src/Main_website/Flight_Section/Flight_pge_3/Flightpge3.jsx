import React from "react";
import TopNavbar from "../../Top_Navbar/TopNavbar";
import SeatSelection from "./SeatSelection";
import BookingTopSummaryBar from "./BookingTopSummaryBar";

export default function Flightpge3() {
  return (
    <div style={{ minHeight: "100vh", background: "#dff0f8", position: "relative" }}>
  
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 9999,
          background: "#fff",
        }}
      >
        <TopNavbar />
      </div>

      <div style={{ paddingTop: "78px" }}>
        <BookingTopSummaryBar />
        <div style={{ marginBottom: "80px" }}></div>
        <SeatSelection />
      </div>
    </div>
  );
}
