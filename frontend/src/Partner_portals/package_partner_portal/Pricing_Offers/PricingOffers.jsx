import { useMemo, useState } from "react";
import { FiCalendar, FiSliders, FiTrendingUp } from "react-icons/fi";
import PPCard from "../Common/PPCard";
import PPBadge from "../Common/PPBadge";
import "./PricingOffers.scss";

const buildDates = () => {
  const dates = [];
  const now = new Date();
  for (let i = 0; i < 7; i += 1) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    dates.push({
      id: date.toISOString().slice(0, 10),
      label: date.toISOString().slice(0, 10),
      price: 6800 + i * 120,
    });
  }
  return dates;
};

const PricingOffers = ({ readOnly, packages }) => {
  const [basePrice, setBasePrice] = useState(6800);
  const [discount, setDiscount] = useState(8);
  const [markup, setMarkup] = useState(450);
  const [emiEnabled, setEmiEnabled] = useState(true);
  const [groupDiscount, setGroupDiscount] = useState(5);
  const [calendarPrices, setCalendarPrices] = useState(buildDates());

  const finalPrice = useMemo(() => {
    const discounted = basePrice - (basePrice * discount) / 100;
    return Math.round(discounted + markup);
  }, [basePrice, discount, markup]);

  const gst = Math.round(finalPrice * 0.05);
  const total = finalPrice + gst;

  const handleBulkUpdate = () => {
    setCalendarPrices((prev) =>
      prev.map((item) => ({ ...item, price: finalPrice }))
    );
  };

  return (
    <div className="pp-page pp-pricing">
      {readOnly && (
        <div className="pp-banner">
          Pricing controls are restricted for Sub Partner roles.
        </div>
      )}

      <div className="pp-pricing-header">
        <div>
          <h2 className="pp-section-title">Pricing & Offers</h2>
          <p className="pp-muted">Manage pricing strategies, discounts, and taxes.</p>
        </div>
        <select disabled={readOnly}>
          {packages.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.title}
            </option>
          ))}
        </select>
      </div>

      <div className="pp-grid-2">
        <PPCard title="Base Pricing" subtitle="Core price inputs">
          <div className="pp-form-grid">
            <div className="pp-field">
              <label>Base Price (Rs.)</label>
              <input
                type="number"
                value={basePrice}
                onChange={(event) => setBasePrice(Number(event.target.value))}
                disabled={readOnly}
              />
            </div>
            <div className="pp-field">
              <label>Markup (Rs.)</label>
              <input
                type="number"
                value={markup}
                onChange={(event) => setMarkup(Number(event.target.value))}
                disabled={readOnly}
              />
            </div>
            <div className="pp-field">
              <label>Discount (%)</label>
              <input
                type="range"
                min="0"
                max="30"
                value={discount}
                onChange={(event) => setDiscount(Number(event.target.value))}
                disabled={readOnly}
              />
              <span className="pp-muted">{discount}% applied</span>
            </div>
            <div className="pp-field">
              <label>Group Discount (%)</label>
              <input
                type="number"
                value={groupDiscount}
                onChange={(event) => setGroupDiscount(Number(event.target.value))}
                disabled={readOnly}
              />
            </div>
          </div>
          <div className="pp-inline">
            <label className="pp-inline">
              <input
                type="checkbox"
                checked={emiEnabled}
                onChange={(event) => setEmiEnabled(event.target.checked)}
                disabled={readOnly}
              />
              EMI configuration enabled
            </label>
            <PPBadge tone="info">GST 5%</PPBadge>
          </div>
        </PPCard>

        <PPCard title="Pricing Summary" subtitle="Live calculation">
          <div className="pp-pricing-summary">
            <div>
              <span>Original Price</span>
              <h3>Rs. {basePrice.toLocaleString()}</h3>
            </div>
            <div>
              <span>Discount</span>
              <h3>{discount}%</h3>
            </div>
            <div>
              <span>Final Price</span>
              <h3>Rs. {finalPrice.toLocaleString()}</h3>
            </div>
            <div>
              <span>GST</span>
              <h3>Rs. {gst.toLocaleString()}</h3>
            </div>
            <div>
              <span>Total with Tax</span>
              <h3>Rs. {total.toLocaleString()}</h3>
            </div>
          </div>
          <div className="pp-profit">
            <FiTrendingUp /> Profit Margin: {Math.round((markup / basePrice) * 100)}%
          </div>
        </PPCard>
      </div>

      <div className="pp-grid-2">
        <PPCard title="Calendar Pricing" subtitle="Date-specific overrides">
          <div className="pp-calendar">
            {calendarPrices.map((item) => (
              <div key={item.id} className="pp-calendar-row">
                <div>
                  <FiCalendar /> {item.label}
                </div>
                <input
                  type="number"
                  value={item.price}
                  onChange={(event) =>
                    setCalendarPrices((prev) =>
                      prev.map((row) =>
                        row.id === item.id
                          ? { ...row, price: Number(event.target.value) }
                          : row
                      )
                    )
                  }
                  disabled={readOnly}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            className="pp-btn pp-btn-ghost"
            onClick={handleBulkUpdate}
            disabled={readOnly}
          >
            Apply Bulk Update
          </button>
        </PPCard>

        <PPCard title="Price Comparison" subtitle="Discount vs final price">
          <div className="pp-chart compare">
            {[basePrice, finalPrice, total].map((value, index) => (
              <span key={index} style={{ height: `${value / 100}%` }} />
            ))}
          </div>
          <div className="pp-inline">
            <PPBadge tone="default">Base</PPBadge>
            <PPBadge tone="info">Discounted</PPBadge>
            <PPBadge tone="success">With Tax</PPBadge>
          </div>
        </PPCard>
      </div>

      <PPCard title="Seasonal Offers" subtitle="Campaign controls">
        <div className="pp-inline">
          <div className="pp-offer">
            <FiSliders /> Early Bird (10% off)
          </div>
          <div className="pp-offer">Last Minute (8% off)</div>
          <div className="pp-offer">Festival Special (12% off)</div>
        </div>
      </PPCard>
    </div>
  );
};

export default PricingOffers;
