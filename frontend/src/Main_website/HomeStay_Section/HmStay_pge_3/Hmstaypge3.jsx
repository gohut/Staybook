import React, { useState } from "react";
import TopNavbar from "../../Top_Navbar/TopNavbar";
import FilterSidebar from "../HmStay_pge_2/FilterBar/FilterSidebar";
import HmPaymentOptionsAndScan from "./HmPaymentOptionsAndScan";
import "./Hmstaypge3.scss";

export default function Hmstaypge3() {
  const [guestDetails, setGuestDetails] = useState({
    title: "Mr",
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });
  
  const [specialRequests, setSpecialRequests] = useState("");
  const [gstDetails, setGstDetails] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (field, value) => {
    setGuestDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBooking = () => {
    if (agreedToTerms) {
      console.log("Booking confirmed:", { guestDetails, specialRequests, gstDetails });
      alert("Booking confirmed!");
    } else {
      alert("Please agree to terms and conditions");
    }
  };

  return (
    <div className="hmstaypge3-container">
      <TopNavbar />
      
      <div className="hmstaypge3-content">
        <FilterSidebar />
        
        <div className="main-content">
          <HmPaymentOptionsAndScan />
        </div>
      </div>
    </div>
  );
}
