// GuestAndRequest.jsx
import "./GuestAndRequest.scss";
import { FaUserPlus, FaBell } from "react-icons/fa";

const GuestAndRequest = ({
  guestDetails,
  onGuestChange,
  extraGuests,
  onAddGuest,
  onExtraGuestChange,
  payLater,
  onPayLaterChange,
  agreed,
  onAgreeChange,
  onConfirmBooking,
  bookingLoading,
  bookingError,
  showPayLaterModal,
  onClosePayLaterModal,
}) => {
  return (
    <div className="guest-wrapper">
      <div className="guest-card">
        <h3>Guest Details</h3>

        <div className="form-row">
          <div className="field small">
            <label>TITLE</label>
            <select
              value={guestDetails.title}
              onChange={(e) => onGuestChange("title", e.target.value)}
            >
              <option>Mr</option>
              <option>Ms</option>
              <option>Mrs</option>
            </select>
          </div>

          <div className="field">
            <label>FULL NAME</label>
            <input
              placeholder="First Name"
              value={guestDetails.firstName}
              onChange={(e) => onGuestChange("firstName", e.target.value)}
            />
          </div>

          <div className="field">
            <label>&nbsp;</label>
            <input
              placeholder="Last Name"
              value={guestDetails.lastName}
              onChange={(e) => onGuestChange("lastName", e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label>
              EMAIL ADDRESS <span>(Booking voucher will be sent to this email ID)</span>
            </label>
            <input
              placeholder="Email ID"
              value={guestDetails.email}
              onChange={(e) => onGuestChange("email", e.target.value)}
            />
          </div>

          <div className="field">
            <label>MOBILE NUMBER</label>
            <div className="mobile">
              <select>
                <option>+91</option>
              </select>
              <input
                placeholder="Contact Number"
                value={guestDetails.phone}
                onChange={(e) => onGuestChange("phone", e.target.value)}
              />
            </div>
          </div>
        </div>

        {extraGuests.map((guest, index) => (
          <div className="form-row" key={`guest-${index}`}>
            <div className="field small">
              <label>TITLE</label>
              <select
                value={guest.title}
                onChange={(e) => onExtraGuestChange(index, "title", e.target.value)}
              >
                <option>Mr</option>
                <option>Ms</option>
                <option>Mrs</option>
              </select>
            </div>

            <div className="field">
              <label>GUEST FIRST NAME</label>
              <input
                placeholder="First Name"
                value={guest.firstName}
                onChange={(e) => onExtraGuestChange(index, "firstName", e.target.value)}
              />
            </div>

            <div className="field">
              <label>GUEST LAST NAME</label>
              <input
                placeholder="Last Name"
                value={guest.lastName}
                onChange={(e) => onExtraGuestChange(index, "lastName", e.target.value)}
              />
            </div>
          </div>
        ))}

        <div className="checkbox">
          <input type="checkbox" />
          <span>
            Enter GST Details <small>(Optional)</small>
          </span>
        </div>

        <div className="add-guest" onClick={onAddGuest} role="button">
          <FaUserPlus />
          <span>Add Guest</span>
        </div>
      </div>

      <div className="request-card">
        <div className="request-left">
          <FaBell />
          <div>
            <h4>Special Requests</h4>
            <p>
              Add any special requests for your stay. These will be sent to the
              property after booking, and they will do their best to accommodate them.
            </p>
          </div>
        </div>
        <button className="request-btn">MAKE A REQUEST</button>
      </div>

      <div className="pay-section">
        <label className="agree">
          <input type="checkbox" checked={agreed} onChange={(e) => onAgreeChange(e.target.checked)} />
          <span>
            By proceeding, I agree to MakeMyTrip's{" "}
            <a href="#">User Agreement</a>, <a href="#">Terms of Service</a> and{" "}
            <a href="#">Cancellation & Property Booking Policies</a>.
          </span>
        </label>

        <label className="pay-later">
          <input
            type="checkbox"
            checked={payLater}
            onChange={(e) => onPayLaterChange(e.target.checked)}
          />
          <span>Confirm booking and pay later</span>
        </label>

        {bookingError && <p className="booking-error">{bookingError}</p>}

        <button className="pay-btn" onClick={onConfirmBooking} disabled={bookingLoading}>
          {bookingLoading ? "Processing..." : payLater ? "BOOK NOW" : "PAY NOW"}
        </button>
      </div>

      {showPayLaterModal && (
        <div className="booking-modal" role="dialog" aria-modal="true">
          <div className="booking-modal-card">
            <p>Booking confirmed, you can pay it later.</p>
            <button className="booking-modal-btn" onClick={onClosePayLaterModal}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestAndRequest;
