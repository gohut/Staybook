import { useMemo, useState } from "react";
import { FiPlus, FiTrash2, FiMove, FiEye } from "react-icons/fi";
import PPCard from "../Common/PPCard";
import PPBadge from "../Common/PPBadge";
import "./ItineraryBuilder.scss";

const defaultDays = [
  {
    id: 1,
    title: "Arrival & Check-in",
    description: "Meet and greet, transfer to hotel, leisure time.",
    stay: "Premium Beach Resort",
    transfer: "Airport pickup",
    meals: "Dinner",
    activities: ["Welcome drink", "Beach walk"],
    notes: "Assign ocean-view rooms if available.",
  },
  {
    id: 2,
    title: "City Highlights",
    description: "Local sightseeing and cultural activities.",
    stay: "Premium Beach Resort",
    transfer: "Private cab",
    meals: "Breakfast",
    activities: ["City tour", "Shopping time"],
    notes: "Confirm guide availability by 10 AM.",
  },
];

const ItineraryBuilder = ({ readOnly, packages }) => {
  const [days, setDays] = useState(defaultDays);
  const [dragIndex, setDragIndex] = useState(null);
  const [preview, setPreview] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(
    packages[0]?.id || ""
  );

  const summary = useMemo(() => {
    return {
      days: days.length,
      transfers: days.filter((day) => day.transfer).length,
      hotels: days.filter((day) => day.stay).length,
      meals: days.filter((day) => day.meals).length,
    };
  }, [days]);

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDrop = (index) => {
    if (dragIndex === null || dragIndex === index) return;
    const updated = [...days];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, moved);
    setDays(updated);
    setDragIndex(null);
  };

  const handleAddDay = () => {
    const nextId = days.length + 1;
    setDays((prev) => [
      ...prev,
      {
        id: nextId,
        title: `Day ${nextId} Plan`,
        description: "",
        stay: "",
        transfer: "",
        meals: "",
        activities: [],
        notes: "",
      },
    ]);
  };

  const handleRemoveDay = (id) => {
    setDays((prev) => prev.filter((day) => day.id !== id));
  };

  const updateDay = (id, field, value) => {
    setDays((prev) =>
      prev.map((day) => (day.id === id ? { ...day, [field]: value } : day))
    );
  };

  const addActivity = (id) => {
    setDays((prev) =>
      prev.map((day) =>
        day.id === id
          ? {
              ...day,
              activities: [...day.activities, "New activity"],
            }
          : day
      )
    );
  };

  const selectedPackage = packages.find((pkg) => pkg.id === selectedPackageId);

  return (
    <div className="pp-page pp-itinerary">
      {readOnly && (
        <div className="pp-banner">
          Itinerary editing is disabled for Sub Partner roles.
        </div>
      )}

      <div className="pp-itinerary-toolbar">
        <div>
          <h2 className="pp-section-title">Itinerary Builder</h2>
          <p className="pp-muted">Plan day-wise experiences and logistics.</p>
        </div>
        <div className="pp-inline">
          <select
            value={selectedPackageId}
            onChange={(event) => setSelectedPackageId(event.target.value)}
          >
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.title}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="pp-btn pp-btn-ghost"
            onClick={() => setPreview((prev) => !prev)}
          >
            <FiEye /> {preview ? "Hide" : "Preview"}
          </button>
          <button
            type="button"
            className="pp-btn pp-btn-primary"
            onClick={handleAddDay}
            disabled={readOnly}
          >
            <FiPlus /> Add Day
          </button>
        </div>
      </div>

      <PPCard title="Summary" subtitle="Trip overview">
        <div className="pp-inline pp-summary">
          <PPBadge tone="info">{summary.days} Days</PPBadge>
          <PPBadge tone="success">{summary.transfers} Transfers</PPBadge>
          <PPBadge tone="warning">{summary.hotels} Hotels</PPBadge>
          <PPBadge tone="default">{summary.meals} Meals</PPBadge>
        </div>
      </PPCard>

      <div className="pp-stack">
        {days.map((day, index) => (
          <PPCard
            key={day.id}
            className="pp-day-card"
            title={`Day ${index + 1}`}
            subtitle={day.title}
          >
            <div
              className="pp-day-drag"
              draggable={!readOnly}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => handleDrop(index)}
            >
              <FiMove /> Drag to reorder
            </div>
            <div className="pp-form-grid">
              <div className="pp-field">
                <label>Title</label>
                <input
                  value={day.title}
                  onChange={(event) => updateDay(day.id, "title", event.target.value)}
                  disabled={readOnly}
                />
              </div>
              <div className="pp-field">
                <label>Stay Details</label>
                <input
                  value={day.stay}
                  onChange={(event) => updateDay(day.id, "stay", event.target.value)}
                  disabled={readOnly}
                />
              </div>
              <div className="pp-field">
                <label>Transfer Details</label>
                <input
                  value={day.transfer}
                  onChange={(event) =>
                    updateDay(day.id, "transfer", event.target.value)
                  }
                  disabled={readOnly}
                />
              </div>
              <div className="pp-field">
                <label>Meal Plan</label>
                <input
                  value={day.meals}
                  onChange={(event) => updateDay(day.id, "meals", event.target.value)}
                  disabled={readOnly}
                />
              </div>
            </div>
            <div className="pp-field">
              <label>Description</label>
              <textarea
                rows="3"
                value={day.description}
                onChange={(event) =>
                  updateDay(day.id, "description", event.target.value)
                }
                disabled={readOnly}
              />
            </div>
            <div className="pp-inline pp-activities">
              {day.activities.map((activity, activityIndex) => (
                <span key={activityIndex} className="pp-chip">
                  {activity}
                </span>
              ))}
              <button
                type="button"
                className="pp-btn pp-btn-ghost"
                onClick={() => addActivity(day.id)}
                disabled={readOnly}
              >
                <FiPlus /> Add Activity
              </button>
            </div>
            <div className="pp-field">
              <label>Notes</label>
              <textarea
                rows="2"
                value={day.notes}
                onChange={(event) => updateDay(day.id, "notes", event.target.value)}
                disabled={readOnly}
              />
            </div>
            <div className="pp-inline">
              <button
                type="button"
                className="pp-btn pp-btn-danger"
                onClick={() => handleRemoveDay(day.id)}
                disabled={readOnly}
              >
                <FiTrash2 /> Remove Day
              </button>
            </div>
          </PPCard>
        ))}
      </div>

      {preview && (
        <PPCard
          title="Preview Mode"
          subtitle="Public package view summary"
          className="pp-preview"
        >
          <h3>{selectedPackage?.title}</h3>
          <p className="pp-muted">
            {selectedPackage?.destination} - {selectedPackage?.duration}
          </p>
          <div className="pp-inline">
            {(selectedPackage?.tags || []).map((tag) => (
              <span key={tag} className="pp-chip">
                {tag}
              </span>
            ))}
          </div>
          <div className="pp-stack">
            {days.map((day, index) => (
              <div key={day.id} className="pp-preview-day">
                <strong>Day {index + 1}:</strong> {day.title} - {day.description}
              </div>
            ))}
          </div>
        </PPCard>
      )}
    </div>
  );
};

export default ItineraryBuilder;
