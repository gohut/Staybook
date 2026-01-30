// Hotelpge5.jsx  (CHANGE THIS FILE)
import React, { useState } from "react";
import "./hotelpage5.scss";
import ContactPayment from "./Contact_info/ContactPayment";
import BookingSummary from "./Booking_sumry/BookingSummary";
import PaymentSuccess from "./Payment_success/PaymentSuccess";
import { FaLock, FaCheckCircle } from "react-icons/fa";
import TopNavbar from "../../Top_Navbar/TopNavbar";

export default function Hotelpge5() {
  const [paymentDone, setPaymentDone] = useState(false);

  return (
    <div>
      <TopNavbar />

      {!paymentDone ? (
        <div className="checkout-page">
          <div className="checkout-header">
            <div>
              <h2>Secure Checkout</h2>
              <p className="secure-text">
                <FaLock /> Secured by Razorpay | PCI DSS Compliant
              </p>
            </div>
            <span className="razorpay-text">razorpay</span>
          </div>

          <div className="checkout-content">
            <ContactPayment onPaymentSuccess={() => setPaymentDone(true)} />
            <BookingSummary />
          </div>

          <div className="checkout-footer">
            <span>
              <FaLock /> 256-bit SSL
            </span>
            <span>
              <FaCheckCircle /> PCI DSS Compliant
            </span>
            <span>
              <FaCheckCircle /> 100% Secure
            </span>
          </div>
        </div>
      ) : (
        <PaymentSuccess />
      )}
    </div>
  );
}
