// Photosmedia.jsx
import "./Photosmedia.css";
import { FiUpload, FiImage } from "react-icons/fi";

const Tab = ({ label, active }) => (
  <button className={`pm-tab ${active ? "active" : ""}`}>{label}</button>
);

const UploadCard = () => (
  <div className="upload-box">
    <FiUpload className="upload-icon" />
    <p>Drag and drop images here, or click to browse</p>
    <span>Recommended: 1920×1080px, JPG or PNG, max 5MB</span>
  </div>
);

const PhotoCard = ({ src, featured }) => (
  <div className="photo-card">
    {featured && <span className="featured-badge">⭐ Featured</span>}
    <img src={src} alt="" />
  </div>
);

const AddPhotoCard = () => (
  <div className="photo-card add-photo">
    <FiImage />
    <p>Add Photo</p>
  </div>
);

const Photosmedia = () => {
  return (
    <div className="photos-page">
      <div className="page-head">
        <h2>Photos & Media</h2>
        <p>Upload and manage your property and room photos</p>
      </div>

      <div className="tabs">
        <Tab label="Property Photos" active />
        <Tab label="Deluxe Ocean View" />
        <Tab label="Executive Suite" />
        <Tab label="Standard Double" />
        <Tab label="Family Suite" />
      </div>

      <section className="card">
        <h3>Property Photos</h3>
        <p className="sub">
          Upload high-quality images of your hotel exterior, lobby, facilities, and common areas
        </p>

        <UploadCard />

        <div className="photo-grid">
          <PhotoCard
            src="https://images.unsplash.com/photo-1501117716987-c8e1ecb210b0"
            featured
          />
          <PhotoCard
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
          />
          <PhotoCard
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
          />
          <AddPhotoCard />
        </div>
      </section>

      <section className="guidelines">
        <h4>Photo Guidelines</h4>
        <ul>
          <li>Use high-resolution images (min 1920×1080px)</li>
          <li>Ensure good lighting and clear focus</li>
          <li>Mark your best photo as “Featured” – it will appear first</li>
          <li>Drag to reorder photos</li>
          <li>Recommended formats: JPG, PNG</li>
        </ul>
      </section>
    </div>
  );
};

export default Photosmedia;
