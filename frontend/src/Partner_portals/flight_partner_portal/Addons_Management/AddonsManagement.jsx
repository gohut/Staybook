import { useEffect, useState } from "react";

const baseAddons = [
  {
    key: "insurance",
    title: "Travel Insurance",
    description: "Coverage for medical & trip interruptions.",
    price: 299,
    enabled: true,
  },
  {
    key: "delay",
    title: "Delay Protection",
    description: "Instant payout for delays above 2 hours.",
    price: 199,
    enabled: true,
  },
  {
    key: "extras",
    title: "Extra Services",
    description: "Priority boarding, lounge access, Wi-Fi packs.",
    price: 499,
    enabled: false,
  },
];

const AddonsManagement = ({ tab }) => {
  const [activeTab, setActiveTab] = useState(tab || "insurance");
  const [addons, setAddons] = useState(baseAddons);

  useEffect(() => {
    if (tab) setActiveTab(tab);
  }, [tab]);

  const toggleAddon = (key) => {
    setAddons((prev) =>
      prev.map((addon) =>
        addon.key === key ? { ...addon, enabled: !addon.enabled } : addon
      )
    );
  };

  const selected = addons.find((addon) => addon.key === activeTab) || addons[0];

  return (
    <div className="fp-card">
      <div className="fp-card-head">
        <div>
          <h3>Add-Ons Management</h3>
          <p className="fp-muted">Enable or disable ancillary services per route.</p>
        </div>
      </div>

      <div className="fp-addon-grid">
        {addons.map((addon) => (
          <div key={addon.key} className={`fp-addon-card ${addon.enabled ? "enabled" : ""}`}>
            <div>
              <h4>{addon.title}</h4>
              <p>{addon.description}</p>
            </div>
            <div className="fp-addon-meta">
              <span>₹{addon.price}</span>
              <button className={addon.enabled ? "active" : ""} onClick={() => toggleAddon(addon.key)}>
                {addon.enabled ? "Enabled" : "Disabled"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="fp-addon-detail">
        <h4>{selected.title} Details</h4>
        <p>{selected.description}</p>
        <div className="fp-row"><span>Default Price</span><strong>₹{selected.price}</strong></div>
        <div className="fp-row"><span>Status</span><strong>{selected.enabled ? "Enabled" : "Disabled"}</strong></div>
      </div>
    </div>
  );
};

export default AddonsManagement;
