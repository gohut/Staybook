// Availabilitypr.jsx
import { useEffect, useMemo, useState } from "react";
import "./Availabilitypr.scss";
import {
  FiChevronLeft,
  FiChevronRight,
  FiDollarSign,
  FiLock,
  FiCalendar,
  FiX,
} from "react-icons/fi";
import { getHotelDetails, getPartnerHotels } from "../../Api/partner/partnerApi";

const Legend = ({ label, type }) => (
  <div className="legend-item">
    <span className={`legend-dot ${type}`} />
    {label}
  </div>
);

const DayCard = ({ day, price, status, available, active, onClick }) => (
  <button
    className={`day-card ${status} ${active ? "active" : ""}`}
    type="button"
    onClick={onClick}
  >
    <span className="day">{day}</span>
    {price != null && <h4>${price}</h4>}
    {status === "closed" ? (
      <span className="closed">Closed</span>
    ) : (
      available != null && <span className="avail">{available} available</span>
    )}
  </button>
);

const Availabilitypr = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [calendarDays, setCalendarDays] = useState([]);
  const [activeDate, setActiveDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [closeModalOpen, setCloseModalOpen] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [bulkForm, setBulkForm] = useState({
    startDate: "",
    endDate: "",
    price: "",
    rooms: "",
  });

  useEffect(() => {
    const loadRooms = async () => {
      setLoading(true);
      setError("");
      try {
        const hotels = await getPartnerHotels();
        if (hotels && hotels.length > 0) {
          const details = await getHotelDetails(hotels[0].id);
          const types = details?.roomTypes || [];
          setRoomTypes(types);
          if (types.length > 0) {
            setSelectedRoomId(types[0].id);
          }
        }
      } catch (err) {
        setError(err.message || "Failed to load room types.");
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  const selectedRoom = useMemo(
    () => roomTypes.find((room) => room.id === selectedRoomId),
    [roomTypes, selectedRoomId]
  );

  useEffect(() => {
    if (!selectedRoomId) return;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const basePrice = selectedRoom?.basePrice || 0;
    const totalRooms = selectedRoom?.totalRooms || 0;

    const days = Array.from({ length: daysInMonth }, (_, index) => {
      const date = new Date(year, month, index + 1);
      const availability = Math.max(totalRooms - (index % 4), 0);
      let status = "available";
      if (availability === 0) status = "full";
      if (availability > 0 && availability <= 2) status = "low";
      return {
        date,
        day: index + 1,
        price: basePrice,
        available: availability,
        status,
      };
    });

    setCalendarDays(days);
    setActiveDate(null);
  }, [selectedRoomId, currentMonth, selectedRoom]);

  const updateBulkForm = (field, value) => {
    setBulkForm((prev) => ({ ...prev, [field]: value }));
  };

  const applyBulkUpdate = (updater) => {
    const start = bulkForm.startDate ? new Date(bulkForm.startDate) : null;
    const end = bulkForm.endDate ? new Date(bulkForm.endDate) : null;
    if (!start || !end) return;

    setCalendarDays((prev) =>
      prev.map((day) => {
        if (day.date >= start && day.date <= end) {
          return updater(day);
        }
        return day;
      })
    );
  };

  const handleBulkPrice = () => {
    const price = Number(bulkForm.price);
    if (!bulkForm.startDate || !bulkForm.endDate || Number.isNaN(price)) return;
    applyBulkUpdate((day) => ({ ...day, price }));
    setPriceModalOpen(false);
  };

  const handleBulkClose = () => {
    if (!bulkForm.startDate || !bulkForm.endDate) return;
    applyBulkUpdate((day) => ({ ...day, status: "closed", available: 0 }));
    setCloseModalOpen(false);
  };

  const handleBulkBook = () => {
    const rooms = Number(bulkForm.rooms);
    if (!bulkForm.startDate || !bulkForm.endDate || Number.isNaN(rooms)) return;
    applyBulkUpdate((day) => {
      const updatedAvail = Math.max((day.available || 0) - rooms, 0);
      let status = day.status;
      if (updatedAvail === 0) status = "full";
      if (updatedAvail > 0 && updatedAvail <= 2) status = "low";
      if (day.status === "closed") status = "closed";
      return { ...day, available: updatedAvail, status };
    });
    setBookModalOpen(false);
  };

  const monthLabel = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="pr-availability-page">
      <div className="page-head">
        <h2>Availability & Pricing</h2>
        <p>Manage room inventory and pricing</p>
      </div>

      <section className="pra-card pra-filter-bar">
        <div className="pra-filter-left">
          <div className="pra-select-box">
            {loading ? (
              "Loading rooms..."
            ) : roomTypes.length === 0 ? (
              "No room types"
            ) : (
              <select
                value={selectedRoomId}
                onChange={(e) => setSelectedRoomId(e.target.value)}
              >
                {roomTypes.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name} ({room.totalRooms || 0} rooms)
                  </option>
                ))}
              </select>
            )}
          </div>

          <button
            className="pra-icon-btn"
            onClick={() =>
              setCurrentMonth(
                new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
              )
            }
            type="button"
          >
            <FiChevronLeft />
          </button>
          <h3>{monthLabel}</h3>
          <button
            className="pra-icon-btn"
            onClick={() =>
              setCurrentMonth(
                new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
              )
            }
            type="button"
          >
            <FiChevronRight />
          </button>
        </div>

        <div className="filter-right">
          <button className="outline-btn" onClick={() => setPriceModalOpen(true)} type="button">
            <FiDollarSign /> Bulk Price Update
          </button>
          <button className="outline-btn" onClick={() => setBookModalOpen(true)} type="button">
            <FiCalendar /> Bulk Room Booking
          </button>
          <button className="outline-btn" onClick={() => setCloseModalOpen(true)} type="button">
            <FiLock /> Bulk Close Rooms
          </button>
        </div>
      </section>

      {error && <p className="pra-error">{error}</p>}

      <div className="legend">
        <Legend label="Available" type="available" />
        <Legend label="Low Availability" type="low" />
        <Legend label="Fully Booked" type="full" />
        <Legend label="Closed" type="closed" />
      </div>

      <section className="calendar">
        <div className="weekdays">
          <span>Sun</span><span>Mon</span><span>Tue</span>
          <span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>

        <div className="days">
          {calendarDays.map((day) => (
            <DayCard
              key={day.date.toISOString()}
              day={day.day}
              price={day.price}
              status={day.status}
              available={day.available}
              active={activeDate?.toDateString() === day.date.toDateString()}
              onClick={() => setActiveDate(day.date)}
            />
          ))}
        </div>
      </section>

      {(priceModalOpen || closeModalOpen || bookModalOpen) && (
        <div className="pra-modal">
          <div className="pra-modal-content">
            <div className="pra-modal-head">
              <div>
                <h3>
                  {priceModalOpen && "Bulk Price Update"}
                  {closeModalOpen && "Bulk Close Rooms"}
                  {bookModalOpen && "Bulk Room Booking"}
                </h3>
                <p>Select a date range to apply changes.</p>
              </div>
              <button
                className="pra-modal-close"
                type="button"
                onClick={() => {
                  setPriceModalOpen(false);
                  setCloseModalOpen(false);
                  setBookModalOpen(false);
                }}
              >
                <FiX />
              </button>
            </div>

            <div className="pra-modal-grid">
              <label>
                <span>Start Date</span>
                <input
                  type="date"
                  value={bulkForm.startDate}
                  onChange={(e) => updateBulkForm("startDate", e.target.value)}
                />
              </label>
              <label>
                <span>End Date</span>
                <input
                  type="date"
                  value={bulkForm.endDate}
                  onChange={(e) => updateBulkForm("endDate", e.target.value)}
                />
              </label>
              {priceModalOpen && (
                <label className="full">
                  <span>New Price</span>
                  <input
                    type="number"
                    value={bulkForm.price}
                    onChange={(e) => updateBulkForm("price", e.target.value)}
                    placeholder="Enter price"
                  />
                </label>
              )}
              {bookModalOpen && (
                <label className="full">
                  <span>Rooms To Book</span>
                  <input
                    type="number"
                    value={bulkForm.rooms}
                    onChange={(e) => updateBulkForm("rooms", e.target.value)}
                    placeholder="Enter rooms"
                  />
                </label>
              )}
            </div>

            <div className="pra-modal-actions">
              <button
                className="outline-btn"
                type="button"
                onClick={() => {
                  setPriceModalOpen(false);
                  setCloseModalOpen(false);
                  setBookModalOpen(false);
                }}
              >
                Cancel
              </button>
              {priceModalOpen && (
                <button className="primary-btn" type="button" onClick={handleBulkPrice}>
                  Apply Price
                </button>
              )}
              {closeModalOpen && (
                <button className="primary-btn" type="button" onClick={handleBulkClose}>
                  Close Rooms
                </button>
              )}
              {bookModalOpen && (
                <button className="primary-btn" type="button" onClick={handleBulkBook}>
                  Book Rooms
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Availabilitypr;
