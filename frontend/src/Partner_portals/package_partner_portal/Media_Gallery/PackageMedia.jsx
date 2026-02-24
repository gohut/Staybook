import { useRef, useState } from "react";
import {
  FiUpload,
  FiTrash2,
  FiStar,
  FiImage,
  FiMove,
} from "react-icons/fi";
import PPCard from "../Common/PPCard";
import PPModal from "../Common/PPModal";
import "./PackageMedia.scss";

const initialImages = [
  {
    id: "IMG-01",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    title: "Beachfront Resort",
    category: "Hotel",
    size: 420,
    primary: true,
  },
  {
    id: "IMG-02",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    title: "Sunset Cruise",
    category: "Activities",
    size: 360,
    primary: false,
  },
];

const PackageMedia = () => {
  const [images, setImages] = useState(initialImages);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const fileRef = useRef(null);
  const [dragIndex, setDragIndex] = useState(null);

  const handleFiles = (files) => {
    const selected = Array.from(files);
    const next = [];
    selected.forEach((file) => {
      if (file.size > 2 * 1024 * 1024) {
        setError("File size exceeds 2MB. Please compress before upload.");
        return;
      }
      const url = URL.createObjectURL(file);
      next.push({
        id: `IMG-${Date.now()}-${file.name}`,
        url,
        title: file.name,
        category: "Destination",
        size: Math.round(file.size / 1024),
        primary: false,
      });
    });
    setImages((prev) => [...prev, ...next]);
  };

  const handleDrop = (index) => {
    if (dragIndex === null || dragIndex === index) return;
    const updated = [...images];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, moved);
    setImages(updated);
    setDragIndex(null);
  };

  return (
    <div className="pp-page pp-media">
      <PPCard title="Media Gallery" subtitle="Upload and manage visuals">
        <div className="pp-media-toolbar">
          <div>
            <p className="pp-muted">Recommended size: 1600x900 (max 2MB).</p>
            {error && <span className="pp-media-error">{error}</span>}
          </div>
          <button
            type="button"
            className="pp-btn pp-btn-primary"
            onClick={() => fileRef.current?.click()}
          >
            <FiUpload /> Upload Images
          </button>
          <input
            ref={fileRef}
            type="file"
            multiple
            hidden
            onChange={(event) => handleFiles(event.target.files)}
          />
        </div>

        <div className="pp-media-grid">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="pp-media-card"
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => handleDrop(index)}
            >
              <div
                className="pp-media-thumb"
                style={{ backgroundImage: `url(${image.url})` }}
                onClick={() => setPreview(image)}
              >
                <FiImage />
              </div>
              <div className="pp-media-info">
                <h4>{image.title}</h4>
                <p>{image.category} - {image.size}KB</p>
              </div>
              <div className="pp-media-actions">
                <button
                  type="button"
                  className="pp-btn pp-btn-ghost"
                  onClick={() =>
                    setImages((prev) =>
                      prev.map((item) =>
                        item.id === image.id
                          ? { ...item, primary: !item.primary }
                          : item
                      )
                    )
                  }
                >
                  <FiStar /> {image.primary ? "Primary" : "Mark Primary"}
                </button>
                <button
                  type="button"
                  className="pp-btn pp-btn-ghost"
                  onClick={() =>
                    setImages((prev) => prev.filter((item) => item.id !== image.id))
                  }
                >
                  <FiTrash2 /> Remove
                </button>
                <span className="pp-media-drag">
                  <FiMove /> Drag
                </span>
              </div>
            </div>
          ))}
        </div>
      </PPCard>

      {preview && (
        <PPModal
          title="Image Preview"
          onClose={() => setPreview(null)}
          actions={
            <button
              type="button"
              className="pp-btn pp-btn-primary"
              onClick={() => setPreview(null)}
            >
              Close
            </button>
          }
        >
          <img src={preview.url} alt={preview.title} className="pp-media-preview" />
          <p className="pp-muted">Category: {preview.category}</p>
        </PPModal>
      )}
    </div>
  );
};

export default PackageMedia;
