import "./PaymentOptionsAndScan.css";
import { FaChevronRight } from "react-icons/fa";
import { MdQrCode2 } from "react-icons/md";
import { SiGooglepay, SiPhonepe, SiPaytm } from "react-icons/si";
import { RiBankLine } from "react-icons/ri";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { BsClockHistory } from "react-icons/bs";
import { TbCreditCardPay } from "react-icons/tb";
import { FaGift } from "react-icons/fa";

export default function PaymentOptionsAndScan() {
  return (
    <div className="po-wrap">
      {/* LEFT: Payment options */}
      <div className="po-leftCard">
        <div className="po-title">Payment Options</div>

        <div className="po-list">
          <div className="po-item">
            <div className="po-left">
              <div className="po-icBox upi">
                <TbCreditCardPay />
              </div>
              <div className="po-text">
                <div className="po-main">UPI Options</div>
                <div className="po-sub">Pay Directly From Your Bank Account</div>
              </div>
            </div>
            <FaChevronRight className="po-arrow" />
          </div>

          <div className="po-item">
            <div className="po-left">
              <div className="po-icBox card">
                <HiOutlineCreditCard />
              </div>
              <div className="po-text">
                <div className="po-main">Credit &amp; Debit Cards</div>
                <div className="po-sub">Visa, Mastercard, Amex, Rupay and more</div>
              </div>
            </div>
            <FaChevronRight className="po-arrow" />
          </div>

          <div className="po-item">
            <div className="po-left">
              <div className="po-icBox emi">
                <MdQrCode2 />
              </div>
              <div className="po-text">
                <div className="po-main">EMI</div>
                <div className="po-sub">Credit/Debit Card &amp; Cardless EMI available</div>
              </div>
            </div>

            <div className="po-right">
              <span className="po-pill">NO COST EMI</span>
              <FaChevronRight className="po-arrow" />
            </div>
          </div>

          <div className="po-item">
            <div className="po-left">
              <div className="po-icBox bank">
                <RiBankLine />
              </div>
              <div className="po-text">
                <div className="po-main">Net Banking</div>
                <div className="po-sub">40+ Banks Available</div>
              </div>
            </div>
            <FaChevronRight className="po-arrow" />
          </div>

          <div className="po-item">
            <div className="po-left">
              <div className="po-icBox later">
                <BsClockHistory />
              </div>
              <div className="po-text">
                <div className="po-main">Pay Later</div>
                <div className="po-sub">Lazypay, Amazon</div>
              </div>
            </div>
            <FaChevronRight className="po-arrow" />
          </div>

          <div className="po-item last">
            <div className="po-left">
              <div className="po-icBox gift">
                <FaGift />
              </div>
              <div className="po-text">
                <div className="po-main">Gift Cards &amp; e-wallets</div>
                <div className="po-sub">MMT Gift cards &amp; Amazon Pay</div>
              </div>
            </div>
            <FaChevronRight className="po-arrow" />
          </div>
        </div>
      </div>

      {/* RIGHT: Scan to pay */}
      <div className="po-rightCard">
        <div className="po-scanTop">
          <div>
            <div className="po-scanTitle">Scan to Pay</div>
            <div className="po-scanSub">Instant Refund &amp; High Success Rate</div>
          </div>

          <div className="po-qrBox">
            <div className="po-qrFake" />
            <button className="po-qrBtn" type="button">
              VIEW QR
            </button>
          </div>
        </div>

        <div className="po-payIcons">
          <TbCreditCardPay className="po-upiMark" />
          <SiGooglepay />
          <SiPaytm />
          <SiPhonepe />
          <div className="po-miniBlack" />
          <div className="po-miniBlack2" />
        </div>
      </div>
    </div>
  );
}
