import { useEffect, useMemo, useState } from "react";
import { FiPlus, FiSave } from "react-icons/fi";

const seatTypes = ["window", "middle", "aisle", "extra"];

const initialRows = [
  ["window", "middle", "aisle", "aisle", "middle", "window"],
  ["window", "middle", "aisle", "aisle", "middle", "window"],
  ["window", "middle", "aisle", "aisle", "middle", "window"],
  ["window", "middle", "aisle", "aisle", "middle", "window"],
];

const SeatLayoutManager = ({ tab }) => {
  const [activeTab, setActiveTab] = useState(tab || "layouts");
  const [rows, setRows] = useState(initialRows);
  const [pricing, setPricing] = useState({
    window: 350,
    middle: 200,
    aisle: 250,
    extra: 600,
  });

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  const toggleSeatType = (rowIndex, seatIndex) => {
    setRows((prev) => {
      const next = prev.map((row) => [...row]);
      const current = next[rowIndex][seatIndex];
      const nextIndex = (seatTypes.indexOf(current) + 1) % seatTypes.length;
      next[rowIndex][seatIndex] = seatTypes[nextIndex];
      return next;
    });
  };

  const addRow = () => {
    setRows((prev) => [...prev, [...prev[0]]]);
  };

  const bulkGenerate = () => {
    const template = ["window", "middle", "aisle", "aisle", "middle", "window"];
    setRows(Array.from({ length: 12 }, () => [...template]));
  };

  const seatCounts = useMemo(() => {
    const counts = { window: 0, middle: 0, aisle: 0, extra: 0 };
    rows.forEach((row) => row.forEach((seat) => { counts[seat] += 1; }));
    return counts;
  }, [rows]);

  return (
    <div className="fp-card">
      <div className="fp-card-head">
        <div>
          <h3>Seat & Aircraft</h3>
          <p className="fp-muted">Configure cabin layouts, inventory, and seat pricing.</p>
        </div>
        <div className="fp-tab-row">
          <button className={activeTab === "layouts" ? "active" : ""} onClick={() => setActiveTab("layouts")}>Aircraft Layouts</button>
          <button className={activeTab === "inventory" ? "active" : ""} onClick={() => setActiveTab("inventory")}>Seat Inventory</button>
          <button className={activeTab === "pricing" ? "active" : ""} onClick={() => setActiveTab("pricing")}>Seat Pricing</button>
        </div>
      </div>

      {activeTab === "layouts" && (
        <div className="fp-seat-layout">
          <div className="fp-seat-grid">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="fp-seat-row">
                <span className="fp-seat-label">Row {rowIndex + 1}</span>
                <div className="fp-seat-row-grid">
                  {row.map((seat, seatIndex) => (
                    <button
                      key={seatIndex}
                      className={`fp-seat ${seat}`}
                      onClick={() => toggleSeatType(rowIndex, seatIndex)}
                    >
                      {seatIndex + 1}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="fp-seat-panel">
            <div className="fp-panel-card">
              <h4>Layout Actions</h4>
              <button onClick={addRow}><FiPlus /> Add Row</button>
              <button onClick={bulkGenerate}>Bulk Generate</button>
              <button className="fp-primary"><FiSave /> Save Layout</button>
            </div>
            <div className="fp-panel-card">
              <h4>Seat Pricing</h4>
              {Object.keys(pricing).map((key) => (
                <div key={key} className="fp-input-row">
                  <label>{key.toUpperCase()}</label>
                  <input
                    type="number"
                    value={pricing[key]}
                    onChange={(e) => setPricing((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "inventory" && (
        <div className="fp-table">
          <table>
            <thead>
              <tr>
                <th>Seat Type</th>
                <th>Total Seats</th>
                <th>Available</th>
                <th>Blocked</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(seatCounts).map((key) => (
                <tr key={key}>
                  <td>{key.toUpperCase()}</td>
                  <td>{seatCounts[key]}</td>
                  <td>{Math.max(seatCounts[key] - 12, 0)}</td>
                  <td>12</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "pricing" && (
        <div className="fp-table">
          <table>
            <thead>
              <tr>
                <th>Seat Type</th>
                <th>Base Price (₹)</th>
                <th>Markup (%)</th>
                <th>Current Fare</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(pricing).map((key) => (
                <tr key={key}>
                  <td>{key.toUpperCase()}</td>
                  <td>₹{pricing[key]}</td>
                  <td>+8%</td>
                  <td>₹{Math.round(pricing[key] * 1.08)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SeatLayoutManager;
