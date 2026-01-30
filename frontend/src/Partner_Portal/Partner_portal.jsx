
import { useState } from "react";


import PHnavbar from "./Navbars/PHnavbar";
import PVnavbar from "./Navbars/PVnavbar";
import PartnerDashboard from "./Dashboard/PartnerDashboard";
import PropertyManagement from "./Property_Management/PropertyManagement";
import Photosmedia from "./Photos_Media/Photosmedia";
import Availabilitypr from "./Availability_Pricing/Availabilitypr";
import Reservation from "./Reservation/Reservation";
import CompletedNosw from "./Complete_No_shows/CompletedNosw";
import Notification from "./Notifications/Notification";
import "./Partner_portal.scss";

const Partner_portal = () => {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="layout">
      <PVnavbar active={active} setActive={setActive} />

      <div className="right-section">
        <PHnavbar />

        <div className="content-scroll">
          {active === "dashboard" && <PartnerDashboard />}
          {active === "property" && <PropertyManagement />}
          {active === "photos" && <Photosmedia />}
          {active === "availability" && <Availabilitypr />}
          {active === "reservations" && <Reservation />}
          {active === "completed" && <CompletedNosw />}
          {active === "notifications" && <Notification />}
        </div>
      </div>
    </div>
  );
};

export default Partner_portal;
