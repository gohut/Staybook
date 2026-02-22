// GuestPhotos.jsx
import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import "./GuestPhotos.scss";
import img1 from "../../../../assets/touristPlace/timg1.jpg";
import img2 from "../../../../assets/touristPlace/timg2.jpg";
import img3 from "../../../../assets/touristPlace/timg3.jpg";
import img4 from "../../../../assets/touristPlace/timg4.jpg";
const photos = [img1, img2, img3, img4, img1];

const GuestPhotos = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const openViewer = (index) => {
    setActive(index);
    setOpen(true);
  };

  const next = () => setActive((prev) => (prev + 1) % photos.length);

  const prev = () =>
    setActive((prev) => (prev === 0 ? photos.length - 1 : prev - 1));

  return (
    <>
      {/* GRID */}
      <div className="guest-photos-card">
        <h3>Photos by Guests</h3>

        <div className="guest-grid">
          {photos.map((img, i) => (
            <div
              key={i}
              className="guest-img"
              style={{ backgroundImage: `url(${img})` }}
              onClick={() => openViewer(i)}
            >
              {i === photos.length - 1 && (
                <div className="overlay">+1895 Guest Photos</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="photo-modal">
          <div className="modal-header">
            <div>
              <b>Dharampreet Singh</b>
              <span>Dec 10, 2025</span>
            </div>
            <button onClick={() => setOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="modal-body">
            <div className="image-stage">
              <button className="nav left" onClick={prev} aria-label="Previous image">
                <FaChevronLeft />
              </button>

              <img src={photos[active]} alt={`Guest photo ${active + 1}`} />

              <button className="nav right" onClick={next} aria-label="Next image">
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div className="modal-footer">
            <div className="tabs">
              <span className="active">Room (134)</span>
              <span>Outdoors (278)</span>
              <span>Facade (14)</span>
              <span>Washroom (14)</span>
              <span>Restaurant (104)</span>
              <span>Pool (308)</span>
              <span>Lobby (28)</span>
              <span>Others (1020)</span>
            </div>

            <div className="thumbs">
              {photos.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  className={`thumb-btn ${i === active ? "active" : ""}`}
                  onClick={() => setActive(i)}
                >
                  <img src={img} alt={`Guest photo ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GuestPhotos;
