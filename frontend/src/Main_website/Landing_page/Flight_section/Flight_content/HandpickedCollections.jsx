// HandpickedCollections.jsx
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./HandpickedCollections.css";
import img1 from  "../../../../assets/Flight/place1.jpg"

export default function HandpickedCollections() {
  return (
    <div className="collections-wrapper">
      {/* SECTION 1 */}
      <div className="collection-section">
        <div className="collection-header">
          <h2>Handpicked Collections for You</h2>
          <div className="nav-icons">
            <FiChevronLeft />
            <FiChevronRight />
          </div>
        </div>

        <div className="collection-row">
          {[
            { tag: "TOP 8", title: "Stays in & Around Delhi for a Weekend Getaway", img: img1 },
            { tag: "TOP 8", title: "Stays in & Around Mumbai for a Weekend Getaway", img: img1 },
            { tag: "TOP 9", title: "Stays in & Around Bangalore for a Weekend Getaway", img: img1 },
            { tag: "TOP 11", title: "Beach Destinations", img: img1 },
            { tag: "TOP 11", title: "Weekend Getaways", img: img1 },
          ].map((item, i) => (
            <div className="collection-card" key={i}>
              <img src={item.img} alt="" />
              <div className="overlay">
                <span className="tag">{item.tag}</span>
                <p>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="collection-section">
        <div className="collection-header">
          <h2>Unlock Lesser-Known Wonders of India</h2>
          <div className="nav-icons">
            <FiChevronLeft />
            <FiChevronRight />
          </div>
        </div>

        <div className="collection-row">
          {[
            { title: "Shimla's Best Kept Secret", img: img1 },
            { title: "Tamil Nadu's Charming Hill Town", img: img1 },
            { title: "Picturesque Gateway to Himalayas", img: img1 },
            { title: "Quaint Little Hill Station in Gujarat", img: img1 },
            { title: "A pleasant summer retreat and snowy winter wonderland!", img: img1 },
          ].map((item, i) => (
            <div className="collection-card" key={i}>
              <img src={item.img} alt="" />
              <div className="overlay bottom-only">
                <p>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
