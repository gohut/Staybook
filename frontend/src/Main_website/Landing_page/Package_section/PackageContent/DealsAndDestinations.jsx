// DealsAndDestinations.jsx
import React from "react";
import "./DealsAndDestinations.css";
import img from "../../../../assets/Flight/place1.jpg"

const honeymoonList = [
  { title: "Kashmir", desc: "Kashmir Tour Packages, Kashmir Tourism, Kashmir Honeymoon Packages" },
  { title: "Andaman", desc: "Andaman Tour Packages, Andaman Tourism, Andaman Honeymoon Packages" },
  { title: "Ladakh", desc: "Ladakh Tour Packages, Ladakh Tourism, Ladakh Honeymoon Packages" },
  { title: "North East", desc: "North East Tour Packages, North East India Tourism, Honeymoon Packages" },
  { title: "Goa", desc: "Goa Tour Packages, Goa Tourism, Goa Honeymoon Packages" },
  { title: "Kerala", desc: "Kerala Tour Packages, Kerala Tourism, Kerala Honeymoon Packages" },
  { title: "Maldives", desc: "Maldives Tour Packages, Maldives Tourism, Honeymoon Packages" },
  { title: "Sri Lanka", desc: "Sri Lanka Tour Packages, Sri Lanka Tourism, Honeymoon Packages" },
  { title: "Dubai", desc: "Dubai Tour Packages, Dubai Tourism, Honeymoon Packages" },
];

const lastMinuteDeals = [
  "Kerala",
  "Shimla & Manali",
  "Rajasthan",
  "Goa",
  "Andaman",
  "South India",
  "Sikkim & Darjeeling",
  "Uttarakhand",
];

const visaFree = [
  "Sri Lanka",
  "Maldives",
  "Thailand",
  "Malaysia",
  "Seychelles",
  "Almaty",
  "Hong Kong",
  "Qatar",
];

export default function DealsAndDestinations() {
  return (
    <div className="dd-wrapper">
      {/* Honeymoon Grid */}
      <div className="honeymoon-box">
        {honeymoonList.map((item) => (
          <div className="honeymoon-item" key={item.title}>
            
              <div className="circle-overlay">
                <img  src={img} alt="" />
              </div>
            <div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Last Minute Deals */}
      <section className="slider-section">
        <div className="section-head">
          <h2>Last-minute Deals</h2>
          <p>Top trending Last minute getaways!</p>
        </div>
        <div className="card-row">
          {lastMinuteDeals.map((item) => (
            <div className="image-card" key={item}>
              <img src={img} alt="" style={{zIndex: "0"}}/>
              <span style={{position:"absolute",paddingLeft:"10px", zIndex: "10"}}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Visa Free Destinations */}
      <section className="slider-section">
        <div className="section-head">
          <h2>Visa Free Destinations</h2>
          <p>Dream Destinations, Zero Paperwork!</p>
        </div>
        <div className="card-row">
          {visaFree.map((item) => (
            <div className="image-card dark" key={item}>
              
 <img src={img} alt="" style={{zIndex: "0"}}/>
  <span style={{position:"absolute",paddingLeft:"10px", zIndex: "10"}}>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
