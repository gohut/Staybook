// ContactPayment.jsx
import React, { useState } from "react";
import "./ContactPayment.scss";
import {
  FaMobileAlt,
  FaCreditCard,
  FaUniversity,
  FaWallet,
  FaQrcode,
  FaLock,
} from "react-icons/fa";

export default function ContactPayment({ onPaymentSuccess }) {
  const [activeTab, setActiveTab] = useState("UPI");

  return (
    <div className="contact-payment">
      <h3>Contact Information</h3>

      <div className="input-row">
        <input placeholder="your.email@example.com" />
        <input placeholder="+91 98765 43210" />
      </div>

      <h3>Payment Method</h3>

      <div className="payment-methods">
        <div
          className={`method ${activeTab === "UPI" ? "active" : ""}`}
          onClick={() => setActiveTab("UPI")}
        >
          <FaMobileAlt /> UPI
        </div>
        <div
          className={`method ${activeTab === "Cards" ? "active" : ""}`}
          onClick={() => setActiveTab("Cards")}
        >
          <FaCreditCard /> Cards
        </div>
        <div
          className={`method ${activeTab === "NetBanking" ? "active" : ""}`}
          onClick={() => setActiveTab("NetBanking")}
        >
          <FaUniversity /> Net Banking
        </div>
        <div
          className={`method ${activeTab === "Wallets" ? "active" : ""}`}
          onClick={() => setActiveTab("Wallets")}
        >
          <FaWallet /> Wallets
        </div>
      </div>

      {/* ================= UPI ================= */}
      {activeTab === "UPI" && (
        <>
          <div className="upi-actions">
            <button className="outline">
              <FaQrcode /> Scan QR Code
            </button>
            <button className="outline">
              <FaMobileAlt /> Enter UPI ID
            </button>
          </div>

          <div className="qr-box">
            <FaQrcode size={48} />
            <p>Pay using UPI QR Code</p>
            <span>Scan the QR code with any UPI app to complete payment</span>
            <button className="primary">Generate QR Code</button>
          </div>
        </>
      )}

      {/* ================= WALLETS ================= */}
      {activeTab === "Wallets" && (
        <>
          <p className="sub-title">Select Your Wallet</p>

          <div className="grid">
            <div className="option-card">💳 Paytm</div>
            <div className="option-card">📱 PhonePe</div>
            <div className="option-card">🟢 Google Pay</div>
            <div className="option-card">🟠 Amazon Pay</div>
            <div className="option-card">💰 Mobikwik</div>
          </div>

          <button className="primary disabled">Pay with Wallet</button>

          <p className="terms">
            By proceeding, you agree to Razorpay's Terms of Service and Privacy
            Policy
          </p>
        </>
      )}

      {/* ================= NET BANKING ================= */}
      {activeTab === "NetBanking" && (
        <>
          <p className="sub-title">Select Your Bank</p>

          <div className="grid">
            <div className="option-card">🏦 HDFC Bank</div>
            <div className="option-card">🏦 ICICI Bank</div>
            <div className="option-card">🏦 State Bank of India</div>
            <div className="option-card">🏦 Axis Bank</div>
            <div className="option-card">🏦 Kotak Mahindra Bank</div>
            <div className="option-card">🏦 Punjab National Bank</div>
          </div>

          <select className="bank-select">
            <option>Select Bank</option>
          </select>

          <button className="primary disabled">Proceed to Bank</button>
        </>
      )}

      {/* ================= CARDS ================= */}
      {activeTab === "Cards" && (
        <>
          <label>Card Number</label>
          <div className="card-input">
            <input placeholder="1234 5678 9012 3456" />
            <span className="card-icons">💳 VISA</span>
          </div>

          <label>Cardholder Name</label>
          <input placeholder="Name on card" />

          <div className="card-row">
            <div>
              <label>Expiry Date</label>
              <input placeholder="MM/YY" />
            </div>
            <div>
              <label>CVV</label>
              <input placeholder="123" />
            </div>
          </div>

          <button className="primary pay-btn" onClick={onPaymentSuccess}>
            <FaLock /> Pay ₹1002.50
          </button>
        </>
      )}
    </div>
  );
}
