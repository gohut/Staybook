import {
  FiTrendingUp,
  FiUsers,
  FiMapPin,
  FiCalendar,
  FiAlertCircle,
  FiArrowUpRight,
} from "react-icons/fi";
import PPCard from "../Common/PPCard";
import PPBadge from "../Common/PPBadge";
import "./PackagePartnerDashboard.scss";

const PackagePartnerDashboard = ({ packages, bookings, coupons }) => {
  const publishedPackages = packages.filter((pkg) => pkg.status === "Published");
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.amount, 0);
  const pendingBookings = bookings.filter((booking) => booking.status === "Pending");
  const completedBookings = bookings.filter((booking) => booking.status === "Completed");
  const mostBooked = publishedPackages[0]?.destination || "Goa";
  const avgPrice = packages.length
    ? Math.round(
        packages.reduce((sum, pkg) => sum + pkg.basePrice, 0) / packages.length
      )
    : 0;

  const trendData = [52, 68, 60, 74, 80, 72, 90];
  const revenueBars = [45, 60, 55, 78, 82, 70, 95];

  return (
    <div className="pp-page pp-dashboard">
      <div className="pp-grid-3">
        <PPCard title="Total Active Packages" subtitle="Currently published">
          <div className="pp-metric">
            <h2>{publishedPackages.length}</h2>
            <span className="pp-metric-note">+2 this month</span>
          </div>
        </PPCard>
        <PPCard title="Total Bookings (Month)" subtitle="Confirmed + Pending">
          <div className="pp-metric">
            <h2>{bookings.length}</h2>
            <span className="pp-metric-note">+12% vs last month</span>
          </div>
        </PPCard>
        <PPCard title="Revenue (Current Month)" subtitle="Net collections">
          <div className="pp-metric">
            <h2>Rs. {totalRevenue.toLocaleString()}</h2>
            <span className="pp-metric-note">+8.2% growth</span>
          </div>
        </PPCard>
      </div>

      <div className="pp-grid-3">
        <PPCard title="Upcoming Departures" subtitle="Next 7 days">
          <div className="pp-inline">
            <FiCalendar />
            <strong>{Math.max(2, bookings.length - completedBookings.length)}</strong>
            <span className="pp-muted">departures scheduled</span>
          </div>
        </PPCard>
        <PPCard title="Active Coupons" subtitle="Currently live">
          <div className="pp-inline">
            <FiArrowUpRight />
            <strong>{coupons.filter((coupon) => coupon.status === "Active").length}</strong>
            <span className="pp-muted">campaigns running</span>
          </div>
        </PPCard>
        <PPCard title="Conversion Rate" subtitle="Views to bookings">
          <div className="pp-inline">
            <FiTrendingUp />
            <strong>3.8%</strong>
            <span className="pp-muted">target 4.5%</span>
          </div>
        </PPCard>
      </div>

      <div className="pp-grid-2">
        <PPCard title="Analytics Snapshot" subtitle="Performance overview">
          <div className="pp-analytics-grid">
            <div>
              <span>Average Package Price</span>
              <h3>Rs. {avgPrice.toLocaleString()}</h3>
            </div>
            <div>
              <span>Most Booked Destination</span>
              <h3>{mostBooked}</h3>
            </div>
            <div>
              <span>Top Performing Package</span>
              <h3>{publishedPackages[0]?.title || "Royal Jaipur Heritage"}</h3>
            </div>
            <div>
              <span>Pending Confirmations</span>
              <h3>{pendingBookings.length}</h3>
            </div>
          </div>
        </PPCard>

        <PPCard title="Booking Trend" subtitle="Last 7 days">
          <div className="pp-chart">
            {trendData.map((value, index) => (
              <span key={index} style={{ height: `${value}%` }} />
            ))}
          </div>
        </PPCard>
      </div>

      <div className="pp-grid-2">
        <PPCard title="Revenue Trend" subtitle="Route wise collection">
          <div className="pp-chart secondary">
            {revenueBars.map((value, index) => (
              <span key={index} style={{ height: `${value}%` }} />
            ))}
          </div>
        </PPCard>

        <PPCard title="Operational Alerts" subtitle="Today">
          <div className="pp-alerts">
            <div className="pp-alert">
              <FiAlertCircle />
              <div>
                <h4>Low bookings detected</h4>
                <p>Wayanad package needs promotion boost.</p>
              </div>
            </div>
            <div className="pp-alert">
              <FiMapPin />
              <div>
                <h4>Top destination demand</h4>
                <p>{mostBooked} trending 18% above average.</p>
              </div>
            </div>
            <div className="pp-alert">
              <FiUsers />
              <div>
                <h4>Pending confirmations</h4>
                <p>{pendingBookings.length} bookings awaiting payment.</p>
              </div>
            </div>
          </div>
        </PPCard>
      </div>

      <div className="pp-grid-2">
        <PPCard title="Today\'s Departures" subtitle="Operational checklist">
          <div className="pp-stack">
            {bookings.slice(0, 3).map((booking) => (
              <div key={booking.id} className="pp-departure">
                <div>
                  <h4>{booking.packageName}</h4>
                  <p>{booking.leadTraveler} - {booking.travelers} travelers</p>
                </div>
                <PPBadge tone="info">{booking.status}</PPBadge>
              </div>
            ))}
          </div>
        </PPCard>

        <PPCard title="Recently Added Packages" subtitle="Latest updates">
          <div className="pp-stack">
            {packages.slice(0, 3).map((pkg) => (
              <div key={pkg.id} className="pp-departure">
                <div>
                  <h4>{pkg.title}</h4>
                  <p>{pkg.destination} - {pkg.duration}</p>
                </div>
                <PPBadge tone={pkg.status === "Published" ? "success" : "warning"}>
                  {pkg.status}
                </PPBadge>
              </div>
            ))}
          </div>
        </PPCard>
      </div>
    </div>
  );
};

export default PackagePartnerDashboard;
