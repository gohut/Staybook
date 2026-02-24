import { useEffect, useState } from "react";

const PricingPolicies = ({ tab }) => {
  const [activeTab, setActiveTab] = useState(tab || "plans");
  const [plans, setPlans] = useState([
    { name: "Economy", price: 3200, refund: false, change: true, baggage: "15kg" },
    { name: "Premium", price: 5200, refund: true, change: true, baggage: "25kg" },
    { name: "Business", price: 8900, refund: true, change: true, baggage: "35kg" },
  ]);

  useEffect(() => {
    if (tab) setActiveTab(tab);
  }, [tab]);

  const updatePlan = (index, key, value) => {
    setPlans((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  };

  return (
    <div className="fp-card">
      <div className="fp-card-head">
        <div>
          <h3>Pricing & Fare Rules</h3>
          <p className="fp-muted">Configure fare plans, taxes, and refund policies.</p>
        </div>
        <div className="fp-tab-row">
          <button className={activeTab === "plans" ? "active" : ""} onClick={() => setActiveTab("plans")}>Fare Plans</button>
          <button className={activeTab === "taxes" ? "active" : ""} onClick={() => setActiveTab("taxes")}>Taxes & Fees</button>
          <button className={activeTab === "refunds" ? "active" : ""} onClick={() => setActiveTab("refunds")}>Refund Policies</button>
        </div>
      </div>

      {activeTab === "plans" && (
        <div className="fp-card-grid">
          {plans.map((plan, index) => (
            <div key={plan.name} className="fp-plan-card">
              <h4>{plan.name}</h4>
              <div className="fp-input-row">
                <label>Price (₹)</label>
                <input
                  type="number"
                  value={plan.price}
                  onChange={(e) => updatePlan(index, "price", Number(e.target.value))}
                />
              </div>
              <div className="fp-input-row">
                <label>Refund Allowed</label>
                <select
                  value={plan.refund ? "Yes" : "No"}
                  onChange={(e) => updatePlan(index, "refund", e.target.value === "Yes")}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="fp-input-row">
                <label>Date Change Allowed</label>
                <select
                  value={plan.change ? "Yes" : "No"}
                  onChange={(e) => updatePlan(index, "change", e.target.value === "Yes")}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="fp-input-row">
                <label>Baggage Included</label>
                <input
                  value={plan.baggage}
                  onChange={(e) => updatePlan(index, "baggage", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "taxes" && (
        <div className="fp-table">
          <table>
            <thead>
              <tr>
                <th>Tax Type</th>
                <th>Rate</th>
                <th>Applied On</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Airport Fee</td>
                <td>₹450</td>
                <td>Base Fare</td>
                <td><span className="fp-status active">Enabled</span></td>
              </tr>
              <tr>
                <td>Fuel Surcharge</td>
                <td>₹320</td>
                <td>Base Fare</td>
                <td><span className="fp-status active">Enabled</span></td>
              </tr>
              <tr>
                <td>Convenience Fee</td>
                <td>₹180</td>
                <td>Per Passenger</td>
                <td><span className="fp-status pending">Review</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "refunds" && (
        <div className="fp-policy-grid">
          <div className="fp-policy-card">
            <h4>Cancellation Fee</h4>
            <p>Before departure: ₹1,200</p>
            <p>After departure: ₹2,800</p>
          </div>
          <div className="fp-policy-card">
            <h4>Date Change Fee</h4>
            <p>Domestic: ₹850</p>
            <p>International: ₹1,500</p>
          </div>
          <div className="fp-policy-card">
            <h4>Refund Processing</h4>
            <p>Initiate refund within 7 working days</p>
            <p>Manual review required for premium cabins</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPolicies;
