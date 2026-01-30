import React from 'react'
import TopNavbar from '../../Top_Navbar/TopNavbar'
import HotelOverview from './Hotel_overview/HotelOverview'
import RoomsContainer from './Available_room_typ/RoomsContainer'
import LocationSection from './Location_sec/LocationSection'
import './hotelpge3.scss'
import GuestPhotos from './Photos_section/GuestPhotos'
import UserReviews from './User_review/UserReviews'
export default function Hotelpge3() {
  return (
    <div>
        <TopNavbar/>
        
<div className="searchbar-row">
  <div className="search-field large">
    <label>CITY, AREA OR PROPERTY</label>
    <div className="value">Hard Rock Hotel Goa Calangute, Goa</div>
  </div>

  <div className="search-field">
    <label>CHECK-IN</label>
    <div className="value">Sat, 24 Jan 2026</div>
  </div>

  <div className="search-field">
    <label>CHECK-OUT</label>
    <div className="value">Sun, 25 Jan 2026</div>
  </div>

  <div className="search-field">
    <label>ROOMS & GUESTS</label>
    <div className="value">1 Room, 2 Adults</div>
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
  <span className="current">Hard Rock Hotel Goa Calangute</span>
</div>
   <HotelOverview/>
   <RoomsContainer/>
   <LocationSection/>
   <GuestPhotos/>
   <UserReviews/>

    </div>
  )
}
