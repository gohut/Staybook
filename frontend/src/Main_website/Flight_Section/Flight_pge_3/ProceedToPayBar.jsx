import "./ProceedToPayBar.scss";

export default function ProceedToPayBar() {
  return (
    <section className="ptp-wrap">
      <label className="ptp-check">
        <input type="checkbox" defaultChecked />
        <span className="ptp-box" />
        I understand and agree with the{" "}
        <a href="#" className="ptp-link">Fare Rules</a>, the{" "}
        <a href="#" className="ptp-link">Privacy Policy</a>, the{" "}
        <a href="#" className="ptp-link">User Agreement</a> and{" "}
        <a href="#" className="ptp-link">Terms of Service</a> of StayBook.
      </label>

      <button className="ptp-btn" type="button">
        PROCEED TO PAY
      </button>
    </section>
  );
}
