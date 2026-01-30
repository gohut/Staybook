import React from "react";
import "./SeatSelection.scss";
import { FaChair } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SeatSelection() {
    const navigate = useNavigate();

  return (
    <section className="ss-wrapV2">
      <div className="ss-cardV2">
        {/* Header */}
        <div className="ss-headV2">
          <div className="ss-headLeftV2">
            <FaChair className="ss-icV2" />
            <h3>Seats</h3>
          </div>
        </div>

        {/* Info bar */}
        <div className="ss-infoV2">
          <span>
            Less than 48 hours left to departure. Pre-book your preferred seat
            now before they run out!
          </span>
          <span className="ss-dotsV2">•••</span>
        </div>

        {/* Route + price */}
        <div className="ss-subV2">
          <div className="ss-routeV2">
            <strong>New Delhi → Bengaluru</strong>
            <div className="ss-subSmallV2">1 of 1 Seat(s) Selected</div>
          </div>

          <div className="ss-priceV2">
            <div className="ss-priceTopV2">₹ 369</div>
            <div className="ss-priceSubV2">Added to fare</div>
          </div>
        </div>

        {/* Seat Area */}
        <div className="ss-seatAreaV2">
          {/* Legend */}
          <div className="ss-legendV2">
            <div className="ss-legItemV2">
              <span className="ss-boxV2 free" /> Free
            </div>
            <div className="ss-legItemV2">
              <span className="ss-boxV2 paid" /> SpiceMax{" "}
              <span className="ss-xV2">Ⓧ</span>
            </div>
            <div className="ss-legItemV2">
              <span className="ss-boxV2 blue" /> ₹ 211-422
            </div>
            <div className="ss-legItemV2">
              <span className="ss-boxV2 empty" /> Exit Row Seats
            </div>
            <div className="ss-legItemV2">
              <span className="ss-boxV2 light" /> Extra Legroom
            </div>
          </div>

          {/* Seats container (NO circled white nose) */}
          <div className="ss-seatGridWrapV2">
            <div className="ss-seatGridHeaderV2">
              <span className="ss-toiletV2">🚻</span>
            </div>

            {/* Column Labels */}
            <div className="ss-colsV2">
              <span />
              <span>A</span>
              <span>B</span>
              <span>C</span>
              <span className="ss-gapV2" />
              <span>D</span>
              <span>E</span>
              <span>F</span>
              <span />
            </div>

            {/* Seats Rows (more like flight) */}
            <div className="ss-rowsV2">
              {Array.from({ length: 20 }).map((_, idx) => {
                const row = idx + 1;

                // row type
                const paid = row <= 4;
                const green = row >= 5 && row <= 8;
                //const blue = row >= 9;

                return ( 
                  <div key={row} className="ss-rowV2">
                    <div className="ss-rowNumV2">{row}</div>

                    {/* A B C */}
                    <div className={`ss-seatV2 ${paid ? "paid" : green ? "free" : "blue"}`}>
                      {paid || green ? "XL" : ""}
                    </div>
                    <div className={`ss-seatV2 ${paid ? "paid" : green ? "free" : "blue"}`}>
                      {paid || green ? "XL" : ""}
                    </div>
                    <div className={`ss-seatV2 ${paid ? "paid" : green ? "free" : "blue"}`}>
                      {paid || green ? "XL" : ""}
                    </div>

                    <div className="ss-gapV2" />

                    {/* D E F */}
                    <div className={`ss-seatV2 ${paid ? "paid" : green ? "free" : "blue"}`}>
                      {paid || green ? "XL" : ""}
                    </div>

                    {/* blocked sample */}
                    {row === 6 ? (
                      <div className="ss-seatV2 blocked">X</div>
                    ) : (
                      <div className={`ss-seatV2 ${paid ? "paid" : green ? "free" : "blue"}`}>
                        {paid || green ? "XL" : ""}
                      </div>
                    )}

                    <div className={`ss-seatV2 ${paid ? "paid" : green ? "free" : "blue"}`}>
                      {paid || green ? "XL" : ""}
                    </div>

                    <div className="ss-rowNumV2 right">{row}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="ss-footerV2">
          <button className="ss-continueV2" onClick={() => navigate("/flight4")}>CONTINUE</button>
          <a className="ss-skipV2" href="#skip">
            Skip to cabs
          </a>
        </div>
      </div>
    </section>
  );
}
