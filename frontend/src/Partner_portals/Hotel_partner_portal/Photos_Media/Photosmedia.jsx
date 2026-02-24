import { useEffect, useRef, useState } from "react";
import "./Photosmedia.scss";
import { FiUpload, FiImage } from "react-icons/fi";
import {
  fetchHotelPhotoBlobUrl,
  getHotelDetails,
  getPartnerHotels,
  listHotelPhotos,
  uploadHotelPhoto,
} from "../../Api/partner/partnerApi";

const sampleTabs = [
  { id: "sample-1", label: "Deluxe Ocean View", disabled: true },
  { id: "sample-2", label: "Executive Suite", disabled: true },
  { id: "sample-3", label: "Standard Double", disabled: true },
  { id: "sample-4", label: "Family Suite", disabled: true },
];

const samplePhotos = [
  {
    id: "sample-photo-1",
    url: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210b0",
    featured: true,
  },
  {
    id: "sample-photo-2",
    url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
  {
    id: "sample-photo-3",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  },
];

const Tab = ({ label, active, onClick, disabled }) => (
  <button
    className={`ptrpm-pm-tab ${active ? "active" : ""} ${disabled ? "disabled" : ""}`}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

const UploadCard = ({ onClick }) => (
  <div className="ptrpm-upload-box" onClick={onClick} role="button" tabIndex={0}>
    <FiUpload className="ptrpm-upload-icon" />
    <p>Drag and drop images here, or click to browse</p>
    <span>Recommended: 1920x1080px, JPG or PNG, max 5MB</span>
  </div>
);

const PhotoCard = ({ src, featured }) => (
  <div className="ptrpm-photo-card">
    {featured && <span className="featured-badge">Featured</span>}
    <img src={src} alt="" />
  </div>
);

const AddPhotoCard = ({ onClick }) => (
  <div className="ptrpm-photo-card ptrpm-add-photo" onClick={onClick} role="button">
    <FiImage />
    <p>Add Photo</p>
  </div>
);

const Photosmedia = () => {
  const [hotelId, setHotelId] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  const [activeTab, setActiveTab] = useState({
    type: "HOTEL",
    roomTypeId: null,
    label: "Property Photos",
  });
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadHotel = async () => {
      setLoading(true);
      setError("");
      try {
        const hotels = await getPartnerHotels();
        if (hotels && hotels.length > 0) {
          setHotelId(hotels[0].id);
          const details = await getHotelDetails(hotels[0].id);
          setRoomTypes(details?.roomTypes || []);
        }
      } catch (err) {
        setError(err.message || "Failed to load photos");
      } finally {
        setLoading(false);
      }
    };

    loadHotel();
  }, []);

  useEffect(() => {
    let active = true;
    const previousPhotos = photos;

    const loadPhotos = async () => {
      if (!hotelId) return;
      setLoading(true);
      setError("");
      try {
        const list = await listHotelPhotos(hotelId, activeTab.roomTypeId);
        const withUrls = await Promise.all(
          list.map(async (photo) => ({
            ...photo,
            url: await fetchHotelPhotoBlobUrl(photo.fileId),
          }))
        );
        if (active) {
          setPhotos(withUrls);
        } else {
          withUrls.forEach((item) => item.url && URL.revokeObjectURL(item.url));
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Failed to load photos");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadPhotos();

    return () => {
      active = false;
      previousPhotos.forEach((item) => item.url && URL.revokeObjectURL(item.url));
    };
  }, [hotelId, activeTab.roomTypeId, activeTab.type]);

  const tabs =
    roomTypes && roomTypes.length > 0
      ? roomTypes.map((room) => ({
          id: room.id,
          label: room.name || "Room Type",
          disabled: false,
        }))
      : sampleTabs;

  const handleFiles = async (files) => {
    if (!hotelId || !files.length) return;

    setUploading(true);
    setError("");
    try {
      await Promise.all(
        files.map((file, index) =>
          uploadHotelPhoto(hotelId, file, {
            type: activeTab.type,
            roomTypeId: activeTab.roomTypeId,
            isPrimary: index === 0,
          })
        )
      );

      const list = await listHotelPhotos(hotelId, activeTab.roomTypeId);
      const withUrls = await Promise.all(
        list.map(async (photo) => ({
          ...photo,
          url: await fetchHotelPhotoBlobUrl(photo.fileId),
        }))
      );
      setPhotos((prev) => {
        prev.forEach((item) => item.url && URL.revokeObjectURL(item.url));
        return withUrls;
      });
    } catch (err) {
      setError(err.message || "Failed to upload photos");
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const displayPhotos =
    photos && photos.length > 0
      ? photos.map((photo) => ({
          id: photo.id || photo.fileId,
          url: photo.url,
          featured: photo.isPrimary,
        }))
      : samplePhotos;

  return (
    <div className="ptr-photos-page">
      <div className="ptrpm-page-head">
        <h2>Photos & Media</h2>
        <p>Upload and manage your property and room photos</p>
      </div>

      <div className="ptrpm-tabs">
        <Tab
          label="Property Photos"
          active={activeTab.type === "HOTEL"}
          onClick={() =>
            setActiveTab({ type: "HOTEL", roomTypeId: null, label: "Property Photos" })
          }
        />
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            label={tab.label}
            active={activeTab.roomTypeId === tab.id}
            disabled={tab.disabled}
            onClick={() =>
              !tab.disabled &&
              setActiveTab({
                type: "ROOM",
                roomTypeId: tab.id,
                label: tab.label,
              })
            }
          />
        ))}
      </div>

      <section className="ptrpm-card">
        <h3>{activeTab.label}</h3>
        <p className="ptrpm-sub">
          Upload high-quality images of your hotel exterior, lobby, facilities, and common areas
        </p>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          hidden
          onChange={(e) => handleFiles(Array.from(e.target.files || []))}
        />

        <UploadCard onClick={triggerFileInput} />
        {uploading && <p className="ptrpm-muted">Uploading photos...</p>}
        {loading && <p className="ptrpm-muted">Loading photos...</p>}
        {error && <p className="ptrpm-error">{error}</p>}

        <div className="ptrpm-photo-grid">
          {displayPhotos.map((photo) => (
            <PhotoCard key={photo.id} src={photo.url} featured={photo.featured} />
          ))}
          <AddPhotoCard onClick={triggerFileInput} />
        </div>
      </section>

      <section className="ptrpm-guidelines">
        <h4>Photo Guidelines</h4>
        <ul>
          <li>Use high-resolution images (min 1920x1080px)</li>
          <li>Ensure good lighting and clear focus</li>
          <li>Mark your best photo as "Featured" - it will appear first</li>
          <li>Drag to reorder photos</li>
          <li>Recommended formats: JPG, PNG</li>
        </ul>
      </section>
    </div>
  );
};

export default Photosmedia;
