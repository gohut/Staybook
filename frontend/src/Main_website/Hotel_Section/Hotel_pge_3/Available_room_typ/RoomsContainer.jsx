// RoomsContainer.jsx
import { useNavigate } from "react-router-dom";
import {
  FaUtensils,
  FaGlassCheers,
  FaSpa,
  FaChevronRight,
} from "react-icons/fa";
import "./RoomsContainer.scss";

const RoomImage = ({ photos }) => (
  <div className="room-img">
    <span className="photo-badge">{photos} PHOTOS</span>
    <FaChevronRight className="img-arrow" />
  </div>
);

const Specs = ({ items }) => (
  <ul className="specs">
    {items.map((i, idx) => (
      <li key={idx}>{i}</li>
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

const RatePlan = ({ title, price, taxes, cta }) => {
  const navigate = useNavigate();

  return (
    <div className="rate-plan">
      <div>
        <h4>{title}</h4>

        <ul className="benefits">
          <li><FaUtensils /> Breakfast included</li>
          <li><FaUtensils /> Lunch or Dinner included</li>
          <li><FaGlassCheers /> 10% off on Food & Beverage services</li>
          <li><FaSpa /> 10% off on session of Spa</li>
          <li>• Non-Refundable</li>
        </ul>

        <a className="link">More Details</a>
        <Experience />
      </div>

      <div className="price-box">
        <div className="price">₹ {price.toLocaleString()}</div>
        <div className="taxes">
          + ₹ {taxes.toLocaleString()} Taxes & Fees per night
        </div>
        <button className="cta" onClick={() => navigate("/hotel4")}>
          {cta}
        </button>
        <div className="login-hint">
          Login Now and get this for <b>₹{(price - 139).toLocaleString()}</b> or less
        </div>
      </div>
    </div>
  );
};

const RoomCard = ({ recommend, name, photos, specs, ratePlans }) => (
  <div className="room-card">
    {recommend && (
      <div className="recommend">
        <span className="badge">MMT RECOMMENDS</span>
        Enjoy Free Breakfast + Lunch/Dinner throughout your stay for just ₹1500 more!
      </div>
    )}

    <div className="room-grid">
      <div className="left">
        <RoomImage photos={photos} />
        <h3>{name}</h3>
        <Specs items={specs} />
        <a className="link">More Details</a>
      </div>

      <div className="right">
        {ratePlans.map((r, i) => (
          <RatePlan key={i} {...r} />
        ))}
      </div>
    </div>
  </div>
);

const RoomsContainer = () => {
  return (
    <div className="rooms-wrapper">
      <RoomCard
        recommend
        name="Deluxe Room King Bed"
        photos={4}
        specs={[
          "342 sq.ft (32 sq.mt)",
          "1 King Bed",
          "1 Bathroom",
          "In-room Dining",
          "Daily Housekeeping",
          "Air Conditioning",
          "Laundry Service",
        ]}
        ratePlans={[
          {
            title: "Room with Breakfast + Lunch/Dinner",
            price: 13999,
            taxes: 2933,
            cta: "SELECT ROOM",
          },
        ]}
      />

      <div className="room-types">
        <b>2 Room Types</b>
        <div className="filters">
          <button className="active">Breakfast Included</button>
          <button>Breakfast & Lunch/Dinner Included</button>
        </div>
      </div>

      <RoomCard
        name="Rock Suite with 30 Mins Couple Massage (Once Per Stay)"
        photos={9}
        specs={[
          "593 sq.ft (55 sq.mt)",
          "1 King Bed",
          "1 Bathroom",
          "24-hour In-room Dining",
          "Iron/Ironing Board",
          "Laundry Service",
        ]}
        ratePlans={[
          {
            title: "Room with Breakfast",
            price: 17999,
            taxes: 3771,
            cta: "BOOK NOW",
          },
          {
            title: "Room with Breakfast + Lunch/Dinner",
            price: 19499,
            taxes: 4085,
            cta: "BOOK NOW",
          },
        ]}
      />

      <RoomCard
        name="Rock Platinum Suite with 30 Mins Couple Massage (Once Per Stay)"
        photos={9}
        specs={[
          "840 sq.ft (78 sq.mt)",
          "Swimming Pool View",
          "1 King Bed",
          "1 Bathroom",
          "24-hour In-room Dining",
          "Laundry Service",
        ]}
        ratePlans={[
          {
            title: "Room with Breakfast",
            price: 20000,
            taxes: 4190,
            cta: "BOOK NOW",
          },
          {
            title: "Room with Breakfast + Lunch/Dinner",
            price: 21500,
            taxes: 4504,
            cta: "BOOK NOW",
          },
        ]}
      />
    </div>
  );
};

export default RoomsContainer;
