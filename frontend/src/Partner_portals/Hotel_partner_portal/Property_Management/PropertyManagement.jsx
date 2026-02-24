import { useEffect, useMemo, useState } from "react";
import "./PropertyManagement.scss";
import { FiEdit2, FiTrash2, FiPlus, FiX } from "react-icons/fi";
import {
  addRoomType,
  createHotel,
  deleteRoomType,
  getHotelDetails,
  getPartnerHotels,
  updateHotel,
  updateRoomType,
  uploadHotelPhoto,
} from "../../Api/partner/partnerApi";

const defaultHotel = {
  name: "Grand Plaza Hotel",
  email: "info@grandplaza.com",
  address: "123 Ocean Drive",
  phone: "+1 (305) 555-0123",
  city: "Miami Beach",
  state: "FL",
  country: "USA",
  pincode: "33139",
  latitude: "",
  longitude: "",
  checkInTime: "15:00",
  checkOutTime: "11:00",
  description:
    "Experience luxury beachfront living at Grand Plaza Hotel. Our modern accommodations offer stunning ocean views, world-class amenities, and exceptional service.",
  starRating: 5,
};

const sampleRooms = [
  {
    id: "sample-1",
    name: "Deluxe Ocean View",
    bedType: "King Bed",
    basePrice: 250,
    currency: "USD",
    maxGuests: 2,
    totalRooms: 15,
    amenities: ["Wi-Fi", "Air Conditioning", "Smart TV", "Mini Bar", "Ocean View", "Balcony"],
  },
  {
    id: "sample-2",
    name: "Executive Suite",
    bedType: "King Bed + Sofa Bed",
    basePrice: 450,
    currency: "USD",
    maxGuests: 4,
    totalRooms: 8,
    amenities: [
      "Wi-Fi",
      "Air Conditioning",
      "Smart TV",
      "Mini Bar",
      "Ocean View",
      "Living Room",
      "Balcony",
      "Coffee Maker",
    ],
  },
  {
    id: "sample-3",
    name: "Standard Double",
    bedType: "Double Bed",
    basePrice: 180,
    currency: "USD",
    maxGuests: 2,
    totalRooms: 20,
    amenities: ["Wi-Fi", "Air Conditioning", "TV", "Mini Fridge"],
  },
  {
    id: "sample-4",
    name: "Family Suite",
    bedType: "2 Queen Beds",
    basePrice: 380,
    currency: "USD",
    maxGuests: 6,
    totalRooms: 5,
    amenities: ["Wi-Fi", "Air Conditioning", "Smart TV", "Mini Bar", "Kitchenette", "Living Room"],
  },
];

const InfoField = ({
  label,
  value,
  full,
  editable,
  onChange,
  type = "text",
  placeholder,
}) => (
  <div className={`ptrpm-info-field ${full ? "full" : ""}`}>
    <label>{label}</label>
    {editable ? (
      full ? (
        <textarea
          className="ptrpm-textarea ptrpm-input"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          className="ptrpm-input"
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
        />
      )
    ) : (
      <div className={full ? "ptrpm-textarea" : "ptrpm-input-box"}>{value}</div>
    )}
  </div>
);

const RoomCard = ({ title, bed, price, guests, rooms, amenities, onEdit, onDelete, showActions }) => (
  <div className="ptrpm-room-card">
    <div className="ptrpm-room-header">
      <div>
        <h4>{title}</h4>
        <p>{bed}</p>
      </div>
      {showActions && (
        <div className="ptrpm-room-actions">
          <FiEdit2 onClick={onEdit} />
          <FiTrash2 onClick={onDelete} />
        </div>
      )}
    </div>

    <div className="ptrpm-room-meta">
      <div>
        <span>Base Price</span>
        <strong>{price}</strong>
      </div>
      <div>
        <span>Max Guests</span>
        <strong>{guests}</strong>
      </div>
      <div>
        <span>Total Rooms</span>
        <strong>{rooms}</strong>
      </div>
    </div>

    <div className="ptrpm-amenities">
      {amenities.map((a) => (
        <span key={a}>{a}</span>
      ))}
    </div>
  </div>
);

const PropertyManagement = ({ readOnly = false }) => {
  const [hotelId, setHotelId] = useState(null);
  const [hotelForm, setHotelForm] = useState(defaultHotel);
  const [roomTypes, setRoomTypes] = useState(sampleRooms);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [roomForm, setRoomForm] = useState({
    name: "",
    bedType: "",
    maxGuests: "",
    roomSizeSqFt: "",
    totalRooms: "",
    amenities: "",
    basePrice: "",
    currency: "USD",
    isActive: true,
  });
  const [roomImages, setRoomImages] = useState([]);
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [roomSaving, setRoomSaving] = useState(false);

  const roomTypeList = useMemo(() => {
    if (roomTypes && roomTypes.length > 0) {
      return roomTypes;
    }
    return sampleRooms;
  }, [roomTypes]);

  useEffect(() => {
    const loadHotel = async () => {
      setLoading(true);
      setError("");
      try {
        const hotels = await getPartnerHotels();
        if (hotels && hotels.length > 0) {
          const hotel = hotels[0];
          setHotelId(hotel.id);
          setHotelForm({
            name: hotel.name || defaultHotel.name,
            email: hotel.contact?.email || defaultHotel.email,
            address: hotel.location?.address || defaultHotel.address,
            phone: hotel.contact?.phone || defaultHotel.phone,
            city: hotel.location?.city || defaultHotel.city,
            state: hotel.location?.state || defaultHotel.state,
            country: hotel.location?.country || defaultHotel.country,
            pincode: hotel.location?.pincode || defaultHotel.pincode,
            latitude:
              hotel.location?.latitude !== null && hotel.location?.latitude !== undefined
                ? String(hotel.location.latitude)
                : defaultHotel.latitude,
            longitude:
              hotel.location?.longitude !== null && hotel.location?.longitude !== undefined
                ? String(hotel.location.longitude)
                : defaultHotel.longitude,
            checkInTime: hotel.checkInTime || defaultHotel.checkInTime,
            checkOutTime: hotel.checkOutTime || defaultHotel.checkOutTime,
            description: hotel.description || defaultHotel.description,
            starRating:
              hotel.starRating !== null && hotel.starRating !== undefined
                ? String(hotel.starRating)
                : String(defaultHotel.starRating),
          });

          const details = await getHotelDetails(hotel.id);
          if (details?.roomTypes?.length) {
            setRoomTypes(details.roomTypes);
          }
        }
      } catch (err) {
        setError(err.message || "Failed to load hotel");
      } finally {
        setLoading(false);
      }
    };

    loadHotel();
  }, []);

  const handleHotelChange = (field, value) => {
    setHotelForm((prev) => ({ ...prev, [field]: value }));
  };

  const toNumber = (value) => {
    if (value === null || value === undefined || value === "") return null;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  };

  const handleSaveHotel = async () => {
    if (readOnly) return;
    setSaving(true);
    setError("");
    setStatus("");
    try {
      const payload = {
        name: hotelForm.name,
        starRating: toNumber(hotelForm.starRating),
        description: hotelForm.description,
        address: hotelForm.address,
        city: hotelForm.city,
        state: hotelForm.state,
        country: hotelForm.country,
        pincode: hotelForm.pincode,
        latitude: toNumber(hotelForm.latitude),
        longitude: toNumber(hotelForm.longitude),
        phone: hotelForm.phone,
        email: hotelForm.email,
        checkInTime: hotelForm.checkInTime,
        checkOutTime: hotelForm.checkOutTime,
      };

      if (hotelId) {
        await updateHotel(hotelId, payload);
        setStatus("Hotel details updated successfully.");
      } else {
        const hotel = await createHotel(payload);
        setHotelId(hotel.id);
        const details = await getHotelDetails(hotel.id);
        if (details?.roomTypes) {
          setRoomTypes(details.roomTypes);
        }
        setStatus("Hotel created successfully.");
      }
    } catch (err) {
      setError(err.message || "Failed to save hotel details");
    } finally {
      setSaving(false);
    }
  };

  const openAddRoomModal = () => {
    if (readOnly) return;
    setEditingRoomId(null);
    setRoomForm({
      name: "",
      bedType: "",
      maxGuests: "",
      roomSizeSqFt: "",
      totalRooms: "",
      amenities: "",
      basePrice: "",
      currency: "USD",
      isActive: true,
    });
    setRoomImages([]);
    setModalOpen(true);
  };

  const openEditRoomModal = (room) => {
    if (readOnly) return;
    setEditingRoomId(room.id);
    setRoomForm({
      name: room.name || "",
      bedType: room.bedType || "",
      maxGuests: room.maxGuests != null ? String(room.maxGuests) : "",
      roomSizeSqFt: room.roomSizeSqFt != null ? String(room.roomSizeSqFt) : "",
      totalRooms: room.totalRooms != null ? String(room.totalRooms) : "",
      amenities: Array.isArray(room.amenities) ? room.amenities.join(", ") : "",
      basePrice: room.basePrice != null ? String(room.basePrice) : "",
      currency: room.currency || "USD",
      isActive: room.isActive !== undefined ? room.isActive : true,
    });
    setRoomImages([]);
    setModalOpen(true);
  };

  const handleSaveRoom = async () => {
    if (readOnly) return;
    if (!hotelId) {
      setError("Create the hotel profile before adding room types.");
      return;
    }
    setRoomSaving(true);
    setError("");
    setStatus("");

    try {
      const roomPayload = {
        name: roomForm.name,
        bedType: roomForm.bedType,
        maxGuests: toNumber(roomForm.maxGuests),
        roomSizeSqFt: toNumber(roomForm.roomSizeSqFt),
        totalRooms: toNumber(roomForm.totalRooms),
        amenities: roomForm.amenities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        basePrice: toNumber(roomForm.basePrice),
        currency: roomForm.currency,
        isActive: roomForm.isActive,
      };

      const savedRoom = editingRoomId
        ? await updateRoomType(hotelId, editingRoomId, roomPayload)
        : await addRoomType(hotelId, roomPayload);

      if (roomImages.length > 0) {
        await Promise.all(
          roomImages.map((file, index) =>
            uploadHotelPhoto(hotelId, file, {
              type: "ROOM",
              roomTypeId: savedRoom.id,
              isPrimary: index === 0,
            })
          )
        );
      }

      const details = await getHotelDetails(hotelId);
      if (details?.roomTypes) {
        setRoomTypes(details.roomTypes);
      }

      setModalOpen(false);
      setStatus("Room type saved successfully.");
    } catch (err) {
      setError(err.message || "Failed to save room type");
    } finally {
      setRoomSaving(false);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (readOnly) return;
    if (!hotelId || !roomId || roomId.startsWith("sample-")) {
      return;
    }
    const confirmed = window.confirm("Delete this room type?");
    if (!confirmed) return;

    try {
      await deleteRoomType(hotelId, roomId);
      const details = await getHotelDetails(hotelId);
      if (details?.roomTypes) {
        setRoomTypes(details.roomTypes);
      }
      setStatus("Room type deleted.");
    } catch (err) {
      setError(err.message || "Failed to delete room type");
    }
  };

  return (
    <div className="ptr-pm-page">
      <section className="ptrpm-card">
        <div className="ptrpm-card-header">
          <div>
            <h3>Property Information</h3>
            <p>Manage your hotel details and settings</p>
          </div>
          <button
            className="ptrpm-primary-btn"
            onClick={handleSaveHotel}
            disabled={saving || readOnly}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {loading && <p className="ptrpm-muted">Loading property details...</p>}
        {error && <p className="ptrpm-error">{error}</p>}
        {readOnly && (
          <p className="ptrpm-muted">Read-only access for sub-partner accounts.</p>
        )}
        {status && <p className="ptrpm-success">{status}</p>}

        <div className="ptrpm-info-grid">
          <InfoField
            label="Hotel Name"
            value={hotelForm.name}
            editable={!readOnly}
            onChange={(value) => handleHotelChange("name", value)}
          />
          <InfoField
            label="Email"
            value={hotelForm.email}
            editable={!readOnly}
            onChange={(value) => handleHotelChange("email", value)}
          />
          <InfoField
            label="Address"
            value={hotelForm.address}
            editable={!readOnly}
            onChange={(value) => handleHotelChange("address", value)}
          />
          <InfoField
            label="Phone"
            value={hotelForm.phone}
            editable={!readOnly}
            onChange={(value) => handleHotelChange("phone", value)}
          />
          <InfoField
            label="City"
            value={hotelForm.city}
            editable={!readOnly}
            onChange={(value) => handleHotelChange("city", value)}
          />
          <InfoField
            label="State"
            value={hotelForm.state}
            editable={!readOnly}
            onChange={(value) => handleHotelChange("state", value)}
          />
          <InfoField
            label="Country"
            value={hotelForm.country}
            editable={!readOnly}
            onChange={(value) => handleHotelChange("country", value)}
          />
          <InfoField
            label="Pincode"
            value={hotelForm.pincode}
            editable={!readOnly}
            onChange={(value) => handleHotelChange("pincode", value)}
          />
          <InfoField
            label="Star Rating"
            value={hotelForm.starRating}
            editable={!readOnly}
            type="number"
            onChange={(value) => handleHotelChange("starRating", value)}
          />
          <InfoField
            label="Check-in Time"
            value={hotelForm.checkInTime}
            editable={!readOnly}
            onChange={(value) => handleHotelChange("checkInTime", value)}
          />
          <InfoField
            label="Check-out Time"
            value={hotelForm.checkOutTime}
            editable={!readOnly}
            onChange={(value) => handleHotelChange("checkOutTime", value)}
          />
          <InfoField
            label="Latitude"
            value={hotelForm.latitude}
            editable={!readOnly}
            type="number"
            onChange={(value) => handleHotelChange("latitude", value)}
          />
          <InfoField
            label="Longitude"
            value={hotelForm.longitude}
            editable={!readOnly}
            type="number"
            onChange={(value) => handleHotelChange("longitude", value)}
          />
          <InfoField
            label="Description"
            value={hotelForm.description}
            full
            editable={!readOnly}
            onChange={(value) => handleHotelChange("description", value)}
          />
        </div>
      </section>

      <section className="ptrpm-card">
        <div className="ptrpm-card-header">
          <div>
            <h3>Room Types</h3>
            <p>Manage your room inventory and details</p>
          </div>
          {!readOnly && (
            <button className="ptrpm-primary-btn" onClick={openAddRoomModal}>
              <FiPlus /> Add Room Type
            </button>
          )}
        </div>

        <div className="ptrpm-room-grid">
          {roomTypeList.map((room) => (
            <RoomCard
              key={room.id || room.name}
              title={room.name}
              bed={room.bedType || "Bed Type"}
              price={
                room.basePrice != null
                  ? `${room.currency || "USD"} ${room.basePrice}/night`
                  : "$0/night"
              }
              guests={`${room.maxGuests || 0} guests`}
              rooms={`${room.totalRooms || 0} rooms`}
              amenities={room.amenities || []}
              showActions={!readOnly}
              onEdit={() =>
                !readOnly && !room.id?.startsWith("sample-") && openEditRoomModal(room)
              }
              onDelete={() => !readOnly && handleDeleteRoom(room.id)}
            />
          ))}
        </div>
      </section>

      {modalOpen && !readOnly && (
        <div className="ptrpm-modal">
          <div className="ptrpm-modal-content">
            <div className="ptrpm-modal-head">
              <div>
                <h3>{editingRoomId ? "Edit Room Type" : "Add Room Type"}</h3>
                <p>Fill out the room type details and upload images.</p>
              </div>
              <button className="ptrpm-modal-close" onClick={() => setModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <div className="ptrpm-modal-grid">
              <label className="ptrpm-modal-field">
                <span>Room Name</span>
                <input
                  value={roomForm.name}
                  onChange={(e) => setRoomForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Deluxe Ocean View"
                />
              </label>

              <label className="ptrpm-modal-field">
                <span>Bed Type</span>
                <input
                  value={roomForm.bedType}
                  onChange={(e) =>
                    setRoomForm((prev) => ({ ...prev, bedType: e.target.value }))
                  }
                  placeholder="King Bed"
                />
              </label>

              <label className="ptrpm-modal-field">
                <span>Max Guests</span>
                <input
                  type="number"
                  value={roomForm.maxGuests}
                  onChange={(e) =>
                    setRoomForm((prev) => ({ ...prev, maxGuests: e.target.value }))
                  }
                  placeholder="2"
                />
              </label>

              <label className="ptrpm-modal-field">
                <span>Room Size (sq ft)</span>
                <input
                  type="number"
                  value={roomForm.roomSizeSqFt}
                  onChange={(e) =>
                    setRoomForm((prev) => ({ ...prev, roomSizeSqFt: e.target.value }))
                  }
                  placeholder="350"
                />
              </label>

              <label className="ptrpm-modal-field">
                <span>Total Rooms</span>
                <input
                  type="number"
                  value={roomForm.totalRooms}
                  onChange={(e) =>
                    setRoomForm((prev) => ({ ...prev, totalRooms: e.target.value }))
                  }
                  placeholder="15"
                />
              </label>

              <label className="ptrpm-modal-field">
                <span>Base Price</span>
                <input
                  type="number"
                  value={roomForm.basePrice}
                  onChange={(e) =>
                    setRoomForm((prev) => ({ ...prev, basePrice: e.target.value }))
                  }
                  placeholder="250"
                />
              </label>

              <label className="ptrpm-modal-field">
                <span>Currency</span>
                <input
                  value={roomForm.currency}
                  onChange={(e) =>
                    setRoomForm((prev) => ({ ...prev, currency: e.target.value }))
                  }
                  placeholder="USD"
                />
              </label>

              <label className="ptrpm-modal-field ptrpm-modal-full">
                <span>Amenities (comma separated)</span>
                <input
                  value={roomForm.amenities}
                  onChange={(e) =>
                    setRoomForm((prev) => ({ ...prev, amenities: e.target.value }))
                  }
                  placeholder="Wi-Fi, Air Conditioning, Smart TV"
                />
              </label>

              <label className="ptrpm-modal-field ptrpm-modal-full">
                <span>Room Images</span>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setRoomImages(Array.from(e.target.files || []))}
                />
              </label>

              <label className="ptrpm-modal-toggle">
                <input
                  type="checkbox"
                  checked={roomForm.isActive}
                  onChange={(e) =>
                    setRoomForm((prev) => ({ ...prev, isActive: e.target.checked }))
                  }
                />
                <span>Active room type</span>
              </label>
            </div>

            <div className="ptrpm-modal-actions">
              <button className="ptrpm-secondary-btn" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button className="ptrpm-primary-btn" onClick={handleSaveRoom} disabled={roomSaving}>
                {roomSaving ? "Saving..." : "Save Room Type"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyManagement;
