import {
  FiHome,
  FiCalendar,
  FiTrendingUp,
  FiAlertCircle,
  FiDollarSign,
} from "react-icons/fi";
import "./PartnerDashboard.scss";

/* ================= REUSABLE COMPONENTS ================= */

const StatCard = ({ title, value, sub, icon, color }) => (
  <div className="stat-card">
    <div>
      <p>{title}</p>
      <h2>{value}</h2>
      {sub && <span className="stat-sub">{sub}</span>}
    </div>
    <div className={`icon ${color}`}>{icon}</div>
  </div>
);

const RoomCard = ({ title, total, occupied, available, percent }) => (
  <div className="room-card">
    <div className="room-card-header">
      <h4>{title}</h4>
      <span className="percent">{percent}%</span>
    </div>

    <p className="total">{total} total rooms</p>

    <div className="room-stats">
      <p>Occupied: <strong>{occupied}</strong></p>
      <p className="available">Available: <strong>{available}</strong></p>
    </div>

    <div className="progress">
      <div className="progress-fill" style={{ width: `${percent}%` }} />
    </div>
  </div>
);

/* ================= MAIN DASHBOARD ================= */

const PartnerDashboard = () => {
  return (
    <div className="dashboard">

      {/* KPI STATS */}
      <div className="stats">
        <StatCard title="Total Rooms" value="48" icon={<FiHome />} color="blue" />
        <StatCard title="Available Today" value="12" icon={<FiCalendar />} color="green" />
        <StatCard title="Active Reservations" value="4" icon={<FiCalendar />} color="purple" />
        <StatCard title="Check-ins Today" value="2" icon={<FiTrendingUp />} color="orange" />
      </div>

      {/* REVENUE METRICS (NEW SECTION) */}
      <div className="stats revenue">
        <StatCard
          title="Average Nightly Rate"
          value="$285"
          sub="↑ 12% vs last month"
          icon={<FiDollarSign />}
          color="gray"
        />
        <StatCard
          title="Occupancy Rate"
          value="75%"
          sub="↑ 5% vs last month"
          icon={<FiTrendingUp />}
          color="gray"
        />
        <StatCard
          title="Total Revenue (Jan)"
          value="$45,280"
          sub="↑ 18% vs Dec"
          icon={<FiDollarSign />}
          color="gray"
        />
      </div>

      {/* CHECK-IN / CHECK-OUT */}
      <div className="cards-row">
        <div className="info-card green">
          <div className="card-header">
            <h3>Today's Check-ins</h3>
            <button>View All</button>
          </div>
          <div className="guest">
            <h4>Emily Rodriguez <span>3:00 PM</span></h4>
            <p>Family Suite</p>
            <small>4 guests · 3 nights</small>
          </div>
        </div>

        <div className="info-card blue">
          <div className="card-header">
            <h3>Today's Check-outs</h3>
            <button>View All</button>
          </div>
          <div className="guest">
            <h4>David Thompson <span>11:00 AM</span></h4>
            <p>Deluxe Ocean View</p>
            <small>$500 · paid</small>
          </div>
        </div>
      </div>

      {/* ROOM STATUS */}
      <div className="room-status">
        <div className="section-header">
          <span className="icon-bed">🛏️</span>
          <div>
            <h3>Room Status Overview</h3>
            <p>Current availability by room type</p>
          </div>
        </div>

        <div className="room-grid">
          <RoomCard title="Deluxe Ocean View" total={15} occupied={2} available={13} percent={13} />
          <RoomCard title="Executive Suite" total={8} occupied={3} available={5} percent={38} />
          <RoomCard title="Standard Double" total={20} occupied={2} available={18} percent={10} />
          <RoomCard title="Family Suite" total={5} occupied={1} available={4} percent={20} />
        </div>
      </div>

      {/* RECENT RESERVATIONS + ALERTS */}
      <div className="bottom-grid">

        {/* TABLE */}
        <div className="table-card">
          <div className="card-header">
            <h3>Recent Reservations</h3>
            <button>View All</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Guest</th>
                <th>Room Type</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["John Anderson", "RES-2024-001", "Deluxe Ocean View", "20/01/2026", "23/01/2026"],
                ["Sarah Mitchell", "RES-2024-002", "Executive Suite", "18/01/2026", "21/01/2026"],
                ["Michael Chen", "RES-2024-003", "Standard Double", "19/01/2026", "22/01/2026"],
                ["Emily Rodriguez", "RES-2024-004", "Family Suite", "17/01/2026", "20/01/2026"],
              ].map(([name, id, room, inD, outD]) => (
                <tr key={id}>
                  <td>{name}<span>{id}</span></td>
                  <td>{room}</td>
                  <td>{inD}</td>
                  <td>{outD}</td>
                  <td><span className="status confirmed">confirmed</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ALERTS */}
        <div className="alerts">
          <div className="alert orange">
            <FiAlertCircle />
            <div>
              <h4>Low Availability</h4>
              <p>Only 2 Deluxe Ocean View rooms available this weekend</p>
            </div>
          </div>

          <div className="alert blue">
            <FiCalendar />
            <div>
              <h4>Upcoming Check-ins</h4>
              <p>2 guests checking in today</p>
            </div>
          </div>

          <div className="alert green">
            <FiDollarSign />
            <div>
              <h4>Occupancy Rate</h4>
              <p>Current occupancy at 75%</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default PartnerDashboard;
