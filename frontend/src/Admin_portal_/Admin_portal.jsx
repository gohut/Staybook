// Admin_portal.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Vnavbar from "./Vnavbar";
// import Hnavbar from "./Hnavbar";
// import Vnavbar from "./Navbars/Vnavbar";
// import Hnavbar from "./Navbars/Hnavbar";
// import AdminDashboard from "./AdminDashboard";
// import BookingRevenue from "./Bookingrevenue";
// import HotelRegistration from "./HotelRegistration";
// import CouponOff from "./CouponOff";
// import CouponCr from "./CouponCr";
// import Reports from "./Reports";
// import Settings from "./Settings";
import "./Admin_portal.scss";

import Vnavbar from "./Navbars/Vnavbar";
import Hnavbar from "./Navbars/Hnavbar";
import AdminDashboard from "./Dashboard/AdminDashboard";
import BookingRevenue from "./Booking_Revenue/BookingRevenue";
import HotelRegistration from "./Hotel_Registration/HotelRegistration";
import CouponOff from "./Coupons_Offers/CouponOff";
import CouponCr from "./Coupons_Offers/CouponCr";
import Reports from "./Reports/Reports";
import Settings from "./Settings/Settings";
import PartnerDetails from "./Partner_Details/PartnerDetails";
import Messages from "./Messages/Messages";
import {
  fetchAdminNotifications,
  fetchAdminUnreadCount,
} from "../Api/admin/adminApi";

const Admin_portal = () => {
  const [active, setActive] = useState("dashboard");
  const [showCreate, setShowCreate] = useState(false);
  const [couponRefreshKey, setCouponRefreshKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const navigate = useNavigate();

  const userProfile = useMemo(() => {
    const email = localStorage.getItem("userEmail") || "admin@staybook.com";
    const role = localStorage.getItem("userRole") || "Admin";
    const name = email.split("@")[0];
    return {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email,
      role,
    };
  }, []);

  const loadNotifications = useCallback(async () => {
    setNotificationsLoading(true);
    try {
      const data = await fetchAdminNotifications({ page: 0, size: 6 });
      setNotifications(Array.isArray(data?.content) ? data.content : []);
    } catch (err) {
      setNotifications([]);
    } finally {
      setNotificationsLoading(false);
    }
  }, []);

  const refreshUnread = useCallback(async () => {
    try {
      const count = await fetchAdminUnreadCount();
      setUnreadCount(Number(count) || 0);
    } catch (err) {
      setUnreadCount(0);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
    refreshUnread();
  }, [loadNotifications, refreshUnread]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className={`layout ${showCreate ? "blurred" : ""}`}>
      <Vnavbar active={active} setActive={setActive} />

      <div className="right-section_A">
        <Hnavbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          user={userProfile}
          notifications={notifications}
          notificationsLoading={notificationsLoading}
          unreadCount={unreadCount}
          onRefreshNotifications={() => {
            loadNotifications();
            refreshUnread();
          }}
          onOpenMessages={() => setActive("messages")}
          onLogout={handleLogout}
        />
        <main className="scroll-area">
          {active === "dashboard" && <AdminDashboard />}
          {active === "revenue" && (
            <BookingRevenue searchQuery={searchQuery} />
          )}
          {active === "hotels" && (
            <HotelRegistration searchQuery={searchQuery} />
          )}
          {active === "coupons" && (
            <CouponOff
              onCreate={() => setShowCreate(true)}
              refreshKey={couponRefreshKey}
              searchQuery={searchQuery}
            />
          )}
          {active === "reports" && <Reports />}
          {active === "partnerDetails" && (
            <PartnerDetails searchQuery={searchQuery} />
          )}
          {active === "messages" && (
            <Messages
              searchQuery={searchQuery}
              onNotificationsUpdated={() => {
                loadNotifications();
                refreshUnread();
              }}
            />
          )}
          {active === "settings" && <Settings />}
        </main>
      </div>

      {showCreate && (
        <CouponCr
          onClose={() => setShowCreate(false)}
          onCreated={() => {
            setShowCreate(false);
            setCouponRefreshKey((prev) => prev + 1);
          }}
        />
      )}
    </div>
  );
};

export default Admin_portal;
