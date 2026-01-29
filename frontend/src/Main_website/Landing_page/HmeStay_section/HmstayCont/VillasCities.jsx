// VillasCities.jsx
import React from "react";
import "./VillasCities.css";
import img from "../../../../assets/Flight/place1.jpg";

export default function VillasCities() {
  const cities = [
    "Goa",
    "Mumbai",
    "Delhi",
    "Mukteshwar",
    "Gokarna",
    "Coonoor",
    "Kasol",
    "Malvan",
    "Jibhi",
  ];

  return (
    <div className="cities-wrapper">
      {cities.map((city, i) => (
        <div className="city-item" key={i}>
          <div style={{width: "50px", height:"50px", borderRadius:"100%", overflow:"hidden",objectFit:"contain"  }}>
            <img style={{width: "50px", height:"50px"}} src={img} alt="" />
          </div>
          <div>
            <h4>{city}</h4>
            <p>Homestays · Villas & Apts</p>
          </div>
        </div>
      ))}
    </div>
  );
}
