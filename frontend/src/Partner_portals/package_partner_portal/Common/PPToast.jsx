import "./PPToast.scss";
import { FiCheckCircle, FiAlertTriangle, FiInfo } from "react-icons/fi";

const icons = {
  success: <FiCheckCircle />,
  warning: <FiAlertTriangle />,
  info: <FiInfo />,
};

const PPToast = ({ tone = "success", message }) => {
  if (!message) return null;

  return (
    <div className={`pp-toast ${tone}`}>
      <span className="pp-toast-icon">{icons[tone] || icons.info}</span>
      <span>{message}</span>
    </div>
  );
};

export default PPToast;
