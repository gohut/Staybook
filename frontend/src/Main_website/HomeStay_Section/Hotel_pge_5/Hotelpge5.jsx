// Hotelpge5.jsx  (CHANGE THIS FILE)
import React, { useEffect, useMemo, useState } from "react";
import "./hotelpage5.scss";
import ContactPayment from "./Contact_info/ContactPayment";
import BookingSummary from "./Booking_sumry/BookingSummary";
import PaymentSuccess from "./Payment_success/PaymentSuccess";
import { FaLock, FaCheckCircle } from "react-icons/fa";
import TopNavbar from "../../Top_Navbar/TopNavbar";
import { useLocation } from "react-router-dom";
import {
  markBookingPaid,
  updateTravelerBookingPayment,
  hasValidAuthToken,
} from "../../../Api/booking/bookingApi";

export default function Hotelpge5() {
  const location = useLocation();
  const [paymentDone, setPaymentDone] = useState(false);
  const [paymentRecorded, setPaymentRecorded] = useState(false);
  const [paymentSyncing, setPaymentSyncing] = useState(false);
  const [paymentSyncError, setPaymentSyncError] = useState("");
  const bookingInfo = useMemo(() => {
    if (location.state?.bookingId) return location.state;
    const stored = localStorage.getItem("staybook_latest_booking_id");
    return stored ? { bookingId: stored } : {};
  }, [location.state]);
  const bookingId = bookingInfo?.bookingId;
  const amount = bookingInfo?.amount || 0;
  const currency = bookingInfo?.currency || "INR";

  useEffect(() => {
    if (!paymentDone || paymentRecorded || !bookingId) return;

    let active = true;
    const syncPayment = async () => {
      setPaymentSyncError("");
      setPaymentSyncing(true);
      try {
        await markBookingPaid(bookingId);
        if (hasValidAuthToken()) {
          await updateTravelerBookingPayment(bookingId, {
            totalPaid: amount || 0,
            currency,
          });
        }
        if (active) {
          setPaymentRecorded(true);
        }
      } catch (err) {
        if (active) {
          setPaymentSyncError(err?.message || "Failed to update payment status.");
        }
      } finally {
        if (active) {
          setPaymentSyncing(false);
        }
      }
    };

    syncPayment();

    return () => {
      active = false;
    };
  }, [paymentDone, paymentRecorded, bookingId, amount, currency]);

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
        <>
          <PaymentSuccess />
          {paymentSyncing && (
            <p className="payment-sync-status">Updating payment status...</p>
          )}
          {paymentSyncError && (
            <p className="payment-sync-status error">{paymentSyncError}</p>
          )}
        </>
      )}
    </div>
  );
}
