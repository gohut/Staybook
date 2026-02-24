import { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";

const emptyFlight = {
  flightNumber: "",
  fromCity: "",
  fromAirport: "",
  toCity: "",
  toAirport: "",
  departure: "",
  arrival: "",
  duration: "",
  aircraft: "",
  totalSeats: 0,
  cabinClass: "Economy",
  baseFare: 0,
  seatsAvailable: 0,
  refundable: true,
  status: "Active",
};

const CreateEditFlight = ({ flight, onSave, onCancel }) => {
  const [form, setForm] = useState(emptyFlight);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (flight) {
      setForm({ ...emptyFlight, ...flight });
    } else {
      setForm(emptyFlight);
    }
  }, [flight]);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      route: `${form.fromAirport} → ${form.toAirport}`,
    };
    onSave(payload);
    setMessage("Flight saved successfully.");
    setTimeout(() => {
      setMessage("");
      onCancel();
    }, 1200);
  };

  return (
    <div className="fp-card">
      <div className="fp-card-head">
        <div>
          <h3>{flight ? "Edit Flight" : "Create Flight"}</h3>
          <p className="fp-muted">Route, schedule, aircraft, and fare configuration.</p>
        </div>
      </div>

      <form className="fp-form" onSubmit={handleSubmit}>
        <div className="fp-form-section">
          <h4>Route</h4>
          <div className="fp-form-grid">
            <div>
              <label>Flight Number</label>
              <input value={form.flightNumber} onChange={(e) => updateField("flightNumber", e.target.value.toUpperCase())} />
            </div>
            <div>
              <label>From City</label>
              <input value={form.fromCity} onChange={(e) => updateField("fromCity", e.target.value)} />
            </div>
            <div>
              <label>From Airport Code</label>
              <input value={form.fromAirport} onChange={(e) => updateField("fromAirport", e.target.value.toUpperCase())} />
            </div>
            <div>
              <label>To City</label>
              <input value={form.toCity} onChange={(e) => updateField("toCity", e.target.value)} />
            </div>
            <div>
              <label>To Airport Code</label>
              <input value={form.toAirport} onChange={(e) => updateField("toAirport", e.target.value.toUpperCase())} />
            </div>
          </div>
        </div>

        <div className="fp-form-section">
          <h4>Schedule</h4>
          <div className="fp-form-grid">
            <div>
              <label>Departure Time</label>
              <input type="time" value={form.departure} onChange={(e) => updateField("departure", e.target.value)} />
            </div>
            <div>
              <label>Arrival Time</label>
              <input type="time" value={form.arrival} onChange={(e) => updateField("arrival", e.target.value)} />
            </div>
            <div>
              <label>Duration</label>
              <input value={form.duration} onChange={(e) => updateField("duration", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="fp-form-section">
          <h4>Aircraft</h4>
          <div className="fp-form-grid">
            <div>
              <label>Aircraft Model</label>
              <input value={form.aircraft} onChange={(e) => updateField("aircraft", e.target.value)} />
            </div>
            <div>
              <label>Total Seats</label>
              <input type="number" value={form.totalSeats} onChange={(e) => updateField("totalSeats", Number(e.target.value))} />
            </div>
          </div>
        </div>

        <div className="fp-form-section">
          <h4>Fare & Inventory</h4>
          <div className="fp-form-grid">
            <div>
              <label>Base Price (₹)</label>
              <input type="number" value={form.baseFare} onChange={(e) => updateField("baseFare", Number(e.target.value))} />
            </div>
            <div>
              <label>Cabin Class</label>
              <select value={form.cabinClass} onChange={(e) => updateField("cabinClass", e.target.value)}>
                <option>Economy</option>
                <option>Premium</option>
                <option>Business</option>
              </select>
            </div>
            <div>
              <label>Seats Available</label>
              <input type="number" value={form.seatsAvailable} onChange={(e) => updateField("seatsAvailable", Number(e.target.value))} />
            </div>
            <div>
              <label>Refundable</label>
              <select value={form.refundable ? "Yes" : "No"} onChange={(e) => updateField("refundable", e.target.value === "Yes") }>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>
        </div>

        {message && <div className="fp-toast success">{message}</div>}

        <div className="fp-form-actions">
          <button type="button" className="fp-secondary" onClick={onCancel}>
            Back
          </button>
          <button type="submit" className="fp-primary">
            <FiSave /> Save Flight
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditFlight;
