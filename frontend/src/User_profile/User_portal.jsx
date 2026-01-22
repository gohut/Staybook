// User_portal.jsx (MODIFIED)
import React, { useState } from "react";
import UVnavbar from "./UVnavbar";
import Profileov from "./Profileov";
import Mytrips from "./Mytrips";
import Businesshis from "./Businesshis";
import Vouchers from "./Vouchers";
import Acsettings from "./Acsettings";
import "./userlayout.css";

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
        {active === "settings" && <Acsettings />}
      </main>
    </div>
  );
};

export default User_portal;
