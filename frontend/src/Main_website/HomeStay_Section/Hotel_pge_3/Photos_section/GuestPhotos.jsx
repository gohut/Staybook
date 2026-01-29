// GuestPhotos.jsx
import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import "./GuestPhotos.css";

const photos = [
  "/images/p1.jpg",
  "/images/p2.jpg",
  "/images/p3.jpg",
  "/images/p4.jpg",
  "/images/p5.jpg",
];

const GuestPhotos = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const openViewer = (index) => {
    setActive(index);
    setOpen(true);
  };

  const next = () =>
    setActive((prev) => (prev + 1) % photos.length);

  const prev = () =>
    setActive((prev) =>
      prev === 0 ? photos.length - 1 : prev - 1
    );

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
            <button className="nav left" onClick={prev}>
              <FaChevronLeft />
            </button>

            <img src={photos[active]} alt="" />

            <button className="nav right" onClick={next}>
              <FaChevronRight />
            </button>
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
                <img
                  key={i}
                  src={img}
                  className={i === active ? "active" : ""}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GuestPhotos;
