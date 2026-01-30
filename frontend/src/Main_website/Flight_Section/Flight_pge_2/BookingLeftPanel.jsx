import "./BookingLeftPanel.scss";
import {
  FaChevronRight,
  FaInfoCircle,
  FaSuitcaseRolling,
  FaSuitcase,
  FaCheckCircle,
} from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";

export default function BookingLeftPanel() {
  return (
    <div className="blp-wrap">
      {/* Header row */}
      <div className="blp-topHeader">
        <h2>Complete your booking</h2>

        <div className="blp-steps">
          {["Trip Summary", "Travel Insurance", "Traveller Details", "Seats & Meals", "Add-ons"].map(
            (t) => (
              <button key={t} className="blp-stepBtn" type="button">
                {t}
              </button>
            )
          )}
        </div>
      </div>

      {/* Trip Card */}
      <section className="blp-card">
        <div className="blp-tripHead">
          <div className="blp-tripTitle">
            <h3>New Delhi → Bengaluru</h3>
            <div className="blp-tripSub">
              <span className="blp-pillDate">Tuesday, Jan 27</span>
              <span className="blp-subText">Non Stop · 2h 50m</span>
            </div>
          </div>

          <div className="blp-tripActions">
            <span className="blp-greenTag">CANCELLATION FEES APPLY</span>
            <button className="blp-linkBtn" type="button">
              View Fare Rules <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="blp-airlineRow">
          <div className="blp-airlineLogo">S</div>
          <div className="blp-airlineName">
            <b>SpiceJet</b> <span>SG 142</span>
          </div>

          <div className="blp-economy">
            Economy <span className="blp-ecoBlue">SPICESAVER</span>
          </div>
        </div>

        <div className="blp-routeBox">
          <div className="blp-timeRow">
            <div className="blp-timeCol">
              <b>21:45</b>
              <span className="blp-dot" />
            </div>
            <div className="blp-placeCol">
              <b>New Delhi</b>
              <span>Indira Gandhi International Airport</span>
              <span className="blp-small">2h 50m</span>
            </div>
          </div>

          <div className="blp-timeRow">
            <div className="blp-timeCol">
              <b>00:35</b>
              <span className="blp-dot" />
            </div>
            <div className="blp-placeCol">
              <b>Bengaluru</b>
              <span>Bengaluru International Airport</span>
            </div>
          </div>

          <div className="blp-baggageRow">
            <span>
              <FaSuitcaseRolling className="blp-ic" /> Cabin Baggage: <b>7 Kgs</b>
              (1 piece only) / Adult
            </span>
            <span>
              <FaSuitcase className="blp-ic" /> Check-in Baggage: <b>15 Kgs</b>
              (1 piece only) / Adult
            </span>
          </div>
        </div>
      </section>

      {/* Cancellation Policy */}
      <section className="blp-card blp-policy">
        <div className="blp-cardTop">
          <h4>Cancellation & Date Change Policy</h4>
          <button className="blp-linkBtn" type="button">
            View Policy
          </button>
        </div>

        <div className="blp-policyRow">
          <div className="blp-policyLeft">
            <div className="blp-airlineLogo sm">S</div>
            <div className="blp-policyRoute">DEL-BLR</div>
          </div>

          <div className="blp-policyRight">
            <div className="blp-policyLabel">Cancellation Penalty :</div>

            <div className="blp-policyBar">
              <div className="blp-barLine" />
              <div className="blp-barGreen" />
              <div className="blp-barYellow" />
              <div className="blp-barRed" />
            </div>

            <div className="blp-policyAmounts">
              <span>₹ 5,249</span>
              <span>₹ 6,989</span>
            </div>

            <div className="blp-policyDates">
              <span>Cancel Between (IST): <b>Now</b></span>
              <span><b>27 Jan</b><br/>17:45</span>
              <span><b>27 Jan</b><br/>21:45</span>
            </div>
          </div>
        </div>
      </section>

      {/* Upgrade Fare */}
      <section className="blp-card">
        <h4 className="blp-upTitle">Get more benefits by upgrading your fare</h4>

        <div className="blp-upGrid">
          <div className="blp-upBox active">
            <div className="blp-upHead">
              <span className="blp-radio on" />
              <div>
                <div className="blp-upName">Your Selection</div>
                <div className="blp-upPrice">₹ 6,989</div>
              </div>
            </div>

            <ul className="blp-list">
              <li><MdCancel /> Flight delay protection benefit not included</li>
              <li><MdCancel /> Date Change fee starts at ₹ 2,999 up to 4 hrs before departure</li>
              <li><MdCancel /> Seats Chargeable</li>
              <li><FaCheckCircle /> Cabin bag 7 Kgs + Check-in 15 Kgs</li>
            </ul>
          </div>

          <div className="blp-upBox">
            <div className="blp-upHead">
              <span className="blp-radio" />
              <div>
                <div className="blp-upName">MMT Regular</div>
                <div className="blp-upPrice">
                  <span className="blp-strike">₹ 7,584</span> ₹ 7,130
                </div>
              </div>
            </div>

            <ul className="blp-list">
              <li><FaCheckCircle /> Flight Delay Protection included</li>
              <li><FaCheckCircle /> Date Change fee starts at ₹ 2,999 up to 4 hrs before departure</li>
              <li><FaCheckCircle /> Seats worth ₹ 316 included</li>
              <li><FaCheckCircle /> Cabin bag 7 Kgs + Check-in 15 Kgs</li>
            </ul>

            <div className="blp-couponApplied">MMTTRAVEL COUPON APPLIED</div>
          </div>

          <div className="blp-upBox">
            <div className="blp-upHead">
              <span className="blp-radio" />
              <div>
                <div className="blp-upName">MMT Premium</div>
                <div className="blp-upPrice">
                  <span className="blp-strike">₹ 7,882</span> ₹ 7,428
                </div>
              </div>
            </div>

            <ul className="blp-list">
              <li><FaCheckCircle /> Flight Delay Protection included</li>
              <li><FaCheckCircle /> Free date change upto 4 hours before departure</li>
              <li><FaCheckCircle /> Seats worth ₹ 316 included</li>
              <li><FaCheckCircle /> Cabin bag 7 Kgs + Check-in 15 Kgs</li>
            </ul>

            <div className="blp-couponApplied">MMTTRAVEL COUPON APPLIED</div>
          </div>
        </div>

        <div className="blp-noteRed">
          <IoIosInformationCircleOutline /> Just a click for a better trip. Upgrade now!
        </div>
      </section>

      {/* Important Info */}
      <section className="blp-card">
        <h4 className="blp-upTitle">Important Information</h4>

        <div className="blp-info">
          <div className="blp-infoItem">
            <FaInfoCircle className="blp-infoIc" />
            <div>
              <b>Check travel guidelines and baggage information below :</b>
              <p>Carry no more than 1 check-in baggage and 1 hand baggage per passenger. If violated, airline may levy extra charges.</p>
            </div>
          </div>

          <div className="blp-infoItem">
            <FaInfoCircle className="blp-infoIc" />
            <div>
              <b>Availability of Boarding Pass:</b>
              <p>Once web check-in is completed, your boarding pass will be available within 6 hours of flight departure.</p>
            </div>
          </div>

          <div className="blp-infoItem">
            <FaInfoCircle className="blp-infoIc" />
            <div>
              <b>Unaccompanied Minors Travelling:</b>
              <p>Unaccompanied minor policy varies by airlines. Please check airline rules for details.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
