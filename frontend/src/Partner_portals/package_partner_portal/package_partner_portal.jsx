import { useEffect, useMemo, useState } from "react";
import PPVnavbar from "./Navbars/PPVnavbar";
import PPHnavbar from "./Navbars/PPHnavbar";
import PackagePartnerDashboard from "./Dashboard/PackagePartnerDashboard";
import PackageManagement from "./Package_Management/PackageManagement";
import ItineraryBuilder from "./Itinerary_Builder/ItineraryBuilder";
import PricingOffers from "./Pricing_Offers/PricingOffers";
import PackageMedia from "./Media_Gallery/PackageMedia";
import PackageBookings from "./Bookings/PackageBookings";
import CompletedTrips from "./Completed_Trips/CompletedTrips";
import PackageCoupons from "./Coupons/PackageCoupons";
import PackageNotifications from "./Notifications/PackageNotifications";
import PackagePartnerSettings from "./Settings/PackagePartnerSettings";
import PPToast from "./Common/PPToast";
import "./package_partner_portal.scss";

const initialPackages = [
  {
    id: "PKG-201",
    title: "Goa Beach Escape - Candolim Stay",
    destination: "Goa",
    duration: "3N/4D",
    departureCity: "New Delhi",
    hotelCategory: "4 Star Hotel",
    meals: "Breakfast + Dinner",
    activitiesCount: 5,
    freebies: ["Airport Transfer", "Sunset Cruise"],
    basePrice: 5980,
    totalPrice: 11960,
    emi: "Rs. 1990/mo",
    tags: ["Beach", "Luxury"],
    status: "Published",
    totalBookings: 48,
    revenue: 286000,
    visibility: true,
    overview: "Relaxed beach getaway with curated excursions and premium stays.",
    cancellationPolicy: "Free cancellation up to 10 days before departure.",
    refundPolicy: "Refund within 7 working days after approval.",
    inclusions: "Stay, breakfast, dinner, transfers, guided tour.",
    exclusions: "Airfare, personal expenses, optional activities.",
  },
  {
    id: "PKG-214",
    title: "Royal Jaipur Heritage Trail",
    destination: "Jaipur + Udaipur",
    duration: "4N/5D",
    departureCity: "Mumbai",
    hotelCategory: "5 Star Hotel",
    meals: "Breakfast",
    activitiesCount: 7,
    freebies: ["Cultural Show", "Heritage Walk"],
    basePrice: 8420,
    totalPrice: 16840,
    emi: "Rs. 2800/mo",
    tags: ["Heritage", "Premium"],
    status: "Published",
    totalBookings: 32,
    revenue: 269440,
    visibility: true,
    overview: "Heritage tour through royal palaces, lakes, and forts.",
    cancellationPolicy: "50% charge within 7 days of departure.",
    refundPolicy: "Non-refundable for special event bookings.",
    inclusions: "Luxury stay, sightseeing, airport transfers.",
    exclusions: "Lunch, personal shopping, travel insurance.",
  },
  {
    id: "PKG-229",
    title: "Lakeside Wayanad - Terrace Resorts",
    destination: "Kerala",
    duration: "2N/3D",
    departureCity: "Bengaluru",
    hotelCategory: "4 Star Hotel",
    meals: "Breakfast + Dinner",
    activitiesCount: 4,
    freebies: ["Tea Estate Tour"],
    basePrice: 4660,
    totalPrice: 9320,
    emi: "Rs. 1550/mo",
    tags: ["Nature", "Wellness"],
    status: "Draft",
    totalBookings: 0,
    revenue: 0,
    visibility: false,
    overview: "Nature retreat with lakeside stays and plantation visits.",
    cancellationPolicy: "Free cancellation up to 5 days before departure.",
    refundPolicy: "Refunds processed within 5 working days.",
    inclusions: "Stay, breakfast, local transfers.",
    exclusions: "Adventure sports, personal expenses.",
  },
  {
    id: "PKG-238",
    title: "Sikkim Monastery Trail",
    destination: "Gangtok",
    duration: "5N/6D",
    departureCity: "Kolkata",
    hotelCategory: "3 Star Hotel",
    meals: "Breakfast",
    activitiesCount: 6,
    freebies: ["Mountain View Room"],
    basePrice: 7210,
    totalPrice: 14420,
    emi: "Rs. 2400/mo",
    tags: ["Adventure", "Culture"],
    status: "Disabled",
    totalBookings: 12,
    revenue: 86520,
    visibility: false,
    overview: "High-altitude exploration with monastery tours and hikes.",
    cancellationPolicy: "Non-refundable within 3 days of departure.",
    refundPolicy: "Refunds only for medical cancellations.",
    inclusions: "Stay, daily breakfast, local guide.",
    exclusions: "Permit fees, cable car tickets.",
  },
];

const initialBookings = [
  {
    id: "BK-7011",
    packageName: "Goa Beach Escape - Candolim Stay",
    departureDate: "2026-03-04",
    travelers: 3,
    leadTraveler: "Riya Sen",
    status: "Confirmed",
    paymentStatus: "Paid",
    amount: 17940,
    addOns: ["Airport Pickup", "Travel Insurance"],
    coupon: "SUNSET10",
    fare: {
      base: 17940,
      discount: 1800,
      taxes: 850,
      total: 16990,
    },
    specialRequests: "High-floor room preferred.",
  },
  {
    id: "BK-7018",
    packageName: "Royal Jaipur Heritage Trail",
    departureDate: "2026-03-10",
    travelers: 2,
    leadTraveler: "Arjun Patel",
    status: "Pending",
    paymentStatus: "Pending",
    amount: 16840,
    addOns: ["Cultural Show"],
    coupon: "HERITAGE5",
    fare: {
      base: 16840,
      discount: 842,
      taxes: 950,
      total: 16948,
    },
    specialRequests: "Early check-in.",
  },
  {
    id: "BK-7025",
    packageName: "Sikkim Monastery Trail",
    departureDate: "2026-02-26",
    travelers: 1,
    leadTraveler: "Maya Das",
    status: "Cancelled",
    paymentStatus: "Refunded",
    amount: 7210,
    addOns: ["Mountain View Room"],
    coupon: "NONE",
    fare: {
      base: 7210,
      discount: 0,
      taxes: 360,
      total: 7570,
    },
    specialRequests: "Vegetarian meals.",
  },
  {
    id: "BK-7031",
    packageName: "Lakeside Wayanad - Terrace Resorts",
    departureDate: "2026-03-01",
    travelers: 4,
    leadTraveler: "Kabir Rao",
    status: "Completed",
    paymentStatus: "Paid",
    amount: 18640,
    addOns: ["Tea Estate Tour"],
    coupon: "NATURE8",
    fare: {
      base: 18640,
      discount: 1491,
      taxes: 920,
      total: 18069,
    },
    specialRequests: "Twin beds.",
  },
];

const initialCoupons = [
  {
    id: "CP-11",
    code: "SUNSET10",
    type: "Percentage",
    value: 10,
    minBooking: 15000,
    validTill: "2026-04-30",
    usageLimit: 200,
    usedCount: 87,
    status: "Active",
  },
  {
    id: "CP-12",
    code: "HERITAGE5",
    type: "Percentage",
    value: 5,
    minBooking: 10000,
    validTill: "2026-03-15",
    usageLimit: 100,
    usedCount: 46,
    status: "Active",
  },
  {
    id: "CP-14",
    code: "NATURE8",
    type: "Flat",
    value: 1200,
    minBooking: 9000,
    validTill: "2026-02-20",
    usageLimit: 60,
    usedCount: 60,
    status: "Expired",
  },
];

const initialNotifications = [
  {
    id: "NT-401",
    title: "New booking received",
    detail: "Goa Beach Escape booked for 3 travelers.",
    time: "2 hours ago",
    type: "booking",
    read: false,
  },
  {
    id: "NT-402",
    title: "Cancellation request",
    detail: "Sikkim Monastery Trail booking BK-7025 cancelled.",
    time: "5 hours ago",
    type: "alert",
    read: true,
  },
  {
    id: "NT-403",
    title: "Coupon expiring",
    detail: "HERITAGE5 coupon expires in 5 days.",
    time: "1 day ago",
    type: "coupon",
    read: false,
  },
];

const Package_partner_portal = () => {
  const role = localStorage.getItem("userRole") || "FULL_PARTNER";
  const isSubPartner = role === "SUB_PARTNER";
  const [active, setActive] = useState(isSubPartner ? "bookings" : "dashboard");
  const [searchQuery, setSearchQuery] = useState(
    () => localStorage.getItem("pp_search_query") || ""
  );
  const [packages, setPackages] = useState(initialPackages);
  const [bookings, setBookings] = useState(initialBookings);
  const [coupons, setCoupons] = useState(initialCoupons);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [toast, setToast] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(
    Boolean(localStorage.getItem("staybookPartnerToken"))
  );

  const allowedSections = useMemo(
    () =>
      isSubPartner
        ? [
            "dashboard",
            "packages",
            "itinerary",
            "bookings",
            "completed",
            "notifications",
            "settings",
          ]
        : [],
    [isSubPartner]
  );

  useEffect(() => {
    localStorage.setItem("pp_search_query", searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (isSubPartner && !allowedSections.includes(active)) {
      setActive(allowedSections[0]);
    }
  }, [active, allowedSections, isSubPartner]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const activeTitle = useMemo(() => {
    const titles = {
      dashboard: "Dashboard",
      packages: "Package Management",
      itinerary: "Itinerary Builder",
      pricing: "Pricing & Offers",
      media: "Media Gallery",
      bookings: "Bookings",
      completed: "Completed / Cancelled Trips",
      coupons: "Coupons & Promotions",
      notifications: "Notifications",
      settings: "Settings",
    };
    return titles[active] || "Package Partner Portal";
  }, [active]);

  const handlePackageSave = (pkg) => {
    setPackages((prev) => {
      const exists = prev.find((item) => item.id === pkg.id);
      if (exists) {
        return prev.map((item) => (item.id === pkg.id ? pkg : item));
      }
      return [...prev, { ...pkg, id: `PKG-${Date.now()}` }];
    });
    setToast({ tone: "success", message: "Package saved successfully." });
  };

  const handlePackageDelete = (id) => {
    setPackages((prev) => prev.filter((item) => item.id !== id));
    setToast({ tone: "warning", message: "Package removed." });
  };

  const handlePackageDuplicate = (pkg) => {
    const copy = {
      ...pkg,
      id: `PKG-${Date.now()}`,
      title: `${pkg.title} (Copy)`,
      status: "Draft",
      totalBookings: 0,
      revenue: 0,
      visibility: false,
    };
    setPackages((prev) => [...prev, copy]);
    setToast({ tone: "success", message: "Package duplicated." });
  };

  const handlePackageStatus = (id, nextStatus) => {
    setPackages((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: nextStatus } : item
      )
    );
    setToast({ tone: "info", message: "Package status updated." });
  };

  const handleBookingStatus = (id, status) => {
    setBookings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    setToast({ tone: "info", message: "Booking updated." });
  };

  const handleCouponSave = (coupon) => {
    setCoupons((prev) => {
      const exists = prev.find((item) => item.id === coupon.id);
      if (exists) {
        return prev.map((item) => (item.id === coupon.id ? coupon : item));
      }
      return [...prev, { ...coupon, id: `CP-${Date.now()}` }];
    });
    setToast({ tone: "success", message: "Coupon saved." });
  };

  const handleCouponDelete = (id) => {
    setCoupons((prev) => prev.filter((item) => item.id !== id));
    setToast({ tone: "warning", message: "Coupon removed." });
  };

  const handleNotificationToggle = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, read: !item.read } : item
      )
    );
  };

  if (!isAuthorized) {
    return (
      <div className="pp-auth">
        <div className="pp-auth-card">
          <h2>Access Restricted</h2>
          <p className="pp-muted">
            This portal is protected by partner authentication. Use a valid token
            to continue.
          </p>
          <button
            type="button"
            className="pp-btn pp-btn-primary"
            onClick={() => {
              localStorage.setItem("staybookPartnerToken", "demo-token");
              setIsAuthorized(true);
            }}
          >
            Unlock Demo Access
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pp-layout">
      <PPVnavbar active={active} setActive={setActive} role={role} />
      <div className="pp-main">
        <PPHnavbar
          title={activeTitle}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          role={role}
        />
        <div className="pp-content">
          {active === "dashboard" && (
            <PackagePartnerDashboard
              packages={packages}
              bookings={bookings}
              coupons={coupons}
            />
          )}
          {active === "packages" && (
            <PackageManagement
              packages={packages}
              searchQuery={searchQuery}
              readOnly={isSubPartner}
              onSave={handlePackageSave}
              onDelete={handlePackageDelete}
              onDuplicate={handlePackageDuplicate}
              onStatusChange={handlePackageStatus}
            />
          )}
          {active === "itinerary" && (
            <ItineraryBuilder readOnly={isSubPartner} packages={packages} />
          )}
          {active === "pricing" && (
            <PricingOffers readOnly={isSubPartner} packages={packages} />
          )}
          {active === "media" && <PackageMedia />}
          {active === "bookings" && (
            <PackageBookings
              bookings={bookings}
              searchQuery={searchQuery}
              onStatusChange={handleBookingStatus}
              readOnly={false}
            />
          )}
          {active === "completed" && <CompletedTrips bookings={bookings} />}
          {active === "coupons" && (
            <PackageCoupons
              coupons={coupons}
              onSave={handleCouponSave}
              onDelete={handleCouponDelete}
              readOnly={isSubPartner}
            />
          )}
          {active === "notifications" && (
            <PackageNotifications
              notifications={notifications}
              onToggleRead={handleNotificationToggle}
            />
          )}
          {active === "settings" && (
            <PackagePartnerSettings readOnly={isSubPartner} />
          )}
        </div>
      </div>
      <PPToast tone={toast?.tone} message={toast?.message} />
    </div>
  );
};

export default Package_partner_portal;
