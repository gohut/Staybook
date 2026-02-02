import "./FlightsAdBanner.scss";

export default function FlightsAdBanner() {
  return (
    <div className="fab-wrap">
      <div className="fab-banner">
        <div className="fab-left">
          <div className="fab-visa">VISA</div>
          <div className="fab-text">
            <div className="fab-head">
              Make your international spends <br /> more rewarding with Visa.
            </div>
          </div>
        </div>

        <div className="fab-right">
          <div className="fab-yellowBox">
            <div className="fab-small">amazon pay gift card</div>
            <div className="fab-amt">₹1000*</div>
          </div>

          <button className="fab-btn">Know more</button>
        </div>
      </div>
    </div>
  );
}
