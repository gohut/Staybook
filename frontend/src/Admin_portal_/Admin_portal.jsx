// Admin_portal.jsx
import React, { useState } from "react";
// import Vnavbar from "./Vnavbar";
// import Hnavbar from "./Hnavbar";
import Vnavbar from "./Navbars/Vnavbar";
import Hnavbar from "./Navbars/Hnavbar";
import AdminDashboard from "./AdminDashboard";
import BookingRevenue from "./Bookingrevenue";
import HotelRegistration from "./HotelRegistration";
import CouponOff from "./CouponOff";
import CouponCr from "./CouponCr";
import Reports from "./Reports";
import Settings from "./Settings";
import "./layout.css";

const Admin_portal = () => {
  const [active, setActive] = useState("dashboard");
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className={`layout ${showCreate ? "blurred" : ""}`}>
      <Vnavbar active={active} setActive={setActive} />

      <div className="right-section_A">
        <Hnavbar />
        <main className="scroll-area">
          {active === "dashboard" && <AdminDashboard />}
          {active === "revenue" && <BookingRevenue />}
          {active === "hotels" && <HotelRegistration />}
          {active === "coupons" && (
            <CouponOff onCreate={() => setShowCreate(true)} />
          )}
          {active === "reports" && <Reports />}
          {active === "settings" && <Settings />}
        </main>
      </div>

      {showCreate && <CouponCr onClose={() => setShowCreate(false)} />}
    </div>
  );
};

export default Admin_portal;
