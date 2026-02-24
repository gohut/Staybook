// RoomsContainer.jsx
import { useMemo, useState } from "react";
import {
  FaUtensils,
  FaGlassCheers,
  FaSpa,
  FaChevronRight,
  FaChevronLeft,
  FaTimes,
} from "react-icons/fa";
import "./RoomsContainer.scss";

const RoomImage = ({ photos, onClick }) => (
  <div className="room-img" onClick={onClick} role="button">
    <span className="photo-badge">{photos} PHOTOS</span>
    <FaChevronRight className="img-arrow" />
  </div>
);

const Specs = ({ items }) => (
  <ul className="specs">
    {items.map((item, idx) => (
      <li key={idx}>{item}</li>
    ))}
  </ul>
);

const Experience = () => (
  <div className="experience">
    <b>Experiences Included</b>
    <p>
      <FaGlassCheers /> Enjoy Happy Hours with 1+1 offer
    </p>
  </div>
);

const RatePlan = ({ title, price, taxes, cta, onSelect }) => {
  return (
    <div className="rate-plan">
      <div>
        <h4>{title}</h4>

        <ul className="benefits">
          <li><FaUtensils /> Breakfast included</li>
          <li><FaUtensils /> Lunch or Dinner included</li>
          <li><FaGlassCheers /> 10% off on Food & Beverage services</li>
          <li><FaSpa /> 10% off on session of Spa</li>
          <li>- Non-Refundable</li>
        </ul>

        <a className="link">More Details</a>
        <Experience />
      </div>

      <div className="price-box">
        <div className="price">Rs {price.toLocaleString()}</div>
        <div className="taxes">
          + Rs {taxes.toLocaleString()} Taxes & Fees per night
        </div>
        <button className="cta" onClick={onSelect}>
          {cta}
        </button>
        <div className="login-hint">
          Login Now and get this for <b>Rs {(price - 139).toLocaleString()}</b> or less
        </div>
      </div>
    </div>
  );
};

const RoomCard = ({ recommend, room, photos, onSelect, onPreview }) => (
  <div className="room-card">
    {recommend && (
      <div className="recommend">
        <span className="badge">MMT RECOMMENDS</span>
        Enjoy Free Breakfast + Lunch/Dinner throughout your stay for just Rs 1500 more!
      </div>
    )}

    <div className="room-grid">
      <div className="left">
        <RoomImage photos={photos.length} onClick={onPreview} />
        <h3>{room.name}</h3>
        <Specs items={room.specs} />
        <a className="link">More Details</a>
      </div>

      <div className="right">
        {room.ratePlans.map((plan, i) => (
          <RatePlan key={i} {...plan} onSelect={onSelect} />
        ))}
      </div>
    </div>
  </div>
);

const RoomViewer = ({ photos, activeIndex, onClose, onPrev, onNext, onSelect }) => {
  if (!photos.length) return null;
  return (
    <div className="room-viewer">
      <div className="room-viewer-content">
        <button className="room-viewer-close" onClick={onClose}>
          <FaTimes />
        </button>
        <button className="room-viewer-nav left" onClick={onPrev}>
          <FaChevronLeft />
        </button>
        <img src={photos[activeIndex]} alt="Room preview" />
        <button className="room-viewer-nav right" onClick={onNext}>
          <FaChevronRight />
        </button>
        <button className="room-viewer-cta" onClick={onSelect}>
          Select This Room
        </button>
      </div>
    </div>
  );
};

const RoomsContainer = ({ roomTypes = [], roomPhotos = {}, onSelectRoom }) => {
  const [viewer, setViewer] = useState({ open: false, roomId: null, index: 0 });

  const rooms = useMemo(() => {
    if (!roomTypes.length) {
      return [
        {
          id: "sample-room",
          name: "Deluxe Room King Bed",
          specs: [
            "342 sq.ft (32 sq.mt)",
            "1 King Bed",
            "1 Bathroom",
            "In-room Dining",
            "Daily Housekeeping",
            "Air Conditioning",
            "Laundry Service",
          ],
          ratePlans: [
            {
              title: "Room with Breakfast + Lunch/Dinner",
              price: 13999,
              taxes: 2933,
              cta: "SELECT ROOM",
            },
          ],
          photos: [],
        },
      ];
    }

    return roomTypes.map((room) => ({
      id: room.id,
      name: room.name || "Room Type",
      specs: [
        room.roomSizeSqFt ? `${room.roomSizeSqFt} sq.ft` : "Spacious room",
        room.bedType || "Comfortable bed",
        room.maxGuests ? `Fits ${room.maxGuests} Guests` : "Fits 2 Guests",
        room.totalRooms ? `${room.totalRooms} rooms available` : "Limited rooms",
      ].filter(Boolean),
      ratePlans: [
        {
          title: "Room with Breakfast",
          price: room.basePrice ? Math.round(room.basePrice) : 12000,
          taxes: room.basePrice ? Math.round(room.basePrice * 0.2) : 2400,
          cta: "BOOK NOW",
        },
      ],
      photos: roomPhotos[room.id] || [],
      raw: room,
    }));
  }, [roomTypes, roomPhotos]);

  const activeRoom = rooms.find((room) => room.id === viewer.roomId);
  const activePhotos = activeRoom?.photos || [];

  const openViewer = (room) => {
    if (!room.photos?.length) return;
    setViewer({ open: true, roomId: room.id, index: 0 });
  };

  const closeViewer = () => setViewer({ open: false, roomId: null, index: 0 });

  const next = () =>
    setViewer((prev) => ({
      ...prev,
      index: (prev.index + 1) % activePhotos.length,
    }));

  const prev = () =>
    setViewer((prev) => ({
      ...prev,
      index: prev.index === 0 ? activePhotos.length - 1 : prev.index - 1,
    }));

  return (
    <div className="rooms-wrapper">
      {rooms.map((room, index) => (
        <RoomCard
          key={room.id}
          recommend={index === 0}
          room={room}
          photos={room.photos}
          onSelect={() => onSelectRoom?.(room.raw || room)}
          onPreview={() => openViewer(room)}
        />
      ))}

      {viewer.open && (
        <RoomViewer
          photos={activePhotos}
          activeIndex={viewer.index}
          onClose={closeViewer}
          onPrev={prev}
          onNext={next}
          onSelect={() => {
            if (activeRoom?.raw) {
              onSelectRoom?.(activeRoom.raw);
            }
            closeViewer();
          }}
        />
      )}
    </div>
  );
};

export default RoomsContainer;
