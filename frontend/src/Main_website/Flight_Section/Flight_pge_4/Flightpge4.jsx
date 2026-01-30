import FlightPge4Header from "./FlightPge4Header";
import PaymentOptionsAndScan from "./PaymentOptionsAndScan";

import "./Flightpge4.scss";
import TopNavbar from "../../Top_Navbar/TopNavbar";

export default function Flightpge4() {
  return (
    <div className="fp4-page">
      <TopNavbar/>
      <FlightPge4Header />
      <PaymentOptionsAndScan/>

      {/* rest of payment options will be added next */}
      <div className="fp4-emptySpace" />
    </div>
  );
}