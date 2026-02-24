
import { useEffect, useMemo, useState } from "react";


import PHnavbar from "./Navbars/PHnavbar";
import PVnavbar from "./Navbars/PVnavbar";
import PartnerDashboard from "./Dashboard/PartnerDashboard";
import PropertyManagement from "./Property_Management/PropertyManagement";
import Photosmedia from "./Photos_Media/Photosmedia";
import Reviews from "./Reviews/Reviews";
import Availabilitypr from "./Availability_Pricing/Availabilitypr";
import Reservation from "./Reservation/Reservation";
import CompletedNosw from "./Complete_No_shows/CompletedNosw";
import Notification from "./Notifications/Notification";
import PartnerSettings from "./Settings/PartnerSettings";
import "./Hotel_partner_portal.scss";

const Hotel_partner_portal = () => {
  const role = localStorage.getItem("userRole");
  const isSubPartner = role === "SUB_PARTNER";
  const allowedSections = useMemo(
    () => (isSubPartner ? ["property", "reservations", "settings"] : []),
    [isSubPartner]
  );
  const [active, setActive] = useState(isSubPartner ? "reservations" : "dashboard");

  useEffect(() => {
    if (isSubPartner && !allowedSections.includes(active)) {
      setActive(allowedSections[0]);
    }
  }, [active, allowedSections, isSubPartner]);

  return (
    <div className="layout">
      <PVnavbar active={active} setActive={setActive} role={role} />

      <div className="right-section">
        <PHnavbar />

        <div className="content-scroll">
          {!isSubPartner && active === "dashboard" && <PartnerDashboard />}
          {active === "property" && <PropertyManagement readOnly={isSubPartner} />}
          {!isSubPartner && active === "photos" && <Photosmedia />}
          {!isSubPartner && active === "reviews" && <Reviews />}
          {!isSubPartner && active === "availability" && <Availabilitypr />}
          {active === "reservations" && <Reservation readOnly={isSubPartner} />}
          {!isSubPartner && active === "completed" && <CompletedNosw />}
          {!isSubPartner && active === "notifications" && <Notification />}
          {active === "settings" && <PartnerSettings />}
        </div>
      </div>
    </div>
  );
};

export default Hotel_partner_portal;
