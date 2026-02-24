import { useEffect, useState } from "react";

const PaymentsReports = ({ tab }) => {
  const [activeTab, setActiveTab] = useState(tab || "transactions");

  useEffect(() => {
    if (tab) setActiveTab(tab);
  }, [tab]);

  return (
    <div className="fp-card">
      <div className="fp-card-head">
        <div>
          <h3>Payments & Reports</h3>
          <p className="fp-muted">Monitor settlements, revenue, and payment performance.</p>
        </div>
        <div className="fp-tab-row">
          <button className={activeTab === "transactions" ? "active" : ""} onClick={() => setActiveTab("transactions")}>Transactions</button>
          <button className={activeTab === "revenue" ? "active" : ""} onClick={() => setActiveTab("revenue")}>Revenue Analytics</button>
          <button className={activeTab === "settlements" ? "active" : ""} onClick={() => setActiveTab("settlements")}>Settlement Reports</button>
        </div>
      </div>

      {activeTab === "transactions" && (
        <div className="fp-table">
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Route</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>TX-8871</td>
                <td>DEL → BLR</td>
                <td>UPI</td>
                <td>₹7,198</td>
                <td><span className="fp-status active">Success</span></td>
              </tr>
              <tr>
                <td>TX-8892</td>
                <td>BOM → HYD</td>
                <td>Card</td>
                <td>₹6,299</td>
                <td><span className="fp-status pending">Pending</span></td>
              </tr>
              <tr>
                <td>TX-8930</td>
                <td>DEL → MAA</td>
                <td>UPI</td>
                <td>₹8,799</td>
                <td><span className="fp-status cancelled">Refunded</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "revenue" && (
        <div className="fp-grid-2">
          <div className="fp-card-inner">
            <h4>Revenue per Route</h4>
            <div className="fp-chart-bars">
              {[
                { label: "DEL → BLR", value: 72 },
                { label: "BOM → HYD", value: 64 },
                { label: "DEL → MAA", value: 58 },
              ].map((item) => (
                <div key={item.label} className="fp-bar-row">
                  <span>{item.label}</span>
                  <div className="fp-bar">
                    <div className="fp-bar-fill" style={{ width: `${item.value}%` }} />
                  </div>
                  <strong>₹{item.value}L</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="fp-card-inner">
            <h4>Payment Method Split</h4>
            <div className="fp-split">
              <div>
                <strong>UPI</strong>
                <p>48%</p>
              </div>
              <div>
                <strong>Cards</strong>
                <p>32%</p>
              </div>
              <div>
                <strong>NetBanking</strong>
                <p>20%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "settlements" && (
        <div className="fp-table">
          <table>
            <thead>
              <tr>
                <th>Settlement Batch</th>
                <th>Period</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ST-3401</td>
                <td>Feb 16 - Feb 20</td>
                <td>₹18.2L</td>
                <td><span className="fp-status active">Processed</span></td>
              </tr>
              <tr>
                <td>ST-3402</td>
                <td>Feb 21 - Feb 23</td>
                <td>₹12.4L</td>
                <td><span className="fp-status pending">In Review</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentsReports;
