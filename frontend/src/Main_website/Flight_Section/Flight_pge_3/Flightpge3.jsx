import BookingTopSummaryBar from './BookingTopSummaryBar.jsx';
import SeatSelection from './SeatSelection.jsx';  
import FlightDelayProtection from './FlightDelayProtection.jsx';
import ProceedToPayBar from './ProceedToPayBar.jsx';    

export default function Flightpge3() {
  return (
    <>
      <BookingTopSummaryBar />

      <div style={{ background: "#dff0f8", padding: "22px 0 50px" }}>
        <SeatSelection />
        <FlightDelayProtection />
        <ProceedToPayBar />
      </div>
    </>
  );
}