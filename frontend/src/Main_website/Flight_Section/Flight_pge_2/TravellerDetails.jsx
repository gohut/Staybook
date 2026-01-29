import "./TravellerDetails.css";
import { FaUserCircle, FaUser, FaInfoCircle, FaChevronDown } from "react-icons/fa";

export default function TravellerDetails() {
  return (
    <section className="td-wrap">
      <div className="td-head">
        <h3>Traveller Details</h3>
      </div>

      <div className="td-loginRow">
        <div className="td-loginLeft">
          <FaUserCircle className="td-loginIc" />
          <span>
            Log in to view your saved traveller list, unlock amazing deals & much more!
          </span>
        </div>
        <button className="td-loginBtn" type="button">
          LOGIN NOW
        </button>
      </div>

      <div className="td-adultRow">
        <div className="td-adultLeft">
          <FaUser className="td-smallIc" />
          <b>ADULT (12 yrs+)</b>
        </div>
        <div className="td-adultRight">0/1 added</div>
      </div>

      <div className="td-important">
        <FaInfoCircle className="td-infoIc" />
        <span>
          <b>Important:</b> Enter name as mentioned on your passport or Government approved IDs.
        </span>
      </div>

      <div className="td-emptyBox">
        <div className="td-emptyText">You have not added any adults to the list</div>
        <button className="td-addAdult" type="button">
          + ADD NEW ADULT
        </button>
      </div>

      <div className="td-bookingHead">Booking details will be sent to</div>

      <div className="td-formRow">
        <div className="td-field">
          <label>Country Code</label>
          <div className="td-select">
            <span>India(+91)</span>
            <FaChevronDown />
          </div>
        </div>

        <div className="td-field">
          <label>Mobile No</label>
          <input placeholder="Mobile No" />
        </div>

        <div className="td-field">
          <label>Email</label>
          <input placeholder="Email" />
        </div>
      </div>

      <label className="td-gst">
        <input type="checkbox" />
        <span className="td-box" />
        I have a GST number <span className="td-muted">(Optional)</span>
      </label>
    </section>
  );
}
