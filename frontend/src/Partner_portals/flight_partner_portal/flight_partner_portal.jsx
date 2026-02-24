import { useMemo, useState } from "react";
import FPHnavbar from "./Navbars/FPHnavbar";
import FPVnavbar from "./Navbars/FPVnavbar";
import FlightDashboard from "./Dashboard/FlightDashboard";
import FlightsManagement from "./Flights_Management/FlightsManagement";
import CreateEditFlight from "./Create_Flight/CreateEditFlight";
import SeatLayoutManager from "./Seat_Layout/SeatLayoutManager";
import BookingsManagement from "./Bookings_Management/BookingsManagement";
import PricingPolicies from "./Pricing_Policies/PricingPolicies";
import AddonsManagement from "./Addons_Management/AddonsManagement";
import PaymentsReports from "./Payments_Reports/PaymentsReports";
import FlightPartnerSettings from "./Settings/FlightPartnerSettings";
import "./flight_partner_portal.scss";

const initialFlights = [
  {
    id: "FL-201",
    flightNumber: "SB201",
    airline: "StayBook Air",
    route: "DEL → BLR",
    fromCity: "Delhi",
    fromAirport: "DEL",
    toCity: "Bengaluru",
    toAirport: "BLR",
    departure: "08:30",
    arrival: "11:05",
    duration: "2h 35m",
    aircraft: "Airbus A320",
    cabinClass: "Economy",
    baseFare: 3499,
    seatsAvailable: 48,
    totalSeats: 180,
    refundable: true,
    status: "Active",
  },
  {
    id: "FL-305",
    flightNumber: "SB305",
    airline: "StayBook Air",
    route: "BOM → HYD",
    fromCity: "Mumbai",
    fromAirport: "BOM",
    toCity: "Hyderabad",
    toAirport: "HYD",
    departure: "10:10",
    arrival: "11:55",
    duration: "1h 45m",
    aircraft: "Boeing 737-800",
    cabinClass: "Premium",
    baseFare: 5299,
    seatsAvailable: 32,
    totalSeats: 160,
    refundable: false,
    status: "Active",
  },
  {
    id: "FL-412",
    flightNumber: "SB412",
    airline: "StayBook Air",
    route: "BLR → COK",
    fromCity: "Bengaluru",
    fromAirport: "BLR",
    toCity: "Kochi",
    toAirport: "COK",
    departure: "14:20",
    arrival: "15:55",
    duration: "1h 35m",
    aircraft: "Airbus A321",
    cabinClass: "Economy",
    baseFare: 2899,
    seatsAvailable: 62,
    totalSeats: 190,
    refundable: true,
    status: "Active",
  },
  {
    id: "FL-588",
    flightNumber: "SB588",
    airline: "StayBook Air",
    route: "DEL → MAA",
    fromCity: "Delhi",
    fromAirport: "DEL",
    toCity: "Chennai",
    toAirport: "MAA",
    departure: "18:45",
    arrival: "21:40",
    duration: "2h 55m",
    aircraft: "Airbus A320neo",
    cabinClass: "Business",
    baseFare: 8799,
    seatsAvailable: 14,
    totalSeats: 150,
    refundable: true,
    status: "Cancelled",
  },
  {
    id: "FL-619",
    flightNumber: "SB619",
    airline: "StayBook Air",
    route: "GOI → DEL",
    fromCity: "Goa",
    fromAirport: "GOI",
    toCity: "Delhi",
    toAirport: "DEL",
    departure: "06:50",
    arrival: "09:20",
    duration: "2h 30m",
    aircraft: "Boeing 737-900",
    cabinClass: "Economy",
    baseFare: 4199,
    seatsAvailable: 57,
    totalSeats: 178,
    refundable: false,
    status: "Active",
  },
];

const initialBookings = [
  {
    id: "BK-90041",
    flightId: "SB201",
    route: "DEL → BLR",
    travelDate: "2026-02-24",
    passengers: 2,
    seats: ["12A", "12B"],
    amount: 7198,
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
    contact: "priya.k@staymail.com",
    passengerList: [
      { name: "Priya K", age: 32, type: "Adult" },
      { name: "Rohit K", age: 34, type: "Adult" },
    ],
    addOns: ["Travel Insurance"],
  },
  {
    id: "BK-90077",
    flightId: "SB305",
    route: "BOM → HYD",
    travelDate: "2026-02-24",
    passengers: 1,
    seats: ["2C"],
    amount: 6299,
    paymentStatus: "Pending",
    bookingStatus: "On Hold",
    contact: "arjun@staymail.com",
    passengerList: [{ name: "Arjun S", age: 28, type: "Adult" }],
    addOns: ["Delay Protection"],
  },
  {
    id: "BK-90110",
    flightId: "SB412",
    route: "BLR → COK",
    travelDate: "2026-02-25",
    passengers: 3,
    seats: ["18A", "18B", "18C"],
    amount: 9567,
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
    contact: "nair.family@staymail.com",
    passengerList: [
      { name: "Nair A", age: 38, type: "Adult" },
      { name: "Meera A", age: 35, type: "Adult" },
      { name: "Anvi A", age: 6, type: "Child" },
    ],
    addOns: ["Extra Services"],
  },
  {
    id: "BK-90133",
    flightId: "SB588",
    route: "DEL → MAA",
    travelDate: "2026-02-25",
    passengers: 1,
    seats: ["1A"],
    amount: 8799,
    paymentStatus: "Refunded",
    bookingStatus: "Cancelled",
    contact: "manoj@staymail.com",
    passengerList: [{ name: "Manoj P", age: 41, type: "Adult" }],
    addOns: ["Seat Upgrade"],
  },
  {
    id: "BK-90158",
    flightId: "SB619",
    route: "GOI → DEL",
    travelDate: "2026-02-26",
    passengers: 2,
    seats: ["9C", "9D"],
    amount: 8398,
    paymentStatus: "Paid",
    bookingStatus: "Checked-in",
    contact: "sophie@staymail.com",
    passengerList: [
      { name: "Sophie A", age: 30, type: "Adult" },
      { name: "Ria A", age: 7, type: "Child" },
    ],
    addOns: ["Insurance", "Extra Services"],
  },
];

const Flight_partner_portal = () => {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [flights, setFlights] = useState(initialFlights);
  const [editingFlight, setEditingFlight] = useState(null);
  const [bookings] = useState(initialBookings);

  const activeTitle = useMemo(() => {
    const titles = {
      dashboard: "Dashboard Overview",
      flights: "All Flights",
      createFlight: editingFlight ? "Edit Flight" : "Create Flight",
      schedule: "Schedule Management",
      seatLayouts: "Aircraft Layouts",
      seatInventory: "Seat Inventory",
      seatPricing: "Seat Pricing",
      bookings: "All Bookings",
      passengers: "Passenger List",
      checkin: "Check-in Status",
      farePlans: "Fare Plans",
      taxes: "Taxes & Fees",
      refunds: "Refund Policies",
      insurance: "Insurance",
      delay: "Delay Protection",
      extras: "Extra Services",
      transactions: "Transactions",
      revenue: "Revenue Analytics",
      settlements: "Settlement Reports",
      profile: "Airline Profile",
      roles: "Users & Roles",
      api: "API Keys",
    };
    return titles[active] || "Flight Partner Portal";
  }, [active, editingFlight]);

  const handleSaveFlight = (flight) => {
    if (flight.id) {
      setFlights((prev) => prev.map((item) => (item.id === flight.id ? flight : item)));
    } else {
      const nextId = `FL-${700 + prevCount(flights)}`;
      setFlights((prev) => [
        ...prev,
        {
          ...flight,
          id: nextId,
          airline: "StayBook Air",
        },
      ]);
    }
    setEditingFlight(null);
  };

  const handleEditFlight = (flight) => {
    setEditingFlight(flight);
    setActive("createFlight");
  };

  const handleDuplicateFlight = (flight) => {
    const copy = {
      ...flight,
      id: "",
      flightNumber: `${flight.flightNumber}-COPY`,
      status: "Active",
    };
    setEditingFlight(copy);
    setActive("createFlight");
  };

  const handleCancelFlight = (flightId) => {
    setFlights((prev) =>
      prev.map((item) =>
        item.id === flightId ? { ...item, status: "Cancelled" } : item
      )
    );
  };

  return (
    <div className={`fp-layout ${collapsed ? "collapsed" : ""}`}>
      <FPVnavbar
        active={active}
        setActive={setActive}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
      />

      <div className="fp-main">
        <FPHnavbar
          title={activeTitle}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggleSidebar={() => setCollapsed((prev) => !prev)}
        />

        <div className="fp-content">
          {active === "dashboard" && <FlightDashboard />}

          {active === "flights" && (
            <FlightsManagement
              flights={flights}
              searchQuery={searchQuery}
              onCreateFlight={() => {
                setEditingFlight(null);
                setActive("createFlight");
              }}
              onEditFlight={handleEditFlight}
              onDuplicateFlight={handleDuplicateFlight}
              onCancelFlight={handleCancelFlight}
              view="all"
            />
          )}

          {active === "schedule" && (
            <FlightsManagement
              flights={flights}
              searchQuery={searchQuery}
              onCreateFlight={() => {
                setEditingFlight(null);
                setActive("createFlight");
              }}
              onEditFlight={handleEditFlight}
              onDuplicateFlight={handleDuplicateFlight}
              onCancelFlight={handleCancelFlight}
              view="schedule"
            />
          )}

          {active === "createFlight" && (
            <CreateEditFlight
              flight={editingFlight}
              onSave={handleSaveFlight}
              onCancel={() => {
                setEditingFlight(null);
                setActive("flights");
              }}
            />
          )}

          {active === "seatLayouts" && <SeatLayoutManager tab="layouts" />}
          {active === "seatInventory" && <SeatLayoutManager tab="inventory" />}
          {active === "seatPricing" && <SeatLayoutManager tab="pricing" />}

          {active === "bookings" && (
            <BookingsManagement
              bookings={bookings}
              searchQuery={searchQuery}
              tab="all"
            />
          )}
          {active === "passengers" && (
            <BookingsManagement
              bookings={bookings}
              searchQuery={searchQuery}
              tab="passengers"
            />
          )}
          {active === "checkin" && (
            <BookingsManagement
              bookings={bookings}
              searchQuery={searchQuery}
              tab="checkin"
            />
          )}

          {active === "farePlans" && <PricingPolicies tab="plans" />}
          {active === "taxes" && <PricingPolicies tab="taxes" />}
          {active === "refunds" && <PricingPolicies tab="refunds" />}

          {active === "insurance" && <AddonsManagement tab="insurance" />}
          {active === "delay" && <AddonsManagement tab="delay" />}
          {active === "extras" && <AddonsManagement tab="extras" />}

          {active === "transactions" && <PaymentsReports tab="transactions" />}
          {active === "revenue" && <PaymentsReports tab="revenue" />}
          {active === "settlements" && <PaymentsReports tab="settlements" />}

          {active === "profile" && <FlightPartnerSettings tab="profile" />}
          {active === "roles" && <FlightPartnerSettings tab="roles" />}
          {active === "api" && <FlightPartnerSettings tab="api" />}
        </div>
      </div>
    </div>
  );
};

const prevCount = (items) => (items?.length || 0) + 1;

export default Flight_partner_portal;
