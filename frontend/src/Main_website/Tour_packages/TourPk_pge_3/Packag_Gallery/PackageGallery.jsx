// PackageGallery.jsx
import { useEffect, useState } from "react";
import "./PackageGallery.scss";
import {
  FaShareAlt,
  FaImages,
  FaChevronLeft,
  FaChevronRight,
  FaTimes
} from "react-icons/fa";
import img1 from "../../../../assets/touristPlace/timg1.jpg";
import img2 from "../../../../assets/touristPlace/timg2.jpg";
import img3 from "../../../../assets/touristPlace/timg3.jpg";
import img4 from "../../../../assets/touristPlace/timg4.jpg";
import img5 from "../../../../assets/touristPlace/timg5.jpg";
import img6 from "../../../../assets/touristPlace/timg6.jpg";
import img7 from "../../../../assets/touristPlace/timg7.jpg";
import img8 from "../../../../assets/touristPlace/timg8.jpg";

const galleryImages = [
  { src: img1, alt: "Goa beach shoreline at sunset" },
  { src: img2, alt: "Coastal resort view in Goa" },
  { src: img3, alt: "Palm-lined beach in North Goa" },
  { src: img4, alt: "Colorful old quarter and streets" },
  { src: img5, alt: "Beach shacks and ocean waves" },
  { src: img6, alt: "Goa island and sea view" },
  { src: img7, alt: "Night lights and waterfront scene" },
  { src: img8, alt: "Travel landscape with water and hills" }
];

const PackageGallery = () => {
  const [openViewer, setOpenViewer] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openAt = (index, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setActiveIndex(index);
    setOpenViewer(true);
  };

  const closeViewer = () => setOpenViewer(false);

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (!openViewer) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeViewer();
      }
      if (event.key === "ArrowRight") {
        nextImage();
      }
      if (event.key === "ArrowLeft") {
        prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [openViewer]);

  const sideImages = galleryImages.slice(1, 6);
  const moreCount = galleryImages.length - (sideImages.length + 1);
  const openFromKeyboard = (event, index) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openAt(index, event);
    }
  };

  return (
    <>
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
          <div
            className="gallery-main"
            onClick={(event) => openAt(0, event)}
            onKeyDown={(event) => openFromKeyboard(event, 0)}
            role="button"
            tabIndex={0}
          >
            <img src={galleryImages[0].src} alt={galleryImages[0].alt} />
            <button
              type="button"
              className="view-gallery"
              onClick={(event) => openAt(0, event)}
            >
              <FaImages /> VIEW GALLERY
            </button>
            <span className="property-pill">Property photos</span>
          </div>

          <div className="gallery-side">
            {sideImages.map((image, index) => {
              const realIndex = index + 1;
              const showMoreOverlay =
                index === sideImages.length - 1 && moreCount > 0;

              return (
                <button
                  key={image.alt}
                  type="button"
                  className="gallery-thumb"
                  onClick={(event) => openAt(realIndex, event)}
                  aria-label={`Open photo ${realIndex + 1}`}
                >
                  <img src={image.src} alt={image.alt} />
                  {showMoreOverlay && (
                    <span className="more-overlay">+{moreCount} photos</span>
                  )}
                </button>
              );
            })}
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

      {openViewer && (
        <div className="package-viewer-modal" onClick={closeViewer}>
          <div
            className="package-viewer"
            role="dialog"
            aria-modal="true"
            aria-label="Package image gallery"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="viewer-header">
              <div className="viewer-title">
                <strong>Most Wanted Goa Packages</strong>
                <span>
                  {activeIndex + 1} / {galleryImages.length}
                </span>
              </div>

              <button type="button" className="viewer-close" onClick={closeViewer}>
                <FaTimes />
              </button>
            </div>

            <div className="viewer-stage">
              <button
                type="button"
                className="viewer-nav left"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <FaChevronLeft />
              </button>

              <img
                src={galleryImages[activeIndex].src}
                alt={galleryImages[activeIndex].alt}
              />

              <button
                type="button"
                className="viewer-nav right"
                onClick={nextImage}
                aria-label="Next image"
              >
                <FaChevronRight />
              </button>
            </div>

            <div className="viewer-strip">
              {galleryImages.map((image, index) => (
                <button
                  key={image.alt}
                  type="button"
                  className={`viewer-thumb ${index === activeIndex ? "active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <img src={image.src} alt={image.alt} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PackageGallery;
