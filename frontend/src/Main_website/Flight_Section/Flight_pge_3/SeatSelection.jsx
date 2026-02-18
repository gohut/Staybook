import React, { useState } from "react";
import "./SeatSelection.scss";
import { FaChair } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SeatSelection() {
    const navigate = useNavigate();
    
    // Seat categories with pricing
    const seatCategories = {
        free: { price: 0, label: 'Free', class: 'free' },
        spiceMax: { price: 369, label: 'SpiceMax', class: 'paid' },
        standard: { price: 211, label: 'Standard', class: 'blue' },
        premium: { price: 422, label: 'Premium', class: 'blue' },
        exitRow: { price: 350, label: 'Exit Row', class: 'empty' },
        extraLegroom: { price: 300, label: 'Extra Legroom', class: 'light' }
    };

    // Generate seat data
    const generateSeatData = () => {
        const seats = [];
        const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
        
        for (let row = 1; row <= 20; row++) {
            for (let col of columns) {
                let category = 'standard';
                let isAvailable = true;
                let price = seatCategories.standard.price;
                
                // Define seat categories based on position
                if (row <= 4) {
                    category = 'spiceMax';
                    price = seatCategories.spiceMax.price;
                } else if (row >= 5 && row <= 8) {
                    category = 'free';
                    price = seatCategories.free.price;
                } else if (row >= 9 && row <= 12) {
                    category = 'standard';
                    price = seatCategories.standard.price;
                } else if (row >= 13 && row <= 15) {
                    category = 'premium';
                    price = seatCategories.premium.price;
                } else if (row >= 16 && row <= 17) {
                    category = 'exitRow';
                    price = seatCategories.exitRow.price;
                } else if (row >= 18) {
                    category = 'extraLegroom';
                    price = seatCategories.extraLegroom.price;
                }
                
                // Block some seats (like 6E)
                if (row === 6 && col === 'E') {
                    isAvailable = false;
                    category = 'blocked';
                    price = 0;
                }
                
                // Random availability for realism (deterministic based on seat position)
                if (isAvailable && ((row * col.charCodeAt(0)) % 7 === 0)) {
                    isAvailable = false;
                }
                
                seats.push({
                    id: `${row}${col}`,
                    row,
                    column: col,
                    category,
                    price,
                    isAvailable,
                    isSelected: false
                });
            }
        }
        
        return seats;
    };

    const [seats, setSeats] = useState(generateSeatData());
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // Handle seat selection
    const handleSeatClick = (seatId) => {
        setSeats(prevSeats => {
            const updatedSeats = prevSeats.map(seat => {
                if (seat.id === seatId && seat.isAvailable) {
                    const newSelectedState = !seat.isSelected;
                    
                    if (newSelectedState) {
                        setSelectedSeats(prev => [...prev, seat]);
                        setTotalPrice(prev => prev + seat.price);
                    } else {
                        setSelectedSeats(prev => prev.filter(s => s.id !== seatId));
                        setTotalPrice(prev => prev - seat.price);
                    }
                    
                    return { ...seat, isSelected: newSelectedState };
                }
                return seat;
            });
            return updatedSeats;
        });
    };

    // Get seat display text
    const getSeatDisplayText = (seat) => {
        if (!seat.isAvailable) return 'X';
        if (seat.category === 'spiceMax' || seat.category === 'free') return 'XL';
        if (seat.price > 0) return `₹${seat.price}`;
        return '';
    };

    // Group seats by row for rendering
    const getSeatsByRow = () => {
        const rows = {};
        seats.forEach(seat => {
            if (!rows[seat.row]) {
                rows[seat.row] = [];
            }
            rows[seat.row].push(seat);
        });
        return rows;
    };

    const seatsByRow = getSeatsByRow();

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
            <div className="ss-subSmallV2">{selectedSeats.length} of 1 Seat(s) Selected</div>
          </div>

          <div className="ss-priceV2">
            <div className="ss-priceTopV2">₹ {totalPrice}</div>
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

            {/* Seats Rows */}
            <div className="ss-rowsV2">
              {Object.keys(seatsByRow).map(row => {
                const rowSeats = seatsByRow[row];
                
                return ( 
                  <div key={row} className="ss-rowV2">
                    <div className="ss-rowNumV2">{row}</div>

                    {/* A B C */}
                    {['A', 'B', 'C'].map(col => {
                      const seat = rowSeats.find(s => s.column === col);
                      if (!seat) return <div key={col} className="ss-seatV2" />;
                      
                      return (
                        <div
                          key={col}
                          className={`ss-seatV2 ${seatCategories[seat.category]?.class || 'blocked'} ${seat.isSelected ? 'selected' : ''} ${!seat.isAvailable ? 'blocked' : ''}`}
                          onClick={() => handleSeatClick(seat.id)}
                          style={{ cursor: seat.isAvailable ? 'pointer' : 'not-allowed' }}
                        >
                          {getSeatDisplayText(seat)}
                        </div>
                      );
                    })}

                    <div className="ss-gapV2" />

                    {/* D E F */}
                    {['D', 'E', 'F'].map(col => {
                      const seat = rowSeats.find(s => s.column === col);
                      if (!seat) return <div key={col} className="ss-seatV2" />;
                      
                      return (
                        <div
                          key={col}
                          className={`ss-seatV2 ${seatCategories[seat.category]?.class || 'blocked'} ${seat.isSelected ? 'selected' : ''} ${!seat.isAvailable ? 'blocked' : ''}`}
                          onClick={() => handleSeatClick(seat.id)}
                          style={{ cursor: seat.isAvailable ? 'pointer' : 'not-allowed' }}
                        >
                          {getSeatDisplayText(seat)}
                        </div>
                      );
                    })}

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
