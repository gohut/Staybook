const metrics = [
  { label: "Total Flights Today", value: "128", delta: "+6.2%" },
  { label: "Seats Sold Today", value: "8,420", delta: "+4.8%" },
  { label: "Revenue Generated", value: "₹48.6L", delta: "+9.1%" },
  { label: "Active Bookings", value: "2,940", delta: "+2.4%" },
  { label: "Load Factor", value: "86%", delta: "+1.6%" },
];

const revenueTrend = [42, 48, 51, 46, 58, 64, 61, 73, 69, 78, 82, 87];
const routeVolume = [
  { route: "DEL → BLR", value: 720 },
  { route: "BOM → HYD", value: 640 },
  { route: "DEL → MAA", value: 590 },
  { route: "BLR → COK", value: 520 },
  { route: "GOI → DEL", value: 480 },
];
const occupancyGrid = [
  [92, 88, 86, 74, 69, 80],
  [90, 84, 79, 70, 68, 76],
  [88, 82, 78, 66, 64, 72],
  [86, 80, 75, 65, 60, 70],
  [84, 78, 73, 62, 58, 68],
];
const recentBookings = [
  { ref: "BK-90041", route: "DEL → BLR", pax: 2, amount: "₹7,198", status: "Confirmed" },
  { ref: "BK-90077", route: "BOM → HYD", pax: 1, amount: "₹6,299", status: "On Hold" },
  { ref: "BK-90110", route: "BLR → COK", pax: 3, amount: "₹9,567", status: "Confirmed" },
  { ref: "BK-90133", route: "DEL → MAA", pax: 1, amount: "₹8,799", status: "Cancelled" },
];

const statusClass = (status) => status.toLowerCase().replace(/\s+/g, "-");

const FlightDashboard = () => {
  return (
    <div className="fp-dashboard">
      <div className="fp-kpi-grid">
        {metrics.map((item) => (
          <div key={item.label} className="fp-kpi">
            <span>{item.label}</span>
            <h3>{item.value}</h3>
            <p>{item.delta} vs last week</p>
          </div>
        ))}
      </div>

      <div className="fp-grid-2">
        <div className="fp-card">
          <div className="fp-card-head">
            <h3>Revenue Trend</h3>
            <span>Last 12 days</span>
          </div>
          <div className="fp-chart-line">
            {revenueTrend.map((value, index) => (
              <div key={index} className="fp-line-dot" style={{ height: `${value}%` }}>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="fp-card">
          <div className="fp-card-head">
            <h3>Booking Volume by Route</h3>
            <span>Top 5 routes</span>
          </div>
          <div className="fp-chart-bars">
            {routeVolume.map((item) => (
              <div key={item.route} className="fp-bar-row">
                <span>{item.route}</span>
                <div className="fp-bar">
                  <div
                    className="fp-bar-fill"
                    style={{ width: `${(item.value / 800) * 100}%` }}
                  />
                </div>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fp-grid-2">
        <div className="fp-card">
          <div className="fp-card-head">
            <h3>Seat Occupancy Heatmap</h3>
            <span>Average cabin utilization</span>
          </div>
          <div className="fp-heatmap">
            {occupancyGrid.map((row, rowIndex) => (
              <div key={rowIndex} className="fp-heat-row">
                {row.map((value, colIndex) => (
                  <div
                    key={colIndex}
                    className="fp-heat-cell"
                    style={{ opacity: value / 100 }}
                  >
                    {value}%
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="fp-card">
          <div className="fp-card-head">
            <h3>Recent Bookings</h3>
            <span>Last 24 hours</span>
          </div>
          <div className="fp-table">
            <table>
              <thead>
                <tr>
                  <th>Booking Ref</th>
                  <th>Route</th>
                  <th>Passengers</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((item) => (
                  <tr key={item.ref}>
                    <td>{item.ref}</td>
                    <td>{item.route}</td>
                    <td>{item.pax}</td>
                    <td>{item.amount}</td>
                    <td>
                      <span className={`fp-status ${statusClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDashboard;
