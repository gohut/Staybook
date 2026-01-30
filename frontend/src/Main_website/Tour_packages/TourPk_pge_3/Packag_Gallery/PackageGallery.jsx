// PackageGallery.jsx
import "./PackageGallery.scss";
import { FaShareAlt, FaImages } from "react-icons/fa";

const PackageGallery = () => {
  return (
    <div className="package-gallery">
      <div className="gallery-header">
        <h1>Hidden Shores of North Goa Beaches</h1>
        <div className="tags">
          <span className="tag">Customizable</span>
          <span className="tag">4N/5D</span>
          <span className="tag">4N Goa</span>
        </div>
      </div>

      <div className="gallery-grid">
        <div className="gallery-main">
          <button className="view-gallery">
            <FaImages /> VIEW GALLERY
          </button>
        </div>

        <div className="gallery-side">
          <div className="img img1" />
          <div className="img img2" />
          <div className="img img3" />
          <div className="img img4" />
          <div className="img img5 property">
            <span>Property photos</span>
          </div>
        </div>
      </div>

      <div className="gallery-tabs">
        <span className="active">ITINERARY</span>
        <span>POLICIES</span>
        <span>SUMMARY</span>

        <div className="share">
          <FaShareAlt /> Share
        </div>
      </div>
    </div>
  );
};

export default PackageGallery;
