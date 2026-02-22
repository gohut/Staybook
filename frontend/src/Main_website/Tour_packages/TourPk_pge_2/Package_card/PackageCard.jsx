// PackageCard.jsx
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./PackageCard.scss";

export default function PackageCard({ data }) {
  const navigate = useNavigate();

  return (
    <div className="pkg-card" onClick={() => navigate("/tourpkge3")}>
      <img className="pkg-img" src={data.image} alt={data.title} />

      <div className="pkg-body">
        <div className="pkg-title-row">
          <h3>{data.title}</h3>
          <span className="pkg-tag">{data.duration}</span>
        </div>

        <p className="pkg-sub">{data.itinerary}</p>

        <div className="pkg-divider" />

        <div className="pkg-info">
          <ul>
            <li>• {data.hotelCategory}</li>
            <li>• {data.meals}</li>
          </ul>
          <ul>
            <li>• {data.activities}</li>
          </ul>
        </div>

        <div className="pkg-free">
          {data.freebies.map((freeItem) => (
            <span key={freeItem}>
              <FaCheckCircle /> {freeItem}
            </span>
          ))}
        </div>

        <button className="pkg-book">{data.bookOffer}</button>

        <div className="pkg-price-box">
          <div className="pkg-emi">
            <span>No Cost EMI at</span>
            <strong>{data.emi}</strong>
          </div>

          <div className="pkg-price">
            <strong>Rs{data.pricePerPerson}</strong>
            <span>/Person</span>
            <p>Total Price Rs{data.totalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
