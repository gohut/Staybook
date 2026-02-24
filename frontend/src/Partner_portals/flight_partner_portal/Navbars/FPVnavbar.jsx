import {
  FiAirplay,
  FiGrid,
  FiPlusSquare,
  FiCalendar,
  FiMap,
  FiLayers,
  FiUsers,
  FiCheckCircle,
  FiTag,
  FiShield,
  FiZap,
  FiCreditCard,
  FiBarChart2,
  FiFileText,
  FiSettings,
  FiUserCheck,
  FiKey,
  FiChevronLeft,
} from "react-icons/fi";
import { MdFlight } from "react-icons/md";
import "./FPVnavbar.scss";

const navGroups = [
  {
    label: "Overview",
    items: [{ key: "dashboard", label: "Dashboard", icon: <FiAirplay /> }],
  },
  {
    label: "Flights Management",
    items: [
      { key: "flights", label: "All Flights", icon: <MdFlight /> },
      { key: "createFlight", label: "Create Flight", icon: <FiPlusSquare /> },
      { key: "schedule", label: "Schedule Management", icon: <FiCalendar /> },
    ],
  },
  {
    label: "Seat & Aircraft",
    items: [
      { key: "seatLayouts", label: "Aircraft Layouts", icon: <FiGrid /> },
      { key: "seatInventory", label: "Seat Inventory", icon: <FiLayers /> },
      { key: "seatPricing", label: "Seat Pricing", icon: <FiTag /> },
    ],
  },
  {
    label: "Bookings",
    items: [
      { key: "bookings", label: "All Bookings", icon: <FiMap /> },
      { key: "passengers", label: "Passenger List", icon: <FiUsers /> },
      { key: "checkin", label: "Check-in Status", icon: <FiCheckCircle /> },
    ],
  },
  {
    label: "Pricing & Fare Rules",
    items: [
      { key: "farePlans", label: "Fare Plans", icon: <FiTag /> },
      { key: "taxes", label: "Taxes & Fees", icon: <FiShield /> },
      { key: "refunds", label: "Refund Policies", icon: <FiFileText /> },
    ],
  },
  {
    label: "Add-Ons",
    items: [
      { key: "insurance", label: "Insurance", icon: <FiShield /> },
      { key: "delay", label: "Delay Protection", icon: <FiZap /> },
      { key: "extras", label: "Extra Services", icon: <FiTag /> },
    ],
  },
  {
    label: "Payments & Reports",
    items: [
      { key: "transactions", label: "Transactions", icon: <FiCreditCard /> },
      { key: "revenue", label: "Revenue Analytics", icon: <FiBarChart2 /> },
      { key: "settlements", label: "Settlement Reports", icon: <FiFileText /> },
    ],
  },
  {
    label: "Settings",
    items: [
      { key: "profile", label: "Airline Profile", icon: <FiSettings /> },
      { key: "roles", label: "Users & Roles", icon: <FiUserCheck /> },
      { key: "api", label: "API Keys", icon: <FiKey /> },
    ],
  },
];

const FPVnavbar = ({ active, setActive, collapsed, onToggleCollapse }) => {
  return (
    <aside className={`fp-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="fp-sidebar-top">
        <div className="fp-logo">
          <div className="fp-logo-icon">
            <MdFlight />
          </div>
          {!collapsed && (
            <div>
              <h3>StayBook</h3>
              <p>Flight Partner Portal</p>
            </div>
          )}
        </div>
        <button className="fp-collapse" onClick={onToggleCollapse}>
          <FiChevronLeft />
        </button>
      </div>

      <nav className="fp-nav">
        {navGroups.map((group) => (
          <div key={group.label} className="fp-nav-group">
            {!collapsed && <span className="fp-group-label">{group.label}</span>}
            {group.items.map((item) => (
              <button
                key={item.key}
                className={`fp-nav-item ${active === item.key ? "active" : ""}`}
                onClick={() => setActive(item.key)}
                title={collapsed ? item.label : ""}
              >
                <span className="fp-icon">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="fp-sidebar-foot">
        <div className="fp-avatar">SA</div>
        {!collapsed && (
          <div>
            <h4>StayBook Airlines</h4>
            <p>Operations HQ</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default FPVnavbar;
