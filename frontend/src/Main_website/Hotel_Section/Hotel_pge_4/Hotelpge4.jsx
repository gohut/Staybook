import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopNavbar from "../../Top_Navbar/TopNavbar";
import "./hotelpge4.scss";
import ReviewBooking from "./Review_Booking/ReviewBooking";
import GuestAndRequest from "./Guest_reqest/GuestAndRequest";
import {
  addDays,
  formatDisplayDate,
  HOTEL_SEARCH_STORAGE_KEY,
  readStoredSearch,
  writeStoredSearch,
} from "../../common/searchState";
import {
  createHotelBooking,
  createTravelerBooking,
  hasValidAuthToken,
} from "../../../Api/booking/bookingApi";
import { getPublicHotel } from "../../../Api/publicHotels/publicHotelsApi";

const calcNights = (checkIn, checkOut) => {
  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return Math.max(1, diff || 1);
};

export default function Hotelpge4() {
  const location = useLocation();
  const navigate = useNavigate();
  const storedSearch = readStoredSearch(HOTEL_SEARCH_STORAGE_KEY) || {};
  const bookingSelection = useMemo(() => {
    if (location.state?.hotelId) return location.state;
    const stored = localStorage.getItem("staybook_booking_selection");
    return stored ? JSON.parse(stored) : {};
  }, [location.state]);

  const [hotelDetails, setHotelDetails] = useState(null);
  const [checkInDate, setCheckInDate] = useState(
    storedSearch.checkInDate || addDays(new Date().toISOString().slice(0, 10), 7)
  );
  const [checkOutDate, setCheckOutDate] = useState(
    storedSearch.checkOutDate || addDays(checkInDate, 1)
  );
  const [adults, setAdults] = useState(storedSearch.adults || 2);
  const [children, setChildren] = useState(storedSearch.children || 0);
  const [guestDetails, setGuestDetails] = useState({
    title: "Mr",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [extraGuests, setExtraGuests] = useState([]);
  const [payLater, setPayLater] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [showPayLaterModal, setShowPayLaterModal] = useState(false);

  useEffect(() => {
    const loadHotel = async () => {
      if (!bookingSelection?.hotelId) return;
      const data = await getPublicHotel(bookingSelection.hotelId);
      setHotelDetails(data);
    };
    loadHotel();
  }, [bookingSelection]);

  useEffect(() => {
    writeStoredSearch(HOTEL_SEARCH_STORAGE_KEY, {
      ...storedSearch,
      checkInDate,
      checkOutDate,
      adults,
      children,
    });
  }, [checkInDate, checkOutDate, adults, children]);

  const nights = calcNights(checkInDate, checkOutDate);
  const bookingAmount = Math.max(
    0,
    (bookingSelection?.basePrice || 0) * nights
  );
  const locationLabel =
    hotelDetails?.location?.city ||
    hotelDetails?.location?.address ||
    bookingSelection?.location ||
    "Staybook Hotel";

  const handleDateChange = (field, value) => {
    if (field === "checkIn") {
      setCheckInDate(value);
      if (new Date(value) >= new Date(checkOutDate)) {
        setCheckOutDate(addDays(value, 1));
      }
    } else {
      setCheckOutDate(value);
    }
  };

  const handleAddGuest = () => {
    setExtraGuests((prev) => [...prev, { title: "Mr", firstName: "", lastName: "" }]);
  };

  const handleExtraGuestChange = (index, field, value) => {
    setExtraGuests((prev) =>
      prev.map((guest, i) => (i === index ? { ...guest, [field]: value } : guest))
    );
  };

  const handleConfirmBooking = async () => {
    setBookingError("");
    if (!agreed) {
      setBookingError("Please agree to terms and conditions before proceeding.");
      return;
    }

    setBookingLoading(true);
    try {
      const guestNames = [
        `${guestDetails.firstName} ${guestDetails.lastName}`.trim(),
        ...extraGuests.map((guest) => `${guest.firstName} ${guest.lastName}`.trim()),
      ].filter(Boolean);

      const bookingPayload = {
        hotelName: bookingSelection?.hotelName || hotelDetails?.name || "Staybook Hotel",
        guestNames,
        guestEmail: guestDetails.email || "",
        bookingAmount,
        checkInDate,
        checkOutDate,
        adultCount: adults,
        childrenCount: children,
        paymentStatus: "PENDING",
        bookingStatus: "CONFIRMED",
      };

      const booking = await createHotelBooking(bookingPayload);
      const bookingId = booking.bookingId;

      if (hasValidAuthToken()) {
        try {
          await createTravelerBooking({
            bookingId,
            hotelName: bookingPayload.hotelName,
            location: locationLabel,
            roomType: bookingSelection?.roomTypeName || "Room",
            checkInDate,
            checkOutDate,
            guestsCount: adults + children,
            nights,
            totalPaid: payLater ? 0 : 0,
            currency: bookingSelection?.currency || "INR",
            status: "CONFIRMED",
            imageUrl: bookingSelection?.imageUrl || "",
          });
        } catch (err) {
          console.warn("Traveler booking sync failed:", err);
        }
      }

      localStorage.setItem("staybook_latest_booking_id", bookingId);

      if (payLater) {
        setShowPayLaterModal(true);
      } else {
        navigate("/hotel5", {
          state: { bookingId, amount: bookingAmount, currency: bookingSelection?.currency || "INR" },
        });
      }
    } catch (err) {
      setBookingError(err?.message || "Failed to confirm booking.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div>
      <TopNavbar />
      <div className="review-booking-wrapper">
        <div className="review-booking-header">Review your Booking</div>

        <div className="booking-date-bar">
          <div>
            <label>Check In</label>
            <input
              type="date"
              value={checkInDate}
              onChange={(event) => handleDateChange("checkIn", event.target.value)}
            />
          </div>
          <div>
            <label>Check Out</label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(event) => handleDateChange("checkOut", event.target.value)}
            />
          </div>
        </div>

        <ReviewBooking
          hotel={hotelDetails}
          bookingSelection={bookingSelection}
          checkInDateLabel={formatDisplayDate(checkInDate)}
          checkOutDateLabel={formatDisplayDate(checkOutDate)}
          nights={nights}
          adults={adults}
          children={children}
          locationLabel={locationLabel}
        />

        <GuestAndRequest
          guestDetails={guestDetails}
          onGuestChange={(field, value) =>
            setGuestDetails((prev) => ({ ...prev, [field]: value }))
          }
          extraGuests={extraGuests}
          onAddGuest={handleAddGuest}
          onExtraGuestChange={handleExtraGuestChange}
          payLater={payLater}
          onPayLaterChange={setPayLater}
          agreed={agreed}
          onAgreeChange={setAgreed}
          onConfirmBooking={handleConfirmBooking}
          bookingLoading={bookingLoading}
          bookingError={bookingError}
          showPayLaterModal={showPayLaterModal}
          onClosePayLaterModal={() => setShowPayLaterModal(false)}
        />
      </div>
    </div>
  );
}
