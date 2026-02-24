import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopNavbar from "../../Top_Navbar/TopNavbar";
import HotelOverview from "./Hotel_overview/HotelOverview";
import RoomsContainer from "./Available_room_typ/RoomsContainer";
import LocationSection from "./Location_sec/LocationSection";
import "./hotelpge3.scss";
import GuestPhotos from "./Photos_section/GuestPhotos";
import UserReviews from "./User_review/UserReviews";
import {
  formatDisplayDate,
  HOMESTAY_SEARCH_STORAGE_KEY,
  readStoredSearch,
} from "../../common/searchState";
import { getPublicHotel, listPublicHotels, getPublicHotelPhotoUrl } from "../../../Api/publicHotels/publicHotelsApi";
export default function Hotelpge3() {
  const location = useLocation();
  const navigate = useNavigate();
  const storedSearch = readStoredSearch(HOMESTAY_SEARCH_STORAGE_KEY) || {};
  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const selectedHotelId =
    location.state?.hotelId || localStorage.getItem("staybook_selected_hotel_id");

  useEffect(() => {
    let isActive = true;
    const loadHotel = async () => {
      setLoading(true);
      setError("");
      try {
        let hotelId = selectedHotelId;
        if (!hotelId) {
          const hotels = await listPublicHotels();
          hotelId = hotels?.[0]?.id;
          if (hotelId) {
            localStorage.setItem("staybook_selected_hotel_id", hotelId);
          }
        }
        if (hotelId) {
          const data = await getPublicHotel(hotelId);
          if (!isActive) return;
          setHotelData(data);
        }
      } catch (err) {
        if (!isActive) return;
        setError(err?.message || "Failed to load hotel details.");
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadHotel();

    return () => {
      isActive = false;
    };
  }, [selectedHotelId]);

  const propertyPhotos = useMemo(() => {
    if (!hotelData?.photos) return [];
    return hotelData.photos
      .filter((photo) => !photo.roomTypeId)
      .map((photo) => getPublicHotelPhotoUrl(photo.fileId));
  }, [hotelData]);

  const roomPhotoMap = useMemo(() => {
    if (!hotelData?.photos) return {};
    return hotelData.photos.reduce((acc, photo) => {
      if (!photo.roomTypeId) return acc;
      if (!acc[photo.roomTypeId]) acc[photo.roomTypeId] = [];
      acc[photo.roomTypeId].push(getPublicHotelPhotoUrl(photo.fileId));
      return acc;
    }, {});
  }, [hotelData]);

  const handleSelectRoom = (room) => {
    if (!hotelData) return;
    const bookingSelection = {
      hotelId: hotelData.id,
      hotelName: hotelData.name,
      location:
        hotelData.location?.city || hotelData.location?.address || "Staybook Hotel",
      roomTypeId: room.id,
      roomTypeName: room.name,
      basePrice: room.basePrice || 0,
      currency: room.currency || "INR",
      imageUrl: roomPhotoMap[room.id]?.[0] || propertyPhotos[0] || "",
    };
    localStorage.setItem("staybook_booking_selection", JSON.stringify(bookingSelection));
    navigate("/hotel4", { state: bookingSelection });
  };

  const checkInDateLabel = storedSearch.checkInDate
    ? formatDisplayDate(storedSearch.checkInDate)
    : "Sat, 24 Jan 2026";
  const checkOutDateLabel = storedSearch.checkOutDate
    ? formatDisplayDate(storedSearch.checkOutDate)
    : "Sun, 25 Jan 2026";
  const guestLabel = storedSearch.adults
    ? `${storedSearch.adults} Adults${storedSearch.children ? `, ${storedSearch.children} Children` : ""}`
    : "2 Adults";
  const hotelName = hotelData?.name || "Hard Rock Hotel Goa Calangute";

  return (
    <div>
        <TopNavbar/>

<div className="searchbar-row">
  <div className="search-field large">
    <label>CITY, AREA OR PROPERTY</label>
    <div className="value">{hotelName}</div>
  </div>

  <div className="search-field">
    <label>CHECK-IN</label>
    <div className="value">{checkInDateLabel}</div>
  </div>

  <div className="search-field">
    <label>CHECK-OUT</label>
    <div className="value">{checkOutDateLabel}</div>
  </div>

  <div className="search-field">
    <label>ROOMS & GUESTS</label>
    <div className="value">{guestLabel}</div>
  </div>

  <button className="search-btn">SEARCH</button>
</div>

<div className="breadcrumb-row">
  <span className="link">Home</span>
  <span className="sep">›</span>
  <span className="link">Hotels In Goa</span>
  <span className="sep">›</span>
  <span className="link">Resort In Goa</span>
  <span className="sep">›</span>
  <span className="current">{hotelName}</span>
</div>
  {loading && <div style={{ marginLeft: "120px" }}>Loading hotel details...</div>}
  {error && <div style={{ marginLeft: "120px", color: "red" }}>{error}</div>}
  <HotelOverview hotel={hotelData} photos={propertyPhotos} onSelectRoom={handleSelectRoom} />
  <RoomsContainer
    roomTypes={hotelData?.roomTypes || []}
    roomPhotos={roomPhotoMap}
    onSelectRoom={handleSelectRoom}
  />
  <LocationSection hotel={hotelData} />
  <GuestPhotos />
  <UserReviews
    reviews={hotelData?.reviews || []}
    averageRating={hotelData?.averageRating || 0}
    reviewCount={hotelData?.reviewCount || 0}
  />

    </div>
  )
}
