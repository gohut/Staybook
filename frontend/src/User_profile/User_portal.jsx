// User_portal.jsx (MODIFIED)
import React, { useState } from "react";

import "./userlayout.scss";

import UVnavbar from "./UVnavbar";
import Profileov from "./Profile_overview/Profileov";
import Mytrips from "./My_trips/Mytrips";
import Businesshis from "./Booking_history/Businesshis";
import Vouchers from "./Vouchers/Vouchers";
import Acsettings from "./Account_settings/Acsettings";
import PartnerProgram from "./Partner_program/PartnerProgram";

const User_portal = () => {
  const [active, setActive] = useState("profile");

  return (
    <div className="user-layout">
      <UVnavbar active={active} setActive={setActive} />
      <main className="user-content">
        {active === "profile" && <Profileov />}
        {active === "trips" && <Mytrips />}
        {active === "history" && <Businesshis />}
        {active === "vouchers" && <Vouchers />}
        {active === "partner" && <PartnerProgram />}
        {active === "settings" && <Acsettings />}
      </main>
    </div>
  );
};

export default User_portal;
