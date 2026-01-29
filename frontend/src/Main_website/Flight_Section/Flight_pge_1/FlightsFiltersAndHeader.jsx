// FlightsFiltersAndHeader.jsx
import "./FlightsFiltersAndHeader.css";
import { useMemo, useState } from "react";
import {
  FaCheckSquare,
  FaRegSquare,
  FaChevronLeft,
  FaChevronRight,
  FaRegCreditCard,
  FaBolt,
  FaStar,
  FaSlidersH,
  FaTimes,
} from "react-icons/fa";

const FILTERS = [
  { id: "nonstop", label: "Non Stop", price: "₹ 7,018" },
  { id: "nearby", label: "Hide Nearby Airports", price: "₹ 7,018" },
  { id: "refundable", label: "Refundable Fares", price: "₹ 7,018" },
  { id: "1stop", label: "1 Stop", price: "₹ 9,106" },
];

export default function FlightsFiltersAndHeader() {
  const [selected, setSelected] = useState(new Set(["nonstop"])); // default like screenshot

  const applied = useMemo(() => {
    return FILTERS.filter((f) => selected.has(f.id));
  }, [selected]);

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const removeApplied = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const clearAll = () => setSelected(new Set());

  return (
    <section className="ffh-wrap">
      {/* LEFT FILTERS */}
      <aside className="ffh-left">
        <div className="ffh-filterCard">
          <div className="ffh-filterTop">
            <div>
              <h4>Applied Filters</h4>

              <div className="ffh-pillRow">
                {applied.length === 0 ? (
                  <span className="ffh-pillEmpty">No filters applied</span>
                ) : (
                  applied.map((f) => (
                    <span key={f.id} className="ffh-pill">
                      {f.label.toUpperCase()}
                      <button
                        className="ffh-pillClose"
                        onClick={() => removeApplied(f.id)}
                        aria-label={`remove ${f.label}`}
                        type="button"
                      >
                        <FaTimes />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            <button className="ffh-clearAll" onClick={clearAll} type="button">
              CLEAR ALL
            </button>
          </div>

          <div className="ffh-filterSection">
            <h5>Popular Filters</h5>

            {FILTERS.map((f) => {
              const active = selected.has(f.id);
              return (
                <button
                  key={f.id}
                  type="button"
                  className={`ffh-filterItem ${active ? "active" : ""}`}
                  onClick={() => toggle(f.id)}
                >
                  <span className="ffh-check">
                    {active ? <FaCheckSquare /> : <FaRegSquare />}
                  </span>
                  <span className="ffh-filterText">{f.label}</span>
                  <span className="ffh-price">{f.price}</span>
                </button>
              );
            })}

            <button className="ffh-more" type="button">
              + 4 more
            </button>
          </div>
        </div>
      </aside>

      {/* RIGHT HEADER */}
      <main className="ffh-right">
        <h2 className="ffh-title">Flights from New Delhi to Bengaluru</h2>

        <div className="ffh-cardsRow">
          <div className="ffh-promoCard">
            <div className="ffh-promoIcon">
              <FaRegCreditCard />
            </div>
            <div className="ffh-promoText">
              <div className="ffh-promoHead">Flat 10% Instant Discount ...</div>
              <div className="ffh-promoSub">on IDFC FIRST Bank Credit Car...</div>
            </div>
          </div>

          <div className="ffh-promoCard">
            <img
              className="ffh-promoImg"
              src="https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&w=240&q=60"
              alt="promo"
            />
            <div className="ffh-promoText">
              <div className="ffh-promoHead">Meet and Greet & Porter S...</div>
              <div className="ffh-promoSub">Elevate your travel experience ...</div>
            </div>
          </div>
        </div>

        <div className="ffh-dateStrip">
          <button className="ffh-navBtn" type="button">
            <FaChevronLeft />
          </button>

          <div className="ffh-dateRow">
            <button className="ffh-day" type="button">
              <span>Mon, Jan 26</span>
              <strong>₹ 8,075</strong>
            </button>

            <button className="ffh-day active" type="button">
              <span>Tue, Jan 27</span>
              <strong>₹ 7,018</strong>
            </button>

            <button className="ffh-day green" type="button">
              <span>Wed, Jan 28</span>
              <strong>₹ 6,024</strong>
            </button>

            <button className="ffh-day green" type="button">
              <span>Thu, Jan 29</span>
              <strong>₹ 6,024</strong>
            </button>

            <button className="ffh-day green" type="button">
              <span>Fri, Jan 30</span>
              <strong>₹ 6,024</strong>
            </button>

            <button className="ffh-day" type="button">
              <span>Sat, Jan 31</span>
              <strong>₹ 6,024</strong>
            </button>

            <button className="ffh-day green" type="button">
              <span>Sun, Feb 1</span>
              <strong>₹ 6,797</strong>
            </button>

            <button className="ffh-day green" type="button">
              <span>Mon, Feb 2</span>
              <strong>₹ 6,024</strong>
            </button>
          </div>

          <button className="ffh-navBtn" type="button">
            <FaChevronRight />
          </button>
        </div>

        <div className="ffh-sortRow">
          <button className="ffh-sortBox active" type="button">
            <span className="ffh-sortIcon blue">₹</span>
            <div>
              <div className="ffh-sortHead">CHEAPEST</div>
              <div className="ffh-sortSub">₹ 7,018 | 03h</div>
            </div>
          </button>

          <button className="ffh-sortBox" type="button">
            <span className="ffh-sortIcon">
              <FaBolt />
            </span>
            <div>
              <div className="ffh-sortHead">NONSTOP FIRST</div>
              <div className="ffh-sortSub">₹ 7,018 | 03h</div>
            </div>
          </button>

          <button className="ffh-sortBox" type="button">
            <span className="ffh-sortIcon">
              <FaStar />
            </span>
            <div>
              <div className="ffh-sortHead">YOU MAY PREFER</div>
              <div className="ffh-sortSub">₹ 7,018 | 03h</div>
            </div>
          </button>

          <button className="ffh-sortBox small" type="button">
            <span className="ffh-sortIcon">
              <FaSlidersH />
            </span>
            <div>
              <div className="ffh-sortHead">Other</div>
              <div className="ffh-sortSub">Sort</div>
            </div>
          </button>
        </div>

        <div className="ffh-subtitle">
          Flights sorted by Lowest fares on this route
        </div>
      </main>
    </section>
  );
}
