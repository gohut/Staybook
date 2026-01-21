import React from "react";
import Vnavbar from "./Vnavbar";
import Hnavbar from "./Hnavbar";
import AdminDashboard from "./AdminDashboard";
import "./layout.css";

const Partner_portal = () => {
  return (
    <div className="layout">
      <Vnavbar />

      <div className="right-section">
        <Hnavbar title="Admin Dashboard" />

        <main className="scroll-area">
          <AdminDashboard />
        </main>
      </div>
    </div>
  );
};

export default Partner_portal;
