import "./BookingLayout.scss";
import BookingLeftPanel from "./BookingLeftPanel";
import BookingRightPanel from "./BookingRightPanel";
import TripSecure from "./TripSecure";  
import TravellerDetails from "./TravellerDetails";
import BillingStateAndContinue from "./BillingStateAndContinue";

export default function BookingLayout() {
  return (
    <section className="bl-wrap">
      <div className="bl-inner">
        <div className="bl-leftScroll">
          <BookingLeftPanel />
            <TravellerDetails />
            <TripSecure />
            <BillingStateAndContinue />
        </div>

        <aside className="bl-rightFixed">
          <BookingRightPanel />
        </aside>
      </div>
    </section>
  );
}
