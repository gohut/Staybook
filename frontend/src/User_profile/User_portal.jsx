// User_portal.jsx (MODIFIED)
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./userlayout.scss";

import UVnavbar from "./UVnavbar";
import Profileov from "./Profile_overview/Profileov";
import Mytrips from "./My_trips/Mytrips";
import Businesshis from "./Booking_history/Businesshis";
import Vouchers from "./Vouchers/Vouchers";
import Acsettings from "./Account_settings/Acsettings";
import PartnerProgram from "./Partner_program/PartnerProgram";
import Notifications from "./Notifications/Notifications";

const User_portal = () => {
  const [active, setActive] = useState("profile");
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) return;
    const storedEmail = localStorage.getItem("userEmail");
    if (!storedEmail) {
      localStorage.setItem("userEmail", userId);
    }
  }, [userId]);

  return (
    <div className="user-layout">
      <UVnavbar active={active} setActive={setActive} />
      <main className="user-content">
        {active === "profile" && (
          <Profileov onFinishProfile={() => setActive("settings")} />
        )}
        {active === "trips" && <Mytrips />}
        {active === "history" && <Businesshis />}
        {active === "vouchers" && <Vouchers />}
        {active === "partner" && <PartnerProgram />}
        {active === "settings" && <Acsettings />}
        {active === "notifications" && <Notifications />}
      </main>
    </div>
  );
};

export default User_portal;
