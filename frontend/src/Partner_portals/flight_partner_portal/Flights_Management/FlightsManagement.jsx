import { useMemo, useState } from "react";
import { FiCopy, FiEdit, FiPlus, FiSlash } from "react-icons/fi";

const FlightsManagement = ({
  flights,
  searchQuery,
  onCreateFlight,
  onEditFlight,
  onDuplicateFlight,
  onCancelFlight,
  view,
}) => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [classFilter, setClassFilter] = useState("All");

  const filteredFlights = useMemo(() => {
    let list = flights || [];
    if (statusFilter !== "All") {
      list = list.filter((flight) => flight.status === statusFilter);
    }
    if (classFilter !== "All") {
      list = list.filter((flight) => flight.cabinClass === classFilter);
    }
    if (searchQuery?.trim()) {
      const needle = searchQuery.toLowerCase();
      list = list.filter((flight) =>
        [flight.flightNumber, flight.route, flight.aircraft]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(needle))
      );
    }
    return list;
  }, [flights, statusFilter, classFilter, searchQuery]);

  if (view === "schedule") {
    return (
      <div className="fp-card">
        <div className="fp-card-head">
          <div>
            <h3>Schedule Management</h3>
            <p className="fp-muted">Manage departure windows and slot approvals.</p>
          </div>
          <button className="fp-primary" onClick={onCreateFlight}>
            <FiPlus /> Create Flight
          </button>
        </div>
        <div className="fp-schedule">
          {filteredFlights.map((flight) => (
            <div key={flight.id} className="fp-schedule-card">
              <div>
                <h4>{flight.flightNumber}</h4>
                <p>{flight.route}</p>
              </div>
              <div>
                <span>Departure</span>
                <strong>{flight.departure}</strong>
              </div>
              <div>
                <span>Arrival</span>
                <strong>{flight.arrival}</strong>
              </div>
              <div className="fp-status-tag">{flight.status}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fp-card">
      <div className="fp-card-head">
        <div>
          <h3>All Flights</h3>
          <p className="fp-muted">Monitor routes, schedules, and cabin performance.</p>
        </div>
        <button className="fp-primary" onClick={onCreateFlight}>
          <FiPlus /> Create Flight
        </button>
      </div>

      <div className="fp-filter-row">
        <div className="fp-filter">
          <label>Status</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>Active</option>
            <option>Cancelled</option>
          </select>
        </div>
        <div className="fp-filter">
          <label>Cabin Class</label>
          <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
            <option>All</option>
            <option>Economy</option>
            <option>Premium</option>
            <option>Business</option>
          </select>
        </div>
      </div>

      <div className="fp-table">
        <table>
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Airline</th>
              <th>Route</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Aircraft</th>
              <th>Cabin Class</th>
              <th>Base Fare</th>
              <th>Seats Available</th>
              <th>Refundable</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFlights.map((flight) => (
              <tr key={flight.id}>
                <td>{flight.flightNumber}</td>
                <td>{flight.airline}</td>
                <td>{flight.route}</td>
                <td>{flight.departure}</td>
                <td>{flight.arrival}</td>
                <td>{flight.aircraft}</td>
                <td>{flight.cabinClass}</td>
                <td>₹{flight.baseFare}</td>
                <td>{flight.seatsAvailable}</td>
                <td>{flight.refundable ? "Yes" : "No"}</td>
                <td>
                  <span className={`fp-status ${flight.status.toLowerCase()}`}>
                    {flight.status}
                  </span>
                </td>
                <td>
                  <div className="fp-actions">
                    <button onClick={() => onEditFlight(flight)}>
                      <FiEdit /> Edit
                    </button>
                    <button onClick={() => onDuplicateFlight(flight)}>
                      <FiCopy /> Duplicate
                    </button>
                    <button
                      className="danger"
                      onClick={() => onCancelFlight(flight.id)}
                      disabled={flight.status === "Cancelled"}
                    >
                      <FiSlash /> Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredFlights.length === 0 && (
          <div className="fp-empty">No flights match the current filters.</div>
        )}
      </div>
    </div>
  );
};

export default FlightsManagement;
