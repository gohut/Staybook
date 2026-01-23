import React from 'react'
import TopNavbar from '../../Top_Navbar/TopNavbar'
import './hotelpge4.css'
import ReviewBooking from './Review_Booking/ReviewBooking'
import GuestAndRequest from './Guest_reqest/GuestAndRequest'
export default function Hotelpge4() {
  return (
    <div>
        <TopNavbar/>
            <div className="review-booking-wrapper">
      <div className="review-booking-header">
        Review your Booking
      </div>
      <ReviewBooking/>
      <GuestAndRequest/>
    </div>
    </div>
  )
}
