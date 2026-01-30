// OffersSection.jsx
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./OffersSection.scss";
import img from "../../../../assets/Flight/place1.jpg"
export default function OffersSection() {
  return (
    <div className="offers-wrapper">
      <div className="offers-header">
        <div className="offers-tabs">
          <h2>Offers</h2>
          <span className="active">Hotels</span>
          <span>All Offers</span>
          <span>Flights</span>
          <span>Holidays</span>
          <span>Trains</span>
          <span>Cabs</span>
          <span>Bank Offers</span>
          <span>Activities</span>
        </div>

        <div className="offers-nav">
          <a href="/">VIEW ALL →</a>
          <FiChevronLeft />
          <FiChevronRight />
        </div>
      </div>

      <div className="offers-grid">
        <div className="offer-card">
          <img src={img} alt="" />
          <div>
            <small>T&C’S APPLY</small>
            <h4>FOR UNFORGETTABLE STAYS IN INDIA:</h4>
            <p>Book Amritara Hotels & Resorts @ Up to 40% OFF*</p>
            <span className="link">VIEW DETAILS</span>
          </div>
        </div>

        <div className="offer-card">
          <img src={img} alt="" />
          <div>
            <small>T&C’S APPLY</small>
            <h4>WITH VISA SIGNATURE CREDIT CARDS:</h4>
            <p>Enjoy Exclusive Benefits</p>
            <span className="link">VIEW DETAILS</span>
          </div>
        </div>

        <div className="offer-card">
          <img src={img} alt="" />
          <div>
            <small>T&C’S APPLY</small>
            <h4>Enjoy Stays Amidst Enchanting Nature!</h4>
            <p>Get Up to 25% OFF* on Mayfair Hotels & Resorts</p>
            <span className="link">VIEW DETAILS</span>
          </div>
        </div>

        <div className="offer-card">
          <img src={img}   alt="" />
          <div>
            <small>T&C’S APPLY</small>
            <h4>Travel Across the Country with Up to 15% OFF*</h4>
            <p>on Domestic Flights & Hotels</p>
            <span className="link blue">BOOK NOW</span>
          </div>
        </div>
      </div>
    </div>
  );
}
